import { AnchorService } from "../AnchorService";

import { URL_REQUEST } from "../utils/url";

export class SubAccountService extends AnchorService {

    private ETZ_SETTLEMENT_ACCOUNT_TYPE = process.env.ETZ_SETTLEMENT_ACCOUNT_TYPE;
    private ETZ_SETTLEMENT_ACCOUNT_ID = process.env.ETZ_SETTLEMENT_ACCOUNT_ID;
    
    public createSubAccount = async (p: any) => {
        try {
            console.log("createSubAccount request--->", p);
            const requestBody = {
                "data": {
                    // "attributes": {
                    //     "createVirtualNuban": true
                    // },
                    "relationships": {
                        "parentAccount": {
                            "data": {
                                "type": this.ETZ_SETTLEMENT_ACCOUNT_TYPE,
                                "id": this.ETZ_SETTLEMENT_ACCOUNT_ID
                            }
                        },
                        "customer": {
                            "data": {
                                "type": "IndividualCustomer",
                                "id": p.customerId
                            }
                        }
                    },
                    "type": "SubAccount"
                }
            }

            console.log("anchor requestBody--->", JSON.stringify(requestBody));

            let response = await URL_REQUEST(this.BASE_URL+'/sub-accounts', "POST", JSON.stringify(requestBody));
            console.log("createSubAccount---> ", JSON.stringify(response));
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

    public createSimpleSubAccount = async (p: any) => {
        try {
            console.log("createSimpleSubAccount request--->", p);
            const requestBody = {
                "data": {
                    "relationships": {
                        "parentAccount": {
                            "data": {
                                "type": this.ETZ_SETTLEMENT_ACCOUNT_TYPE,
                                "id": this.ETZ_SETTLEMENT_ACCOUNT_ID
                            }
                        },
                        "customer": {
                            "data": {
                                "type": "IndividualCustomer",
                                "id": p.customerId
                            }
                        }
                    },
                    "type": "SubAccount"
                }
            }

            console.log("anchor requestBody--->", JSON.stringify(requestBody));

            let response = await URL_REQUEST(this.BASE_URL+'/sub-accounts', "POST", JSON.stringify(requestBody));
            console.log("createSimpleSubAccount---> ", JSON.stringify(response));
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

    public fetchSubAccount = async (p: any) => {
        try {
            let { subAccountId } = p;

            let response = await URL_REQUEST(this.BASE_URL+`/sub-accounts/${subAccountId}`, "GET", null);
            console.log("fetchSubAccount Response---> ", response);
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

    public fetchSubAccountBalance = async (subAccountId: any) => {
        try {
            let response = await URL_REQUEST(this.BASE_URL+`/sub-accounts/balance/${subAccountId}`, "GET", null);
            console.log("fetchSubAccountBalance Response---> ", response);
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