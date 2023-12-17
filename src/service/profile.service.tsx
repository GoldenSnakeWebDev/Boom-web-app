export const fetchMyProfile = async () => {
    const token = localStorage.getItem('token');

    if (token) {
        const headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": token,
        }

        const res = await fetch(`${process.env.REACT_APP_BASIC_URL}users/currentUser`, {
            method:'get',
            headers: headers
        })
    
        return res;
    }
}