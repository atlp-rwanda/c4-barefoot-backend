import express from "express";
import passport from "passport";
import '../../config/passport-signin-setup';
import 'dotenv/config';
import {successSignUp,signUp,failedSignIn} from '../../controllers/googleSignup'

const router=express.Router();

router.get('/',passport.authenticate('google',{scope:['profile','email','address']}));
router.get("/signin/check",passport.authenticate("google",{failureRedirect:process.env.FAILURE_REDIRECT}),successSignUp)
router.get('/signUp',signUp);
router.get("/failed",failedSignIn);
// app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

export default router;