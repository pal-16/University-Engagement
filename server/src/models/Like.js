var mongoose = require('mongoose')

var LikeSchema = new mongoose.Schema({
    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'project'
    },
    authors:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'student'
        }
    ],
    number:{type:Number,default:0},
})

const Like = mongoose.model("like",LikeSchema);
module.exports = Like;