const authenticate = async(username, password, event)=>{
    try{
        // event.preventDefault();
        const url = `http://localhost:8000/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

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
            throw new Error(`Request failed with status ${response.status}`);
          }

        const response_data = await response.json();
        console.log(response_data)

        if(response_data.success == false){
            
            return {
                success: false
            };

        }else{

            return {
                success: true,
                user_id: response_data.user_id,
                user_name: response_data.user_name
            }
        }

      }catch(error){
            console.log(error)
            return {
                success: false
            };
      }

};
export default authenticate;