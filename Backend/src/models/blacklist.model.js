const mongoose = require('mongoose')

const blacklistSchema  = new mongoose.Schema({
    token:{
        type:String,
        required:[true,"Token is needed to be added to blacklist"]
    }   
},{
    timestamps:true
})


const blacklistModel = mongoose.model("blacklist",blacklistSchema)

module.exports = blacklistModel