//env vars fix incase it goes tits up again
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

//libs
const mongodb = require("mongodb")
const { mongoose, Schema, connection } = require("mongoose")
//const AutoIncrement = require('mongoose-sequence')(mongoose);
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { GoogleGenerativeAI } = require("@google/generative-ai")
//const { Route } = require('react-router');

//env vars
const GAK = process.env.GAK;
//const baseUrl = process.env.API_BASE_URL; //should probs delete
const connectionString = process.env.CONSTRING; //mongodb constr
const secret1 = process.env.SUPERSECRETWORD; //jwt secret

const app = express()

const corsOptions = {
    origin: ['http://localhost:3000', 'http://192.168.137.1:3000', 'http://192.168.0.27:3000', 'http://192.168.1.198:3000', 'https://gemini-api-react-2g37.vercel.app'],
    methods: ['GET', 'POST'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['set-cookie'],  
  };

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(GAK);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


app.post("/sendmsg", async (req, res)=>{
    try{
        console.log("sendmsg accessed")
        const prompt = req.body.prompt
        console.log(prompt)
        const result = await model.generateContent(prompt);
        console.log(result.response.text())
        res.json({ response: result.response.text() });

    }catch{
        res.status(400).json( {message:"there was an error with the prompt :(" })
    }
})

app.get("/", (req, res)=>{
    res.json("server says hi u little cunt")
})

app.listen(3001, ()=>{
    console.log("listening!");
})