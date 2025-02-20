import UserModel from '../models/user.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

const register = async(req, res)=>{
    try {
        const {name, email, password}=req.body
        // res.send('working')
        const existUser = await UserModel.findOne({email})
        if (existUser){
            return res.status(401).json({success:false, message:"User already Exist"})
        }
        const hashpassword = await bcryptjs.hashSync(password,10)
        const newUser = new UserModel({
            name, email, password:hashpassword
        })

        await newUser.save()
        res.status(200).json({message:"user register successfully",newUser})
    } catch (error) {
        res.status(500).json({success:false, message:"Internal server error"})
        console.log(error)
    }
}

const Login = async(req, res)=>{
    try {
        const{email, password}=req.body
        const user = await UserModel.findOne({email})

        if(!user){
            return res.status(404).json({success:false,message:"Invalid credintials"})
        }
        const ispasswordvalid = await bcryptjs.compare(password,user.password)
        if(!ispasswordvalid){
            return res.status(200).json({success:false,message:"Invalid credintials"})
        }

        const token = jwt.sign({userId:user._id},process.env.JWT_SECRETKEY)

        res.cookie('token',token,{
            httpOnly:true,
            secure:false,
            sameSite: 'none',
            maxAge: 3600000
        })
        res.status(200).json({success:true,message:"Login Successful!",user,token})
    } catch (error) {
        res.status(500).json({success:false, message:"Internal server error"})
        console.log(error)
    }
}

const Logout = async(req, res) =>{
    try {
        res.clearCookie('token')
        res.status(200).json({message:"User Logout Successfull!"})
    } catch (error) {
        res.status(500).json({success:false, message:"Internal server error"})
        console.log(error)
    }
}

const CheckUser = async(req,res)=>{
    try {
        const user = req.user
        if (!user) {
            res.status(404).json({message:'user not found'})
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message:'internal server error'})
        console.log(error);
    }
}

export {register, Login, Logout, CheckUser}