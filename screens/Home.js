import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import axios from 'axios';

const Home = ({navigation}) => {
  const [users, setUsers] = useState([]);
  function logout() {
    navigation.navigate('Login');
  }
  useEffect(() => {
    let config = {
      method: 'get',
      url: 'http://localhost:3000/api/users',
      headers: {},
    };

    axios(config)
      .then(response => {
        //console.log(JSON.stringify(response.data));
        setUsers(response.data.data);
      })
      .catch(error => {
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
                <View style={styles.renderView}>
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
      <TouchableOpacity onPress={logout} style={styles.btnTouch}>
        <Text style={styles.btnTxt}>Logout</Text>
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
    borderWidth: 0.5,
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
