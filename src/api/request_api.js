import { api_url } from ".";

export const send_request = async (data, token) => {
    const req = await fetch(`http://${api_url}/requests/`, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        },
        body : JSON.stringify(data)
    });
    return req.ok;
}

export const get_unchecked_requests = async (token) => {
    const req = await fetch(`http://${api_url}/requests/unchecked/`, {
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        }
    });
    const res = await req.json();
    if(req.ok){
        return res;
    }
    return req.ok;
}

export const confirm = async (token, request_id, formData) => {
    const req = await fetch(`http://${api_url}/requests/accept/${request_id}`, {
        method: "PUT",
        headers : {
            "Authorization" : `Bearer ${token}`
        },
        body: formData
    });
    const res = await req.json();
    if(req.ok){
        return res;
    }
    return req.ok;
}

export const reject = async (token, request_id, data) => {
    const req = await fetch(`http://${api_url}/requests/decline/${request_id}`, {
        method: "PUT",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        },
        body : JSON.stringify(data)
    });
    const res = await req.json();
    if(req.ok){
        return res;
    }
    return req.ok;
}

export const get_own_requests = async(token) => {
    const req = await fetch(`http://${api_url}/requests/own/`, {
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        }
    });
    const res = await req.json();
    if(req.ok){
        return res;
    }
    return req.ok;
}