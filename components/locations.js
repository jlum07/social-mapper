import React, { Component } from 'react';
import { StyleSheet, Button } from 'react-native';
import { Container, Content, List, ListItem, Left, Right, Text, Icon } from 'native-base';
import { createStackNavigator } from 'react-navigation';
import axios from 'axios';

class LocationsScreen extends React.Component {

  static navigationOptions = { header: null };

  constructor(props) {

    super(props);

    this.state = {
      locations: []
    }

    this.getLocations = this.getLocations.bind(this);

  }

  async componentDidMount() {
    let locationsList = await this.getLocations(this.props.navigation.state.params.lat, this.props.navigation.state.params.lng);

    this.setState({ locations: locationsList });
  }

  async getLocations(lat, lng) {

    let locationResponse = await axios.get('https://api.instagram.com/v1/locations/search?', {
      params: {
        access_token: "939649842.f08c135.ff5538a71c8c472ba9ea7a333d4c32eb",
        lat: lat,
        lng: lng,
      }
    })

    // console.log(locationResponse.data.data);

    let locationSort = locationResponse.data.data.sort(function(prev, curr) {
      // return ((Math.abs(curr.latitude - lat) + Math.abs(curr.longitude - lng)) < (Math.abs(prev.latitude - lat) + Math.abs(prev.longitude - lng)) ? curr : prev);
      return (Math.sqrt(Math.pow(Math.abs(curr.latitude - lat), 2)) + Math.pow(Math.abs(curr.longitude - lng), 2) < Math.sqrt(Math.pow(Math.abs(prev.latitude - lat), 2) + Math.pow(Math.abs(prev.longitude - lng), 2)) ? 1 : -1);
    });

    console.log(locationSort);

    return locationSort;

  }

  render() {

    let displayList = this.state.locations.map((location) => {
      return (
        <ListItem noIndent button={true} onPress={ () => this.props.navigation.navigate('InstaCards', { location: location })} >
          <Left>
            <Text>{location.name}</Text>
          </Left>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem >
      )
    })

    return (
      <Container>
        <Content>
          <List>
            {displayList}
          </List>
        </Content>
      </Container>
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
});
