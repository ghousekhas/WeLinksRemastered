
import React,{useState,useEffect} from 'react';
import {Text,View,StyleSheet,navigator,FlatList, Dimensions,Image} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geolocation from '@react-native-community/geolocation';
import Qs from 'qs';
import * as axios from 'axios';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation,useRoute} from "@react-navigation/native";
import Button from '../components/Button'

import {Colors} from '../Constants'
const height= Dimensions.get('window').height;


export default HomeAddress=({item,style})=>{
    const navigation= useNavigation();
    const route= useRoute();
    const [currentAddress,setCurrentAddress]=useState(item.text);
    const [label,setCurrentLabel]= useState('Home');
    const [image,setImage]=useState(require('../../assets/pin.png'));
    const init=()=>{
        try{
            if('office'== item.type){
                setImage(require('../../assets/company.png'));
                console.log('logger');
                //setCurrentAddress('ne');
            }
            else if(item.type=='home')
                setImage(require('../../assets/home.png'));
        }
        catch(error){
            console.log(error);
        }
    }

    setSelectedAddress= async (itemnow)=>{
      const jsonString= await JSON.stringify({firstLogin: false})
      await AsyncStorage.setItem('firstLogin',jsonString);
      const jsonAddress= await JSON.stringify(itemnow);
      await AsyncStorage.setItem('selectedAddress',jsonAddress);
      navigation.navigate(route.params.next);
      

    }
    

    
    

  

  
  
    React.useEffect(()=>{
        init();
        
      
      
    },[]);
    return(
      <View style={style}>
        <Image source={image} style={styles.imageIcon}  />
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{flexDirection: 'column',width: '100%',justifyContent: 'flex-start',flex: 1,marginBottom: '5%'}}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.address}>{currentAddress}</Text>
              </View>
            </ScrollView>
            <Button text='Select' onTouch={()=>{setSelectedAddress(item)}} />
          </View>
    );
  }

  const styles = StyleSheet.create({
    savedaddresspanel:{
      position: 'absolute',
      top: height/10+height/3,
      zIndex: 100,
      bottom: 0,
      right: 0,
      left: 0
    },
    label:{
      fontSize: 16,
            fontWeight: 'bold',
            paddingLeft: 10,
            color: 'black',
            width: '100%',
            alignSelf: 'flex-start',
    },
      container: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'column',
        backgroundColor: '#ecf0f1',
        padding: 0,
      },
      address:{alignSelf: 'center', 
            fontSize: 13,
          
            padding: 10,
            fontWeight: '500',
            color: 'gray',
            width: '100%',
          maxHeight: 200},
      horiz:{
        width: Dimensions.get('window').width-40,
        height: Dimensions.get('window').height/6,flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
      imageIcon:{
          height: height/27,
          width: height/27,
          alignSelf: 'flex-start',
          marginLeft: Dimensions.get('window').width/30,
          marginTop: '4%'
      },
      buttonPos: {
        position: 'absolute',
        right: 10
      }
  
      
      
    });
  