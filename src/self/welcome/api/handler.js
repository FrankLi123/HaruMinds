import config from "../../..//config.json";


export const initalSettingData = async (userId, answerObject) => {

    try {

      const jsonString = JSON.stringify(answerObject);
      const url = `${config.apiBaseUrl}/setting/initialSetting?userId=${userId}&answers=${jsonString}`;
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
  
      return responseData.message;
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
  