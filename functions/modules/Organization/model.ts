import { Schema, model } from "mongoose";

import { IOrganization } from "./interface";

const productSchema = new Schema<IOrganization>({
    organizationName: { type: String, required: true },
    organizationEmail: { type: String, required: true },
    organizationPhoneNumber: { type: String, required: false },
    organizationAddress : { type: String, required: false },
    apiKey: { type: String, required: true },
    apiToken: { type: String, required: true },
    status: { type: Boolean, required: false, default: false },
    createdDate: { type: Date, required: false },
    updatedDate: { type: Date, required: false },
});

const OrganizationModel = model<IOrganization>('Organization', productSchema);

export { OrganizationModel, productSchema }
