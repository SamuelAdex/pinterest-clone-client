import React, {useEffect, useState} from 'react'
// eslint-disable-next-line no-unused-vars
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import Pin from '../../Components/Pin/Pin'
import './Home.css'


const Home = ({setDropdown}) => {
    const [pins, setPins] = useState([])

    const navigate = useNavigate()

    //const {userInfo} = useSelector((state)=> state.user)


    const fetchPin = async ()=>{
        /* const config = {
            Authorization: `Bearer ${userInfo.token}`
        } */
        const {data} = await axios.get(`${process.env.REACT_APP_HOSTED_URL}/api/pin/pins`)
        setPins(data)
        console.log(data)

    }

    
    //Fetching all Pin Data
    useEffect(()=>{        
        fetchPin()
        setDropdown(false)
    },[setDropdown, navigate])


    return (
        <section className="container">
            <div className="pin-wrapper">
                {pins.map((pin, index)=> (
                    <Pin pin={pin} index={index} pins={pins} key={pin._id} />
                ))}                
            </div>            
        </section>
    )
}

export default Home
