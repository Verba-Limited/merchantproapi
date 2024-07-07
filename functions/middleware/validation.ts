import Joi from "joi";
import _ from "lodash";
import { Request, Response, NextFunction } from "express";

/**
 *  Validates incoming input in the body of a request.
 *  Runs only on POST or PUT requests
 *
 * @export
 * @param {*} schema validationSchema for this route
 * @returns
 */
export const validation = (schema: Joi.ObjectSchema, useJoiError = false, options?: Joi.ValidationOptions) => {
    const _useJoiError = _.isBoolean(useJoiError) && useJoiError;

    // enabled HTTP methods for request data validation
    const _supportedMethods = ["post", "put", "patch"];

    // Joi validation options
    const _validationOptions = {
        abortEarly: true, // abort after the first validation error
        allowUnknown: true, // allow unknown keys that will be ignored
        stripUnknown: true, // remove unknown keys from the validated data
        ...options,
    };

    return (req: Request, res: Response, next: NextFunction) => {
        const method = req.method.toLowerCase();

        if (_.includes(_supportedMethods, method) && schema) {
            // Validate req.body using the schema and validation options
            const { error } = schema.validate(req.body, _validationOptions);
            // console.log(error);
            if (error) {
                // const stringPassswordError = "Password must be strong. At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum eight in length"

                const JoiError = {
                    success: false,
                    statusCode: 422,
                    data: null,
                    message: error.details[0].message.replace(/['"]/g, "")
                    // message: error.details[0].path[0] == "password" ? 
                    //         stringPassswordError : 
                    //         error.details[0].message.replace(/['"]/g, "")
                };

                const CustomError = {
                    success: false,
                    statusCode: 422,
                    data: null,
                    message: 'Invalid request data. Please review request and try again.'
                };
                res.status(422).json(_useJoiError ? JoiError : CustomError);
            } else {
                // Replace req.body with the data after Joi validation
                // req.body = validationRes.data;
                next();
            }

        } else {
            next();
        }
    };
};
