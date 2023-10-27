const express = require("express");
const router = express.Router();
const {checkUser}=require("../controller/login");
const { InsertVerifyUser, InsertSigninUser } = require("../controller/signup");

router.get("/:token", async (req,res) => {
    try {
        console.log(req.params.token);
        const response=await InsertSigninUser(req.params.token);
        res.status(200).send(response);
      } catch (error) {
        console.log(error);
        res.status(500).send(
          `<h4>Hello there!</h4>
       <h5>Registration Failed!</h5>`
        )
      }
});
router.post("/verify", async (req,res) => {
    try {
        console.log("Router post method triggerd");
        const{name,email,password} = await req.body;
        console.log(name,email,password);
          const validateCredentials = await checkUser(email);
        if(validateCredentials == false)
        {   
            console.log("hit true");
            await InsertVerifyUser(name,email,password);
            res.status(200).send(true);
        }
        else if(validateCredentials == true)
        {
            console.log("hit false");
            res.status(200).send(false);
        }
         else if(validateCredentials == "server busy")
        {
            res.status(500).send("server busy");
        }
    } catch (error) {
        console.log(error);
    }
  
});

module.exports = router;
