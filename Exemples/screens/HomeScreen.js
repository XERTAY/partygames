// screens/HomeScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const goToToD = () => {
    navigation.navigate('ToD');
  };
  const goToTest = () => {
    navigation.navigate('TestScreen');
  };
  const goToPlayer = () => {
    navigation.navigate('PlayerScreen');
  };


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="Go to ToD" onPress={goToToD} />
      <Button title="Go to Test" onPress={goToTest} />
      <Button title="Go to Player" onPress={goToPlayer} />
    </View>
  );
};

export default HomeScreen;
