import React from 'react'
import {motion} from 'framer-motion/dist/framer-motion'
import './Pin.css'
import pinImg from '../../user.jpeg'
import upRight from '../../up_right.png'



const Pin = ({pin, pins, index}) => {


    const savePinHandler = (e)=>{
        e.preventDefault()
        alert(`${pin.title} Saved Successfully!!!`)
    }
    return (
        
            <motion.div
            key={index}
            className="pin-container"
            initial={{opacity: 0}}
            animate={{opacity: [0, 1]}} 
            transition={{duration: 0.3, delay: index * 0.3}}
            >
                <div  className={`img-container ${pin.size === 'large' && 'lg-img'} ${pin.size === 'medium' && 'md-img'} ${pin.size === 'small' && 'sm-img'}`} style={{background: `url(${pinImg})`, backgroundSize: "cover"}}>
                    <div className="overlay">
                        <div className="pin-footer">
                            <div className="pin-save">
                                <button onClick={savePinHandler}>Save</button>
                            </div>
                            <div className="pin-link">
                                <img src={upRight} alt="" />
                                <small>Link to</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pin-content">
                    <p>{pin.desc}</p>
                    <div className="user-pic">
                        <img src={pin.filename ? pin.filename : pinImg} alt="" />
                        <span>{pin.user.username}</span>
                    </div>
                </div>
            </motion.div>
        
    )
}

export default Pin
