import jwt from 'jsonwebtoken'
import UserModel from '../models/user.js'

const isAdmin = async(req,res,next)=> {
    try {
        const token = req.cookies.token
        if(!token){
            return res.status(401).json({message:" 'Unauthorized no token provided' "})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRETKEY)
        // console.log(decoded)
        const user = await UserModel.findById(decoded.userId)
        // console.log(user);
        if(!user){
            return res.status(401).json({message:" 'user not found' "})
        }
        if(user.role !== 'admin'){
            return res.status(403).json({message:" 'Unauthorized: User is not admin' "})
        }
        req.user = user
        next()


    } catch (error) {
        console.log(error)
    }
    
}

const isUser = async(req,res,next)=>{
    try {
        const token = req.cookies.token
        if(!token){
            return res.status(401).json({message:" 'Unauthorized no token provided' "})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRETKEY)
        // console.log(decoded)
        const user = await UserModel.findById(decoded.userId)
        // console.log(user);
        if(!user){
            return res.status(401).json({message:" 'user not found' "})
        }
        
        req.user = user
        next()


    } catch (error) {
        console.log(error)
    }
}

export {isAdmin, isUser}