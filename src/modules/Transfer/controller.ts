import { TODAYS_DATE, GENERATE_STRING } from '../../utils/constants';
import { BaseController } from "../baseController";
import { TransferService } from './service';

export class TransferController extends BaseController {
    private _transferService = new TransferService();

    public createTransfer = async (parsedBody: any) => {
        try {
            const user = await this._transferService.createTransfer(parsedBody);
            return user;
        } catch (error) {
            return this.sendResponse(error)
        }
    };

    public getTransfers = async () => {
        try {
            const user = await this._transferService.getTransfers();
            return user; 
        } catch (error) {
            return this.sendResponse(error);
        }
    }

    public getTransferById = async (userParams:any) => {
        try {
            const user = await this._transferService.getTransferById(userParams);
            return user; 
        } catch (error) {
            return this.sendResponse(error);
        }
    }

    public updateTransfer = async (userId: any, parsedBody: any) => {
        try {
            const user = await this._transferService.updateTransfer(userId, parsedBody);
            return user; 
        } catch (error) {
            return this.sendResponse(error);
        }
    }

    public deleteTransfer = async (phoneNumber: number) => {
        try {
            const user = await this._transferService.deleteTransfer(phoneNumber);
            return user; 
        } catch (error) {
            return this.sendResponse(error);
        }
    } 
    
}
