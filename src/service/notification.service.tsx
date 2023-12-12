export const fetchAllNotifications = async () => {
    const token = localStorage.getItem('token');

    if (token) {

        const headers = {

            "Authorization": token,
        };
        const res = await fetch(`${process.env.REACT_APP_BASIC_URL}notifications?page=all`, {
            method:'get',
            headers: headers
        })
    
        return res;
    }
}