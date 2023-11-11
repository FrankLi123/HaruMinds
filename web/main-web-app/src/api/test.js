const getTrendData = async (userId) => {
    
    try {
      const url = `http://localhost:8000/retrieve?userId=${encodeURIComponent(userId)}}`;
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      };
  
      const response = await fetch(url, requestOptions);
  

      if (response.status !== 200) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      console.log("response is : ", response) 
      
      const response_data = await response.json();
      return response_data

    } catch (error) {
      // Handle errors if needed
      return null
    }
  };


  export default getTrendData;