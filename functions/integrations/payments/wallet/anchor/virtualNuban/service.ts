import { AnchorService } from "../AnchorService";

import { URL_REQUEST } from "../utils/url";

export class VirtualNubanService extends AnchorService {
    
    public createReservedVirtualNuban = async (p: any) => {
        try {
            const requestBody = {
                "data": {
                    "type": "VirtualNuban",
                    "attributes": {
                        "virtualAccountDetail": {
                            "name": p.name,
                            "bvn": p.bvn,
                            "reference": p.reference,
                            "email": p.email,
                            "permanent": true
                        },
                        "provider": "providus"
                    },
                    "relationships": {
                        "settlementAccount": {
                            "data": {
                                "id": "170116701535414-anc_acc",
                                "type": "DepositAccount"
                            }
                        }
                    }
                }
            }

            let response = await URL_REQUEST(this.BASE_URL+'/virtual-nubans', "POST", JSON.stringify(requestBody));
            console.log("createReservedVirtualNuban---> ", JSON.stringify(response));
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

    public createSimpleVirtualNuban = async (p: any) => {
        try {
            const requestBody = {
                "data": {
                  "attributes": {
                    "virtualAccountDetail": {
                      "name": p.name,
                      "permanent": true,
                      "bvn": p.bvn,
                    },
                    "provider": "providus"
                  },
                  "relationships": {
                    "settlementAccount": {
                      "data": {
                        "type": p.subAccountType,
                        "id": p.subAccountId
                      }
                    }
                  },
                  "type": "VirtualNuban"
                }
            }

            let response = await URL_REQUEST(this.BASE_URL+'/virtual-nubans', "POST", JSON.stringify(requestBody));
            console.log("createSimpleVirtualNuban response---> ", JSON.stringify(response));
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

    public createDynamicVirtualNuban = async (p: any) => {
        try {
            const requestBody = {
                "data": {
                    "type": p.type,
                    "attributes": {
                        "virtualAccountDetail": {
                            "name": p.virtualAccountDetail.name,
                            "isPermanent": p.virtualAccountDetail.isPermanent,
                            "reference": p.virtualAccountDetail.reference
                        }
                    },
                    "relationships": {
                        "settlementAccount": {
                            "data": {
                                "id": p.settlementAccount.id,
                                "type": p.settlementAccount.type
                            }
                        }
                    }
                }
            }

            let response = await URL_REQUEST(this.BASE_URL+'/virtual-nubans', "POST", JSON.stringify(requestBody));
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

    public listVirtualNubanBySettlementAccount = async (settlementAccountId: any) => {
        try {

            let response = await URL_REQUEST(this.BASE_URL+`/virtual-nubans/by-settlement-account/${settlementAccountId}`, "GET", null);
            console.log("listVirtualNubanBySettlementAccount Response---> ", response);
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

    public fetchVirtualNuban = async (virtualAccountId: any) => {
        try {
            let response = await URL_REQUEST(this.BASE_URL+`/virtual-nubans/${virtualAccountId}`, "GET", null);
            console.log("fetchVirtualNuban Response---> ", response);
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

    public closeVirtualNuban = async (accountId: any) => {
        try {
            let response = await URL_REQUEST(this.BASE_URL+`/virtual-nubans/close-account/${accountId}`, "DELETE", null);
            console.log("closeVirtualNuban Response---> ", response);
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


// {
//     "data": {
//       "id": "170116701535414-anc_acc",
//       "type": "DepositAccount",
//       "attributes": {
//         "createdAt": "2023-11-28T10:23:35.356529",
//         "bank": {
//           "id": "16565854883910-anc_bk",
//           "name": "CORESTEP MICROFINANCE BANK",
//           "cbnCode": "",
//           "nipCode": "090365"
//         },
//         "accountName": "Owolabi Toluene Kanmitted",
//         "frozen": false,
//         "currency": "NGN",
//         "accountNumber": "******1209",
//         "type": "SAVINGS",
//         "status": "ACTIVE"
//       },
//       "relationships": {
//         "customer": {
//           "data": {
//             "id": "170107488434511-anc_ind_cst",
//             "type": "IndividualCustomer"
//           }
//         }
//       }
//     }
//   }