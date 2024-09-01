import React from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './UserContext'
import { useContext } from 'react';


const Header = () => {

  const {user} = useContext(UserContext);

  return (
        
<div>
      <header className="flex justify-between"> {/* padding - 4px */}
         <Link to={'/'} className="flex items-center"> {/* in classname, i am inlisting styles */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
          </svg>
          <span className="font-bold text-xl">MakeMyVacay</span>
         </Link>      {/*this was the logo and there is a link to home page*/}

          
          {/* Now creating the search widget */}
          <div className="flex gap-2  border border-gravy-300 rounded-full py-2 px-4 shadow-md shadow-gray-300">    {/*Again styling this div py=padding y px=padding x */}
            <div className="text-xl">Place</div>
            <div className="border-l border-gray-300"></div>          {/*Adding a seperator line */}
            <div className="text-xl">Date</div>
            <div className="border-l border-gray-300"></div>          {/*Adding a seperator line */}
            <div className="text-xl">How many friends are with you? </div>
            <button className="bg-primary text-white px-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            </button>
          </div>

          {/*Now to the extreme right widget */}
         {/*If user is not null, then go to account if not then login */}
          <Link to={user?'/account':'/login'} className="flex items-center gap-2 border border-gravy-300 rounded-full py-2 px-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>  {/*This was the hamburger */}
              <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden p-1">   {/*This is the users button */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>


              
              {!!user &&(              
                <div>
                  {user.name}
                </div>
              )}


          </Link>
      </header>
    </div>
    )
}

export default Header
