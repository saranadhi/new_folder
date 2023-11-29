import React, { useState } from 'react';
import 'react-native-gesture-handler'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import {
    StyleSheet,
    View,
    Text,
    Button,
    TextInput
} from 'react-native';
import { Login, SignUp } from './CustomButtons';
import UserDetails from './LoginUser';
import SQLite from 'react-native-sqlite-storage'
import axios from 'axios';


const stack = createStackNavigator();

function Profile(props) {

    const Navigation = useNavigation();

    const[username,setusername] = useState('')
    const[password,setpassword] = useState('')

    const gotoSignUp = () => {
        Navigation.navigate('signup');
    }
    const fetchData =() => {

        axios.get('http://192.168.29.193:3000/loginuser').then(function (res) {
            console.log(res.data);
        }).catch(function (error) {
            console.log(error);
        })
      
    }
    const gotoLoginUser = () => {
        fetchData();
        console.log('go to user details');
        Navigation.navigate('userdetails');
        // axios.get('http://localhost:5432')
        // .then(()=>console.log('connection success'))
        // .catch(()=>console.log('connection failed'))
        //  fetchDa;


    }
    return (

        <View style={styles.body}>

            <View style={styles.container}>
                <Text style={styles.title}>User's Login</Text>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputField}
                        placeholder='email-id (or) phone number'
                        onChangeText={setusername}
                    />
                    <TextInput style={styles.inputField}
                        secureTextEntry={true}
                        placeholder='password'
                        onChangeText={setpassword}
                    />
                </View>

                <View style={styles.loginButton}>
                    <Login onPressFunction={gotoLoginUser}></Login>
                </View>

                <Text style={styles.title}>Don't have an account?</Text>
                <View style={styles.signupButton}>
                    <SignUp onPressFunction={gotoSignUp}></SignUp>
                </View>

            </View>

        </View>

    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        marginTop: 30
    },
    container: {
        backgroundColor: '#c8d0de',
        borderWidth: 2,
        borderRadius: 15,
        width: '70%',
        height: '75%'
    },
    inputContainer: {
        margin: 10,
        marginTop: 20
    },
    inputField: {
        marginVertical: 5,
        textAlign: 'left',
        fontSize: 20,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#c2c7cf'
    },
    loginButton: {
        width: '25%',
        marginTop: 10,
        marginHorizontal: '35%'
    },
    signupButton: {
        width: '32%',
        marginTop: 10,
        marginHorizontal: '32%'
    }
});

export default Profile;
