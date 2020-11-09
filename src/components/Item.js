import React, { useState } from 'react';
import {View, StyleSheet, Text, Dimensions,Image} from 'react-native';
import { Styles, Colors } from '../Constants';

const Item = ({name, quantity, price, imageUrl,tag}) => {
    const dimg= require('../../assets/ic_launcher.png');
    console.log(tag)
    const defaultimg=dimg.uri;
    return(
    <View style={{flexDirection: 'row'}}>
     
    
    <View style={style.container}>

        <Text style={style.name}>{name}</Text>
        <View style={{flexDirection: 'row',alignItems:'center',flex:0}}>
       
        <Text style={style.price}>₹{price}</Text>
        <Text style={{...style.quantity,alignSelf:'center',fontWeight:'bold'}}>·</Text>
        <Text style={{...style.quantity,alignSelf:'center'}}>{quantity + (tag == 'Paper' ? ' unit/s' : '')}</Text>
        </View>
       
        
        </View>
        <Image style={style.image} source={{uri: imageUrl!=''? imageUrl: defaultimg}}/>
        
        </View>)
        
        
};
const style = StyleSheet.create({
    container: {
        ...Styles.parentContainer,
        marginTop: '0%',
        backgroundColor: Colors.lightBlue,
       height:Dimensions.get('window').height/6.5,
       width:Dimensions.get('window').width,
      
      
       
        padding: 5
    },
    name: {
        marginStart: 100,
        fontWeight: 'bold',
        fontSize: 16,
        padding: 5
        
    },
    quantity: {
       
        color: 'gray',
        fontSize: 11,
       
        padding: 5,
        alignSelf: 'center'
       
    },
    price: {
        marginStart: 100,
        
        fontWeight: 'bold',
        fontSize: 15,
      
        padding: 5
      

    },
    image: {
        width: 79,
        height: 80,
        position: 'absolute',
        marginStart: '2%',
        
        
        marginTop : '3%'
        
       
    }
});



export default Item;