const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


async function connectDb() {
    try{
        await mongoose.connect(process.env.MongoDb_Url);
        console.log("DB connected");

    }
   catch(error)
   {
    console.log(error);
   }

 

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
module.exports=connectDb;