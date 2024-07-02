import { AnchorService } from "../AnchorService";

import { URL_REQUEST } from "../utils/url";

export class PaymentsService extends AnchorService {
    
    public listPayment = async (p: any) => {
        try {
            const { accountId, virtualNubanId, from, to, page, size } = p;

            let response = await URL_REQUEST(this.BASE_URL+`/payments?accountId=${accountId}&virtualNubanId=${virtualNubanId}&from=${from}&to=${to}&page=${page}&size=${size}`, "GET", null);
            console.log("listPayment Response---> ", response);
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

    public getPayment = async (paymentId: any) => {
        try {
            let response = await URL_REQUEST(this.BASE_URL+`/payments?/${paymentId}`, "GET", null);
            console.log("getPayment Response---> ", response);
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

    public requeryPayment = async (reference: any) => {
        try {
            let response = await URL_REQUEST(this.BASE_URL+`/payments/requery/${reference}`, "GET", null);
            console.log("requeryPayment Response---> ", response);
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