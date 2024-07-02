const Flutterwave = require('flutterwave-node-v3');
// const open = require('open');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

export class CollectionsService {

    public initializeCharge = async (payload: any) => {
        try {
            const response = await flw.Charge.card(payload)
            console.log("initialize response--->", response);
            return response;
        } catch (error) {
            console.log(error)
            return error;
        }
    }


    public authorizeCharge = async (payload: any) => {
        try {
            const response = await flw.Charge.card(payload)
            console.log("authorize PIN response--->", response);
            return response;
        } catch (error) {
            console.log(error)
            return error;
        }
    }

    public validateCharge = async (otp: any, flw_ref: any) => {
        try {
            // Add the OTP to authorize the transaction
            const response = await flw.Charge.validate({
                "otp": otp,
                "flw_ref": flw_ref
            });
            console.log("validate charge response--->", response);
            return response;
        } catch (error) {
            console.log(error);
            return error;
        }
    }


    public verifyCharge = async (transactionId: any) => {
        try {
            // Add the OTP to authorize the transaction
            const response = await flw.Transaction.verify({ id: transactionId });
            console.log("verify charge response--->", response);
            return response;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    public chargeTokenized = async (email: any, token: any, amount: any, transRef: any, country: any, currency: any, narration: any) => {
        try {
            const details = {
                token: token,
                currency: currency,
                country: country,
                amount: amount,
                email: email,
                tx_ref: transRef,
                narration: narration,
            };
            const response = await flw.Tokenized.charge(details);
            console.log("charge tokenized response--->", response);
            return response;
        } catch (error) {
            console.log(error);
            return error;
        }
    }


    public refundCharge = async (transactionId: any, amountToRefund: any, remark: any) => {
        try {
            // Refund the transaction
            const response = await flw.Transaction.refund({
                id: transactionId,
                amount: amountToRefund,
                // comments: remark,
            });
            console.log("refund charge response--->", response);
            return response;
        } catch (error) {
            console.log(error)
            return error;
        }
    }


}
