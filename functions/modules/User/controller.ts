import { TODAYS_DATE, GENERATE_STRING } from '../../utils/constants';
import { BaseController } from "../baseController";
import { UserService } from './service';

export class UserController extends BaseController {
    private _userService = new UserService();

    public createUser = async (parsedBody: any) => {
        try {
            const user = await this._userService.createUser(parsedBody);
            return user;
        } catch (error) {
            return this.sendResponse(error)
        }
    };

    public sendUserVerification = async (sendBody: any) => {
        try {
            const user = await this._userService.sendUserVerification(sendBody);
            return user; 
        } catch (error) {
            return this.sendResponse(error);
        }
    }

    public inviteSubUser = async (parsedInvite: any) => {
        try {
            const { userEmail, inviteEmail } = parsedInvite;
            const inviteUser = await this._userService.inviteSubUser(userEmail.toLowerCase(), inviteEmail);
            return inviteUser;
        } catch (error) {
            console.log("error--->", error);
            return this.sendResponse(error)
        }
    }

    public inviteOperation = async (inviteParams: any) => {
        try {
            const inviteUser = await this._userService.performInviteOperation(inviteParams);
            return inviteUser;
        } catch (error) {
            console.log("error--->", error);
            return this.sendResponse(error)
        }
    }

    public getUsers = async (req: any) => {
        try {
            const user = await this._userService.getUsers(req);
            return user; 
        } catch (error) {
            return this.sendResponse(error);
        }
    }

    public getUserById = async (userParams:any) => {
        try {
            const user = await this._userService.getUserById(userParams);
            return user; 
        } catch (error) {
            return this.sendResponse(error);
        }
    }

    public updateUser = async (userId: any, parsedBody: any) => {
        try {
            const user = await this._userService.updateUser(userId, parsedBody);
            return user; 
        } catch (error) {
            return this.sendResponse(error);
        }
    }

    public deleteUser = async (phoneNumber: number) => {
        try {
            const user = await this._userService.deleteUser(phoneNumber);
            return user; 
        } catch (error) {
            return this.sendResponse(error);
        }
    } 
    
    public verifyUser = async (otpBody: any) => {
        try {
            const user = await this._userService.verifyUser(otpBody);
            return user; 
        } catch (error) {
            return this.sendResponse(error);
        }
    }
    
    public getUserVerifyStatus = async (email:string) => {
        try {
            const user = await this._userService.getUserVerifyStatus(email.toLowerCase());
            return user; 
        } catch (error) {
            return this.sendResponse(error);
        }
    }

    // view all subusers
    // public getSubUsers = async (email: string) => {
    //     try {
    //         const subUser = await this._userService.getSubUsers(email.toLowerCase());
    //         return subUser; 
    //     } catch (error) {
    //         return this.sendResponse(error);
    //     }
    // }

    public clearDB = async () => {
        try {
            const subUser = await this._userService.clearDB();
            return subUser; 
        } catch (error) {
            return this.sendResponse(error);
        }
    }


    // remove subuser acess

    // save preferred name
    public savePreferredName = async (parsedBody: any) => {
        try {
            const user = await this._userService.savePreferredName(parsedBody);
            return user; 
        } catch (error) {
            return this.sendResponse(error);
        }
    }

    // check referral link
    public checkReferralLinkOrCode = async (userCode: any, preferredName: any) => {
        try {
            const user = await this._userService.checkReferralLinkOrCode(userCode, preferredName);
            return user; 
        } catch (error) {
            return this.sendResponse(error);
        }
    }

    // register referral 
    public registerReferral = async (userId: any, userBody: any) => {
        try {
            const userCode = GENERATE_STRING(6).toLowerCase();  // can be used as referral code
            const userType = 'user';
            const isVerified = false;
            const isActive = false;
            const createdDate = TODAYS_DATE();
            let {
                firstName,
                lastName,
                userName,
                gender,
                email,
                phoneNumber,
                birthPlace,
                birthDate,
                contactAddress,
                country,
                currency,
                password,
                accountType,
                registerType
            } = userBody;

            const parsedUser = {
                userCode,
                firstName,
                lastName,
                userName,
                gender,
                email: email.toLowerCase(),
                phoneNumber,
                birthPlace,
                birthDate,
                contactAddress,
                country,
                currency,
                userType,
                accountType,
                registerType,
                isActive,
                isVerified,
                password,
                createdDate
            }
            
            const referredUser = await this._userService.registerReferral(userId, parsedUser);
            return referredUser; 
        } catch (error) {
            return this.sendResponse(error);
        }
    }


    // upload profile picture
    public uploadProfilePicture = async (req: any, parsedFile: any, userCode: any) => {
        try {
            const user = await this._userService.uploadProfilePicture(req, parsedFile, userCode);
            return user; 
        } catch (error) {
            return this.sendResponse(error);
        }
    }

    // upload profile picture
    public uploadProfilePhoto = async (parsedFile: any, userCode: any) => {
        try {
            const user = await this._userService.uploadProfilePhoto(parsedFile, userCode);
            return user; 
        } catch (error) {
            return this.sendResponse(error);
        }
    }

    // add card details

    // remove card details

    // notification when bills are due, payment made



}
