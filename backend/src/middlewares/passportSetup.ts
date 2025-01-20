import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import Users from "../db";
import dotenv from 'dotenv'

dotenv.config();

passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: 'http://localhost:3000/api/v1/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Check if user already exists
          let user = await Users.findOne({ email: profile.emails?.[0].value });
          if (!user) {
            // If not, create a new user
            user = new Users({
              name: profile.displayName,
              email: profile.emails?.[0].value,
              password: '', // No password required for OAuth
            });
            await user.save();
          }
          done(null, user);
        } catch (error) {
        //   done(error, null);
        console.error(error)
        }
      }
    )
  );
  
  // Serialize user
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });
  
  // Deserialize user
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await Users.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });