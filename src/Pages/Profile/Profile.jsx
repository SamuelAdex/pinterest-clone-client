import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'
import pinImg from '../../user.jpeg'
import './Profile.css'


const Profile = ({setDropdown}) => {
    const [isCreated, setIsCreated] = useState(true)
    const [isSaved, setIsSaved] = useState(false)
    const [userPins, setUserPins] = useState()
    /* const [userInfoData, setUserInfoData] = useState(null) */
    const {userInfo} = useSelector((state)=> state.user)

    
    //UseEffect Hook
    useEffect(()=>{
        const fetchUserPin = async ()=>{
            const config = {
                headers:{
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            try {
                const{data} = await axios(`http://localhost:4000/api/pin/mypins`, config)
                setUserPins(data)
                //console.log(data);
            } catch (error) {
                console.log(error?.response.data.message)
            }
        }

        fetchUserPin()
        setDropdown(false)


    }, [userInfo, setDropdown])


    /* useEffect(()=>{
        const fetchUserData = async ()=>{
            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            try {
                const {data} = await axios.get(`http://localhost:4000/api/user/auth/user/${userInfo._id}`, config)
                setUserInfoData(data);
            } catch (error) {
                console.log(error?.message && error?.response.data.message ? error?.response.data.message : error?.message)
            }

        }

        fetchUserData()
        
    }, [userInfo, userInfoData]) */


    //Filtering Username
    let userNameIndex = userInfo.username.split('')

    //filtering the user email
    // eslint-disable-next-line no-unused-vars
    const userEmail = userInfo.email.replace('@gmail.com', '')


    return (
        <section className="profile-container">
            <div className="profile">
                {!userInfo.avatar && <div className="user-profile">
                    <span>{userNameIndex[0].toUpperCase()}</span>                    
                </div>}

                {userInfo.avatar && <div className="user-avatar" style={{background: `url(${userInfo.avatar})`, backgroundSize: "cover", }}>                        
                        
                    </div>
                }
                <div className="user-info">
                    <h1>{userInfo.firstname} {userInfo.lastname}</h1>
                    <small>@{userInfo.username}</small>
                </div>
                <div className="user-tap">
                    <Link to="/editProfile" style={{textDecoration: 'none', color: '#000'}}>
                        <span>Edit Profile</span>
                    </Link>
                </div>
                <div className="user-tabs">
                    <div className="tab-header">
                        <div className="created">
                            <span onClick={()=> {setIsCreated(true); setIsSaved(false)}} className={`${isCreated ? "active-tab" : ""}`}>Created</span>
                        </div>
                        <div className="saved">
                            <span onClick={()=> {setIsCreated(false); setIsSaved(true)}} className={`${isSaved ? "active-tab" : ""}`}>Saved</span>
                        </div>
                    </div>
                </div>
                {isCreated && <div className="created-space">
                    {userPins &&
                        userPins.map((pin)=>(
                            <div className="pins" key={pin._id}>
                                <div  className={`img-container ${pin.size === 'large' && 'lg-img'} ${pin.size === 'medium' && 'md-img'} ${pin.size === 'small' && 'sm-img'}`} style={{background: `url(${pinImg})`, backgroundSize: "cover"}}>
                                {/* <div className="overlay">
                                    <div className="pin-footer">
                                        <div className="pin-link">
                                            <img src={upRight} alt="" />
                                            <small>Link to</small>
                                        </div>
                                    </div>
                                </div> */}
                                </div>
                            </div>
                        ))                    
                    }
                    {!userPins && <h1>No Created Pins yet</h1>}
                </div>}

                {isSaved && <div className="saved-space">
                    <h1>No Saved Pins yet</h1>
                </div>}
            </div>
        </section>
    )
}

export default Profile
