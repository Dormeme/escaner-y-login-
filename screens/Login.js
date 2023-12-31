import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import appFirebase from '../credenciales/credenciales';

const auth = getAuth(appFirebase);

export default function Login(props) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState();

  useEffect(() => {
    const fetchNombre = async () => {
      const nombreGuardado = await AsyncStorage.getItem('nombre');
      if (nombreGuardado) {
        setNombre(nombreGuardado); // Establece el nombre guardado
      }
    };

    fetchNombre();
  }, []);

  const logueo = async () => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    Alert.alert('Iniciando Sesión', 'Accediendo....');
    props.navigation.navigate('Home', { email: email }); // Navega a la pantalla Home
  } catch (error) {
    console.log(error);
    Alert.alert('Error', '¡El usuario o la contraseña son incorrectas!');
  }
  
};

  return (
    <View style={styles.padre}>
      <View>
        <Image source={require('../assets/imagen_usuario.jpg')} style={styles.profile} />
      </View>

      <View style={styles.tarjeta}>
        <View style={styles.cajaTexto}>
          <TextInput
            placeholder='correo@sosya.com'
            style={{ paddingHorizontal: 15 }}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={styles.cajaTexto}>
          <TextInput
            placeholder='Password'
            style={{ paddingHorizontal: 15 }}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
        </View>

        <View style={styles.botonesContainer}>
          <TouchableOpacity style={styles.cajaBoton} onPress={logueo}>
            <Text style={styles.textoBoton}>Ingresar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cajaBoton} onPress={() => props.navigation.navigate('Registro')}>
      <Text style={styles.textoBoton}>Registrar</Text>
    </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  padre: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'cornflowerblue',
  },
  profile: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: 'white',
  },
  tarjeta: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cajaTexto: {
    marginVertical: 20,
    backgroundColor: '#cccccc60',
    borderRadius: 30,
    marginVertical: 10,
  },
  botonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cajaBoton: {
    backgroundColor: '#525FE1',
    borderRadius: 30,
    paddingVertical: 20,
    width: '48%', // Ajustado para dejar espacio entre los botones
  },
  textoBoton: {
    textAlign: 'center',
    color: 'white',
  },
});
