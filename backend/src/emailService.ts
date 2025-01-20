import nodemailer from "nodemailer"


const transporter = nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user: "omsharma.83173@gmail.com",
        pass: "dkno aerq jxij ufur"
    }
})


export default transporter;