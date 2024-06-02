import passport from "passport";
import passportGoogle from "passport-google-oauth20";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../../utils/secrets";
import { UserModel } from "../User";
const GoogleStrategy = passportGoogle.Strategy;


passport.serializeUser((user, done) => {
  // done(null, user.id);
  done(null, user);
});

passport.deserializeUser(async (id, done) => {
  const user = await UserModel.findById(id);
  done(null, user);
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

      const user = await UserModel.findOne({ googleId: profile.id });

      // If user doesn't exist creates a new user. (similar to sign up)
      if (!user) {
        const newUser = await UserModel.create({
          googleId: profile.id,
          fullName: profile.displayName,
          email: profile.emails?.[0].value,
          // we are using optional chaining because profile.emails may be undefined.
        });
        if (newUser) {
          done(null, newUser);
        }
      } else {
        done(null, user);
      }
    }
  )
);