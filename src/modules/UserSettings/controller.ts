import { TODAYS_DATE, GENERATE_STRING } from '../../utils/constants';
import { BaseController } from "../baseController";
import { AccountService } from './service'

export class AccountController extends BaseController {
    private _accountService = new AccountService();

    public forgotPassword = async (otpBody: any) => {
        try {
            const passwordResponse = await this._accountService.forgotPassword(otpBody);
            return passwordResponse;
        } catch (error) {
            return this.sendResponse(error);
        }
    }

    public verifyAccountPasswordCode = async (passBody: any) => {
        try {
            const verifyCodeResponse = await this._accountService.verifyAccountPasswordCode(passBody);
            return verifyCodeResponse;
        } catch (error) {
            return this.sendResponse(error);
        }
    }

    public resetPassword = async (passwdBody: any) => {
        try {
            const resetResponse = await this._accountService.resetPassword(passwdBody);
            return resetResponse;
        } catch (error) {
            return this.sendResponse(error);
        }
    }

    public changePassword = async (parsedUserId: any, passwdBody: any) => {
        try {
            const resetResponse = await this._accountService.changePassword(parsedUserId, passwdBody);
            return resetResponse;
        } catch (error) {
            return this.sendResponse(error);
        }
    }


    // remove subaccount account/email

    // remove subaccount access

    // view all subaccounts

    // deactivate account account
    public deactivateAccount = async (userId: any, parsedBody: any) => {
        try {
            const account = await this._accountService.deactivateAccount(userId, parsedBody);
            return account;
        } catch (error) {
            return this.sendResponse(error);
        }
    }


    public smsDeliveryStatus = async (messageBody: any) => {
        try {
            const resetResponse = await this._accountService.smsDeliveryStatus(messageBody);
            return resetResponse;
        } catch (error) {
            return this.sendResponse(error);
        }
    }

    public sendTestEmail = async (messageBody: any) => {
        try {
            const resetResponse = await this._accountService.sendTestEmail(messageBody);
            return resetResponse;
        } catch (error) {
            return this.sendResponse(error);
        }
    }

    public setConvenienceFee = async (parsedBody: any) => {
        try {
            const response = await this._accountService.setConvenienceFee(parsedBody);
            return response;
        } catch (error) {
            return this.sendResponse(error);
        }
    }

    public sendWaitlistEmail = async (messageBody: any) => {
        try {
            return await this._accountService.sendWaitlistEmail(messageBody);
        } catch (error) {
            return this.sendResponse(error);
        }
    }


    // add card details

    // remove card details

    // notification when bills are due, payment made



}
