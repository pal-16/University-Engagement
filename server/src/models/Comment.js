var mongoose = require('mongoose')
const Schema = mongoose.Schema;
var CommentSchema = new Schema({
    project:{
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
})

const Comment = mongoose.model("comment",CommentSchema);
module.exports = Comment;