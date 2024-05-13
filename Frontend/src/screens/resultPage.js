import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const ResultPage = () => {
    const Ip="192.168.234.47";
    const navigation = useNavigation();
    const route = useRoute();
    const {randomIndex, word, sWord, onaylaButonSayac, userId, roomName, roomKind, roomId, gameId, thisUserId, otherUserId} = route.params;

    const [oyuncu1AsilKelime, setOyuncu1AsilKelime]=useState('...');
    const [oyuncu1GirilenKelime, setOyuncu1GirilenKelime]=useState('...');
    const [oyuncu1Puan, setOyuncu1Puan]=useState('...');

    const [oyuncu2AsilKelime, setOyuncu2AsilKelime]=useState('...');
    const [oyuncu2GirilenKelime, setOyuncu2GirilenKelime]=useState('...');
    const [oyuncu2Puan, setOyuncu2Puan]=useState('...');

    const [kazanan, setKazanan]=useState('...');
    const [kaybeden, setKaybeden]=useState('...');
    const [oyuncu1TahminSure, setOyuncu1TahminSure]=useState('...');
    const [oyuncu2TahminSure, setOyuncu2TahminSure]=useState('...');

    const [thisUserWord, setThisUserWord]=useState('');
    const [thisUserSetWord, setThisUserSetWord]=useState('');
    const [otherUserSetWord, setOtherUserSetWord]=useState('');
    const [otherUserWord, setOtherUserWord]=useState('');

    const [senderId, setSenderid] = useState('');
    const [receiverId, setReceiverid] = useState('');
    const [request, setRequest] = useState('');

    useEffect(() => {
      let intervalId = setInterval(getscore, 5000);
      getAllRequest();
      const requestInterval = setInterval(getAllRequest, 10000);
      return () => {
        clearInterval(intervalId);
        clearInterval(requestInterval);
      };
    }, []);

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

          if(req?.receiverStatus && req?.senderStatus){
            navigation.navigate("AddWordsPage", { thisUserId:userId, gameId: gameId, roomId:roomId, roomName:roomName, roomKind:roomKind, otherUserId:otherUserId});
          }

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

    const getscore=()=>{
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
         
              let oyuncu1AsilKelime=data.playerGames[0]?.player1Word;
              let oyuncu1GirilenKelime=data.playerGames[0]?.player1SetWord;
              let oyuncu1Sure=data.playerGames[0]?.player1Countdown;
              let oyuncu1Puan=data.playerGames[0]?.player1Point;
              setOyuncu1TahminSure(data.playerGames[0]?.player1GuessTime);

              let oyuncu2AsilKelime=data.playerGames[0]?.player2Word;
              let oyuncu2GirilenKelime=data.playerGames[0]?.player2SetWord;
              let oyuncu2Sure=data.playerGames[0]?.player2Countdown;
              let oyuncu2Puan=data.playerGames[0]?.player2Point;
              setOyuncu2TahminSure(data.playerGames[0]?.player2GuessTime);

              setOyuncu1AsilKelime(oyuncu2AsilKelime);
              setOyuncu1GirilenKelime(oyuncu1GirilenKelime);
              setOyuncu2AsilKelime(oyuncu1AsilKelime);
              setOyuncu2GirilenKelime(oyuncu2GirilenKelime);
              setOyuncu1Puan(oyuncu1Puan);
              setOyuncu2Puan(oyuncu2Puan);

              if(oyuncu1Puan>oyuncu2Puan){
                setKazanan("Oyuncu 1");
                setKaybeden("Oyuncu 2");
              }else if(oyuncu1Puan<oyuncu2Puan){
                setKazanan("Oyuncu 2");
                setKaybeden("Oyuncu 1");
              }else{
                setKazanan("Berabere");
                setKaybeden("Berabere");
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
   
    const leaveGame=()=>{
      console.log("userId: "+thisUserId+" roomName: "+roomName+"roomKind: "+roomKind+"roomId: "+roomId+"gameId: "+gameId);
      navigation.navigate("GameKindChoosePage",{userId:thisUserId, roomName:roomName, roomKind:roomKind, roomId:roomId, gameId:gameId});
    };

    const duelloButon=()=>{
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


    const acceptRequest=async(requestId, requestSenderId)=>{
      updateRequest(requestId,requestSenderId);
    };

    const updateRequest=(requestId, requestSenderId)=>{
      fetch('http://'+Ip+':5000/updateRequest', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          receiverStatus:true,
          requestId:requestId
        }),
      })
      .then(response => response.json())
      .then(data => {
        if(data.process){
          navigation.navigate("AddWordsPage", { thisUserId:userId, gameId: gameId, roomId:roomId, roomName:roomName, roomKind:roomKind, otherUserId:otherUserId});
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


    const cancelRequest=()=>{
      leaveGame();
    };

    return (
        <View style={styles.container}>

        <TouchableOpacity onPress={() => leaveGame()} style={[styles.button, styles.leaveButton]}>
          <Text style={styles.btext}>Çıkış</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => duelloButon()} style={[styles.button, styles.duelloButton]}>
          <Text style={styles.btext}>Düello</Text>
        </TouchableOpacity>

        <View style={styles.line}/>
        <Text style={styles.text}>Oyun Bitti</Text>
        <View style={styles.line}/>
        <Text style={styles.text}>Oyuncu 1</Text>
        <Text style={styles.stext}>Asıl Kelime: "{oyuncu1AsilKelime}"</Text>
        <Text style={styles.stext}>Girdiği kelime: "{oyuncu1GirilenKelime}"</Text>
        <Text style={styles.stext}>Puan: {oyuncu1Puan}</Text>
        <Text style={styles.stext}>Tahmin Süresi: {oyuncu2TahminSure} sn</Text>
        <View style={styles.line}/>
        <Text style={styles.text}>Oyuncu 2</Text>
        <Text style={styles.stext}>Asıl Kelime: "{oyuncu2AsilKelime}"</Text>
        <Text style={styles.stext}>Girdiği kelime: "{oyuncu2GirilenKelime}"</Text>
        <Text style={styles.stext}>Puan: {oyuncu2Puan}</Text>
        <Text style={styles.stext}>Tahmin Süresi: {oyuncu1TahminSure} sn</Text>
        <View style={styles.line}/>
        <Text style={styles.stext}>Kazanan: {kazanan}</Text>
        <Text style={styles.stext}>Kaybeden: {kaybeden}</Text>
        <View style={styles.line}/>

       
        <View style={{ flexDirection: 'row' }}>
        {request && request.receiverId === userId && (
          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.stext}>Düello isteğini kabul etmek istiyor</Text>
            <TouchableOpacity onPress={() => acceptRequest(request?._id, request.senderId)} style={[styles.requestButton, styles.acceptButton]}>
              <Text style={styles.requestText}>İsteği Kabul Et</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => cancelRequest(request._id, request.senderId)} style={[styles.requestButton, styles.deleteButton]}>
              <Text style={styles.requestText}>İsteği Reddet</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>



        </View>
    );
};

const styles = StyleSheet.create({
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
  line: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    color:"black",
    fontSize: 24,
    fontWeight: 'bold',
  },
  stext: {
    color:"black",
    fontSize: 20,
    fontWeight: 'bold',
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
  btext: {
    color: 'black',
  },
  duelloButton:{
    position: 'absolute',
    top: 10,
    right: 80,
  }
});

export default ResultPage;
