import { api_url } from ".";

export const signup = async (data) => {
    const req = await fetch(`http://${api_url}/users/signup/`, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(data)
    });
    
    if(req.ok){
        const res = await req.json();
        console.log(res);    
    }
    return req.ok;
}

export const signin = async (data) => {
    const req = await fetch(`http://${api_url}/users/signin/`, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(data)
    });
    
    if(req.ok){
        const res = await req.json();
        console.log(res);
        return res.token;  
    }
    return req.ok;
}

export const me = async (token) => {
    const req = await fetch(`http://${api_url}/users/me/`, {
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        }
    });
    
    if(req.ok){
        const res = await req.json();
        return res;
    }
    return req.ok;
}