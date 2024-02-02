// Exemple de composant

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import Database from './../databases/Database';

export default function PlayerList() {
  const [players, setPlayers] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState('');

  useEffect(() => {
    // Charge la liste des joueurs au montage du composant
    refreshPlayerList();
  }, []);

  const refreshPlayerList = () => {
    // Rafraîchit la liste des joueurs depuis la base de données
    Database.getAllPlayers(setPlayers);
  };

  const addPlayer = () => {
    // Ajoute un nouveau joueur dans la base de données
    if (newPlayerName.trim() !== '') {
      Database.addPlayer(newPlayerName, (insertId) => {
        // Callback appelé après l'ajout du joueur
        console.log(`Nouveau joueur ajouté avec l'ID : ${insertId}`);
        // Rafraîchit la liste des joueurs pour afficher le nouveau joueur
        refreshPlayerList();
        // Réinitialise le TextInput
        setNewPlayerName('');
      });
    }
  };

  return (
    <View>
      <Text>Liste des joueurs :</Text>
      {players.map(player => (
        <Text key={player.id}>{player.name}</Text>
      ))}
      
      {/* TextInput pour saisir le nom du nouveau joueur */}
      <TextInput
        placeholder="Nom du joueur"
        value={newPlayerName}
        onChangeText={setNewPlayerName}
      />

      {/* Bouton pour ajouter un nouveau joueur */}
      <Button title="Ajouter Joueur" onPress={addPlayer} />
    </View>
  );
}
