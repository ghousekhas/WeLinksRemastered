import React from 'react';
import { Text, View, StyleSheet, TextInput, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from '../Constants'

const Button = ({ text, onTouch, red,disable,gray }) => {
    return (<View>
        <TouchableOpacity disabled={disable} style={{ ...style.button, borderColor: red ? 'red' : gray ? 'gray' : Colors.primary }}
            onPress={onTouch}>
            <Text numberOfLines={1} style={{ ...style.text, color: red ? 'red' : gray ? 'gray' : Colors.primary }}>{text}</Text>

        </TouchableOpacity>
    </View>)

};

const style = StyleSheet.create({
    button: {
        borderRadius: 5,
        borderWidth: 1,

        borderColor: Colors.primary,
   
        maxHeight: Dimensions.get('window').height / 33,
         width: Dimensions.get('window').width / 4.5,
        
        alignItems: 'center',
        justifyContent: 'center',
       // backgroundColor:'green'



    },
    text: {
        color: Colors.primary,
        fontSize: 13,
        fontWeight: 'bold',
        alignSelf: 'center',
       paddingHorizontal: 20,
      //  paddingVertical: 20
    }
});

export default Button;