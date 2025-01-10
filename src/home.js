import {React, useEffect, useState} from 'react'
import Tilt from 'react-parallax-tilt'
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from 'axios';

const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function Home() {

    const [prompt, setPrompt] = useState()
    const [response, setResponse] = useState()
    const [loading, setLoading] = useState(true)
    
    const sendMessage = async (e) => {
      try{
        e.preventDefault();
        const msg = prompt 
        setLoading(false)
        const res = await axios.post(`${REACT_APP_API_BASE_URL}/sendmsg`, { prompt: msg })
        console.log(res.data.response)
        setResponse(res.data.response)
        setPrompt("")
      }catch(err){
        console.error("msg error: ", err)
      }finally{
        setLoading(true)
    }


  }



    useEffect(()=>{
    }, [])

  return (
    <div class="mainContainer">
        <div class="heading">
          <Tilt options={{ tiltReverse: false }}>
            <h1 class="dm-ita">Gemini API Bot</h1>
          </Tilt>
        </div> 

      {loading ? (

          <div>
            {response}
          </div>

        ) : (
            <div class="loading">
              <img src="icon2.png" alt="Loading..." />
            </div>
        )
      }
      <div class="submitForm">

          <form onSubmit={sendMessage} class="submitFormInner">
            <input type="text" value={prompt} onChange={({ target }) => setPrompt(target.value)} />

              <button type="submit" class="sendMsg">Send</button>

          </form>

      </div>
    </div>
  )
}
