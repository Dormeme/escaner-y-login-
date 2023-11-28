import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();

  const handleOptionSelection = (option) => {
    if (option === 'escanner') {
      navigation.navigate('Escanner'); // Navega a la vista 'Escanner'
    } else if (option === 'listado') {
      navigation.navigate('Listado'); // Navega a la vista 'Listado'
    }
  };
  

  return (
    <View style={styles.container}>
      <Text>Listado de tareas</Text>
      <TouchableOpacity
        style={[styles.option, styles.optionBackground]}
        onPress={() => handleOptionSelection('escanner')}
      >
        <Text style={styles.optionText}>Escáner</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.option, styles.optionBackground]}
        onPress={() => handleOptionSelection('listado')}
      >
        <Text style={styles.optionText}>Listado</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'cornflowerblue', // Cambiar a tu color de fondo deseado
    marginTop: 50,
  },
  option: {
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
  },
  optionBackground: {
    backgroundColor: 'white', // Color de fondo blanco para las opciones
  },
  optionText: {
    fontSize: 16,
  },
});
