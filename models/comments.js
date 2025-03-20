const { Schema, model } = require("mongoose");


const commentSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    blodId: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },

},
    { timestamps: true }
);

const Comment = model("comment", commentSchema);

module.exports = Comment;
