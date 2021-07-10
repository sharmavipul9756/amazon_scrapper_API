const express = require('express')
const app = express()
const request = require('request-promise')
require('dotenv').config()
app.use(express.json());
const PORT = process.env.PORT || 5000
const apiKey = process.env.API_KEY
const baseURL = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`
console.log(baseURL);

app.get('/',(req,res)=>{
    res.send("hello")
})

//get product details
app.get('/products/:productId',async (req,res)=>{
    const  {productId}  =req.params
    try {
        const response = await request(`${baseURL}&url=https://www.amazon.in/dp/${productId}`)
        res.json(JSON.parse(response))
    }
    catch(error) {
        res.json(error)
    }
})
//get product review
app.get('/products/:productId/reviews',async (req,res)=>{
    const  {productId}  =req.params
    try {
        const response = await request(`${baseURL}&url=https://www.amazon.in/product-reviews/${productId}`)
        res.json(JSON.parse(response))
    }
    catch(error) {
        res.json(error)
    }
})
//get product offers
app.get('/products/:productId/offers',async (req,res)=>{
    const  {productId}  =req.params
    try {
        const response = await request(`${baseURL}&url=https://www.amazon.in/gp/offer-listing/${productId}`)
        res.json(JSON.parse(response))
    }
    catch(error) {
        res.json(error)
    }
})

//get serach results
app.get('/search/:searchQuery',async (req,res)=>{
    const  {searchQuery}  =req.params
    try {
        const response = await request(`${baseURL}&url=https://www.amazon.in/s?k=${searchQuery}`)
        res.json(JSON.parse(response))
    }
    catch(error) {
        res.json(error)
    }
})
app.listen(PORT,()=>{console.log("Server running on", PORT);})