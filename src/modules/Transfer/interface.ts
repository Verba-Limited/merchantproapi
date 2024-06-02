export interface ITransfer {
    userId: any;
    sender_account_number: any;
    sender_account_name: any;
    sender_bank_name: any;
    receiver_account_number: any;
    receiver_account_name: any;
    receiver_bank_name: any;
    receiver_email_address: any;
    receiver_phone_number: any;
    amount: any;
    chargeFee: any;
    narration: any;
    reference: any;
    transactionId: any;
    sessionId: any;
    anchorTransferResponse: any;
    status: any;
    createdDate: any;
    updatedDate: any;
}

export interface ITransferStep {
    userId: any;
    sessionId: any;
    step: any;
    createdDate: any;
    updatedDate: any;
}
