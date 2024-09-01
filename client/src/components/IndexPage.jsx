import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../UserContext';

const IndexPage = () => {
  // alert("At index page right now");
  const {user,ready} = useContext(UserContext);
  const [places,setPlaces] = useState([]);
  useEffect(()=>{
    if(!user){
      axios.get('/places').then(response=> {
        setPlaces([...response.data, ...response.data , ...response.data, , ...response.data]); //with this response we have some data inside
      });
    }},[]);

  if(!user)
  {
    return (
      <h1>User not logged in</h1>
    );
  }
  
  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <h1>User profile page</h1>
      {places.length >0 && places.map(place => (
        <Link to={'/place/' + place._id}>
          <div className="bg-gray-500 mb-2 rounded-2xl flex">
            {place.photos?.[0] && ( 
              <img className="rounded-2xl object-cover aspect-square" src={'https://localhost:4000/uploads/' + place.photos?.[0]} alt=""/>
            )} 
          </div>
          <h2 className="font-bold">{place.title}</h2>
          <h3 className='text-sm truncate leading-4'>{place.address}</h3>
          <div className="mt-1">
            <span className="font-bold">${place.price}</span> per night
          </div>
        </Link>
      ))}
    </div>
  )
}

export default IndexPage