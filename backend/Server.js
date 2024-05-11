const express= require('express');
const connectDB = require('./Config/db');
const cors = require('cors');

//routes
const jobs = require('./Routes/api/jobs');


const app = express();

//connect database
connectDB();

//cors
app.use(cors({origin:true,credentials:true}));

//Init Middleware
app.use(express.json({extended: false}));

app.get('/',(req,res)=>res.send('hello world'));

//using Routes
app.use('/api/jobs',jobs);
const port=process.env.PORT || 8082;
app.listen(port,()=>console.log('server is running on port 8082'));