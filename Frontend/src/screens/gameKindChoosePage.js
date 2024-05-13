import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute} from '@react-navigation/native';

const GameKindChoosePage = () => {
  const Ip="192.168.234.47";
  const navigation = useNavigation();
  const route = useRoute(); 
  const [error, setError] = useState('');
  const { userId } = route.params; 
 

  useEffect(() => {
    databaseClear();
  });

  const databaseClear=()=>{
    console.log("databaseClear");
    fetch('http://'+Ip+':5000/deleteAllNotification', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
     })
    .catch(error => {
      console.error('API error1:', error);
      setError('API error:', error);
      throw error;
    });


    fetch('http://'+Ip+':5000/deleteAllPlayerGames', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
     })
    .catch(error => {
      console.error('API error2:', error);
      setError('API error:', error);
      throw error;
    });

    
    fetch('http://'+Ip+':5000/deleteAllRequest', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
     })
    .catch(error => {
      console.error('API error3:', error);
      setError('API error:', error);
      throw error;
    });

    fetch('http://'+Ip+':5000/deleteAllRoomWithUser', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
     })
    .catch(error => {
      console.error('API error3:', error);
      setError('API error:', error);
      throw error;
    });
  };

  const LogoutBtn = () => {
    navigation.navigate("Login");
  };

  const JoinRoom = (kind) => {
    navigation.navigate("GameLetterChosePage",{ userId: userId, kind:kind });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={LogoutBtn}>
        <Text style={styles.logoutText}>Çıkış Yap</Text>
      </TouchableOpacity>
      <View style={styles.roomsContainer}>
        
        <TouchableOpacity 
            style={styles.roomItem} 
            onPress={() => JoinRoom("RHSU")}>
            <Text style={styles.roomName}>Rastgele harf sabiti üretilerek</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.roomItem} 
            onPress={() => JoinRoom("HSKO")}>
            <Text style={styles.roomName}>Harf sabiti kısıtlaması olmadan</Text>
          </TouchableOpacity>
       
      </View>

      {error !== '' && (
        <View style={styles.errorView}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

export default GameKindChoosePage;

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
});
