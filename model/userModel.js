const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    fname:{
        type: String,
        
    },
    lname:{
        type: String,
        
    },
    email:{
        type: String,
       
    },
    password:{
        type: String,
        
    },
    gender:{
        type: String,
        enum:['male', 'female']
    },
    role:{
        type: String,
        enum: ['admin', 'user']
    }
});

module.exports = mongoose.model("User", userSchema);