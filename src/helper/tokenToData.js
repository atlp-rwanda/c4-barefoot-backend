import isUserExist from '../services/findUser';
import { verifyToken } from '../utils/auth';
import jwt from 'jsonwebtoken'
export async function getDataFromToken(req, res, next){
    if(req.headers && req.headers.authorization){
        const authorization = req.headers.authorization
        var decoded ='';
        try {
            const user =  await verifyToken(authorization)
            const userInfo = isUserExist(user.email)
            return userInfo
        } catch (e) {
            console.log(e)
            return res.status(401).json({message:'session has expired, please login'});
        }
    }
    return decoded
}