const express= require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('../backend/routes/authentication/auth');
const filterRoute = require('../backend/routes/filterRoutes/filter');
const AppointmentRoute = require('../backend/routes/Appointments/appointRoute');
// Connect to MongoDB

mongoose.connect("mongodb://127.0.0.1:27017/Carrrr")
.then(()=>{
    console.log(" db connection establish ");   
})
.catch((err)=>{      
    console.log("db connection failed", err);   
})
const corsOptions = {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(userRoute);
app.use(filterRoute);
app.use(AppointmentRoute);
// server setup
app.listen(8000, (req,res)=>{
    console.log("Server is running on port 8000");
})