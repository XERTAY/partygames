// Import des modules nécessaires depuis React et React Native
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Définition du composant de la page
const TestScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenue sur Ma Page React Native !</Text>
    </View>
  );
};

// Styles pour le composant
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});

// Export du composant pour pouvoir l'utiliser dans d'autres fichiers
export default TestScreen;
