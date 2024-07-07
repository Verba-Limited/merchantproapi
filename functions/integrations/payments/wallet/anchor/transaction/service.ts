import { AnchorService } from "../AnchorService";

import { URL_REQUEST } from "../utils/url";

export class TransactionService extends AnchorService {
    
    public listTransactions = async (p: any) => {
        try {
            const { accountId, customerId, from, to, page, size } = p;

            let response = await URL_REQUEST(this.BASE_URL+`/transactions?accountId=${accountId}&customerId=${customerId}&from=${from}&to=${to}&page=${page}&size=${size}`, "GET", null);
            console.log("listTransactions Response---> ", response);
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

    public getTransaction = async (transactionId: any) => {
        try {
            let response = await URL_REQUEST(this.BASE_URL+`/transactions?/${transactionId}`, "GET", null);
            console.log("getTransaction Response---> ", response);
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