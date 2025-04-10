import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Running() {
  const params = useLocalSearchParams();
  const route = params.route ? JSON.parse(params.route as string) : null;
  
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(time => time + 1000); // 1초씩 증가
      }, 1000);
    }
    
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning]);

  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    setTime(0);
    // TODO: Save the record
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Running</Text>
      </View>

      <View style={styles.routeInfo}>
        <Text style={styles.routeName}>{route?.name}</Text>
        <View style={styles.distanceBadge}>
          <Text style={styles.distanceText}>{route?.distance}</Text>
        </View>
        <Pressable style={styles.cameraButton}>
          <FontAwesome5 name="camera" size={24} color="#666" />
        </Pressable>
      </View>

      <View style={styles.timerContainer}>
        <Text style={styles.timer}>{formatTime(time)}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, styles.startButton, isRunning && styles.disabledButton]}
          onPress={handleStart}
          disabled={isRunning}
        >
          <Text style={styles.buttonText}>Start</Text>
        </Pressable>
        
        <Pressable
          style={[styles.button, styles.pauseButton, !isRunning && styles.disabledButton]}
          onPress={handlePause}
          disabled={!isRunning}
        >
          <Text style={styles.buttonText}>Pause</Text>
        </Pressable>
      </View>

      <Pressable style={styles.stopButton} onPress={handleStop}>
        <Text style={styles.stopButtonText}>Stop</Text>
      </Pressable>

      <Text style={styles.hint}>** Press 'Stop' button to save the record.</Text>

      <View style={styles.bottomNav}>
        <Pressable style={styles.navItem}>
          <FontAwesome5 name="route" size={24} color="#4A90E2" />
          <Text style={[styles.navText, styles.activeNavText]}>Route</Text>
        </Pressable>
        <Pressable style={styles.navItem}>
          <FontAwesome5 name="chart-line" size={24} color="#666" />
          <Text style={styles.navText}>Progress</Text>
        </Pressable>
        <Pressable style={styles.navItem}>
          <FontAwesome5 name="random" size={24} color="#666" />
          <Text style={styles.navText}>Generate</Text>
        </Pressable>
        <Pressable style={styles.navItem}>
          <FontAwesome5 name="user" size={24} color="#666" />
          <Text style={styles.navText}>Storage</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 80, // Add padding to prevent content from being hidden by bottom nav
  },
  header: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  routeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  routeName: {
    fontSize: 18,
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
  cameraButton: {
    padding: 8,
  },
  timerContainer: {
    alignItems: 'center',
    marginVertical: 48,
  },
  timer: {
    fontSize: 64,
    fontWeight: '300',
    fontVariant: ['tabular-nums'],
    letterSpacing: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 16,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
    minWidth: 120,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  pauseButton: {
    backgroundColor: '#9E9E9E',
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  stopButton: {
    backgroundColor: '#F44336',
    marginHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
  },
  stopButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  hint: {
    textAlign: 'center',
    color: '#666',
    marginTop: 8,
    fontStyle: 'italic',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
    height: 80,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 8,
  },
  navText: {
    marginTop: 4,
    fontSize: 12,
    color: '#666',
  },
  activeNavText: {
    color: '#4A90E2',
  },
}); 