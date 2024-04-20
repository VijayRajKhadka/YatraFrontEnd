import { BASE_URL } from "./Constants";


const notifyApp = async (title, body) => {
    try {
      const response = await fetch(BASE_URL+'notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send notification');
      }
  
      const responseData = await response.json();
      console.log('Notification sent successfully:', responseData);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  export default notifyApp;