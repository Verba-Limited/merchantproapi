import { AnchorService } from "../AnchorService";

import { URL_REQUEST } from "../utils/url";

export class CustomerService extends AnchorService {
    
    public createIndividualCustomer = async (p: any) => {
        try {
            console.log("createIndividualCustomer request--->", p);
            const requestBody = {
                "data": {
                    "type": "IndividualCustomer",
                    "attributes": {
                        // "bvn": p.bvn,
                        "fullName": {
                            "firstName": p.firstName,
                            "lastName": p.lastName
                            // "middleName": p.middleName
                        },
                        "dateOfBirth": p.dateOfBirth,
                        "gender": p.gender,
                        "email": p.email,
                        "phoneNumber": p.phoneNumber,
                        "address": {
                            "addressLine_1": p.addressLine_1,
                            "addressLine_2": p.addressLine_2,
                            "city": p.city,
                            "state": p.state,
                            "postalCode": p.postalCode,
                            "country": p.country
                        },
                        "isSoleProprietor": true,
                        "description": p.description,
                        "doingBusinessAs": "BillOnUser"
                    }
                }
            }

            let response = await URL_REQUEST(this.BASE_URL+'/customers', "POST", JSON.stringify(requestBody));
            console.log("createIndividualCustomer response---> ", JSON.stringify(response));
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

    public createSimpleIndividualCustomer = async (p: any) => {
        try {
            console.log("createIndividualCustomer request--->", p);
            const requestBody = {
                "data": {
                    "attributes": {
                        "fullName": {
                            "firstName": p.firstName,
                            "lastName": p.lastName
                        },
                        "address": {
                            "country": p.country,
                            "state": p.state,
                            "addressLine_1": p.addressLine_1,
                            "addressLine_2": p.addressLine_2,
                            "city": p.city,
                            "postalCode": p.postalCode
                        },
                        "email": p.email,
                        "phoneNumber": p.phoneNumber,
                        "description": p.description,
                    },
                    "type": "IndividualCustomer"
                }
            }
           
            let response = await URL_REQUEST(this.BASE_URL+'/customers', "POST", JSON.stringify(requestBody));
            console.log("createIndividualCustomer response---> ", JSON.stringify(response));
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

    public createBusinessCustomer = async (p: any) => {
        try {
            let requestBody = {
                "data": {
                    "type": "BusinessCustomer",
                    "attributes": {
                        "basicDetail": {
                            "businessName": p.businessName,
                            "businessBvn": p.businessBvn,
                            "industry": p.industry,
                            "registrationType": p.registrationType,
                            "dateOfRegistration": p.dateofRegistration,
                            "country": p.country,
                            "description": p.description
                        },
                        "contact": {
                            "email": {
                                "general": p.generalEmail,
                                "support": p.supportEmail,
                                "dispute": p.disputeEmail
                            },
                            "phoneNumber": p.phoneNumber,
                            "address": {
                                "main": {
                                    "addressLine_1": p.address.main.addressLine1,
                                    "addressLine_2": p.address.main.addressLine2,
                                    "postalCode": p.address.main.postalCode,
                                    "city": p.address.main.city,
                                    "state": p.address.main.state,
                                    "country": p.address.main.country
                                },
                                "registered": {
                                    "addressLine_1": p.address.registered.addressLine1,
                                    "addressLine_2": p.address.registered.addressLine2,
                                    "postalCode": p.address.registered.postalCode,
                                    "city": p.address.registered.city,
                                    "state": p.address.registered.state,
                                    "country": p.address.registered.country
                                }
                            }
                        },
                        "officers": [
                            {
                                "fullName": {
                                    "firstName": p.officers.firstName,
                                    "lastName": p.officers.lastName,
                                    "middleName": p.officers.lastName
                                },
                                "role": p.officers.role,
                                "dateOfBirth": p.officers.dateOfBirth,
                                "email": p.officers.email,
                                "phoneNumber": p.officers.phoneNumber,
                                "nationality": p.officers.country,
                                "address": {
                                    "addressLine_1": p.officers.addressLine1,
                                    "addressLine_2": p.officers.addressLine2,
                                    "postalCode": p.officers.postalCode,
                                    "city": p.officers.city,
                                    "state": p.officers.state,
                                    "country": p.officers.country
                                },
                                "bvn": p.officers.bvn,
                                "percentageOwned": p.officers.percentageOwned //1.0
                            }
                        ]
                    }
                }
            }

            
            let response = await URL_REQUEST(this.BASE_URL+'/customers', "POST", JSON.stringify(requestBody));
            console.log("createBusinessCustomer---> ", response);
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

    public updateBusinessCustomer = async (customerId: any, p: any) => {
        try {
            let requestBody = {
                "data": {
                    "type": "BusinessCustomer",
                    "attributes": {
                        "basicDetail": {
                            "businessName": p.businessName,
                            "businessBvn": p.businessBvn,
                            "industry": p.industry,
                            "registrationType": p.registrationType,
                            "dateOfRegistration": p.dateofRegistration,
                            "country": p.country,
                            "description": p.description
                        },
                        "contact": {
                            "email": {
                                "general": p.generalEmail,
                                "support": p.supportEmail,
                                "dispute": p.disputeEmail
                            },
                            "phoneNumber": p.phoneNumber,
                            "address": {
                                "main": {
                                    "addressLine_1": p.address.main.addressLine1,
                                    "addressLine_2": p.address.main.addressLine2,
                                    "postalCode": p.address.main.postalCode,
                                    "city": p.address.main.city,
                                    "state": p.address.main.state,
                                    "country": p.address.main.country
                                },
                                "registered": {
                                    "addressLine_1": p.address.registered.addressLine1,
                                    "addressLine_2": p.address.registered.addressLine2,
                                    "postalCode": p.address.registered.postalCode,
                                    "city": p.address.registered.city,
                                    "state": p.address.registered.state,
                                    "country": p.address.registered.country
                                }
                            }
                        },
                        "officers": [
                            {
                                "fullName": {
                                    "firstName": p.officers.firstName,
                                    "lastName": p.officers.lastName,
                                    "middleName": p.officers.lastName
                                },
                                "role": p.officers.role,
                                "dateOfBirth": p.officers.dateOfBirth,
                                "email": p.officers.email,
                                "phoneNumber": p.officers.phoneNumber,
                                "nationality": p.officers.country,
                                "address": {
                                    "addressLine_1": p.officers.addressLine1,
                                    "addressLine_2": p.officers.addressLine2,
                                    "postalCode": p.officers.postalCode,
                                    "city": p.officers.city,
                                    "state": p.officers.state,
                                    "country": p.officers.country
                                },
                                "bvn": p.officers.bvn,
                                "percentageOwned": p.officers.percentageOwned //1.0
                            }
                        ]
                    }
                }
            }

            
            let response = await URL_REQUEST(this.BASE_URL+`/customers/update/${customerId}`, "PUT", JSON.stringify(requestBody));
            console.log("updateBusinessCustomer---> ", response);
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
 
    public listCustomers = async (p: any) => {
        try {
            let { type, page, size } = p;

            let response = await URL_REQUEST(this.BASE_URL+`/customers?type=${type}&page=${page}&size=${size}`, "GET", null);
            console.log("listCustomers Response---> ", response);
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

    public fetchCustomer = async (p: any) => {
        try {
            let { customerId } = p;

            let response = await URL_REQUEST(this.BASE_URL+`/customers/:${customerId}`, "GET", null);
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

    public submitKYCDocument = async (p: any) => {
        try {
            let { customerId, documentId } = p;

            // form data

            let response = await URL_REQUEST(this.BASE_URL+`/documents/upload-document/${customerId}/${documentId}`, "POST", "form data");
            console.log("createIndividualCustomer---> ", response);
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

    public fetchKYCDocumentByCustomerId = async (customerId: any) => {
        try {
            let response = await URL_REQUEST(this.BASE_URL+`/documents/:${customerId}`, "GET", null);
            console.log("fetchKYCDocumentByCustomerId Response---> ", response);
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

    public downloadKYCDocument = async (p: any) => {
        try {
            let { customerId, documentId } = p;
            let response = await URL_REQUEST(this.BASE_URL+`/documents/download-document/${customerId}/${documentId}`, "GET", null);
            console.log("downloadKYCDocument Response---> ", response);
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

    public upgradeToTier2 = async (customerId: any, p: any) => {
        try {
            console.log("upgradeToTier2 request--->", p);
            
            const requestBody = {
                "data": {
                  "attributes": {
                    "identificationLevel2": {
                      "dateOfBirth": p.dateOfBirth,
                      "gender": p.gender,
                      "bvn": p.bvn,
                      "selfieImage": p.selfieImage
                    },
                    "email": p.email,
                    "phoneNumber": p.phoneNumber,
                    "description": "Upgrade to Tier Two",
                    "doingBusinessAs": "BillOnUser"
                  },
                  "type": "IndividualCustomer"
                }
            };

            let response = await URL_REQUEST(this.BASE_URL+`/customers/update/${customerId}`, "POST", JSON.stringify(requestBody));
            console.log("upgradeToTier2 response---> ", JSON.stringify(response));
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

    public upgradeToTier3 = async (customerId: any, p: any) => {
        try {
            console.log("upgradeToTier3 request--->", p);
            
            const requestBody = {
                "data": {
                  "attributes": {
                    "identificationLevel3": {
                      "idType": p.idType,
                      "idNumber": p.idNumber,
                      "expiryDate": p.expiryDate
                    },
                    "email": p.email,
                    "phoneNumber": p.phoneNumber,
                    "description": "Upgrade to Tier Three",
                    "doingBusinessAs": "BillOnUser"
                  },
                  "type": "IndividualCustomer"
                }
            };

            let response = await URL_REQUEST(this.BASE_URL+`/customers/update/${customerId}`, "POST", JSON.stringify(requestBody));
            console.log("upgradeToTier3 response---> ", JSON.stringify(response));
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

}