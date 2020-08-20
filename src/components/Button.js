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
        borderWidth: 1,
    
        borderColor: Colors.primary,
        padding: 1,
        
        paddingVertical: '2%',
        alignItems: 'flex-end',
        alignSelf: 'center',
        
        marginVertical: -2,
        // paddingHorizontal: 30,
        // paddingVertical: 2,
        maxHeight: Dimensions.get('window').height/25,
        
        alignItems: 'center',
        justifyContent:'center',
        marginHorizontal:'1%',
       
       

    },
    text:{
    color:Colors.primary,
    fontSize: 13,
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20
    }
});

export default Button;