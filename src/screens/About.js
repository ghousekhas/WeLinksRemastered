import React, { useState } from 'react';
import {Text,View,StyleSheet,TextInput, Dimensions} from 'react-native';
import { RadioButton } from 'react-native-paper';
import SubmitButton from '../components/SubmitButton';
import TextBox from '../components/TextBox';
import {FontAwesome5} from '@expo/vector-icons'

const About = ({navigation}) =>{
    const [name,setName] = useState(' ');
    const [email,setEmail] = useState(' ');
    const [referral,setReferral]= useState(' ');
    return(<View style={style.mainContainer}>
    <Text style={style.text}>Tell us about yourself</Text>
    <TextBox title='Name' hint='Enter your name'/>
    <TextBox title='Email Address' hint='Enter your email address'/>
    <TextBox title='Referral Code (Optional)' hint='Add referral code (optional)' icon='smile'/>
    <View style={{marginTop: 230}}><SubmitButton text='Continue' onTouch={
        navigation.navigate('City',{
            mname : name,
            memail: email,
            mreferral: referral
            
        })
    }/></View>
    
    

    </View>)
};

const style = StyleSheet.create({
    mainContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        padding: 10

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