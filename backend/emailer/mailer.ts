import nodemailer from 'nodemailer';

/* Functionality for sending customer emails such as after orders! */

//Different Types of Message Context Values
export enum MessageContextTypes {
    NEW,
    SHIPPED
}


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD
    }
});

//Sets Mail Contents, and sends email to customer.
export const setMailDetailsAndSend = (messageContext: MessageContextTypes, toEmail:string, trackingNumber?:string) => {

    let mailDetails;

    if (messageContext == MessageContextTypes.SHIPPED) {

        mailDetails = {
            from: process.env.GMAIL_EMAIL,
            to: toEmail,
            subject: "Your Order Has Been Shipped from UShopia!",
            html: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Your Order Has Been Shipped</title><style>body{font-family:"Arial",sans-serif;background-color:#f4f4f4;margin:0;padding:0;}.container{max-width:600px;margin:20px auto;background-color:#ffffff;padding:20px;border-radius:10px;box-shadow:0 0 10px rgba(0,0,0,0.1);}h1{color:#333333;}p{color:#555555;line-height:1.6;margin-bottom:0;}.tracking-info{margin-top:20px;}.button{display:inline-block;padding:10px 20px;background-color:#4CAF50;color:#ffffff;text-decoration:none;border-radius:5px;}</style></head><body><div class="container"><h1>Your Order Has Been Shipped!</h1><p>We're excited to let you know that your order has been shipped via USPS. Here is your tracking number:</p><div class="tracking-info"><p>Tracking Number: <strong>${trackingNumber}</strong></p><p>You can track your shipment at <a href="https://tools.usps.com/go/TrackConfirmAction_input" class="button" target="_blank">USPS Tracking</a></p></div><p>Thank you for choosing Ushopia!</p></div></body></html>`
        };



    } else if (messageContext == MessageContextTypes.NEW) {
        mailDetails = {
            from: process.env.GMAIL_EMAIL,
            to: toEmail,
            subject: "Thank you for ordering from UShopia!",
            html: '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Thank You for Your Order</title><style>body{font-family:"Arial",sans-serif;background-color:#f4f4f4;margin:0;padding:0;}.container{max-width:600px;margin:20px auto;background-color:#ffffff;padding:20px;border-radius:10px;box-shadow:0 0 10px rgba(0,0,0,0.1);}h1{color:#333333;}p{color:#555555;line-height:1.6;margin-bottom:0;}.tracking-info{margin-top:20px;}.button{display:inline-block;padding:10px 20px;background-color:#4CAF50;color:#ffffff;text-decoration:none;border-radius:5px;}</style></head><body><div class="container"><h1>Thank You for Your Order!</h1><p>Your order has been received and is currently being processed. We\'ll email you the tracking number once it\'s shipped. Thank you for shopping at Ushopia!</p></div></body></html>'
        };
    }


    transporter.sendMail(mailDetails!, function(err, data) {
        if(err) {
            console.log(err.message);
        } else {
            console.log('Email sent successfully');
        }
    });


}



