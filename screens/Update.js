import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {setUserInfo} from '../@redux/app/action';
import {baseUrl} from '../helpers/baseUrl';

const Update = ({navigation}) => {
  const userToken = useSelector(state => state.app.userToken);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  function saveInfo() {
    var data = JSON.stringify({
      name: name,
      surname: surname,
      email: email,
      password: password,
    });

    var config = {
      method: 'patch',
      url: `${baseUrl}:3000/api/users/update`,
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        dispatch(setUserInfo(response.data));
        backProfile();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function backProfile() {
    navigation.navigate('Profile');
  }

  return (
    <SafeAreaView style={styles.modalScreen}>
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
        <TouchableOpacity onPress={saveInfo} style={styles.btnTouch}>
          <Text style={styles.btnTxt}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={backProfile} style={styles.btnTouch}>
          <Text style={[styles.btnTxt, {color: 'red'}]}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Update;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EBEBEB',
  },
  screenTitle: {
    fontSize: 30,
  },
  btnTouch: {
    marginTop: 10,
  },
  btnTxt: {
    fontSize: 20,
  },
  infoContainer: {
    marginTop: 20,
    backgroundColor: 'lightgrey',
    width: 300,
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    marginBottom: 20,
  },
  infoView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  info: {
    fontSize: 16,
  },
  pencilIcon: {
    height: 18,
    width: 18,
    marginLeft: 8,
  },
  edit: {
    flexDirection: 'row',
    alignItems: 'center',
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
  modalScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EBEBEB',
  },
});
