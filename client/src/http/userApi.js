import { useContext } from "react";
import { $authHost, $host } from ".";
import jwt_decode from 'jwt-decode'

export const registration = async (login, password) => {
    const {data} = await $host.post('api/user/registration', {login, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (login, password) => {
    const {data} = await $host.post('api/user/login', {login, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    try{
        const {data} = await $authHost.get('api/user/auth')
        localStorage.setItem('token', data.token)
        return jwt_decode(data.token)
    }catch(e){
      console.log(e.response.data.message)
    }
}