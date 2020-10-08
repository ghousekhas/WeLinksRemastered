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
import Axios from 'axios';
import qs from 'qs';
import LottieView from 'lottie-react-native';
import auth from '@react-native-firebase/auth';
import AppBar from '../components/AppBar';

const About = ({navigation,route,getUserDetails}) =>{
    const [name,setName] = useState(' ');
    const [email,setEmail] = useState(' ');
    const [referral,setReferral]= useState(' ');
    const [aboutDone,setAboutDone]=useState(false);
    const [edit,setEdit]=useState(route.params.edit === undefined ? false: true);
    const [actualUser,setActualUser]=useState(route.params.actualUser);
    const [loading,setLoading]=useState(false);

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
                if(edit){
                    Axios.post('https://api.dev.we-link.in/user_app.php?action=editUserProfile&'+qs.stringify({
                        user_id: actualUser.user_id,
                        name: name,
                        email: email
                    })).then((response)=>{
                        setLoading(false);
                        alert('Your changes have been saved successfully');
                        route.params.getUserDetails(0,auth().currentUser);
                        navigation.goBack();

                    },(error)=>{
                        console.log(error);

                        alert('An unexpected error occured while contacting the servers, kindly try again later');
                        navigation.goBack();
                    })
                    setLoading(true);

                }
                else
                    setAboutDone(true);
            }
            catch(error){
                alert('something');
            }
        }
        else{
            Alert.alert('Invalid mail','Please enter a valid email ID');
        }
    }

    if(aboutDone)
        return(<City userDetails={{email: email,name: name}} getUserDetails={getUserDetails} route={{params:{edit: false}}}/>);

    if(loading)
    return(
        <View style={{...StyleSheet.absoluteFill,backgroundColor: 'white'}}>
           <LottieView  
            enableMergePathsAndroidForKitKatAndAbove
           style={{flex:1,padding: 50,margin:50}}  source={require('../../assets/animations/logistics.json')} resizeMode={'contain'} autoPlay={true} loop={true}/>
         </View>
      )



        return(<View style={style.mainContainer}>
            {edit ? (
                <AppBar back={true} funct={()=>{
                    navigation.goBack();
                }}/>
            ) : null}
         <ScrollView style={{flex: 1,marginVertical: dimen.width/20}}>  
        <Text style={style.text}>Tell us about yourself</Text>
        <TextBox title='Name' hint='Enter your name' changeText={setName}/>
        <TextBox title='Email Address' hint='Enter your email address' changeText={(text)=>{
            setEmail(text);
        }}/>
        {/*
        <TextBox title='Referral Code (Optional)' hint='Add referral code (optional)' icon='smile'/>
        */}
        <View style={Styles.submitButton}>
        
    </View>
    </ScrollView> 
    <View style={{marginVertical: 3,backgroundColor: Colors.primary,borderRadius: 7,alignSelf: 'center'}} onPress={()=>aboutSubmit()} >
        <SubmitButton text= {edit ? 'Save': 'Continue' } />
    </View>
    </View>);
  
    
};

const style = StyleSheet.create({
    mainContainer: {
        ...StyleSheet.absoluteFill,
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

