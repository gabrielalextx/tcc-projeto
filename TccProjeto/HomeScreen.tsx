// HomeScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
//import { StackNavigationProp } from '@react-navigation/stack';
import { HomeScreenNavigationProp } from './App'; 

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const handleConsumptionPress = () => {
    navigation.navigate('Consumption');
  };

  const handleCreditsPress = () => {
    navigation.navigate('Credits');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleConsumptionPress}>
        <Text style={styles.buttonText}>Ver consumo de energia</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleCreditsPress}>
        <Text style={styles.buttonText}>Créditos</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  button: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
