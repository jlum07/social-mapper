import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Text, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';

class HomeScreen extends React.Component {

  static navigationOptions = { header: null }

  render() {
    return (
      <View style={styles.container} >
        <Text style={styles.title} >Welcome to Insta Buddy!</Text>
        <Text style={styles.description} >Long press on map map location to explore.</Text>
        <Button
          style={ styles.homeButton }
          title="Start Exploring"
          onPress={() => this.props.navigation.navigate('Map')}
        />
      </View>
    );
  }
}

export default createStackNavigator({
  Home: {
    screen: HomeScreen
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#42f4d9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    color: '#fff',
    marginBottom: 100
  },
  description: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 100
  },
  homeButton: {
    color: 'red',
    padding: 20,
  }
});

