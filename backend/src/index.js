import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import SearchRouter from '../route/search.route.js'
import Connect from '../lib/db.config.js'
Connect()

const app=express()


app.use('/search',SearchRouter)

app.get('/',
    (req,res)=>{
        res.send('i am running')
    }
)
const Port=process.env.PORT
app.listen(Port,()=>{
    console.log(`server:http:\\localhost:${Port}`)
})