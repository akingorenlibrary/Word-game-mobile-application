import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginPage from './src/screens/loginPage';
import SignupPage from './src/screens/singupPage';
import RoomPage from './src/screens/roomPage';
import GamePage from './src/screens/gamePage';
import GameKindChoosePage from "./src/screens/gameKindChoosePage";
import GameLetterChosePage from "./src/screens/gameLetterChoosePage";
import AddWordsPage from "./src/screens/addwordsPage";
import ResultPage from './src/screens/resultPage';

const Stack = createStackNavigator();

const HomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
       <Text style={styles.loginLogo}>Kelime Oyunu</Text>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.loginText}>Giriş Yap</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.signupBtn}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={styles.loginText}>Kayıt Ol</Text>
      </TouchableOpacity>
    </View>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ title: 'Anasayfa' }}
        />
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{ title: 'Giriş' }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupPage}
          options={{ title: 'Kayıt ol' }}
        />
        <Stack.Screen
          name="RoomPage"
          component={RoomPage}
          options={{ title: 'Odalar' }}
        />
        <Stack.Screen
          name="GamePage"
          component={GamePage}
          options={{ title: 'Oyun' }}
        />
         <Stack.Screen
          name="GameKindChoosePage"
          component={GameKindChoosePage}
          options={{ title: 'Oyun Türü Seçimi' }}
        />
        <Stack.Screen
          name="GameLetterChosePage"
          component={GameLetterChosePage}
          options={{ title: 'Harf Sayısı Seçimi' }}
        />
        <Stack.Screen
          name="AddWordsPage"
          component={AddWordsPage}
          options={{ title: 'Kelimeler Girin' }}
        />
        <Stack.Screen
          name="ResultPage"
          component={ResultPage}
          options={{ title: 'Sonuç' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
  loginLogo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: 'black',
    marginBottom: 40,
  },
});
