var mongoose = require('mongoose')
const Schema = mongoose.Schema;
var CommentSchema = new Schema({
    projectID:{
        type:Schema.Types.ObjectId,
        ref:"project"
    },
    author:{
            type:Schema.Types.ObjectId,
            ref:"student"
    },
    commentText: { 
        type: String,
        required: true
    }
},
{timestamps:true});

const Comment = mongoose.model("comment",CommentSchema);
module.exports = Comment;