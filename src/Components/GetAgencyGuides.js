import { BASE_URL } from "./Constants";

async function fetchRestaurants(userId) {
  try {
    const response = await fetch(`${BASE_URL}verifiedRestaurant?user_id=${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch restaurants');
    }
    const responseData = await response.json();
    const data = responseData.data || [];
    console.log(data);
    return data.length > 0 ? data : false;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return false; 
  }
}

export default fetchRestaurants;
