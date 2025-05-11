import dotenv from "dotenv"
import express from "express"
dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000


app.get('/', (req,res) => {
    res.send("Home ROutes")
})

app.get('/api/employes', (req,res) => {
    const Employes = [
        {
            id : 1,
            Name : "Shehriyar",
            Depart : "Admin"
        },
        {
            id : 2,
            Name : "Waqas",
            Depart : "Admin"
        },
        {
            id : 3,
            Name : "Ibrahim",
            Depart : "Maintanance"
        },
        {
            id : 4,
            Name : "Shahmeer",
            Depart : "Maintannace"
        },
        {
            id : 5,
            Name : "wajahat",
            Depart : "maintainance"
        }
        
    ]
    res.send(Employes)
})


app.listen(PORT, () => {
    console.log("Server is Run",{PORT});
    
})