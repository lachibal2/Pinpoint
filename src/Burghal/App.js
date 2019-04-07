import React from 'react';
import { StyleSheet, Text, View, TextInput, DropDown, Button, TouchableOpacity, Picker, Alert, Image } from 'react-native';
import MapView from 'react-native-maps';
import { createStackNavigator, createAppContainer } from 'react-navigation';

class Home extends React.Component {
  static navigationOptions = {
    title: 'Pinpoint',
  }

  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: 0,
        longitude: 80,
        latitudeDelta: 0.0522,
        longitudeDelta: 0.0021,
      },
      markers: [],
      pickerValue: null,
    };
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition (
        function(position){
          console.log(position);
          this.setState({region.latitude: position.latitude});
        },
      );

    console.log(this.state.region);
    return (this.state.region);
  
  }

  addMarker(){

  }

  render() {
    const {navigate} = this.props.navigation;


    return (
      <View style={styles.container}>
        
        <MapView style={styles.map}
          region = {this.state.region}
          showsUserLocation = {true} />

        <Picker
          selectedValue={this.state.pickerValue}
          style={styles.input}
          onValueChange={(itemValue, itemIndex) => this.setState({pickerValue: itemValue})}>
            <Picker.Item label="Bathroom" value="br" />
            <Picker.Item label="Park" value="pk" />
            <Picker.Item label="Water Fountain" value="wf" />
            <Picker.Item label="Trash/Recycling" value="tr" />
            <Picker.Item label="Bike Racks" value="br" />
        </Picker>

        <Image source={require('./assets/Logo2.png')} style={styles.image}/>

        <View style={styles.button}>
          <TouchableOpacity style={{...StyleSheet.absoluteFillObject, }}
            onPress={this.getLocation} color="#fff">
            <Text style={{color:'#fff'}}>+</Text>
          </TouchableOpacity>
        
        </View>
      </View>
    );
  }
}

class AddLocation extends React.Component {
  static navigationOptions = {
    title: 'Add a Location',
  }

  render () {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>Add a location!</Text>
        <TextInput
        keyboardType='numeric'
        placeholder="Rating (1-5)"
        style={{height: 90, width: 100, position:'absolute', top:25, left:160}}
        onChangeText={(text) => this.setState({text})}/>
      </View>
    );
  }
}

const main_nav = createStackNavigator({
  Home: {screen: Home},
  AddLocation: {screen: AddLocation},
},
  {initialRouteName: "Home"}
);

const AppContainer = createAppContainer(main_nav);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },

  map: {
    ...StyleSheet.absoluteFillObject, 
    flex:1,
    alignItems: 'center',
  },

  input: {
    position: 'absolute',
    top: 50,
    left: 60,
    height: 40,
    width: 250,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1.2,
  },

  button: {
    position: 'absolute',
    top: 55,
    left: 325,
    height: 30,
    width: 30,
    backgroundColor: '#4da6ff',
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    color: '#fff'
  },

  button_opac: {
    alignItems: 'baseline',
    justifyContent: 'space-evenly',
    opacity: 0.5,
  },

  image: {
    height: 40,
    width: 40,
    position: 'absolute',
    top: 50,
    left: 15,
  }
});