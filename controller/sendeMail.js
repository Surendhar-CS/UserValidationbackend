const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
  service:"gmail",
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.nodemailer_Username,
    pass: process.env.nodemailer_Password,
  },
});

function SendMail(toEmail,subject,content)
{
    const mailOptions = {
        from:"testsura123@gmail.com",
        to:toEmail,
        subject:subject,
        html:content
    };
    transporter.sendMail(mailOptions,(error,info) => {
        if(error)
        {
            console.log("Error Occurred:",error);

        }
        else{
            console.log("Email sent :",info.response);
        }
    })
}

module.exports={SendMail};