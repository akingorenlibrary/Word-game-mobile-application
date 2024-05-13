import mongoose from "mongoose";

const {Schema}=mongoose;

const wordSchema=new Schema({
    word:{
        type:String,
        required:true
    },
    wordCount:{
        type:Number,
        required:true
    }
});

const Word=mongoose.model("Word",wordSchema);
export {Word};