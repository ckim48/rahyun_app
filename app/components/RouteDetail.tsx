import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <View style={styles.starContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <FontAwesome
          key={star}
          name="star"
          size={20}
          color={star <= rating ? '#FFD700' : '#E0E0E0'}
        />
      ))}
    </View>
  );
};

export default function RouteDetail() {
  const params = useLocalSearchParams();
  const route = params.route ? JSON.parse(params.route as string) : null;

  const handleStart = () => {
    router.push({
      pathname: '/components/Running',
      params: { route: JSON.stringify(route) }
    });
  };

  if (!route) {
    return (
      <View style={styles.container}>
        <Text>Route not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} color="#000" />
          <Text style={styles.backText}>Back</Text>
        </Pressable>
      </View>

      <Text style={styles.title}>{route.name}</Text>
      
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: route.coordinates.latitude,
            longitude: route.coordinates.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          <Marker coordinate={route.coordinates} />
        </MapView>
      </View>

      <View style={styles.distanceContainer}>
        <Text style={styles.distance}>{route.distance}</Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.description}>{route.description}</Text>

        <View style={styles.ratingsContainer}>
          <View style={styles.ratingItem}>
            <Text style={styles.ratingLabel}>Road Condition</Text>
            <StarRating rating={route.ratings.roadCondition} />
          </View>
          <View style={styles.ratingItem}>
            <Text style={styles.ratingLabel}>Difficulty</Text>
            <StarRating rating={route.ratings.difficulty} />
          </View>
          <View style={styles.ratingItem}>
            <Text style={styles.ratingLabel}>Safety</Text>
            <StarRating rating={route.ratings.safety} />
          </View>
          <View style={styles.ratingItem}>
            <Text style={styles.ratingLabel}>Slope</Text>
            <StarRating rating={route.ratings.slope} />
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <Pressable style={styles.startButton} onPress={handleStart}>
          <Text style={styles.startButtonText}>Start</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    marginLeft: 8,
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  mapContainer: {
    height: 300,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  distanceContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFD700',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    margin: 16,
  },
  distance: {
    fontSize: 14,
    fontWeight: '500',
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 80,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  ratingsContainer: {
    paddingHorizontal: 16,
  },
  ratingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingLabel: {
    fontSize: 16,
    color: '#333',
  },
  starContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  startButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 