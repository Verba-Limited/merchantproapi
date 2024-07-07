import passport from 'passport';
// import LocalStrategy from 'passport-local';
var LocalStrategy = require('passport-local').Strategy;

import { UserModel } from '../User/model';

const authFunction = (email: any, password: any, done: any) => {
    UserModel.findOne({ email: email.toLowerCase() }).then((user: any) => {
        if (!user || !user.validatePassword(password)) {
            return done(null, false, {
                errors: 'Login credentials incorrect',
                data: null
            });
        }
        if (user && !user.validatePassword(password)) {
            return done(null, false, { 
                errors: 'Login credentials incorrect', 
                data: { 
                    previousRegisterType: user.registerType, 
                    isVerified: user.isVerified,
                    isActive: user.isActive
                } 
            });
        }
        if((user.isVerified === false) || (user.isActive === false)) {
            return done(null, false, {
                success: false,
                statusCode: 400,
                message: (user.isVerified === false) ? 'User is not yet verified' : 'User is not active', 
                errors: (user.isVerified === false) ? 'User is not yet verified' : 'User is not active', 
                data: { 
                    previousRegisterType: user.registerType, 
                    isVerified: user.isVerified,
                    isActive: user.isActive
                } 
            });
        } else {
            return done(null, user);
        }
    }).catch(done);
}

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, authFunction));
