// Import des modules nécessaires depuis React et React Native
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const App = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenue sur la page React Native avec SQLite!</Text>
      <Button title="Insérer des données"/>
      <Text>test</Text>
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
    padding: 16,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
});

// Export du composant pour pouvoir l'utiliser dans d'autres fichiers
export default App;
