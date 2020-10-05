import React, { useState } from 'react';
import {Text,View,StyleSheet,TextInput, Dimensions, Alert} from 'react-native';
import { RadioButton } from 'react-native-paper';
import SubmitButton from '../components/SubmitButton';
import TextBox from '../components/TextBox';
import {FontAwesome5} from '@expo/vector-icons'
import {Styles,Constants, dimen,Colors} from '../Constants'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import City from './City';
import AsyncStorage from '@react-native-community/async-storage';

const About = ({navigation,route,getUserDetails}) =>{
    const [name,setName] = useState(' ');
    const [email,setEmail] = useState(' ');
    const [referral,setReferral]= useState(' ');
    const [aboutDone,setAboutDone]=useState(false);

    function ValidateEmail(email) 
        {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
        {
            return (true)
        }
            return (false)
        }


    const aboutSubmit= async ()=>{
        await AsyncStorage.setItem(Constants.username,name);
        if(ValidateEmail(email) && name.trim() != ''){
            try{
                setAboutDone(true);
            }
            catch(error){
            }
        }
        else{
            Alert.alert('Invalid mail','Please enter a valid email ID');
        }
    }

    if(aboutDone)
        return(<City userDetails={{email: email,name: name}} getUserDetails={getUserDetails}/>)



        return(<View style={style.mainContainer}>
         <ScrollView style={{flex: 1,marginVertical:3}}>  
        <Text style={style.text}>Tell us about yourself</Text>
        <TextBox title='Name' hint='Enter your name' changeText={setName}/>
        <TextBox title='Email Address' hint='Enter your email address' changeText={(text)=>{
            setEmail(text);
        }}/>
        <TextBox title='Referral Code (Optional)' hint='Add referral code (optional)' icon='smile'/>
        <View style={Styles.submitButton}>
        
    </View>
    </ScrollView> 
    <TouchableOpacity style={{flex: 0,padding: 10,marginHorizontal: 5, marginVertical: 3,backgroundColor: Colors.primary,width: dimen.width-10,borderRadius: 7,alignSelf: 'center'}}>
        <Text style={{...Styles.heading,width: '100%',textAlign: 'center',alignSelf: 'center',color: 'white'}}>Continue</Text>
    </TouchableOpacity>
    </View>);
  
    
};

const style = StyleSheet.create({
    mainContainer: {
        ...StyleSheet.absoluteFill,
        padding: 15,
        backgroundColor: 'white',

    },
    text:{
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        
        marginTop: 10,
        margin: 5
    }
});

export default About;