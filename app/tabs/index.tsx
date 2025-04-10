import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import { router } from 'expo-router';

const recommendedRoutes = [
  { 
    name: 'Songdo Central Park',
    distance: '5.02km',
    coordinates: { latitude: 37.3830, longitude: 126.6580 },
    description: "It's a scenic course perfect for peaceful run, especially on weekday evenings and weekend mornings when it's less crowded.",
    ratings: {
      roadCondition: 5,
      difficulty: 3,
      safety: 4,
      slope: 2,
    }
  },
  { 
    name: '3 Lakeside Park',
    distance: '6.28km',
    coordinates: { latitude: 37.3820, longitude: 126.6570 },
    description: "A beautiful lakeside course with stunning water views.",
    ratings: {
      roadCondition: 4,
      difficulty: 4,
      safety: 5,
      slope: 3,
    }
  },
  { 
    name: 'Dalbit (Moonlight) Park',
    distance: '4.95km',
    coordinates: { latitude: 137.3840, longitude: 126.6590 },
    description: "Perfect for evening runs with well-lit paths.",
    ratings: {
      roadCondition: 5,
      difficulty: 2,
      safety: 5,
      slope: 1,
    }
  },
  { 
    name: 'Central Park',
    distance: '2.67km',
    coordinates: { latitude: 237.3835, longitude: 126.6575 },
    description: "A short but sweet urban course through the heart of Songdo.",
    ratings: {
      roadCondition: 5,
      difficulty: 1,
      safety: 5,
      slope: 1,
    }
  },
  { 
    name: 'Jack Nicklaus GC',
    distance: '5.94km',
    coordinates: { latitude: 937.3825, longitude: 126.6585 },
    description: "A challenging course around the golf club perimeter.",
    ratings: {
      roadCondition: 4,
      difficulty: 4,
      safety: 3,
      slope: 4,
    }
  },
];

export default function Home() {
  const handleRoutePress = (route: any) => {
    router.push({
      pathname: '/components/RouteDetail',
      params: { route: JSON.stringify(route) }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Recommended Routes</Text>
      
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.3830,
            longitude: 126.6580,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          {recommendedRoutes.map((route, index) => (
            <Marker
              key={index}
              coordinate={route.coordinates}
            />
          ))}
        </MapView>
      </View>

      <ScrollView style={styles.routeList}>
        {recommendedRoutes.map((route, index) => (
          <Pressable
            key={index}
            style={styles.routeItem}
            onPress={() => handleRoutePress(route)}
          >
            <Text style={styles.routeName}>{route.name}</Text>
            <View style={styles.distanceBadge}>
              <Text style={styles.distanceText}>{route.distance}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
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
  routeList: {
    flex: 1,
    marginTop: 16,
  },
  routeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  routeName: {
    fontSize: 16,
    fontWeight: '500',
  },
  distanceBadge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  distanceText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
