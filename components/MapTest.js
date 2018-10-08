import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Dimensions, ToastAndroid } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Constants, Location, Permissions } from 'expo';

import { Container, Content, Button, Body, Icon, Fab } from 'native-base';

import axios from 'axios';

import { createStackNavigator } from 'react-navigation';

let { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;

// TORONTO
const LATITUDE = 43.6532;
const LONGITUDE = -79.3832;

// NYC
// const LATITUDE = 40.771133;
// const LONGITUDE = -73.974187;

// const LATITUDE = null;
// const LONGITUDE = null;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const fabOptions = {
  instagram: {
    name: 'instagram',
    color: '#c32aa3',
    icon: 'logo-instagram'
  },
  snapchat: {
    name: 'snapchat',
    color: '#fffc00',
    icon: 'logo-snapchat'
  },
};

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
      errorMessage: null,
      mode: 'instagram',
      fabActive: false,
      fab: {
        active: false,
        mode: 'instagram',
        icon: 'logo-instagram',
        color: '#c32aa3',
      }
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
      }
    });

  };

  handleFabClick(type) {

    this.setState({
      fab: {
        // active: false,
        mode: type,
        icon: fabOptions[type].icon,
        color: fabOptions[type].color
      },
      fabActive: false,
    });

  }

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
          initialRegion={this.state.region}
          style={styles.map}
          showsUserLocation={true}
          showsMyLocationButton={true}
          showsCompass={true}
          mapPadding={{ left: 0, right: 0, top: 0, bottom: 0 }}
          onPress={(e) => this.props.navigation.navigate('Insta', { lat: e.nativeEvent.coordinate.latitude, lng: e.nativeEvent.coordinate.longitude })}
          onLongPress={(e) => this.props.navigation.navigate('Locations', { lat: e.nativeEvent.coordinate.latitude, lng: e.nativeEvent.coordinate.longitude })}
        >

        </MapView>

        <Fab
          active={this.state.fabActive}
          direction="up"
          containerStyle={{ bottom: 20 }}
          // style={styles.fab}
          style={{ backgroundColor: this.state.fab.color }}
          position="bottomRight"
          onPress={() => this.setState({ fabActive: !this.state.fabActive })}
        >
          <Icon name={this.state.fab.icon} />
          <Button
            style={{ backgroundColor: '#c32aa3' }}
            onPress={() => this.handleFabClick('instagram')} >
            <Icon name="logo-instagram" />
          </Button>
          <Button style={{ backgroundColor: '#fffc00' }}
            onPress={() => this.handleFabClick('snapchat')} >
            <Icon name="logo-snapchat" />
          </Button>
        </Fab>


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
  },
  fab: {
    // backgroundColor: '#c32aa3',
    // backgroundColor: this.state.fab.color,
  }
});
