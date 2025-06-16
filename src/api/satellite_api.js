import { api_url } from ".";

export const get_all_satellites = async () => {
    const req = await fetch(`http://${api_url}/satellites/`, {
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
        }
    });
    
    if(req.ok){
        const res = await req.json();
        return res;   
    }
    return req.ok;
}
export const get_near_satellites = async (satellite_id) => {
    const req = await fetch(`http://${api_url}/satellites/near/${satellite_id}`, {
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
        }
    });
    if(req.ok){
        const res = await req.json();
        return res;   
    }
    return req.ok;
}