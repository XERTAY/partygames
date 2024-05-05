import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Imports des Screens
import LimiteLimiteScreen from './screens/LimiteLimite';
import DesgagesGameScreen from './screens/Desgages';
import ToD from './screens/ToD';
import PlayersScreen from './screens/PlayersScreen';

// Import des Providers
import { PlayerProvider } from './databases/PlayerContext';



const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
  }, []);

  return (
    <PlayerProvider>
      <NavigationContainer>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <Stack.Navigator>
          <Stack.Screen name="Accueil" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="LimiteLimite" component={LimiteLimiteScreen} />
          <Stack.Screen name="Désgages" component={DesgagesGameScreen} />
          <Stack.Screen name="ToD" component={ToD} />
          <Stack.Screen name="PlayersScreen" component={PlayersScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PlayerProvider>
  );
}

// Passer la navigation en tant que pro
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Rechercher :"
          placeholderTextColor="#fff"
        />
      </View>

      <View style={styles.gamesContainer}>
        {/* Première colonne */}
        <View style={styles.column}>
          {/* Jeu 1 */}
          <TouchableOpacity style={styles.game} onPress={() => navigation.navigate('LimiteLimite')}>
            <Text style={styles.gameText}>Limite Limite +</Text>
          </TouchableOpacity>
          {/* Jeu 3 */}
          <TouchableOpacity style={styles.game} onPress={() => navigation.navigate('ToD')}>
            <Text style={styles.gameText}>Truth or Dare</Text>
          </TouchableOpacity>
          {/* Jeu 5 */}
          <TouchableOpacity style={styles.game} onPress={() => navigation.navigate('LimiteLimite')}>
            <Text style={styles.gameText}>Jeu 5</Text>
          </TouchableOpacity>
          {/* Jeu 7 */}
          <TouchableOpacity style={styles.game} onPress={() => navigation.navigate('LimiteLimite')}>
            <Text style={styles.gameText}>Jeu 7</Text>
          </TouchableOpacity>
          {/* Jeu 9 */}
          <TouchableOpacity style={styles.game} onPress={() => navigation.navigate('LimiteLimite')}>
            <Text style={styles.gameText}>Jeu 9</Text>
          </TouchableOpacity>
          {/* Ajoutez d'autres jeux ici si nécessaire */}
        </View>

        {/* Deuxième colonne */}
        <View style={styles.column}>
          {/* Jeu 2 */}
          <TouchableOpacity style={styles.game} onPress={() => navigation.navigate('Désgages')}>
            <Text style={styles.gameText}>Dés-gages</Text>
          </TouchableOpacity>
          {/* Jeu 4 */}
          <TouchableOpacity style={styles.game} onPress={() => navigation.navigate('LimiteLimite')}>
            <Text style={styles.gameText}>Jeu 4</Text>
          </TouchableOpacity>
          {/* Jeu 6 */}
          <TouchableOpacity style={styles.game} onPress={() => navigation.navigate('LimiteLimite')}>
            <Text style={styles.gameText}>Jeu 6</Text>
          </TouchableOpacity>
          {/* Jeu 8 */}
          <TouchableOpacity style={styles.game} onPress={() => navigation.navigate('LimiteLimite')}>
            <Text style={styles.gameText}>Jeu 8</Text>
          </TouchableOpacity>
          {/* Jeu 10 */}
          <TouchableOpacity style={styles.game} onPress={() => navigation.navigate('LimiteLimite')}>
            <Text style={styles.gameText}>Jeu 10</Text>
          </TouchableOpacity>
          {/* Ajoutez d'autres jeux ici si nécessaire */}
        </View>
        {/* Ajoutez d'autres colonnes ici si nécessaire */}
      </View>

      <View style={styles.bottomBar}>
        {/* Icone de maison */}
        <TouchableOpacity style={styles.iconContainer}>
          <Image source={require('./assets/house.jpg')} style={styles.icon} />
        </TouchableOpacity>
        {/* Bouton de gestion des groupes */}
        <TouchableOpacity style={[styles.iconContainer, styles.middleButton]} onPress={() => navigation.navigate('PlayersScreen')}>
          <Text style={styles.middleButtonText}>Gérer les groupes</Text>
        </TouchableOpacity>
        {/* Icone de compte */}
        <TouchableOpacity style={styles.iconContainer}>
          <Image source={require('./assets/account.jpg')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1C4D',
  },
  searchBar: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: '#333',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: '#fff',
  },
  gamesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  column: {
    width: '48%', // 2% de moins que la largeur de l'écran pour la marge
  },
  game: {
    backgroundColor: '#1E005A',
    paddingVertical: 30,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  gameText: {
    color: '#fff',
    fontSize: 18,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  iconContainer: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 30,
  },
  icon: {
    width: 25,
    height: 25,
    tintColor: '#fff',
  },
  middleButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});


export default App;
