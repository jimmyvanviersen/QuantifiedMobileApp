// React import
import * as React from 'react';
import { StyleSheet, StatusBar, SafeAreaView, View, Dimensions, ToastAndroid } from 'react-native';

// Library imports (Alphabetical order)
import MapView, { Marker } from 'react-native-maps';

// Absolute imports from the project (Alphabetical order)
import { getGeolocation } from '../api/Request';
import { DeviceContext } from '../components/contexts/DeviceContext';


const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.006339428281933124;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


export default function MapScreen() {

  const device = React.useContext(DeviceContext);
  const [ deviceName, setDeviceName ] = React.useState({
    name: 'Device_name',
  });
  const [ deviceLabel, setDeviceLabel ] = React.useState({
    label: 'Device_label'
  });
  const [ deviceLocation, setDeviceLocation ] = React.useState({
    // standard location is set to the PLNT building, otherwise the values will be overwritten to match the device current location
    latitude: 52.163665,
    longitude: 4.492153,
  });
  const [ userCoords, setUserCoords ] = React.useState({
    // standard location is set to the PLNT building, otherwise the values will be overwritten to match the users current location
    latitude: 52.163665,
    longitude: 4.492153,
  });
  const errorMessage = ('The device seems inactive...');

  // React hooks
  React.useEffect(() => {
    GetDeviceMarker()
    GetDeviceLocation(device[0].id)
  }, [device]); // fetch devices once

  const GetDeviceMarker = () => {
    let label = device[0].label
    let name = device[0].name

    setDeviceLabel({ label: label})
    setDeviceName({ name: name })
  };

  const GetDeviceLocation = (device_id) => {
    getGeolocation(device_id)
    .then((res) => {
      let lat = res.data.results[0].latitude
      let long = res.data.results[0].longitude
      var loc = {
        // sensor-node location from GPS
        latitude: lat,
        longitude: long,
      }
      setDeviceLocation(loc)
    })
    .catch((err) => {
      errorToast()
      /*
      var loc = {
        // Quantified Leiden
        latitude: 52.163665,
        longitude: 4.492153,
      }
      setDeviceLocation(loc)
      */
    })
  };

  const errorToast = () => {
    ToastAndroid.show(`${errorMessage}`, ToastAndroid.SHORT);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='light-content' />
      <View style={styles.mapContainer}>
          <MapView
            style={styles.mapContainer}
            region={{
              latitude: userCoords.latitude,
              longitude: userCoords.longitude,
              latitudeDelta:  LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
            rotateEnabled={false}
            loadingEnabled={true}
            loadingIndicatorColor={'#59AA7B'}
          >
            <Marker
              coordinate={{ latitude: deviceLocation.latitude, longitude: deviceLocation.longitude }}
              title={deviceLabel.label}
              description={deviceName.name}
            />
          </MapView>
      </View>
    </SafeAreaView>
  );
}

// css styling
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#ECF2F6',
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
    },
    mapContainer: {
      alignSelf: 'center',
      width: '99%',
      height: '96%',
    },
    text: {
        fontSize: 20,
    },
    error: {
      alignSelf: 'center',
      color: 'red',
    }
});
