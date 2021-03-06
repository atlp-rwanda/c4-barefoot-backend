import express from "express";
import passport from "passport";
import '../../config/passport-signin-setup';
import checkUserExistance from '../../middlewares/checkUserExistence'
import 'dotenv/config';
import {successSignUp,signUp,failedSignIn} from '../../controllers/googleSignup'

const router=express.Router();

router.get('/',passport.authenticate('google',{scope:['profile','email','address']}));
router.get("/signin/check",passport.authenticate("google",{failureRedirect:'/api/v1/google'}),successSignUp)
router.get('/signUp',checkUserExistance,signUp);

export default router;