import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import Pin from '../../Components/Pin/Pin'
import './Home.css'


const Home = ({setDropdown}) => {
    const [pins, setPins] = useState([])

    const navigate = useNavigate()

    const {userInfo} = useSelector((state)=> state.user)


    //Fetching all Pin Data
    useEffect(()=>{        
        fetchPin()
        setDropdown(false)
    },[setDropdown, navigate])

    const fetchPin = async ()=>{
        /* const config = {
            Authorization: `Bearer ${userInfo.token}`
        } */
        const {data} = await axios.get('http://localhost:4000/api/pin/pins')
        setPins(data)
        console.log(data)

    }



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
