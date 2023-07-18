import axios from "axios";
import { base_url } from "../App";


let refresh = false;

const decodeJWT =(token)=> {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token format');
    }
    const payload = JSON.parse(atob(parts[1]));
    return { payload };
}

axios.interceptors.response.use(resp => resp, async error => {
    if (error.response.status === 401 && !refresh) {
        refresh = true;
        const access_token =decodeJWT(localStorage.getItem('access_token')).payload
        const expired_time =new Date(access_token.exp * 1000);
        const currentTime = new Date();
        if (expired_time < currentTime) {
            console.log("Your Access Token is expired.")
            console.log("Refresh Token is ", localStorage.getItem('refresh_token'))
            const response = await axios.post(base_url + 'token/refresh/', 
            {refresh: localStorage.getItem('refresh_token')}, 
            {headers: {'Content-Type': 'application/json'}},
            {withCredentials: true});
            console.log(response)
            if (response.status === 200) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data['access']}`;
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                console.log("Your token is refreshed.")
                return axios(error.config);
            }
        } else {
            console.log("Your Token is alive. Something wrong with your request.")
        }
        
    }
    refresh = false;
    return error;
});