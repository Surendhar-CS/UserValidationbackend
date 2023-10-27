const express = require('express');
const connectDb = require('./db');
const signupRouter=require('./routes/signup');
const loginRouter=require('./routes/login');
const homeRouter=require('./routes/home');

const cors=require("cors");
const { testmethod2, testmethod, InsertSigninUser } = require('./controller/signup');


const app = express();
app.use(express.json());
app.use(cors({origin:"*"}));
const port = 6969;  
connectDb();


app.get('/', async(req, res) => {
  

})

app.use("/signup",signupRouter);
app.use("/login",loginRouter);
app.use("/home",homeRouter);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
console.log("Hello World");