import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit =  async (e) => {
    e.preventDefault();
    console.log(username + " "+ password + " " + userEmail);

    try{
        const response = await registration(username, password, userEmail)

        console.log(response)

        if (response == true){
            setSuccess(true);
        }

    }catch(error){

    }
};

const handleBackButton = ()=>{
    navigate('/');

}

  return (

    <div>

    {success ? (
        <div>
            <h2> Successfully Registered.</h2>
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
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
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


const registration = async(username, password, userEmail, event)=>{
    try{
 
        const url = `http://localhost:8000/register?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&email=${encodeURIComponent(userEmail)}`;

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
      }
};

export default RegisterPage;