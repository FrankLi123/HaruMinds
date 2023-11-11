import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import authenticate from './api/login';

const LoginPage = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit =  async (e) => {
    e.preventDefault();
    // Add your login logic here using formData.username and formData.password
    console.log(username + " "+ password);

    try{
        console.log("here!")

        const response = await authenticate(username, password)

        console.log(response)  
      
        if ( response.success){
          const {user_id, user_name} = response;

            navigate(`/welcome`,{
              state : {
                user_id: user_id,
                user_name: user_name
              }
            });
        }

    }catch(error){
      console.error(error);
    }
};

const handleBackButton = ()=>{
}

  return (

    
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
  
  );



};


export default LoginPage;