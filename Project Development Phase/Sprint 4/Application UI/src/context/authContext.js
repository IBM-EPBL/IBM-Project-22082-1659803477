import { createContext, useEffect, useState } from "react";

const AuthContext=createContext({});
export {AuthContext}
const AuthContextProvider=({children})=>{

   
    const [islogedin,setIsLoggedIn]=useState(false)
    const [userdata,setUserData]=useState({})


    function authenticate(data){
     setUserData({
        name:data.name,
        city:data.city,
        state:data.state,
        role:data.role,
        email:data.email,
        bloodgroup:data.bloodgroup
       
     })
      setIsLoggedIn(true) ;
    }
  
    function logout(){
        setUserData({})
        setIsLoggedIn(false)
        

    }
    const value={
    userdata,
    islogedin,
    authenticate,
    logout   
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export default AuthContextProvider
