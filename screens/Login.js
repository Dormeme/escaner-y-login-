import React, { Component, useState } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native'
import { TextInput } from 'react-native-gesture-handler';

import appFirebase from '../credenciales/credenciales'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
//import { text } from '@fortawesome/fontawesome-svg-core';
const auth = getAuth(appFirebase)


export default function Login(props) {

    //creamos variable de estado
    const [email, setEmail] = useState()
    const [password, setPassword] = useState() 
    const logueo = async()=>{
        try {
            await signInWithEmailAndPassword(auth, email, password);
            Alert.alert('Iniciando Sesion','accediendo....')
            props.navigation.navigate('Home')
          } catch (error) {
            console.log(error);
            Alert.alert('Error', '¡El usuario o la contraseña son incorrectas!')
    }
    }

  return (
    <View style= {styles.padre}>
        <View>
            <Image source={require('../assets/imagen_usuario.jpg')} style={styles.profile}/>
        </View>

        <View style= {styles.tarjeta}>
            <View style={styles.cajaTexto}>
                <TextInput placeholder='correo@sosya.com' style={{paddingHorizontal:15}}
                onChangeText={(text)=>setEmail(text)}/>
            </View>

            <View style={styles.cajaTexto}>
                <TextInput placeholder='Password' style={{paddingHorizontal:15}} 
                onChangeText={(text)=>setPassword(text)} secureTextEntry={true}/>    
            </View>

            <View style={styles.PadreBoton}>
                <TouchableOpacity style={styles.cajaBoton} onPress={logueo}>
                    <Text style={styles.TextoBoton}>Ingresar</Text> 
                </TouchableOpacity>
            </View>

        </View>

    </View>
  );
}

const styles = StyleSheet.create({
    padre:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white'
    },
    profile:{
        width:100,
        height:100,
        borderRadius:50,
        borderColor:'white'
    },
    tarjeta:{
        margin:20,
        backgroundColor:'white',
        borderRadius:20,
        width:'90%',
        padding:20,
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:2
        },
        shadowOpacity:0.25,
        shadowRadius:4,
        elevation:5,
    },
    cajaTexto:{
        marginVertical:20,
        backgroundColor:'#cccccc60',
        borderRadius:30,
        marginVertical:10
    },
    PadreBoton:{
        alignItems:'center'
    },
    cajaBoton:{
        backgroundColor:'#525FE1',
        borderRadius:30,
        paddingVertical:20,
        width:150,
        marginTop:20
    },
    TextoBoton:{
        textAlign:'center',
        color:'white'
    }
    }); 

