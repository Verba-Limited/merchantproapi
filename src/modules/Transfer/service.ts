import { TransferModel } from './model';

import { ObjectId } from "mongodb";

export class TransferService {

    public createTransfer = async (parsedTransfer: any) => { 
       const { email, transferName } = parsedTransfer;
       console.log("parsedBody--->", parsedTransfer);
       const transfer = await TransferModel.findOne({ email, transferName });
       if(transfer) {
            return { success: false, statusCode: 400,  message: "Transfer already existed", data: null }; 
       } else {
            parsedTransfer.status = true;
            parsedTransfer.createdDate = new Date();
            const newTransfer = new TransferModel(parsedTransfer);
            newTransfer.save();
            return { success: true, statusCode: 200, message: "Transfers successfully created!", data: newTransfer };
       }

    }

    public getTransfers = async () => {
        const transfers = await TransferModel.find({});
        if (transfers) return { success: true, statusCode: 200, message: "All Transfers successfully retrieved!", data: transfers };
        return { success: false, statusCode: 400,  message: "Error in fetching All Transfers", data: null };  
    }

    public getTransferById = async (params: any) => {
        const { userId } = params;
        let userID = new ObjectId(userId);
        console.log("userID--->", userID)
        const user = await TransferModel.findOne({ _id: userID });
        if (user) {
            return { success: true, statusCode: 200, message: "Transfer successfully retrieved!", data: user };
        }
        return { success: false, statusCode: 400, message: "Error in fetching Transfer Details", data: null };
    }

    public updateTransfer = async (userId:any, parsedBody: any) => {}

    public deleteTransfer = async (email: any) => {
        const user = await TransferModel.findOneAndDelete({ email });
        if(user) return { success: true, statusCode: 200, message: "Transfer successfully deleted!", data: user };
        return { success: false, statusCode: 400, message: "Error in deleting Transfer", data: null };
    }

}