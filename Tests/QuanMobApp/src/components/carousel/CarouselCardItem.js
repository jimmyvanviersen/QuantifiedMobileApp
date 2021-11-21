// React import
import * as React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

// Library imports (Alphabetical order)

// Absolute imports from the project (Alphabetical order)

// Relative imports (Alphabetical order)

// Import * as

// Import ‘./<some file>.<some extension>


export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.4);

const CarouselCardItem = ({ item, index }) => {

    return (
        <View 
            style={styles.cardContainer}>
            <View style={styles.titleContainer} key={index}>
                <Text style={styles.title}>{item.title}</Text>
            </View>
            <View style={styles.valueContainer}>
                <Text style={styles.value}>{item.value}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    CarouselCardContainer: {
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
    CarouselTitleContainer: {
        alignSelf: 'center',
    },
    CarouselTitle: {
        color: "#222",
        fontSize: 22,
        fontWeight: "bold",
        paddingTop: '5%',
    },
    CarouselValueContainer: {
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
    Carouselvalue: {
        color: "#fff",
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 20,
        paddingRight: 20
    },
})

export default CarouselCardItem;
