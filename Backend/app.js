const express=require('express');
const app=express();
require('dotenv').config();
const connectDB=require('./config/db');
connectDB();
const authRoutes=require('./routes/auth');
const cors=require("cors");

app.use(cors());
app.use(express.json());

app.use('/api/auth',authRoutes)

const poemRoutes = require("./routes/poemRoutes");
app.use("/api/poem", poemRoutes);

app.get('/test', (req, res) => {
    res.send('Server is working');
});


const PORT=4000;
app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})