export const submitUserResult = async({submitResultConfig})=>{

    console.log(submitResultConfig)
    const currentTime = new Date();
    const timeSpentInSecond = Math.floor(Math.abs(currentTime - submitResultConfig.time)/ 1000 );
    console.log("yesCount is: "+ submitResultConfig.yesCount + " ,noCount is: " + submitResultConfig.noCount + " ,timeSpent is : " + timeSpentInSecond);

    const userId = sessionStorage.getItem('user_id');
    // make the api call 
    try{
      const res = await countDailyAnswer(userId, submitResultConfig.yesCount, submitResultConfig.noCount, timeSpentInSecond);

      console.log(res.success)

        if( res.success){

         
          window.close()
        }
      
    }catch(error){
        console.log(error)
    }
  }



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



export  const getOpenAIResult = async (text) => {
    try {


      console.log("!!", text)
      const url = `http://localhost:8000/request/ai?text=${encodeURIComponent(text)}}`;
  
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

      return response_data.sentence;

    } catch (error) {
      // Handle errors if needed
      return null
    }
  };



  export const initalSettingData = async (userId, reasons, tips, personality) => {
    
    try {
      const url = `http://localhost:8000/setting/initialSetting?userId=${userId}&reasons=${reasons}&tips=${tips}&personality=${personality}`;
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      const response = await fetch(url, requestOptions);
  
      if (response.status !== 200) {
        throw new Error(`Request failed with status ${response.status}`);
      }
  
      const responseData = await response.json();
  
      console.log(responseData.message); // 'User updated successfully'
  
    } catch (error) {
      // Handle errors if needed
      console.error('Error:', error.message);
    }
  };



export const retrieveReasonsRequest = async () => {
  
  try {
    const url = "http://localhost:8000/retrieve/reasons";
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(url, requestOptions);
    if (response.status !== 200) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const responseData = await response.json();
    // console.log("In retrieveReasonsRequest(), the response is", responseData.message);

    return responseData;
  } catch (error) {
    // Handle errors if needed
    console.error('Error:', error.message);
  }
};



export const retrieveUserData = async (userId) => {
  
  try {
    const url = `http://localhost:8000/retrieve/user_data?userId=${userId}`;
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(url, requestOptions);
    if (response.status !== 200) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const responseData = await response.json();
    // console.log("In retrieveReasonsRequest(), the response is", responseData.message);
    console.log("responsedata is", responseData)
    return responseData;
  } catch (error) {
    // Handle errors if needed
    console.error('Error:', error.message);
  }
};



//   const getRandomResponse = async() => {
//     try {
//       const url = `http://localhost:8000/request`;
//       const requestOptions = {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//       };
  
//       const response = await fetch(url, requestOptions);
      
//       if (response.status !== 200) {
//         throw new Error(`Request failed with status ${response.status}`);
//       }
  
//       const response_data = await response.json();
//       console.log("response_data",response_data.sentence)
//       return response_data.sentence;

//     } catch (error) {
//       // Handle errors if needed
//       console.log(error)
//       return null
//     }
//   };


//   export default {submitUserResult, countDailyAnswer};