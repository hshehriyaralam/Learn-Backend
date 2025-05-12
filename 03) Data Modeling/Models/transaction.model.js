import mongoose, { Schema } from "mongoose";


const transactionSchema = new mongoose.Schema({
    type: {
        type : String,
        enum : ["income", "expense"],
        required : true
    },
    amount : {
        type : Number,
        required : true,
        min : 0   
    },
    category : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true,
    },
    date : {
        type : Date,
        required : true
    },
    time : {
        type : String,
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }


},{
    timestamps : true
}


)




const Transactions = mongoose.model("Transaction",transactionSchema )