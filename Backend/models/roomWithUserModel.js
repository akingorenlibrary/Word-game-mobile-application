import mongoose from "mongoose";

const {Schema}=mongoose;

const roomWithUsersSchema=new Schema({
    roomId:{
        type:Schema.Types.ObjectId,
        ref:"Room"
    },
    users:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }],
});

const RoomWithUsers=mongoose.model("roomWithUsers",roomWithUsersSchema);
export {RoomWithUsers};