import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home({ route }) {
  const navigation = useNavigation();
  const { email } = route.params; // Recibimos el email del usuario

  const handleOptionSelection = (option) => {
    if (option === 'escanner') {
      navigation.navigate('Escanner', { email: email }); // Pasamos el email del usuario
    } else if (option === 'listado') {
      navigation.navigate('Listado', { email: email }); // Pasamos el email del usuario
    }
  };
  

  return (
    <ImageBackground source={require('../assets/logo_sosya_fondo.png')} style={styles.container}>
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
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  imageContainer: {
    width: '50%', // Ajusta este valor para cambiar el tamaño de la imagen
    height: '50%', // Ajusta este valor para cambiar el tamaño de la imagen
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
