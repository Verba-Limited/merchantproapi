import { AnchorService } from "../AnchorService";

import { URL_REQUEST } from "../utils/url";

export class WebhookService extends AnchorService {
    
    public createWebhook = async (p: any) => {
        try {
            const requestBody = {
                "data": {
                    "type": "Webhook",
                    "attributes": {
                        "url": "https://eowruvix33d9b12.m.pipedream.net",
                        "token": "11112",
                        "label":"voiceOut",
                        "deliveryMode":"AtLeastOnce",
                        "enabledEvents": [
                                "Customer_Created",
                                "Customer_Updated",
                                "Customer_Creation_Failed",
                                "Virtual_Account_Created",
                                "Virtual_Account_Closed",
                                "Virtual_Account_Creation_Failed",
                                "Account_Created",
                                "Account_Closed",
                                "Account_Frozen",
                                "Account_Unfrozen",
                                "Account_Creation_Failed",
                                "BookTransfer_Initiated",
                                "BookTransfer_Failed",
                                "BookTransfer_Successful",
                                "NIPTransfer_Initiated",
                                "NIPTransfer_Failed",
                                "NIPTransfer_Successful",
                                "Incoming_Transfer_Received",
                                "Virtual_Account_Transaction_Settlement",
                                "Document_Approved",
                                "Document_Rejected",
                                "Customer_Verification_Approved",
                                "Customer_Verification_Manual_Review",
                                "Bulk_Transfer_Completed"
                            ]
                    }
                }
            }

            let response = await URL_REQUEST(this.BASE_URL+'/webhooks', "POST", JSON.stringify(requestBody));
            console.log("bookTransfer Response---> ", response);
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

    public deleteWebhook = async (webhookId: any) => {
        try {
            let response = await URL_REQUEST(this.BASE_URL+`/webhooks/${webhookId}`, "DELETE", null);
            console.log("deleteWebhook Response---> ", response);
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

    public updateWebhook = async (webhookId: any, p: any) => {
        try {
            const requestBody = {
                "data": {
                    "type": "Webhook",
                    "attributes": {
                        "url": "https://eowruvix33d9b7g.m.pipedream.net",
                        "token": "1111",
                        "label":"voiceOut",
                        "deliveryMode":"AtLeastOnce",
                        "enabledEvents": [
                          "Customer_Created",
                           "Customer_Updated",
                          "Customer_Creation_Failed",
                          "Virtual_Account_Created",
                          "Virtual_Account_Closed",
                          "Virtual_Account_Creation_Failed",
                           "Account_Created"
                        ]
                    }
                }
            }

            let response = await URL_REQUEST(this.BASE_URL+`/webhooks/${webhookId}`, "PATCH", JSON.stringify(requestBody));
            console.log("bookTransfer Response---> ", response);
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

    public fetchWebhook = async (webhookId: any) => {
        try {
            let response = await URL_REQUEST(this.BASE_URL+`/webhooks/${webhookId}`, "GET", null);
            console.log("bookTransfer Response---> ", response);
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

    public listWebhooks = async (p: any) => {
        try {
            let { page, size } = p;
            let response = await URL_REQUEST(this.BASE_URL+`/webhooks?page=${page}&size=${size}`, "GET", null);
            console.log("bookTransfer Response---> ", response);
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

    public verifyWebhook = async (webhookId: any, p: any) => {
        try {
            let requestBody = {
                "data": {
                    "type": "Webhook",
                    "attributes": {
                        "eventType": "bulkTransfer.completed"
                    }
                }
            }
            let response = await URL_REQUEST(this.BASE_URL+`/webhooks/verify/${webhookId}`, "POST", JSON.stringify(requestBody));
            console.log("bookTransfer Response---> ", response);
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