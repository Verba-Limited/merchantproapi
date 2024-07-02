export const URL_REQUEST = async (url: any, method: any, body: any) => {
    let options = {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-anchor-key': 'J3w3g.30253a81f968f8c1270ad0f756eb7b1fac40bc14be3f9b5f36b82203896e3617a2ee922c0141f2d8bc64d1712aa200f367cd'
        },
        body      
    }

    let k = await fetch(url, options);
    let response = await k.json();
    try {
        return { data: response, error: response?.errors }
    } catch(err) {
        return { data: null, error: err }
    }
}

export const URL_REQUEST_WITH_TOKEN = async (url: any, method: any, body: any) => {
    let options = {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 16992694273610-anc_og',
            'x-anchor-key': 'J3w3g.30253a81f968f8c1270ad0f756eb7b1fac40bc14be3f9b5f36b82203896e3617a2ee922c0141f2d8bc64d1712aa200f367cd'
        },
        body      
    }

    let k = await fetch(url, options);
    let response = await k.json();
    try {
        return { data: response, error: null }
    } catch(err) {
        return { data: null, error: err }
    }
}

export const URL_REQUEST_FILE = async (url: any, method: any, body: any) => {
    let options = {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'x-anchor-key': 'J3w3g.30253a81f968f8c1270ad0f756eb7b1fac40bc14be3f9b5f36b82203896e3617a2ee922c0141f2d8bc64d1712aa200f367cd'
        },
        body      
    }

    let k = await fetch(url, options);
    let response = await k.json();
    try {
        return { data: response, error: null }
    } catch(err) {
        return { data: null, error: err }
    }
}