import express from 'express'
import dotenv from 'dotenv'
import ConnectDB from './DB/index.js'

dotenv.config({
    path : './env'
})
const app = express()


app.get('/', (req,res) => {
    res.send("Home Route")
})

ConnectDB()

app.listen(process.env.PORT, () => {
    console.log(`Server is running in ${process.env.PORT}`);
    
})