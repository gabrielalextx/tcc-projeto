import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from './App'; 


interface Props {
  navigation: HomeScreenNavigationProp;
}

//Botões de navegação entre as 3 telas
const ConsumptionScreen: React.FC<Props> = ({ navigation }) => {
  const handleDailyPress = () => {
    navigation.navigate('DailyConsumption');
  };

  const handleWeeklyPress = () => {
    navigation.navigate('WeeklyConsumption');
  };

  const handleMonthlyPress = () => {
    navigation.navigate('MonthlyConsumption');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleDailyPress}>
        <Text style={styles.buttonText}>Consumo Diário</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleWeeklyPress}>
        <Text style={styles.buttonText}>Consumo Semanal</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleMonthlyPress}>
        <Text style={styles.buttonText}>Consumo Mensal</Text>
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

export default ConsumptionScreen;
