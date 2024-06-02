import { AnchorService } from "../AnchorService";

import { URL_REQUEST_WITH_TOKEN  } from "../utils/url";

export class AuthorizationService extends AnchorService {
       
    public getApiKeys = async (p: any) => {
        try {
            let response = await URL_REQUEST_WITH_TOKEN(this.BASE_URL+`/organizations/tokens`, "GET", null);
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