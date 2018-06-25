import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Text, Button, ToastAndroid } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Gallery from 'react-native-image-gallery';
import axios from 'axios';

class InstaScreen extends React.Component {

  static navigationOptions = { header: null }

  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      images: [],
      location: ''
    };

    this.onChangeImage = this.onChangeImage.bind(this);
    this.getInstagrams = this.getInstagrams.bind(this);

  }

  async componentDidMount() {

    // console.log("NAV: ", this.props.navigation.state.params)

    let rawInsta = await this.getInstagrams(this.props.navigation.state.params.lat, this.props.navigation.state.params.lng);

    // console.log(rawInsta);

    let instaPosts = rawInsta.map( post => {
      return {
        caption: post.text,
        source: { uri: post.url },
        // dimensions: { width: post.dimensions.width, height: post.dimensions.height }
      }
    })

    console.log(instaPosts);

    this.setState({ images: instaPosts });

  }

  onChangeImage (index) {
      this.setState({ index });
  }

  async getInstagrams(lat,lng) {

    // console.log("?????",lat, lng);

    let locationResponse = await axios.get('https://api.instagram.com/v1/locations/search?', {
      params: {
        access_token: "939649842.f08c135.ff5538a71c8c472ba9ea7a333d4c32eb",
        lat: lat,
        lng: lng,
      }
    })

    // console.log(locationResponse);

    let locArr = locationResponse.data.data.slice(0,5);
    let location = locArr.reduce(function(prev, curr) {
      return ((Math.abs(curr.latitude - lat) + Math.abs(curr.longitude - lng)) < (Math.abs(prev.latitude - lat) + Math.abs(prev.longitude - lng)) ? curr : prev);
    });

    ToastAndroid.showWithGravityAndOffset(JSON.stringify(location.name), ToastAndroid.LONG, ToastAndroid.TOP, 0, 100);

    // this.setState({ location: location.name });

    let instagramResponse = await axios.get(
      `https://www.instagram.com/explore/locations/${location.id}/?__a=1`
    );

    let edges = instagramResponse.data.graphql.location.edge_location_to_top_posts.edges;

    let posts = edges.map(x => {
      return {
        url: x.node.display_url,
        // text: x.node.edge_media_to_caption.edges["0"].node.text,
        text: (x.node.edge_media_to_caption.edges.length > 0 ? x.node.edge_media_to_caption.edges["0"].node.text : ""),
        // timestamp: x.node.taken_at_timestamp,
        demensions: x.node.dimensions
      }
    })

    // console.log(posts);
    return posts;

    // return "test"

  }

  get caption () {
      const { images, index } = this.state;
      return (
          <View style={{ bottom: 0, minHeight: 65, height: 'auto', backgroundColor: 'rgba(0, 0, 0, 0.5)', width: '100%', position: 'absolute', justifyContent: 'center' }}>
              <Text style={{ textAlign: 'center', color: 'white', fontSize: 15, fontStyle: 'italic' }}>{ (images[index] && images[index].caption) || '' } </Text>
          </View>
      );
  }

  get galleryCount () {
    const { index, images } = this.state;
    return (
      <View style={{ top: 0, height: 65, backgroundColor: 'rgba(0, 0, 0, 0.5)', width: '100%', position: 'absolute', justifyContent: 'center' }}>
        <Text style={{ textAlign: 'right', color: 'white', fontSize: 15, fontStyle: 'italic', paddingRight: '10%' }}>{ index + 1 } / { images.length }</Text>
      </View>
      );
  }

  render() {
    return (
      <View style={styles.container} >
        <Gallery
          style={{flex: 1, backgroundColor: '#000'}}
          images={this.state.images}
          errorComponent={this.renderError}
          onPageSelected={this.onChangeImage}
          initialPage={0}
        />
        { this.galleryCount }
        { this.caption }
      </View>
    );
  }
}

export default createStackNavigator({
  Insta: {
    screen: InstaScreen
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#00a5ff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

