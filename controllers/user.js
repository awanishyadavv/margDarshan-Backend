import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middelwares/error.js";




export const login = async(req,res,next) => {
    try {
        const {email, password} = req.body;

    const user = await User.findOne({email}).select("+password");

    if(!user) return next(new ErrorHandler("Invalid Email or Password", 400))

    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch) return next(new ErrorHandler("Invalid Email or Password", 404))

    sendCookie(user, res, `Welcome Back, ${user.name}`, 200);
    } catch (error) {
        next(error)
    }
};


// New User Registration
export const register = async (req,res, next) => {
    try {
        const {name, email, password, phone} = req.body;

    let user = await User.findOne({email});

    // Check if user Exist
    if(user) return next(new ErrorHandler("User already Exist", 404))

    // Encrypt Password
    const hashedPassword = await bcrypt.hash(password,10)

    user = await User.create({name,email,password:hashedPassword, phone});

    sendCookie(user, res, "Registerd Successfully", 201);
    } catch (error) {
        next(error)
    }
};

// Get User Profile
export const getMyProfile = (req,res) => {
    res.status(200).json({
        success:true,
        user:req.user,
    })
};


export const logout = (req,res) =>{
    res
    .status(200)
    .cookie("token","", {
        expires: new Date(Date.now()),
        sameSite:process.env.NODE_ENV ==="Development" ? "lax" : "none",
        secure:process.env.NODE_ENV ==="Development" ? false : true,
    }).json({
        success:true,
        user:req.user,
    })
}


// Functionallities for Admin's
// Get all users for admin and super admin
export const getAllUserforAdmin = async(req, res, next) => {
    try {
        const places = await User.find({});
        res.status(201).json({
            success:true,
            places,
        })
    } catch (error) {
        next(error)
    }
};


// Update User Rols and Is Verified status
export const updateUserRoleAndStatus = async(req, res, next) => {
    try {
        const {userId} = req.params;
        const  {role, isVerified } = req.body;

        const user = await User.findById(userId);
        if(!user) return next(new ErrorHandler("User not Found", 404))

        if (role) user.role = role;
        if (typeof isVerified === 'boolean') user.isVerified = isVerified;

        await user.save();
        res.status(201).json({
            success: true,
            message:"User Updated",
            user,
        });

    } catch (error) {
        next(error)
    }
};

// Update User Rols and Is Verified status
export const deleteUser = async(req, res, next) => {
    try {
        const {userId} = req.params;
    
        const user = await User.findById(userId);

        if(!user) return next(new ErrorHandler("User not Found", 404))
    
        await user.deleteOne();
    
        res.status(201).json({      
            success:true,
            message:"User Deleted"
        })
        } catch (error) {
            next(error)
        }
};