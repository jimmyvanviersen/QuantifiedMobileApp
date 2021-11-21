// React import
import * as React from 'react';
import { StyleSheet, StatusBar, SafeAreaView, Text, TextInput, TouchableOpacity } from 'react-native';

const ScanScreen = () => {

  const [ deviceName, setDeviceName ] = React.useState('Firefly_1234');
  const [ errorMessage, setErrorMessage ] = React.useState('');

  const addDevice = () => {
    if (!deviceName.trim()) {
      setErrorMessage('Please add device name')
      return
    }
    setErrorMessage('')
    console.log('SCAN NAME:' + deviceName)
  };

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle='light-content' />
        <Text style={styles.text}>QR Scanner</Text>
        <Text>Placeholder</Text>
      </SafeAreaView>
    );
  }

// CSS Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECF2F6',
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  button: {
    alignItems: "center",
    margin: 10,
    padding: 10,
    width: 300,
    backgroundColor: '#54BE8C',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
  },
  errorText: {
    color: 'red',
  },
});

export default ScanScreen;
