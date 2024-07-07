import { Schema, model } from "mongoose";
import { ISmsDelivery, IBillsCharge } from "./interface";

const smsDeliverySchema = new Schema<ISmsDelivery>({
    messageSid: { type: String, required: false },
    messageStatus: { type: String, required: false },
    createdDate: { type: Date, required: false },
});

const billsChargeSchema = new Schema<IBillsCharge>({
    billCategory: { type: String, required: false },
    fee: { type: String, required: false },
    vat: { type: String, required: false },
    valueIn: { type: String, required: false },
    setBy: { type: String, required: false },
    userType: { type: String, required: false },
    createdDate: { type: Date, required: false },
    updatedDate: { type: Date, required: false },
});


const SmsDeliveryModel = model<ISmsDelivery>('smsDelivery', smsDeliverySchema);
const BillsChargeModel = model<IBillsCharge>('billsCharge', billsChargeSchema);

export { SmsDeliveryModel, BillsChargeModel }