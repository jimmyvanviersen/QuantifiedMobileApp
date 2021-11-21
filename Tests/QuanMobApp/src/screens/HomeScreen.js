// React import
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Library imports (Alphabetical order)
import { Picker } from '@react-native-picker/picker';

// Absolute imports from the project (Alphabetical order)
import { getDevices } from '../api/Request';
import { DeviceProvider } from '../components/contexts/DeviceContext';

import AlarmScreen from './AlarmScreen';
import DashboardScreen from './DashboardScreen';
import MapScreen from './MapScreen';
import ScanScreen from './ScanScreen';

// Relative imports (Alphabetical order)

// Import * as

// Import ‘./<some file>.<some extension>


// Home screen
export default function HomeScreen() {

    const [ device, setDevice ] = React.useState();
    const [ deviceList, setDeviceList ] = React.useState([]);
    const [ selectedDevice, setSelectedDevice ] = React.useState();
    // const [ errorMessage, setErrorMessage ] = React.useState('');
    
    // React hooks
    /* GET devices and place them in device list, to be passed onto the Alarm, Dashboard and Map screens
    *  This will be implemented if there is time left to tweak the app's performance
    */

    React.useEffect(() => {
        getDevices()
        .then((res) => {
            setDeviceList(res.data.results)
        })
    }, []); // fetch devices once

    React.useEffect(() => {
        let device = deviceList.filter(function(device) {
            return device.id === selectedDevice;
        })
        setDevice(device);
    }, [selectedDevice]);

    return (
        <DeviceProvider value={device}>
            <View style={styles.deviceContainer}>
                <Picker
                    selectedValue={selectedDevice}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedDevice(itemValue)
                    }
                    >
                    {deviceList.map((device) => {
                        return(
                        <Picker.Item key={device.id} value={device.id} label={device.label} />
                        )
                    })}
                </Picker>
            </View>
            <NavTabs />
        </DeviceProvider>
    );
}

// BottomTabNavigation
const Tab = createMaterialBottomTabNavigator();

const NavTabs = () => {

    return (
        <Tab.Navigator
        initialRouteName='Dashboard'
        activeColor='#54BE8C'
        barStyle={{
            backgroundColor: '#2B3647',
            position: 'absolute',
        }}
        >
        <Tab.Screen
            name='Alarm'
            component={AlarmScreen}
            options={{
            tabBarLabel: 'Alarms',
            tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name='bell-ring' color={color} size={24} />
            )
            }}
        />
        <Tab.Screen
            name='Dashboard'
            component={DashboardScreen}
            options={{
            tabBarLabel: 'Dashboard',
            tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name='view-dashboard' color={color} size={24} />
            )
            }}
        />
        <Tab.Screen
            name='Map'
            component={MapScreen}
            options={{
            tabBarLabel: 'Map',
            tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name='map-search' color={color} size={24} />
            )
            }}
        />
        <Tab.Screen
            name='Scan'
            component={ScanScreen}
            options={{
            tabBarLabel: 'Scan',
            tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name='qrcode-scan' color={color} size={24} />
            )
            }}
        />
        </Tab.Navigator>
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
    deviceContainer: {
        alignSelf: 'center',
        justifyContent: 'center',
        width: '99%',
        backgroundColor: '#fff',
        marginTop: '1%',
        marginBottom: '1%',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15 ,
        shadowOffset : { width: 1, height: 13 },
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
