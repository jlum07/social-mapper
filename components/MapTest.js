import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Dimensions, ToastAndroid } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Constants, Location, Permissions } from 'expo';
import axios from 'axios';

import { createStackNavigator } from 'react-navigation';

let { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;

// TORONTO
// const LATITUDE = 43.6532;
// const LONGITUDE = -79.3832;

// NYC
// const LATITUDE = 40.771133;
// const LONGITUDE = -73.974187;

const LATITUDE = null;
const LONGITUDE = null;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class MapTestScreen extends React.Component {

  static navigationOptions = { header: null };

  constructor() {
    super();
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    };
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});

    console.log(location)

    // this.setState({ location });

    this.setState({
      region: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    }});

    console.log(this.state)

  };


  componentDidMount() {
    this._getLocationAsync();
    // setTimeout(() => this.forceUpdate(), 1000);
    // setTimeout(() => this.setState({ flex: 1 }), 500);
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          region={this.state.region}
          style={styles.map}
          showsUserLocation={true}
          showsMyLocationButton={true}
          showsCompass={true}
          mapPadding={{ left: 0, right: 0, top: 0, bottom: 0 }}
          onPress={(e) => this.props.navigation.navigate('Insta', { lat: e.nativeEvent.coordinate.latitude, lng: e.nativeEvent.coordinate.longitude })}
          onLongPress={(e) => this.props.navigation.navigate('Locations', { lat: e.nativeEvent.coordinate.latitude, lng: e.nativeEvent.coordinate.longitude })}
        >
        </MapView>
      </View>
    );
  }
}


export default createStackNavigator({
  MapTest: {
    screen: MapTestScreen
  },
});


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    // height: '100%',
    // width: '100%',
    // paddingTop: 200,
    // flex: this.state.flex
  }
});
