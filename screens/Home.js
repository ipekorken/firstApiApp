import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {setUsers} from '../@redux/app/action';
import {baseUrl} from '../helpers/baseUrl';

const Home = ({navigation}) => {
  const userInfo = useSelector(state => state.app.userInfo);
  const users = useSelector(state => state.app.users);

  const dispatch = useDispatch();

  function goProfile() {
    navigation.navigate('Profile');
  }
  useEffect(() => {
    var config = {
      method: 'get',
      url: `${baseUrl}:3000/api/users`,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        dispatch(setUsers(response.data.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.screenTitle}>Home Screen</Text>
      <View style={styles.flatView}>
        <ScrollView>
          {users.map((item, index) => {
            return (
              <View key={index}>
                <View
                  style={[
                    styles.renderView,
                    userInfo.email == item.email
                      ? {borderColor: 'red'}
                      : {borderColor: 'black'},
                  ]}>
                  <Text style={styles.renderTitle}>User {index + 1}</Text>
                  <View style={styles.renderLine}></View>
                  <Text style={styles.renderTxt}>{item.name}</Text>
                  <Text style={styles.renderTxt}>{item.surname}</Text>
                  <Text style={styles.renderTxt}>{item.email}</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
      <TouchableOpacity onPress={goProfile} style={styles.btnTouch}>
        <Text style={styles.btnTxt}>Profile</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EBEBEB',
  },
  flatView: {
    backgroundColor: 'lightgrey',
    height: 300,
    width: 300,
    borderWidth: 1,
    borderColor: 'grey',
    marginTop: 20,
    marginBottom: 10,
  },
  screenTitle: {
    fontSize: 30,
  },
  btnTouch: {
    marginTop: 20,
  },
  btnTxt: {
    fontSize: 20,
  },
  renderView: {
    borderWidth: 2,
    padding: 10,
    margin: 20,
  },
  renderTitle: {
    fontSize: 18,
    color: 'red',
  },
  renderTxt: {
    fontSize: 16,
  },
  renderLine: {
    borderWidth: 0.2,
    height: 1,
    marginTop: 3,
    marginBottom: 5,
  },
});
