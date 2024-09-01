import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({children})
{
    const [user,setUser]=useState(null);
    const [ready,setReady] = useState(false);

    useEffect(()=>{
        //writing a function that checks if the user is not empty, we can actually try fetch information about the user
        if(!user){
            axios.get('/profile').then(({data})=>{
                setUser(data);
                setReady(true);
            });  //to get user profile information, now we again add this end point in index.js api
        } //useEffect does not like to use async await 
    },[]);
    return(
        <UserContext.Provider value={{user,setUser,ready}}>  {/* passing these values whe   rever useContext(UserContext) is called */}
            {children}
        </UserContext.Provider >
    );  
}   

//Code explanation in NOTION file