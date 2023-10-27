const bcrypt=require("bcrypt");
const User=require("../models/User");
const jwt=require("jsonwebtoken");
const dotenv = require('dotenv');
const client = require("../redis");

dotenv.config();
async function checkUser(email){
    try {
        const user=await User.findOne({email:email});
        if(user){
           
            console.log("findone true");
            return true;
        }
        
       
            console.log("findone false");
            return false;
      
    } catch (e) {
        console.log(e);
        return "Server busy";
    }
}



async function AuthenticateUser(email,password)
{
    try {
        const userCheck= await User.findOne({email : email});
        const validPassword=await bcrypt.compare(password,userCheck.password);
        console.log(userCheck._id.valueOf());
    if(validPassword)
    {
        const token=jwt.sign({email},process.env.loginSecretToken);
        const response = {
            id:userCheck._id,
            name:userCheck.name,
            email:userCheck.email,
            token:token,
            status:true
        }
        await client.set(`key-${email}`,JSON.stringify(response));
        await User.findOneAndUpdate({email:userCheck.email},{$set:{token : token}},{new:true});
        return response;
    }
    return "Incorrect Username or Password";
    } catch (error) {
        console.log(error);
        return  "Server Busy";
    }
}


async function AuthoriseUser(token)
{
    try {
        console.log(process.env.loginSecretToken);
        const decodedToken=jwt.verify(token, process.env.loginSecretToken);
        if(decodedToken)
        {
            const email=decodedToken.email;
            const auth=await client.get(`key-${email}`)
        if(auth)
        {
            const data=JSON.parse(auth);
            return data
        }
        else{
            const data=await User.findOne({email:email});
            return data;
        }
        }
        
        return false;

    } 
   
    catch (error) {
        console.log(error);
    }
}

module.exports={checkUser , AuthenticateUser , AuthoriseUser};