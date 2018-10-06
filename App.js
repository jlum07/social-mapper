import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Text, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import HomeScreen from './components/home';
import MapScreen from './components/map';
import LocationsScreen from './components/locations';
import InstaScreen from './components/insta';
import InstaCardsScreen from './components/instaCards';

import MapTestScreen from './components/MapTest';

export default class App extends React.Component {

  static navigationOptions = {
    header: {
      visible: false,
      title: "test"
    }
  };

  // static navigationOptions = { header: null }

  render() {
    return (
      <RootStack />
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Map: MapScreen,
    Locations: LocationsScreen,
    Insta: InstaScreen,
    InstaCards: InstaCardsScreen,
    MapTest: MapTestScreen,
  },
  {
    headerMode: 'none',
  },
  {
    initialRouteName: 'Home',
  },
);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#00a5ff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 20,
//     color: '#fff',
//   },
//   homeButton: {
//     marginTop: 50,
//   }
// });

