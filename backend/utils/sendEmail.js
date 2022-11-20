const nodemailer=require("nodemailer");
const sendEmail= async(subject, message, sent_to, sent_from, reply_to)=>{
    const transporter=nodemailer.createTransport({
        // @ts-ignore
        host:process.env.EMAIL_HOST,
        port:587,
        auth:{
            // @ts-ignore
            user:process.env.EMAIL.USER,
            // @ts-ignore
            pass:process.env.EMAIL.PASS,
        },
        tle:{
            rejectUnauthorized:false,
            
        }

    })
    const options={
           from:sent_from,
           to:sent_to,
           replyTo:reply_to,
           subject:subject,
           html:message,
    }
    //send email
    transporter.sendMail(options, function(err,info){
        if(err){
            console.log(err)
        }
        else{
        console.log(info)
        }
    })
}
module.exports=sendEmail;