import { GENERATE_REFERENCE, GEN_API_KEY } from '../../utils/constants';
import { OrganizationModel } from './model';

export class OrganizationService {

    public createOrganization = async (reqBody: any) => { 
        const organizationEmail = reqBody.organizationEmail.toLowerCase();
        const product = await OrganizationModel.findOne({ organizationEmail });
        if(product) return { success: false, statusCode: 400,  message: "Organization already existed", data: null }; 
        reqBody.apiKey = GEN_API_KEY();
        reqBody.apiToken = GENERATE_REFERENCE(6);
        reqBody.status = true;
        reqBody.createdDate = new Date();
        const newOrganization = new OrganizationModel(reqBody);
        newOrganization.save();
        return { success: true, statusCode: 200, message: "Organizations successfully created!", data: newOrganization };
    }

    public getOrganizations = async (req: any) => {
        const organizations = await OrganizationModel.find({});
        if (organizations) return { success: true, statusCode: 200, message: "Organizations retrieved", data: organizations };
        return { success: false, statusCode: 400,  message: "No organization found", data: null };  
    }

    public getOrganizationById = async (params: any) => {
        const { organizationId } = params;
        if(organizationId.length < 24) return { success: false, statusCode: 400, message: "Invalid Organization ID length", data: null };
        const organization = await OrganizationModel.findById(organizationId);
        if (organization) {
            return { success: true, statusCode: 200, message: "Organization successfully retrieved!", data: organization };
        }
        return { success: false, statusCode: 400, message: "Error in fetching Organization", data: null };
    }

    public updateOrganization = async (userId:any, parsedBody: any) => {

    }

    public deleteOrganization = async (organizationId: any) => {
        if(organizationId.length < 24) return { success: false, statusCode: 400, message: "Invalid Organization ID length", data: null };
        const organization = await OrganizationModel.findByIdAndDelete({ organizationId });
        if(organization) return { success: true, statusCode: 200, message: "Organization successfully deleted!", data: organization };
        return { success: false, statusCode: 400, message: "Error in deleting Organization", data: null };
    }
    
}

