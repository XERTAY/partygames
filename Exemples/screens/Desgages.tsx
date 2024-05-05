import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

interface Cell {
  x: number;
  y: number;
  content: string;
}

const DegageGame: React.FC = () => {
  const [grid, setGrid] = useState<Cell[][]>(Array.from({ length: 6 }, () =>
    Array.from({ length: 6 }, () => ({ x: 0, y: 0, content: "" }))
  ));

  const gages = [
    "Fais 10 pompes",
    "Chante une chanson",
    "Raconte une blague",
    // Ajoute d'autres idées de gages ici
  ];

  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
  };

  const handleTurn = () => {
    const newX = getRandomInt(6);
    const newY = getRandomInt(6);

    if (grid[newX][newY].content !== "") {
      alert("Effectue le gage : " + grid[newX][newY].content);
    } else {
      const newGrid = [...grid];
      const randomGageIndex = getRandomInt(gages.length);
      newGrid[newX][newY].content = gages[randomGageIndex];
      setGrid(newGrid);
    }
  };

  return (
    <View>
      <Text>Dé-Gage</Text>
      <TouchableOpacity style={styles.button} onPress={handleTurn}>
        <Text>Lancer les dés</Text>
      </TouchableOpacity>
      <View style={styles.grid}>
        {grid.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, colIndex) => (
              <TouchableOpacity
                key={colIndex}
                style={styles.cell}
                onPress={() => alert("Effectue le gage : " + cell.content)}
              >
                <Text>{cell.content}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10,
  },
});

export default DegageGame;
