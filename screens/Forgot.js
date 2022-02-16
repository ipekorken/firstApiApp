import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

const Forgot = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  function forgot() {
    navigation.navigate('Login');
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
            placeholder="Email"
            onChangeText={text => setEmail(text)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={forgot} style={styles.btnTouch}>
          <Text style={styles.btnTxt}>Forgot</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goLogin} style={styles.btnTouch}>
          <Text style={[styles.btnTxt, {color: 'red'}]}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Forgot;

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
    color: 'white',
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
