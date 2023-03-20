import React from 'react'
import './Showcase.css'

const Showcase = () => {
    console.log(process.env.REACT_APP_HOSTED_URL)
    return (
        <section className="showcase-container">
            <div className="showcase-text">
                <h1>Get Your Next</h1>
                <h2>weeknight dinner idea</h2>
            </div>
            {/* <Login /> */}
        </section>
    )
}

export default Showcase
