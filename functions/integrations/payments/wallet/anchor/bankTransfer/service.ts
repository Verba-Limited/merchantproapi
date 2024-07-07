import { AnchorService } from "../AnchorService";

import { URL_REQUEST } from "../utils/url";

export class BankTransferService extends AnchorService {
    
    public nipTransfer = async (p: any) => {
        try {
            const requestBody = {
                "data": {
                    "type": "NIPTransfer",
                    "attributes": {
                        "amount": p.amount,
                        "currency": p.currency,
                        "reason": p.reason,
                        "reference": p.reference
                    },
                    "relationships": {
                        "account": {
                            "data": {
                                "id": p.accountId,
                                "type": p.accountType
                            }
                        },
                        "counterParty": {
                            "data": {
                                "id": p.counterPartyId,
                                "type": p.counterPartyType
                            }
                        }
                    }
                }
            }

            let response = await URL_REQUEST(this.BASE_URL+'/transfers', "POST", JSON.stringify(requestBody));
            console.log("bankTransfer Response---> ", response);
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

    public listNipTransfers = async (p: any) => {
        try {
            let { customerId, counterPartyId, accountId, from, to, page, size } = p;
            let response = await URL_REQUEST(this.BASE_URL+`/transfers?customerId=${customerId}&accountId=${accountId}&counterPartyId=${counterPartyId}&type=NIP_TRANSFER&from=${from}&to=${to}&page=${page}&size=${size}`, "GET", null);
            console.log("listNIPTransfer Response---> ", response);
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

    public fetchNipTransfer = async (transferId: any) => {
        try {
            let response = await URL_REQUEST(this.BASE_URL+`/transfers/${transferId}`, "GET", null);
            console.log("fetchNipTransfer Response---> ", response);
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