export const get_all_satellites = async () => {
    const req = await fetch("http://localhost:5000/satellites/", {
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
    const req = await fetch(`http://localhost:5000/satellites/near/${satellite_id}`, {
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