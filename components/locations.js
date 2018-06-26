import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Text, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';

class LocationsScreen extends React.Component {

  static navigationOptions = { header: null };

  constructor(props) {

    super(props);



    this.getLocations = this.getLocations.bind(this);

  }

  getLocations (lat, lng) {

    let locationResponse = await axios.get('https://api.instagram.com/v1/locations/search?', {
      params: {
        access_token: "939649842.f08c135.ff5538a71c8c472ba9ea7a333d4c32eb",
        lat: lat,
        lng: lng,
      }
    })

    let locationSort = locationResponse.sort(function(prev, curr) {
      // return ((Math.abs(curr.latitude - lat) + Math.abs(curr.longitude - lng)) < (Math.abs(prev.latitude - lat) + Math.abs(prev.longitude - lng)) ? curr : prev);
      return (Math.sqrt(Math.pow(Math.abs(curr.latitude - lat), 2)) + Math.pow(Math.abs(curr.longitude - lng), 2) < Math.sqrt(Math.pow(Math.abs(prev.latitude - lat), 2) + Math.pow(Math.abs(prev.longitude - lng), 2)) ? -1 : 1);
    });

    return locationSort;

  }

  async componentDidMount() {

    locationsList = await getLocations(this.props.navigation.state.params.lat, this.props.navigation.state.params.lng);


  }


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
  Locations: {
    screen: LocationsScreen
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

