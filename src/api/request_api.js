export const send_request = async (data, token) => {
    const req = await fetch("http://localhost:5000/requests/", {
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
    const req = await fetch("http://localhost:5000/requests/unchecked/", {
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
