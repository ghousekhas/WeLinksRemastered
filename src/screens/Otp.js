import React, { useState,useEffect, useRef } from 'react';

import {Text,View,StyleSheet,TextInput, Dimensions} from 'react-native';
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import * as firebase from "firebase";

import { Defs } from 'react-native-svg';
import { TouchableOpacity } from 'react-native-gesture-handler';

import SimpleToast from 'react-native-simple-toast';
import Toast from 'react-native-simple-toast';
import SubmitButton from '../components/SubmitButton';
try {
    firebase.initializeApp({
        apiKey: "AIzaSyAMNh-ci1hhnsvzgCbbuqyuWVzScUr5E54",
        authDomain: "welinks-b80f2.firebaseapp.com",
        databaseURL: "https://welinks-b80f2.firebaseio.com",
        projectId: "welinks-b80f2",
        storageBucket: "welinks-b80f2.appspot.com",
        messagingSenderId: "887049508481",
        appId: "1:887049508481:web:db88dbac3fd71d2ebd9f80",
        measurementId: "G-B3532FWL44"
      
    });
  } catch (err) {
    // ignore app already initialized error in snack
  }



const Otp = ({route,navigation}) => {
    const recaptchaVerifier = React.useRef(null);
    var num = route.params;
    num = '+91'+num
    
    const numDisplay = num.charAt(0) + 'XXXXXXXX' + num.charAt(9)
    const [verificationId, setVerificationId] = React.useState();
   const [P1,setP1] = React.useState();
   const [P2,setP2] = React.useState();
   const [P3,setP3] = React.useState();
   const [P4,setP4] = React.useState();
   const [P5,setP5] = React.useState();
   const [P6,setP6] = React.useState();

   const i1 = useRef();
   const i2 = useRef();
   const i3 = useRef();
   const i4 = useRef();
   const i5 = useRef();
   const i6 = useRef();
   const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;
 
    useEffect(() => {
        async function sendOTP(){
    
       try {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        const verificationId = await phoneProvider.verifyPhoneNumber(
          num,
          recaptchaVerifier.current
        );
        setVerificationId(verificationId);
        Toast.show('OTP sent')
       
      } catch (err) {
          Toast.show(err.message)
      }
    }
      sendOTP();
      },[]);

  return(<View style = {style.mainContainer}>
        <Text style={style.text}>We sent a '6-digit OTP' on {"\n"}     +91 {numDisplay} </Text>
        <Text style={style.desc}>Please enter the OTP below to complete the verification process. </Text>
       <View style = {style.view}>
       <TextInput style={style.input}  maxLength = {1}
                keyboardType = {"number-pad"}
                ref={i1}
                onChangeText = {(P1) => {
                    setP1(P1);
                    if(P1 != '')
                    i2.current.focus()
                }}
               
                    
                />
       <TextInput style={style.input} maxLength = {1}
                keyboardType = {"number-pad"}
                ref={i2}
                onChangeText = {(P2) => {
                    setP2(P2);
                    if(P2 != '')
                    i3.current.focus()
                    else if(P2=='')
                    i1.current.focus()
                }}
               
              
                />
       <TextInput style={style.input} maxLength = {1}
                keyboardType = {"number-pad"}
                ref={i3}
                
                onChangeText = {(P3) => {
                    setP3(P3);
                    if(P3 != '')
                    i4.current.focus()
                    else if(P3 =='')
                    i2.current.focus()
                }}
                
                />
       <TextInput style={style.input} maxLength = {1}
                keyboardType = {"number-pad"}
                ref={i4}
                
                onChangeText = {(P4) => {
                    setP4(P4);
                    if(P4 != '')
                    i5.current.focus()
                    else if(P4=='')
                    i3.current.focus()
                }}
                
                />
         <TextInput style={style.input} maxLength = {1}
                keyboardType = {"number-pad"}
                ref={i5}
                onChangeText = {(P5) => {
                    setP5(P5);
                    if(P5 != '')
                    i6.current.focus()
                    else if(P5=='')
                    i4.current.focus()
                }}
                
                />
                 <TextInput style={style.input} maxLength = {1}
                keyboardType = {"number-pad"}
                ref={i6}
                onChangeText = {(P6) => {
                    setP6(P6);
                    if(P6=='')
                    i5.current.focus()
                }}
                
                />


       </View>
       <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
       <Text style={style.resend}>Resend OTP </Text>
       
       <SubmitButton text='Submit'
            onTouch={async () => {
          try {
              const cred = P1+P2+P3+P4+P5+P6
             // console.log(cred)
            const credential = firebase.auth.PhoneAuthProvider.credential(
              verificationId,
              cred
            );
            await firebase.auth().signInWithCredential(credential);
           Toast.show('Authenticated')
           navigation.navigate('City')
          } catch (err) {
           Toast.show('Please enter OTP')
          }
        }}
       />
     
    </View>)

};



const style = StyleSheet.create({
    mainContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        padding: 20

    },
    text:{
        fontSize: 18,
        fontWeight: '300',
        color: 'black',
        textAlign: "center",
        marginTop: 10,
        margin: 5

    },
    desc: {
        fontSize: 12,
        color: '#5D5D5D',
        textAlign: 'center',
        padding: 3,
        marginTop: 15
},
input:{
    height: 45,
    width: 45,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: '#5D5D5D',
    backgroundColor: '#F9F9F9',
    marginStart: 10,
    alignSelf:"center",
    fontSize: 20,
    color: 'gray',
    textAlign: 'center'
    
},
view:{
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    
    
    marginTop: 15,
    
    
   
    
    
},
resend: {
    fontFamily: 'sans-serif',
    color: '#00C99D',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
    marginTop: 10

}
});

export default Otp;