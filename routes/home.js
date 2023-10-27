const express = require("express");
const { AuthoriseUser } = require("../controller/login");
const router = express.Router();


router.get("/", async (req,res) => {
try {
    const auth_token=await req.headers.authorization;
    console.log(auth_token)
const loginCreds=await AuthoriseUser(auth_token);
if(loginCreds===false)
{
    res.status(200).send("Invalid token");
}
else
{
    res.json(loginCreds);
}
} catch (error) {
    console.log(error);
}

}
)

module.exports=router