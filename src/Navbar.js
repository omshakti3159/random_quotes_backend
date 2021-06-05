import React, { useState } from 'react'
import {GoogleLogin} from 'react-google-login'

const navStyle={
    width:'100vw',
    height:'10vh',
    color:'white',
    display:'flex',
    alignItems:'center',
    background:'black',
    justifyContent:'space-around'
}
const Navbar = () => {
    const [id,setid]=useState('')
    const [name,setname]=useState('')
    const [email,setemail]=useState('')
    const [img,setimg]=useState('')
    const responseGoogle= (response)=>{
        setid(response.profileObj.googleId)
        setname(response.profileObj.name)
        setemail(response.profileObj.email)
        setimg(response.profileObj.imageUrl)
    }
    const responseGoogleFailure=()=>{
        console.log("google error")
    }
    return (
        <div style={navStyle}>
            <span>Random Quotes</span>
            {id?<p style={{display:'flex',alignItems:'center'}}><img src={img} alt={img} height="40px" style={{borderRadius:'50%',marginRight:'20px'}}/>{name}</p>:<GoogleLogin
                        clientId='751059775317-ol15p09fmg8llr5sp30m1nhqi2qor9qa.apps.googleusercontent.com'
                        icon='true'
                        buttonText='Login'
                        onSuccess={responseGoogle}
                        onFailure={responseGoogleFailure}
                    />}
        </div>
    )
}

export default Navbar
