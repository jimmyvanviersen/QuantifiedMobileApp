// React import
import * as React from 'react';
import { View } from 'react-native';

// Library imports (Alphabetical order)
import Carousel, { Pagination } from 'react-native-snap-carousel';

// Absolute imports from the project (Alphabetical order)
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem';

// Relative imports (Alphabetical order)

// Import * as

// Import ‘./<some file>.<some extension>


const data = [
    {
      title: 'Battery',
      value: `${99}%`,
    },
    {
      title: 'Pressure',
      value: `${1021} hPa`,
    },
    {
      title: 'PAR',
      value: `${500} PPFD`,
    },
    {
      title: 'Humidity',
      value: `${80}%`,
    },
    {
      title: 'Temperature',
      value: `${11}°C`,
    }
  ]

const CarouselCards = () => {

    const [index, setIndex] = React.useState(0);
    const isCarousel = React.useRef(null);

    return (
        <View>
            <Carousel
                layout='default'
                layoutCardOffset={0}
                ref={isCarousel}
                data={data}
                renderItem={CarouselCardItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                inactiveSlideShift={0}
                onSnapToItem={(index) => setIndex(index)}
                useScrollView={true}
            />
            <Pagination
                dotsLength={data.length}
                activeDotIndex={index}
                carouselRef={isCarousel}
                dotStyle={{
                    width: 16,
                    height: 16,
                    borderRadius: 50,
                    marginHorizontal: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.92)',
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                tappableDots={true}
            />
        </View>
    )
}

export default CarouselCards;
