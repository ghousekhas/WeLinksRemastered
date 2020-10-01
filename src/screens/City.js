import React, { useState,useEffect } from 'react';
import {Text,View,StyleSheet,TextInput, Dimensions,TouchableOpacity} from 'react-native';
import SubmitButton from '../components/SubmitButton';
import AsyncStorage from '@react-native-community/async-storage';
import {Styles} from '../Constants'
import Axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';
import { RadioButton } from 'react-native-paper';






const City = ({navigation}) =>{
    const [cities,setCities] = useState([])
    const [value,setValue] = useState([])

    useEffect(() => {
        Axios.get('https://api.dev.we-link.in/user_app.php?action=getCityList',{
            'Accept-Encoding': 'gzip'
        }
        ).then((result) => {
        console.log(result.data.cities)
        setCities(result.data.cities);
    
           

        }).catch((error) => {
            console.log("Error reading city data: " + err);
            
        });
      });
   // console.log(cities)
   let i;
   let cityList = [];
   for(i in cities){
       cityList.push(cities[i].city_name);

   }

 //  setValue(cityList[0])
  
  // console.log(cityList)

   
    return(<View style={style.mainContainer}>
        <Text style = {style.text}>Select your city</Text>
        <View style ={Styles.grayfullline}/>
       
       
         <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
           <FlatList
           data = {cities}
           renderItem = {({item}) => {
            
               return( <View style ={style.view}>
       <RadioButton value={item.city_name} /> 
        <Text style={style.city}>{item.city_name}</Text>
      
      </View>)
           }} />
        </RadioButton.Group>
        
        
      <View style={{position: 'absolute',bottom: '14%',alignSelf:'center'}}>
      <SubmitButton text='Next'
          onTouch={async ()=> {
              AsyncStorage.setItem('firstLogin','true');
              navigation.navigate('Homescreen',{
                  value
              })
          }}
      />
      </View>
     
     
     
    </View>)

    
};

const style = StyleSheet.create({
    mainContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        padding: 10,
        backgroundColor: 'white'

    },
    text:{
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        
        marginTop: 10,
        margin: 5
    },
    line: {
        borderWidth: 0.5,
        borderColor: '#5D5D5D',
        marginTop: 10,
     
    },
    view: {
        flexDirection: 'row',
        marginTop: 12
        
    },
    city: {
        marginTop: 5,
        marginStart: 7,
        fontSize: 18
    },
  

});
export default City;