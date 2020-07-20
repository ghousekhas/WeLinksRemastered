import React from 'react';
import {Text,View,StyleSheet,TextInput, Dimensions} from 'react-native';
import { Defs } from 'react-native-svg';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SubmitButton = ({text,onTouch}) => {
    return(<View>
        <TouchableOpacity style={style.button}
         onPress={onTouch}>
        <Text style={style.buttonText}>{text}</Text>
       
        </TouchableOpacity>
    </View>)

};



const style = StyleSheet.create({
    buttonText: {
        textAlign: "center",
        textAlignVertical: "center",
        alignSelf:"center",
        color: 'white',
        fontWeight: '300',
        ...StyleSheet.absoluteFill,
        
        
        
        
    },
    button:{
        alignSelf: "center",
        marginTop: 20,
        backgroundColor: '#00C99D',
        width: Dimensions.get('window').width-30,
        height: 45,
        borderRadius: 5,
       
       

    },

});
export default SubmitButton;