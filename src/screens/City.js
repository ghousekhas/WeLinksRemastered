import React, { useState } from 'react';
import {Text,View,StyleSheet,TextInput, Dimensions} from 'react-native';
import { RadioButton } from 'react-native-paper';
import SubmitButton from '../components/SubmitButton';
import AsyncStorage from '@react-native-community/async-storage';

const City = ({navigation}) =>{
    const [value, setValue] = useState('Bangalore');
    return(<View style={style.mainContainer}>
        <Text style = {style.text}>Select your city</Text>
        <View style ={style.line}/>
        
        
        <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
        <View style ={style.view}>
        <RadioButton value="Ahmedabad" />
        <Text style ={style.city}>Ahmedabad</Text>
       
      </View>
      <View style ={style.view}>
       <RadioButton value="Bangalore" /> 
        <Text style={style.city}>Bangalore</Text>
      
      </View>
       
        <View style = {style.view}>
        <RadioButton value="Chennai" />
        <Text style={style.city}>Chennai</Text>
        
      </View>
      </RadioButton.Group>
      <View style={{position: 'absolute',bottom: '14%',alignSelf:'center'}}>
      <SubmitButton text='Next'
          onTouch={async ()=> {
              AsyncStorage.setItem('firstLogin','true');
              navigation.navigate('Homescreen')
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
    }


});
export default City;