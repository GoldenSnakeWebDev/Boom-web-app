export const fetchBooms = async (page:Number) => {
    const token = localStorage.getItem('token');

    if (token) {

        const headers = {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            "Authorization": token,
        };
        const res = await fetch(`${process.env.REACT_APP_BASIC_URL}booms/only-auth?page=${page}`, {
            method:'get',
            headers: headers
        })
    
        return res;
    }
}   

export const searchBooms = async (query:string) => {
    const token = localStorage.getItem("token");

    if (token) {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': '$token',
        };

        const res = await fetch(`${process.env.REACT_APP_BASIC_URL}searching?search=${query}&page=all`, {
            method:'get',
            headers: headers
        })
    
        return res;
    }
}

export const reactToBoom = async (reactionType:string, boomID:string) => {
    const token = localStorage.getItem("token");

    if (token) {
        const curDate = new Date();
        const body = {
            "react_type": reactionType,
            "timestamp": curDate,
        }
        const res = await fetch(`${process.env.REACT_APP_BASIC_URL}react-to-booms/${boomID}`, {
            method:'PATCH',
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": token,
            },
            body:JSON.stringify(body)
        })

        return res;

    }
}