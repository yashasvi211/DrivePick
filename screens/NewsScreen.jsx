import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme, Card } from 'react-native-paper';

export default function NewsScreen() {
  const theme = useTheme();
  const [news, setNews] = useState([]);

  useEffect(() => {
    const dummyNews = [
      {
        id: '1',
        title: 'Maruti Suzuki Swift 2024 Spotted Testing',
        description:
          'The 2024 Maruti Suzuki Swift has been seen testing on Indian roads with camouflaged designs, hinting at a sportier look, redesigned front fascia, and updated interiors. The new model is expected to offer better fuel efficiency, an upgraded infotainment system, and advanced safety features. The official launch may take place in the second half of 2024.',
        image_url: 'https://www.cartoq.com/wp-content/uploads/2024/01/swift-testing-featured.jpg',
      },
      {
        id: '2',
        title: 'Mahindra Thar 5-Door Launch Expected Soon',
        description:
          'Mahindra is gearing up to launch the 5-door variant of its popular off-roader, the Thar. This new version will offer increased cabin space, larger boot capacity, and possibly a sunroof. It is expected to retain the rugged off-road capabilities of the original Thar while improving practicality for families and long-distance travelers.',
        image_url: 'https://www.motorbeam.com/wp-content/uploads/Mahindra-Thar-5-Door-Concept.jpg',
      },
      {
        id: '3',
        title: 'Toyota to Launch New Urban Cruiser',
        description:
          'Toyota is planning to reintroduce the Urban Cruiser with a completely new design and platform. It is likely to share its underpinnings with the Maruti Brezza but will feature Toyota’s signature styling and a refined driving experience. The SUV will target young buyers looking for a premium yet compact daily driver.',
        image_url: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Toyota/Urban-Cruiser/12237/1735368926257/front-left-side-47.jpg',
      },
    ];
    setNews(dummyNews);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ flex: 1, padding: 16 }}>
        <FlatList
          data={news}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Card style={styles.newsCard}>
              <TouchableOpacity activeOpacity={0.8}>
                <Image source={{ uri: item.image_url }} style={styles.newsImage} />
                <View style={styles.textContent}>
                  <Text style={styles.newsTitle}>{item.title}</Text>
                  <Text style={styles.newsDescription}>{item.description}</Text>
                </View>
              </TouchableOpacity>
            </Card>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  newsCard: {
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    backgroundColor: '#fff',
  },
  newsImage: {
    width: '100%',
    height: 160,
  },
  textContent: {
    padding: 10,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  newsDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
