import express from "express"
import {singup, login, getUser, updateUserStatusById, updateUserStatusByUsername} from "../controllers/userController.js"
import {deleteNotification, deleteAllNotification, createNotification, getAllNotification, getRooms, addRoom, addRoomUser, getRoomWithUser, deleteUserFromRoom, createRequest, getAllRequest, deleteRequest, updateRequest} from "../controllers/roomController.js"
import {updatePlayer1Word, updatePlayer2Word, savePlayersGame, getAllPlayersGame, deleteGame, updatePlayer1GameStatus, updatePlayer2GameStatus} from "../controllers/gameController.js";
import {addWord, wordControl, getWord} from "../controllers/wordController.js";
import {updateGamePoint, deleteAllRoomWithUser, deleteAllRequest, deleteAllPlayerGames, updateGameFinishedStatus} from "../controllers/gameController.js";

const router=express.Router();

router.route("/singup").post(singup);
router.route("/login").post(login);

router.route("/getRooms").get(getRooms);
router.route("/userAddRoom").post(addRoomUser);
router.route("/addRoom").post(addRoom);
router.route("/getRoomWithUser").get(getRoomWithUser);
router.route("/deleteUserFromRoom").post(deleteUserFromRoom);
router.route("/deleteAllRoomWithUser").post(deleteAllRoomWithUser);

router.route("/getUsers").get(getUser);

router.route("/updateUserStatusById").post(updateUserStatusById);
router.route("/updateUserStatusByUsername").post(updateUserStatusByUsername);

router.route("/createRequest").post(createRequest);
router.route("/getAllRequest").get(getAllRequest);
router.route("/deleteRequest").post(deleteRequest);
router.route("/updateRequest").post(updateRequest);
router.route("/deleteAllRequest").post(deleteAllRequest);

router.route("/createNotification").post(createNotification);
router.route("/createNotification").post(createNotification);
router.route("/getAllNotification").get(getAllNotification);
router.route("/deleteNotification").post(deleteNotification);
router.route("/deleteAllNotification").post(deleteAllNotification);

router.route("/savePlayersGame").post(savePlayersGame);
router.route("/deleteGame").post(deleteGame);
router.route("/getPlayersGame").get(getAllPlayersGame);
router.route("/updatePlayer1Word").post(updatePlayer1Word);
router.route("/updatePlayer2Word").post(updatePlayer2Word);
router.route("/updatePlayer1GameStatus").post(updatePlayer1GameStatus);
router.route("/updatePlayer2GameStatus").post(updatePlayer2GameStatus);
router.route("/deleteAllPlayerGames").post(deleteAllPlayerGames);

router.route("/addWord").post(addWord);
router.route("/wordControl").post(wordControl);
router.route("/getWord").post(getWord);

router.route("/gameFinishedStatus").post(updateGameFinishedStatus);
router.route("/updateGamePoint").post(updateGamePoint);

export {router};