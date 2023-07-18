import React, {createContext, useEffect, useState} from 'react';
import axios from 'axios';
import { base_url } from '../../App';

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {
    const [isAuth, setIsAuth] = useState(false)
    const [person, setPerson] = useState([])
    
    const loginUser = async (event)=>{
        event.preventDefault()
        let auth_user = {
            username: event.target.username.value,
            password: event.target.password.value
        }
        await axios.post(base_url+'token/', 
        auth_user, {headers: {'Content-Type': 'application/json'}}, {withCredentials: true})
        .then(response =>{
            localStorage.clear();
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            axios.defaults.headers.common['Authorization'] =`Bearer ${response.data['access']}`;
            window.location.href = '/';
            setIsAuth(true)
        })
        .catch(error => {console.log(error)})
    };
        
    let logoutUser = async () => {
        if (localStorage.getItem('access_token') !== null){
            await axios.post(base_url+'logout/',
            {refresh_token:localStorage.getItem('refresh_token')},
            {headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`}})
            .then(response => {
                console.log(`You logged out. ${response.status}`)
                localStorage.clear();
                axios.defaults.headers.common['Authorization'] = null;
                setIsAuth(false)
            })
            .catch(error => {console.log(error)});
        }
    };

    const decodeJWT =(token)=> {
        const parts = token.split('.');
        if (parts.length !== 3) {
          throw new Error('Invalid token format');
        }
        const payload = JSON.parse(atob(parts[1]));
        return { payload };
    };

    if (localStorage.getItem('access_token') !== null){
        
    };

    let contextData = {
        isAuth: isAuth,
        person: person,
        loginUser:loginUser,
        logoutUser:logoutUser,
    }
    useEffect(()=>{
        if (localStorage.getItem('access_token') !== null){
            setIsAuth(true)
            const userId = decodeJWT(localStorage.getItem('access_token')).payload.user_id;
            (async()=> {
                await axios.get(base_url + `account-detail/${userId}/`,
                {headers: {
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`}})
                .then(response => {
                    setPerson(response.data)
                })
                .catch(error => {console.log(error)});
            })()
        }
    },[])

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}
