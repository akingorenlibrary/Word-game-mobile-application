import mongoose from "mongoose";

const {Schema}=mongoose;

const notificationSchema=new Schema({
    receiverId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },message:{
        type:String,
        required:true
    },
});

const Notification=mongoose.model("Notification",notificationSchema);
export {Notification};