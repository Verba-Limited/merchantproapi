var nodemailer = require('nodemailer');
var mandrillTransport = require('nodemailer-mandrill-transport');

import { sendGridService } from '../../integrations/mails/sendgrid/service';
import { UserModel, UserActivateModel } from '../User/model';

import { sendResetPasswordOTPEmail } from '../../shared/emailTemplates/reset-password-otp';

import { TODAYS_DATE, GENERATE_OTP_CODE, GENERATE_RANDOM_PASSWORD } from '../../utils/constants';
import { BillsChargeModel, SmsDeliveryModel } from './model';
import { joinWaitlist } from '../../shared/emailTemplates/join-waitlist';

export class AccountService {
    private _emailService = new sendGridService();

    private _resetPasswordOTPMessage = async (fullName: string, otpCode: any) => { 
        return sendResetPasswordOTPEmail(fullName, otpCode);
    }

    private _inviteWaitlistMessage = async (fullName: string) => { 
        return joinWaitlist(fullName);
    }
 
    private _sendEmail = async(to: string, subject: string, message: any) => {
        let emailData = { data: { to, subject, message } }; 
        await this._emailService.sendMail(emailData);
        // await this._emailService.sendMail(to, subject, message);
    }

    public forgotPassword = async (parsedbody: any) => {
        const email = parsedbody.email.toLowerCase();

        const user = await UserModel.findOne({ email: email });
        if (user) {
            const otpCode = GENERATE_OTP_CODE().toUpperCase();
            var userActivate = new UserActivateModel();
            userActivate.email = email;
            userActivate.otpCode = otpCode;
            userActivate.otpType = "forgotpassword";
            userActivate.createdDate = TODAYS_DATE();

            const saveActivate = await userActivate.save();
            if(saveActivate) {
               //  const message = `Your BillOn Reset Password OTP is:  <strong>${otpCode}</strong>`;
                // await this._sendEmail(email, "RESET PASSWORD", message);

                const fullName = `${user.firstName+' '+user.lastName}`;

                // SEND EMAIL
                let sendMessage = await this._resetPasswordOTPMessage(fullName, otpCode);
                if(sendMessage != null) {
                    await this._sendEmail(email, 'BillOn Reset Password', sendMessage);
                }

                return { success: true, statusCode: 201, message: "OTP successfully sent", data: { user: saveActivate, otp: userActivate.otpCode } };
            } else {
                return { success: false, statusCode: 400, message: "Verification error occur", data: saveActivate };
            }
        } else {
            return { success: false, statusCode: 400, message: "User cannot be found", data: null };
        }
    }

    public verifyAccountPasswordCode = async (parsedOtp: any) => {
        const { otpCode, otpType } = parsedOtp;
        const email = parsedOtp.email.toLowerCase();

        let user = await UserModel.findOne({ email: email });
        if(user) {
            if (otpType !== "forgotpassword") {
                return { success: false, statusCode: 400, message: "Unidentified OTP Type", data: null };
            } else {
                if(user.isVerified === false) {
                    return { success: false, statusCode: 400, message: "Your account is not yet verified", data: null };
                } else {
                    const activationData = await UserActivateModel.findOne({ email: email, otpCode: otpCode, otpType: "forgotpassword" });
                    if (activationData) {
                        await UserActivateModel.findOneAndDelete({ email: email, otpCode: otpCode, otpType: "forgotpassword" });

                        const newPassword = GENERATE_RANDOM_PASSWORD(12);
                        user.setPassword(newPassword);
                        const savePassword = await user.save();
                        // return HandleResponse(res, null, { info: newPassword, extra: user.toAuthJSON() }, "OTP Code verified. New Password is: "+newPassword+", You can reset after login or in settings.");
                        return { success: true, statusCode: 200, message: "OTP Code Verified. New Password is: "+newPassword+", You can reset after login or in settings.", data: savePassword };
                    } else {
                        return { success: false, statusCode: 400, message: "Error verifying User/Verification Code not valid", data: null };
                    }
                }
            }
        } else {
            return { success: false, statusCode: 400, message: "User cannot be found", data: null };
        } 
    }

    public resetPassword = async (parsedPassword: any) => {
        const { newPassword } = parsedPassword;
        
        const email = parsedPassword.email.toLowerCase();

        let user = await UserModel.findOne({ email: email });
        if(user) {
            if(user.isVerified === false) {
                return { success: false, statusCode: 400, message: "Your account is not yet verified", data: null };
            } else {
                user.setPassword(newPassword);
                const savePassword = await user.save();
                return { success: true, statusCode: 200, message: "Password reset was successful", data: savePassword };
            }
        } else {
            return { success: false, statusCode: 400, message: "User cannot be found", data: null };
        } 
    }

    public changePassword = async (userId: any,  parsedBody: any) => {
        const { phoneNumber, oldPassword, newPassword } = parsedBody;
        
        const email = parsedBody.email.toLowerCase();
        if(oldPassword === newPassword) {
            return { success: false, statusCode: 400, message: "Old Password cannot be same with New Password", data: null };
        }
        let user = await UserModel.findOne({ _id: userId, email: email, phoneNumber: phoneNumber });
        if(user) {
            if(!user.isVerified || !user.isActive) {
                return { success: false, statusCode: 400, message: "Your account is not verified/active", data: null };
            } else {
                if(user.validatePassword(oldPassword)) {
                    user.setPassword(newPassword);
                    const updatePassword = await user.save();
                    return { success: true, statusCode: 200, message: "Password succesfully changed", data: updatePassword };
                } else {
                    return { success: false, statusCode: 400, message: "Old Password is invalid, Kindly provide a correct one.", data: null };
                }
            }
        } else {
            return { success: false, statusCode: 400, message: "User cannot be found", data: null };
        } 
    }

    public deactivateAccount = async (userId: any, parsedBody: any) => {
        const { phoneNumber } = parsedBody;
        
        const email = parsedBody.email.toLowerCase();

        let user = await UserModel.findOne({ _id: userId, email, phoneNumber });
        if(user) {
            if(!user.isVerified || !user.isActive) {
                return { success: false, statusCode: 400, message: "Your account is not verified/active", data: null };
            } else {
                user.isActive = false;
                const deactivated = await user.save();
                return { success: true, statusCode: 200, message: "User succesfully deactivated", data: deactivated };
                
            }
        } else {
            return { success: false, statusCode: 400, message: "User cannot be found", data: null };
        } 
    }


    public smsDeliveryStatus = async (messageBody: any) => {
        const { MessageSid, MessageStatus  } = messageBody;

        let parsedSMS = new SmsDeliveryModel();
        parsedSMS.messageSid = MessageSid;
        parsedSMS.messageStatus = MessageStatus
        parsedSMS.createdDate = new Date();
        parsedSMS.save(); 

        return { success: true, statusCode: 200, message: "SMS Delivery Response", data: parsedSMS };
        
    }


    public sendTestEmail = async (messageBody: any) => {
        var message;
        var transport = nodemailer.createTransport(mandrillTransport({
            auth: {
              apiKey: 'md-WD3XmbI35NTJoee0tqUw4g'
            }
          }));
           
          transport.sendMail({
            from: 'support@billon.ng',
            to: 'kanmitowolabi@gmail.com',
            subject: 'Hello From BillOn',
            html: '<p>How are you?</p>'
          }, function(err: any, info: any) {
            if (err) {
              console.error(err);
              message = err;
              return { success: false, statusCode: 400, message: "Email Response", data: err };
            } else {
              console.log(info);
              message = info;
              return { success: true, statusCode: 200, message: "Email Response", data: info };
            }
          });
          return { success: true, statusCode: 200, message: "Email Response", data: message };
    }

    public setConvenienceFee = async (parsedBody: any) => {
        const { phoneNumber, billCategory, fee, vat, valueIn } = parsedBody;
        
        const email = parsedBody.email.toLowerCase();

        let user = await UserModel.findOne({ email: email, phoneNumber: phoneNumber });
        if(user) {
            if(!user.isVerified || !user.isActive) {
                return { success: false, statusCode: 400, message: "Your account is not verified/active", data: null };
            } else {
                const userType = user.userType;
                if (userType == 'admin') {
                    let convenienceCharge = await BillsChargeModel.findOne({ setBy: email, billCategory: billCategory });
                    if(convenienceCharge) {
                        convenienceCharge.fee = fee;
                        convenienceCharge.vat = vat;
                        convenienceCharge.valueIn = valueIn;
                        convenienceCharge.updatedDate = TODAYS_DATE();
                        convenienceCharge.save();
                        return { success: true, statusCode: 200, message: "Charge successfully updated", data: convenienceCharge };
                    } else {
                        const x = {
                            setBy: email,
                            billCategory,
                            fee,
                            vat,
                            valueIn,
                            userType,
                            createdDate: TODAYS_DATE()
                        }
                        const newConvenienceCharge = new BillsChargeModel(x);
                        newConvenienceCharge.save();
                        return { success: true, statusCode: 200, message: "Charge successfully set", data: convenienceCharge };
                    }
                }
                return { success: false, statusCode: 403, message: "User not permitted to perform operation", data: user.userType };
            }
        } else {
            return { success: false, statusCode: 400, message: "User cannot be found", data: null };
        } 
    }

    public sendWaitlistEmail = async (messageBody: any) => {
        let { email, firstName, lastName } = messageBody;
        
        const fullName = firstName+" "+lastName;

        let htmlMessage = await this._inviteWaitlistMessage(fullName);
        if(htmlMessage != null) {
            await this._sendEmail(email, 'BillOn WaitList', htmlMessage);
        }
        
        return { success: true, statusCode: 200, message: "Waitlist Email Response", data: email };
    }

}