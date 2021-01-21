const nodemailer = require('nodemailer');

async function main() {

    let testAccount = await nodemailer.createTestAccount();

    let transporter  = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });
    
    let info = await transporter.sendMail({
        from: '"Victor Hugo" <victorhugo.delimaaraujo@gmail.com>',
        to: 'victor.araujo@seplag.al.gov.br',
        subject: 'Enviando Email com Node.js',
        text: 'Estou te enviando este email com node.js',
    });
    
    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

}

main().catch(console.error);
