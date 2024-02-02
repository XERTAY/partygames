// PlayersScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Database from './../databases/Database';

const PlayersScreen = () => {
  const [blocks, setBlocks] = useState([{ id: 1, text: '', showMinus: false }]);
  const [players, setPlayers] = useState([]);
  const [currentPlayerName, setCurrentPlayerName] = useState('');

  useEffect(() => {
    // Charge la liste des joueurs au montage du composant
    refreshPlayerList();
  }, []);

  const refreshPlayerList = () => {
    // Rafraîchit la liste des joueurs depuis la base de données
    Database.getAllPlayers(setPlayers);
  };

  const addPlayerToDatabase = (name) => {
    // Ajoute un joueur à la base de données
    Database.addPlayer(name, (insertId) => {
      console.log(`Nouveau joueur ajouté avec l'ID : ${insertId}`);
      // Rafraîchit la liste des joueurs après l'ajout
      refreshPlayerList();
    });
  };

  const removePlayerFromDatabase = (id) => {
    // Supprime un joueur de la base de données
    Database.removePlayer(id, () => {
      console.log(`Joueur avec l'ID ${id} supprimé`);
      // Rafraîchit la liste des joueurs après la suppression
      refreshPlayerList();
    });
  };
  const removeAllPlayersFromDatabase = () => {
    // Supprime tous les joueurs de la base de données
    Database.removeAllPlayers((rowsAffected) => {
      console.log(`Nombre de joueurs supprimés : ${rowsAffected}`);
      // Rafraîchit la liste des joueurs après la suppression
      refreshPlayerList();
    });
  };

  const handleButtonPress = () => {
    const isInvalidText = blocks[0].text === '' || blocks.slice(1).some((b) => b.text === blocks[0].text);

    if (isInvalidText) {
      return;
    }

    const newBlock = { id: blocks.length + 1, text: blocks[0].text, showMinus: true };
    setBlocks([...blocks, newBlock]);

    // Ajoute un nouveau joueur à la base de données
    addPlayerToDatabase(newBlock.text);

    setBlocks((prevBlocks) => [
      { ...prevBlocks[0], text: '' },
      ...prevBlocks.slice(1),
    ]);
  };

  const handleMinusButtonPress = (id) => {
    const updatedBlocks = blocks.filter((block) => block.id !== id);
    setBlocks(updatedBlocks);

    // Supprime le joueur correspondant de la base de données
    removePlayerFromDatabase(id);
  };

  const handleTextChange = (text, id) => {
    const updatedBlocks = blocks.map((block) =>
      block.id === id ? { ...block, text } : block
    );
    setBlocks(updatedBlocks);
  };

  const handlePrintPress = () => {
    // Crée un nouvel objet pour chaque pseudo avec son texte associé
    const newPlayers = blocks
      .slice(1) // ignore le premier bloc
      .map((block) => ({
        pseudo: block.text,
        idDare: [],
        idTruth: [],
      }));

    // Ajoute les nouveaux joueurs à la liste des joueurs
    setPlayers((prevPlayers) => [...prevPlayers, ...newPlayers]);

    // Réinitialise les blocs après l'impression
    setBlocks([{ id: 1, text: '', showMinus: false }]);
  };

  return (
    <ScrollView>
      {blocks.map((block, index) => (
        <View key={block.id} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <TextInput
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: 'gray',
              padding: 10,
              borderRadius: 5,
              marginRight: 10,
              color: 'black',
            }}
            placeholder="Saisir quelque chose"
            value={block.text}
            onChangeText={(text) => handleTextChange(text, block.id)}
            editable={index === 0}
          />

          {index === 0 && (
            <TouchableOpacity
              style={{ backgroundColor: 'green', padding: 10, borderRadius: 5, marginRight: 10 }}
              onPress={handleButtonPress}
            >
              <Text style={{ color: 'white' }}>+</Text>
            </TouchableOpacity>
          )}

          {index !== 0 && block.showMinus && (
            <TouchableOpacity
              style={{ backgroundColor: 'red', padding: 10, borderRadius: 5 }}
              onPress={() => handleMinusButtonPress(block.id)}
            >
              <Text style={{ color: 'white' }}>-</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      <TouchableOpacity
              style={{ backgroundColor: 'blue', padding: 15, borderRadius: 5, alignSelf: 'flex-end', marginTop: 10 }}
              onPress={handlePrintPress}
            >
              <Text style={{ color: 'white' }}>PRINT</Text>
            </TouchableOpacity>

            {/* Ajoute un bouton rouge pour supprimer tous les joueurs */}
            <TouchableOpacity
              style={{ backgroundColor: 'red', padding: 15, borderRadius: 5, alignSelf: 'flex-end', marginTop: 10 }}
              onPress={removeAllPlayersFromDatabase}
            >
              <Text style={{ color: 'white' }}>REMOVE TOUS LES JOUEURS</Text>
            </TouchableOpacity>

            {/* Affiche la liste des joueurs tout en bas de la page */}
            <Text>Liste des joueurs :</Text>
            {players.map((player) => (
              <Text key={player.id}>{`${player.id} - ${player.name}`}</Text>
            ))}
          </ScrollView>
        );
      };

export default PlayersScreen;
