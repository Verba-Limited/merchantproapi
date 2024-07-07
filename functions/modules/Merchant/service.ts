import jwt from 'jsonwebtoken';
import fs from "fs";

const cloudinary = require('cloudinary').v2;

import { sendGridService } from '../../integrations/mails/sendgrid/service';

// import { sendMailService } from '../../thirdParty/mails/mandrill/service';

// import { twilioService } from '../../integrations/sms/twilio/service';
import { MerchantModel, MerchantActivateModel, MerchantInviteModel } from './model';

import { TODAYS_DATE,GENERATE_STRING, GENERATE_OTP_CODE, INVITE_STATUS } from '../../utils/constants';

// import { joinInvitation } from '../../shared/emailTemplates/join-invitation';
import { sendOTPEmail } from '../../shared/emailTemplates/otp';
import { joinCongratuation } from '../../shared/emailTemplates/congrats';

import { PORT } from '../../utils/secrets';

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


export class MerchantService {
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
    

    private _inviteOTPMessage = async (fullName: string, otpCode: any) => { 
        return sendOTPEmail(fullName, otpCode);
    }

    private _joinCongratsMessage = async (fullName: string) => { 
        return joinCongratuation(fullName);
    }


    private _sendEmail = async(to: string, subject: string, message: any) => {
        let emailData = { data: { to, subject, message } }; 
        await this._emailService.sendMail(emailData);
        // await this._emailQueue.addEmailToQueue(emailData);
        // await this._emailService.sendMail(to, subject, message);
    }

    private _saveInvite = async (uid: any, uemail: string, iemail: string, inviteCode: any) => {
        // console.log("uemail-->", uemail, ":::iemail-->", iemail);
        // const inviteData = await MerchantModel.findOne({ emal: iemail });
        // if(inviteData) {
        //     return { success: false, type: 'InvitedMerchantExist', email: iemail };
        // } else {
            const createdDate = TODAYS_DATE();
            // const inviteCode = GENERATE_STRING(16);
            // Merchant accountType is a primary merchant and merchantType is merchant
            let parsedInvite = {
                merchantEmail: uemail.toLowerCase(),
                merchant: uid,
                inviteEmail: iemail.toLowerCase(),
                status: 'pending',
                createdDate
            }
            let newInvite = new MerchantInviteModel(parsedInvite);
            newInvite.setInviteCode(inviteCode);
            newInvite.setMerchantEmailHash(uemail);
            await newInvite.save(); 
            return newInvite;  
        // }
    }

    private _generateJWTToken = async (merchantId: any) => {
        const merchant = await MerchantModel.findOne({ _id: merchantId });
        if (!merchant) {
            return { success: false, merchant: null } 
        }
        // const token = jwt.sign({ merchantId: merchant._id }, appConfig.jwtSecret, {
        //     expiresIn: '2h',
        // });
        const today = new Date();
        const expirationDate = new Date(today)
        expirationDate.setDate(today.getDate() + 60)
        return jwt.sign({
            phoneNumber: merchant.businessInfo.businessPhoneNumber,
            id: merchantId,
            exp: Math.round(expirationDate.getTime() / 1000),
        }, 'secret');
    }
    
    public createMerchant = async (parsedMerchant: any) => { 
        const password = parsedMerchant.password;
        const registerType = parsedMerchant.registerType;
        const strongPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;          
        const stringPassswordError = "Password must be strong. At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum eight in length.";
        const checkPassword = strongPasswordRegex.test(password);
        if(password.length == 0) {
            return { success: false, statusCode: 400, message: "Password cannot be empty", data: null };
        } else if (!checkPassword) {
            return { success: false, statusCode: 400, message: stringPassswordError, data: null };
        } else if (checkPassword)  {
            
            const emailAddress = parsedMerchant.email.toLowerCase();

            const merchantData = await MerchantModel.findOne({ email: emailAddress });
            if (merchantData) {
                let message = "Merchant already exists. To continue ";
                return { 
                    success: false, 
                    statusCode: 400, 
                    message: message, 
                    data: null
                };
            } 
            else {
                // let registerBody = {
                //     merchantCode: GENERATE_STRING(8).toLowerCase(),
                //     organizationId: parsedMerchant.organizationId,
                //     firstName: parsedMerchant.firstName,
                //     lastName: parsedMerchant.lastName,
                //     fullName: parsedMerchant.firstName+" "+parsedMerchant.lastName,
                //     email: emailAddress,
                //     phoneNumber: parsedMerchant.phoneNumber,
                //     isActive: true,
                //     isVerified: true,
                //     createdDate: new Date(),
                //     merchantType: parsedMerchant.merchantType,
                //     accountType: parsedMerchant.accountType,
                //     registerType: parsedMerchant.registerType
                // }
                // const newMerchant = new MerchantModel(registerBody);

                // Create a new merchant document
                const newMerchant = new MerchantModel(parsedMerchant);
                newMerchant.createdDate = new Date();
                newMerchant.setPassword(parsedMerchant.password);

                const saveMerchant = await newMerchant.save();
                if(saveMerchant) {
                    const saveMerchant = await newMerchant.save();
                    return { success: true, statusCode: 201, message: "Merchant registered successfully", data: saveMerchant };
                } else {
                    return { success: false, statusCode: 400, message: "Error creating Merchant", data: saveMerchant };
                }
            } 
        } else {
            return { success: false, statusCode: 400, message: "There is an issue with password validation", data: null };
        }
    }

    public sendMerchantVerification = async (sendBody: any) => {
        try{
            let { phoneNumber, otpType, birthDate, bvn } = sendBody;
            const email = sendBody.email.toLowerCase();
            if((email.length == 0) || (phoneNumber.length == 0)) {
                return { success: false, statusCode: 400, message: "Email or Phone Number cannot be empty", data: null };
            } else {
                let merchant1 = await MerchantModel.findOne({ phoneNumber: phoneNumber });
                let merchant2 = await MerchantModel.findOne({ email: email.toLowerCase() });
                let merchant = (merchant1 != null) ? merchant1 : merchant2;  
                if (merchant) {
                    if(merchant.verified) {
                        let message = "Merchant already verified";
                        if(merchant1) message = "Phone number exists, please try another one";
                        return { 
                            success: false, 
                            statusCode: 400, 
                            message: message, 
                            data: { 
                                isVerified: merchant.verified 
                            }
                        };
                    } else {
                        if (otpType !== "verification") {
                            return { success: false, statusCode: 400, message: "Unidentified OTP Type", data: null };
                        } else {
                            let checkOTPExist = await MerchantActivateModel.findOne({ email: email, phoneNumber, otpType: "verification" });
                            if(checkOTPExist) {
                                await MerchantActivateModel.findOneAndDelete({ email: email, phoneNumber, otpType: "verification" });
                            }

                            const otpCode =  GENERATE_OTP_CODE().toUpperCase();
                            var merchantVerify = new MerchantActivateModel();
                            merchantVerify.email = merchant.email.toLowerCase();
                            merchantVerify.phoneNumber = phoneNumber;
                            merchantVerify.otpCode = otpCode;
                            merchantVerify.otpType = "verification";
                            merchantVerify.createdDate = TODAYS_DATE();
                            merchantVerify.entryDate = new Date();

                            const fullName = `${merchant.firstName+' '+merchant.lastName}`;
                            
                            // SEND EMAIL
                            let messageToInvite = await this._inviteOTPMessage(fullName, otpCode);
                            if(messageToInvite != null) {
                                await this._sendEmail(email, 'Pottle Account Access', messageToInvite);
                            }
                            // let parsedPhone = phoneNumber.toString();

                            // const toPhoneNumber = "+234"+parsedPhone.substring(1);
                            // console.log("to Phone Number", toPhoneNumber);
                            // const smsMessage = `Hi ${merchant.firstName},\nGamification OTP Code: ${otpCode}`;
                            // // SEND SMS
                            // let sendSMS = await this._smsService.sendSMS(String(toPhoneNumber), smsMessage);
                            // console.log("send sms", sendSMS);
                            const saveVerify = await merchantVerify.save();
                            if(saveVerify) {
                                return { success: true, statusCode: 200, message: "Verification code successfully sent.", data: saveVerify };
                            } else {
                                return { success: false, statusCode: 400, message: "Verification error occured", data: saveVerify };
                            }
                        }
                    }
                } else {
                    return { success: false, statusCode: 400, message: "Merchant cannot be found", data: null };
                } 
            }
        } catch (e) {
            return { success: false, statusCode: 400, message: "An error occurred", data: e };
        }
    }

    public getMerchants = async (req: any) => {
        const { merchanttype } = req.headers;
        console.log(req.headers);
        const merchants = await MerchantModel.find({merchantType: merchanttype });
        if (merchants) return { success: true, statusCode: 200, message: "All Merchants successfully retrieved!", data: merchants };
        return { success: false, statusCode: 400,  message: "Error in fetching All Merchants", data: null };  
    }

    public getMerchantById = async (params: any) => {
        const { merchantId } = params;
        let merchantID = new ObjectId(merchantId);
        console.log("merchantID--->", merchantID)
        const merchant = await MerchantModel.findById(merchantID);
        if (merchant) {
            return { success: true, statusCode: 200, message: "Merchant successfully retrieved!", data: merchant };
        }
        return { success: false, statusCode: 400, message: "Error in fetching Merchant Details", data: null };
    }

    public updateMerchant = async (merchantId:any, parsedBody: any) => {
        // const requestBodyNotAllowed = ['password', 'accountType', 'registerType', 'email', 'merchantCode', 'merchantName', 'subMerchant', 'isActive', 'isVerified' ]
        
        // const email = parsedBody.email.trim();
        let email = parsedBody.email;
        let phoneNumber = parsedBody.phoneNumber;

       let updatedMerchant = await MerchantModel.findOne({ _id: merchantId, email: email });
       console.log("updatedMerchant:::", updatedMerchant);
       if(updatedMerchant) {

            if(updatedMerchant.verified === false) return { success: false, statusCode: 400, message: "Merchant is not verified yet", data: null };
            
            let firstName = parsedBody.firstName.trim();
            let lastName = parsedBody.lastName.trim();
            let contactAddress = parsedBody.contactAddress.trim(); 
            
            updatedMerchant.firstName = firstName;
            updatedMerchant.lastName = lastName;
            updatedMerchant.businessInfo.businessAddress = contactAddress;
            updatedMerchant.updatedDate = new Date();
    
            // don't forget to save!
            const savedMerchant = updatedMerchant.save();
            return { success: true, statusCode: 200, message: "Merchant information updated", data: updatedMerchant };
        } else {
            return { success: false, statusCode: 400, message: "Merchant not found", data: null };
        }

        // const updatedMerchant = await MerchantModel.findByIdAndUpdate(merchantId, {$set:parsedBody});
        // if (updatedMerchant) {
        //     return { success: true, statusCode: 200, message: "Merchant successfully updated", data: updatedMerchant };
        // } else {
        //     return { success: false, statusCode: 400, message: "Error updating Merchant details", data: null };
        // }
        
    }

    public deleteMerchant = async (phoneNumber: any) => {
        const merchant = await MerchantModel.findOneAndDelete({ phoneNumber });
        if(merchant) return { success: true, statusCode: 200, message: "Merchant successfully deleted!", data: merchant };
        return { success: false, statusCode: 400, message: "Error in deleting Merchant", data: null };
    }

    public verifyMerchant = async (parsedOtp: any) => {
        const { email, phoneNumber, otpCode, otpType } = parsedOtp;
        if((email.length == 0) && (phoneNumber.length == 0)) {
            return { success: false, statusCode: 400, message: "Both Email and Phone Number cannot be empty", data: null };
        } else {
            let merchant1 = await MerchantModel.findOne({ phoneNumber: phoneNumber });
            let merchant2 = await MerchantModel.findOne({ email: email });
            let merchant = (merchant1 != null) ? merchant1 : merchant2;  
            if (merchant) {
                if(merchant.verified) {
                    return { success: false, statusCode: 400, message: "Merchant already verified", data: null };
                } else {
                    if (otpType !== "verification") {
                        return { success: false, statusCode: 400, message: "Unidentified OTP Type", data: null };
                    } else {
                        const activationData = await MerchantActivateModel.findOne({ email: email, otpCode: otpCode, otpType: "verification" });
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
                                await MerchantActivateModel.findOneAndDelete({ email: email, phoneNumber, otpCode: otpCode, otpType: "verification" });
                                return { success: false, statusCode: 400, message: "OTP already expired. Kindly resend", data: null };
                            }
                            
                            merchant.verified = true;
                            merchant.businessInfo.businessPhoneNumber = (phoneNumber.length > 0) ? phoneNumber: "";
                            const saveVerifyMerchant = await merchant.save();
                            if(saveVerifyMerchant) {

                                console.log("Merchant BVN------>", activationData.bvn);

                                // CREATE WALLET IF BVN IS SUPPLIED
                                if((activationData.bvn != '') || (activationData.bvn.length > 0)) {
                                    const parsedWalletInfo = { 
                                        merchantId: merchant._id, 
                                        bvn: activationData.bvn
                                    };

                                } else {
                                    // merchant.haveWallet = false;
                                    await merchant.save();
                                }

                                await MerchantActivateModel.findOneAndDelete({ email: email, otpCode: otpCode, otpType: "verification" });

                                // if accountType is subMerchant, send a mail notification to primary use

                                const getToken = await this._generateJWTToken(merchant._id);
                                const verifiedMerchant =  {
                                    _id: merchant._id,
                                    phoneNumber: merchant.businessInfo.businessPhoneNumber,
                                    token: getToken,
                                }; // this is the same toAuth Method in merchant schema

                                const fullName = `${merchant.firstName+' '+merchant.lastName}`;

                                // SEND EMAIL
                                let messageToInvite = await this._joinCongratsMessage(fullName);
                                if(messageToInvite != null) {
                                    await this._sendEmail(email, 'BillOn Account Registration', messageToInvite);
                                }

                                // check if merchant is a submerchant, then send email to primary merchant

                                // if(merchant.havePrimaryMerchant) {
                                //     if(merchant.primaryMerchant.length >= 1) {
                                //         const primaryMerchantId = (merchant.primaryMerchant.length == 1) ? merchant.primaryMerchant[0] : merchant.primaryMerchant[merchant.primaryMerchant.length - 1];
                                //         let primaryMerchant = await MerchantModel.findOne({ _id: primaryMerchantId });

                                //         let primaryMerchantFullName = primaryMerchant?.firstName+" "+primaryMerchant?.lastName;
                                //         let subMerchantFullName = fullName;
                                //         let subMerchantEmail = email;
                                //         let subMerchantRole = 'Not Set';
                                //         let subMerchantPermission = 'Not Set';
                                //         let subMerchantTransactionLimit = 'Not Set';

                                //         let sendPrimaryMerchantEmailMessage = await this._addedSubMerchantMessage(primaryMerchantFullName, 
                                //             subMerchantFullName, subMerchantEmail, subMerchantRole, subMerchantPermission, subMerchantTransactionLimit);
                                        
                                //             if(sendPrimaryMerchantEmailMessage != null) {
                                //             await this._sendEmail(email, 'BillOn Account Registration', sendPrimaryMerchantEmailMessage);
                                //         }
                                //     }
    
                                // }

                                return { success: true, statusCode: 200, message: 'Merchant successfully verified', data: { info: merchant, extra: verifiedMerchant } };

                            } else {
                                return { success: false, statusCode: 400, message: "Unable to verify merchant", data: saveVerifyMerchant };
                            }
                        } else {
                            return { success: false, statusCode: 400, message: "Error verifying Merchant/Verification Code not valid", data: null };
                        }
                    }
                }
            } else {
                return { success: false, statusCode: 400, message: "Merchant cannot be found", data: null };
            } 
        }
    }
    
    public getMerchantVerifyStatus = async (email: string) => {
        const merchant = await MerchantModel.findOne({ email: email });
        if(merchant) {
            const isVerify = merchant.verified;
            return { 
                success: true, 
                statusCode: 200, 
                message : (isVerify === true) ? "Merchant is verified" : "Not verified yet", 
                data: { merchant, isVerify } 
            };
        } else {
            return { success: false, statusCode: 400, message: "Merchant cannot be found", data: null };
        }
    }

    public clearDB = async () => {
        const merchant = await MerchantModel.deleteMany();
        const merchantInvite = await MerchantInviteModel.deleteMany();
        const merchantActivate = await MerchantActivateModel.deleteMany();
         return { 
            success: true, 
            statusCode: 200, 
            message: "DB successfully cleared!", 
            data: { 
                merchant, 
                merchantInvite, 
                merchantActivate,
            } 
        };
        // return { success: false, statusCode: 400, message: "Error in deleting Merchant", data: null };
    }

    public uploadProfilePicture = async (req: any, parsedFile: any, merchantCode: any) => {
        try {
            console.log("file--->", parsedFile);
            const uploadFile = parsedFile;
            if (!uploadFile) {
                return { success: false, statusCode: 400, message: "No file is selected!", data: null };
            } else {
                const merchant = await MerchantModel.findOne({ merchantCode: merchantCode });
                if(merchant) {
                    const host = req.host;
                    const filePath = req.protocol + "://" + host + ':'  + PORT + '/' + parsedFile.path;
                    
                    console.log("filePath--->", filePath);

                    const fullPath = uploadFile.destination+"/"+uploadFile.filename;
                    merchant.businessInfo.logo = fullPath;
                    merchant?.save();
                    return { success: true, statusCode: 200, message: "Profile Picture successfully uploaded", data: { fullPath, info: uploadFile } };
                } else {
                 
                    return { success: false, statusCode: 400, message: "No such merchant found", data: null };   
                }
            }
        }
        catch (err) {
            return { success: false, statusCode: 500, message: "An error occurred!", data: err };
        }
    }

    public uploadProfilePhoto = async(parsedFile: any, merchantCode: any) => {
        const uploadFile = parsedFile;
        if (!uploadFile) {
            return { success: false, statusCode: 400, message: "No file is selected!", data: null };
        } else {
            const merchant = await MerchantModel.findOne({ merchantCode: merchantCode });
            if(merchant) {
                // Retrieve uploaded files from request object
                const image = parsedFile;
                // console.log("image--->", image)
                try {
                    const response = await cloudinary.uploader.upload(image?.path, {
                        folder: 'images',
                    })

                    merchant.businessInfo.logo =  response.secure_url;
                    merchant.save();
                    return { 
                        success: true, 
                        statusCode: 200, 
                        message: "Profile successfully uploaded", 
                        data: { 
                            merchant: merchant, 
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
                return { success: false, statusCode: 400, message: "No such merchant found", data: null };   
            }
        }
    }

}