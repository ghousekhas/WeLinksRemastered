import React from 'react';
import {Text,View,StyleSheet,TextInput, Dimensions} from 'react-native';
import { Defs } from 'react-native-svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SubmitButton from '../components/SubmitButton';
import {Colors} from '../Constants'

const Otp = ({navigation}) => {
    return(<View style = {style.mainContainer}>
        <Text style={style.text}>We sent a '4-digit OTP' on {"\n"}     +91 9xxxxxxxxx6 </Text>
        <Text style={style.desc}>Please enter the OTP below to complete the verification process. </Text>
       <View style = {style.view}>
       <TextInput style={style.input}  maxLength = {1}
                keyboardType = {"number-pad"}
                    on
                />
       <TextInput style={style.input} maxLength = {1}
                keyboardType = {"number-pad"}/>
       <TextInput style={style.input} maxLength = {1}
                keyboardType = {"number-pad"}/>
       <TextInput style={style.input} maxLength = {1}
                keyboardType = {"number-pad"}/>

       </View>
       <Text style={style.resend}>Resend OTP </Text>
       <SubmitButton text='Submit'
           onTouch={()=>{
               navigation.navigate('City')
           }}
       />
     
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
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: '#5D5D5D',
    marginStart: 10,
    alignSelf:"center",
    fontSize: 20,
    color: 'gray',
    textAlign: 'center'
    
},
view:{
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
    margin: 50,

    
    
},
resend: {
    fontFamily: 'sans-serif',
    color: Colors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15

}
});

export default Otp;