import { Schema, model} from "mongoose";

const postSchema = Schema({
    tilte:{
        type: String,
        required: [true, "Title of post is required"],
        maxLength: [35, "Title post cannot exceed 35 characters"]
    },
    bodyPost:{
        type: String,
        required: [true, "El post body is required"],
        maxLength: [255, "Post body cannot exceed 255 characters"]
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'Category', 
        required: true
    },
},
{
    versionKey: false,
    timeStamps: true
})

export default model("Post", postSchema)