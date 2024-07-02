import fetch from 'node-fetch';

// import { SWITCHIT_SANDBOX_URL } from '../../../config/index';

// const SWITCHIT_URL = process.env.SWITCHIT_SANDBOX_URL;
const SWITCHIT_URL = process.env.SWITCHIT_DEMO_URL;

export class SwitchITService {
    // BASE_URL = "https://demo.etranzact.com/switchitbillpayment/api/v1";
    BASE_URL = SWITCHIT_URL;

    GET_OPTIONS = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'terminalId': '7000000001',
            'pin': 'kghxqwveJ3eSQJip/cmaMQ==',
            'X-FORWARDED-FOR': '72.32.159.193, 60.91.3.17'
        }
    }

    public makeRequest = async (url: any, options: any, body=null) => {
        let k = await fetch(url, options);
        let response = await k.json();
        try {
            return { data: response, error: null }
        } catch(err) {
            return { data: null, error: err }
        }
    }

    public getBillCategory = async () => {
        console.log("base-url---->", this.BASE_URL);
        try {
            let categoryResponse = await this.makeRequest(this.BASE_URL+'/biller-category', this.GET_OPTIONS);
            console.log("category---> ", categoryResponse);
            if(categoryResponse && categoryResponse.data) {
                return  { 
                    status: true,
                    message: "success.",
                    data: categoryResponse.data.result
                }
            } else {
                return { 
                    status: false,
                    message: categoryResponse.error,
                    data: null
                }
            }
        } catch (e) {
            return { 
                status: false,
                message: e,
                data: null
            };
        }
    }

    public getBillerByCategory = async (categoryId: number) => {
        try {
            let categoryResponse = await this.makeRequest(this.BASE_URL+'/biller/category/'+categoryId, this.GET_OPTIONS);
            console.log("biller by category---> ", categoryResponse);
            if(categoryResponse && categoryResponse.data) {
                return {
                    status: true,
                    message: "success.",
                    data: categoryResponse.data.result,
                }
            } else {
                return { 
                    status: false,
                    message: categoryResponse.error,
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
    
    public getBillerServiceType = async (billId: number) => {
        try {
            let response = await this.makeRequest(this.BASE_URL+'/service-type/biller/'+billId, this.GET_OPTIONS);
            console.log("serviceResponse---> ", response);
            if(response && response.data) {
                return  {
                    status: true,
                    message: "success.",
                    data: response.data.result,
                }
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

    public getBillPaymentStatus = async (paymentRef: any) => {
        try {
            let response = await this.makeRequest(this.BASE_URL+'/bill-status/'+paymentRef, this.GET_OPTIONS);
            console.log("statusResponse---> ", response);
            if(response && response.data) {
                return response.data.result;
            } else {
                return response.error;
            }
        } catch (e) {
            return { 
                status: false,
                message: e
            };
        }
    }

    public postBillQuery = async (billId: any, clientRef: any, customerId: any) => {
        try {
            let requestBody = {
                billId,
                clientRef,
                customerId
            };

            let options = {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'terminalId': '7000000001',
                    'pin': 'kghxqwveJ3eSQJip/cmaMQ==',
                    'X-FORWARDED-FOR': '72.32.159.193, 60.91.3.17'
                },
                body: JSON.stringify(requestBody)      
            }

            let response = await this.makeRequest(this.BASE_URL+'/bill-query', options);
            console.log("postBillResponse---> ", response);
            if(response && response.data) {
                return { 
                    status: true,
                    message: "success.",
                    data: response.data.result
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
    
    public postBillPayment = async (clientRef: any, billQueryRef: any, billId: any, customerId: any, amount: number, productId: any) => {
        try {
            let requestBody =  {
                clientRef, 
                billQueryRef,
                billId,
                customerId,
                amount,
                productId
            }
            console.log("postBillPayment requestBody--->", requestBody);
            let options = {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'terminalId': '7000000001',
                    'pin': 'kghxqwveJ3eSQJip/cmaMQ==',
                    'X-FORWARDED-FOR': '72.32.159.193, 60.91.3.17'
                },
                body: JSON.stringify(requestBody)      
                // body: requestBody   
            }

            let response = await this.makeRequest(this.BASE_URL+'/bill-payment', options);
            console.log("postPaymentResponse---> ", response);
            if(response && response?.data) {
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


    public getAllBillerByCategory = async () => {
        let catArr = [1,2,3,4,5,6,7];
        try {
            let catResponse = catArr.map(async (eachCat) => { 
                let response = await this.makeRequest(this.BASE_URL+'/biller/category/'+eachCat, this.GET_OPTIONS);
                if(response && response.data) {
                    return response.data.result;
                }
            });
           
            if(catResponse && catResponse.length > 0) {
                let result = await Promise.all(catResponse);
                let getAllFlat = result.flat();
                return {
                    status: true,
                    message: "success.",
                    data: getAllFlat
                };
            } else {
                console.log("category response error---> ", catResponse);
                return {
                    status: false,
                    message: "get all billers by category error",
                    data: null
                };
            }
        } catch (err) {
            return {
                status: false,
                message: err,
                data: null
            }
        }
    }
 
}
