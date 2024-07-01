import jwt from 'jsonwebtoken';
import fs from "fs";

const cloudinary = require('cloudinary').v2;

import { sendGridService } from '../../integrations/mails/sendgrid/service';

// import { sendMailService } from '../../thirdParty/mails/mandrill/service';

// import { twilioService } from '../../integrations/sms/twilio/service';
import { UserModel, UserActivateModel, UserInviteModel } from './model';

import { TODAYS_DATE,GENERATE_STRING, GENERATE_OTP_CODE, INVITE_STATUS } from '../../utils/constants';

// import { joinInvitation } from '../../shared/emailTemplates/join-invitation';
import { subUserInvitation } from '../../shared/emailTemplates/subuser-invitation';
import { primaryUserInvitationSent } from '../../shared/emailTemplates/primaryuser-invitation-sent';
import { sendOTPEmail } from '../../shared/emailTemplates/otp';
import { joinCongratuation } from '../../shared/emailTemplates/congrats';

import { addedSubUserMessage } from '../../shared/emailTemplates/added-subuser';
import { PORT } from '../../utils/secrets';
import { BillsChargeModel, SmsDeliveryModel } from '../UserSettings/model';

import { ObjectId } from "mongodb";

// import { EmailQueue } from '../../Queues/queueHandler';

// cloudinary.config({
//     cloud_name: 'daky6crds',
//     api_key: '535232689428166',
//     api_secret: 'edaZV3-JmJzDfWCdohUDivAEjXw'
// });

cloudinary.config({
    cloud_name: 'ddkvwvuat',
    api_key: '583323385643242',
    api_secret: 'sXhwnG2lX_vYKnI7M10CSKyKhLk'
});

// import { Queue, Worker } from 'bullmq'

// // Create a new connection in every instance
// const myQueue = new Queue('billonqueue', { connection: {
//   host: "billon.redis.cache.windows.net",
//   port: 6380
// }});

// const myWorker = new Worker('billonqueue', async (job) => {}, { connection: {
//   host: "billon.redis.cache.windows.net",
//   port: 6380
// }});


export class UserService {
    private ETZ_BVN = process.env.ETZ_BVN;

    // private _emailQueue = new EmailQueue();
    private _emailService = new sendGridService();
    // private _emailService = new sendMailService();

    // private _smsService = new twilioService();

    _pushResponse = [];

    private _setPushResponse = (pushResponse: any) => { this._pushResponse = pushResponse; }

    private _getPushResponse = () => { return this._pushResponse };

    private _totalInviteResponse = (data: any) => {
       return { success: true, statusCode: 200, message: "Invitation Responses", data };
    }
    
    private _getVerifiedFullName = async (userEmail: string) => {
        const userData = await UserModel.findOne({ email: userEmail, userType: 'user', accountType: 'primary', isVerified: true  });
        if (userData) {
            const userid = userData._id;
            const fullName = userData.firstName+' '+userData.lastName;
            return [userData, userid, fullName]; 
            // return userData;
        }
        return null;
    }

    private _getJustFullName = async (uemail: string) => {
        const userData = await UserModel.findOne({ email: uemail, userType: 'user' });
        if (userData) {
            const fullName = userData.firstName+' '+userData.lastName;
            return fullName; 
        }
        return null;
    }

    private _inviteMessage = async (senderEmail: string, inviteEmail: string, userEmailHash: any, inviteCode: any) => { 
        if(this._getVerifiedFullName(senderEmail)[0] !== null) {
            const fullName: any = await this._getVerifiedFullName(senderEmail);
            const senderFullName = fullName[2];
            const invitedFullName = await this._getJustFullName(inviteEmail);
            const sendInviteName = invitedFullName != null ? invitedFullName : 'There';
            console.log("userEmail--->", senderEmail);
            // return joinInvitation(senderFullName, sendInviteName, inviteEmail, senderEmail, userEmailHash, inviteCode);
            return subUserInvitation(senderFullName, sendInviteName, inviteEmail, senderEmail, userEmailHash, inviteCode);
        }
        return null;
    }
    
    private _primaryInviteSentMessage = async (senderEmail: string, inviteEmail: string) => { 
        if(this._getVerifiedFullName(senderEmail)[0] !== null) {
            const fullName: any = await this._getVerifiedFullName(senderEmail);
            const senderFullName = fullName[2];
            const invitedFullName = await this._getJustFullName(inviteEmail);
            const sendInviteName = invitedFullName != null ? invitedFullName : inviteEmail;
            console.log("userEmail--->", senderEmail);
            // return joinInvitation(senderFullName, sendInviteName, inviteEmail, senderEmail, userEmailHash, inviteCode);
            return primaryUserInvitationSent(senderFullName, sendInviteName, inviteEmail);
        }
        return null;
    }

    private _inviteOTPMessage = async (fullName: string, otpCode: any) => { 
        return sendOTPEmail(fullName, otpCode);
    }

    private _joinCongratsMessage = async (fullName: string) => { 
        return joinCongratuation(fullName);
    }

    private _addedSubUserMessage = async (fullName: string, subUserFullName: string, subUserEmail: any, 
        subUserRole: any, subUserPermission: any, subUserTransactionLimit: any) => { 
        return addedSubUserMessage(fullName,subUserFullName, subUserEmail, subUserRole, subUserPermission, subUserTransactionLimit);
    }

    private _sendEmail = async(to: string, subject: string, message: any) => {
        let emailData = { data: { to, subject, message } }; 
        await this._emailService.sendMail(emailData);
        // await this._emailQueue.addEmailToQueue(emailData);
        // await this._emailService.sendMail(to, subject, message);
    }

    private _saveInvite = async (uid: any, uemail: string, iemail: string, inviteCode: any) => {
        // console.log("uemail-->", uemail, ":::iemail-->", iemail);
        // const inviteData = await UserModel.findOne({ emal: iemail });
        // if(inviteData) {
        //     return { success: false, type: 'InvitedUserExist', email: iemail };
        // } else {
            const createdDate = TODAYS_DATE();
            // const inviteCode = GENERATE_STRING(16);
            // User accountType is a primary user and userType is user
            let parsedInvite = {
                userEmail: uemail.toLowerCase(),
                user: uid,
                inviteEmail: iemail.toLowerCase(),
                status: 'pending',
                createdDate
            }
            let newInvite = new UserInviteModel(parsedInvite);
            newInvite.setInviteCode(inviteCode);
            newInvite.setUserEmailHash(uemail);
            await newInvite.save(); 
            return newInvite;  
        // }
    }

    private _generateJWTToken = async (userId: any) => {
        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            return { success: false, user: null } 
        }
        // const token = jwt.sign({ userId: user._id }, appConfig.jwtSecret, {
        //     expiresIn: '2h',
        // });
        const today = new Date();
        const expirationDate = new Date(today)
        expirationDate.setDate(today.getDate() + 60)
        return jwt.sign({
            phoneNumber: user.phoneNumber,
            id: userId,
            exp: Math.round(expirationDate.getTime() / 1000),
        }, 'secret');
    }
    
    public createUser = async (parsedUser: any) => { 
        const password = parsedUser.password;
        const registerType = parsedUser.registerType;
        const strongPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;          
        const stringPassswordError = "Password must be strong. At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum eight in length.";
        const checkPassword = strongPasswordRegex.test(password);
        if((registerType == 'custom') && (password.length == 0)) {
            return { success: false, statusCode: 400, message: "Password cannot be empty", data: null };
        } else if ((registerType == 'custom') && !checkPassword) {
            return { success: false, statusCode: 400, message: stringPassswordError, data: null };
        } else if (((registerType == 'custom') && checkPassword) || (registerType == 'google') || (registerType == 'apple'))  {
            
            const emailAddress = parsedUser.email.toLowerCase();

            const userData = await UserModel.findOne({ email: emailAddress });
            if (userData) {
                let message = "Email address already exists. To continue ";
                if(userData.registerType == 'custom') message = "User already exists. To continue ";
                return { 
                    success: false, 
                    statusCode: 400, 
                    message: message, 
                    data: { 
                        previousRegisterType: userData.registerType, 
                        isVerified: userData.isVerified 
                    } 
                };
            } 
            else {
                let registerBody = {
                    userCode: GENERATE_STRING(8).toLowerCase(),
                    organizationId: parsedUser.organizationId,
                    firstName: parsedUser.firstName,
                    lastName: parsedUser.lastName,
                    fullName: parsedUser.firstName+" "+parsedUser.lastName,
                    email: emailAddress,
                    phoneNumber: parsedUser.phoneNumber,
                    isActive: true,
                    isVerified: true,
                    createdDate: new Date(),
                    userType: parsedUser.userType,
                    accountType: parsedUser.accountType,
                    registerType: parsedUser.registerType
                }
                const newUser = new UserModel(registerBody);
                newUser.setPassword(parsedUser.password);
                const saveUser = await newUser.save();
                if(saveUser) {
                    const saveUser = await newUser.save();
                    return { success: true, statusCode: 201, message: "User successfully signed up", data: saveUser };
                } else {
                    return { success: false, statusCode: 400, message: "Error creating User", data: saveUser };
                }
            } 
        } else {
            return { success: false, statusCode: 400, message: "There is an issue with password validation", data: null };
        }
    }

    public sendUserVerification = async (sendBody: any) => {
        try{
            let { phoneNumber, otpType, birthDate, bvn } = sendBody;
            const email = sendBody.email.toLowerCase();
            if((email.length == 0) || (phoneNumber.length == 0)) {
                return { success: false, statusCode: 400, message: "Email or Phone Number cannot be empty", data: null };
            } else {
                let user1 = await UserModel.findOne({ phoneNumber: phoneNumber });
                let user2 = await UserModel.findOne({ email: email.toLowerCase() });
                let user = (user1 != null) ? user1 : user2;  
                if (user) {
                    if(user.isVerified) {
                        let message = "User already verified";
                        if(user1) message = "Phone number exists, please try another one";
                        return { 
                            success: false, 
                            statusCode: 400, 
                            message: message, 
                            data: { 
                                previousRegisterType: user.registerType, 
                                isVerified: user.isVerified 
                            }
                        };
                    } else {
                        if (otpType !== "verification") {
                            return { success: false, statusCode: 400, message: "Unidentified OTP Type", data: null };
                        } else {
                            let checkOTPExist = await UserActivateModel.findOne({ email: email, phoneNumber, otpType: "verification" });
                            if(checkOTPExist) {
                                await UserActivateModel.findOneAndDelete({ email: email, phoneNumber, otpType: "verification" });
                            }

                            const otpCode =  GENERATE_OTP_CODE().toUpperCase();
                            var userVerify = new UserActivateModel();
                            userVerify.email = user.email.toLowerCase();
                            userVerify.phoneNumber = phoneNumber;
                            userVerify.otpCode = otpCode;
                            userVerify.otpType = "verification";
                            userVerify.createdDate = TODAYS_DATE();
                            userVerify.entryDate = new Date();

                            const fullName = `${user.firstName+' '+user.lastName}`;
                            
                            // SEND EMAIL
                            let messageToInvite = await this._inviteOTPMessage(fullName, otpCode);
                            if(messageToInvite != null) {
                                await this._sendEmail(email, 'Pottle Account Access', messageToInvite);
                            }
                            // let parsedPhone = phoneNumber.toString();
                            // const toPhoneNumber = "+234"+parsedPhone.substring(1);
                            // console.log("to Phone Number", toPhoneNumber);
                            // const smsMessage = `Hi ${user.firstName},\nGamification OTP Code: ${otpCode}`;
                            // SEND SMS
                            // let sendSMS = await this._smsService.sendSMS(String(toPhoneNumber), smsMessage);
                            // console.log("send sms", sendSMS);
                            const saveVerify = await userVerify.save();
                            if(saveVerify) {
                                return { success: true, statusCode: 200, message: "Verification code successfully sent.", data: saveVerify };
                            } else {
                                return { success: false, statusCode: 400, message: "Verification error occured", data: saveVerify };
                            }
                        }
                    }
                } else {
                    return { success: false, statusCode: 400, message: "User cannot be found", data: null };
                } 
            }
        } catch (e) {
            return { success: false, statusCode: 400, message: "An error occurred", data: e };
        }
    }

    public inviteSubUser = async (userEmail: any, inviteEmail: any) => {
        const inviteCode = GENERATE_STRING(16);
        const getUserData = await this._getVerifiedFullName(userEmail);
        if(getUserData !== null) {
            let pushResponse: any[] = [];
            for(let i=0; i < inviteEmail.length; i++) {
                const uid = getUserData[1];
                const saveInvite = await this._saveInvite(uid, userEmail, inviteEmail[i], inviteCode); 
                if(saveInvite != null) {
                    console.log(inviteEmail[i]);

                    const userEmailHash = saveInvite.userEmailHash;
                    let messageToInvite = await this._inviteMessage(userEmail, inviteEmail[i], userEmailHash, inviteCode);
                    console.log("save Invite--->", saveInvite);
                    await this._sendEmail(inviteEmail[i], 'BillOn Account Invitation', messageToInvite);

                    let informPrimaryUser = await this._primaryInviteSentMessage(userEmail, inviteEmail[i]);
                    await this._sendEmail(userEmail, 'BillOn Account Invitation', informPrimaryUser);

                    pushResponse.push({success: true, type: 'inviteSaved', email: inviteEmail[i]});
                } else {
                    pushResponse.push({success: false, type: 'senderNotFound', email: userEmail});
                }
                this._setPushResponse(pushResponse);
            }
            return this._totalInviteResponse(this._getPushResponse());
        } else {
            return { success: false, statusCode: 400, message: "User cannot be found", data: null };
        }
    }

    public performInviteOperation = async (parsedParams: any) => {
        const { inviteStatus, inviteEmail, userEmail, userEmailHash, inviteId } = parsedParams;
        
        console.log("userEmail-->", userEmail);

        const inviteData = await UserInviteModel.findOne({ inviteEmail: inviteEmail, userEmailHash: userEmailHash, status: 'pending' });
        if(inviteData) {
            if (inviteData?.validateUserEmailHash(String(userEmail))) {
                if(inviteData && inviteData.validateInviteCode(inviteId)) {
                    const userData = await UserModel.findOne({ email: inviteData.userEmail, accountType: 'primary', isVerified: true  });
                    console.log(userData);
                    if (userData) {
                        if(INVITE_STATUS.includes(inviteStatus)) {
                            inviteData.status = (inviteStatus == 'accept') ? 'accepted' : 'declined';
                            inviteData.updatedDate = TODAYS_DATE();
                            const updateInvite = await inviteData.save();
                            const existSubUser = await UserModel.findOne({ email: inviteEmail });
                            let subUserExist = (existSubUser) ? true : false;

                            const primaryUser = userData._id;
                            // const subUser =  inviteData._id;
                            // const subUser =  (existSubUser) ? existSubUser._id: inviteData._id;
                                
                            if(inviteStatus == 'accept') {
                                if(existSubUser) {
                                    // get info about the inviter
                                    const inviterInfo = await UserModel.findOne({ email: userEmail });
                                    if(inviterInfo) {
                                        const inviterInfoId = inviterInfo._id;

                                        // existSubUser.accountType = "primary";
                                        // existSubUser.havePrimaryUser = true;
                                        // existSubUser.primaryUser.push(inviterInfoId);
                                        await existSubUser.save();

                                        // update primary user record
                                        const inviteeId = existSubUser._id;
                                        // inviterInfo.haveSubUser = true;
                                        // inviterInfo.subUser.push(inviteeId);
                                        // inviterInfo.subUserStatus.push({
                                        //     'primaryUser': inviterInfoId,
                                        //     'subUser': inviteeId,
                                        //     'isDeactivated': false
                                        // });
                                        inviterInfo.updatedDate = TODAYS_DATE();
                                        await inviterInfo.save();

                                        // handle permission update
                                        // let checkBiller = await BillerPermissionModel.findOne({ primaryUser, subUser: inviteeId });
                                        // if(checkBiller) {
                                        //     checkBiller.subUser = inviteeId;
                                        //     checkBiller.requestStatus = 'approved';
                                        //     checkBiller.isActive = true;
                                        //     checkBiller.save();
                                        // }
                                        // let checkTransaction = await TransactionPermissionModel.findOne({ primaryUser, subUser: inviteeId });
                                        // if(checkTransaction) {
                                        //     checkTransaction.subUser = inviteeId;
                                        //     checkTransaction.requestStatus = 'approved';
                                        //     checkTransaction.isActive = true;
                                        //     checkTransaction.save();
                                        // }
                                        // let checkPayment = await PaymentPermissionModel.findOne({ primaryUser, subUser: inviteeId });
                                        // if(checkPayment) {
                                        //     checkPayment.subUser = inviteeId;
                                        //     checkPayment.requestStatus = 'approved';
                                        //     checkPayment.isActive = true;
                                        //     checkPayment.save();
                                        // }

                                        // console.log("checkBiller in performInviteOperation accept----->",checkBiller);
                                        // console.log("checkTransaction in performInviteOperation accept----->",checkTransaction);
                                        // console.log("checkPayment in performInviteOperation accept----->",checkPayment);

                                    }
                                }

                                return { 
                                    success: true, 
                                    statusCode: 200, 
                                    message: "Invitation was accepted", 
                                    data: { subUserExist }
                                };
                            } else {
                                // const subUser =  inviteData._id;
                                const subUser =  (existSubUser) ? existSubUser._id: inviteData._id;

                                // const checkBiller = await BillerPermissionModel.findOneAndDelete({ primaryUser, subUser, requestStatus: 'invited' });
                                // const checkTransaction = await TransactionPermissionModel.findOneAndDelete({ primaryUser, subUser, requestStatus: 'invited' });
                                // const checkPayment = await PaymentPermissionModel.findOneAndDelete({ primaryUser, subUser, requestStatus: 'invited' });

                                // console.log("checkBiller in performInviteOperation decline----->",checkBiller);
                                // console.log("checkTransaction in performInviteOperation decline----->",checkTransaction);
                                // console.log("checkPayment in performInviteOperation decline----->",checkPayment);

                                return { 
                                    success: false, 
                                    statusCode: 400, 
                                    message: "Invitation was declined", 
                                    data: { subUserExist }
                                };
                            }
                        } else {
                            return { success: false, statusCode: 400,  message: "Unrecognized Invitation Status", data: null };  
                        }
                    } else {
                        return { success: false, statusCode: 400, message: "Primary User cannot be found", data: null };
                    }
                } else {
                    return { success: false, statusCode: 400, message: "Invitation Details not valid (either invite email or link is invalid) or doesn't exist", data: null };
                }
            } else {
                return { success: false, statusCode: 400, message: "Primary User cannot be validated", data: null };
            }
        } else {
            return { success: false, statusCode: 400, message: "Sub User cannot be found or Status already changed", data: null };
        }
    }

    public getUsers = async (req: any) => {
        const { usertype } = req.headers;
        console.log(req.headers);
        const users = await UserModel.find({userType: usertype });
        if (users) return { success: true, statusCode: 200, message: "All Users successfully retrieved!", data: users };
        return { success: false, statusCode: 400,  message: "Error in fetching All Users", data: null };  
    }

    public getUserById = async (params: any) => {
        const { userId } = params;
        let userID = new ObjectId(userId);
        console.log("userID--->", userID)
        const user = await UserModel.findOne({ _id: userID });
        if (user) {
            return { success: true, statusCode: 200, message: "User successfully retrieved!", data: user };
        }
        return { success: false, statusCode: 400, message: "Error in fetching User Details", data: null };
    }

    public updateUser = async (userId:any, parsedBody: any) => {
        // const requestBodyNotAllowed = ['password', 'accountType', 'registerType', 'email', 'userCode', 'userName', 'subUser', 'isActive', 'isVerified' ]
        
        // const email = parsedBody.email.trim();
        let email = parsedBody.email;
        let phoneNumber = parsedBody.phoneNumber;

       let updatedUser = await UserModel.findOne({ _id: userId, email: email });
       console.log("updatedUser:::", updatedUser);
       if(updatedUser) {

            if(updatedUser.isVerified === false) return { success: false, statusCode: 400, message: "User is not verified yet", data: null };
            if(updatedUser.isActive === false) return { success: false, statusCode: 400, message: "User is not active", data: null };

            let firstName = parsedBody.firstName.trim();
            let lastName = parsedBody.lastName.trim();
            let birthDate = parsedBody.birthDate.trim(); 
            let birthPlace = parsedBody.birthPlace.trim(); 
            let contactAddress = parsedBody.contactAddress.trim(); 
            let country = parsedBody.country.trim();
            let state = parsedBody.state.trim();
            let city = parsedBody.city.trim();
            let zipCode = parsedBody.zipCode.trim();
            
            updatedUser.firstName = firstName;
            updatedUser.lastName = lastName;
            updatedUser.birthDate = birthDate;
            updatedUser.birthPlace = birthPlace;
            updatedUser.contactAddress = contactAddress;
            updatedUser.country = country;
            updatedUser.state = state;
            updatedUser.city = city;
            updatedUser.zipCode = zipCode;
            updatedUser.updatedDate = TODAYS_DATE();
    
            // don't forget to save!
            const savedUser = updatedUser.save();
            return { success: true, statusCode: 200, message: "User information updated", data: updatedUser };
        } else {
            return { success: false, statusCode: 400, message: "User not found", data: null };
        }

        // const updatedUser = await UserModel.findByIdAndUpdate(userId, {$set:parsedBody});
        // if (updatedUser) {
        //     return { success: true, statusCode: 200, message: "User successfully updated", data: updatedUser };
        // } else {
        //     return { success: false, statusCode: 400, message: "Error updating User details", data: null };
        // }
        
    }

    public deleteUser = async (phoneNumber: any) => {
        const user = await UserModel.findOneAndDelete({ phoneNumber });
        if(user) return { success: true, statusCode: 200, message: "User successfully deleted!", data: user };
        return { success: false, statusCode: 400, message: "Error in deleting User", data: null };
    }

    public verifyUser = async (parsedOtp: any) => {
        const { email, phoneNumber, otpCode, otpType } = parsedOtp;
        if((email.length == 0) && (phoneNumber.length == 0)) {
            return { success: false, statusCode: 400, message: "Both Email and Phone Number cannot be empty", data: null };
        } else {
            let user1 = await UserModel.findOne({ phoneNumber: phoneNumber });
            let user2 = await UserModel.findOne({ email: email });
            let user = (user1 != null) ? user1 : user2;  
            if (user) {
                if(user.isActive || user.isVerified) {
                    return { success: false, statusCode: 400, message: "User already verified", data: null };
                } else {
                    if (otpType !== "verification") {
                        return { success: false, statusCode: 400, message: "Unidentified OTP Type", data: null };
                    } else {
                        const activationData = await UserActivateModel.findOne({ email: email, otpCode: otpCode, otpType: "verification" });
                        if (activationData) {

                            // check if otp has expired, if yes delete and tell to resend
                            const otpCreatedTime = activationData.entryDate;
                            const getDateTime = new Date();

                            var otpSeconds = Math.floor((getDateTime.getTime() - otpCreatedTime.getTime()) / 1000);
                            // const seconds = Math.floor((endDate - startDate) / 1000);
                            // const minutes = Math.floor(seconds / 60);
                            // const hours = Math.floor(minutes / 60);
                            // const days = Math.floor(hours / 24);
                            console.log("get time difference--->", otpSeconds);
                            if(otpSeconds > 120) {
                                await UserActivateModel.findOneAndDelete({ email: email, phoneNumber, otpCode: otpCode, otpType: "verification" });
                                return { success: false, statusCode: 400, message: "OTP already expired. Kindly resend", data: null };
                            }
                            
                            user.isVerified = true;
                            user.isActive = true;
                            user.phoneNumber = (phoneNumber.length > 0) ? phoneNumber: "";
                            const saveVerifyUser = await user.save();
                            if(saveVerifyUser) {

                                console.log("User BVN------>", activationData.bvn);

                                // CREATE WALLET IF BVN IS SUPPLIED
                                if((activationData.bvn != '') || (activationData.bvn.length > 0)) {
                                    const parsedWalletInfo = { 
                                        userId: user._id, 
                                        bvn: activationData.bvn
                                    };

                                } else {
                                    // user.haveWallet = false;
                                    await user.save();
                                }

                                await UserActivateModel.findOneAndDelete({ email: email, otpCode: otpCode, otpType: "verification" });

                                // if accountType is subUser, send a mail notification to primary use

                                const getToken = await this._generateJWTToken(user._id);
                                const verifiedUser =  {
                                    _id: user._id,
                                    phoneNumber: user.phoneNumber,
                                    token: getToken,
                                }; // this is the same toAuth Method in user schema

                                const fullName = `${user.firstName+' '+user.lastName}`;

                                // SEND EMAIL
                                let messageToInvite = await this._joinCongratsMessage(fullName);
                                if(messageToInvite != null) {
                                    await this._sendEmail(email, 'BillOn Account Registration', messageToInvite);
                                }

                                // check if user is a subuser, then send email to primary user

                                // if(user.havePrimaryUser) {
                                //     if(user.primaryUser.length >= 1) {
                                //         const primaryUserId = (user.primaryUser.length == 1) ? user.primaryUser[0] : user.primaryUser[user.primaryUser.length - 1];
                                //         let primaryUser = await UserModel.findOne({ _id: primaryUserId });

                                //         let primaryUserFullName = primaryUser?.firstName+" "+primaryUser?.lastName;
                                //         let subUserFullName = fullName;
                                //         let subUserEmail = email;
                                //         let subUserRole = 'Not Set';
                                //         let subUserPermission = 'Not Set';
                                //         let subUserTransactionLimit = 'Not Set';

                                //         let sendPrimaryUserEmailMessage = await this._addedSubUserMessage(primaryUserFullName, 
                                //             subUserFullName, subUserEmail, subUserRole, subUserPermission, subUserTransactionLimit);
                                        
                                //             if(sendPrimaryUserEmailMessage != null) {
                                //             await this._sendEmail(email, 'BillOn Account Registration', sendPrimaryUserEmailMessage);
                                //         }
                                //     }
    
                                // }

                                return { success: true, statusCode: 200, message: 'User successfully verified', data: { info: user, extra: verifiedUser } };

                            } else {
                                return { success: false, statusCode: 400, message: "Unable to verify user", data: saveVerifyUser };
                            }
                        } else {
                            return { success: false, statusCode: 400, message: "Error verifying User/Verification Code not valid", data: null };
                        }
                    }
                }
            } else {
                return { success: false, statusCode: 400, message: "User cannot be found", data: null };
            } 
        }
    }
    
    public getUserVerifyStatus = async (email: string) => {
        const user = await UserModel.findOne({ email: email });
        if(user) {
            const isVerify = user.isActive;
            return { 
                success: true, 
                statusCode: 200, 
                message : (isVerify === true) ? "User is verified" : "Not verified yet", 
                data: { user, isVerify } 
            };
        } else {
            return { success: false, statusCode: 400, message: "User cannot be found", data: null };
        }
    }

    // public getSubUsers = async (userId: string) => {
    //     const user = await UserModel.findOne({ _id: userId, accountType: 'primary' });
    //     if (user) {
    //         const allSubUsers = user.subUser; 
    //         // console.log("all subusers-->", allSubUsers);

    //         let subUserArr: any[] = [];
    //         allSubUsers.forEach(async (subuser: any) => {
    //             const info = await UserModel.findOne({ _id: subuser });
    //             let subObject = {
    //                 _id: subuser,
    //                 firstName: info?.firstName,
    //                 lastName: info?.lastName,
    //                 email: info?.email,
    //                 phoneNumber: info?.phoneNumber,
    //                 picture: info?.picture,
    //                 joinedDate: info?.createdDate,
    //                 billerPermission: {},
    //                 transactionPermission: {},
    //                 paymentPermission: {},
    //             }

    //             // get permissions 
    //             // get transaction permission 
    //             const getTransPermission = await TransactionPermissionModel.findOne({ primaryUser: userId, subUser: subuser  });
    //             console.log("get Transaction Permission--->", getTransPermission);
    //             if(getTransPermission) {
    //                 subObject.transactionPermission = getTransPermission
    //             }
    //             // get biller permission 
    //             const getBillerPermission = await BillerPermissionModel.findOne({ primaryUser: userId, subUser: subuser  });
    //             console.log("get Biller Permission--->", getTransPermission);
    //             if(getBillerPermission) {
    //                 subObject.billerPermission = getBillerPermission
    //             }
    //             // get payment permission 
    //             const getPaymentPermission = await PaymentPermissionModel.findOne({ primaryUser: userId, subUser: subuser  });
    //             console.log("get Payment Permission--->", getPaymentPermission);
    //             if(getPaymentPermission) {
    //                 subObject.paymentPermission = getPaymentPermission
    //             }

    //             subUserArr.push(subObject);
    //             this._setPushResponse(subUserArr);
    //         });
    //         return { success: true, statusCode: 200, message: "SubUsers successfully retrieved!", data: this._getPushResponse() };
    //     }
    //     else {
    //         return { success: false, statusCode: 400, message: "User cannot be found or not a primary user", data: null };
    //     }
    // }


    // public getSubUsers = async (userId: string) => {
    //     let user = await UserModel.findById(userId).populate([{path: 'subUser', select: '-hash -salt -primaryUser' }]);
    //     if (user) {
    //         let subUserStatus = user.subUserStatus;
    //         let subUsers = user.subUser;
    //         let subUserArr: any[] = [];
    //         subUsers.forEach(async (subuser: any) => {
    //             let subUserObject = {
    //                 _id: subuser._id,
    //                 firstName: subuser?.firstName,
    //                 lastName: subuser?.lastName,
    //                 email: subuser?.email,
    //                 phoneNumber: subuser?.phoneNumber,
    //                 picture: subuser?.picture,
    //                 joinedDate: subuser?.createdDate,
    //                 subUserStatus: subUserStatus.filter((el: any) => { 
    //                    if ((el.primaryUser.toString() == userId) && 
    //                        (el.subUser.toString() == subuser._id.toString())) {
    //                         return el;
    //                    }
    //                 }),
    //                 // billerPermission: await BillerPermissionModel.find({ primaryUser: userId, subUser: subuser._id  }),
    //                 // transactionPermission: await TransactionPermissionModel.find({ primaryUser: userId, subUser: subuser._id  }),
    //                 // paymentPermission: await PaymentPermissionModel.find({ primaryUser: userId, subUser: subuser._id  })
    //             }
    //             subUserArr.push(subUserObject);
    //             this._setPushResponse(subUserArr);
    //         })                

    //         console.log("all subusers-->", subUserArr);
    //         return { success: true, statusCode: 200, message: "SubUsers successfully retrieved!", data: this._getPushResponse() };
    //     }
    //     else {
    //         return { success: false, statusCode: 400, message: "User cannot be found or not a primary user", data: null };
    //     }
    // }

    public clearDB = async () => {
        const user = await UserModel.deleteMany();
        const userInvite = await UserInviteModel.deleteMany();
        const userActivate = await UserActivateModel.deleteMany();
        const billsCharge = await BillsChargeModel.deleteMany();
        const smsDelivery = await SmsDeliveryModel.deleteMany();
         return { 
            success: true, 
            statusCode: 200, 
            message: "DB successfully cleared!", 
            data: { 
                user, 
                userInvite, 
                userActivate,
                billsCharge,
                smsDelivery,
            } 
        };
        // return { success: false, statusCode: 400, message: "Error in deleting User", data: null };
    }


    public savePreferredName = async (parsedBody: any) => {
        const { email, preferredName } = parsedBody;
        const user = await UserModel.findOne({ email: email });
        if (user) { 
                user.preferredName = preferredName;
                user.save();
            return { success: true, statusCode: 200, message: "Preferred Name successfully saved!", data: user.preferredName };
        }
        return { success: false, statusCode: 400, message: "Error in fetching User Details", data: null };
    }

    public checkReferralLinkOrCode = async (userCode: string, preferredName: string) => {
        const user = await UserModel.findOne({ userCode: userCode });
        if (user) { 
            if (user.preferredName.length == 0) {
                user.preferredName = preferredName;
                user.save();
            }
            return { success: true, statusCode: 200, message: "User Code successfully retrieved!", data: null };
        }
        return { success: false, statusCode: 400, message: "Error in fetching User Details", data: null };
    }
    
    public registerReferral = async (userId: any, parsedUser: any) => {
        const password = parsedUser.password;
        const registerType = parsedUser.registerType;
        const strongPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;            
        const stringPassswordError = "Password must be strong. At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum eight in length.";
        const checkPassword = strongPasswordRegex.test(password);
        if((registerType == 'custom') && (password.length == 0)) {
            return { success: false, statusCode: 400, message: "Password cannot be empty", data: null };
        } else if ((registerType == 'custom') && !checkPassword) {
            return { success: false, statusCode: 400, message: stringPassswordError, data: null };
        } else if (((registerType == 'custom') && checkPassword) || (registerType == 'google') || (registerType == 'apple'))  {

            const userData1 = await UserModel.findOne({ email: parsedUser.email.toLowerCase() });
            // console.log("userData1-->", userData1);
            if (userData1) {
                return { success: false, statusCode: 400, message: "You are already an existing user", data: null };
            } 
            else {
                const getReferral = (userId.length <= 6) ? await UserModel.findOne({ userCode: userId }) : await UserModel.findOne({ _id: userId });
                // const getReferralId = await UserModel.findOne({ id: userId });
                // const getReferralCode = await UserModel.findOne({ userCode: userId });
                // let getReferral = (getReferralId || getReferralCode) ? 
                //                     (getReferralId != null) ? getReferralId : getReferralCode :
                //                     null;

                if(getReferral) {
                    const newUser = new UserModel(parsedUser);
                    newUser.setPassword(parsedUser.password);

                    newUser.accountType = "primary";
                    newUser.referredBy = getReferral._id;
                    const saveUser = await newUser.save();
                    
                    // update referral user record
                    const invitedUser = saveUser._id;
                    getReferral.referralCount = getReferral.referralCount + 1;
                    getReferral.referredUser.push(invitedUser);
                    getReferral.updatedDate = TODAYS_DATE();
                    await getReferral.save();

                    return { success: true, statusCode: 201, message: "Referral successfully signed up", data: newUser };

                } else {
                    return { success: false, statusCode: 400, message: "Invalid Referral Code", data: null };
                }
            } 
        } else {
            return { success: false, statusCode: 400, message: "There is an issue with password validation", data: null };
        }
    }

    public uploadProfilePicture = async (req: any, parsedFile: any, userCode: any) => {
        try {
            console.log("file--->", parsedFile);
            const uploadFile = parsedFile;
            if (!uploadFile) {
                return { success: false, statusCode: 400, message: "No file is selected!", data: null };
            } else {
                const user = await UserModel.findOne({ userCode: userCode });
                if(user) {
                    const host = req.host;
                    const filePath = req.protocol + "://" + host + ':'  + PORT + '/' + parsedFile.path;
                    
                    console.log("filePath--->", filePath);

                    const fullPath = uploadFile.destination+"/"+uploadFile.filename;
                    user.picture = fullPath;
                    user?.save();
                    return { success: true, statusCode: 200, message: "Profile Picture successfully uploaded", data: { fullPath, info: uploadFile } };
                } else {
                 
                    return { success: false, statusCode: 400, message: "No such user found", data: null };   
                }
            }
        }
        catch (err) {
            return { success: false, statusCode: 500, message: "An error occurred!", data: err };
        }
    }

    public uploadProfilePhoto = async(parsedFile: any, userCode: any) => {
        const uploadFile = parsedFile;
        if (!uploadFile) {
            return { success: false, statusCode: 400, message: "No file is selected!", data: null };
        } else {
            const user = await UserModel.findOne({ userCode: userCode });
            if(user) {
                // Retrieve uploaded files from request object
                const image = parsedFile;
                // console.log("image--->", image)
                try {
                    const response = await cloudinary.uploader.upload(image?.path, {
                        folder: 'images',
                    })

                    user.picture =  response.secure_url;
                    user.save();
                    return { 
                        success: true, 
                        statusCode: 200, 
                        message: "Profile successfully uploaded", 
                        data: { 
                            user: user, 
                            public_id: response.public_id, 
                            url: response.secure_url
                        } 
                    };
                } catch {
                    return { success: true, statusCode: 500, message: "Error uploading profile picture", data: null }
                } finally {
                    fs.unlinkSync(image.path);
                }
            } else {
                return { success: false, statusCode: 400, message: "No such user found", data: null };   
            }
        }
    }

}