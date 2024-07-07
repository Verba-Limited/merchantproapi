import { AnchorService } from "../AnchorService";

import { URL_REQUEST } from "../utils/url";

export class BulkTransferService extends AnchorService {
    
    public createBulkTransfer = async (p: any) => {
        try {
            // const requestBody = {
            //     "data": [
            //         {
            //             "type": "BOOK_TRANSFER",
            //             "attributes": {
            //                 "amount": 100,
            //                 "currency": "NGN",
            //                 "reason": "Test Book Transfer",
            //                 "reference": "12343"
            //             },
            //             "relationships": {
            //                 "account": {
            //                     "data": {
            //                         "id": "16544401669690-anc_acc",
            //                         "type": "DepositAccount"
            //                     }
            //                 },
            //                 "destinationAccount": {
            //                     "data": {
            //                         "id": "16535865041710-anc_acc",
            //                         "type": "DepositAccount"
            //                     }
            //                 }
            //             }
            //         },
            //         {
            //             "type": "NIP_TRANSFER",
            //             "attributes": {
            //                 "amount": 100,
            //                 "currency": "NGN",
            //                 "reason": "Test Bulk NIP",
            //                 "reference": "3433"
            //             },
            //             "relationships": {
            //                 "account": {
            //                     "data": {
            //                         "id": "16544401669690-anc_acc",
            //                         "type": "DepositAccount"
            //                     }
            //                 },
            //                 "counterParty": {
            //                     "data": {
            //                         "id": "16582022567650-anc_cp",
            //                         "type": "DepositAccount"
            //                     }
            //                 }
            //             }
            //         }
            //     ]
            // }

            const requestBody = p;

            let response = await URL_REQUEST(this.BASE_URL+'/transfers/bulk', "POST", JSON.stringify(requestBody));
            console.log("createBulkTransfer Response---> ", response);
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

    public fetchBulkTransfer = async (bulkTransferId: any) => {
        try {
            let response = await URL_REQUEST(this.BASE_URL+`/transfers/bulk/${bulkTransferId}`, "GET", null);
            console.log("fetchBulkTransfer Response---> ", response);
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