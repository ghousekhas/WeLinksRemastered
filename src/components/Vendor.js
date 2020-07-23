import React, { useState } from 'react';
<<<<<<< HEAD
import {View, StyleSheet, Text, Dimensions,Image} from 'react-native';
=======
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
>>>>>>> 908c6f9df6672acff18d1b2358255f673d0e7f88
import Button from './Button';
import Stars from './Stars';
import { color } from 'react-native-reanimated';



const Vendor = ({name,brands,stars,reviews,onSelected,picture}) => {
    return(<View style={style.container}>
    <View style={{marginStart: '3%'}}>
    <View style={style.top}>
        <Text style={style.name}> {name}</Text>
        <View style={style.button}>
        <Button text='Select' onTouch={onSelected} />
        </View>
       
        </View>

        <View style = {{flexDirection: 'row'}}>
        <Text style={style.brandsTitle}>Brands: </Text>
        <Text style={style.brands}>{brands}</Text>
        </View>

        <View style = {{flexDirection: 'row',marginStart: '22%'}}>
        <Stars number={stars}/>
            <Text style = {style.review}>({reviews} reviews.)</Text>
        </View>
        </View>
        <Image style={style.image} source={require('./../../assets/vendor.png')}/>
    </View>)
};

const style = StyleSheet.create({
    container:{
        margin: '1%',
        marginBottom: '10%',
        flexDirection: 'row'
        
    },
    top:{
        flexDirection: 'column',
        width: Dimensions.get('window').width-15,
        marginStart: '1%',
       
        
      
      
        alignItems: 'flex-end',
        
        

    },
    button : {
        flexDirection: 'column',
        width: Dimensions.get('window').width-15,
        marginHorizontal: '1%',
        marginTop: '-2%',
       
        
      
      
        alignItems: 'flex-end',
    }
    ,
    
    name: {
        fontWeight: 'bold',
        marginStart: '20%',
        fontSize: 17,
        alignSelf: 'flex-start',
        color: 'black'
    },
    brandsTitle:{
        color: 'gray',
        marginStart: '22%',
        marginTop: '2%',
        fontWeight: 'bold',
       
    },
    
    brands:{
        color: 'gray',
        flex: 1,
        
        marginTop: '2%',
        
     

    },
    review:{
        color: 'gray',
        marginStart: '4%',
        marginTop: '2%',
        fontWeight: 'bold'
    },
    image: {
        width: 70,
        height: 90,
        position: 'absolute',
        margin :'1%'
        
       
    }
    
    
});


export default Vendor;