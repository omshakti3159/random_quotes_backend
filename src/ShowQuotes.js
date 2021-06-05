import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './ShowQuotes.css'
import MyQuotes from './MyQuotes'
const ShowQuotes = () => {
    const [content,setcontent]=useState('')
    const [author,setauthor]=useState('')
    const apicall=()=>{
        axios.get('https://api.quotable.io/random')
        .then(function (response) {
          setcontent(response.data.content)
          setauthor(response.data.author)
        })
    }
    // const addQuote=(content,author)=>{
    //     quote={'content':content,'author':author}
    // }
    useEffect(() => {
       apicall()
    }, [])
    return (
            <div>
                <div className="quotes_container">
                    <p className='quote'>
                    {content}
                    </p>
                    <p className='author'>
                        ~"{author}"
                    </p>
                </div>
                <div className='btn_container'>
                    <button onClick={apicall}>new quote</button>
                    {/* <button onClick={addQuote(content,author)}>save quote</button> */}
                </div>
                <MyQuotes/>
            </div>
    )
}

export default ShowQuotes
