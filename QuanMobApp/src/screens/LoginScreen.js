/**
 * To ensure the functionality of the app for now, i've decided to make the LoginScreen part of App.js.
 * Reason being that so far i have not found a good way to pass data from child to parent. 
 * If there is a way to do this properly then LoginScreen can be placed here, and let App.js import LoginScreen instead.
 */

// React import
import * as React from 'react';
import { StyleSheet, StatusBar, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';

// Library imports (Alphabetical order)


// Absolute imports from the project (Alphabetical order)
import { login } from './src/api/Authentication';
import { getToken, setToken, delToken } from './src/api/Token';

// import { login } from './src/api/Authentication';
// import { getDevices } from './src/api/Request';
// import { getToken, setToken, delToken } from './src/api/Token';

// Relative imports (Alphabetical order)

// Import * as

// Import ‘./<some file>.<some extension>


 const AuthContext = React.createContext();

 // screens
 export default function LoginScreen() {
   //const [ username, setUsername ] = React.useState('test-api-user');
   //const [ password, setPassword ] = React.useState('MDD$kF9BztHQJRt');
   const [ username, setUsername ] = React.useState('jimmy.van.viersen@gmail.com');
   const [ password, setPassword ] = React.useState('Exitius@HSL2021');
   //const [ username, setUsername ] = React.useState('');
   //const [ password, setPassword ] = React.useState('');
   const [ errorMessage, setErrorMessage ] = React.useState('');
 
   const { login } = React.useContext(AuthContext);
 
   function checkInput () {
     // check for email input
     if (!username.trim()) {
       setErrorMessage('Please enter username...')
       return
     }
     // check for password input
     if (!password.trim()) {
       setErrorMessage('Please enter password...')
       return
     }
     // if check successful
     login({ username, password })
   };
 
   return (
     <View style={styles.container}>
       <StatusBar barStyle='light-content' />
       <Image source={require('./src/assets/icons/quan-logo.png')} />
       <TextInput
         style={styles.input}
         placeholder='Username'
         value={username}
         onChangeText={setUsername}
         keyboardType='email-address'
         autoCapitalize='none'
         autoCorrect={false}
       />
       <TextInput
         style={styles.input}
         placeholder='Password'
         value={password}
         onChangeText={setPassword}
         keyboardType='visible-password'
         autoCapitalize='none'
         autoCorrect={false}
         secureTextEntry
       />
       <TouchableOpacity
         style={styles.button}
         title='Login'
         onPress={() => checkInput()}
       >
         <Text style={styles.buttonText}>Login</Text>
       </TouchableOpacity>
       {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null }
     </View>
   );
 }


 // css styling
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ECF2F6',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
  
    },
    text: {
      fontSize: 20,
    },
    input: {
      height: 40,
      width: 300,
      margin: 10,
      borderBottomWidth: 1,
      borderColor: '#e0e0e0',
      color: 'grey',
    },
    button: {
      alignItems: 'center',
      margin: 10,
      padding: 10,
      width: 300,
      backgroundColor: '#54BE8C',
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOpacity: 0.8,
      elevation: 6,
      shadowRadius: 15 ,
      shadowOffset : { width: 1, height: 13},
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 20,
    },
    errorText: {
      color: 'red',
    },
  });
  