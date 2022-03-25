
import * as React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from './components/HomeScreen';
import DetailsScreen from './components/DetailsScreen';
import ResultScreen from './components/ResultScreen';
import TermsScreen from './components/TermsScreen';
import ScoreScreen from './components/ScoreScreen';


import { useEffect } from 'react';

const Drawer = createDrawerNavigator();





function App() {
  const [isTermsAccepted,setisTermsAccepted] = React.useState(false);
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@isAccepted')
      console.log(value);
      if(value === 'yes') {
        setisTermsAccepted(true);
      }
    } catch(e) {
      // error reading value
    }
  }
    useEffect(()=>{
      getData()
    },[])
  return (
    isTermsAccepted ? (
<NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Details" component={DetailsScreen} />
        <Drawer.Screen name="Result" component={ResultScreen} />
        <Drawer.Screen  name="Score" component={ScoreScreen} options={{
            drawerItemStyle: { height: 0 },
          }} />
      </Drawer.Navigator>
    </NavigationContainer>

    ):<TermsScreen setisTermsAccepted = {setisTermsAccepted} />

  );
}

export default App;
