// React import
import * as React from 'react';
import { StyleSheet, StatusBar, SafeAreaView, Text } from 'react-native';

import { ActivityIndicator } from 'react-native-paper';

export default function SplashScreen() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle='light-content' />
        <ActivityIndicator size="large" color="#54BE8C" animating={true}/>
        <Text style={styles.text}>Connecting...</Text>
      </SafeAreaView>
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
    text: {
        fontSize: 20,
    }
});
