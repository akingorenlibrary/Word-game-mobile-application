import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const GamePage = () => {
  const Ip="192.168.234.47";
  const deleteGameRequest='http://'+Ip+':5000/deleteGame';
  const getPlayersGameRequest='http://'+Ip+':5000/getPlayersGame';
  const navigation = useNavigation();
  const [error, setError] = useState('');
  const [randomIndex, SetRandomIndex] = useState('');
  const [onaylaButonText, setOnaylaButonText] = useState('Onayla');
  const route = useRoute();
  const [word, setWord]=useState('');
  const [whichPlayer, setWhichPlayer]=useState('');
  const [countdownuser, setCountdownuser]=useState('');
  const [onaylaButonSayac, SetOnaylaButonSayac]=useState(1);

  const [greenBox, SetGreenBox]=useState([]);
  const [grayBox, SetGrayBox]=useState([]);
  const [yellowBox, SetYellowBox]=useState([]);

  const [greenBox2, SetGreenBox2]=useState([]);
  const [grayBox2, SetGrayBox2]=useState([]);
  const [yellowBox2, SetYellowBox2]=useState([]);

  const [greenBox3, SetGreenBox3]=useState([]);
  const [grayBox3, SetGrayBox3]=useState([]);
  const [yellowBox3, SetYellowBox3]=useState([]);

  const [greenBox4, SetGreenBox4]=useState([]);
  const [grayBox4, SetGrayBox4]=useState([]);
  const [yellowBox4, SetYellowBox4]=useState([]);

  const [greenBox5, SetGreenBox5]=useState([]);
  const [grayBox5, SetGrayBox5]=useState([]);
  const [yellowBox5, SetYellowBox5]=useState([]);

  const [greenBox6, SetGreenBox6]=useState([]);
  const [grayBox6, SetGrayBox6]=useState([]);
  const [yellowBox6, SetYellowBox6]=useState([]);

  const [greenBox7, SetGreenBox7]=useState([]);
  const [grayBox7, SetGrayBox7]=useState([]);
  const [yellowBox7, SetYellowBox7]=useState([]);

  const {cdown, thisUserId, gameId, roomId, roomName, roomKind, otherUserId, whichPlayer2 } = route.params;
  const InputCount = parseInt(roomName?.charAt(0));
  let status=false;
  var intervalId;
  var intervalId2;
  const [inputValues, setInputValues] = useState(Array.from({ length: InputCount }, () => ''));
  const [inputValues2, setInputValues2] = useState(Array.from({ length: InputCount }, () => ''));
  const [inputValues3, setInputValues3] = useState(Array.from({ length: InputCount }, () => ''));
  const [inputValues4, setInputValues4] = useState(Array.from({ length: InputCount }, () => ''));
  const [inputValues5, setInputValues5] = useState(Array.from({ length: InputCount }, () => ''));
  const [inputValues6, setInputValues6] = useState(Array.from({ length: InputCount }, () => ''));
  const [inputValues7, setInputValues7] = useState(Array.from({ length: InputCount }, () => ''));
  const [countdown, setCountdown] = useState(60);
  const [inputDisable, SetInputDisable] = useState(false);
  const [inputDisable2, SetInputDisable2] = useState(false);
  const [inputDisable3, SetInputDisable3] = useState(false);
  const [inputDisable4, SetInputDisable4] = useState(false);
  const [inputDisable5, SetInputDisable5] = useState(false);
  const [inputDisable6, SetInputDisable6] = useState(false);
  const [inputDisable7, SetInputDisable7] = useState(false);
  const [onaylaButonDisabled, SetOnaylaButonDisabled] = useState(false);
  let timer;
  useEffect(() => {
    getDatabaseWord();
    intervalId = setInterval(otherUserLeaveGameControl, 5000);
    intervalId2 = setInterval(gameFinishedControl, 5000);
    timer= setInterval(() => {
      setCountdown((c) => {
        if (c == 0) {
          SetInputDisable(true);
          SetInputDisable2(true);
          SetInputDisable3(true);
          SetInputDisable4(true);
          SetInputDisable5(true);
          SetInputDisable6(true);
          SetInputDisable7(true);
          setOnaylaButonText("Oyun bitti devam et");
          return c;
        } else if(c>0){
          return c - 1;
        }
      });
    }, 1000);
    return () => {
      clearInterval(intervalId);
      clearInterval(intervalId2);
      clearInterval(timer);
    };
  }, []);

 
  const gameFinishedControl=()=>{
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
        if(data.playerGames[0]?.isGameFinished){
          SetInputDisable(true);
          SetInputDisable2(true);
          SetInputDisable3(true);
          SetInputDisable4(true);
          SetInputDisable5(true);
          SetInputDisable6(true);
          SetInputDisable7(true);
          setOnaylaButonText("Oyun bitti devam et");
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

  const getDatabaseWord=()=>{
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
        let w;
        if(data.playerGames[0]?.player1Id==thisUserId){
          setWhichPlayer("P1");
          w=data.playerGames[0]?.player2Word;
        }else if(data.playerGames[0]?.player2Id==thisUserId){
          setWhichPlayer("P2");
          w=data.playerGames[0]?.player1Word;
        }
        setWord(w);
        if (roomKind === "RHSU") {
          const rIndex = Math.floor(Math.random() * InputCount);
          const randomCharacter =w.charAt(rIndex);
          if(InputCount==4){
            inputValues[rIndex]=randomCharacter;
            inputValues2[rIndex]=randomCharacter;
            inputValues3[rIndex]=randomCharacter;
            inputValues4[rIndex]=randomCharacter;
          }else if(InputCount==5){
            inputValues[rIndex]=randomCharacter;
            inputValues2[rIndex]=randomCharacter;
            inputValues3[rIndex]=randomCharacter;
            inputValues4[rIndex]=randomCharacter;
            inputValues5[rIndex]=randomCharacter;
          }else if(InputCount==6){
            inputValues[rIndex]=randomCharacter;
            inputValues2[rIndex]=randomCharacter;
            inputValues3[rIndex]=randomCharacter;
            inputValues4[rIndex]=randomCharacter;
            inputValues5[rIndex]=randomCharacter;
            inputValues6[rIndex]=randomCharacter;
          }else if(InputCount==7){
            inputValues[rIndex]=randomCharacter;
            inputValues2[rIndex]=randomCharacter;
            inputValues3[rIndex]=randomCharacter;
            inputValues4[rIndex]=randomCharacter;
            inputValues5[rIndex]=randomCharacter;
            inputValues7[rIndex]=randomCharacter;
          }
          SetRandomIndex(rIndex);
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
      //console.log("response: "+JSON.stringify(data));
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

  const savePlayerWord = (setWord) => {  
    clearInterval(intervalId);
    clearInterval(intervalId2);
    clearInterval(timer);

    let puan = 0;
    let yesilSayi = 0;
    let sariSayi = 0;

    for (let i = 0; i < setWord.length; i++) {
        if (roomKind == "RHSU" && i == randomIndex) {
            continue;
        } else if (setWord[i] == word[i]) {
            yesilSayi++;
        } else if (setWord[i].trim().length != 0 && word.includes(setWord[i])) {
            sariSayi++;
        }
    }
    puan = sariSayi * 10 + yesilSayi * 5;

    fetch('http://' + Ip + ':5000/getPlayersGame', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.process) {
                console.log("gelen: " + JSON.stringify(data));
                if (data.playerGames[0]?.player1Id == thisUserId) {
                  puan = puan + parseInt(data.playerGames[0]?.player1Countdown);
                } else if (data.playerGames[0]?.player2Id == thisUserId) {
                  puan = puan + parseInt(data.playerGames[0]?.player2Countdown);
                }
            } else {
                setError(data.message);
            }
            console.log("updateGamePoint(puan): "+puan);
            updateGamePoint(puan);
        })
        .catch(error => {
            console.error('API error:', error);
            setError('API error:', error);
            throw error;
        });

    const updateGamePoint = (puan) => {

        fetch('http://' + Ip + ':5000/updateGamePoint', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    playerId: thisUserId,
                    playerSetWord: setWord,
                    point: puan,
                    playerGuessTime:60-countdown
                }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.process) {
                    navigation.navigate("ResultPage", {
                        thisUserId:thisUserId,
                        randomIndex: randomIndex,
                        word: word,
                        sWord: setWord,
                        onaylaButonSayac: onaylaButonSayac,
                        userId: thisUserId,
                        roomName: roomName,
                        roomKind: roomKind,
                        roomId: roomId,
                        gameId: gameId,
                        otherUserId:otherUserId
                    });
                }
            });
    };
};


  const oyunDurumGuncelle=()=>{
    fetch('http://'+Ip+':5000/gameFinishedStatus', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        roomId:roomId,
        status:true
      }),
    })
    .then(response => response.json())
    .then(data => {
      if(data.process){
        console.log("Süre bitti oyundan çıkıldı.");
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


  const InputControl = () => {
    if(onaylaButonSayac>InputCount){
      return;
    }

    let setWord;
    if(onaylaButonSayac==1){
      setWord = inputValues.map(value => value === "" ? " " : value).join("");
    }
    else if(onaylaButonSayac==2){
      setWord = inputValues2.map(value => value === "" ? " " : value).join("");
    }
    else if(onaylaButonSayac==3){
      setWord = inputValues3.map(value => value === "" ? " " : value).join("");
    }
    else if(onaylaButonSayac==4){
      setWord = inputValues4.map(value => value === "" ? " " : value).join("");
    }
    else if(onaylaButonSayac==5){
      setWord = inputValues5.map(value => value === "" ? " " : value).join("");
    }
    else if(onaylaButonSayac==6){
      setWord = inputValues6.map(value => value === "" ? " " : value).join("");
    }
    else if(onaylaButonSayac==7){
      setWord = inputValues7.map(value => value === "" ? " " : value).join("");
    }



    if(countdown==0){     
      oyunDurumGuncelle();
      clearInterval(intervalId);
      clearInterval(timer);
      savePlayerWord(setWord);
    }

    //diğer oyuncu çıkmış ise oyundan çık
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
        if(data.playerGames[0]?.isGameFinished){
          clearInterval(intervalId);
          clearInterval(timer);
          savePlayerWord(setWord);
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

    let greenBIndexes=[];
    let grayBIndexes=[];
    let yellowBIndexes=[];
    //console.log("setWord: "+setWord+" word: "+word);
    if (word == setWord) {
      console.log("Girilen kelime doğru");
      
      if(onaylaButonSayac==1){
        SetInputDisable(true);
        for (let i = 0; i < word.length; i++) {
          {
            greenBIndexes.push(i);
          }
          SetGreenBox(greenBIndexes);
         } 
      }else if(onaylaButonSayac==2){
        SetInputDisable2(true);
        for (let i = 0; i < word.length; i++) {
          {
            greenBIndexes.push(i);
          }
          SetGreenBox2(greenBIndexes);
         } 
      }else if(onaylaButonSayac==3){
        SetInputDisable3(true);
        for (let i = 0; i < word.length; i++) {
          {
            greenBIndexes.push(i);
          }
          SetGreenBox3(greenBIndexes);
         } 
      }else if(onaylaButonSayac==4){
        SetInputDisable4(true);
        for (let i = 0; i < word.length; i++) {
          {
            greenBIndexes.push(i);
          }
          SetGreenBox4(greenBIndexes);
         } 
      }else if(onaylaButonSayac==5){
        SetInputDisable5(true);
        for (let i = 0; i < word.length; i++) {
          {
            greenBIndexes.push(i);
          }
          SetGreenBox5(greenBIndexes);
         } 
      }else if(onaylaButonSayac==6){
        SetInputDisable6(true);
        for (let i = 0; i < word.length; i++) {
          {
            greenBIndexes.push(i);
          }
          SetGreenBox6(greenBIndexes);
         } 
      }else if(onaylaButonSayac==7){
        SetInputDisable7(true);
        for (let i = 0; i < word.length; i++) {
          {
            greenBIndexes.push(i);
          }
          SetGreenBox7(greenBIndexes);
         } 
      }

      oyunDurumGuncelle();
      //kelime doğru ise oyundan çık
      clearInterval(intervalId);
      clearInterval(timer);
      savePlayerWord(setWord);

    }
    else 
    {
      console.log("Girilen kelime yanlış");
      
      if(onaylaButonSayac==1){
        SetInputDisable(true);
        for (let i = 0; i < inputValues.length; i++) {
          if(roomKind=="RHSU" && i==randomIndex){
            //grayBIndexes.push(i);
          }
          else if(inputValues[i] == word[i]) {
            greenBIndexes.push(i);
          } else if (inputValues[i].trim().length!=0 && word.includes(inputValues[i])) {
            yellowBIndexes.push(i);
          }else{
            grayBIndexes.push(i);
          }
        }
        SetGreenBox(greenBIndexes);
        SetGrayBox(grayBIndexes);
        SetYellowBox(yellowBIndexes);
      }
      else if(onaylaButonSayac==2){
        SetInputDisable2(true);
        for (let i = 0; i < inputValues2.length; i++) {
          if(roomKind=="RHSU" && i==randomIndex){
            //grayBIndexes.push(i);
          }
          else if(inputValues2[i] == word[i]) {
            greenBIndexes.push(i);
          } else if (inputValues2[i].trim().length!=0 && word.includes(inputValues2[i])) {
            yellowBIndexes.push(i);
          }else{
            grayBIndexes.push(i);
          }
        }
        SetGreenBox2(greenBIndexes);
        SetGrayBox2(grayBIndexes);
        SetYellowBox2(yellowBIndexes);
      }
      else if(onaylaButonSayac==3){
        SetInputDisable3(true);
        for (let i = 0; i < inputValues3.length; i++) {
          if(roomKind=="RHSU" && i==randomIndex){
            //grayBIndexes.push(i);
          }
          else if(inputValues3[i] == word[i]) {
            greenBIndexes.push(i);
          } else if (inputValues3[i].trim().length!=0 && word.includes(inputValues3[i])) {
            yellowBIndexes.push(i);
          }else{
            grayBIndexes.push(i);
          }
        }
        SetGreenBox3(greenBIndexes);
        SetGrayBox3(grayBIndexes);
        SetYellowBox3(yellowBIndexes);
      }
      else if(onaylaButonSayac==4){
        SetInputDisable4(true);
        for (let i = 0; i < inputValues4.length; i++) {
          if(roomKind=="RHSU" && i==randomIndex){
            //grayBIndexes.push(i);
          }
          else if(inputValues4[i] == word[i]) {
            greenBIndexes.push(i);
          } else if (inputValues4[i].trim().length!=0 && word.includes(inputValues4[i])) {
            yellowBIndexes.push(i);
          }else{
            grayBIndexes.push(i);
          }
        }
        SetGreenBox4(greenBIndexes);
        SetGrayBox4(grayBIndexes);
        SetYellowBox4(yellowBIndexes);
      }
      else if(onaylaButonSayac==5){
        SetInputDisable5(true);
        for (let i = 0; i < inputValues5.length; i++) {
          if(roomKind=="RHSU" && i==randomIndex){
            //grayBIndexes.push(i);
          }
          else if(inputValues5[i] == word[i]) {
            greenBIndexes.push(i);
          } else if (inputValues5[i].trim().length!=0 && word.includes(inputValues5[i])) {
            yellowBIndexes.push(i);
          }else{
            grayBIndexes.push(i);
          }
        }
        SetGreenBox5(greenBIndexes);
        SetGrayBox5(grayBIndexes);
        SetYellowBox5(yellowBIndexes);
      }
      else if(onaylaButonSayac==6){
        SetInputDisable6(true);
        for (let i = 0; i < inputValues6.length; i++) {
          if(roomKind=="RHSU" && i==randomIndex){
            //grayBIndexes.push(i);
          }
          else if(inputValues6[i] == word[i]) {
            greenBIndexes.push(i);
          } else if (inputValues6[i].trim().length!=0 && word.includes(inputValues6[i])) {
            yellowBIndexes.push(i);
          }else{
            grayBIndexes.push(i);
          }
        }
        SetGreenBox6(greenBIndexes);
        SetGrayBox6(grayBIndexes);
        SetYellowBox6(yellowBIndexes);
      }
      else if(onaylaButonSayac==7){
        SetInputDisable7(true);
        for (let i = 0; i < inputValues7.length; i++) {
          if(roomKind=="RHSU" && i==randomIndex){
            //grayBIndexes.push(i);
          }
          else if(inputValues7[i] == word[i]) {
            greenBIndexes.push(i);
          } else if (inputValues7[i].trim().length!=0 && word.includes(inputValues7[i])) {
            yellowBIndexes.push(i);
          }else{
            grayBIndexes.push(i);
          }
        }
        SetGreenBox7(greenBIndexes);
        SetGrayBox7(grayBIndexes);
        SetYellowBox7(yellowBIndexes);
      }
    
      let oButonSayac=onaylaButonSayac;
      oButonSayac=oButonSayac+1;
  
      if(oButonSayac>InputCount){
        SetOnaylaButonDisabled(true);
        oButonSayac=oButonSayac-1;
      }
  
      SetOnaylaButonSayac(oButonSayac);
    }

    console.log("grayBIndexes: "+grayBIndexes);
    console.log("yellowBIndexes: "+yellowBIndexes);
    console.log("greenBIndexes: "+greenBIndexes);
  };
  
  const ChangeText = (text, index) => {
    //console.log("ChangeText-onaylaButonSayac: "+onaylaButonSayac);
    if(onaylaButonSayac==1){
      const newInputValue = [...inputValues];
      newInputValue[index] = text;
      setInputValues(newInputValue);
    }
    else if(onaylaButonSayac==2){
      const newInputValue = [...inputValues2];
      newInputValue[index] = text;
      setInputValues2(newInputValue);
    }
    else if(onaylaButonSayac==3){
      const newInputValue = [...inputValues3];
      newInputValue[index] = text;
      setInputValues3(newInputValue);
    }
    else if(onaylaButonSayac==4){
      const newInputValue = [...inputValues4];
      newInputValue[index] = text;
      setInputValues4(newInputValue);
    }
    else if(onaylaButonSayac==5){
      const newInputValue = [...inputValues5];
      newInputValue[index] = text;
      setInputValues5(newInputValue);
    }
    else if(onaylaButonSayac==6){
      const newInputValue = [...inputValues6];
      newInputValue[index] = text;
      setInputValues6(newInputValue);
    }
    else if(onaylaButonSayac==7){
      const newInputValue = [...inputValues7];
      newInputValue[index] = text;
      setInputValues7(newInputValue);
    }

  };

  const inputFields = inputValues.map((value, index) => (
    <TextInput
      key={index.toString()}
      style={[
        styles.input,
        greenBox.includes(index) && styles.greenInput,
        yellowBox.includes(index) && styles.yellowInput,
        grayBox.includes(index) && styles.grayInput,
      ]}
      value={value}
      onChangeText={(text) => ChangeText(text, index)}
      editable={!inputDisable}
    />
  )); 

  const inputFields2 = inputValues2.map((value, index) => (
    <TextInput
      key={index.toString()}
      style={[
        styles.input,
        greenBox2.includes(index) && styles.greenInput,
        yellowBox2.includes(index) && styles.yellowInput,
        grayBox2.includes(index) && styles.grayInput,
      ]}
      value={value}
      onChangeText={(text) => ChangeText(text, index)}
      editable={!inputDisable2}
    />
  )); 

  const inputFields3 = inputValues3.map((value, index) => (
    <TextInput
      key={index.toString()}
      style={[
        styles.input,
        greenBox3.includes(index) && styles.greenInput,
        yellowBox3.includes(index) && styles.yellowInput,
        grayBox3.includes(index) && styles.grayInput,
      ]}
      value={value}
      onChangeText={(text) => ChangeText(text, index)}
      editable={!inputDisable3}
    />
  )); 

  const inputFields4 = inputValues4.map((value, index) => (
    <TextInput
      key={index.toString()}
      style={[
        styles.input,
        greenBox4.includes(index) && styles.greenInput,
        yellowBox4.includes(index) && styles.yellowInput,
        grayBox4.includes(index) && styles.grayInput,
      ]}
      value={value}
      onChangeText={(text) => ChangeText(text, index)}
      editable={!inputDisable4}
    />
  )); 


  const inputFields5 = inputValues5.map((value, index) => (
    <TextInput
      key={index.toString()}
      style={[
        styles.input,
        greenBox5.includes(index) && styles.greenInput,
        yellowBox5.includes(index) && styles.yellowInput,
        grayBox5.includes(index) && styles.grayInput,
      ]}
      value={value}
      onChangeText={(text) => ChangeText(text, index)}
      editable={!inputDisable5}
    />
  )); 


  const inputFields6 = inputValues6.map((value, index) => (
    <TextInput
      key={index.toString()}
      style={[
        styles.input,
        greenBox6.includes(index) && styles.greenInput,
        yellowBox6.includes(index) && styles.yellowInput,
        grayBox6.includes(index) && styles.grayInput,
      ]}
      value={value}
      onChangeText={(text) => ChangeText(text, index)}
      editable={!inputDisable6}
    />
  )); 


  const inputFields7 = inputValues7.map((value, index) => (
    <TextInput
      key={index.toString()}
      style={[
        styles.input,
        greenBox7.includes(index) && styles.greenInput,
        yellowBox7.includes(index) && styles.yellowInput,
        grayBox7.includes(index) && styles.grayInput,
      ]}
      value={value}
      onChangeText={(text) => ChangeText(text, index)}
      editable={!inputDisable7}
    />
  )); 

  return (
    <View style={styles.container}>
     <View style={onaylaButonSayac>=1 && onaylaButonSayac<=InputCount? styles.inputContainer : null}>
        {onaylaButonSayac>=1 && inputFields}
      </View>
    
      <View style={onaylaButonSayac>=2 && onaylaButonSayac<=InputCount? styles.inputContainer : null}>
        {onaylaButonSayac>=2 && inputFields2}
      </View>

      <View style={onaylaButonSayac>=3 && onaylaButonSayac<=InputCount? styles.inputContainer : null}>
        {onaylaButonSayac>=3 && inputFields3}
      </View>

      <View style={onaylaButonSayac>=4 && onaylaButonSayac<=InputCount ? styles.inputContainer : null}>
        {onaylaButonSayac>=4 && inputFields4}
      </View>

      <View style={onaylaButonSayac>=5 && onaylaButonSayac<=InputCount ? styles.inputContainer : null}>
        {onaylaButonSayac>=5 && inputFields5}
      </View>

      <View style={onaylaButonSayac>=6 && onaylaButonSayac<=InputCount ? styles.inputContainer : null}>
        {onaylaButonSayac>=6 && inputFields6}
      </View>

      <View style={onaylaButonSayac>=7 && onaylaButonSayac<=InputCount? styles.inputContainer : null}>
        {onaylaButonSayac>=7 && inputFields7}
      </View>

      <TouchableOpacity
            onPress={onaylaButonDisabled ? null : InputControl}
        style={[styles.button, styles.confirmButton, onaylaButonDisabled && styles.disabledButton]}
        disabled={onaylaButonDisabled}>
        <Text style={styles.text}>{onaylaButonText}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={leaveGame} style={[styles.button, styles.leaveButton]}>
        <Text style={styles.text}>Oyundan Çık</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.countdownButton]}>
        <Text style={styles.text}>Süre: {countdown}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default GamePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20
  },
  input: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    marginHorizontal: 5,
    textAlign: 'center',
    color: 'black',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 50,
    marginVertical: 10,
    borderRadius: 10,
  },
  countdownButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#ccc',
    width: 100,
    height: 40,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  text: {
    color: 'black',
    fontSize: 17,
  },
  leaveButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#ccc',
    width: 120,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  grayInput: {
    backgroundColor: 'gray',
    color: 'white',
  },
  yellowInput: {
    backgroundColor: '#fcbc36',
    color: 'white',
  },
  greenInput: {
    backgroundColor: 'green',
    color: 'white',
  },
  confirmButton: {
    backgroundColor: 'green',
    color: 'black',
  },
  disabledButton: {
    backgroundColor: 'gray',
    color: 'black',
  },
});
