import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Dimensions, ToastAndroid } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import axios from 'axios';

import { createStackNavigator } from 'react-navigation';

let { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 43.6532;
const LONGITUDE = -79.3832;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class MapScreen extends React.Component {

  static navigationOptions = { header: null };

  constructor() {
    super();
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
    };

    this.getInstagrams = this.getInstagrams.bind(this);

  }

  async getInstagrams(lat,lng) {

    let locationResponse = await axios.get('https://api.instagram.com/v1/locations/search?', {
      params: {
        access_token: "939649842.f08c135.ff5538a71c8c472ba9ea7a333d4c32eb",
        lat: lat,
        lng: lng,
      }
    })
    // .then(function (response) {
    //   console.log(response.data.data);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });

    // console.log(locationResponse);

    let locArr = locationResponse.data.data.slice(0,5);
    let location = locArr.reduce(function(prev, curr) {
      return ((Math.abs(curr.latitude - lat) + Math.abs(curr.longitude - lng)) < (Math.abs(prev.latitude - lat) + Math.abs(prev.longitude - lng)) ? curr : prev);
    });

    ToastAndroid.show(JSON.stringify(location), ToastAndroid.LONG);

    let instagramResponse = await axios.get(
      `https://www.instagram.com/explore/locations/${location.id}/?__a=1`
    );

    let edges = instagramResponse.data.graphql.location.edge_location_to_top_posts.edges;

    let posts = edges.map(x => {
      return {
        url: x.node.display_url,
        // text: x.node.edge_media_to_caption.edges["0"].node.text,
        text: (x.node.edge_media_to_caption.edges.length > 0 ? x.node.edge_media_to_caption.edges["0"].node.text : ""),
        timestamp: x.node.taken_at_timestamp,
        demensions: x.node.dimensions
      }
    })

    console.log(posts);

  }

  render() {
    return (
      <MapView
        provider={ PROVIDER_GOOGLE }
        style={ styles.container }
        showsUserLocation={ true }
        region={ this.state.region }
        // onLongPress={ (event) => this.getInstagrams(event.nativeEvent.coordinate.latitude, event.nativeEvent.coordinate.longitude) }
        onLongPress={ (e) => this.props.navigation.navigate('Insta', {lat: e.nativeEvent.coordinate.latitude, lng: e.nativeEvent.coordinate.longitude}) }
      >

      </MapView>
    );
  }
}


export default createStackNavigator({
  Map: {
    screen: MapScreen
  },
});


const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  }
});
