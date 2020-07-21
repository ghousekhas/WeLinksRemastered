import React from 'react';
import {Text,View,StyleSheet,TextInput, Dimensions} from 'react-native';
import { Defs } from 'react-native-svg';
import { TouchableOpacity } from 'react-native-gesture-handler';


const Button = ({text,onTouch}) => {
    return(<View>
        <TouchableOpacity style={style.button}
         onPress={onTouch}>
        <Text style={style.text}>{text}</Text>
       
        </TouchableOpacity>
    </View>)

};

const style = StyleSheet.create({
    button: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#00C99D',
        padding: 1,
        paddingHorizontal: 30,
        paddingVertical: 2,
        alignItems: 'flex-end',
        marginHorizontal:10,
        marginVertical: -2
       
       

    },
    text:{
    color:'#00C99D',
    fontSize: 12,
    fontWeight: 'bold'
    }
});

export default Button;