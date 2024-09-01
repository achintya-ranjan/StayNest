import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {  
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]= useState('');
    function changeFunc(event)
    {
      setName(event.target.value);
    }
    async function registerUser(event)
    {
      event.preventDefault();
      /*We now want to send a request to our API */
      /*We could have used fetch, but it would be easier with axios*/ 
      try{
        await axios.post('/register',
          {
            name , email , password , 
          }
        ); //It is going to be a post request and we want to send some data with it
        alert('Registration successful. You can log in.');
      }
      catch(error)
      {
        alert('Registration failed. Please try again');
      }
    }
    
      {/*Create an end point for our api, we need to send a request to our api */}
  return (                                              
                                                                     
  <div className="mt-4 grow flex items-center justify-around">            {/*margin top: 4*/}
    <div className="mb-64">
          <h1 className="text-4xl text-center mb-4">Register</h1>
          <form className="max-w-md mx-auto" onSubmit={registerUser}>                    {/*We need a form here. And mx means margin xaxis and onSubmit would work when button clicked */}
            <input 
                type="name" 
                placeholder="Your Name Please!" 
                value={name} onChange={changeFunc}/>    {/*Handling the change*/}
            <input 
                type="email" 
                placeholder="your@email.com" 
                value={email} 
                onChange={ev=>{setEmail(ev.target.value)}}/> {/*type:what is expected to enter and placeholder:what to show */}
            <input 
                type="password" 
                placeholder="password" 
                value={password} 
                onChange={ev=>{setPassword(ev.target.value)}}/>
                
            <button className="primary mt-2 ">Register</button>
            <div className="text-center py-2 text-gray-500">Already have an account? 
              <Link className="underline text-black" to={'/login'}>Login</Link>
            </div>
          </form>
    </div>
  </div>  
  )
}

export default Register
