import React, { useState } from 'react';
import {View, StyleSheet, Text, Dimensions,Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';


const SubscriptionOrder = ({name,quantity,price,bought}) => {
    return(<View style={{flexDirection: 'row'}}>
       <Image style={quantity.includes('unit',0)? style.image : style.image1} source={
            quantity.includes('unit',0) ? 
            require('./../../assets/news_p.png')
            : require('./../../assets/milk_p.png')}/>
    
    <View style = {style.container}>
    <View style={{flexDirection: 'row'}}>
    <Text style={style.greyText1}>Starting Tomorrow</Text>
    <Feather name="trash-2" size={24} color="black" style={style.icon}/>
    </View>
    
    <View style={style.line}/>
 <Text style={style.name}>{name}</Text>
 
        <View style={{flexDirection: 'column'}}>
        <Text style={style.quantity}>{quantity} · daily</Text>
        <Text style={style.price}>₹{price}</Text>
       
        </View>
        <Text style = {style.greyText}>{bought}</Text>


        <View>

        </View>
        </View>
    </View>)

};

const style = StyleSheet.create({
    container:{
        marginTop: '3%',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'gray',
        height: Dimensions.get('window').height/4,
        width: Dimensions.get('window').width-30,
        margin: '3%'

        
        
    },
  
    line:{
        borderWidth: 0.5,
        borderColor: 'gray',
        marginVertical: '2%',
      
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
        marginStart: 100,
        
        
        fontSize: 15,
       
        padding: 1
       
    },
    price: {
        marginStart: 100,
        
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: 10,
        padding: 5
      

    },
    greyText: {
       
        color: 'gray',
        fontSize: 15,
        fontWeight: '300',
       alignItems: 'flex-end',
        justifyContent: 'flex-end',
        textAlign: 'right',
        margin: '2%',
        
        
    },
    greyText1: {
        marginStart: '3%',
        color: 'gray',
        fontSize: 15,
        fontWeight: '300',
        margin: '2%',
        
     
        
        
    },
    image1: {
        width: 73,
        height: 70,
        position: 'absolute',
        marginStart: '4%',
        
        marginTop : '16%'
        
       
    },
    image: {
        width: 90,
        height: 60,
        position: 'absolute',
        marginStart: '3%',
        
        marginTop : '16%'
        
       
    },
    icon: {
        marginVertical: '2.2%',
        
     position: 'absolute',
     right: '2%'
       
    }
    

});

export default SubscriptionOrder
