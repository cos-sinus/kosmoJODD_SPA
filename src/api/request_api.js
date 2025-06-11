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