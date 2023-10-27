const User=require("../models/User")
const bcrypt=require("bcrypt");
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const dotenv = require('dotenv');
const VerifyUser=require("../models/verifyUser");
const {SendMail}=require("./sendeMail");
// const verifyUser = require("../models/verifyUser");
dotenv.config();


// async function SigninUser(token){
//     try {
//      const userVerify=await VerifyUser.findOne({token:token});
//     if(userVerify)
//     {
//      const newUser=new User({
//          name:userVerify.name,
//          email:userVerify.email,
//          password:userVerify.password,
//          forgotPassword: {}
//      })
//      await newUser.save();
//      await userVerify.deleteOne({token:token});
//      const content=`<h4>Hello there!</h4>
//      <h5>Registration Successful!</h5>`
//      SendMail(newUser.email,"Registration Successfull",content);
//      return `<h4>Hello there!</h4>
//      <h5>Registration Successful!</h5>`
 
//     }
//     return `<h4>Hello there!</h4>
//     <h5>Registration Failed!</h5>`
//     } catch (error) {
//      console.log(error);
//     }
 
//  }

async function InsertVerifyUser(name,email,password) {
    try {
        const salt=await bcrypt.genSalt(2);
        console.log("salting inprogress")
        const hashedPassword= await bcrypt.hash(password,salt);
        const token=generateToken(email);
        console.log("token generated");
        const newUser=new VerifyUser(
            {
                name:name,
                email:email,
                password:hashedPassword,
                token:token
            }
        )

        const activationlink=`http://localhost:6969/singup/${token}`;
        const content=`<h4>Hello there!</h4>
        <h5>Welcome to Our Website</h5>
        <p> Click the below link to activate your account</p>
        <a href="${activationlink}">Click Here!</a>`


       await newUser.save();
       SendMail(email,"Verify User",content); 
    } catch (error) {
        console.log(error);
        
    }
}
// async function testmethod(name,email,password)
// {
//     // console.log(email);
//     // return true;
//     try {
//         const salt=await bcrypt.genSalt(10);
//         console.log("salting inprogress")
//         const hashedPassword= await bcrypt.hash(password,salt);
//         const token=generateToken(email);
//         console.log("token generated"+email);
//         const newUser=new VerifyUser(
//             {
//                 name:name,
//                 email:email,
//                 password:hashedPassword,
//                 token:token
//             }
//         )
//             console.log(newUser)
//         const activationlink=`http://localhost:6969/${token}`;
//         console.log(activationlink);
//         const content=`<h4>Hello there!</h4>
//         <h5>Welcome to Our Website</h5>
//         <p> Click the below link to activate your account</p>
//         <a href="${activationlink}">Click Here!</a>`


//        await newUser.save();
//        SendMail(email,"Verify User",content); 
//     } catch (error) {
//         console.log(error);
        
//     }
// }
async function InsertSigninUser(token)
{
    try {
        console.log("test method 2 triggered");
        const userVerify=await VerifyUser.findOne({token:token});
        console.log("after find one testmethod2" +userVerify);
       if(userVerify)
       {
        const newUser=new User({
            name:userVerify.name,
            email:userVerify.email,
            password:userVerify.password,
            forgotPassword: {}
        })
        console.log(userVerify)
        await newUser.save();
        await userVerify.deleteOne({token:token});
        console.log("deletion succesfull");
        const content=`<h4>Hello there!</h4>
        <h5>Registration Successful!</h5>`
        SendMail(newUser.email,"Registration Successfull",content);
        return `<h4>Hello there!</h4>
        <h5>Registration Successful!</h5>`
    
       }
       return `<h4>Hello there!</h4>
       <h5>Registration Failed!</h5>`
       } catch (error) {
        console.log(error);
       }
    
    }
    
//     // function generateToken(email)
//     // {
//     //     try{
//     //         return jwt.sign(email,process.env.SecretSaltKey);
//     //     }
//     //     catch(error){
//     //         console.log(error);
//     //     }
// }


function generateToken(email)
{
    try{
        return jwt.sign(email,process.env.SecretSaltKey);
    }
    catch(error){
        console.log(error);
    }
   
}


//  module.s={insertVerifyUser};

module.exports={InsertVerifyUser,InsertSigninUser};

