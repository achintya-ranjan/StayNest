import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from '../UserContext';
const Login = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [redirect,setRedirect] = useState(false);
  const{setUser} = useContext(UserContext);

  async function handleLoginSubmit(event)
  {
    event.preventDefault(); 
    try{
      const response = await axios.post('/login' , {email,password}); // this is a new endpoint '/login' and we are sending info - email,password
      setUser(response.data); 
      alert("Login attempted");                      //and we are going to receive the request in index.js of API
      setRedirect(true);
    }
    catch(error)
    { 
      console.log(error);
      alert("Login could not be done");
      console.log("log failed");
    }
  }
  if(redirect)
  {
    return <Navigate to= {'/'}/>; // now i also have to check everywhere if I am logged in or not
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">                                               {/*margin top: 4*/}
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>          {/*We need a form here. And mx means margin xaxis */}
          <input 
            type="email" 
            placeholder="your@email.com" 
            value={email}  
            onChange={(event)=>setEmail(event.target.value)}/>               {/*type:wha  t is expected to enter and placeholder:what to show */}
          <input 
            type="password" 
            placeholder="password" 
            value={password} 
            onChange={(event)=>setPassword(event.target.value)}/>
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">Don't have any account yet? <Link className="underline text-black" to={'/register'}>Register</Link></div>
        </form>
      </div>
    </div>
  )
}

export default Login
