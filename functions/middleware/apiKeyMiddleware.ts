
import { Request, Response, NextFunction } from "express";
import { OrganizationModel } from "../modules/Organization";

export const apiKeyMiddleware = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const apiKey = req.headers["x-api-key"] as string;
        if (!apiKey) {
            const message = { success: false, statusCode: 400,  message: "Missing API key in header", data: null };
            return res.status(400).json(message); 
        }
        const organizations = await OrganizationModel.find({ apiKey });
        if (organizations && organizations.length > 0) {
            return next();
        } else {
            const message = { success: false, statusCode: 400,  message: "Invalid API key", data: null };  
            return res.status(422).json(message);
        }
    };
}

export const orgIdApiKeyMiddleware = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { organizationId } = req.body;
        const apiKey = req.headers["x-api-key"] as string;
        if (!apiKey) {
            const message = { success: false, statusCode: 400,  message: "Missing API key in header", data: null };
            return res.status(400).json(message); 
        }
        const organization = await OrganizationModel.findOne({ _id: organizationId, apiKey });
        if (organization) {
            return next();
        } else {
            const message = { success: false, statusCode: 400,  message: "Invalid Organization or API key", data: null };  
            return res.status(422).json(message);
        }
    };
}
