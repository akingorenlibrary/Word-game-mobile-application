import { Room } from "../models/roomModel.js";
import { RoomWithUsers } from "../models/roomWithUserModel.js";
import { User } from "../models/userModel.js";
import { Request } from "../models/requestModel.js";
import { Notification } from "../models/notificationModel.js";

const getRooms=async(req, res)=>{
    try{
        var rooms=await Room.find();
        return res.json({process:true, rooms});
    }catch(error){
        console.log(error);
        return res.json({process:false});
    }
};


const addRoomUser = async (req, res) => {
    const { roomId, userId } = req.body;
    
    try {
        let roomWithUser = await RoomWithUsers.find({roomId: roomId});
        if (roomWithUser.length>0) {
           
            if (roomWithUser[0].users) {
                let userVarMi = false;
                roomWithUser[0].users.forEach(uId => {
                    if (uId == userId) {
                        userVarMi = true;
                        return;
                    }
                });
                console.log("userVarMi: "+userVarMi);
                if (userVarMi) {
                    return res.status(400).json({
                        process: false,
                        message: "Kullanıcı zaten odaya eklenmiş."
                    });
                } else {
                    await RoomWithUsers.updateOne(
                        {roomId:roomId},
                        {$push:{users:[userId]}
                        },{new:true});

                        return res.status(200).json({
                            process: true,
                            message: "Kullanıcı odaya eklendi."
                        });
                }

                
            }


        } else {
            const add = new RoomWithUsers({
                roomId: roomId,
                users: [userId]
            });
            await add.save();
            
            return res.status(200).json({
                process: true,
                message: "Oda oluşturuldu ve kullanıcı odaya eklendi."
            });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            process: false,
            message: "İşlem sırasında bir hata oluştu"
        });
    }
};



const addRoom = async (req, res) => {
    let { roomName, roomKind } = req.body;
    roomName = roomName.trim();

    try {
        const room = await Room.find({ name: roomName, kind:roomKind });
        console.log("room: " + room);

        if (room.length > 0) {
            return res.status(500).json({
                process: false,
                message: "Böyle bir oda zaten var."
            });
        } else {
            const add = new Room({
                name: roomName,
                kind:roomKind
            });
            await add.save();
            
            return res.json({
                process: true,
                message: "oda açıldı"
            });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            process: false,
            message: "Oda açılırken bir hata oluştu"
        });
    }
}

const getRoomWithUser = async (req, res) => {
    try {
        const rooms = await RoomWithUsers.find();
        return res.status(200).json({
            process: true,
            rooms: rooms
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            process: false,
            message: "Odalar getirilirken bir hata oluştu"
        });
    }
};

const deleteUserFromRoom = async (req, res) => {
    try {
        const { roomId, userId } = req.body;
        
        const updateResult = await RoomWithUsers.updateOne(
            { roomId: roomId },
            { $pull: { users: userId } }
        );

        if (updateResult && updateResult.modifiedCount > 0) {
            return res.status(200).json({
                process: true,
                message: "Kullanıcı odadan silindi."
            });
        } else {
            return res.status(200).json({
                process: false,
                message: "Kullanıcı odadan silinirken hata oluştu."
            });
        }
    } catch (error) {
        console.error("Error deleting user from room:", error);
        return res.status(500).json({
            process: false,
            message: "Kullanıcı odadan silinirken bir hata oluştu."
        });
    }
};

const getAllRequest = async (req, res) => {
    try {
        const requests = await Request.find();
        res.status(200).json({process: true, requests});
    } catch (error) {
        res.status(500).json({process: false, error: error.message });
    }
};


const updateRequest = async (req, res) => {
    try {
        const { receiverStatus, requestId } = req.body;

        const updatedRequest = await Request.findByIdAndUpdate(
            requestId,
            { receiverStatus },
            { new: true }
        );

        if (!updatedRequest) {
            return res.status(404).json({ process: false, message: "Güncellenecek istek bulunamadı" });
        }

        res.status(200).json({ process: true, message: "İstek güncellendi", updatedRequest });
    } catch (error) {
        res.status(500).json({ process: false, error: error.message });
    }
};


const createRequest = async (req, res) => {
    try {
        const { receiverId, senderId, roomId } = req.body;
        const newRequest = new Request({
            receiverId,
            senderId,
            roomId,
            receiverStatus: null,
            senderStatus: true,
        });

        await newRequest.save();
        res.status(200).json({ process:true, message: "İstek oluşturuldu", newRequest });
    } catch (error) {
        console.log(error);
        res.status(500).json({ process:false, error: error.message });
    }
};

const createNotification = async (req, res) => {
    try {
        const { receiverId, message} = req.body;
        const add = new Notification({
            receiverId,
            message
        });

        await add.save();
        res.status(200).json({ process:true, message: "Mesaj kaydedildi", add });
    } catch (error) {
        console.log(error);
        res.status(500).json({ process:false, error: error.message });
    }
};

const deleteNotification = async (req, res) => {
    try {
        const { notificationId } = req.body;
        await Notification.findByIdAndDelete(notificationId);
        res.status(200).json({ process: true, message: "Bildirim başarıyla silindi" });
    } catch (error) {
        res.status(500).json({ process: false, error: error.message });
    }
};


const getAllNotification = async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.status(200).json({process: true, notifications});
    } catch (error) {
        res.status(500).json({process: false, error: error.message });
    }
};

const deleteAllNotification = async (req, res) => {
    try {
        await Notification.deleteMany();
        res.status(200).json({ process: true, message: "Tüm bildirimler başarıyla silindi." });
    } catch (error) {
        res.status(500).json({ process: false, error: error.message });
    }
};

const deleteRequest = async (req, res) => {
    try {
        const { requestId } = req.body;
        await Request.findByIdAndDelete(requestId);
        res.status(200).json({ process:true, message: "İstek silindi" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ process:false, error: error.message });
    }
};


export {deleteAllNotification, deleteNotification, getRooms, addRoomUser, addRoom, getRoomWithUser, deleteUserFromRoom, getAllRequest, createRequest, updateRequest, deleteRequest, createNotification, getAllNotification};