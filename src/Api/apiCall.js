import {regStart, regSuccess, regError, logout} from '../features/userSlice'
import {fetching, success, failed} from '../features/pinSlice'
import axios from 'axios'

const HOSTED_URL = 'https://pinterest-api.cyclic.app'
// eslint-disable-next-line no-unused-vars
const LOCAL_HOST = "http://localhost:4000"


export const userReg = async (user, dispatch)=>{
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        dispatch(regStart())

        const {data} = await axios.post(`${HOSTED_URL}/api/user/auth`, user, config)
        dispatch(regSuccess(data))
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        const message = error.message && error.response.data.message ? error.response.data.message : error.message; 
        dispatch(regError(message))
    }
}


export const userLogin = async (user, dispatch)=>{
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        dispatch(regStart())

        const {data} = await axios.post(`${HOSTED_URL}/api/user/login`, user, config)
        dispatch(regSuccess(data))
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        const message = error?.message && error?.response.data.message ? error?.response.data.message : error?.message; 
        dispatch(regError(message))
    }
}



export const googleAuth = async (user, dispatch)=>{
    try {
        const config = {
            headers: {
                "Content-Type": 'application/json',
                withCredentials: true
            }
        }

        dispatch(regStart())

        const {data} = await axios.post(`${HOSTED_URL}/api/user/google-login`, user, config)
        dispatch(regSuccess(data))
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        const message = error?.message && error?.response.data.message ? error?.response.data.message : error?.message; 
        dispatch(regError(message))
    }
}


export const userLogout = (dispatch)=>{
    localStorage.removeItem('userInfo')
    dispatch(logout())
}


//Update User Profile Api Request
export const updateUser = async (user, dispatch)=>{
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    try{
        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        dispatch(regStart())

        const {data} = await axios.put(`${HOSTED_URL}/api/user/update/${userInfo._id}`, user, config)
        regSuccess(data)
        localStorage.setItem('userInfo', JSON.stringify(data))
        console.log(data)
    }catch(error){
        const message = error?.message && error?.response.data.message ? error?.response.data.message : error?.message; 
        dispatch(regError(message))
    }
}




//Pin API Calls
export const createPin = async (pin, dispatch)=>{
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    try {
        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        dispatch(fetching())

        const {data} = await axios.post(`${HOSTED_URL}/api/pin/createpin`, pin, config)
        dispatch(success(data))        
    } catch (error) {
        const message = error.message && error.response.data.message ? error.response.data.message : error.message; 
        dispatch(failed(message))
    }
}