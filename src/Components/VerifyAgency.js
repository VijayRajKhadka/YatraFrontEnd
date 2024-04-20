import { BASE_URL } from "./Constants";

async function fetchTravelAgency(userId) {
  try {
    const response = await fetch(`${BASE_URL}verifiedAgency?user_id=${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch agency');
    }
    const responseData = await response.json();
    const data = responseData.data || [];
    console.log(data);
    return data.length > 0 ? data : false;
  } catch (error) {
    console.error('Error fetching agency:', error);
    return false; 
  }
}

export default fetchTravelAgency;
