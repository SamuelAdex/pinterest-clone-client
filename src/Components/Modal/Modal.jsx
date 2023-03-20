import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import './Modal.css'
import moreImg from '../../more.png'
import upImg from '../../up.png'
import userImg from '../../user.jpeg'
import {createPin} from '../../Api/apiCall'


const Modal = () => {
    const [showImg, setShowImg] = useState(false)
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [size, setSize] = useState("")
    const [link, setLink] = useState("")
    const [imageMessage, setImageMessage] = useState('')
    const [img, setImg] = useState('')
    const [filename, setFilename] = useState(null)
    const [error, setError] = useState("");

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const {userInfo} = useSelector((state)=> state.user)


    
    //Handle Pin Submit for a particular user
    const handlePinSubmit = (e)=>{
        e.preventDefault()
        if (!title || !desc || !size || !size || !link || !filename) {
            setError("Leave no fields Empty");
        }     
        

        const data = {
            title,
            desc,
            size,
            link,
            filename
        }
        
        createPin(data, dispatch)
        navigate("/home")
        setError("")
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
                setFilename(data.url.toString())
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
        <section className="modal-container">
            <form className="modal-wrapper" onSubmit={handlePinSubmit}>
                <div className="modal-left">
                    <div className="top-left-icon">
                        <img src={moreImg} onClick={()=> {setImg(""); setShowImg(false)}} alt="" />
                        {imageMessage && <small style={{color: 'red', fontWeight: 'bold'}}>{imageMessage}</small>}
                    </div>
                    {showImg === false && <label htmlFor="upload">
                        <div className="upload-container">
                            <div className="dotted-container">
                                <div className="upload-icon">
                                    <img src={upImg} alt="" />
                                    <div>Click to upload</div>
                                </div>
                                
                                <div className="upload-text">Recommended: high-quality .jpg/png not less tan 20mb</div>
                            </div>
                        </div>
                        <input type="file" value="" onChange={(e)=>{
                            fileUpload(e, setImg)
                            storeImage(e.target.files[0])
                        } } id="upload" />
                    </label>}
                    {showImg === true && <div className="pin-wrapper">
                        <div className="img-container lg-img"style={{background: `url(${img})`, backgroundSize: "cover"}}>
                        
                        </div>
                    </div>}
                </div>
                <div className="modal-right">
                    <div className="section1">
                        <div className="select-bg">
                            <select name="" id="" value={size} onChange={(e)=> setSize(e.target.value)} require>
                                <option value="">Select Size</option>
                                <option value="large">large</option>
                                <option value="medium">medium</option>
                                <option value="small">small</option>
                            </select>
                            <button>Save</button>
                        </div>
                    </div>
                    {error && (<small style={{color: 'coral'}}><strong>{error}</strong></small>)}
                    <div className="section2">                            
                            <div className="pin-title">
                                <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)} placeholder="Add your title" />
                            </div>
                            <div className="user-profile-pic">
                                <img src={userImg} alt="" />
                                <small>{userInfo.username}</small>
                            </div>
                            <div className="pin-desc">
                                <input type="text" value={desc} onChange={(e)=> setDesc(e.target.value)} placeholder="Tell everyone what your pin is about" />
                            </div>
                            <div className="pin-link">
                                <input type="text" value={link} onChange={(e)=> setLink(e.target.value)} placeholder="Add a destination link" />
                            </div>
                    </div>
                </div>
            </form>
        </section>
    )
}

export default Modal
