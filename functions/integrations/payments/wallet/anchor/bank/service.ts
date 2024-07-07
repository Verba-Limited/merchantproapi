import { AnchorService } from "../AnchorService";

import { URL_REQUEST } from "../utils/url";

export class BankService extends AnchorService {
    
    public createAccount = async (p: any) => {
        try {
            const requestBody = {
                "data": {
                    "type": p.type,
                    "attributes": {
                        "productName": p.productName
                    },
                    "relationships": {
                        "customer": {
                            "data": {
                                "id": p.customerId,
                                "type": p.customerType
                            }
                        }
                    }
                }
            }

            let response = await URL_REQUEST(this.BASE_URL+'/accounts', "POST", JSON.stringify(requestBody));
            console.log("createAccount---> ", JSON.stringify(response));
            if(response && response.error.length == null) {
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

    public listAccounts = async (p: any) => {
        try {
            let { customerId, accountType, size } = p;

            let response = await URL_REQUEST(this.BASE_URL+`/accounts?size=${size}&accountType=${accountType}&page=&customerId=${customerId}`, "GET", null);
            console.log("listAccounts Response---> ", response);
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

    public fetchAccount = async (p: any) => {
        try {
            let { accountId } = p;

            let response = await URL_REQUEST(this.BASE_URL+`/accounts/:${accountId}`, "GET", null);
            console.log("fetchCustomer Response---> ", response);
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

    public unfreezeAccount = async (p: any) => {
        try {
            let requestBody = {
                "data": {
                    "type": p.accountType,
                    "id": p.customerId
                }
            }

            let response = await URL_REQUEST(this.BASE_URL+'/accounts/unfreeze', "POST", JSON.stringify(requestBody));
            console.log("unfreezeAccount Response---> ", response);
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

    public freezeAccount = async (accountId: any, p: any) => {
        try {
            let requestBody = {
                "data": {
                    "type": p.accountType,
                        "attributes": {
                        "freezeReason": p.freezeReason,
                        "freezeDescription": p.freezeDescription
                    }
                }
            }
            
            let response = await URL_REQUEST(this.BASE_URL+`/accounts/${accountId}/freeze`, "PUT", JSON.stringify(requestBody));
            console.log("freezeAccount Response---> ", response);
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
 
    public fetchAccountBalance = async (p: any) => {
        try {
            let { accountId } = p;

            let response = await URL_REQUEST(this.BASE_URL+`/accounts/balance/:${accountId}`, "GET", null);
            console.log("fetchAccountBalance Response---> ", response);
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
