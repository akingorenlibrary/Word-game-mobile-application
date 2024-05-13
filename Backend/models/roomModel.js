import mongoose from "mongoose";

const {Schema}=mongoose;

const roomSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    kind:{
        type:String,
        required:true
    }
});

const Room=mongoose.model("Room",roomSchema);
export {Room};