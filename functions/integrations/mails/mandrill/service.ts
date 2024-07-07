var nodemailer = require("nodemailer");
var mandrillTransport = require('nodemailer-mandrill-transport');

export class sendMailService { 

    public sendMail = async (to: any, subject: any, message: any) => {
        let templateId: any;
        let from = 'support@billon.ng';
        switch (subject) {
            case 'BillOn Account Invitation':
                templateId = ''
                from = 'support@billon.ng'
                break;
            case 'BillOn Account Verification':
                templateId = ''
                from = 'support@billon.ng'
                break;
            case 'BillOn Account Registration':
                templateId = ''
                from = 'support@billon.ng'
                break;
            case 'BillOn Transaction':
                templateId = ''
                from = 'support@billon.ng'
                break;
            case 'BillOn Reset Password':
                templateId = ''
                from = 'support@billon.ng'
                break; 
            case 'Billon Payment Receipt':
                templateId = ''
                from = 'support@billon.ng'
                break; 
            case 'Confirmation':
                templateId = ''
                from = 'support@billon.ng'
                break;  
            case 'Billon Permission':
                templateId = ''
                from = 'support@billon.ng'
                break;   
            default:
                break;
        }

        var smtpTransport = nodemailer.createTransport(mandrillTransport({
            auth: {
                apiKey: "md-WD3XmbI35NTJoee0tqUw4g"
            }
        }));

        let mailOptions = {
            from: from,
            to: to,
            subject: subject,
            html: `${message}`
        }

        await smtpTransport.sendMail(mailOptions, function(error: any, response: any) {
            if(error) {
                console.log("Email error: "+ JSON.stringify(error));
                // throw new Error("Error in sending email");
                return error;
            }
            console.log("Message sent: "+ JSON.stringify(response));
            return response;
        })

    //    const sendMessage = await smtpTransport.sendMail(mailOptions);
    //    return sendMessage;

    }

}