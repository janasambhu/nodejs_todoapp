import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import { isAuthenticated } from "../middlewares/auth.js";
import ErrorHandler from "../middlewares/error.js";

export const getAllUser = async (req, res) => {

}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email }).select("+password");
        if (!user) return next(new ErrorHandler("Invalid email or password", 400));
        // if(!user)
        // return res.json({
        //     success:"false",
        //     message:"Invalid email or password",
        // });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return next(new ErrorHandler("Invalid email or password", 400));
        // if(!isMatch)
        // return res.json({
        //     success:"false",
        //     message:"Invalid email or password",
        // });
        sendCookie(user, res, `welcome ${user.name}`, 200);
    } catch (error) {
        next(error);
    }
}
export const register = async (req, res,next) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) return next(new ErrorHandler("User already exist", 404));
        // if (user)
        //  return res.status(404).json({
        //     success:"false",
        //     message:"User already exist",
        //  });
        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({ name, email, password: hashedPassword });
        sendCookie(user, res, "Registered successfully", 201);
    } catch (error) {
        next(error);
    }
};

export const logout = async (req, res,next) => {
    try {
        res.status(200).cookie("token", "", {
             expires: new Date(Date.now()),
            //  sameSite:process.env.NODE_ENV==="Development"?"lax":"none",
            //  secure:process.env.NODE_ENV==="Development"? false: true,
            }).json({
            success: "true",
            message:"You have successfully logged out",
        });
    } catch (error) {
        next(error);
    }
};

export const getMyProfile = async (req, res,next) => {
    try {
        //    isAuthenticated();
        //    console.log(req.user);
        res.status(200).json({
            success: "true",
            user: req.user,
        });
    } catch (error) {
        next(error);
    }
};


// export const register=async(req,res)=>{
//     const {name,email,password}=req.body;
//     await User.create({
//         name,
//         email,
//         password,
//     });
//     res.status(201).cookie("temp","sambhu").json({
//         success:"true",
//         message:"registered successfully",
//     });
// };
// export const getAllUser=async(req,res)=>{
//     const users=await User.find({});
// //    console.log(req.query);
// //    console.log(req.query.name);
//     res.json({
//         success:"true",
//         users,
//     });
// };
// export const updateuser=async(req,res)=>{
//     const {id}=req.params;
//     const user=await User.findById(id);
// //    console.log(req.query);
// //    console.log(req.query.name);
//     res.json({
//         success:"true",
//         message:"updated",
//     });
// };
// export const deleteuser=async(req,res)=>{
//     const {id}=req.params;
//     const user=await User.findById(id);
// //    await user.remove();
// //    console.log(req.query);
// //    console.log(req.query.name);
//     res.json({
//         success:"true",
//         message:"Deleted",
//     });
// };

// export const specialfunc=(req,res)=>{
//     res.json({
//         success:"true",
//         message:"Hello sambhu",
//     })
// };
// export const getUserDetails=async(req,res)=>{
//     //   const {id}=req.query;
//    //   const user=await User.findById(id);
//        const {id}=req.params;
//    //    console.log(req.params);
//        const user=await User.findById(id);
//        res.json({
//            success:"true",
//            user,
//        });
//    };