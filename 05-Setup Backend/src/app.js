import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true,

}))     // cors frontend and backend ke beech data share krne ki permission deta hai  

app.use(express.json({ limit : "16kb" }))  // fronend se data string main ati hai isko json formate convert  ke  lye ye middleware use krte hain 

app.use(express.urlencoded({extended : true, limit : '16kb'})) // jab frontend se koi form fill hoga to wo encoded format main hOga usko JSON formate main convert ke lye ye middle ware use krte hain take ham data base main wo values save kr sakun 

app.use(express.static("public"))
app.use(cookieParser())

//import Roy=utes
import userRoute from "./Routes/user.route.js"

// declaretions
app.use('/api/v1/user', userRoute)// bs route ko middleware main use kr lya ab jo bh changing hOgi userRoute main hOgi

app.get('/', (req,res) => {
    res.send("Home Rotes")
})

export {app}