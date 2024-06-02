import { AnchorService } from "../AnchorService";

import { URL_REQUEST } from "../utils/url";

export class CounterPartyService extends AnchorService {
    
    public createCounterParty = async (p: any) => {
        try {
            const requestBody = {
                "data": {
                    "type": p.type,
                    "attributes": {
                        "accountName": p.accountName,
                        "accountNumber": p.accountNumber
                    },
                    "relationships": {
                        "bank": {
                            "data": {
                                "id": p.customerId,
                                "type": p.bankType
                            }
                        }
                    }
                }
            }

            let response = await URL_REQUEST(this.BASE_URL+'/counterparties', "POST", JSON.stringify(requestBody));
            console.log("createCounterParty Response---> ", response);
            if(response && response.data) {
                return { 
                    status: true,
                    message: "success.",
                    data: response.data
                };
            } else {
                return { 
                    status: false,
                    message: response.error,
                    data: null
                };
            }
        } catch (e) {
            return { 
                status: false,
                message: e,
                data: null
            };
        }
    }

    public createBulkCounterParty = async (p: any) => {
        try {
            // const requestBody = [
            //     {
            //         "type": "CounterParty",
            //         "attributes": {
            //             "accountName": "ABODUNRIN AYODEJI SAMUEL T",
            //             "accountNumber": "0250809718",
            //             "bankCode": "000013"
            //         }
            //     },
            //     {
            //         "type": "CounterParty",
            //         "attributes":{
            //             "accountName": "ADEDAYO AYODEJI DAINI S",
            //             "accountNumber": "0021489829",
            //             "bankCode": "000012"
            //         }
            //     }
            // ]

            const requestBody = p;
            
            let response = await URL_REQUEST(this.BASE_URL+'/counterparties/bulk', "POST", JSON.stringify(requestBody));
            console.log("createDynamicVirtualNuban Response---> ", response);
            if(response && response.data) {
                return { 
                    status: true,
                    message: "success.",
                    data: response.data
                };
            } else {
                return { 
                    status: false,
                    message: response.error,
                    data: null
                };
            }
        } catch (e) {
            return { 
                status: false,
                message: e,
                data: null
            };
        }
    }

    public fetchCounterParty = async (counterPartyId: any) => {
        try {
            let response = await URL_REQUEST(this.BASE_URL+`/counterparties/${counterPartyId}`, "GET", null);
            console.log("fetchCounterParty Response---> ", response);
            if(response && response.data) {
                return { 
                    status: true,
                    message: "success.",
                    data: response.data
                };
            } else {
                return { 
                    status: false,
                    message: response.error,
                    data: null
                };
            }
        } catch (e) {
            return { 
                status: false,
                message: e,
                data: null
            };
        }
    }

    public listCounterParty = async (p: any) => {
        try {
            let { page, size } = p;
            let response = await URL_REQUEST(this.BASE_URL+`/counterparties?page=${page}&size=${size}`, "GET", null);
            console.log("listCounterParty Response---> ", response);
            if(response && response.data) {
                return { 
                    status: true,
                    message: "success.",
                    data: response.data
                };
            } else {
                return { 
                    status: false,
                    message: response.error,
                    data: null
                };
            }
        } catch (e) {
            return { 
                status: false,
                message: e,
                data: null
            };
        }
    }

    public verifyAccount = async (p: any) => {
        try {
            let { bankId, accountNumber } = p;
            let response = await URL_REQUEST(this.BASE_URL+`/payments/verify-account/${bankId}/${accountNumber}`, "GET", null);
            console.log("verifyAccount Response---> ", response);
            if(response && response.data) {
                return { 
                    status: true,
                    message: "success.",
                    data: response.data
                };
            } else {
                return { 
                    status: false,
                    message: response.error,
                    data: null
                };
            }
        } catch (e) {
            return { 
                status: false,
                message: e,
                data: null
            };
        }
    }

    public bulkVerifyAccounts = async (p: any) => {
        try {
            // {
            //     "data": [
            //         {
            //             "type": "AccountDetail",
            //             "attributes": {
            //                 "accountNumber": "0250809717",
            //                 "bankCode": "000013"
            //             }
            //         },
            //         {
            //             "type": "AccountDetail",
            //             "attributes": {
            //                 "accountNumber": "0021489827",
            //                 "bankCode": "000012"
            //             }
            //         }
            //     ]
            // }

            const requestBody = p;
            
            let response = await URL_REQUEST(this.BASE_URL+'/payments/verify-account/bulk', "POST", JSON.stringify(requestBody));
            console.log("bulkVerifyAccounts Response---> ", response);
            if(response && response.data) {
                return { 
                    status: true,
                    message: "success.",
                    data: response.data
                };
            } else {
                return { 
                    status: false,
                    message: response.error,
                    data: null
                };
            }
        } catch (e) {
            return { 
                status: false,
                message: e,
                data: null
            };
        }
    }

    public listBanks = async (p: any) => {
        try {
            let response = await URL_REQUEST(this.BASE_URL+`/banks`, "GET", null);
            console.log("listBanks Response---> ", response);
            if(response && response.data) {
                return { 
                    status: true,
                    message: "success.",
                    data: response.data
                };
            } else {
                return { 
                    status: false,
                    message: response.error,
                    data: null
                };
            }
        } catch (e) {
            return { 
                status: false,
                message: e,
                data: null
            };
        }
    }

}