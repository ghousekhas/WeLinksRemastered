import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Text, Dimensions,Image,ScrollView} from 'react-native';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import Vendor from '../components/Vendor';
import { Avatar } from 'react-native-paper';
import {Styles,ScrapStyles,dimen,Colors} from '../Constants';
import Accordion  from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
import Stars from '../components/Stars';
import Product from '../components/Product';
import AppBar from '../components/AppBar';
import {Entypo} from '@expo/vector-icons'
import { Rect } from 'react-native-svg';
import GenericSeperator from '../components/GenericSeperator';
import SubmitButton from '../components/SubmitButton';
import {EvilIcons} from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';
import Appliance from '../components/Appliance';
import ExpandableTextBox from '../components/ExpandableTextBox';
import moment from 'moment';
import Axios from 'axios';
import qs from 'qs';
import AsyncStorage from '@react-native-community/async-storage';
import {Config} from  '../Constants';

export default function MyScrapSaleOrder({navigation,route}){
    const {actualUser,item} = route.params;
    const {cart} = route.params.item;

    return (

        <View style={{flex: 1}}>
        <AppBar back funct={() => {navigation.pop()}} />
        
        <ScrollView style={{flex: 1}}>
        <View style={{marginTop: dimen.height/16,flex: 1}}>
            <View style={Styles.scrapTopCart}>
            
                        <View style={{backgroundColor: 'white'}}>
                            {route.params.card}
                            </View>
                    
            <FlatList
                data={cart}
                //stickyHeaderIndices={[0]}
                keyExtractor={(item,index)=>index.toString()}
                renderItem={({item,index})=>{
                    return(
                        <Appliance 
                        schedule={true}
                        remove={true}
                        item = {item}
                        index= {index}
                        onAdd={(num) => {
             
                    
                            cart.push({
                                ...item,
                                itemQuantity : num
                            });
       
       
       
                               console.log(cart)
                           
                           
                           
                       }} 
                      
                       initquan={item.cart_quantity}
                       name={item.homescrap_name} quantity={item.quantity} price={item.homescrap_price}  price_={item.price_} image={item.homescrap_image_url}
                       subscribe={() => {
                          
                           const prodName = item.name;
                           const prodQuan = item.quantity;
                           const prodRate = item.price;
                           const prodRate_ = item.price_;
       
                           navigation.navigate('SubscribeScreen',{
                               tag : 'paper',
                               pname : prodName,
                               pquan : prodQuan,
                               prate: prodRate
                           }) } 
                       }/>
       
                    )

                }}
                />
             
            </View>
        
            </View>
            </ScrollView>
            </View>

    );
}