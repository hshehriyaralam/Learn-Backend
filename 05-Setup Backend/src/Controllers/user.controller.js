import {asynHandler} from "../Utils/asyncHandler.js"
import { ApiError } from "../Utils/apiError.js"
import { User } from "../Models/user.model.js"
import { uploadOnCloudinary } from "../Utils/cloudinary.js"
import { ApiResponse } from "../Utils/apiResponse.js"

const registerUser = asynHandler(async (req,res) => {
    res.status(200).json({
        message : "ok"
    })

    const {email,fullname,username} = req.body
    console.log("Email",email);

    //User validations
    if(fullname === ""){
        throw new ApiError(400, "fullName is required!")
    }
    if(email === ""){
        throw new ApiError(400, "email is required!")
    }
     if(username === ""){
        throw new ApiError(400, "username is required!")
    }
    
    //Already exist user
    const existerUser = User.findOne({
        $or : [{username , email}]
    })

    if(existerUser){
        throw new ApiError(409,"User Already exister")
    }
    
    const avtarlocalPath = req.files?.avtar[0]?.path;
    const coverImagelocalPath = req.files.coverImage[0]?.path;
    
    if(!avtarlocalPath){
        throw new ApiError(400,"Avtar file is required")
    }
    //uplaod avtar and cover image in cloudinary
    const avatar = await uploadOnCloudinary(avtarlocalPath)
    const coverImage = await uploadOnCloudinary(coverImagelocalPath)

    if(!avatar){
        throw new ApiError(400,"Avtar is required")

    }


    //enter Databse 
    const user = await User.create({
        fullname,
        avatar : avatar.url,
        coverImage  : coverImage.url,
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