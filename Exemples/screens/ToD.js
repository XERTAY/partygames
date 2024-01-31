import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { Easing, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import tasks from './../bd/top.json'; // Importez directement le fichier JSON

export default function ToD() {
  const [isAnimating, setIsAnimating] = useState(false);
  const scaleValue = useSharedValue(1); // Valeur de l'échelle initiale

  const [maChaineDeCaracteres, setMaChaineDeCaracteres] = useState("Placeholder");

  const loadTasksDare = () => {
    const randomDare = getRandomItem(tasks.dare);
    changerValeur(randomDare);
    console.log('Défi au hasard:', randomDare);
    // Faites quelque chose avec la tâche au hasard, par exemple, l'afficher dans la console
  };
  const loadTasksTruth = () => {
    const randomTruth = getRandomItem(tasks.truth);
    changerValeur(randomTruth);
    console.log('Défi au hasard:', randomTruth);
    // Faites quelque chose avec la tâche au hasard, par exemple, l'afficher dans la console
  };

  const getRandomItem = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };

  const truthButton = () => {
    startAnimation();
    loadTasksTruth();
  }

  const dareButton = () => {
    startAnimation();
    loadTasksDare();
  }

  const startAnimation = () => {
    setIsAnimating(true);

    // Animation d'agrandissement avec ease-in
    scaleValue.value = withTiming(1.03, { duration: 300, easing: Easing.inOut(Easing.ease) });

    // Attendre 500 ms (demi-seconde) avant de revenir à la taille d'origine avec ease-out
    setTimeout(() => {
      scaleValue.value = withTiming(1, { duration: 300, easing: Easing.inOut(Easing.ease) });
      setIsAnimating(false);
    }, 300);
  };

  const changerValeur = (nouvelleValeur) => {
    // Utilisez setMaChaineDeCaracteres pour changer la valeur
    setMaChaineDeCaracteres(nouvelleValeur);
  };

  return (
    
    <View style={styles.container}>
      <LinearGradient
        colors={['#FF69B4', '#8A2BE2', '#0000FF', '#8A2BE2', '#FF69B4']}
        style={styles.background}
      />
      <Text style={styles.overlayText}>Truth or Dare</Text>
      <Text style={styles.playerText}>Joueur</Text>

      <Animated.View
        style={{
          backgroundColor: 'rgba(255, 105, 180, 0.5)', // Rose avec faible opacité
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

        <Text style={styles.text}>Joueur suivant : Joueur</Text>

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
