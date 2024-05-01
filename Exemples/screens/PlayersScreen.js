import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, ScrollView, Text, StyleSheet, Alert } from 'react-native';
import Database from './../databases/Database'; // Make sure to import your Database.js file correctly

const AddPlayerScreen = () => {
  const [playerList, setPlayerList] = useState([{ id: 1, name: '' }]);
  const [addPlayerName, setAddPlayerName] = useState('');

  const addPlayer = () => {
    const newPlayerList = [...playerList, { id: Date.now(), name: addPlayerName }];
    setPlayerList(newPlayerList);
    setAddPlayerName('');
  };

  const removePlayer = async (id, retries = 3) => {
    try {
      await Database.init(); // Initialize the database if not already done

      await new Promise((resolve) => setTimeout(resolve, 1000)); // Introduce a delay

      await new Promise(async (resolve, reject) => {
        try {
          await Database.removePlayer(id, (rowsAffected) => {
            console.log(`Player removed with ID ${id}, Rows affected: ${rowsAffected}`);
            resolve();
          }, reject);
        } catch (error) {
          console.error(`Error removing player with ID ${id}:`, error);
          if (retries > 0) {
            console.log(`Retrying... (${retries} retries left)`);
            await new Promise(resolve => setTimeout(resolve, 1000));
            await removePlayer(id, retries - 1);
          } else {
            reject(error);
          }
        }
      });

      console.log(`Player with ID ${id} removed successfully`);
    } catch (error) {
      console.error(`Error removing player with ID ${id}:`, error);
    }
  };

  const handleInputChange = (id, name) => {
    const newPlayerList = playerList.map((player) =>
      player.id === id ? { ...player, name } : player
    );
    setPlayerList(newPlayerList);
  };

  const handleGoButtonPress = async () => {
    try {
      await Database.init(); // Initialize the database if not already done

      for (const player of playerList) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Introduce a delay

        if (player.name) {
          await new Promise((resolve, reject) => {
            Database.addPlayer(player.name, (insertId) => {
              console.log(`Player added with ID: ${insertId}`);
              resolve();
            }, reject);
          });
        }
      }

      Alert.alert('Registration successful', 'Players have been added to the database.');
    } catch (error) {
      console.error('Error adding players:', error);
      Alert.alert('Error', 'An error occurred while adding players.');
    }
  };

  useEffect(() => {
    const resetDatabase = async () => {
      try {
        await Database.init(); // Initialize the database if not already done

        for (const player of playerList) {
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Introduce a delay

          await new Promise((resolve, reject) => {
            Database.removePlayer(player.id, (rowsAffected) => {
              console.log(`Player removed with ID ${player.id}, Rows affected: ${rowsAffected}`);
              resolve();
            }, reject);
          });
        }

        console.log('All players removed successfully');
      } catch (error) {
        console.error('Error removing all players:', error);
      }
    };

    resetDatabase();
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TextInput
          style={styles.input}
          placeholder="Pseudo du joueur"
          value={addPlayerName}
          onChangeText={(text) => setAddPlayerName(text)}
        />
        <TouchableOpacity onPress={addPlayer} style={styles.addButton}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {playerList.slice(1).map((player) => (
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

export default AddPlayerScreen;
