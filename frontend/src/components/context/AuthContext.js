import React, {createContext, useEffect, useState} from 'react';
import axios from 'axios';
import { base_url } from '../../App';

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {
    const [isAuth, setIsAuth] = useState(false)

    const loginUser = async (event)=>{
        event.preventDefault()
        let auth_user = {
            username:event.target.username.value,
            password:event.target.password.value
        }
        const { data } = await axios.post(base_url+'token/', 
        auth_user, 
        {headers: {'Content-Type': 'application/json'}}, {withCredentials: true});
        console.log(data)
        localStorage.clear();
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        axios.defaults.headers.common['Authorization'] =`Bearer ${data['access']}`;
        window.location.href = '/';
        setIsAuth(true)
    };
        
    let logoutUser = async () => {
        try {
            await axios.post(base_url+'logout/',
            {refresh_token:localStorage.getItem('refresh_token')} ,
            {headers: {'Content-Type': 'application/json'}},  
            {withCredentials: true});
            setIsAuth(false)
            localStorage.clear();
            axios.defaults.headers.common['Authorization'] = null;
            window.location.href = '/';
        } catch (e) {
            console.log('logout not working', e)
        }
    };

    useEffect(()=>{
            (async()=>{
                if (localStorage.getItem('access_token') === null){
                    console.log("No auth")
                } else{
                    setIsAuth(true)
                }
            })()
    },[localStorage.getItem('access_token')])
    

    let contextData = {
        isAuth: isAuth,
        loginUser:loginUser,
        logoutUser:logoutUser,
    }

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}
