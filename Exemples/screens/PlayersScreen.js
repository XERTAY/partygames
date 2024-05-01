import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, ScrollView, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { usePlayers } from './../databases/PlayerContext'; // Importez usePlayers depuis le contexte PlayerContext

const PlayerScreen = () => {
  const { playerList, addPlayer, removePlayer, setPlayerList } = usePlayers();
  const [addPlayerName, setAddPlayerName] = useState('');

  useEffect(() => {
    const loadPlayerList = async () => {
      try {
        const storedPlayers = await AsyncStorage.getItem('playerList');
        if (storedPlayers !== null) {
          setPlayerList(JSON.parse(storedPlayers));
        }
      } catch (error) {
        console.error('Erreur lors du chargement des joueurs :', error);
      }
    };

    loadPlayerList();
  }, []);

  const handleInputChange = (id, name) => {
    const newPlayerList = playerList.map((player) =>
      player.id === id ? { ...player, name } : player
    );
    setPlayerList(newPlayerList);
  };

  const handleGoButtonPress = async () => {
    try {
      // Sauvegarde de la liste des joueurs dans AsyncStorage
      await AsyncStorage.setItem('playerList', JSON.stringify(playerList));
      console.log('Liste des joueurs sauvegardée avec succès.');

      // Affichage de la liste des joueurs dans la console
      console.log('Liste des joueurs :', playerList);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la liste des joueurs :', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TextInput
          style={styles.input}
          placeholder="Pseudo du joueur"
          value={addPlayerName}
          onChangeText={(text) => setAddPlayerName(text)}
        />
        <TouchableOpacity onPress={() => addPlayer(addPlayerName)} style={styles.addButton}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {playerList.map((player) => (
          <View key={player.id} style={styles.playerContainer}>
            <View style={styles.playerInputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Pseudo du joueur"
                value={player.name}
                onChangeText={(text) => handleInputChange(player.id, text)}
              />
              <TouchableOpacity onPress={() => removePlayer(player.id)} style={styles.removeButton}>
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity onPress={handleGoButtonPress} style={styles.goButton}>
        <Text style={styles.buttonText}>GO</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  scrollView: {
    flex: 1,
    maxHeight: '70%',
  },
  scrollContent: {
    flexGrow: 1,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  goButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
  playerInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default PlayerScreen;
