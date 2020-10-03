import React, { useState,useEffect } from 'react';
import {Text,View,StyleSheet,TextInput, Dimensions,TouchableOpacity} from 'react-native';
import SubmitButton from '../components/SubmitButton';
import AsyncStorage from '@react-native-community/async-storage';
import {Colors, dimen, Styles} from '../Constants'
import Axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';
import { RadioButton } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import qs from 'qs';






const City = ({navigation,route,user,userDetails,getUserDetails}) =>{
    const [cities,setCities] = useState([])
    const [value,setValue] = useState([])
    const [done,setDone]=useState(false);

    

    const getCitiesData= async ()=>{
      Axios.get('https://api.dev.we-link.in/user_app.php?action=getCityList',{
            'Accept-Encoding': 'gzip'
        }
        ).then((result) => {
        console.log(result.data.cities)
        
        let i;
        var citys=result.data.cities;
        let cityList = [];
        for(i in citys)
            cityList.push({cityname: citys[i].city_name,city_id: citys[i].city_id});
        setCities(cityList);
    
           
        }).catch((error) => {
            console.log("Error reading city data: " + err);
            
        });
    }

    useEffect(() => {
        getCitiesData();
      },[]);
   // console.log(cities)

   const registerUser=()=>{
    const {name,email}= userDetails;
    //AsyncStorage.setItem('firstLogin','true');
    var config = {
      method: 'post',
      url: 'https://api.dev.we-link.in/user_app.php?action=registerUser&name=New User&phone=9144200060&email=newuser@user.wl&city_id=2',
    };
    
  Axios.post('https://api.dev.we-link.in/user_app.php?'+qs.stringify(
  {
      action: 'registerUser',
      name: name,
      phone: auth().currentUser.phoneNumber.substring(3),
      email: email,
      city_id: value
  }),)
    .then(function (response) {
      console.log(response.data);
      getUserDetails(5);
      
    })
    .catch(function (error) {
      console.log(error);
    });
   }



  
      


  

 
   
    return(<View style={{...StyleSheet.absoluteFill,padding: 10,margin: 5,backgroundColor: 'white'}}>
        <Text style = {style.text}>Select your city</Text>
        <View style ={Styles.grayfullline}/>
       
       
         <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
           <FlatList
           data = {cities}
           renderItem = {({item}) => {
            
               return( <View style ={style.view}>
       <RadioButton value={item.city_id} /> 
        <Text style={style.city}>{item.cityname}</Text>
      
      </View>)
           }} 
             
           />
        </RadioButton.Group>
        
        
      <TouchableOpacity style={{alignSelf: 'center',backgroundColor: Colors.primary,position: 'absolute',bottom: '0%',borderRadius: 10}}
          onPress={()=>{ registerUser()

          }}>
        <Text style={{backgroundColor: Colors.primary,alignSelf: 'center',padding: 10,color: 'white',width: dimen.width*0.9,textAlign: 'center',borderRadius: 10}}>Next</Text>
      </TouchableOpacity>
      
     
     
     
     
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