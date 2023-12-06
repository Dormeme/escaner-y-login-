import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import appFirebase from '../credenciales/credenciales';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Registro() {
    const navigation = useNavigation();
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [confirmacionContraseña, setConfirmacionContraseña] = useState('');
  
    const auth = getAuth(appFirebase);
  
    const registrarUsuario = async () => {
        if (contraseña !== confirmacionContraseña) {
          Alert.alert('Error en el Registro', 'Las contraseñas no coinciden');
          return;
        }
        // Alerta para recordar al usuario que solo use su propio correo electrónico
    Alert.alert(
        'Aviso',
        'Por favor, solo utiliza tu propio correo electrónico para registrarte.',
    )
};

    return (
        <View style={styles.container}>
          <Text style={styles.label}>Ingrese su nombre:</Text>
          <TextInput
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
          />
  
          <Text style={styles.label}>Ingrese un correo:</Text>
          <TextInput
            style={styles.input}
            value={correo}
            onChangeText={setCorreo}
          />
  
          <Text style={styles.label}>Cree su clave de acceso:</Text>
          <TextInput
            style={styles.input}
            value={contraseña}
            onChangeText={setContraseña}
            secureTextEntry
          />
  
          <Text style={styles.label}>Repita clave de acceso:</Text>
          <TextInput
            style={styles.input}
            value={confirmacionContraseña}
            onChangeText={setConfirmacionContraseña}
            secureTextEntry
          />
  
          <Button
            title="Registrarse"
            onPress={registrarUsuario}
          />
        </View>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginBottom: 10,
  },
});