import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute} from '@react-navigation/native';

const GameLetterChosePage = () => {
  const Ip="192.168.234.47";
  const [rooms, setRooms] = useState([]);
  const navigation = useNavigation();
  const route = useRoute(); 
  const [error, setError] = useState('');
  const { userId, kind } = route.params; 
  useEffect(() => {
    fetchRooms();
  }, []);


  const fetchRooms = async () => {
    try {
      const response = await fetch('http://'+Ip+':5000/getRooms');
      const data = await response.json();
      if(kind=="RHSU"){
        const getRooms = data.rooms.filter(room => room.kind === "RHSU");
            setRooms(getRooms);
      }else{
        const getRooms = data.rooms.filter(room => room.kind === "HSKO");
        setRooms(getRooms);
      }
    } catch (error) {
      console.error('Room fetch error', error);
    }
  };

  const JoinRoom = async(roomId, roomName, roomKind) => {
    console.log("letterpage- userId:",userId);
    console.log("Room clicked:", roomId, roomName, roomKind);
    await fetchUserSaveRoom(roomId, roomName, roomKind);
  };

  const fetchUserSaveRoom=(roomId, roomName, roomKind)=>{
    fetch('http://'+Ip+':5000/userAddRoom', {
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
          console.log("Odaya katılma başarılı");
          navigation.navigate("RoomPage",{ roomId:roomId, userId: userId, roomName:roomName, roomKind:roomKind });
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
     
     <View style={styles.roomsContainer}>
        {rooms.map(room => (
            <TouchableOpacity 
            key={room._id} 
            style={styles.roomItem} 
            onPress={() => JoinRoom(room._id, room.name, room.kind)}>
            <Text style={styles.roomName}>{room.name}</Text>
            {room.kind === "RHSU" && <Text style={styles.roomType}>Rastgele harf sabiti üretilerek</Text>}
            {room.kind === "HSKO" && <Text style={styles.roomType}>Harf sabiti kısıtlaması olmadan</Text>}
            </TouchableOpacity>
        ))}
    </View>


      {error !== '' && (
        <View style={styles.errorView}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

export default GameLetterChosePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoutButton: {
    position: 'absolute',
    top: 10,
    right: 20,
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  logoutText: {
    fontSize: 16,
    color: 'black',
  },
  roomsContainer: {
    flex: 1,
    marginTop: 110,
  },
  roomItem: {
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  roomName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  roomType: {
    fontSize: 14,
    color: 'gray',
  },
});
