import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function login() {
    navigation.navigate('Home');
  }

  function goRegister() {
    navigation.navigate('Register');
  }

  function goForgot() {
    navigation.navigate('Forgot');
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.inputContainer}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder="email"
            onChangeText={text => setEmail(text)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder="password"
            onChangeText={text => setPassword(text)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={login} style={styles.btnTouch}>
          <Text style={styles.btnTxt}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goRegister} style={styles.btnTouch}>
          <Text style={styles.btnTxt}>Register</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.forgotContainer}>
        <TouchableOpacity onPress={goForgot} style={styles.forgotTouch}>
          <Text style={styles.forgotTxt}>Forgot Password</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EBEBEB',
  },
  inputContainer: {},
  inputView: {
    backgroundColor: 'lightgrey',
    padding: 10,
    marginTop: 10,
    width: 250,
    height: 50,
    justifyContent: 'center',
    borderWidth: 0.5,
  },
  input: {
    color: 'white',
    fontSize: 20,
  },
  btnContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  btnTouch: {
    marginRight: 10,
    marginLeft: 10,
  },
  btnTxt: {
    fontSize: 20,
  },
  forgotContainer: {
    marginTop: 15,
  },
  forgotTouch: {},
  forgotTxt: {
    fontSize: 13,
    color: 'red',
  },
});
