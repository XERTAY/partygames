import React, { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PlayerContext = createContext();

export const usePlayers = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
  const [playerList, setPlayerList] = useState([{ id: 1, name: '' }]);

  const addPlayer = async (newPlayerName) => {
    try {
      // Mettre le nom du joueur en majuscule
      const capitalizedPlayerName = newPlayerName.charAt(0).toUpperCase() + newPlayerName.slice(1);
      const newPlayerList = [...playerList, { id: Date.now(), name: capitalizedPlayerName }];
      setPlayerList(newPlayerList);
      await AsyncStorage.setItem('playerList', JSON.stringify(newPlayerList));
    } catch (error) {
      console.error('Erreur lors de l\'ajout du joueur :', error);
    }
  };

  const removePlayer = async (id) => {
    try {
      const updatedPlayers = playerList.filter(player => player.id !== id);
      setPlayerList(updatedPlayers);
      await AsyncStorage.setItem('playerList', JSON.stringify(updatedPlayers));
    } catch (error) {
      console.error('Erreur lors de la suppression du joueur :', error);
    }
  };

  return (
    <PlayerContext.Provider value={{ playerList, setPlayerList, addPlayer, removePlayer }}>
      {children}
    </PlayerContext.Provider>
  );
};
