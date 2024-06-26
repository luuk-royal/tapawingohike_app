/*
This component displays a celebratory message and options upon completing a route. It includes a congratulatory animation (Lottie), buttons to navigate back to login
or return to the previous route segment, and a confetti effect that triggers on screen. Additionally, it plays a sound upon component initialization.
*/

import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ConfettiCannon from 'react-native-confetti-cannon';
import LottieView from 'lottie-react-native';
import { Audio } from 'expo-av';

const RouteCompletionComponent = ({ onBackToPrevious }) => {
  const navigation = useNavigation();
  const confettiRef = useRef(null);
  const lottieRef = useRef(null);
  let sound = useRef(null);

  useEffect(() => {
    // Load and play the sound
    const loadSound = async () => {
      try {
        const { sound: soundObject } = await Audio.Sound.createAsync(
          require('../assets/finishRoute.mp3')
        );
        sound.current = soundObject;
        await sound.current.playAsync();
      } catch (error) {
        console.log('Error loading sound', error);
      }
    };

    loadSound();

    // Clean up sound when component unmounts
    return () => {
      if (sound.current) {
        sound.current.unloadAsync();
      }
    };
  }, []);

  const handleBackToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
              {/* Render Lottie Animation */}
      <LottieView
        ref={lottieRef}
        source={require('../assets/celebration.json')}
        autoPlay
        loop={true}
        style={styles.lottieAnimation}
      />
        <Text style={styles.completionText}>Gefeliciteerd!</Text>
        <Text style={styles.completionText}>Je hebt de route voltooid.</Text>
        <TouchableOpacity onPress={handleBackToLogin} style={styles.button}>
          <Text style={styles.buttonText}>Terug naar Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onBackToPrevious} style={styles.button}>
          <Text style={styles.buttonText}>Terug naar vorige deel</Text>
        </TouchableOpacity>
      </View>
      {/* Render ConfettiCannon component with a ref */}
      <ConfettiCannon
        ref={confettiRef}
        count={200}
        origin={{ x: -10, y: 0 }}
        fadeOut={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bcebdf',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    width: '80%',
  },
  completionText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  lottieAnimation: {
    width: 150,
    height: 150,
    marginTop: 20,
  },
});

export default RouteCompletionComponent;
