import config from '../../../config.json';

export const submitUserResult = async({submitResultConfig})=>{

    console.log(submitResultConfig)
    const currentTime = new Date();
    const timeSpentInSecond = Math.floor(Math.abs(currentTime - submitResultConfig.time)/ 1000 );
    console.log("distractYesCount is: "+ submitResultConfig.distractYesCount + " ,distractNoCount is: " + submitResultConfig.distractNoCount + " ,timeSpent is : " + timeSpentInSecond);

    const userId = sessionStorage.getItem('user_id');
    // make the api call 
    try{
      const res = await countDailyAnswer(userId, submitResultConfig.distractYesCount, submitResultConfig.distractNoCount,submitResultConfig.tipYesCount,submitResultConfig.tipNoCount, timeSpentInSecond);

      console.log(res.success)

        if( res.success){

         
          window.close()
        }
      
    }catch(error){
        console.log(error)
    }
  }



  const countDailyAnswer = async (userId, distractYesCount, distractNoCount, tipYesCount,tipNoCount,timeSpent) => {
    try {

      // console.log("countDailyAnswer, the passed in values are ")
      const url = `${config.apiBaseUrl}/result?userId=${encodeURIComponent(userId)}&distractYesCount=${encodeURIComponent(distractYesCount)}&distractNoCount=${encodeURIComponent(distractNoCount)}&tipYesCount=${encodeURIComponent(tipYesCount)}&tipNoCount=${encodeURIComponent(tipNoCount)}&timeSpent=${encodeURIComponent(timeSpent)}`;
  
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
      const url = `${config.apiBaseUrl}/request/ai?text=${encodeURIComponent(text)}}`;
  
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



  export const retrieveDailyPlanRequest = async (userId) => {
  
    try {
      const url = `${config.apiBaseUrl}/retrieve/daily_plan?userId=${encodeURIComponent(userId)}}`;
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
      console.log("retrieveDailyPlanRequest() - the response is", responseData.message);
      return responseData;
    } catch (error) {
      // Handle errors if needed
      console.error('Error:', error.message);
    }
  };
  


export const retrieveReasonsRequest = async () => {
  
  try {
    const url = `${config.apiBaseUrl}/retrieve/reasons`;
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
    const url = `${config.apiBaseUrl}/retrieve/user_data?userId=${userId}`;
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