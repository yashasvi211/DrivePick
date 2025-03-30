import React, { useRef, useEffect, useState } from 'react';
import { View, ScrollView, Image, Dimensions, StyleSheet } from 'react-native';

const Carousel = ({ items, interval = 6000 }) => {
  const { width: viewportWidth } = Dimensions.get('window');
  const scrollRef = useRef(null);
  const itemWidth = viewportWidth - 32; // Full width minus padding (16 * 2)
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % items.length;
      setActiveIndex(nextIndex);
      scrollRef.current?.scrollTo({
        x: nextIndex * itemWidth,
        animated: true,
      });
    }, interval);

    return () => clearInterval(slideInterval);
  }, [activeIndex, itemWidth, interval]);

  return (
    <View style={styles.carouselContainer}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={itemWidth}
        snapToAlignment="start"
        decelerationRate={0.95}
        scrollEnabled={false}
        style={styles.carouselScroll}
      >
        {items.map((item) => (
          <View key={item.id} style={[styles.carouselItem, { width: itemWidth }]}>
            <Image source={{ uri: item.image }} style={styles.carouselImage} resizeMode="cover" />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

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
    overflow: 'hidden',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
});

export default Carousel;
