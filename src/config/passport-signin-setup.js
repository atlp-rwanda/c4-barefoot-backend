import passport from 'passport';
import 'dotenv/config'
import GoogleStrategys from 'passport-google-oauth2';

const GoogleStrategy=GoogleStrategys.Strategy
passport.serializeUser(function(user, done) {
    /*
    From the user take just the id (to minimize the cookie size) and just pass the id of the user
    to the done callback
    PS: You dont have to do it like this its just usually done like this
    */
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    /*
    Instead of user this function usually recives the id 
    then you use the id to select the user from the db and pass the user obj to the done callback
    PS: You can later access this data in any routes in: req.user
    */
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID:process.env.SIGNIN_CLIENT_ID,
    clientSecret:process.env.SIGNIN_CLIENT_SECRET,
    callbackURL:process.env.SIGNIN_REDIECT_URL,
    passReqToCallback:true
},(request,accessTOken,refreshToken,profile,done)=>{
    console.log(profile)
    return done(null,profile);
}))

