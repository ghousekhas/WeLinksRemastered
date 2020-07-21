import React, { useState } from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Item = ({name, quantity, price}) => {
    return(<View style={style.container}>

        <Text style={style.name}>{name}</Text>
        <View style={{flexDirection: 'row'}}>
       
        <Text style={style.price}>₹{price}</Text>
        <Text style={style.quantity}>{quantity}</Text>
        </View>
       
        
        </View>)
        
        
};
const style = StyleSheet.create({
    container: {
        backgroundColor: '#EDF9F9',
       height:Dimensions.get('window').height/6,

        padding: 5
    },
    name: {
        marginStart: 100,
        fontWeight: '400',
        fontSize: 18,
        padding: 5
        
    },
    quantity: {
        marginStart: '3%',
        color: 'gray',
        fontSize: 10,
        marginTop: '3%',
        padding: 5
       
    },
    price: {
        marginStart: 100,
        
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: '3%',
        padding: 5
      

    }
});



export default Item;