require('dotenv').config()
const express = require('express') // express installed ko import kya hai 
const app = express()  // express ko app variable wrapped kya 
const port = process.env.PORT || 3000 // port ka variable bna dya 


// ek get method bnaya
app.get('/' , (req,res) => {
   res.send("Home Route")
})

app.get('/addincome', (req,res) => {
    res.send("Add Income")
})
app.get('/addexpense', (req,res) => {
    res.send("Add expense")
})
app.get('/editincome', (req,res) => {
    res.send("Edit income")
})

// app ko listen bh krna hOga 
app.listen(process.env.PORT, () => {
    console.log("Backend code Run in ",{port});
})

// kch bh changes ke bad server restart krna hOta hai  isi lye nodemon pkg ka use kya jata hai 

