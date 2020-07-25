import React, { useState } from 'react';
import {Text,View,StyleSheet,TextInput, Dimensions, Alert} from 'react-native';
import { RadioButton } from 'react-native-paper';
import SubmitButton from '../components/SubmitButton';
import TextBox from '../components/TextBox';
import {FontAwesome5} from '@expo/vector-icons'
import {Styles,Constants} from '../Constants'
import { TouchableOpacity } from 'react-native-gesture-handler';
import City from './City';
import AsyncStorage from '@react-native-community/async-storage';

const About = ({navigation,route}) =>{
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
        if(ValidateEmail(email)){
            try{
                if(route.params.firstLaunch != undefined)
                    navigation.navigate('City');
                else
                    navigation.navigate('Homescreen');
            }
            catch(error){
                navigation.navigate('City');
            }
        }
        else{
            Alert.alert('Invalid mail','Please enter a valid email ID');
        }
    }



        return(<View style={style.mainContainer}>
        <Text style={style.text}>Tell us about yourself</Text>
        <TextBox title='Name' hint='Enter your name'/>
        <TextBox title='Email Address' hint='Enter your email address' changeText={(text)=>{
            setEmail(text);
        }}/>
        <TextBox title='Referral Code (Optional)' hint='Add referral code (optional)' icon='smile'/>
        <View style={Styles.submitButton}>
        <SubmitButton text='Continue' onTouch={aboutSubmit}
    />
    </View>
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