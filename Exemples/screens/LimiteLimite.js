import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import predefinedCards from '../databases/cards.json'; // Importez les cartes préfaites depuis le fichier JSON

export default function App() {
    const [customCardText, setCustomCardText] = useState('');
    const [drawnCard, setDrawnCard] = useState('');
    const [customCards, setCustomCards] = useState([]);

    useEffect(() => {
        setCustomCards(predefinedCards); // Initialisez les cartes préfaites au montage du composant
    }, []);

    const drawRandomCard = () => {
        const allCards = customCards.concat(predefinedCards);

        // Choix aléatoire d'une carte parmi toutes les cartes disponibles
        const randomIndex = Math.floor(Math.random() * allCards.length);
        let randomCard = allCards[randomIndex];

        // Vérifier s'il y a un espace vide dans la carte
        const emptySpaceIndex = randomCard.indexOf(' ');
        if (emptySpaceIndex !== -1) {
            // Remplacer l'espace vide par le texte entré par l'utilisateur
            randomCard = randomCard.slice(0, emptySpaceIndex) + customCardText + randomCard.slice(emptySpaceIndex + 1);
        }

        setDrawnCard(randomCard);
    };

    // Fonction pour ajouter une carte personnalisée
    const addCustomCard = () => {
        if (customCardText.trim() !== '') {
            setCustomCards([...customCards, customCardText]);
            setCustomCardText('');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Limite Limite +</Text>
            <View style={styles.cardContainer}>
                {drawnCard ? (
                    <Text style={styles.cardText}>{drawnCard}</Text>
                ) : (
                    <Text style={styles.instructions}>Appuyez sur "Tirer une carte" pour commencer</Text>
                )}
            </View>
            <TouchableOpacity style={styles.button} onPress={drawRandomCard}>
                <Text style={styles.buttonText}>Tirer une carte</Text>
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                onChangeText={text => setCustomCardText(text)}
                value={customCardText}
                placeholder="Ajouter une carte personnalisée"
            />
            <TouchableOpacity style={styles.button} onPress={addCustomCard}>
                <Text style={styles.buttonText}>Ajouter la carte</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F1C4D',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
    cardContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    cardText: {
        fontSize: 18,
    },
    instructions: {
        color: 'white',
        fontStyle: 'italic',
    },
    button: {
        backgroundColor: '#6C63FF',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        backgroundColor: 'white',
        width: '80%',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
});