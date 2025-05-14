import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';

// Get screen width for responsive design
const { width } = Dimensions.get('window');

export default function CarComparisonDetails({ route }) {
  const { selectedCars } = route.params;

  // Function to determine which car has better specs
  const getBetterOption = (feature, car1Value, car2Value) => {
    // Only compare numeric values
    if (feature === 'engine_power' || feature === 'mileage' || feature === 'seating_capacity') {
      const num1 = parseInt(car1Value);
      const num2 = parseInt(car2Value);

      if (!isNaN(num1) && !isNaN(num2)) {
        // For engine power, higher is better
        if (feature === 'engine_power') return num1 > num2 ? 0 : num2 > num1 ? 1 : -1;

        // For seating capacity, depends on user preference, so just show difference
        if (feature === 'seating_capacity') return -1;

        // For mileage, higher is better
        if (feature === 'mileage') return num1 > num2 ? 0 : num2 > num1 ? 1 : -1;
      }
    }
    return -1; // No comparison for non-numeric or equal values
  };

  // Feature comparison data
  const comparisonFeatures = [
    { label: 'Engine Power', key: 'engine_power' },
    { label: 'Fuel Type', key: 'fuel_type' },
    { label: 'Price Range', key: 'price_range' },
    { label: 'Seating Capacity', key: 'seating_capacity' },
    { label: 'Mileage', key: 'mileage' },
    { label: 'Transmission', key: 'transmission' },
    { label: 'Boot Space', key: 'boot_space' },
    { label: 'Type', key: 'type' },
  ];

  return (
    <ScrollView style={styles.container}>
      {selectedCars[0] && selectedCars[1] && (
        <>
          {/* Header with car names */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Car Comparison</Text>
            <View style={styles.carNamesContainer}>
              <Text style={styles.carNameHeader}>{selectedCars[0].name}</Text>
              <Text style={styles.vsText}>VS</Text>
              <Text style={styles.carNameHeader}>{selectedCars[1].name}</Text>
            </View>
          </View>

          {/* Car Images */}
          <View style={styles.imageContainer}>
            <View style={styles.imageWrapper}>
              <Image
                source={{ uri: selectedCars[0].image_url }}
                style={styles.carImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.imageWrapper}>
              <Image
                source={{ uri: selectedCars[1].image_url }}
                style={styles.carImage}
                resizeMode="contain"
              />
            </View>
          </View>

          {/* Feature Comparison */}
          <View style={styles.comparisonContainer}>
            <Text style={styles.sectionTitle}>Feature Comparison</Text>

            {comparisonFeatures.map((feature, index) => {
              const betterOption = getBetterOption(
                feature.key,
                selectedCars[0][feature.key],
                selectedCars[1][feature.key]
              );

              return (
                <View
                  key={index}
                  style={[
                    styles.featureRow,
                    index % 2 === 0 ? styles.evenRow : styles.oddRow
                  ]}
                >
                  <Text style={styles.featureLabel}>{feature.label}</Text>
                  <View style={styles.valueContainer}>
                    <Text
                      style={[
                        styles.featureValue,
                        betterOption === 0 ? styles.betterValue : {}
                      ]}
                    >
                      {selectedCars[0][feature.key]}
                    </Text>
                  </View>
                  <View style={styles.valueContainer}>
                    <Text
                      style={[
                        styles.featureValue,
                        betterOption === 1 ? styles.betterValue : {}
                      ]}
                    >
                      {selectedCars[1][feature.key]}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>

          {/* Overall Summary */}
          <View style={styles.summaryContainer}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <View style={styles.summaryContent}>
              <Text style={styles.summaryText}>
                Both cars offer distinct advantages. The {selectedCars[0].name} features {selectedCars[0].engine_power}
                engine power and {selectedCars[0].fuel_type} fuel type, while the {selectedCars[1].name}
                offers {selectedCars[1].engine_power} engine power with {selectedCars[1].fuel_type} fuel type.
              </Text>
              <Text style={styles.summaryText}>
                Consider your priorities in terms of price range, seating capacity, and fuel efficiency
                when making your decision.
              </Text>
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: '#1a73e8',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  carNamesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  carNameHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
  vsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffcc00',
    marginHorizontal: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  imageWrapper: {
    width: width * 0.45,
    height: 180,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  carImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  comparisonContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    padding: 16,
    backgroundColor: '#f0f2f5',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  featureRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  evenRow: {
    backgroundColor: '#ffffff',
  },
  oddRow: {
    backgroundColor: '#f9f9f9',
  },
  featureLabel: {
    flex: 1.2,
    fontSize: 16,
    color: '#444',
    fontWeight: '500',
  },
  valueContainer: {
    flex: 1,
    alignItems: 'center',
  },
  featureValue: {
    fontSize: 15,
    color: '#666',
  },
  betterValue: {
    color: '#1a73e8',
    fontWeight: 'bold',
  },
  summaryContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    margin: 16,
    marginTop: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
    marginBottom: 30,
  },
  summaryContent: {
    padding: 16,
  },
  summaryText: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
    marginBottom: 10,
  },
});