import mongoose from "mongoose";

const {Schema}=mongoose;

const requestSchema=new Schema({
    receiverId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    senderId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    receiverStatus:{
        type:Boolean
    },
    senderStatus:{
        type:Boolean
    },
    roomId:{
        type:Schema.Types.ObjectId,
        ref:"Room"
    },
});

const Request=mongoose.model("Request",requestSchema);
export {Request};