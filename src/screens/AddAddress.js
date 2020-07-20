import * as React from 'react'
import {Text,Button,Image,TouchableOpacity,Dimensions,StyleSheet,View, Animated} from 'react-native';
import MapView, {Marker} from 'react-native-maps'
import { Directions, TextInput } from 'react-native-gesture-handler';
import SubmitButton from '../components/SubmitButton';
import * as Location from 'expo-location';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage'

export default class AddAddress extends React.Component{






    constructor(props){
        super(props);
        this.state= {
          circlemark: new Animated.Value(0),
          circleopacity: new Animated.Value(1),
          circlemarktrail: new Animated.Value(0),
          circleopacitytrail: new Animated.Value(1),
            marker:{
                title: 'Home',
                description: 'Move map around to focus on point',
            },
            title: 'LatLng',
            description: 'city',
            flexfor: 3,
            latitude: this.props.route.params.initialCamera.center.latitude,
            longitude: this.props.route.params.initialCamera.center.longitude
        };
        this.location={

        };
        this.errorMst={};
    };

    addAddress= async ()=>{
      if(this.state.title != 'loading'){
        var data=[];
        var jsondata= await AsyncStorage.getItem('addresses');
        var data= JSON.parse(jsondata);
        if(data==null)
          data=[];
        data.push({text: this.state.title,lat: this.state.latitude,lng: this.state.longitude});
        console.log(data[0]);
        var jsonified= JSON.stringify(data);
        await AsyncStorage.setItem('addresses',jsonified);
        this.props.route.params.onComeBack({item: true})
        this.props.navigation.goBack();
      }

    };

    animations= ()=>{
      const {circlemark,circleopacity,circleopacitytrail,circlemarktrail} =this.state;
      Animated.loop(
        Animated.stagger(700,[
          Animated.sequence([
            Animated.parallel([
              Animated.timing(circlemark,{
                toValue: 1,
                duration: 1700,
                useNativeDriver: true
              }),
              Animated.timing(circleopacity,{
                toValue: 0,
                duration: 1700,
                useNativeDriver: true
              })
            ]),
            Animated.parallel([
              Animated.timing(circlemark,{
              toValue: 0,
              duration: 0,
              useNativeDriver:true
            }),
            Animated.timing(circleopacity,{
              toValue: 1,
              duration:0,
              useNativeDriver: true
            })
          ])])
          ,
          Animated.sequence([
            Animated.parallel([
              Animated.timing(circlemarktrail,{
                toValue: 1,
                duration: 700,
                useNativeDriver: true
              }),
              Animated.timing(circleopacitytrail,{
                toValue: 0,
                duration: 700,
                useNativeDriver: true
              })
            ]),
            Animated.parallel([
              Animated.timing(circlemarktrail,{
              toValue: 0,
              duration: 0,
              useNativeDriver:true
            }),
            Animated.timing(circleopacitytrail,{
              toValue: 1,
              duration:0,
              useNativeDriver: true
            })
          ])])
        ])
      ).start();
    };
    backbutton=()=>{
      console.log('back','button');
    };
    currentLocation= ()=>{
      console.log('current','location');
      this.map.animateCamera({
        center:{
          latitude: 13.2366,
          longitude: 76.669
        },
         pitch: 0,
         heading: 0,
         zoom: 15
      })
    };

    

    componentDidMount(){
      (async () => {
        let { status } = await Location.requestPermissionsAsync();
        console.log('log',status);
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
        }
        let location = await Location.getCurrentPositionAsync({});
        this.location=location
        console.log('loc',this.location);
        console.log('lat',this.location.coords.latitude);
      })();
      this.animations();
    };
    regionChanging=()=>{
      this.setState({title: 'loading',description: 'loading'})
    };
    addressChanged=(parameter)=>{     
      this.setState({latitude: parameter.latitude,longitude: parameter.longitude}) 
      //this.setState({title: parameter.latitude,description: parameter.longitude});
      Axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
        params:{
          latlng: parameter.latitude+','+parameter.longitude,
          key: 'AIzaSyAghIaP3yetD5ooDpwcAK5GF0b6-YkpV8w'
        }
      }).then((response)=>{
        var addresses= response.data.results[0];
        this.setState({title: addresses.formatted_address})
      })
    };
    mapinit= ()=>{

    };

    onPress= ()=>{
    };
    render(){
      const {circlemark,circleopacity,circlemarktrail,circleopacitytrail} =this.state;
        return(
            <View style={styles.mainContainer} >
                <MapView style={{flex: this.state.flexfor}}  mapstyle={mapstyle} ref={ref=> this.map=ref}
                        onPanDrag={this.regionChanging}                                                     
                        onRegionChangeComplete={(region)=>this.addressChanged(region)}
                        showsCompass={false}
                        pitchEnabled={false}
                        showsUserLocation={true}
                        showsMyLocationButton={true}
                        initialCamera={this.props.initialCamera}
                        onMapReady={()=>{this.setState({flexfor: 4})
                          this.map.animateCamera(this.props.route.params.initialCamera,{
                            duration: 1500
                          })}}
                        >   
                  
                    </MapView>
                <View style={styles.lowerpanel} >
                    <View style={styles.lowerhorizontal}>
                      <Text style={styles.heading}>{this.state.title}</Text>
                      <TouchableOpacity style={styles.changetouch}>
                          <Text>CHANGE</Text>
                      </TouchableOpacity>
                    </View>
                    <SubmitButton styler={styles.button} text='Confirm Location' onTouch={this.addAddress}/>
                </View>      
                <TouchableOpacity style= {styles.backbuttoncontainer} 
                    onPress={this.backbutton}>
                  <Image style={styles.backbutton} source={require('./../../assets/backbutton.png')}/>
                </TouchableOpacity>    
                {/*<TouchableOpacity style= {styles.currentlocationcontainer} 
                    onPress={this.currentLocation}                    >
                  <Image style={styles.currentlocationiamge} source={require('../assets/current_location.png')}/>
                </TouchableOpacity>*/}
                <Image source={require('./../../assets/marker.png')} style={styles.marker} />
                <Animated.View style={{...styles.anim,opacity: circleopacity,transform:[ {
                  scale: circlemark
                }]}}/>
                <Animated.View style={{...styles.animtrail,opacity: circleopacitytrail,transform:[ {
                  scale: circlemarktrail
                }]}}/>
                </View>
            
        )
    }

}

const styles= StyleSheet.create({
   mainContainer:{
       ...StyleSheet.absoluteFill,
   },
   mapview:{
       flex:4,
   },
   lowerpanel:{
     flex: 1.2,
     paddingLeft: 20,
     paddingRight: 20,
     paddingTop: 20,
   },
   lowerhorizontal:{
     flexDirection: 'row',
     justifyContent: 'space-between',
   },
   heading:{
     fontWeight: 'bold',
     margin: 5,
     fontSize: 13,
     width: '70%',
     maxHeight: 50
   },
   changetouch:{
     padding: 7,
     borderRadius: 3,
     borderWidth: 1,
     borderColor: 'black'
   },
   address: {
     marginLeft: 30,
     fontSize: 15,
     color: 'gray'
   },
   button:{
     position: 'absolute',
     bottom: 5,
   },
   anim:{
    position: 'absolute',
    top: Dimensions.get('window').height*2/5.2-50,
    left: Dimensions.get('window').width/2-50,
    right: Dimensions.get('window').width/2-50,
    height: 100,
    width: 100,
    borderRadius: 50,
    zIndex: 100,
    backgroundColor: 'gray',
    borderColor: 'black',
    borderWidth: 1

   },
   animtrail:{
    position: 'absolute',
    top: Dimensions.get('window').height*2/5.2-50,
    left: Dimensions.get('window').width/2-50,
    right: Dimensions.get('window').width/2-50,
    height: 100,
    width: 100,
    borderRadius: 50,
    zIndex: 100,
    backgroundColor: 'blue',
    borderColor: 'black',
    borderWidth: 1
   },
   currentlocationcontainer:{
     position: 'absolute',
     right: 20,
     bottom: 20,
     width: 30,
     height: 30,
     shadowOffset: {
       width: 2,
       height: 3
     },
     shadowColor: 'gray',
     shadowRadius: 7,
     elevation: 5
   },
   marker:{
     position: 'absolute',
     top: Dimensions.get('window').height*2/5.2-50,
     left: Dimensions.get('window').width/2-20,
     right: Dimensions.get('window').width/2-20,
     height: 40,
     width: 40,
     zIndex: 100,
     backgroundColor: 'rgba(0,0,0,0)'
   },
   backbutton:{
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 20,
    width: 35,
    zIndex: 70,
     
   },
   backbuttoncontainer:{

    position: 'absolute',
     top: 25,
     left: 20,
     height: 20,
     width: 35,
     zIndex: 100,
     flexWrap: 'wrap'
   },
   currentlocationcontainer:{
     position: 'absolute',
     bottom: 0,//Dimensions.get('window').height*1.2/5.2+25,
     right: 20,
     height: 20,
     width: 35,
     zIndex: 100,
     flexWrap: 'wrap'

   },
   currentlocationiamge:{
     position: 'absolute',
     top:0,
     bottom: 0,
     left: 0,
     right:0,
     width: 30,
     height: 30,
     zIndex: 70
   }
  
   

});

const mapstyle= [
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    }
  ];

/* TextInput style={styles.address} placeholder='Address Line 1' placeholderTextColor='rgba(30,30,30,255)'/>
                <TextInput style={styles.address} placeholder='Address Line 2'/></View>
                    
            </View>
            <View style={{...styles.mainContainer,justifyContent: 'flex-end'}}>
                <TouchableOpacity style={styles.addbuttontouchable} onPress={
                    this.onPress
                } >
                    <Text style={styles.addaddresstext}>Add Address</Text>
                </TouchableOpacity>
            </View>
            </View> */