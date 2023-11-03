const nodemailer = require('nodemailer')

//SMTP : simple mail transfer protocol
const sendEmail = async (options)=>{
    //This is the trnsporter which is going to send the email using Simple mail transfer protocol
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        // port: 465,
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_APP_PASSWORD
        }
    })

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    }
    await transporter.sendMail(mailOptions)
}
module.exports=sendEmail