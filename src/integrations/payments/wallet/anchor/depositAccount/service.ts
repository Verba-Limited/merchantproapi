import { AnchorService } from "../AnchorService";

import { URL_REQUEST } from "../utils/url";

export class DepositAccountService extends AnchorService {
 
    public createDepositAccount = async (p: any) => {
        try {
            console.log("createSubAccount request--->", p);
            const requestBody = {
                "data": {
                    "attributes": {
                        "productName": p.productName
                    },
                    "relationships": {
                        "customer": {
                            "data": {
                                "type": p.customerType,
                                "id": p.customerId
                            }
                        }
                    },
                    "type": "DepositAccount"
                }
            }

            console.log("anchor requestBody--->", JSON.stringify(requestBody));

            let response = await URL_REQUEST(this.BASE_URL+'/accounts', "POST", JSON.stringify(requestBody));
            console.log("createDepositAccount---> ", JSON.stringify(response));
            if(response && response.data) {
                return { 
                    status: true,
                    message: "success.",
                    data: response?.data
                };
            } else {
                return { 
                    status: false,
                    message: response?.error,
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

    public fetchDepositAccount = async (p: any) => {
        try {
            let { depositAccountId } = p;

            let response = await URL_REQUEST(this.BASE_URL+`/accounts/${depositAccountId}`, "GET", null);
            console.log("fetchDepositAccount Response---> ", response);
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

    public fetchDepositAccountBalance = async (depositAccountId: any) => {
        try {
            let response = await URL_REQUEST(this.BASE_URL+`/accounts/balance/${depositAccountId}`, "GET", null);
            console.log("fetchDepositAccountBalance Response---> ", response);
            if(response && response.data && !response.error) {
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