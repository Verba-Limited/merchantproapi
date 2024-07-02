import { AnchorService } from "../AnchorService";

import { URL_REQUEST } from "../utils/url";

export class EventService extends AnchorService {
       
    public fetchEvent = async (eventId: any) => {
        try {
            let response = await URL_REQUEST(this.BASE_URL+`/events/${eventId}`, "GET", null);
            console.log("fetchEvent Response---> ", response);
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

    public listEvents = async (p: any) => {
        try {
            let { type, page, size } = p;
            let response = await URL_REQUEST(this.BASE_URL+`/events?page=${page}&size=${size}&type=${type}`, "GET", null);
            console.log("listEvents Response---> ", response);
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

    public getEventTypes = async (p: any) => {
        try {
            let response = await URL_REQUEST(this.BASE_URL+`/events/event-types`, "GET", null);
            console.log("getEventTypes Response---> ", response);
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