import React,{ Fragment, useState, useRef } from 'react';
import { View,Text,TouchableOpacity,StyleSheet,Dimensions } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Product from '../components/Product';


const VendorScreen = ({navigation}) => {
    const items = [
        {
            name: 'Nandini Toned Milk',
            quantity: '1 packet',
            price: '₹22'
        },
        {
            name: 'Heritage Toned Milk',
            quantity: '1 packet',
            price: '₹22'
        },
        {
            name: 'Thirumala Toned Milk',
            quantity: '1 packet',
            price: '₹23'
        }, {
            name: 'Nandini Toned Milk 1',
            quantity: '1 packet',
            price: '₹22'
        },
        {
            name: 'Heritage Toned Milk 1',
            quantity: '1 packet',
            price: '₹22'
        },
        {
            name: 'Thirumala Toned Milk 1',
            quantity: '1 packet',
            price: '₹23'
        }

    ];
    return(<View style={style.container}>
    <View style={style.header}>
        <Text style={style.name}>Vendor Name</Text>
        <Text style={style.address}>#101, 1st main, Kalyan Nagar, Bangalore - 560043</Text>

       <View style = {{flexDirection: 'row'}}>
        <Text style={style.brandsTitle}>3 stars </Text>
            <Text style = {style.review}>(10 reviews.)</Text>
        </View>
        <Text style={{fontSize: 20,fontWeight:'bold',marginTop: 30,marginStart: 3}}>Brands</Text>
    </View>
    <FlatList
        data = {items}
        keyExtractor = {(item) => item.name}
        renderItem = {({item}) => { 
            return(
                <Product name={item.name} quantity={item.quantity} price={item.price}  
                subscribe={() => {
                    navigation.navigate('SubscribeScreen') } 
                }/>

            )
        }}

    />
  

    </View>)
};


const style = StyleSheet.create({
    container: {
        
        padding: 1
        
    },
    header: {
        backgroundColor: '#E5F6FE',
        height: Dimensions.get('window').height/3,
        padding:5
       

    },
    name: {
        marginTop: 20,
        marginStart: 100,
        fontWeight: 'bold',
        fontSize: 20

    },
    address:{
        marginTop: 5,
        marginStart: 100,
        fontWeight: 'bold',
        fontSize: 13
    },
    brandsTitle:{
        color: 'gray',
        marginStart: 100,
        marginTop: 7,
        fontWeight: 'bold'
    },
    review:{
        color: 'gray',
        marginStart: 10,
        marginTop: 6,
        fontWeight: 'bold'
    },
});

export default VendorScreen;