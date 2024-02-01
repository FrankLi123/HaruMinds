import config from '../../../config.json';

const registration = async(username, password, userEmail)=>{
    try{
 
        const url = `${config.apiBaseUrl}/register?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&email=${encodeURIComponent(userEmail)}`;

        const requestOptions = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
          };

        const response = await fetch( url ,requestOptions);

        console.log(response.body);
        console.log(response.status)

        if(response.status !== 200){
            throw new Error(`Registration Request failed with status ${response.status}`);
        }

        const response_data = await response.json();
  
        console.log(response_data)

        if(response_data.success == false){
            return false;
        }else{
            return true;
        }
      }catch(error){
        console.log(error)
      }
};

export default registration;