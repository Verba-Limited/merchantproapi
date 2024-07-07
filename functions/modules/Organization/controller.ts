import { BaseController } from "../baseController";
import { OrganizationService } from './service';

export class OrganizationController extends BaseController {
    private _userService = new OrganizationService();

    public createOrganization = async (parsedBody: any) => {
        try {
            const user = await this._userService.createOrganization(parsedBody);
            return user;
        } catch (error) {
            return this.sendResponse(error)
        }
    };

    public getOrganizations = async (parsedRequest: any) => {
        try {
            const user = await this._userService.getOrganizations(parsedRequest);
            return user; 
        } catch (error) {
            return this.sendResponse(error);
        }
    }

    public getOrganizationById = async (userParams:any) => {
        try {
            const user = await this._userService.getOrganizationById(userParams);
            return user; 
        } catch (error) {
            return this.sendResponse(error);
        }
    }

    public updateOrganization = async (userId: any, parsedBody: any) => {
        try {
            const user = await this._userService.updateOrganization(userId, parsedBody);
            return user; 
        } catch (error) {
            return this.sendResponse(error);
        }
    }

    public deleteOrganization = async (phoneNumber: number) => {
        try {
            const user = await this._userService.deleteOrganization(phoneNumber);
            return user; 
        } catch (error) {
            return this.sendResponse(error);
        }
    } 
    
}
