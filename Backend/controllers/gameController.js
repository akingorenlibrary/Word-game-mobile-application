import { Playergame } from "../models/playerGameModel.js";
import { Request } from "../models/requestModel.js";
import { RoomWithUsers } from "../models/roomWithUserModel.js";


const savePlayersGame = (req, res) => {
    const { player1Id, player2Id, roomId } = req.body;

    const playerGame = new Playergame({
        player1Id,
        player2Id,
        roomId
    });

    playerGame.save()
        .then(savedPlayerGame => {
            res.status(201).json({ process: true });
        })
        .catch(err => {
            res.status(500).json({ process:false, error: err.message });
        });
};

const getAllPlayersGame = (req, res) => {
    Playergame.find()
        .then(playerGames => {
            res.status(200).json({process:true, playerGames});
        })
        .catch(err => {
            res.status(500).json({process:false, error: err.message });
        });
};

const deleteGame = (req, res) => {
    const {gameId} = req.body;

    Playergame.findByIdAndDelete(gameId)
        .then(deletedGame => {
            if (!deletedGame) {
                return res.status(404).json({ process: false, message: "Oyun bulunamadı." });
            }
            res.status(200).json({ process: true, message: "Oyun başarıyla silindi." });
        })
        .catch(err => {
            res.status(500).json({ process: false, error: err.message });
        });
};

const updatePlayer1GameStatus = (req, res) => {
    const { gameId, IsPlayer1InGame } = req.body;

    Playergame.findByIdAndUpdate(gameId, IsPlayer1InGame, { new: true })
        .then(updatedGame => {
            if (!updatedGame) {
                return res.status(404).json({ process: false, message: "Oyun bulunamadı." });
            }
            res.status(200).json({ process: true, updatedGame });
        })
        .catch(err => {
            res.status(500).json({ process: false, error: err.message });
        });
};


const updatePlayer2GameStatus = (req, res) => {
    const { gameId, IsPlayer2InGame } = req.body;

    Playergame.findByIdAndUpdate(gameId, IsPlayer2InGame, { new: true })
        .then(updatedGame => {
            if (!updatedGame) {
                return res.status(404).json({ process: false, message: "Oyun bulunamadı." });
            }
            res.status(200).json({ process: true, updatedGame });
        })
        .catch(err => {
            res.status(500).json({ process: false, error: err.message });
        });
};

const updatePlayer1Word=(req, res)=>{
    const { player1Id, word, player1Countdown } = req.body;

    Playergame.findOneAndUpdate(
        { player1Id: player1Id }, 
        { $set: { player1Word: word, player1Countdown:player1Countdown } },
        { new: true }
    )
    .then(updatedPlayerGame => {
        if (!updatedPlayerGame) {
            return res.status(404).json({ process: false, error: "Hata oluştu" });
        }
        res.status(200).json({ process: true, updatedPlayerGame });
    })
    .catch(err => {
        res.status(500).json({ process: false, error: err.message });
    });
};


const updatePlayer2Word=(req, res)=>{
    const { player2Id, word, player2Countdown} = req.body;

    Playergame.findOneAndUpdate(
        { player2Id: player2Id }, 
        { $set: { player2Word: word, player2Countdown:player2Countdown} },
        { new: true }
    )
    .then(updatedPlayerGame => {
        if (!updatedPlayerGame) {
            return res.status(404).json({ process: false, error: "Hata oluştu" });
        }
        res.status(200).json({ process: true, updatedPlayerGame });
    })
    .catch(err => {
        res.status(500).json({ process: false, error: err.message });
    });
};

const updateGameFinishedStatus=(req, res)=>{
    const { status, roomId } = req.body;

    Playergame.findOneAndUpdate(
        { roomId: roomId }, 
        { $set: { isGameFinished:status} },
        { new: true }
    )
    .then(updatedPlayerGame => {
        if (!updatedPlayerGame) {
            return res.status(404).json({ process: false, error: "Hata oluştu" });
        }
        res.status(200).json({ process: true, updatedPlayerGame });
    })
    .catch(err => {
        res.status(500).json({ process: false, error: err.message });
    });
};

const deleteAllPlayerGames = (req, res) => {
    Playergame.deleteMany({})
        .then(() => {
            return res.status(200).json({ message: "Tüm oyuncu oyunları başarıyla silindi" });
        })
        .catch(err => {
            return res.status(500).json({ error: err.message });
        });
};


const deleteAllRequest = (req, res) => {
    Request.deleteMany({})
        .then(() => {
            return res.status(200).json({ message: "Tüm oyuncu oyunları başarıyla silindi" });
        })
        .catch(err => {
            return res.status(500).json({ error: err.message });
        });
};

const deleteAllRoomWithUser=(req, res)=>{
    RoomWithUsers.deleteMany({})
        .then(() => {
            return res.status(200).json({ message: "Tüm oyuncu oyunları başarıyla silindi" });
        })
        .catch(err => {
            return res.status(500).json({ error: err.message });
        });
};



const updateGamePoint = (req, res) => {
    const { playerId, playerSetWord, point, playerGuessTime } = req.body;

    Playergame.findOne({ player1Id: playerId })
        .then(player1 => {
            if (player1) {
                return Playergame.updateOne({ player1Id: playerId }, { player1SetWord: playerSetWord, player1Point:point, player1GuessTime:playerGuessTime });
            } else {
                return Playergame.findOne({ player2Id: playerId });
            }
        })
        .then(player2 => {
            if (player2) {
                return Playergame.updateOne({ player2Id: playerId }, { player2SetWord: playerSetWord, player2Point:point, player2GuessTime:playerGuessTime});
            } else {
                throw new Error("Oyuncu bulunamadı");
            }
        })
        .then(() => {
            return res.status(200).json({ process:true, message: "Güncelleme başarılı" });
        })
        .catch(err => {
            return res.status(500).json({ error: err.message });
        });
};

export { updateGamePoint, deleteAllRoomWithUser, deleteAllRequest, deleteAllPlayerGames, updateGameFinishedStatus, updatePlayer2Word, updatePlayer1Word, savePlayersGame, getAllPlayersGame, deleteGame, updatePlayer1GameStatus, updatePlayer2GameStatus};
