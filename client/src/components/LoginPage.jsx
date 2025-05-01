import React from 'react'
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../UserContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {setUserInfo} = useContext(UserContext);
  async function login(ev) {
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username, password}),
      credentials: 'include'

    });



    if(response.ok) {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      alert('Login failed!');
    }
  }

  if(redirect) {
    return <Navigate to={'/'} />
  }

 

  return (
    <form className='login' onSubmit={login}>
        <input 
          type='text' 
          placeholder='username' 
          value={username} onChange={ev => setUsername(ev.target.value)}/>
        <input 
          type='password' 
          placeholder='password' 
          value={password} onChange={ev => setPassword(ev.target.value)}/>
        <button>Login</button>
    </form>
  )
}

export default LoginPage
