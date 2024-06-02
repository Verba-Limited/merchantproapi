import passport from "passport";
import passportGoogle from "passport-google-oauth20";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../../utils/secrets";
import { MerchantModel } from "../Merchant";
const GoogleStrategy = passportGoogle.Strategy;


passport.serializeUser((merchant, done) => {
  // done(null, merchant.id);
  done(null, merchant);
});

passport.deserializeUser(async (id, done) => {
  const merchant = await MerchantModel.findById(id);
  done(null, merchant);
});


passport.use(new GoogleStrategy({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "https://billonapp.azurewebsites.net/api/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      // get profile details
      // save profile details in db
      console.log(accessToken);
      console.log(refreshToken);
      console.log(profile);

      const merchant = await MerchantModel.findOne({ googleId: profile.id });

      // If merchant doesn't exist creates a new merchant. (similar to sign up)
      if (!merchant) {
        const newMerchant = await MerchantModel.create({
          googleId: profile.id,
          fullName: profile.displayName,
          email: profile.emails?.[0].value,
          // we are using optional chaining because profile.emails may be undefined.
        });
        if (newMerchant) {
          done(null, newMerchant);
        }
      } else {
        done(null, merchant);
      }
    }
  )
);