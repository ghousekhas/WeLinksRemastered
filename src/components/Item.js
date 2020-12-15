import React, { useState } from 'react';
import {View, StyleSheet, Text, Dimensions,Image} from 'react-native';
import { Styles, Colors,dimen } from '../Constants';

const Item = ({name, quantity, price, imageUrl,tag}) => {
    const dimg= require('../../assets/ic_launcher.png');
    const [height,setHeight] = useState(0);
    console.log(tag)
    const defaultimg=dimg.uri;
    return(
    <View style={{flexDirection: 'row',backfaceVisibility: Colors.secondary,paddingVertical: dimen.mVm}}>
        <Image style={style.image} source={{uri: imageUrl!=''? imageUrl: defaultimg}}/>
     
    
    <View style={style.container}>

        <Text style={style.name}>{name}</Text>
        <View style={{flexDirection: 'row',alignItems:'center',flex:0}}>
       
        <Text style={style.price}>₹{price}</Text>
        <Text style={{...style.quantity,alignSelf:'center',fontWeight:'bold'}}>·</Text>
        <Text style={{...style.quantity,alignSelf:'center'}}>{quantity + (tag == 'Paper' ? ' unit/s' : '')}</Text>
        </View>
       
        
        </View>
        

        
        </View>)
        
        
};
const style = StyleSheet.create({
    container: {
        marginTop: '0%',
      //  marginHorizontal: '1%',
       backgroundColor: Colors.lightBlue,
       flex: 2.5,
       
      
      
       
        paddingHorizontal: dimen.sHm
    },
    name: {
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
        
        fontWeight: 'bold',
        fontSize: 15,
      
        padding: 5
      

    },
    image: {
        flex: 1,
        aspectRatio: 1

        
        
       
    }
});



export default Item;