import {asynHandler} from "../Utils/asyncHandler.js"
import { ApiError } from "../Utils/apiError.js"
import { User } from "../Models/user.model.js"
import { uploadOnCloudinary } from "../Utils/cloudinary.js"
import { ApiResponse } from "../Utils/apiResponse.js"


   

const registerUser = asynHandler(async (req,res) => {
    res.status(200).json({
       maessage : "ok"
    })
  const {email,fullname,username,password} = req.body
   



    //User validations
    if(fullname == ""){
        throw new ApiError(400, "fullName is required!")
    }
    if(email == ""){
        throw new ApiError(400, "email is required!")
    }
     if(username == ""){
        throw new ApiError(400, "username is required!")
    }
    
    //Already exist user
    const existerUser =  await User.findOne({
        $or : [{username , email}]
    })

    if(existerUser){
        throw new ApiError(409,"User Already exister")
    }
    
    // const avtarlocalPath = req.files?.avatar[0]?.path;
    // const coverImagelocalPath = req.files.coverImage[0]?.path;
    
    let avtarlocalPath;
    let coverImagelocalPath;

    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        coverImagelocalPath = req.files.coverImage[0].path
    }
 
if (req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0) {
  avtarlocalPath = req.files.avatar[0].path;
}
    
    if(!avtarlocalPath){
        throw new ApiError(400,"Avatar file is required")
    }
    //uplaod avtar and cover image in cloudinary
    const avatar = await uploadOnCloudinary(avtarlocalPath)
    const coverImage = await uploadOnCloudinary(coverImagelocalPath)

    if(!avatar){
        throw new ApiError(400,"Avatar is required")

    }


    //enter Databse 
    const user = await User.create({
        fullname,
        avatar : avatar.url,
        coverImage  : coverImage.url || "",
        email,
        password,
        username : username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-passowrd -refreshToken"
    )

    //check user 
    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User Registered Successfully")
    )
    
})


export {registerUser}