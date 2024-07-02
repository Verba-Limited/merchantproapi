
import { Request, Response, NextFunction } from "express";
import { UserModel } from "../modules/User";
import { OrganizationModel } from "../modules/Organization";

export const userMiddleware = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        console.log("user check--->", req.body);
        const email = req?.body?.email?.toLowerCase();
        let user = await UserModel.findOne({ email });
        if(user) {
            return next();
        } else {
            const userError = {
                success: false,
                statusCode: 422,
                data: null,
                message: "User cannot be found"
            };
            return res.status(422).json(userError);
        }
    };
}

export const userOrgIdApiKeyMiddleware = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const email = req.body.email.toLowerCase();
        const organizationId = req.body.organizationId;
        const apiKey = req.headers["x-api-key"] as string;
        if (!apiKey) {
            const message = { success: false, statusCode: 400,  message: "Missing API key in header", data: null };
            return res.status(400).json(message); 
        }
        const organization = await OrganizationModel.findOne({ _id: organizationId, apiKey });
        if (organization) {
            // return next();
            let user = await UserModel.findOne({ email, organizationId });
            if(user) {
                return next();
            } else {
                const userError = {
                    success: false,
                    statusCode: 422,
                    data: null,
                    message: "User cannot be found"
                };
                return res.status(422).json(userError);
            }
        
        } else {
            const message = { success: false, statusCode: 400,  message: "Invalid Organization or API key", data: null };  
            return res.status(422).json(message);
        } 
    };
}

export const userApiKeyMiddleware = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const email = req?.body?.email?.toLowerCase();
        const apiKey = req.headers["x-api-key"] as string;
        if (!apiKey) {
            const message = { success: false, statusCode: 400,  message: "Missing API key in header", data: null };
            return res.status(400).json(message); 
        }
        const organization = await OrganizationModel.findOne({ apiKey });
        if (organization) {
            const organizationId = organization._id;
            let user = await UserModel.findOne({ email });
            if(user) {
                if(user.organizationId == organizationId) {
                    return next();
                } 
                else {
                    const orgError = {
                        success: false,
                        statusCode: 422,
                        data: null,
                        message: "User does not belong to Organization"
                    };
                    return res.status(422).json(orgError);
                }
            } else {
                const userError = {
                    success: false,
                    statusCode: 422,
                    data: null,
                    message: "User cannot be found"
                };
                return res.status(422).json(userError);
            }
        } else {
            const message = { success: false, statusCode: 400,  message: "Invalid Organization or API key", data: null };  
            return res.status(422).json(message);
        } 
    };
}
