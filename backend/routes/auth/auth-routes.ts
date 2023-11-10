import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import express, { Request, Response, Router } from "express";
import GoogleUserModel from '../../models/GoogleUser';
import LocalUserModel from '../../models/LocalUser';
import bcryptjs from 'bcryptjs';

/* AUTHENTICATION DISABLED CURRENTLY, IT IS NOT NEEDED FOR RIGHT NOW. DOWN THE ROAD IT WILL BE. */

/*

//Use the Google Strategy for authentication 
passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID!, //put to .env
  clientSecret: process.env.CLIENT_SECRET!, // put to .env
  callbackURL: process.env.GOOGLE_CALLBACK_URL!,
  passReqToCallback: true
}, async (req: any, accessToken: string, refreshToken: string, params: any, profile: Profile, done: any) => {
  // authentication callback logic
  console.log(profile);

  let doesUserExist = await GoogleUserModel.findOne({googleId: profile.id});

  if (doesUserExist) {
    return done(null, doesUserExist)
  } 

  const newUser = await GoogleUserModel.create({
    googleId: profile.id,
    email: profile.emails![0].value,
    type: 'google'
  }).catch(err => done(err, null));

  console.log("New User Created in Mongo");

  return done(null, newUser);
}));



//Serialize Data to be stored into cookie
passport.serializeUser((user: any, done: any) => {

  return done(null, {id: user._id, type: user.type});

}); 


//Deserialize data from cookie to req.user based on type of user.
passport.deserializeUser(async (serializeUser: {id: string, type: string}, done: any) => {
  switch (serializeUser.type) {
    case 'google':
      const googleUser = await GoogleUserModel.findById(serializeUser.id).catch(err => {return done(err, null)});
      return done(null, googleUser.id); //set just document id to req.user
    case 'local':
      const localUser = await LocalUserModel.findById(serializeUser.id).catch(err => {return done(err, null)});
      return done(null, localUser.id);
  }

});



//Routing

const authRouter = Router();

//Google Authentication
authRouter.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

//Google Authentication Callback
authRouter.get( '/auth/google/callback',
    passport.authenticate( 'google', {failureRedirect: '/login'}),
     (req: Request, res:Response) => {
        //Successful Authentication
        
        console.log(req.user);

        res.redirect(process.env.FRONTEND_URL!)
    });





//Verify user exists.
authRouter.get("/auth/getUser", async (req: Request, res:Response) => {
    res.send(req.user);
});



export default authRouter;
*/