import Cookies from 'js-cookie';
import { BASE_URL } from "./Constants"; 

async function GetUserInfo() {
    try {
        const token = String(Cookies.get('token'));        
        const response = await fetch(BASE_URL + 'user', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user info');
        }

        const userData = await response.json();
        return userData;
    } catch (error) {
        console.error('Error fetching user info:', error.message);
        return null; 
    }
}

export default GetUserInfo;
