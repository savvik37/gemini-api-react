import {React, useEffect, useState} from 'react'
import Tilt from 'react-parallax-tilt'
import ReactMarkdown from 'react-markdown'
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from 'axios';

console.log(process.env)

const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function Home() {

    const [prompt, setPrompt] = useState()
    const [response, setResponse] = useState()
    const [loading, setLoading] = useState(true)
    
    const sendMessage = async (e) => {
      try{
        e.preventDefault();
        document.getElementById("responseBoxId").classList.add('hidden');
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
      document.getElementById("responseBoxId").classList.add('hidden');
    }, [])

  return (
    <div class="mainContainer">
        <div class="heading">
          <Tilt tiltReverse={true} tiltMaxAngleX={0} >
            <h1 class="dm-ita">Gemini API Bot</h1>
          </Tilt>
        </div> 

      {loading ? (

            <div id="responseBoxId" class="responseBox fade-in-response">
              <ReactMarkdown children={response} />
            </div>

        ) : (

            <div class="loading">
              <img src="icon2.png" alt="Loading..." />
            </div>

        )
      }
      <div class="submitForm fade-in">

          <form onSubmit={sendMessage} class="submitFormInner">
              <input type="text" value={prompt} onChange={({ target }) => setPrompt(target.value)} placeholder="type a message"/>
              <button type="submit" class="sendMsg">Send</button>
          </form>

      </div>
    </div>
  )
}
