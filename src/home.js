import {React, useEffect, useState} from 'react'
import Tilt from 'react-parallax-tilt'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
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
        <Tilt tiltReverse={true}>
          <h1 class="dm-ita rounded">Gemini API Test</h1>
        </Tilt>
      </div>

      <div class="chatContainer rounded">
        {loading ? (

          <div id="responseBoxId" class="responseBox fade-in-response rounded raleway">
            <ReactMarkdown children={response} remarkPlugins={[remarkGfm]}/>
          </div>

          ) : (

          <div class="loading">
            <img src="icon2.png" alt="Loading..." />
          </div>

          )
          }

          <div class="submitForm fade-in">
            <form onSubmit={sendMessage} class="submitFormInner">
              <input class="rounded raleway" type="text" value={prompt} onChange={({ target }) => setPrompt(target.value)} placeholder="type a message"/>
              <button type="submit" class="sendMsg rounded raleway">send</button>
            </form>
          </div>
      </div>
    </div>
  )
}
