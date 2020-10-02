import * as React from 'react'
import {Text,Button,Image,TouchableOpacity,Dimensions,StyleSheet,View, Animated} from 'react-native';
import MapView, {Marker} from 'react-native-maps'
import { Directions, TextInput, ScrollView } from 'react-native-gesture-handler';
import SubmitButton from '../components/SubmitButton';
import * as Location from 'expo-location';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {Styles} from '../Constants';
import { StackActions, CommonActions } from '@react-navigation/native';
import {NavigationActions} from 'react-navigation';
import VendorsList from './VendorsList';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import qs from 'qs';

const height= Dimensions.get('window').height;
var lowerPanelHeight= height/1.7;
var lowerAddressHeight= lowerPanelHeight/3;
var panelTranslateAfter=(0);
var panelTranslate=(lowerPanelHeight-lowerAddressHeight);

export default class AddAddress extends React.Component{






    constructor(props){
        super(props);
        this.state= {
          circlemark: new Animated.Value(0),
          circleopacity: new Animated.Value(1),
          circlemarktrail: new Animated.Value(0),
          circleopacitytrail: new Animated.Value(1),
          bottomPanelAnimation: new Animated.Value(panelTranslateAfter),
          inputsValid: false,
          adding: false,
          type: props.route.params.type==='vendorRegistration' ? 0:1,

          arrowOpacity: new Animated.Value(0),
            marker:{
                title: 'Home',
                description: 'Move map around to focus on point',
            },
            title: 'LatLng',
            description: 'city',
            flexfor: 3,
            latitude: this.props.route.params.initialCamera.center.latitude,
            longitude: this.props.route.params.initialCamera.center.longitude,
            landmark: '',
            fineAddressInfo: '',
            label: '',
            pincode: ''
        };
        this.location={

        };
        this.errorMst={};
        this.landmarkBox= null;
    };

    addAddress= async ()=>{
      this.setState({adding: true});
      const {user_id}=this.props.route.params.actualUser;
      const {label,pincode,title,description,latitude,longitude,landmark}=this.state;
      if(this.state.type===0){
        this.props.route.params.callback({ user_id: user_id,
          label: label,
          pincode: pincode,
          address: title,
          landmark: landmark,
          lat: latitude,
          lng: longitude});
        this.props.route.params.addrNameSetter(title);
          this.props.navigation.goBack();
      }
      else{

      
      if(this.state.title != 'loading'){
        Axios.post('https://api.dev.we-link.in/user_app.php?action=addAddress&',qs.stringify({
          user_id: user_id,
          label: label,
          pincode: pincode,
          address: title,
          landmark: landmark,
          lat: latitude,
          lng: longitude
        }),).then((response)=>{
          console.log(response.data);
          
          this.props.route.params.refresh();
          this.props.navigation.goBack();
        },(error)=>{
          console.log(error);
        })
      }
        
      }
    //  this.props.navigation.pop();

    };

    animations= ()=>{
      const {circlemark,circleopacity,circleopacitytrail,circlemarktrail,arrowOpacity} =this.state;

      //RippleCrircle
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

      Animated.timing(arrowOpacity,{
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }).start();
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

    checkFieldsValidity=()=>{
      if(this.state.landmark.length<1 || this.state.fineAddressInfo.length<1 || this.state.label.length <1)
        this.setState({inputsValid: false});
      else  
        this.setState({inputsValid: true})
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
      Animated.spring(this.state.bottomPanelAnimation,{
        toValue: panelTranslate,
        duration: 1000,
        useNativeDriver: true
      }).start();
      Animated.spring(this.state.arrowOpacity,{
        toValue: 0,
        duration: 100,
        useNativeDriver: true
      }).start();
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
        try{
          var addressComponents=(response.data.results[0].address_components);
          var pincode= addressComponents[addressComponents.length-1].short_name;
          console.log(pincode);

          var addresses= response.data.results[0];
          this.setState({title: addresses.formatted_address});
          this.setState({pincode: pincode})
        }
        catch(error){
          this.setState({title: 'Please move the pin to a valid location'});
        }
      });

      Animated.spring(this.state.bottomPanelAnimation,{
        toValue: panelTranslateAfter,
        duration: 1500,
        useNativeDriver: true
      }).start();

      Animated.timing(this.state.arrowOpacity,{
        toValue: 1,
        timing: 300,
        useNativeDriver: true
      }).start();

    };
    mapinit= ()=>{

    };

    onPress= ()=>{
    };
    render(){
      const {circlemark,circleopacity,circlemarktrail,circleopacitytrail,bottomPanelAnimation,arrowOpacity} =this.state;

      var submitButton;
      if(this.state.adding)
        return(<View style={{...StyleSheet.absoluteFill,backgroundColor: 'white',justifyContent: 'center'}}>
                <Text style={{...Styles.heading,alignSelf: 'center',fontWeight: 'bold'}}>Adding address, please wait</Text>
            </View>
          )


      if(this.state.inputsValid)
        submitButton= (
          <SubmitButton text='Continue' onTouch={this.addAddress}
          />
          );
      else
          submitButton= (<View style={{...styles.submitButton}}>
            <SubmitButton text='Continue' onTouch={this.addAddress} otherColor={'gray'}
            />
            </View>);

        return(
            <View style={styles.mainContainer} >
                <MapView style={{height: height/5*3.5,position: 'absolute',top: 0,width: '100%'}}  mapstyle={mapstyle} ref={ref=> this.map=ref}
                        onTouchStart={this.regionChanging}                                                   
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
                <View style={{flex: 1.5}}/>
                
                <Animated.View style={{...styles.lowerpanel,transform:[{translateY: bottomPanelAnimation } ]}} >
                    <ScrollView style={styles.lowerhorizontal}>
                      <Text style={styles.heading}>{this.state.title}</Text>
                      <Text style={styles.otherHeading}> Additional Address info:</Text>
                      <TextInput ref={this.landmarkBox} placeholder={'Enter fine address information here'} accessibilityHint={'Landmark'} style={styles.inputBox} onChangeText={(text)=>{
                          this.setState({fineAddressInfo: text})
                          this.checkFieldsValidity()}}/>
                      <Text style={styles.otherHeading}> Landmark:</Text>
                      <TextInput ref={this.landmarkBox} placeholder={'Enter landmark here'} accessibilityHint={'Landmark'} style={styles.inputBox}  onChangeText={(text)=>{
                          this.setState({landmark: text})
                          this.checkFieldsValidity()}}/>
                      <Text style={styles.otherHeading}> Label:</Text>
                      <TextInput ref={this.landmarkBox} placeholder={'Enter identificaiton label here'} accessibilityHint={'Landmark'} style={styles.inputBox}  onChangeText={(text)=>{
                          this.setState({label: text})
                          this.checkFieldsValidity()}}/>
                     
                
                    </ScrollView>
                    {submitButton}
                </Animated.View>      
                <TouchableOpacity style= {styles.backbuttoncontainer} 
                    onPress={this.addAddress}>
                  <Animated.Image style={{...styles.backbutton,opacity: arrowOpacity}} source={require('./../../assets/backbutton.png')}/>
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
       flex: 1,

   },
   inputBox:{
     width: '100%',
    borderBottomWidth: 0.3,
    borderBottomColor: 'gray',
    marginHorizontal: 30,
    alignSelf: 'center',
    borderStyle: 'dotted',
    marginBottom: 25,
    borderStyle: 'dashed'
  },
   mapview:{
      height: Dimensions.get('window').height/5*2,
      width: '100%'
   },
   lowerpanel:{
    zIndex: 200,
    elevation: 5,
    height: lowerPanelHeight,
    bottom: 0,  
    width: '100%',
    position: 'absolute',
    backgroundColor: 'white',
    right: 0,
    left: 0,
    justifyContent: 'space-between',
    flexDirection: 'column',
     paddingLeft: 20,
     paddingRight: 20,
     paddingTop: 20,
   },
   submitButton:{
     margin: 15,
     bottom: '1%',
     alignSelf: 'center',
    
   },
   lowerhorizontal:{
     flexDirection: 'column',
     height: lowerPanelHeight-500
     
   },
   heading:{
     fontWeight: 'bold',
     margin: 5,
     fontSize: 15, marginBottom: 30,
     width: '100%',
     maxHeight: 200,
     marginHorizontal: 50,
     marginBottom: 30,
     alignSelf: 'center'
   },
   otherHeading:{
    fontWeight: 'bold',
    margin: 5,
    fontSize: 14,
    width: '100%',
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
    top: Dimensions.get('window').height/10*3.5-50,
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
    top: Dimensions.get('window').height/10*3.5-50,
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
     top: Dimensions.get('window').height/10*3.5-40,
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
    zIndex: 1,
     
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