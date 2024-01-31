// PlayersScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

const PlayersScreen = () => {
  const [blocks, setBlocks] = useState([{ id: 1, text: '', showMinus: false }]);
  const [players, setPlayers] = useState([]);

  const handleButtonPress = () => {
    // Vérifie si le texte du premier bloc est vide ou égal à un des blocs suivants
    const isInvalidText = blocks[0].text === '' || blocks.slice(1).some((b) => b.text === blocks[0].text);

    if (isInvalidText) {
      return;
    }

    // Ajoute un nouveau bloc avec le texte du premier bloc
    const newBlock = { id: blocks.length + 1, text: blocks[0].text, showMinus: true };
    setBlocks([...blocks, newBlock]);

    // Réinitialise le texte du premier bloc
    setBlocks((prevBlocks) => [
      { ...prevBlocks[0], text: '' },
      ...prevBlocks.slice(1), // conserve les blocs existants sauf le premier
    ]);
  };

  const handleMinusButtonPress = (id) => {
    // Supprime le bloc correspondant
    const updatedBlocks = blocks.filter((block) => block.id !== id);
    setBlocks(updatedBlocks);
  };

  const handleTextChange = (text, id) => {
    // Met à jour le texte dans le bloc correspondant
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
    </ScrollView>
  );
};

export default PlayersScreen;
