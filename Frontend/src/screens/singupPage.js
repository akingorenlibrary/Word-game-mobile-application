import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const SignupPage = ({ navigation }) => {
  const Ip="192.168.234.47";
  const getUsersRequest='http://'+Ip+':5000/getUsers'
  const singupRequest='http://'+Ip+':5000/singup';
  const updateUserStatusRequest="http://"+Ip+":5000/updateUserStatusByUsername";
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');
  const [error, setError] = useState('');
  const [userId, setUserid] = useState('');

  const getUserInfo=()=>{
    fetch(getUsersRequest, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.process) {
        const user = data.users.find(u => u.username==username);
        setUserid(user._id);
        navigation.navigate("GameKindChoosePage", { userId: user._id });
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


  const singupControl = async() => {
    console.log('Logging in with:', username, password,name,lastname);
  
    if (username === "" || password === ""  || name=== ""  || lastname === "") {
      setError('Bilgileri boş bırakmayın.');
      return;
    }

    fetch(singupRequest, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        surname: lastname,
        username: username,
        password: password,
      }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.process) {
        console.log("response: "+JSON.stringify(data)); 
        getUserInfo();
      }else{
        setError("Giriş başarısız.");
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
      <Text style={styles.loginLogo}>Kayıt Ol</Text>
      
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Ad"
          placeholderTextColor="#003f5c"
          onChangeText={text => setName(text)}
        />
      </View>
        <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Soyad"
          placeholderTextColor="#003f5c"
          onChangeText={text => setLastName(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Kullanıcı Adı"
          placeholderTextColor="#003f5c"
          onChangeText={text => setUsername(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Şifre"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />
      </View>
    
      <TouchableOpacity style={styles.signupBtn} onPress={() => singupControl()}>
      <Text style={styles.loginText}>Kayıt Ol</Text>
      </TouchableOpacity>


      {error !== '' && (
        <View style={styles.errorView}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

export default SignupPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginLogo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: 'black',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    borderRadius: 10,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'black',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    paddingLeft: 10,
  },
  loginBtn: {
    width: '75%',
    backgroundColor: 'black',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  signupBtn: {
    width: '75%',
    backgroundColor: 'black',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
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
