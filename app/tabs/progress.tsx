import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Progress() {
  const weekData = [
    { day: 'Mon', distance: 0, maxHeight: 4 },
    { day: 'Tue', distance: 2, maxHeight: 3 },
    { day: 'Wed', distance: 0, maxHeight: 4 },
    { day: 'Thu', distance: 3, maxHeight: 4 },
    { day: 'Fri', distance: 5, maxHeight: 5 },
    { day: 'Sat', distance: 0, maxHeight: 3 },
    { day: 'Sun', distance: 4, maxHeight: 4 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progress</Text>
      
      {/* Bar Chart */}
      <View style={styles.chartContainer}>
        {weekData.map((item, index) => (
          <View key={index} style={styles.barWrapper}>
            <View style={[styles.bar, { height: (item.maxHeight / 6) * 200 }]}>
              <View 
                style={[
                  styles.filledBar, 
                  { 
                    height: `${(item.distance / item.maxHeight) * 100}%`,
                  }
                ]} 
              />
            </View>
            <Text style={styles.dayLabel}>{item.day}</Text>
          </View>
        ))}
        <View style={styles.yAxis}>
          <Text style={styles.yLabel}>6km</Text>
          <Text style={styles.yLabel}>4km</Text>
          <Text style={styles.yLabel}>2km</Text>
          <Text style={styles.yLabel}>0km</Text>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <View style={styles.statHeader}>
            <FontAwesome5 name="clock" size={20} color="#333" />
            <Text style={styles.statTitle}>Time</Text>
          </View>
          <Text style={styles.statValue}>00:00:00</Text>
        </View>
        <View style={styles.statBox}>
          <View style={styles.statHeader}>
            <FontAwesome5 name="road" size={20} color="#333" />
            <Text style={styles.statTitle}>Distance</Text>
          </View>
          <Text style={styles.statValue}>0km</Text>
        </View>
      </View>

      {/* Route */}
      <View style={styles.routeBox}>
        <Text style={styles.routeTitle}>Route</Text>
        <Text style={styles.routeValue}>-</Text>
      </View>

      {/* Goal */}
      <View style={styles.goalContainer}>
        <Text style={styles.goalTitle}>This Week's Goal <FontAwesome5 name="pencil-alt" size={16} color="#333" /></Text>
        <Text style={styles.goalText}>Total: 30 km</Text>
        <Text style={styles.goalText}>Speed: 45 mins / km</Text>
      </View>

      {/* Recommendation Button */}
      <Pressable 
        style={styles.recommendButton}
        onPress={() => router.push('/')}
      >
        <Text style={styles.recommendButtonText}>Recommendation</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  chartContainer: {
    flexDirection: 'row',
    height: 200,
    alignItems: 'flex-end',
    marginBottom: 30,
    paddingLeft: 30,
  },
  barWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  bar: {
    width: 20,
    backgroundColor: '#E5E5E5',
    borderRadius: 10,
    justifyContent: 'flex-end',
  },
  filledBar: {
    backgroundColor: '#00FF00',
    width: '100%',
    borderRadius: 10,
  },
  dayLabel: {
    marginTop: 5,
    fontSize: 12,
  },
  yAxis: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 20,
    justifyContent: 'space-between',
  },
  yLabel: {
    fontSize: 12,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  statTitle: {
    marginLeft: 5,
    fontSize: 16,
    color: '#333',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  routeBox: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  routeTitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  routeValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  goalContainer: {
    marginBottom: 20,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  goalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  recommendButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  recommendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 