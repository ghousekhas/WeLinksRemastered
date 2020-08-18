import React from 'react';
import {Text,View,StyleSheet,TextInput, Dimensions} from 'react-native';
import { Defs } from 'react-native-svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Colors} from '../Constants'

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
        borderWidth: 0.7,
    
        borderColor: Colors.primary,
        padding: 1,
        
        paddingVertical: '2%',
        alignItems: 'flex-end',
        alignSelf: 'center',
        
        marginVertical: -2,
        // paddingHorizontal: 30,
        // paddingVertical: 2,
        maxHeight: Dimensions.get('window').height/25,
        padding: 15,
        alignItems: 'center',
        justifyContent:'center',
        marginHorizontal:'1%',
       
       

    },
    text:{
    color:Colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'center'
    }
});

export default Button;