import dotenv from 'dotenv'
import { app } from './app.js'
import ConnectDB from './DB/index.js'
const PORT = process.env.PORT || 3000
dotenv.config({
    path : './env'
})

ConnectDB()
.then(() => {
    app.on("error",(error) => {
        console.log("error", error);
        throw error
        
    })
    app.listen(PORT, () => {
        console.log("Server is Runing on ",PORT)
    })
})
.catch((error) => {
    console.log("Mongo DB Connect",error.message);
})

