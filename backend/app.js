const express = require("express");
const cors = require("cors");
const recordRoutes = require("./routes/recordRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();

//middlewares
//cors problem
app.use(cors());
//tell file to convert in json format
app.use(express.json());
//routes
app.use("/api/records", recordRoutes);
app.use("/api/dashboard",dashboardRoutes)
app.use("/api/auth", authRoutes);


app.get("/",(req,res)=>{
    res.send("api is running...");
});


//routes
// const authRoutes = require("./routes/authRoutes");
// app.use("/api/auth", authRoutes);

module.exports = app