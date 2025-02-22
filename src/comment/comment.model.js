import { Schema, model} from "mongoose";

const postSchema = new Schema({
    text:{
        type: String,
        required: [true, "Text of post is required"],
        maxLength: [255, "Text post cannot exceed 255 characters"]
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    post:{
        type: Schema.Types.ObjectId,
        ref: 'Post', 
        required: true
    },
},
{
    versionKey: false,
    timeStamps: true
})

export default model("Comment", postSchema)