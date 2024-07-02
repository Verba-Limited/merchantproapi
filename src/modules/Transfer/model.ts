import { Schema, model } from "mongoose";
import { ITransfer, ITransferStep } from "./interface";

const transferSchema = new Schema<ITransfer>({
    userId: { type: String, ref: 'User' },
    sender_account_number: { type: String, required: false },
    sender_account_name: { type: String, required: false },
    sender_bank_name: { type: String, required: false },
    receiver_account_number: { type: String, required: false },
    receiver_account_name: { type: String, required: false },
    receiver_bank_name: { type: String, required: false },
    receiver_email_address: { type: String, required: false },
    receiver_phone_number: { type: String, required: false },
    amount: { type: String, required: false },
    chargeFee: { type: String, required: false },
    narration: { type: String, required: false },
    reference: { type: String, required: false },
    transactionId: { type: String, required: false },
    sessionId: { type: String, required: false },
    status: { type: String, required: false },
    anchorTransferResponse: { type: Object, required: false },
    createdDate: { type: Date, required: false },
    updatedDate: { type: Date, required: false }
});

const transferStepSchema = new Schema<ITransferStep>({
    userId: { type: String, ref: 'User' },
    sessionId: { type: String, required: false },
    step: { type: Number, required: false },
    createdDate: { type: Date, required: false },
    updatedDate: { type: Date, required: false }
});

const TransferModel = model<ITransfer>('Transfer', transferSchema);
const TransferStepModel = model<ITransferStep>('TransferStep', transferStepSchema);

export { TransferModel, TransferStepModel, transferSchema }
