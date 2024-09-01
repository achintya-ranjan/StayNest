import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PlacesPage from './PlacesPage';
import AccountNav from './AccountNav';

const Profile = () => {
  const [toHomePage,setToHomePage] = useState(null);
  const {ready ,user,setUser} = useContext(UserContext);
// So user is sent here with the value NULL and so it navigates to login page.

  let {subpage} = useParams();
  console.log("subpage is "+subpage);
  // if(subpage === undefined) 
  // {
  //   subpage = 'profile';
  // }

  async function logout()
  {
    await axios.post('/logout'); // WE ARE LOGGING OUT
    setToHomePage('/');      // Now we will go to our main page
    setUser(null);           // whatever data we fetched, we let loose of it. We change its state/value to null
    //not just redirect, we actually need to logout, so setUser changed to null
  }
  if(!ready)      
  {          // if the user is not fetched yet, it will say this
    // when fetching the user takes a lot of time, it may cause issues if this if statement is not passed
    // because in UserContext, useEffect is called, but that takes a few milliseconds to work. 
    return 'Loading...';  
  }
  if(ready && !user && !toHomePage) // checking if we do not have any other redirections
  {
    //checking if the user is NULL and ready is not true and toHomePage is also null
    // then we send the page to login
    return <Navigate to={'/login'}/>
  }

  if(toHomePage)      
  {
//  when the logout button is pressed then toHomePage is changed to '/'. And this if statement is run and so
//  it gets navigated to toHomePage. 
    return <Navigate to={toHomePage}/>;
  }

  return (
    <div>
      <AccountNav/>
      {/* {subpage=== 'profile' && ( */}
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})   <br/>
          <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>    
        </div>
      {/* )}

      {subpage === 'places' && (                 // popular jsx file technique
          <PlacesPage/>
      )} */}

    </div>
  )
}

export default Profile
