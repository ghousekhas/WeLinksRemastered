import React,{ Fragment, useState, useRef } from 'react';
import { View,Text,TouchableOpacity,StyleSheet,Dimensions } from 'react-native';
import Button from './Button';



const Product = ({name,quantity,price,subscribe}) => {
    return(<View style={style.container}>
    <View>
    <Text style={style.name}>{name}</Text>
    <Text style={style.quantity}>{quantity}</Text>
    <Text style={style.price}>{price}</Text>
    </View>

    <View style={{marginTop: 10}}>
    <TouchableOpacity style={style.button}>
        <Text style={style.text}>+ Add</Text>
       
        </TouchableOpacity>

        <TouchableOpacity style={style.button} onPress={subscribe}>
        <Text style={style.text}>Subscribe</Text>
       
        </TouchableOpacity>
    </View>
    

    </View>)
};


const style = StyleSheet.create({
    container: {
        margin: 10,
        padding: 10,
        flexDirection: 'row'
        
        
    },
    name: {
        fontWeight:'bold',
        marginStart: 70,
        flex: 1,
        
        width: Dimensions.get('window').width/3
    },
    quantity: {
        marginStart: 70,
        color: 'gray'

    },
    price: {
        fontWeight:'bold',
        marginStart: 70,
        fontSize: 17

    },
    button: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#00C99D',
        padding: 1,
        paddingHorizontal: 20,
        paddingVertical: 2,
        alignItems: 'center',
        marginHorizontal:5,
        marginStart: 20,
        marginVertical: 4
       
       

    },
    text:{
    color:'#00C99D',
    fontSize: 12,
    fontWeight: 'bold'
    }
});

export default Product;