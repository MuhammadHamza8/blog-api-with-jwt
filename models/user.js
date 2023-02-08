const mongoose = require('mongoose');
const UserSchema={
    email:{
        type: String,
        require: true,
        unique:true
    },

    password:{
        type:String,
        require:true
    },

    token:{
        type:String,
        require:true
    }
}
module.exports = mongoose.model('Users',UserSchema); 