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

    const {pending} = useSelector((state)=> state.pin)


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
    },[setDropdown, navigate, pending])


    return (
        <section className="container">
            <div className="pin-wrapper">
                {pending ? (
                    <div className="" style={{textAlign: 'center', fontSize: '50px', color: '#e8e8e8'}}>
                        <h1>LOADING...</h1>
                    </div>
                ) : !pins ? (
                    <div className="" style={{textAlign: 'center', fontSize: '50px', color: '#e8e8e8'}}>
                        <h1>NOTHING TO SEE HERE</h1>
                    </div>
                ) : (
                    pins.map((pin, index)=> (
                        <Pin pin={pin} index={index} pins={pins} key={pin._id} />
                    ))
                )}                
            </div>            
        </section>
    )
}

export default Home
