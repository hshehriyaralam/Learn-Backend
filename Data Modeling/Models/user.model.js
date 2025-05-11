import mongoose  from "mongoose";


const userSchema  = new mongoose.userSchema({
    name : {
        type : String,
        required : true ,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : [true, "Password is required"]
    }
},{ timestamps : true } 
)


  export const User = mongoose.model("User", userSchema)
