import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {setUsers} from '../@redux/app/action';
import {baseUrl} from '../helpers/baseUrl';

const Home = ({navigation}) => {
  const userToken = useSelector(state => state.app.userToken);
  const userInfo = useSelector(state => state.app.userInfo);
  const [userList, setUserList] = useState([]);
  const dispatch = useDispatch();

  const showAlert = (errTitle, errInfo) => {
    Alert.alert(errTitle, errInfo, [{text: 'OK'}]);
  };

  const deleteAlert = () => {
    if (userInfo.isAdmin) {
      Alert.alert(
        'Tüm kullanıcıları silmek istediğinizden emin misiniz?',
        'Bu işlem geri alınamaz!',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {text: 'OK', onPress: () => deleteAll()},
        ],
      );
    } else {
      Alert.alert(
        '',
        'Kullanıcı listesini silmek için gerekli yetkiye sahip değilsiniz.',
        [
          {
            text: 'OK',
          },
        ],
      );
    }
  };

  function goProfile() {
    navigation.navigate('Profile');
  }

  function deleteAll() {
    var config = {
      method: 'get',
      url: `${baseUrl}:3000/api/users/deleteAll`,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };

    axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        setTimeout(() => {
          showAlert('', response.data.message);
          setTimeout(() => {
            saveUsers();
          }, 500);
        }, 1000);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function saveUsers() {
    var config = {
      method: 'get',
      url: `${baseUrl}:3000/api/users`,
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
    };

    axios(config)
      .then(function (response) {
        dispatch(setUsers(response.data.data));
        setUserList(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function deleteOneUser(id, admin) {
    if (admin == true) {
      Alert.alert('', 'Başka bir admini silemezsiniz!', [{text: 'OK'}]);
    } else {
      Alert.alert(
        'Bu kullanıcıyı silmek istediğinizden emin misiniz?',
        'Bu işlem geri alınamaz!',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              var config = {
                method: 'delete',
                url: `${baseUrl}:3000/api/users/${id}`,
                headers: {
                  Authorization: `Bearer ${userToken}`,
                },
              };

              axios(config)
                .then(function (response) {
                  if (id == userInfo._id) {
                    setTimeout(() => {
                      showAlert('', response.data.message);
                      setTimeout(() => {
                        navigation.navigate('Login');
                      }, 500);
                    }, 1000);
                  } else {
                    setTimeout(() => {
                      showAlert('', response.data.message);
                      setTimeout(() => {
                        saveUsers();
                      }, 500);
                    }, 1000);
                  }
                })
                .catch(function (error) {
                  console.log(error);
                });
            },
          },
        ],
      );
    }
  }

  useEffect(() => {
    saveUsers();
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.screenTitle}>User List</Text>
      <View style={styles.flatView}>
        {userInfo.isAdmin ? (
          <ScrollView>
            {userList?.map((item, index) => {
              return (
                <View key={index}>
                  <View
                    style={[
                      styles.renderView,
                      userInfo.email == item.email
                        ? {borderColor: 'red'}
                        : {borderColor: 'black'},
                    ]}>
                    <View style={styles.deleteView}>
                      <Text style={styles.renderTitle}>User {index + 1}</Text>
                      <TouchableOpacity
                        onPress={() => {
                          deleteOneUser(item._id, item.isAdmin);
                        }}>
                        <Image
                          style={styles.deleteIcon}
                          source={require('../assets/delete2.png')}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.renderLine}></View>
                    <Text style={styles.renderTxt}>{item.name}</Text>
                    <Text style={styles.renderTxt}>{item.surname}</Text>
                    <Text style={styles.renderTxt}>{item.email}</Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        ) : (
          <View style={styles.messageView}>
            <Text style={styles.messageTxt}>
              Kullanıcı listesini görüntülemek için gerekli yetkiye sahip
              değilsiniz.
            </Text>
          </View>
        )}
      </View>
      <TouchableOpacity onPress={goProfile} style={styles.btnTouch}>
        <Text style={styles.btnTxt}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={deleteAlert} style={styles.btnTouch}>
        <Text style={styles.btnTxt}>Delete Users</Text>
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
    marginTop: 10,
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
  messageView: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
  },
  messageTxt: {
    fontSize: 20,
    fontWeight: '600',
  },
  deleteView: {
    flexDirection: 'row',
  },
  deleteIcon: {
    height: 30,
    width: 25,
    marginLeft: 150,
  },
});
