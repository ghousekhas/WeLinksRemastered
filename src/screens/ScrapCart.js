import React, { useState } from 'react';
import {View, StyleSheet, Text, Dimensions,Image} from 'react-native';
import { TouchableOpacity, FlatList,ScrollView } from 'react-native-gesture-handler';
import Vendor from '../components/Vendor';
import { userDetails } from '../UserDetails';
import { Avatar } from 'react-native-paper';
import {Styles} from '../Constants';
import Accordion  from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
import Stars from '../components/Stars';
import Product from '../components/Product';
import {Entypo} from '@expo/vector-icons'
import { Rect } from 'react-native-svg';
import GenericSeperator from '../components/GenericSeperator';
import SubmitButton from '../components/SubmitButton';
import {EvilIcons} from '@expo/vector-icons';

var cartItems=[1,2,3,4,5]

export default class ScrapCart extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    };

    renderCartItem = (item)=>{
        return (
            <View style={Styles.horizontalRow}>
                <Text style={Styles.cartItemTitle}>item.text</Text>
                <TouchableOpacity style={Styles.touchableButtonBorder}>
                    <Text>remove</Text>
                </TouchableOpacity>
            </View>
        );
    }


    render(){
        

        return(
            <View style={Styles.parentContainer}>
                <View style={Styles.scrapTopCart}>
                    <FlatList numColumns={1} 
                        scrollEnabled={true}
                        renderItem = {this.renderCartItem}
                        ItemSeparatorComponent = {GenericSeperator}
                        data = {cartItems}
                        keyExtractor= {(item,index) => index}
                        style={{width: '100%',height: '40%'}}
                        />
                </View>
                <View style={Styles.scrapBottom}>
                    <Text style={Styles.heading}>Pickup Date and Time</Text>
                    <View style={Styles.horizontalCalendarRow}>
                        {//SevenViewshere
                        }
                    </View>
                    <Text>Schedule Time</Text>
                    <View style={Styles.horizontalCalendarButtonsRow}>
                        <TouchableOpacity>
                            <View style={{flexDirection: 'row'}}>
                                <EvilIcons name="clock" size={24} color="black" />
                                <Text>  9:00 AM -  </Text>
                            </View>
                            <Text> 12:00 PM</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={{flexDirection: 'row'}}>
                                <EvilIcons name="clock" size={24} color="black" />
                                <Text>  9:00 AM -  </Text>
                            </View>
                            <Text> 12:00 PM</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={{flexDirection: 'row'}}>
                                <EvilIcons name="clock" size={24} color="black" />
                                <Text>  9:00 AM -  </Text>
                            </View>
                            <Text> 12:00 PM</Text>
                        </TouchableOpacity>
                        {//paste thrice
                        }
                    </View>
                </View>
                <View style={Styles.submitButtonBottom}>
                    <TouchableOpacity style={{width: '100%',height: '100%',justifyContent: 'center'}}>
                       <Text style={{alignSelf: 'center',zIndex: 100,color: 'white',fontSize: 15}} >CONFIRM PICKUP</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );

    }
}