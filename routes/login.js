const express = require("express");
const { AuthenticateUser } = require("../controller/login");
const client = require("../redis");
const router = express.Router();


client
    .connect()
    .then(
        ()=>{
            console.log("Connected to redis");
        }
        )
    .catch(
        (e) =>
        {
            console.log(e);
        }
    )


router.post("/", async (req,res) => {
    try {



        const { email, password}=await req.body;
        var loginCredentials=await AuthenticateUser(email,password);
        console.log(loginCredentials);
        if(loginCredentials==="Incorrect Username or Password")
        {
            res.status(200).send("Incorrect Username or Password");
        }
        else if(loginCredentials=== "Server Busy")
        {
            res.status(200).send("Server Busy");
        }
        else{
            res.status(200).json({token:loginCredentials.token});
    
        }    


    } catch (error) {
        console.log(error);
    }


    
  

});

module.exports=router;