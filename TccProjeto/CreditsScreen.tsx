// CreditsScreen.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HomeScreenNavigationProp } from './App'; // Importe o tipo HomeScreenNavigationProp do App.tsx

interface Props {
  navigation: HomeScreenNavigationProp;
}

const CreditsScreen: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Aluno: Gabriel Alexander{'\n'}
        Professor: Ricardo Rios{'\n'}
        Sistema de Monitoração de Luz{'\n'}
        Projeto feito para monitorar o consumo de luz 
        dentro de casa usando sistemas embarcados e IOT
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  }
});

export default CreditsScreen;
