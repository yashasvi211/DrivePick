import React, { useRef, useEffect } from 'react';
import { View, ScrollView, Image, Dimensions, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';
import SearchBar from '../components/SearchBar';

// Carousel data with the provided image (repeated for demonstration)
const carouselItems = [
  { id: '1', image: 'https://imgd.aeplcdn.com/1920x580/media/cw/no5qv9b_1808753.jpg' },
  { id: '2', image: 'https://imgd.aeplcdn.com/1920x580/media/cw/no5qv9b_1808753.jpg' },
  { id: '3', image: 'https://imgd.aeplcdn.com/1920x580/media/cw/no5qv9b_1808753.jpg' },
];

export default function HomeScreen({ navigation }) {
  const theme = useTheme();
  const { width: viewportWidth } = Dimensions.get('window');
  const scrollRef = useRef(null);
  const itemWidth = viewportWidth - 32; // Full width minus padding (16 * 2)
  const [activeIndex, setActiveIndex] = React.useState(0);

  // Auto-slide every 6 seconds with slower animation
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % carouselItems.length;
      setActiveIndex(nextIndex);
      scrollRef.current.scrollTo({
        x: nextIndex * itemWidth,
        animated: true,
      });
    }, 6000); // Slide every 6 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [activeIndex, itemWidth]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView style={{ flex: 1, padding: 16 }}>
        <SearchBar />

        {/* Carousel Container */}
        <View style={styles.carouselContainer}>
          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToInterval={itemWidth} // Snap to exact item width
            snapToAlignment="start" // Aligns to the start of each item
            decelerationRate={0.95} // Slower, smoother animation
            scrollEnabled={false} // Disables manual scrolling
            style={styles.carouselScroll}
          >
            {carouselItems.map((item) => (
              <View
                key={item.id}
                style={[styles.carouselItem, { width: itemWidth }]}
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.carouselImage}
                  resizeMode="cover"
                />
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 16,
  },
  carouselScroll: {
    borderRadius: 16,
  },
  carouselItem: {
    height: 220,
    borderRadius: 16,
    overflow: 'hidden', // Ensures rounded corners clip the content
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
});