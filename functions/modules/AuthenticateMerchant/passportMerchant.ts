import passport from 'passport';
// import LocalStrategy from 'passport-local';
var LocalStrategy = require('passport-local').Strategy;

import { MerchantModel } from '../Merchant/model';

const authFunction = (email: any, password: any, done: any) => {
    MerchantModel.findOne({ email: email.toLowerCase() }).then((merchant: any) => {
        if (!merchant || !merchant.validatePassword(password)) {
            return done(null, false, {
                errors: 'Login credentials incorrect',
                data: null
            });
        }
        if (merchant && !merchant.validatePassword(password)) {
            return done(null, false, { 
                errors: 'Login credentials incorrect', 
                data: { 
                    previousRegisterType: merchant.registerType, 
                    isVerified: merchant.verified
                } 
            });
        }
        if((merchant.isVerified === false) || (merchant.isActive === false)) {
            return done(null, false, {
                success: false,
                statusCode: 400,
                message: (merchant.verified === false) ? 'Merchant is not yet verified' : 'Merchant is not active', 
                errors: (merchant.verified === false) ? 'Merchant is not yet verified' : 'Merchant is not active', 
                data: { 
                    previousRegisterType: merchant.registerType, 
                    isVerified: merchant.isVerified
                } 
            });
        } else {
            return done(null, merchant);
        }
    }).catch(done);
}

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, authFunction));
