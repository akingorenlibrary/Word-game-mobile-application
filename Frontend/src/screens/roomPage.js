import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const RoomPage = () => {
  const Ip="192.168.234.47";
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const [error, setError] = useState('');
  const [senderId, setSenderid] = useState('');
  const [notification, setNotification] = useState('');
  const [receiverId, setReceiverid] = useState('');
  const [request, setRequest] = useState('');
  const { roomId, userId, roomName, roomKind, gameId } = route.params;
  let playerGameControlInterval;
  let roomUsersInterval;

  useEffect(() => {
  
    // Odadaki kullanıcıları ve istekleri almak için işlevlerin çağrıları
    getRoomUsers();
    getAllRequest();
  
    // Belirli aralıklarla odadaki kullanıcıları, istekleri ve bildirimleri güncellemek için zamanlayıcılar
    roomUsersInterval = setInterval(getRoomUsers, 5000);
    const requestInterval = setInterval(getAllRequest, 10000);
    const notificationInterval = setInterval(getNotification, 5000);
    playerGameControlInterval = setInterval(playerGameControl, 5000);
 
    // Komponent sonlandığında zamanlayıcıları temizleme
    return () => {
      clearInterval(roomUsersInterval);
      clearInterval(requestInterval);
      clearInterval(notificationInterval);
      clearInterval(playerGameControlInterval);
    };
  }, []);
  

  const playerGameControl=()=>{
      fetch('http://'+Ip+':5000/getPlayersGame', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.process) {
         if( (data.playerGames[0]?.player1Id==userId || data.playerGames[0]?.player2Id==userId)){

          var other;
          if(data.playerGames[0]?.player1Id==userId){
            other=data.playerGames[0]?.player2Id;
          }else{
            other=data.playerGames[0]?.player1Id;
          }
          clearInterval(playerGameControlInterval);
          clearInterval(roomUsersInterval);
          navigation.navigate("AddWordsPage", { thisUserId:userId, gameId: data.playerGames[0]?._id, roomId:roomId, roomName:roomName, roomKind:roomKind, otherUserId:other});
         }
        }else{
          setError("Hata oluştu");
        }
       
      })
      .catch(error => {
        console.error('API error:', error);
        setError('API error:', error);
        throw error;
      });
  };

  const getNotification=()=>{
    fetch('http://'+Ip+':5000/getAllNotification', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.process) {
        const userNotification = data.notifications.filter(n => n.receiverId==userId);
        if(userNotification != null){
          setNotification(userNotification[0]);
        }
      }else{
        setError("Hata oluştu");
      }
     
    })
    .catch(error => {
      console.error('API error:', error);
      setError('API error:', error);
      throw error;
    });
  };

  const getUserInfo=(usersInRoom)=>{

      fetch('http://'+Ip+':5000/getUsers', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.process) {
        const users = data.users;
        if(data.users.length>0){
          const userInfo = users.filter(user => usersInRoom.includes(user._id));
          setUsers(userInfo);
        }
      }else{
        setError("Hata oluştu");
      }
     
    })
    .catch(error => {
      console.error('API error:', error);
      setError('API error:', error);
      throw error;
    });
    
  };


  const getRoomUsers=()=>{
    fetch('http://'+Ip+':5000/getRoomWithUser', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      //console.log("response: "+JSON.stringify(data));
      if(data.process){
        console.log("data?.rooms.length: "+data?.rooms.length);
        if(data?.rooms.length==0){
          clearInterval(roomUsersInterval);
          navigation.navigate("GameKindChoosePage",{userId:userId, roomName:roomName, roomKind:roomKind, roomId:roomId, gameId:gameId});
        }
        const room = data.rooms.find(r => r.roomId==roomId);
        const usersInRoom = room?.users;
        if(data.rooms.length>0){
          getUserInfo(usersInRoom);
        }
      }else{
        setError(data.message);
      }

    })
    .catch(error => {
      console.error('API error:', error);
      setError('API error:', error);
      throw error;
    });
  };

  const leaveFromRoom = () => {
    fetch('http://'+Ip+':5000/deleteUserFromRoom', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        roomId: roomId,
        userId: userId
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log("response: "+JSON.stringify(data));
      if(data.process){
        console.log("Odadan ayrılma işlemi başarılı");
        deleteAllNotifaication();
      }else{
        setError(data.message);
      }

    })
    .catch(error => {
      console.error('API error:', error);
      setError('API error:', error);
      throw error;
    });
  };

  const deleteAllNotifaication=()=>{
    fetch('http://'+Ip+':5000/deleteAllNotification', {
      method: 'POST',
      headers: {

        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log("response: "+JSON.stringify(data));
      if(data.process){
        navigation.navigate("GameKindChoosePage",{ userId: userId });
      }else{
        setError(data.message);
      }

    })
    .catch(error => {
      console.error('API error:', error);
      setError('API error:', error);
      throw error;
    });
  };

  const getAllRequest=()=>{
    fetch('http://'+Ip+':5000/getAllRequest', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      if(data.process){
        const req=data.requests.find(r => r.roomId==roomId);
        setReceiverid(req?.receiverId);
        setSenderid(req?.senderId);
        setRequest(req);
      }else{
        setError(data?.message);
      }
    })
    .catch(error => {
      console.error('API error:', error);
      setError('API error:', error);
      throw error;
    });
  };

  const sendRequest=(otherUserId)=>{
    fetch('http://'+Ip+':5000/createRequest', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        roomId: roomId,
        senderId: userId,
        receiverId:otherUserId
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log("response: "+JSON.stringify(data));
      if(data.process){
        console.log("İstek atıldı");
        setSenderid(userId);
        setReceiverid(otherUserId);
      }else{
        setError(data?.message);
      }

    })
    .catch(error => {
      console.error('API error:', error);
      setError('API error:', error);
      throw error;
    });
  };

  const cancelRequest=(reqId, requestSenderId)=>{
    fetch('http://'+Ip+':5000/deleteRequest', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requestId:reqId
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log("response: "+JSON.stringify(data));
      if(data.process){
        console.log("İstek reddedildi");
        createNotification(requestSenderId);
      }else{
        setError(data.message);
      }

    })
    .catch(error => {
      console.error('API error:', error);
      setError('API error:', error);
      throw error;
    });
  };

  const createNotification=(requestSenderId)=>{
    console.log("createNotification-requestSenderId: "+requestSenderId);
    fetch('http://'+Ip+':5000/createNotification', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        receiverId:requestSenderId,
        message:"İstek reddedildi"
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log("response: "+JSON.stringify(data));
      if(data.process){
        console.log("istek reddedildi mesajı gönderildi.");
      }else{
        setError(data.message);
      }

    })
    .catch(error => {
      console.error('API error:', error);
      setError('API error:', error);
      throw error;
    });
  };

  const acceptRequest=async(requestId, requestSenderId)=>{
    deleteRequest(requestId,requestSenderId);
  };

  const deleteRequest=(requestId, requestSenderId)=>{
    fetch('http://'+Ip+':5000/deleteRequest', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requestId: requestId,
      }),
    })
    .then(response => response.json())
    .then(data => {
      if(data.process){
        console.log("İstek silindi");
        saveGameDatabase(requestSenderId);
      }else{
        setError(data?.message);
      }

    })
    .catch(error => {
      console.error('API error:', error);
      setError('API error:', error);
      throw error;
    });
  };

  const saveGameDatabase=(requestSenderId)=>{
    fetch('http://'+Ip+':5000/savePlayersGame', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        player1Id: userId,
        player2Id:requestSenderId,
        roomId:roomId
      }),
    })
    .then(response => response.json())
    .then(data => {
      if(data.process){
        console.log("oyuncular database kaydedildi");
      }else{
        setError(data?.message);
      }

    })
    .catch(error => {
      console.error('API error:', error);
      setError('API error:', error);
      throw error;
    });

  };

  const deleteNotification=(nId)=>{
    console.log("nId: "+nId);
    fetch('http://'+Ip+':5000/deleteNotification', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        notificationId:nId
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log("response: "+JSON.stringify(data));
      if(data.process){
        console.log("Bildirim silindi");
      }else{
        setError(data.message);
      }

    })
    .catch(error => {
      console.error('API error:', error);
      setError('API error:', error);
      throw error;
    });
  };



  return (
    
    <View style={styles.container}>

      <Text style={styles.roomName}>{roomName}</Text>
      {roomKind === "RHSU" && <Text style={styles.roomType}>Rastgele harf sabiti üretilerek</Text>}
      {roomKind === "HSKO" && <Text style={styles.roomType}>Harf sabiti kısıtlaması olmadan</Text>}

      <TouchableOpacity onPress={() => leaveFromRoom()} style={[styles.button, styles.leaveButton]}>
        <Text style={styles.text}>Odadan Ayrıl</Text>
      </TouchableOpacity>

      <View>
  <Text style={styles.text}>Odadaki kullanıcılar:</Text>
  {users.map(user => (
    <View key={user._id} style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={styles.text}>{user.username} - Aktif</Text>
      {userId !== user._id && (
        <TouchableOpacity onPress={() => sendRequest(user._id)} style={styles.requestButton}>
          {request ? (
            (senderId == userId && receiverId == user._id) ? (
              <Text style={styles.requestText}>İstek Gönderildi</Text>
            ) : (receiverId == userId && senderId == user._id) ? (
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => acceptRequest(request._id, request.senderId)} style={[styles.requestButton, styles.acceptButton]}>
                  <Text style={styles.requestText}>İsteği Kabul Et</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => cancelRequest(request._id, request.senderId)} style={[styles.requestButton, styles.deleteButton]}>
                  <Text style={styles.requestText}>İsteği Reddet</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Text style={styles.requestText}>İstek Gönder</Text>
            )
          ) : (
            <Text style={styles.requestText}>İstek Gönder</Text>
          )}
        </TouchableOpacity>
      )}
    </View>
    
  ))}


<View style={notification ? styles.containerWithBorder : null}>
      {notification?.receiverId==userId && (
        <View style={styles.innerContainer}>
          <Text style={styles.text}>{notification.message}</Text>
          <TouchableOpacity onPress={() => deleteNotification(notification._id)} style={styles.button}>
            <Text style={styles.requestText}>Kapat</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>

</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  roomName: {
    color: 'black',
    fontSize: 24,
    marginBottom: 10,
    marginTop: 100,
  },
  button: {
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    margin: 10,
  },
  leaveButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  text: {
    color: 'black',
  },
  roomType: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 50,
  },
  requestButton: {
    marginLeft: 10,
    padding: 5,
    borderRadius: 3,
    backgroundColor: '#ccc',
    borderWidth: 1,
    borderColor: 'black',
  },
  requestText: {
    color: 'black',
  },
  containerWithBorder: {
    marginTop: 40,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderRadius: 5,
  }
});

export default RoomPage;