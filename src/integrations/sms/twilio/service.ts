import Twilio from 'twilio';

export class twilioService { 

    public sendSMS = async (toPhoneNumber: string, smsMessage: any) => {
        try {
            // kanmi
            // const accountSid = "AC1aebf83b608938295596a7186670c120";
            // const authToken = "c9d950b787d17cf18d1fe89e055e508a";

            // // e-tranazct - live
            // const accountSid = "AC6c1e6bf1712f42c30bbec50b32a8a283";
            // const authToken = "4902d2b72a2099cb6b4ec0ec96005590";
            // const messageServiceSid = "MG5b1b89ceecccb88b9a199cda4f5c650b";

            
            const accountSid = "";
            const authToken = "";
            const messageServiceSid = "";
            
            const client = Twilio(accountSid, authToken);
            try {
                client.lookups.v1.phoneNumbers(toPhoneNumber)
                .fetch({type: ['carrier']})
                .then(phone_number => console.log(phone_number.carrier));

                const message = await client.messages.create({
                    body: smsMessage,
                    messagingServiceSid: messageServiceSid,
                    to: toPhoneNumber
                })
                .then(response => console.log("im here-->", response))
                // .catch(e => console.log("twilio-->", e));
                try{
                    console.log("twilio message --->", message);
                    return message;
                } catch (err) {
                    console.log("twilio err --->", err);
                    return err;
                }
            } catch (e) {
                console.log("client error--->", e);
                return { "error":  "error" };
            }

            
        } catch (e) {
            console.log(e);
            return { "error":  e }
        }
    }

}
