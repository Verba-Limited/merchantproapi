import { AnchorService } from "../AnchorService";

import { URL_REQUEST } from "../utils/url";

export class BookTransferService extends AnchorService {
    
    public bookTransfer = async (p: any) => {
        try {
            const requestBody = {
                "data": {
                    "type": "BookTransfer",
                    "attributes": {
                        "amount": p.amount,
                        "currency": p.currency,
                        "reason": p.reason,
                        "reference": p.reference
                    },
                    "relationships": {
                        "account": {
                            "data": {
                                "id": p.customerSenderId,
                                "type": p.senderAccountType
                            }
                        },
                        "destinationAccount": {
                            "data": {
                                "id": p.customerDestinationId,
                                "type": p.destinationAccountType
                            }
                        }
                    }
                }
            }

            let response = await URL_REQUEST(this.BASE_URL+'/transfers', "POST", JSON.stringify(requestBody));
            console.log("bookTransfer Response---> ", response);
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

    public listBookTransfers = async (p: any) => {
        try {
            let { customerId, accountId, destinationAccountId, from, to, page, size } = p;
            let response = await URL_REQUEST(this.BASE_URL+`/transfers?type=BOOK_TRANSFER&customerId=${customerId}&accountId=${accountId}&destinationAccountId=${destinationAccountId}&from=${from}&to=${to}&page=${page}&size=${size}`, "GET", null);
            console.log("listBookTransfers Response---> ", response);
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

    public fetchBookTransfer = async (transferId: any) => {
        try {
            let response = await URL_REQUEST(this.BASE_URL+`/transfers/${transferId}`, "GET", null);
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

}