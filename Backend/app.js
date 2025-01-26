const express=require('express');
const app=express();
require('dotenv').config();
const connectDB=require('./config/db');
connectDB();
app.use(express.json());
const PORT=4000;
app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})