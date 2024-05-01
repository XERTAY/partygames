// App.js

import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ToD from './screens/ToD';
import PlayersScreen from './screens/PlayersScreen';
import { PlayerProvider } from './databases/PlayerContext'; // Importez le PlayerProvider

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
  }, []);

  return (
    <PlayerProvider>
      <NavigationContainer>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ToD" component={ToD} options={{ headerShown: false }} />
          <Stack.Screen name="PlayersScreen" component={PlayersScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PlayerProvider>
  );
};

export default App;
