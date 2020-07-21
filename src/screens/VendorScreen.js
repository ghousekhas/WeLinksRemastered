import React,{ Fragment, useState, useRef } from 'react';
import { View,Text,TouchableOpacity,StyleSheet,Dimensions } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Product from '../components/Product';


const VendorScreen = ({route,navigation}) => {
    const [list,updateList] = useState([
        {
            name: 'Nandini Toned Milk',
            quantity: '1 packet',
            price: '22'
        },
        {
            name: 'Heritage Toned Milk',
            quantity: '1 packet',
            price: '27'
        },
        {
            name: 'Thirumala Toned Milk',
            quantity: '1 packet',
            price: '24'
        }, {
            name: 'Nandini Toned Milk 1',
            quantity: '1 packet',
            price: '22'
        },
        {
            name: 'Heritage Toned Milk 1',
            quantity: '1 packet',
            price: '22'
        },
        {
            name: 'Thirumala Toned Milk 1',
            quantity: '1 packet',
            price: '23'
        }

    ]);

   

    const {name} = route.params;
    const {stars} = route.params;
    const {reviews} = route.params;

   // const order = navigation.getParams('order');
    return(<View style={style.container}>
    <View style={style.header}>
        <Text style={style.name}>{JSON.stringify(name).slice(1,-1)}</Text>
        <Text style={style.address}>#101, 1st main, Kalyan Nagar, Bangalore - 560043</Text>

       <View style = {{flexDirection: 'row'}}>
        <Text style={style.brandsTitle}>{JSON.stringify(stars)+' stars'}</Text>
            <Text style = {style.review}>({JSON.stringify(reviews)+' reviews'})</Text>
        </View>
        <Text style={{fontSize: 20,fontWeight:'bold',marginTop: 30,marginStart: 3}}>Brands</Text>
    </View>
    <FlatList
        data = {list}
        keyExtractor = {(item) => item.name}
        renderItem = {({item}) => { 
            return(
                <Product name={item.name} quantity={item.quantity} price={item.price}  
                subscribe={() => {
                    const prodName = item.name;
                    const prodQuan = item.quantity;
                    const prodRate = item.price;

                    navigation.navigate('SubscribeScreen',{
                        pname : prodName,
                        pquan : prodQuan,
                        prate: prodRate
                    }) } 
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
        marginTop: 0.02 * Dimensions.get('window').height,
        marginStart: 100,
        fontWeight: 'bold',
        fontSize: 20

    },
    address:{
        marginTop: 0.01 * Dimensions.get('window').height,
        marginStart: 100,
        fontWeight: 'bold',
        fontSize: 13
    },
    brandsTitle:{
        color: 'gray',
        marginStart: 100,
        marginTop: 0.02 * Dimensions.get('window').height,
        fontWeight: 'bold'
    },
    review:{
        color: 'gray',
        marginStart: 10,
        marginTop: 0.02 * Dimensions.get('window').height,
        fontWeight: 'bold'
    },
});

export default VendorScreen;