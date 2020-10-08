import React,{useState,useEffect} from 'react';
import { useFocusEffect } from '@react-navigation/native';

import {Text,View,StyleSheet,BackHandler,FlatList, Dimensions} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geolocation from '@react-native-community/geolocation';
import Qs from 'qs';
import Axios, * as axios from 'axios';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import HomeAddress from '../components/AddressRow'
import AppBar from '../components/AppBar';
import { Styles } from '../Constants';
import qs from 'qs';
import LottieView from 'lottie-react-native'

const height= Dimensions.get('window').height;

// useFocusEffect(
//   React.useCallback(() => {
//     const onBackPress = () => {
//     console.log('Go to homescreen');
//      props.navigation.navigate('Homescreen');
//         return true;
      
//     };

//     BackHandler.addEventListener('hardwareBackPress', onBackPress);

//     return () =>
//       BackHandler.removeEventListener('hardwareBackPress', onBackPress);
//   },)
// );




export default class AddressList extends React.Component{
    constructor(props){
        super(props);
            this.location={
                region:{
                }
            }
            this.state={
              arraydata: [],
              somekey: 0,
              myAddresses: props.route.params.myAddresses === true ? true: false,
              apiLoaded: false
              
              
            };
            this.data=[];

            
            
    }

    UNSAFE_componentWillReceiveProps(props){

    }

    componentDidMount(){
      this.retrieveAddresses();
      BackHandler.addEventListener('hardwareBackPress',this.onBackPress);
      console.log('mount');
      
    }

    onComeBack= (item)=>{
      if( item)
        this.retrieveAddresses();
    }

   onBackPress=()=>{
      this.props.navigation.navigate('Homescreen');
      return true;
    }

    componentWillUnmount(){
      BackHandler.removeEventListener('hardwareBackPress',this.onBackPress);
    }

    


    retrieveAddresses=  ()=>{
      const {user_id}= this.props.route.params.actualUser;
      console.log('alistuserid',user_id)
      Axios.get('https://api.dev.we-link.in/user_app.php?action=getUserAddresses&'+qs.stringify({
        user_id: user_id
      })).then((response)=>{
        console.log('response',response.data);
       this.data= response.data.addresses;
       this.setState({apiLoaded: true});
       this.setState({somekey: Math.random(0.5)});

      },(error)=>{
        console.log('error',error);
      })
    }

  
    setSelectedAddress= async (item)=>{
      const jsonString= await JSON.stringify({firstLogin: false})
      await AsyncStorage.setItem('firstLogin',jsonString);
      const jsonAddress= await JSON.stringify(item);
      await AsyncStorage.setItem('selectedAddress',jsonAddress);
      this.props.navigation.navigate('Homescreen');
      

    }

    renderSavedAddress=({item})=>{
      const {next,actualUser}=this.props.route.params;

      return <HomeAddress item= {{...item,type: 'pin'}} style={styles.horiz} deletae={this.state.myAddresses} route={{params:{
        next: next,
        actualUser: actualUser
      }}}/>
      /*return(
        <View style={styles.horiz}>
          <ScrollView>
          <Text style={styles.address}>{item.text}</Text>
          </ScrollView>
          <TouchableOpacity style={{borderWidth: 2, borderColor: 'gray',padding: 5,alignSelf: 'center',marginTop: 20}} onPress={()=>{
            this.setSelectedAddress(item)
          }}>
            <Text style={{padding: 5,fontSize: 10}}>SELECT</Text>
          </TouchableOpacity>
        </View>
      );*/
    }



    renderSeperator=()=>{
      return(
        <View style={{padding:0,
        paddingHorizontal: '20%',
        backgroundColor: 'gray',
        width:'80%',
        height: 0,
        alignSelf: 'center',
        borderStyle: 'dashed',
        borderColor: 'black',
        borderWidth: 0.04,
        borderRadius: 5
        }}
        />
      );
    }

    addressSelected =async (data,details) =>{
      const actualUser= this.props.route.params.actualUser;
      const {tag} = this.props.route.params;
      console.log(data);
      console.log(details);
      console.log(details.place_id);
      axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
        params:{
          place_id: details.place_id,
          key: 'AIzaSyAghIaP3yetD5ooDpwcAK5GF0b6-YkpV8w'
        }
      }).then((response)=>{
        var locy= response.data.results[0].geometry.location;
        console.log(locy);
        this.props.navigation.navigate('AddAddress',{
          onComeBack: this.onComeBack,
          initialCamera: {
            center:{
            latitude: locy.lat,
            longitude: locy.lng,
            },
            pitch: 0,
            heading: 0,
            zoom: 14,
            type: 'userAddress'
            

          },
          refresh: this.retrieveAddresses,
          actualUser: actualUser,
          placeName: data.description,
          tag : tag
        })
      });
      
    
    }
    

    render(){
        if(this.data[0] == undefined)
          return(
            <View style={styles.container}>
            <AppBar back ={!this.state.myAddresses} funct={() => {
          
            if(!this.state.myAddresses)
              this.props.navigation.pop();
            else
              this.props.navigation.toggleDrawer();
          }} />
          <View style={Styles.parentContainer}>
          <GooglePlacesAutocomplete
              style={{elevation: 10,zIndex: 10,backgroundColor: 'white'}}
              query={{
                key: 'AIzaSyAWOAzPnGPVoGCxK7pMgU4TZx6sZQNiofQ',
                language: 'en', // language of the results
                components: 'country:in',
                location: '12.972442,77.580643',
                radius: 100000
              }}
              placeholder={'Type here to add a new address'}
              onPress={this.addressSelected}
              onFail={error => console.error(error)}
              styles={placesstyle}   
              currentLocation= {true}
              currentLocationLabel= "Select Current Location"
            />
            <View style={{justifyContent: 'center',alignItems: 'center',flex: 1}}>
              {!this.state.apiLoaded ?
                (<LottieView  
                enableMergePathsAndroidForKitKatAndAbove
              style={{flex:1,padding: 50,margin:50}}  source={require('../../assets/animations/logistics.json')} resizeMode={'contain'} autoPlay={true} loop={true}/>)
              :
              <Text style={{...Styles.subbold}}>No addresses to show, please add an address </Text>
            }
            </View>
            </View>
          

          </View>

          )


        return(
        
            
          <View style={styles.container}>
            <AppBar back ={!this.state.myAddresses} funct={() => {
          
            if(!this.state.myAddresses)
              this.props.navigation.pop();
            else
              this.props.navigation.toggleDrawer();
          }} />

        <View style={Styles.parentContainer}>
          <GooglePlacesAutocomplete
              style={{elevation: 10,zIndex: 10,backgroundColor: 'white'}}
              query={{
                key: 'AIzaSyAWOAzPnGPVoGCxK7pMgU4TZx6sZQNiofQ',
                language: 'en', // language of the results
                components: 'country:in',
                location: '12.972442,77.580643',
                radius: 100000
              }}
              placeholder={'Type here to add a new address'}
              onPress={this.addressSelected}
              onFail={error => console.error(error)}
              styles={placesstyle}   
              currentLocation= {true}
              currentLocationLabel= "Select Current Location"
            />

            
            <View style={styles.savedaddresspanel}>
          <Text style={styles.address}>SAVED ADDRESSES</Text>

            <FlatList 
            data={this.data}
            renderItem={this.renderSavedAddress}
            extraData={this.state.somekey}
            ItemSeparatorComponent={this.renderSeperator}
            keyExtractor={(item,index)=> Math.random().toString(36).substr(2, 10)}
            />
            </View>
            </View>
          </View>
          
        )
    }
}

const styles = StyleSheet.create({
  savedaddresspanel:{
    position: 'absolute',
    top: height/10,
    zIndex: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
    container: {
      ...StyleSheet.absoluteFill,
      justifyContent: 'flex-start',
      flexDirection: 'column',
      backgroundColor: '#ecf0f1',
      padding: 0,
      zIndex: 200,
      backgroundColor: 'white'
    },
    address:{alignSelf: 'center', 
          fontSize: 13,
          padding: 10,
          fontWeight: 'bold',
          color: 'black',
          width: '80%',
        maxHeight: 100},
    horiz:{
      width: Dimensions.get('window').width-50,
      height: Dimensions.get('window').height/6,flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    
      margin: 10
    },
    home:{
      position: 'absolute',
      width: Dimensions.get('window').width-50,
      height: Dimensions.get('window').height/6-40,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      top: height/7

    },
    office:{
      position: 'absolute',
      top: height/10+ height/6,
      width: Dimensions.get('window').width-50,
      height: Dimensions.get('window').height/6,flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    }

    
    
  });

  const placesstyle=StyleSheet.create({
    container:{
      position: 'absolute',
      left: '5%',
      right: '5%',
      top: '2%',
      width: '90%',
      zIndex: 100,
      borderWidth: 0,
      borderColor: 'gray',
      borderLeftWidth: 0.5,
      borderRightWidth: 0.5,
      borderLeftColor: 'gray',
      borderRightColor: 'gray',
      borderRadius: 0,
     
    },
    listView:{
      backgroundColor: 'white',
      padding: '1%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    textInputContainer:{
      width: '100%',
      backgroundColor: 'white',
   
      alignItems: 'center',
      
      //borderRadius: 10,
      
    },
    textInput:{
        fontWeight: 'bold',
        fontSize: 15,
        padding :'1%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    predefinedPlacesDescription:{
      color: 'black'
    },
    description:{
      color: 'gray',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 11.5,
      
    },
    seperator:{
      width: '100%',
      color: 'gray',
      height: 0.5,
     
    },
    poweredContainer:{
      marginTop: 30,
      marginBottom: 5,
      marginRight: 5,
      alignItems: 'center'
    }
  })