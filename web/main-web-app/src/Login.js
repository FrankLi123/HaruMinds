import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit =  async (e) => {
    e.preventDefault();
    // Add your login logic here using formData.username and formData.password
    console.log(username + " "+ password);

    try{
        console.log("here!")

        const response = await authenticate(username, password)

        console.log(response)        
        if ( response == true){
      
            setSuccess(true);
        }

    }catch(error){

    }
};

const handleBackButton = ()=>{
    setSuccess(false);
}

  return (

    <div>

    {success ? (
        <div>
            <h2> Successfully Signed in.</h2>
            <button onClick={handleBackButton}> Return</button>
        </div>
    ):(

    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
    )}
    </div>
  );



};


const authenticate = async(username, password,event)=>{
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
            return false;
        }else{
            return true;
        }

      }catch(error){

      }

};

export default LoginPage;