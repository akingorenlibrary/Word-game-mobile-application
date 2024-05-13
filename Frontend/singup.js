// Signup.js

import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Signup from './Signup';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      surname: '',
      username: '',
      password: '',
      error: ''
    };
  }

  signupControl = async () => {
    if (this.state.name === "" || this.state.surname === "" || this.state.username === "" || this.state.password === "") {
      this.setState({ error: 'Tüm alanlar doldurulmalıdır.' });
      return;
    }

    // Your signup logic here...
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.loginLogo}>Kelime Oyunu - Kayıt Ol</Text>

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Ad"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({ name: text })}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Soyad"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({ surname: text })}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Kullanıcı Adı"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({ username: text })}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Şifre"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(text) => this.setState({ password: text })}
          />
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={this.signupControl}>
          <Text style={styles.loginText}>Kayıt Ol</Text>
        </TouchableOpacity>

        {this.state.error !== '' && (
          <View style={styles.errorView}>
            <Text style={styles.errorText}>{this.state.error}</Text>
          </View>
        )}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginLogo: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    marginBottom: 20,
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
