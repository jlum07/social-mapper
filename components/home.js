import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Text } from 'react-native';

import { Container, Content, Button, Body, Icon, H1, H2, H3 } from 'native-base';

import { createStackNavigator } from 'react-navigation';


class HomeScreen extends React.Component {

  static navigationOptions = { header: null }

  render() {
    return (
      <Container style={styles.container} >
        <Content contentContainerStyle={styles.content}>

          <H1 style={styles.title} >Welcome to Insta Buddy!</H1>
          <H3 style={styles.description} > Tap on map to view or long press to see nearby locations.</H3>

          <Button success large
            style={styles.homeButton}
            onPress={() => this.props.navigation.navigate('Map')} >
            <Text style={styles.buttonText} >
              Start Exploring
            </Text>
          </Button>

          <Button warning large
            style={styles.homeButton}
            onPress={() => this.props.navigation.navigate('MapTest')} >
            <Text style={styles.buttonText} >
              Beta Test
            </Text>
          </Button>

        </Content>
      </Container>
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
    backgroundColor: '#0072c4',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 100
  },
  description: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
    marginBottom: 75
  },
  homeButton: {
    alignSelf: 'center',
    padding: 15,
    margin: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '400',
    width: 120,
    textAlign: 'center',
  }
});

