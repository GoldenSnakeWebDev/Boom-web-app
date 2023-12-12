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