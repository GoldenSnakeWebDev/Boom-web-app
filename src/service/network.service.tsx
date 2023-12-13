export const getNetworks = async () => {
    const token = localStorage.getItem('token');

    if (token) {

        const headers = {

            "Content-Type": "application/json",
            "Accept": "application/json",
        };
        const res = await fetch(`${process.env.REACT_APP_BASIC_URL}networks?page=all`, {
            method:'get',
            headers: headers
        })

        if (res) {

            if (res.status === 200) {
                
                // Check if the response body is not null
                if (res.body) {
                    const reader = res.body.getReader();
                    let result = '';
        
                    // Assuming the response is text, adjust as needed for other types
                    while (true) {
                    const { done, value } = await reader.read();
        
                    if (done) {
                        break;
                    }
        
                    result += new TextDecoder().decode(value);
                    }
        
                    // Now, parse the string using JSON.parse
                    console.log("all networkmodel >>>>", JSON.parse(result).networks);
                    localStorage.setItem('networkModel', JSON.stringify(JSON.parse(result).networks));
    
                } else {
                    console.error('Response body is null.');
                }
            }
        }
    
        return res;
    }
}