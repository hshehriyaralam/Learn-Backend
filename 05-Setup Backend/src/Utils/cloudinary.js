import {v2 as cloudinary} from "cloudinary"
import fs from 'fs'


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.API_SECRET_KEY
});

const uploadOnCloudinary = async (localFilePath)  => {
    try{
        if(!localFilePath) return null
        //uplaod file cloudinary
       const response =  await  cloudinary.uploader.upload(localFilePath, {
            resource_type : "auto"
        })
        // file has been uploaded
        console.log("File Uploaded on Cloudinary",response.url)
        return response;
    }catch(error){
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file 
        return null
    }
}

export {uploadOnCloudinary}



