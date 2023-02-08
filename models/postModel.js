const mongoose = require('mongoose');
const PostsSchema={
    title:{
        type: String,
        require: true
    },

    desc:{
        type:String,
        require:true
    }
}
module.exports = mongoose.model('Posts',PostsSchema); 