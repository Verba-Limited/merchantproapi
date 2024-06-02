import { TODAYS_DATE, GENERATE_STRING } from '../../utils/constants';
import { BaseController } from "../baseController";
import { MerchantService } from './service';

export class MerchantController extends BaseController {
    private _merchantService = new MerchantService();

    public createMerchant = async (parsedBody: any) => {
        try {
            const merchant = await this._merchantService.createMerchant(parsedBody);
            return merchant;
        } catch (error) {
            return this.sendResponse(error)
        }
    };

    public sendMerchantVerification = async (sendBody: any) => {
        try {
            const merchant = await this._merchantService.sendMerchantVerification(sendBody);
            return merchant; 
        } catch (error) {
            return this.sendResponse(error);
        }
    }

    public getMerchants = async (req: any) => {
        try {
            const merchant = await this._merchantService.getMerchants(req);
            return merchant; 
        } catch (error) {
            return this.sendResponse(error);
        }
    }

    public getMerchantById = async (merchantParams:any) => {
        try {
            const merchant = await this._merchantService.getMerchantById(merchantParams);
            return merchant; 
        } catch (error) {
            return this.sendResponse(error);
        }
    }

    public updateMerchant = async (merchantId: any, parsedBody: any) => {
        try {
            const merchant = await this._merchantService.updateMerchant(merchantId, parsedBody);
            return merchant; 
        } catch (error) {
            return this.sendResponse(error);
        }
    }

    public deleteMerchant = async (phoneNumber: number) => {
        try {
            const merchant = await this._merchantService.deleteMerchant(phoneNumber);
            return merchant; 
        } catch (error) {
            return this.sendResponse(error);
        }
    } 
    
    public verifyMerchant = async (otpBody: any) => {
        try {
            const merchant = await this._merchantService.verifyMerchant(otpBody);
            return merchant; 
        } catch (error) {
            return this.sendResponse(error);
        }
    }
    
    public getMerchantVerifyStatus = async (email:string) => {
        try {
            const merchant = await this._merchantService.getMerchantVerifyStatus(email.toLowerCase());
            return merchant; 
        } catch (error) {
            return this.sendResponse(error);
        }
    }

    // view all submerchants
    // public getSubMerchants = async (email: string) => {
    //     try {
    //         const subMerchant = await this._merchantService.getSubMerchants(email.toLowerCase());
    //         return subMerchant; 
    //     } catch (error) {
    //         return this.sendResponse(error);
    //     }
    // }

    public clearDB = async () => {
        try {
            const subMerchant = await this._merchantService.clearDB();
            return subMerchant; 
        } catch (error) {
            return this.sendResponse(error);
        }
    }

    // upload profile picture
    public uploadProfilePicture = async (req: any, parsedFile: any, merchantCode: any) => {
        try {
            const merchant = await this._merchantService.uploadProfilePicture(req, parsedFile, merchantCode);
            return merchant; 
        } catch (error) {
            return this.sendResponse(error);
        }
    }

    // upload profile picture
    public uploadProfilePhoto = async (parsedFile: any, merchantCode: any) => {
        try {
            const merchant = await this._merchantService.uploadProfilePhoto(parsedFile, merchantCode);
            return merchant; 
        } catch (error) {
            return this.sendResponse(error);
        }
    }

    // add card details

    // remove card details

    // notification when bills are due, payment made



}
