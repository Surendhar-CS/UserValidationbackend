const mongoose=require("mongoose")
const { Schema } = mongoose;

const verifySchema=new Schema({
    name : {
        type:String,
       
    },
    email : {
        type:String,
        required:true,
        unique:true,
    },
    password : {
        type:String,
        required:true,
    },
    joinedOn:{
        type:Date,
        default:Date.now()
    },
    token:{
        type:String
    },
    forgetPassword:{
        time:Date,
        otp:String,
    },
   
},
{
    collection:"User"

});

    module.exports=mongoose.model("User",verifySchema);