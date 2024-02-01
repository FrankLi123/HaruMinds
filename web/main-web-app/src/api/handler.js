
    const countDailyAnswer = async (userId, yesCount, noCount, timeSpent) => {
        try {
          const url = `http://localhost:8000/result?userId=${encodeURIComponent(userId)}&yesCount=${encodeURIComponent(yesCount)}&noCount=${encodeURIComponent(noCount)}&timeSpent=${encodeURIComponent(timeSpent)}`;
      
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
      
          const response_data = await response.json();
    

          return response_data;
    
        } catch (error) {
          // Handle errors if needed
          return null
        }
      };


    const getRandomResponse = async (userId, yesCount, noCount, timeSpent) => {
      try {
        const url = `http://localhost:8000/request`;
    
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
    
        const response_data = await response.json();
        console.log("response_data",response_data.sentence)
        return response_data.sentence;
  
      } catch (error) {
        // Handle errors if needed
        console.log(error)
        return null
      }
    };

      export default {countDailyAnswer, getRandomResponse};