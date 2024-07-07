import { ObjectId } from "mongoose";

export interface IOrganization {
    organizationName: string;
    organizationEmail: string;
    organizationPhoneNumber: string;
    organizationAddress: string;
    apiKey: string;
    apiToken: any;
    status: boolean;
    createdDate: any;
    updatedDate: any;
}