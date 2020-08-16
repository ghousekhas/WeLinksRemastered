import React from 'react';
import {Text,View,StyleSheet,TextInput, Dimensions} from 'react-native';
import { Defs } from 'react-native-svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Colors} from '../Constants'
const SubmitButton = ({text,onTouch,styles}) => {
    return(
        <TouchableOpacity style={{
        backgroundColor: Colors.primary,
        width: Dimensions.get('window').width-30,
        height: 45,
        borderRadius: 5,
        alignSelf: 'center',
        
       
       

    }}
         onPress={onTouch}>
        <Text style={{
            textAlign: "center",
            textAlignVertical: "center",
            alignSelf:"center",
            color: 'white',
            fontWeight: '300',
            ...StyleSheet.absoluteFill,
            
        }}>{text}</Text>
       
        </TouchableOpacity>)

};



const style = StyleSheet.create({
    buttonText: {
        
        
        
        
    },
    button:{
        backgroundColor: Colors.primary,
        height: '100%',
        width: '97%',
        aspectRatio: 10/1.4,
        borderRadius: 5,
       
       

    },

});
export default SubmitButton;