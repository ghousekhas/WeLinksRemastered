import React,{ Fragment, useState, useRef } from 'react';
import { View,Text,TouchableOpacity,StyleSheet,Dimensions, Image } from 'react-native';
import Button from './Button';
import {Colors} from '../Constants'


const Product = ({place,name,quantity,price,price_,subscribe,imageUrl}) => {
    console.log('Place at '+place)
    const [imageHeight,setImageHeight]=useState(0);
    if(!price_ == ''){
    
    return(<View style={style.container}>
    <View>
    <Image style={style.image} source={{uri: imageUrl}}/>

    </View>
    <View style={{marginStart: '3%'}}>
    <Text style={style.name}>{name}</Text>
    <Text style={style.quantity}>{quantity}</Text>
    <Text style={style.price}> Weekdays- ₹{price}</Text>
    <Text style={style.price}> Weekends- ₹{price_}</Text>
    </View>

    <View style={{justifyContent: 'center',flex:1}}>
   
   

        <TouchableOpacity style={{...style.button,marginTop: '0%'}} onPress={subscribe}>
        <Text style={style.text}>Subscribe</Text>
       
        </TouchableOpacity>
    </View>
    

    </View>)
    }else return(
        <View onLayout={({nativeEvent})=>setImageHeight(nativeEvent.layout.height)} style={style.container}>
        <View style={{marginStart : 10}}>
        <Image style={{...style.image}} source={{uri: imageUrl}}/>

        </View>
    <View style={{marginStart: '3%'}}>
    <Text style={style.name}>{name}</Text>
    <Text style={style.quantity}>{quantity}</Text>
    <Text style={style.price}> ₹{price}</Text>
    
    </View>

    <View style={{flex:1,justifyContent: 'center'}}>
   

        <TouchableOpacity style={style.button} onPress={subscribe}>
        <Text style={style.text}>Subscribe</Text>
       
        </TouchableOpacity>
    </View>
    

    </View>

    )
};


const style = StyleSheet.create({
    container: {
        margin: 10,
        padding: 10,
        flexDirection: 'row',
   //     backgroundColor: 'yellow'
        
        
    },
    name: {
        fontWeight:'bold',
        marginStart: 80,
        flex: 1,
    //    marginVertical: '2%',
        
        width: Dimensions.get('window').width/3
    },
    quantity: {
        marginStart: 80,
        marginVertical: '2%',
        

    },
    price: {
        fontWeight:'bold',
        marginStart: 79,
        fontSize: 14,
        marginVertical: '2%',


    },
    button: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.primary,
        padding: 1,
        // paddingHorizontal: 20,
        // paddingVertical: 2,
        width: Dimensions.get('window').width/4.5,
        aspectRatio: 5/1.3,
        alignItems: 'center',
        justifyContent: 'center',
       
        marginStart: '22%',
      //  marginVertical: '3%'
       
       

    },
    text:{
    color:Colors.primary,
    fontSize: 12,
    fontWeight: 'bold'
    },
    image: {
        width: 80,
        height: 80,
        position: 'absolute',
        marginStart: '-1%',
        
        marginTop : '3%'
        
       
    }
});

export default Product;