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
import {baseUrl} from '../helpers/baseUrl';

const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  function register() {
    let data = JSON.stringify({
      name: name,
      surname: surname,
      email: email,
      password: password,
    });

    let config = {
      method: 'post',
      url: `${baseUrl}:3000/api/users/register`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
      })
      .catch(error => {
        console.log(error);
      });

    setTimeout(() => {
      navigation.navigate('Login');
    }, 500);
  }

  function goLogin() {
    navigation.navigate('Login');
  }
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.inputContainer}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={text => setName(text)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder="Surname"
            onChangeText={text => setSurname(text)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={text => setEmail(text)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={text => setPassword(text)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={register} style={styles.btnTouch}>
          <Text style={styles.btnTxt}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goLogin} style={styles.btnTouch}>
          <Text style={[styles.btnTxt, {color: 'red'}]}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Register;

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
    height: 80,
    justifyContent: 'center',
    borderWidth: 1,
  },
  input: {
    color: 'black',
    fontSize: 20,
  },
  btnContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  btnTouch: {
    marginTop: 10,
  },
  btnTxt: {
    fontSize: 20,
  },
});
