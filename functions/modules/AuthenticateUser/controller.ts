import { RequestHandler } from 'express';
import { UserModel } from '../User/model';
import passport from 'passport';

// import { googleAuthController } from '../../thirdParty/googleauth/controllers';

export const login: RequestHandler = async (req, res, next) => {
        const email = (req.body as { email: string }).email.toLowerCase();
        const password = (req.body as { password: string }).password;
        const loginType = (req.body as { loginType: string }).loginType;
        
        if (!email) {
            return res.status(422).json({ success: false, statusCode: 400, message: 'email address is required', error: 'email address is required', data: null })
        }
        if (!password) {
            return res.status(422).json({ success: false, statusCode: 400, message: 'password is required', error: 'password is required', data: null })
        }
        if(loginType == 'custom' || loginType == 'google') {
            return passport.authenticate('local', { session: false }, async (err: any, passportUser: any, info: any) => {
                if (err) {
                    return next(err)
                } 
                if (passportUser) {
                    const user = passportUser;
                    user.token = passportUser.generateJWT();
                    return res.json({ 
                        success: true, 
                        statusCode: 200, 
                        message: 'login successful', 
                        data: { info: user, extra: user.toAuthJSON() } 
                    })
                }
                let statusCode = 400;
                if(loginType == 'google') statusCode = 406;
                return res.status(statusCode).json({ success: false, statusCode: statusCode, message: info.errors, data: info.data })
            })(req, res, next)
        }
        else {
            return res.status(400).json({ success: false, statusCode: 400, message: 'login type is not valid', data: null })
        }
        
        // else if(loginType == 'google') {
        //     // const _googleAuthService = new googleAuthController();
        //     // const validateLogin = await _googleAuthService.verifyGoogleToken(password);
        //     // console.log("validateLogin-->", validateLogin);
        //     // if(validateLogin.success) {
        //         // return passport.authenticate("google", { session: false }, async (err: any, passportUser: any, info: any) => {
        //         return passport.authenticate("local", { session: false }, async (err: any, passportUser: any, info: any) => {
        //             if (err) {
        //                 return next(err)
        //             } 
        //             if (passportUser) {
        //                 const user = passportUser;
        //                 user.token = passportUser.generateJWT();
        //                 return res.json({ 
        //                     success: true, 
        //                     statusCode: 200, 
        //                     message: 'google login successful', 
        //                     data: { info: user, extra: user.toAuthJSON() } 
        //                 })
        //             }
        //             return res.status(400).json({ success: false, statusCode: 400, message: info.errors, data: null })
        //         })(req, res, next)

        //     // } else {
        //     //     return res.status(400).json({ success: false, statusCode: 400, message: 'google validation error', data: validateLogin })
        //     // }
        // } 
        
}


export const currentUser: RequestHandler = async (req, res, next) => {
    const id = (req.body as { id: string }).id; 
    // const { payload: { id } } = req
    return UserModel.findById(id).then((user: any) => {
        if (!user) {
            return res.status(400).json({ success: false, statusCode: 400, message: 'failed to retrieve current user', data: null })
        }
        return res.status(200).json({ success: true, statusCode: 200, message: 'current user', data: user.toAuthJSON() })
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