import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
    username : {
        type : String, // username string formate main hOga 
        required : true, // username lazmi hai 
        unique : true,  // username hamesha unique hOna chaia 
        lowercase : true,   // lowercase hOga 
        trim : true,     //extra space cancelled ho jayegi 
        index : true ,  // data base main searching easy ho jayegi 
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
    },
    fullname : {
        type : String,
        required : true,
        trim : true,
        index : true,
    },
    avtar : {
        type : String,  // cloudinary url 
        required : true,
    },
    coverImage : {
        type : String,   // Cloudinary URL
        required : true,
    },
    WatchingHistory : [{
        type : Schema.Types.ObjectId,
        ref : "Video"
    }],
    password : {
        type : String,
        required : [true, 'Password is required']
    },
    refereshToken : {
        type : String,

    }
},
{
    timestamps : true,
}
) 
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    // agar user passowrd change nahi kr rha so dobara hash bnane ke need nhi h 

    this.password = bcrypt.hash(this.password,10)
    next()

}) // data ko sve krne se pehle kch functionality add kr sakte hain pre() middleware ke through ham yahan isse bcrypt krenge 

userSchema.methods.isPasswordCorrect = async function(password){
   return  await bcrypt.compare(password, this.password)
}
// ye mthod login krte waqt use hOga user password enter krega and new hash hOga wo hash save hash se compare hOga 


userSchema.methods.generateAccessToken = function(){
   return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    }
)
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn : process.env.REFRESH_TOKEN_EXPIRY
    }
)
}

export const User = mongoose.model("User", userSchema)