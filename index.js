const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const User = require("./model/userModel");

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(cors({
  origin: 'http://localhost:3000'
}));



main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Crud');
}


// Create route
app.post("/create", async (req, res) => {
  try {
    let { fname, lname, email, password } = req.body;
    let newUser = new User({
      fname: fname,
      lname: lname,
      email: email,
      password: password,
    });
    await newUser.save();
    res.status(201).json({newUser, msg: "User Created Successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// Read Route
app.get("/users", async(req, res)=>{
  try{
    let allUsers = await User.find();
    res.json(allUsers)
  }catch(error){
    console.log(error)
    res.status(500).json({msg: "Server Error"})
  }  
});


// Update Route
app.put("/users/:id", async(req, res)=>{
  try{
    const{id} = req.params
    const {fname, lname, email, password} = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      {_id: id},
      {fname, lname, email, password},
    );
    res.json(updatedUser);
  }catch(error){
    console.log(error);
    res.status(500).json({msg: "Server Error"})
  }
});


// Delete Route
app.delete("/delete/:id", async(req, res)=>{
  try{
    const {id} = req.params;
    await User.findByIdAndDelete(id);
    res.json({msg: "User Deleted successfully"})
   }catch(error){
     console.log(error);
     res.status(500).json({msg: "Server Error"})
  }
})




app.listen(8080, ()=>{
    console.log("server is listening")
})

