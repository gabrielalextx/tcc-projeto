// App.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import ConsumptionScreen from './ConsumptionScreen';
import CreditsScreen from './CreditsScreen';
//import type RootStackParamList from './HomeScreen';

type RootStackParamList = {
  Home: undefined;
  Consumption: undefined;
  Credits: undefined;
};

export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Consumption" component={ConsumptionScreen} />
        <Stack.Screen name="Credits" component={CreditsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
