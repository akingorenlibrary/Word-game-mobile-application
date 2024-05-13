import mongoose from "mongoose";

const {Schema}=mongoose;

const playerGameSchema=new Schema({
    player1Id:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    player2Id:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    roomId:{
        type:Schema.Types.ObjectId,
        ref:"Room"
    },
    player1Word:{
        type:String
    },
    player2Word:{
        type:String
    },
    isGameFinished:{
        type:Boolean
    },
    player1SetWord:{
        type:String
    },
    player2SetWord:{
        type:String
    },
    player1Countdown:{
        type:String
    },
    player2Countdown:{
        type:String
    },
    player1Point:{
        type:String
    },
    player2Point:{
        type:String
    },
    player1GuessTime:{
        type:String
    },
    player2GuessTime:{
        type:String
    }
});

const Playergame=mongoose.model("Playergame",playerGameSchema);
export {Playergame};