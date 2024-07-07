export interface ISmsDelivery {
    messageSid: string;    
    messageStatus: string;    
    createdDate: any;
}

export interface IBillsCharge {
    billCategory: string;    
    fee: string;   
    vat: string;
    valueIn: string; // percent or amount 
    setBy: any; 
    userType: any; 
    createdDate: any;
    updatedDate: any;
}