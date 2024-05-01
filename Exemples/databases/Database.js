// Database.js

import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('players.db');

class Database {
  static init() {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS players (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)'
      );
    });
  }

  static getAllPlayers() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM players',
          [],
          (_, { rows }) => resolve(rows._array),
          (_, error) => reject(error)
        );
      });
    });
  }

  static addPlayer(name, callback) {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO players (name) VALUES (?)',
        [name],
        (_, { insertId }) => callback(insertId),
        (_, error) => console.log('Error adding player:', error)
      );
    });
  }

  static removePlayer(id, callback) {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM players WHERE id = ?',
        [id],
        (_, { rowsAffected }) => callback(rowsAffected),
        (_, error) => console.log('Error removing player:', error)
      );
    });
  }

  static removeAllPlayers(callback) {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM players',
        [],
        (_, { rowsAffected }) => {
          // Réinitialise la séquence d'auto-incrémentation
          tx.executeSql('DELETE FROM sqlite_sequence WHERE name=?', ['players'], () => {
            callback(rowsAffected);
          });
        },
        (_, error) => console.log('Error removing all players:', error)
      );
    });
  }

  static updatePlayer(id, newName, callback) {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE players SET name = ? WHERE id = ?',
        [newName, id],
        (_, { rowsAffected }) => callback(rowsAffected),
        (_, error) => console.log('Error updating player:', error)
      );
    });
  }

  // Ajoute d'autres méthodes en fonction de tes besoins (suppression, mise à jour, etc.)
}

export default Database;
