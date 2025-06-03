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