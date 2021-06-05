import React from 'react'
import Navbar from './Navbar'
import ShowQuotes from './ShowQuotes'
import Img from './bgImg.jpg'
const Home = () => {
    return (
        <div style={{backgroundImage:`url(${Img})`,backgroundSize:'cover',height:'100vh',width:'100vw'}}>
            <Navbar/>
            <ShowQuotes/>
        </div>
    )
}

export default Home
