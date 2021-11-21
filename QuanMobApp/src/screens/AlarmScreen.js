// React import
import * as React from 'react';
import { StyleSheet, StatusBar, SafeAreaView, View,  Text, FlatList, ToastAndroid } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Library imports (Alphabetical order)
import { FAB, Portal, Dialog, Button, TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

// Absolute imports from the project (Alphabetical order)
import {   
  getAirPressure,
  getBattery,
  getPAR,
  getHumidity,
  getTemperature 
} from '../api/Request';

import { DeviceContext } from '../components/contexts/DeviceContext';


export default function AlarmScreen() {

  const [ visible, setVisible ] = React.useState(false);

  const [ errorMessage, setErrorMessage ] = React.useState('');

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const device = React.useContext(DeviceContext);
  const [ tempVal, setTempVal ] = React.useState(0);
  const [ humVal, setHumVal ] = React.useState(0);
  const [ parVal, setParVal ] = React.useState(0);
  const [ airVal, setAirVal ] = React.useState(0);
  const [ battVal, setBattVal ] = React.useState(0);

  const [ selectedSensor, setSelectedSensor ] = React.useState('TEMP');

  const [ tempCheck, setTempCheck ] = React.useState(false);
  // const [ humCheck, setHumCheck ] = React.useState(false);
  // const [ parCheck, setParCheck ] = React.useState(false);
  // const [ airCheck, setAirCheck ] = React.useState(false);
  // const [ battCheck, setBattCheck ] = React.useState(false);

  const [ label, setLabel ] = React.useState();
  const [ max, setMax ] = React.useState();
  const [ min, setMin ] = React.useState();
  const [ data, setData ] = React.useState([
    /* example:
      {
        id: '0',
        device: 'labelname'
        sensor: 'Temperature',
        label: 'Example',
        max: 'value',
        min: 'value',
      }
    */
  ]);

  // React hooks
  React.useEffect(() => {
    console.log('ALARM: ', device)
  }, [device]); // fetch devices once

  const [ idx, incr ] = React.useState(0);

  // Alarm Card, to be displayed
  const AlarmCard = ({ id, device, sensor, label, max, min  }) => (
  <View style={styles.card}>
    <View style={styles.cardColumnLeft}>
      <Text style={styles.cardValue}>{device}</Text>
      <Text style={styles.cardValue}>{label}</Text>
    </View>
    <View style={styles.cardColumnRight}>
      <Text style={styles.cardValue}>Max: {max}</Text>
      <Text style={styles.cardValue}>Min: {min}</Text>
    </View>
      <View style={styles.cardIcon}>
        <MaterialCommunityIcons name='do-not-disturb' size={30} style={{ color: 'red'}} onPress={() => delItem(id)} />
      </View>
  </View>
  );

  const renderItem = ({ item }) => (
    <AlarmCard
      id={item.id}
      device={item.device}
      sensor={item.sensor}
      label={item.label}
      max={item.max}
      min={item.min}
    />
  );

  const addItem = () => [
    setData((prevData) => {
      // console.log('ADDED DATA')
      incr(idx + 1)
      hideDialog()
      addToast()
      checkSwitch()
      return [
      {
        id: idx.toString(),
        device: device[0].label,
        sensor: selectedSensor,
        label: label,
        max: max,
        min: min,
      },
      ...prevData,
      ]
    })
  ];

  const clrItem = () => {
    // console.log('CLEARED DATA')
    setSelectedSensor('')
    setLabel('')
    setMax('')
    setMin('')
    hideDialog()
  };

  const delItem = (id) => {
    setData((prevData) => {
      delToast()
      return prevData.filter((item) => item.id != id);
    });
  };

  const addToast = () => {
    ToastAndroid.show('Alarm added!', ToastAndroid.SHORT);
  };

  const delToast = () => {
    ToastAndroid.show('Alarm removed!', ToastAndroid.SHORT);
  };

  const errToast = () => {
    ToastAndroid.show(`${errorMessage}`, ToastAndroid.SHORT);
  }

  const checkSwitch = () => {

    switch(selectedSensor) {

      case 'TEMP':
        checkTemp()
        break;

      case 'HUM':
        
        break;
      
      case 'PAR':

        break;

      case 'AIR':

        break;

      case 'BATT':

        break;
    }
  };

const checkTemp = () => {
  setTempCheck(true)
  let count = 0;
  console.log('TEMP ON!', tempCheck)
  /*
    The counter stops once count reaches 4, as intended. However when implementing the GetTemperature hook, it keeps fetching data even after the counter has stopped.
    The idea is to get the max/min values from Data Card, get tempVal from API and compare them with eachother.
    check if tempVal is lower then Max Value AND OR higher then Min Value.
  */
  do {
    const timer = setInterval(() => {
      count = count + 1;
      if (count >= 4) {
        console.log('STOP TEMP', tempCheck)
        return setTempCheck(false);
      }
      console.log('CHECK TEMP... ', count)
    }, 3000);
    return () => clearInterval(timer);
  } while (tempCheck === true);
};

const GetTemp = () => {   // fetches temperature data from API, for the selected device specific.
  getTemperature(device[0].id)
  .then((res) => {
    console.log(res.data.results);
  })
  .catch((err) => {
    setErrorMessage(err.message);
    errToast();
  })
};

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='light-content' />
      <FlatList
        data={data}
        renderItem={renderItem}
      />
      <FAB
        style={{
          backgroundColor: '#54BE8C',
          position: 'absolute',
          top: '82%',
          right: '3%',
        }}
        large
        icon='plus'
        onPress={showDialog}
      />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={{ borderRadius: 15 }}>
          <Dialog.Title>Alarm toevoegen</Dialog.Title>
          <Dialog.Content>
            <View style={styles.sensorPicker}>
              <Picker
                selectedValue={selectedSensor}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedSensor(itemValue)
                }
              >
                <Picker.Item label='Temperature' value='TEMP' />
                <Picker.Item label='Humidity' value='HUM' />
                <Picker.Item label='PAR' value='PAR' />
                <Picker.Item label='Pressure' value='AIR' />
                <Picker.Item label='Battery' value='BATT' />
              </Picker>
            </View>
            <TextInput
              mode='outlined'
              label='Alarm label'
              value={label}
              onChangeText={value => setLabel(value)}
            />
            <TextInput
              mode='outlined'
              label='Max. waarde'
              value={max}
              onChangeText={value => setMax(value)}
            />
            <TextInput
              mode='outlined'
              label='Min. waarde'
              value={min}
              onChangeText={value => setMin(value)}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => clrItem()}>Annuleren</Button>
            <Button onPress={() => addItem()}>Toevoegen</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
}

// css styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ECF2F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
  },
  devicePicker: {
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.5)', 
    backgroundColor: '#fff',
    borderRadius: 5,
    height: 60,
    marginBottom: 5,
    paddingLeft: 5,
  },
  sensorPicker: {
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.5)', 
    backgroundColor: '#fff',
    borderRadius: 5,
    height: 60,
    paddingLeft: 5,
  }, 
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  card: {
    flexDirection: 'row',
    alignSelf: 'center',
    height: 60,
    width: '99%',
    margin: 5,
    backgroundColor: '#fff',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15 ,
    shadowOffset : { width: 1, height: 13 },
  },
  cardColumnLeft: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '45%',
  },
  cardColumnRight: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '45%',
  },
  cardValue: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 16,
  },
  cardIcon: {
    justifyContent: 'center',
    alignSelf: 'center',
  }
});
