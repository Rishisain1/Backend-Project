import {asyncHandler} from "../utils/asyncHandler.js"
import  { ApiError } from "../utils/Apierror.js"
import {User} from "../models/user.models.js"
import {uploadCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser=asyncHandler(async (req,res)=>{
    //steps to follow 
    //get user details from frontend 
    // validation - not empty
    // check if user already exits:username ,email
    // check for images ,check for images
    // upload them to cloudinary
    // create user object - create entry in dbb 
    // remove password and refres toekn feild from response
    // check for user creation 
    // return res

    const {fullName,email,userName,password}=req.body;
    
    // check weater any feild is empty or not we use if else but an advance code we use is advance method 
    if([fullName,email,userName,password].some((feild)=>feild?.trim()==="")){
        throw new ApiError(400,"ALL feilds are required ")
    }

    const existedUser=await User.findOne({
        $or:[{email},{userName}]
    })
    if(existedUser){
        throw new ApiError(409,"User with email or username already exist")
    }
    
    const avatarLocalPath =req.files?.avatar[0]?.path;
    const coverImageLocalPath=req.files?.coverImage?.[0]?.path;
    // if(req.files.coverImage){
    //      coverImageLocalPath =req.files?.coverImage[0]?.path;
    // }
    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar feild is required")
    }

    const avatar=await uploadCloudinary(avatarLocalPath);
    const coverImage=await uploadCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new ApiError(400,"Avatar is required");
    }

    const user= await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url||"",
        userName:userName.toLowerCase(),
        email,
        password
    })

    const createdUser=await User.findById(user._id).select("-password -refreshToken")

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }
    
    return res.status(201).json(
        new ApiResponse(200,createdUser,"User is registered successfully")
    )

})

export {registerUser}