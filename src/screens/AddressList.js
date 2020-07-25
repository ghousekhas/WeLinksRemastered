import React,{useState,useEffect} from 'react';
import {Text,View,StyleSheet,navigator,FlatList, Dimensions} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geolocation from '@react-native-community/geolocation';
import Qs from 'qs';
import * as axios from 'axios';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import HomeAddress from '../components/AddressRow'

const height= Dimensions.get('window').height;






export default class AddressList extends React.Component{
    constructor(props){
        super(props);
            this.location={
                region:{
                }
            }
            this.state={
              arraydata: []
            };
            this.data=[];

            
            
    }

    onComeBack= (item)=>{
      if( item)
        this.retrieveAddresses();
    }



    retrieveAddresses= async ()=>{
      try{
        var data=[];
        const jsonvalue=  await AsyncStorage.getItem('addresses');
        data= JSON.parse(jsonvalue);
        console.log(data);
        if(data!=null){
          this.data= JSON.parse(jsonvalue);
          this.setState({arraydata: data})
        }
        else{
          this.setState({arraydata: []});
        }
      }
      catch(error){}
    }

    componentDidMount(){
      this.retrieveAddresses();
      
      
    }
    setSelectedAddress= async (item)=>{
      const jsonString= await JSON.stringify({firstLogin: false})
      await AsyncStorage.setItem('firstLogin',jsonString);
      const jsonAddress= await JSON.stringify(item);
      await AsyncStorage.setItem('selectedAddress',jsonAddress);
      this.props.navigation.navigate('Homescreen');
      

    }

    renderSavedAddress=({item})=>{

      return <HomeAddress item= {{...item,type: 'pin'}} style={styles.horiz}/>
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
        <View style={{padding:1,
        marginHorizontal: '3%',
        backgroundColor: 'gray',
        width:'60%',
        height: 1,
        alignSelf: 'center'
        }}
        />
      );
    }

    addressSelected =async (data,details) =>{
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
            zoom: 14

          }
        })
      });
      
    
    }

    render(){
        return(
        
            
          <View style={styles.container}>
          <GooglePlacesAutocomplete
              query={{
                key: 'AIzaSyAWOAzPnGPVoGCxK7pMgU4TZx6sZQNiofQ',
                language: 'en', // language of the results
                components: 'country:in',
                location: '12.972442,77.580643',
                radius: 100000
              }}
              onPress={this.addressSelected}
              onFail={error => console.error(error)}
              styles={placesstyle}   
              currentLocation= {true}
              currentLocationLabel= "Select current Location"
            />

            
              
            <HomeAddress item= {{text: '7th cross, Byataryanapura, Bengaluru 560092 India',lat: 12,lng: 13,type: 'home'}} style={styles.home} navigation={this.props.navigation}/>
            <View style={{width: '75%',alignSelf: 'center',height: 2,backgroundColor: 'gray', position: 'absolute',
      top: height/10+ height/6,}}/>
            <HomeAddress item= {{text: '17th cross, KalyanNagar, Bengaluru 560093 India',lat: 12,lng: 13,type: 'office'}} style={styles.office}/>
            <View style={styles.savedaddresspanel}>
          <Text style={styles.address}>OTHER ADDRESSES</Text>

            <FlatList 
            data={this.state.arraydata.reverse()}
            renderItem={this.renderSavedAddress}
            ItemSeparatorComponent={this.renderSeperator}

            keyExtractor={(item,index)=> Math.random().toString(36).substr(2, 10)}
            />
            </View>
          </View>
          
        )
    }
}

const styles = StyleSheet.create({
  savedaddresspanel:{
    position: 'absolute',
    top: height/10+height/3,
    zIndex: 100,
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
          fontSize: 14,
          padding: 10,
          fontWeight: 'bold',
          color: 'black',
          width: '80%',
        maxHeight: 100},
    horiz:{
      width: Dimensions.get('window').width-50,
      height: Dimensions.get('window').height/6,flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    home:{
      position: 'absolute',
      width: Dimensions.get('window').width-50,
      height: Dimensions.get('window').height/6-40,flexDirection: 'row',
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
    },
    listView:{
      zIndex: 100,
    },
    textInputContainer:{
      width: '100%',
      backgroundColor: 'white',
      borderRadius: 10,
      
    },

    textInput:{
        fontWeight: 'bold',
        fontSize: 15,
        padding: 40,
    },
    row:{
        padding: 10,
        backgroundColor: 'white',
        margin: 0

    },
  })