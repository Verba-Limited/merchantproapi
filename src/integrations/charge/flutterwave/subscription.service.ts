const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

export class chargeService { 

    // Get all Subscriptions
    public fetchSubscription = async () => {
        try {
            
            const response = await flw.Subscription.fetch_all()
            console.log(response);
        } catch (error) {
            console.log(error)
        }
    }

    // Fetch Subscriptions by email
    public getSubscription = async () => {
        try {
            const data = {
                "email": "user@example.com"
            }
            const response = await flw.Subscription.get(data)
            console.log(response);
        } catch (error) {
            console.log(error)
        }
    }

    // cancel a Subscription
    public cancelSubscription = async () => {
        try {
            const payload={
                "id":"3477" //This is the unique id of the subscription you want to cancel. It is returned in the Get a subscription call as data.id
            }
            
            const response = await flw.Subscription.cancel(payload)
            console.log(response);
        } catch (error) {
            console.log(error)
        }
    }

    // activate Subscription
    public activateSubscription = async () => {
        try {
            const payload={
                "id":"3477" //This is the unique id of the subscription you want to activate. It is returned in the Get a subscription call as data.id
            }
            
            const response = await flw.Subscription.activate(payload)
            console.log(response);
        } catch (error) {
            console.log(error)
        }
    
    }
    

}