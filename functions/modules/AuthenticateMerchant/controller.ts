import { RequestHandler } from 'express';
import { MerchantModel } from '../Merchant/model';
import passport from 'passport';

// import { googleAuthController } from '../../thirdParty/googleauth/controllers';

export const login: RequestHandler = async (req, res, next) => {
    const email = (req.body as { email: string }).email.toLowerCase();
    const password = (req.body as { password: string }).password;
    // const loginType = (req.body as { loginType: string }).loginType;
    
    if (!email) {
        return res.status(422).json({ success: false, statusCode: 400, message: 'email address is required', error: 'email address is required', data: null })
    }
    if (!password) {
        return res.status(422).json({ success: false, statusCode: 400, message: 'password is required', error: 'password is required', data: null })
    }
    // if (loginType == 'custom' || loginType == 'google') {
    if (email && password) {
        return passport.authenticate('local', { session: false }, async (err: any, passportMerchant: any, info: any) => {
            if (err) {
                return next(err)
            } 
            if (passportMerchant) {
                const merchant = passportMerchant;
                merchant.token = passportMerchant.generateJWT();
                return res.json({ 
                    success: true, 
                    statusCode: 200, 
                    message: 'login successful', 
                    data: { info: merchant, extra: merchant.toAuthJSON() } 
                })
            }
            let statusCode = 400;
            // if(loginType == 'google') statusCode = 406;
            return res.status(statusCode).json({ success: false, statusCode: statusCode, message: info.errors, data: info.data })
        })(req, res, next)
    }
    else {
        return res.status(400).json({ success: false, statusCode: 400, message: 'login type is not valid', data: null })
    }
    
        //     // const _googleAuthService = new googleAuthController();
        //     // const validateLogin = await _googleAuthService.verifyGoogleToken(password);
        //     // console.log("validateLogin-->", validateLogin);
        //     // if(validateLogin.success) {
        //         // return passport.authenticate("google", { session: false }, async (err: any, passportMerchant: any, info: any) => {
        //         return passport.authenticate("local", { session: false }, async (err: any, passportMerchant: any, info: any) => {
        //             if (err) {
        //                 return next(err)
        //             } 
        //             if (passportMerchant) {
        //                 const merchant = passportMerchant;
        //                 merchant.token = passportMerchant.generateJWT();
        //                 return res.json({ 
        //                     success: true, 
        //                     statusCode: 200, 
        //                     message: 'google login successful', 
        //                     data: { info: merchant, extra: merchant.toAuthJSON() } 
        //                 })
        //             }
        //             return res.status(400).json({ success: false, statusCode: 400, message: info.errors, data: null })
        //         })(req, res, next)

        //     // } else {
        //     //     return res.status(400).json({ success: false, statusCode: 400, message: 'google validation error', data: validateLogin })
        //     // }
        // } 
        
}


export const currentMerchant: RequestHandler = async (req, res, next) => {
    const id = (req.body as { id: string }).id; 
    // const { payload: { id } } = req
    return MerchantModel.findById(id).then((merchant: any) => {
        if (!merchant) {
            return res.status(400).json({ success: false, statusCode: 400, message: 'failed to retrieve current merchant', data: null })
        }
        return res.status(200).json({ success: true, statusCode: 200, message: 'current merchant', data: merchant.toAuthJSON() })
    })
}


export const googleLogin: RequestHandler = async (req, res, next) => {
    console.log("google login request---->");
    return passport.authenticate("google", {
        scope: ["email", "profile"],
    })
}

export const googleRedirect: RequestHandler = async (req, res, next) => {
    return passport.authenticate("google"), async (req, res) => {
       console.log("repsonse from google redirect--->", res)
       return res.json({success: true, message: "This is the google callback route"});
    }
}