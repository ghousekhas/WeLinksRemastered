import React, { useState } from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const SubscriptionOrder = ({name,quantity,price,bought}) => {
    return(<View style = {style.container}>
    <Text style={style.greyText1}>Starting Tomorrow</Text>
    <View style={style.line}/>
 <Text style={style.name}>{name}</Text>
 
        <View style={{flexDirection: 'row'}}>
       
        <Text style={style.price}>₹{price}</Text>
        <Text style={style.quantity}>{quantity}</Text>
        </View>
        <Text style = {style.greyText}>{bought}</Text>


        <View>

        </View>
    </View>)

};

const style = StyleSheet.create({
    container:{
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'gray',
        height: Dimensions.get('window').height/4,
        
        
    },
  
    line:{
        borderWidth: 0.5,
        borderColor: 'gray',
        marginVertical: 5,
      
    }
    ,
    name: {
        marginStart: 100,
        fontWeight: '400',
        fontSize: 18,
        padding: 5,
        marginTop: 5
        
    },
    quantity: {
        marginStart: 10,
        color: 'gray',
        fontSize: 10,
        marginTop: 10,
        padding: 5
       
    },
    price: {
        marginStart: 100,
        
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: 10,
        padding: 5
      

    },
    greyText: {
        marginStart: 30,
        color: 'gray',
        fontSize: 15,
        fontWeight: '300',
       textAlign: 'right',
        justifyContent: 'flex-end',
        margin: 5
        
    },
    greyText1: {
        marginStart: 10,
        color: 'gray',
        fontSize: 15,
        fontWeight: '300',
        margin: 8
     
        
        
    },

});

export default SubscriptionOrder
