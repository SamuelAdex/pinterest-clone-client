import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import {updateUser} from '../../Api/apiCall'
import './EditProfile.css'

const EditProfile = () => {
    const {userInfo, error} = useSelector((state)=> state.user)
    const [userInfoData, setUserInfoData] = useState(null),
          [firstname, setFirstname] = useState(''),
          [lastname, setLastname] = useState(''),
          [username, setUsername] = useState(''),
          [avatar, setAvatar] = useState(''),
          [password, setPassword] = useState(""),          
          [showImg, setShowImg] = useState(false),
          [imageMessage, setImageMessage] = useState(),
          [img, setImg] = useState(""),
          navigate = useNavigate(),
          
          dispatch = useDispatch();
    
    let userNameIndex = userInfo.username.split('')


    useEffect(()=>{
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
                setFirstname(data.firstname)
                setLastname(data.lastname)
                setUsername(data.username)
                setAvatar(data.avatar)
                console.log(data);
            } catch (error) {
                console.log(error.message && error.response.data.message ? error.response.data.message : error.message)
            }

        }

        fetchUserData()
        
    }, [userInfo])

    


    const updateHandler = (e)=>{
        e.preventDefault()

        const userDetails = {
            firstname,
            lastname,
            username,
            password,
            avatar
        }
        updateUser(userDetails, dispatch)
        if(!error)            
            navigate("/home")
        return;
        
    }

    const storeImage = (pinUrl)=>{
        if(!pinUrl){
            return setImageMessage('Please Select an Image')
        }
        setImageMessage(null)

        if(pinUrl.type === 'image/jpeg' || pinUrl.type === 'image/png' || pinUrl.type === 'image/gif' || pinUrl.type === 'image/svg'){
            const data = new FormData();
            data.append('file', pinUrl)
            data.append('upload_preset', 'pinterest')
            data.append('cloud_name', 'samueladexcloudinary')

            fetch('https://api.cloudinary.com/v1_1/samueladexcloudinary/image/upload', {
                method: "post",
                body: data
            }).then((res)=> res.json())
            .then((data)=>{
                console.log(data)
                setAvatar(data.url.toString())
                setImageMessage(null)
            }).catch((err)=>{
                console.log(err)
            })
        }
    }


    //Handle image upload
    const fileUpload = (e, setImg) =>{
        if(e.target.files && e.target.files[0]){
            if(/image\/*/.test(e.target.files[0].type)){
                const reader = new FileReader();

                reader.onload = function(){
                    setImg(reader.result)
                    console.log(reader.result)
                    setShowImg(true)
                }

                reader.readAsDataURL(e.target.files[0])
            }
        }
    }
          

    


    return (
        <div className="user-container">
            <div className="user-profile">
                <div className="user-header">
                    <h1>Public profile</h1>
                    <small>People visiting your profile will see the following info</small><br />                    
                    {error && <small style={{color: 'red'}}>{error}</small>}
                </div>                
                <div className="user-pic-change">
                    {!showImg && (
                        <>
                            { !avatar && (<label htmlFor="user-pic" className="user-pic" >
                                <>
                                    <div>{userNameIndex[0].toUpperCase()}</div>
                                    <input type="file" onChange={(e)=> {
                                    fileUpload(e, setImg)
                                    storeImage(e.target.files[0])
                                    }} id="user-pic" style={{display: 'none'}} />
                                </>
                            
                            </label>)
                            }
                        </>
                    )}                    

                    {showImg && <div className="user-avatar" style={{background: `url(${img})`, backgroundSize: "cover", backgroundColor: 'none'}}>                        
                        <input type="file" onChange={(e)=> {
                            fileUpload(e, setImg)
                            storeImage(e.target.files[0])
                        }} id="user-pic" style={{display: 'none'}} />
                    </div>}

                    {avatar && <div className="user-avatar" style={{background: `url(${avatar})`, backgroundSize: "cover", }}>                        
                        <input type="file" onChange={(e)=> {
                            fileUpload(e, setImg)
                            storeImage(e.target.files[0])
                        }} id="user-pic" style={{display: 'none'}} />
                    </div>}

                    <label htmlFor="user-pic">Change</label>
                </div>
                <form onSubmit={updateHandler}>
                    <div className="first-last">
                        <div className="first">
                            <label htmlFor="">First name</label><br />
                            <input type="text" value={firstname} onChange={(e)=> setFirstname(e.target.value)}  />
                        </div>
                        <div className="last">
                            <label htmlFor="">Last name</label><br />
                            <input type="text" value={lastname} onChange={(e)=> setLastname(e.target.value)}  />
                        </div>
                    </div>
                    <div className="username">
                        <label htmlFor="">username</label><br />
                        <input type="text" value={username} onChange={(e)=> setUsername(e.target.value)}  />
                    </div>
                    <div className="password">
                        <label htmlFor="">Change Password</label><br />
                        <input type="text" value={password} onChange={(e)=> setPassword(e.target.value)}  />
                    </div>
                    <button>Save</button>
                </form>
            </div>
        </div>
    )
}

export default EditProfile
