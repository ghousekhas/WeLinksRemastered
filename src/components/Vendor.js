import React, { useState } from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import Button from './Button';


const Vendor = ({name,brands,stars,reviews,onSelected}) => {
    return(<View style={style.container}>
    <View style={style.top}>
        <Text style={style.name}> {name}</Text>
       <Button text='Select' onTouch={onSelected} />
        </View>

        <View style = {{flexDirection: 'row'}}>
        <Text style={style.brandsTitle}>Brands: </Text>
        <Text style={style.brands}>{brands}</Text>
        </View>

        <View style = {{flexDirection: 'row'}}>
        <Text style={style.brandsTitle}>{stars} stars </Text>
            <Text style = {style.review}>({reviews} reviews.)</Text>
        </View>
    </View>)
};

const style = StyleSheet.create({
    container:{
        margin: '2%',
        marginBottom: '10%',
        
    },
    top:{
        flexDirection: 'column',
        width: Dimensions.get('window').width-10,
      
        alignItems: 'flex-end',
        
        

    },
    
    name: {
        fontWeight: 'bold',
        marginStart: 80,
        fontSize: 15,
        alignSelf: 'flex-start'
    },
    brandsTitle:{
        color: 'gray',
        marginStart: 80,
        marginTop: '2%',
        fontWeight: 'bold'
    },
    
    brands:{
        color: 'gray',
        flex: 1,
        
        marginTop: '2%',

    },
    review:{
        color: 'gray',
        marginStart: 10,
        marginTop: '2%',
        fontWeight: 'bold'
    },
    
    
});


export default Vendor;