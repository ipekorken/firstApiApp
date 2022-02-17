import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './routes/StackNavigation';
import {Provider} from 'react-redux';
import store from './@redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
