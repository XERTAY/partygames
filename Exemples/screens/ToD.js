import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { Easing, useSharedValue, withTiming } from 'react-native-reanimated';
import tasks from './../databases/top.json';
import { usePlayers } from './../databases/PlayerContext'; // Importez usePlayers depuis le contexte PlayerContext

export default function ToD() {
  const { playerList } = usePlayers(); // Utilisez usePlayers pour obtenir la liste des joueurs
  const [isAnimating, setIsAnimating] = useState(false);
  const scaleValue = useSharedValue(1);
  const [maChaineDeCaracteres, setMaChaineDeCaracteres] = useState("Placeholder");
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(null);
  const [nextPlayerIndex, setNextPlayerIndex] = useState(null);

  useEffect(() => {
    // Générer deux indices aléatoires pour les deux premiers joueurs
    const randomIndex1 = Math.floor(Math.random() * playerList.length);
    let randomIndex2;
    do {
      randomIndex2 = Math.floor(Math.random() * playerList.length);
    } while (randomIndex1 === randomIndex2);
    setCurrentPlayerIndex(randomIndex1);
    setNextPlayerIndex(randomIndex2);
  }, [playerList]);

  const getNextPlayerIndex = (currentIndex) => {
    // Obtenir l'index suivant dans la liste circulaire
    return (currentIndex + 1) % playerList.length;
  };

  const loadTasksDare = () => {
    let randomIndex1, randomIndex2;
    do {
      randomIndex1 = Math.floor(Math.random() * playerList.length);
    } while (randomIndex1 === currentPlayerIndex);
    do {
      randomIndex2 = Math.floor(Math.random() * playerList.length);
    } while (randomIndex2 === currentPlayerIndex || randomIndex2 === randomIndex1);
  
    const playerName1 = playerList[randomIndex1].name;
    const playerName2 = playerList[randomIndex2].name;

    const randomDare = getRandomItem(tasks.dare).replace('[Joueur1]', playerName1).replace('[Joueur2]', playerName2).replace('[Joueur]', playerName1);
    changerValeur(randomDare);
    console.log('Défi au hasard:', randomDare);
  };

  const loadTasksTruth = () => {
    let randomIndex1, randomIndex2;
    do {
      randomIndex1 = Math.floor(Math.random() * playerList.length);
    } while (randomIndex1 === currentPlayerIndex);
    do {
      randomIndex2 = Math.floor(Math.random() * playerList.length);
    } while (randomIndex2 === currentPlayerIndex || randomIndex2 === randomIndex1);
  
    const playerName1 = playerList[randomIndex1].name;
    const playerName2 = playerList[randomIndex2].name;
  
    const randomTruth = getRandomItem(tasks.truth).replace('[Joueur1]', playerName1).replace('[Joueur2]', playerName2).replace('[Joueur]', playerName1);
    changerValeur(randomTruth);
    console.log('Défi au hasard:', randomTruth);
  };

  const getRandomItem = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };

  const truthButton = () => {
    startAnimation();
    loadTasksTruth();
  };

  const dareButton = () => {
    startAnimation();
    loadTasksDare();
  };

  const startAnimation = () => {
    setIsAnimating(true);

    scaleValue.value = withTiming(1.03, { duration: 300, easing: Easing.inOut(Easing.ease) });

    setTimeout(() => {
      scaleValue.value = withTiming(1, { duration: 300, easing: Easing.inOut(Easing.ease) });
      setIsAnimating(false);
      setCurrentPlayerIndex(nextPlayerIndex);
      setNextPlayerIndex(getNextPlayerIndex(nextPlayerIndex));
    }, 300);
  };

  const changerValeur = (nouvelleValeur) => {
    setMaChaineDeCaracteres(nouvelleValeur);
  };

  if (currentPlayerIndex === null || nextPlayerIndex === null) {
    return null; // Attendez que les joueurs soient initialisés
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FF69B4', '#8A2BE2', '#0000FF', '#8A2BE2', '#FF69B4']}
        style={styles.background}
      />
      <Text style={styles.overlayText}>Truth or Dare</Text>
      <Text style={styles.playerText}>{playerList[currentPlayerIndex].name}</Text>

      <Animated.View
        style={{
          backgroundColor: 'rgba(255, 105, 180, 0.5)',
          padding: 20,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          height: '50%',
          width: '80%',
          transform: [{ scale: scaleValue }],
        }}
      >
        <Text style={styles.text}>{maChaineDeCaracteres}</Text>
      </Animated.View>

      <View style={styles.South}>
        <Text style={styles.text}>Joueur suivant : {playerList[nextPlayerIndex].name}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonPurple} onPress={truthButton} disabled={isAnimating}>
            <Text style={styles.buttonText}>Truth</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonBlue} onPress={dareButton} disabled={isAnimating}>
            <Text style={styles.buttonText}>Dare</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1, // Mettez à jour la valeur de zIndex en fonction de vos besoins
  },
  overlayText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute',
    top: 50, // Ajustez la position du texte selon vos besoins
  },
  playerText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    paddingBottom: 20,
  },
  text: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row', // Affiche les boutons dans la même ligne
    justifyContent: 'space-between', // Espace entre les boutons
    paddingHorizontal: 20, // Marge horizontale pour les boutons
    top: 50,
    gap: 50,
  },
  buttonPurple: {
    backgroundColor: '#8A2BE2', // Violet
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    transform: [{ scale: 1.2 }],
  },
  buttonBlue: {
    backgroundColor: '#0000FF', // Bleu
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    transform: [{ scale: 1.2 }],
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  South: {
    top: 15,
    justifyContent: 'center',
  }
});
