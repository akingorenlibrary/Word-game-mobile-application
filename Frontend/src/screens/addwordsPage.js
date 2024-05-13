import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { kelimeler } from './kelimeler';

const AddWordsPage = () => {
  const Ip = "192.168.234.47";
  const deleteGameRequest='http://'+Ip+':5000/deleteGame';
  const getPlayersGameRequest='http://'+Ip+':5000/getPlayersGame';
  const navigation = useNavigation();
  const route = useRoute();
  const {thisUserId, roomId, roomName, roomKind, gameId, otherUserId } = route.params;
  const [word, setWord] = useState("");
  const [countdown, setCountdown] = useState(60);
  const inputCount = parseInt(roomName?.charAt(0));
  const [error, setError] = useState('');
  const [whichPlayer, setWhichPlayer] = useState('');
  let intervalId;
  let intervalId2;
  var intervalId3;
  let status=false;

  useEffect(() => {  
    
    getGameInfo(); 
    intervalId3 = setInterval(otherUserLeaveGameControl, 5000);
    
    intervalId= setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);

    intervalId2 = setInterval(getGameInfo2, 5000);
    
    return () => {
      clearInterval(intervalId)
      clearInterval(intervalId2)
    };

  }, []);

  
  useEffect(() => {
    if (countdown === 0) {
      console.log("Geri sayım bitti, işlem yapılabilir.");
      fetch('http://'+Ip+':5000/getPlayersGame', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      })
      .then(response => response.json())
      .then(data => {
        if(data.process){
        if(!data.playerGames[0]?.player1Word || !data.playerGames[0]?.player2Word){
            leaveGame();
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
    }
  }, [countdown]);

  const inputChange = (text) => {
    setWord(text);
  };

  const otherUserLeaveGameControl=()=>{
    fetch(getPlayersGameRequest, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.process) {
        if (data.playerGames.length === 0){
          if(status==false){
            console.log("oyundan atıyorum");
            createNotification();
            status=true;
            clearInterval(intervalId);
            navigation.navigate("RoomPage",{ userId: thisUserId, roomName:roomName, roomKind:roomKind, roomId:roomId, gameId:gameId});
          }
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

const createNotification=()=>{
  fetch('http://'+Ip+':5000/createNotification', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      receiverId:thisUserId,
      message:"Oyunculardan biri oyundan çıktı. Oyun bitti."
    }),
  })
  .then(response => response.json())
  .then(data => {
    console.log("response: "+JSON.stringify(data));
    if(data.process){
      console.log("mesaj kaydedildi");
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

  const getGameInfo2=()=>{
    fetch('http://'+Ip+':5000/getPlayersGame', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      if(data.process){
      if(data.playerGames[0]?.player1Word && data.playerGames[0]?.player2Word){
        clearInterval(intervalId)
        clearInterval(intervalId2)
        navigation.navigate("GamePage", {cdown:countdown, thisUserId:thisUserId, gameId: gameId, roomId:roomId, roomName:roomName, roomKind:roomKind, otherUserId:otherUserId, whichPlayer2:whichPlayer});
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

  const getGameInfo=()=>{
    fetch('http://'+Ip+':5000/getPlayersGame', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      if(data.process){
       if(thisUserId==data.playerGames[0]?.player1Id){
        console.log("thisUserId: "+thisUserId+"P1");
          setWhichPlayer("P1");
       }else if(thisUserId==data.playerGames[0]?.player2Id){
          setWhichPlayer("P2");
          console.log("thisUserId: "+thisUserId+"P2");
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

  const startGame = () => {
    saveWord();
  };

  const kelimeAra=(arananKelime)=>{
    for (let kelime of kelimeler) {
        if (kelime.includes(arananKelime)) {
            return true;
        }
    }
    return false;
  }

  const saveWord=()=>{
    if (kelimeAra(word)) {
      console.log("word: "+word+" whichPlayer: "+whichPlayer+" countdown: "+countdown);
      if(whichPlayer=="P1"){
        fetch('http://'+Ip+':5000/updatePlayer1Word', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            word: word,
            player1Id:thisUserId,
            player1Countdown:countdown
          }),
        })
        .then(response => response.json())
        .then(data => {
          if(data.process){
            console.log("kelime kaydedildi");
          }else{
            console.log(data?.message);
            setError(data?.message);
          }
    
        })
        .catch(error => {
          console.error('API error:', error);
          setError('API error:', error);
          throw error;
        });
      }else if(whichPlayer=="P2"){
        fetch('http://'+Ip+':5000/updatePlayer2Word', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            word: word,
            player2Id:thisUserId,
            player2Countdown:countdown
          }),
        })
        .then(response => response.json())
        .then(data => {
          if(data.process){
            console.log("kelime kaydedildi");
          }else{
            console.log(data?.message);
            setError(data?.message);
          }
    
        })
        .catch(error => {
          console.error('API error:', error);
          setError('API error:', error);
          throw error;
        });
      }
    } else {
      setError("Lütfen gerçek bir kelime girin.");
    }    
  };

  const leaveGame = () => {
    fetch(deleteGameRequest, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        gameId: gameId
      }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.process) {
        clearInterval(intervalId);
        navigation.navigate("RoomPage",{ userId: thisUserId, roomName:roomName, roomKind:roomKind, roomId:roomId, gameId:gameId});
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

return (
  <View style={styles.container}>
  <View style={styles.headerContainer}>
  <View style={styles.header}>
    <Text style={styles.headerText}>Kelime Ekle</Text>
    <TouchableOpacity style={styles.exitButton} onPress={leaveGame}>
      <Text style={styles.exitButtonText}>Oyundan Çık</Text>
    </TouchableOpacity>
  </View>
  <Text style={styles.countdownText}>Geri Sayım: {countdown} saniye</Text>
</View>
  <TextInput
    style={styles.input}
    value={word}
    onChangeText={inputChange}
    maxLength={inputCount}
  />
  <TouchableOpacity style={styles.startButton} onPress={startGame}>
    <Text style={styles.startButtonText}>Oyuna Başla</Text>
  </TouchableOpacity>


  {error !== '' && (
        <View style={styles.errorView}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
</View>

);

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  countdownText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'black',
  },
  startButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  exitButton: {
    backgroundColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    position: 'absolute',
    right: 10,
    zIndex: 1,
  },
  exitButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  startButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerContainer: {
    marginBottom: 20,
  },
  errorView: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  errorText: {
    color: 'red',
  },
});

export default AddWordsPage;
