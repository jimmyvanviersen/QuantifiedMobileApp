// React import
import * as React from 'react';
import { StyleSheet, StatusBar, SafeAreaView, View, Text, Pressable, Dimensions } from 'react-native';

// Library imports (Alphabetical order)
import { Portal, Dialog } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { VictoryChart, VictoryLine, VictoryLabel } from 'victory-native';

// Absolute imports from the project (Alphabetical order)
import {
  getAirPressure,
  getBattery,
  getPAR,
  getHumidity,
  getTemperature
} from '../api/Request';
// import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from '../components/carousel/CarouselCardItem';
import { DeviceContext } from '../components/contexts/DeviceContext';


const SLIDER_WIDTH = Dimensions.get('window').width + 80;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.4);


export default function DashboardScreen() {

  const device = React.useContext(DeviceContext);
  const [ deviceList, setDeviceList ] = React.useState();
  const [ selectedDevice, setSelectedDevice ] = React.useState();

  const [ airCard, setAirCard ] = React.useState(0);
  const [ battCard, setBattCard ] = React.useState(0);
  const [ parCard, setParCard ] = React.useState(0);
  const [ humCard, setHumCard ] = React.useState(0);
  const [ tempCard, setTempCard ] = React.useState(0);

  const [cardData, setCardData ] = React.useState([
    { title: 'Temperature', value: `${0}°C` },
    { title: 'Humidity', value: `${0}%` },
    { title: 'PAR', value: `${0} \nμmol\n/sm2` }, // unit subscript preferred
    { title: 'Pressure', value: `${0} \nhPa` },
    { title: 'Battery', value: `${0} V` },
  ]);

  const [ visible, setVisible ] = React.useState(false);

  const [ airList, setAirList ] = React.useState([]);
  const [ battList, setBattList ] = React.useState([]);
  const [ parList, setParList ] = React.useState([]);
  const [ humList, setHumList ] = React.useState([]);
  const [ tempList, setTempList ] = React.useState([]);

  const [ seconds, setSeconds ] = React.useState(1);
  const [ errorMessage, setErrorMessage ] = React.useState();

  // React hooks
  React.useEffect(() => {
    console.log('DEVICE: ', device)
    // Air(selectedDevice)
    // Battery(selectedDevice)
    // PAR(selectedDevice)
    // Humidity(selectedDevice)
    // Temperature(device[0].id)
  },[device]);

  React.useEffect(() => {
    console.log(tempCard)
    console.log(tempList)
  }, );
/*
  React.useEffect(() => {
    console.log(tempList)
    //UpdateCards() // sensor values are stored but not loaded in, needs another callback in the interval to display data
  }, [tempList])

  React.useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(seconds + 1);
      Air(selectedDevice)
      Battery(selectedDevice)
      PAR(selectedDevice)
      Humidity(selectedDevice)
      Temperature(selectedDevice)
      //UpdateCards()
      //console.log(cardData)
    }, 60000);
      // clearing interval
    return () => clearInterval(timer);
  }, );

  const UpdateCards = () => {
    // map values to cards...
    let newCardData = [...cardData]
    newCardData = [
      { title: 'Temperature', value: `${tempCard}°C` },
      { title: 'Humidity', value: `${humCard}%` },
      { title: 'PAR', value: `${parCard} μmol/sm2` },
      { title: 'Pressure', value: `${airCard} hPa` },
      { title: 'Battery', value: `${battCard} V` },
    ]
    console.log(newCardData)
    //setCardData(Array.from(newCardData))
  };

  */

  const Air = (device_id) => {
    getAirPressure(device_id)
    .then((res) => {
      listData = res.data.results.map(function({ timestamp, value }){
        setAirList({       // store temp list
          timestamp: timestamp,
          value: value.toFixed(1),
        })
        setAirCard(value.toFixed(1))
      })
    })
    .catch((err) => {
      // setErrorMessage(err.message)
      setAirList([])
      setAirCard(0)
    })
  };

  const Battery = (device_id) => {
    getBattery(device_id)
    .then((res) => {
      listData = res.data.results.map(function({ timestamp, value }){
        setBattList({       // store temp list
          timestamp: timestamp,
          value: value,
        })
        setBattCard(value.toFixed(1))
      })
    })
    .catch((err) => {
      // setErrorMessage(err.message)
      setBattList([])
      setBattCard(0)
    })
  };

  const PAR = (device_id) => {
    getPAR(device_id)
    .then((res) => {
      listData = res.data.results.map(function({ timestamp, value }){
        setParList({       // store temp list
          timestamp: timestamp,
          value: value,
        })
        setParCard(value.toFixed(1))
      })
    })
    .catch((err) => {
      // setErrorMessage(err.message)
      setParList([])
      setParCard(0)
    })
  };

  const Humidity = (device_id) => {
    getHumidity(device_id)
    .then((res) => {
      listData = res.data.results.map(function({ timestamp, value }){
        setHumList({     // store hum list
          timestamp: timestamp,
          value: value.toFixed(1),
        })
        setHumCard(value.toFixed(1))
      })
    })
    .catch((err) => {
      // setErrorMessage(err.message)
      setHumList([])
      setHumCard(0)
    })
  };
  
  const Temperature = (device_id) => {
    getTemperature(device_id)
    .then((res) => {
      listData = res.data.results.map(function({ timestamp, value }){
        setTempList({       // store at start in tempList
          timestamp: timestamp,
          value: value.toFixed(1),
        })
        setTempCard(value.toFixed(1))
      })
    })
    .catch((err) => {
      // setErrorMessage(err.message)
      setTempList([])
      setTempCard(0)
    })
  };

  const testDataList = [
    { x: 1, y: 2 },
    { x: 2, y: 3 },
    { x: 3, y: 5 },
    { x: 4, y: 4 },
    { x: 5, y: 7 },
    { x: 6, y: 2 },
    { x: 7, y: 3 },
    { x: 8, y: 5 },
    { x: 9, y: 4 },
    { x: 10, y: 1 },
    { x: 11, y: 2 },
    { x: 12, y: 3 },
    { x: 13, y: 5 },
    { x: 14, y: 4 },
    { x: 15, y: 7 },
    { x: 16, y: 2 },
    { x: 17, y: 3 },
    { x: 18, y: 5 },
    { x: 19, y: 4 },
    { x: 20, y: 1 },
  ];



  // Card Carousel
  const CarouselCards = () => {

    const [ cardIndex, setCardIndex ] = React.useState(0);
    const isCarousel = React.useRef(null);

    React.useEffect(() => {
      console.log('ACTIVE CARD: ', cardIndex);
    }, [cardIndex]);

    const _onPressCarousel = () => {
      console.log('CARD PRESSED: ', cardIndex);
    };
  
    const CarouselCardItem = ({ item, index }) => {
      return (
          <Pressable onLongPress={_onPressCarousel}
              style={styles.carouselCardContainer}>
              <View style={styles.carouselTitleContainer} key={index}>
                  <Text style={styles.carouselTitle}>{item.title}</Text>
              </View>
              <View style={styles.carouselValueContainer}>
                  <Text style={styles.carouselValue}>{item.value}</Text>
              </View>
          </Pressable>
      )
    };

    return (
      <View>
        <Carousel
          layout='default'
          layoutCardOffset={0}
          ref={isCarousel}
          data={cardData}
          renderItem={CarouselCardItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          inactiveSlideShift={0}
          onSnapToItem={(cardIndex) => setCardIndex(cardIndex)}
          useScrollView={true}
        />
        
        <Pagination
          dotsLength={cardData.length}
          activeDotIndex={cardIndex}
          carouselRef={isCarousel}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 50,
            marginHorizontal: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.92)',
        }}
        inactiveDotOpacity={0.5}
        inactiveDotScale={0.5}
        tappableDots={true}
        />
      </View>
    )
  };

  // return DashboardScreen
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='light-content' />
      <View style={styles.cardContainer}>
        <CarouselCards />
      </View>
      <View style={{ justifyContent: 'center' ,height: '3%' }}>
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      </View>
      <View style={styles.graphContainer}>
          <Text style={{ alignSelf: 'center', fontSize: 20 }}>GRAPH</Text>
          <VictoryChart
          
          >
            <VictoryLine
              data={testDataList}
            />
          </VictoryChart>
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
    cardContainer: {
      alignItems: 'center',
      height: '40%',
    },
    graphContainer: {
      alignSelf: 'center',
      justifyContent: 'center',
      height: '50%',
      //backgroundColor: '#fff',
    }, 
    text: {
      fontSize: 20,
    },
    error: {
      alignSelf: 'center',
      color: 'red',
    },
    // CSS for the data card carousel and cards
    carouselCardContainer: {
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 8,
      width: ITEM_WIDTH,
      height: ITEM_WIDTH,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,
      elevation: 7,
  },
  carouselTitleContainer: {
      alignSelf: 'center',
  },
  carouselTitle: {
      color: "#222",
      fontSize: 22,
      fontWeight: "bold",
      paddingTop: '5%',
  },
  carouselValueContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#54BE8C',
      margin: 10,
      width: 120,
      height: 120,
      borderRadius: 1000,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,
      elevation: 7,
  },
  carouselValue: {
    alignSelf: 'center',
    color: "#fff",
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingRight: 20
  },
});
