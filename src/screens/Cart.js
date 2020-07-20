import React, { useState } from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SubscriptionOrder from '../components/SubscriptionOrder';
import SubmitButton from '../components/SubmitButton';


const Cart = () => {
    return(<View style={style.container}>
    <Text style={style.title}>Subscription Orders</Text>
        <SubscriptionOrder name='Thirumala Double Toned Milk (500ml) '
         quantity='1 Ptk' price='200'  bought='30 Pkts' />

         <View style={style.gray}>
             <Text style={style.text}>Total number of deliveries may be adjusted as per market rates.</Text>
         </View>

         <View style={style.gray1}>
             <Text style={style.coupon}>Got a coupon code? Apply</Text>
         </View>

         <View  style={{padding: 10}}>
         <View style={{flexDirection: 'row'}}>
             <Text style={style.billText}>Cart amount</Text>
             <Text style={style.billCost}>₹200</Text>
         </View>
         <View style={{flexDirection:'row'}}>
             <Text style={style.billText}>Delivery fee</Text>
             <Text style={style.billCost}>₹50</Text>
         </View>
         <View style={style.line}/>
         <View style={{flexDirection:'row'}}>
             <Text style={style.billText}>Amount to pay</Text>
             <Text style={style.billCost}>₹250</Text>
         </View>

         <SubmitButton text='Confirm'/>
         </View>

        
    </View>)

};

const style = StyleSheet.create({
    line:{
        borderWidth: 0.5,
        borderColor: 'gray',
        marginVertical: 5,
      
    },
    container: {
        margin: 10,
        marginVertical: 15
    },
    title:{
        fontSize: 20,
        margin: 5,
        fontWeight: 'bold'
    },
    gray: {
        marginTop: 10,
       backgroundColor: '#e0e0e0',
        borderRadius: 10,
        height: Dimensions.get('window').height/12,
    },
    gray1: {
        marginTop: 10,
       backgroundColor: '#e0e0e0',
        borderRadius: 10,
        borderWidth: 0.6,
        elevation: -5,
        height: Dimensions.get('window').height/12,
    },
    text: {
        padding: 10,
        color: 'gray',
    },
    coupon: {
        marginStart: 50,
        fontWeight: '800',
        fontSize: 16,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 13
    },
    billText:{
        fontSize: 20,
        marginTop: 10
    },
    billCost:{
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 12,
        textAlign: 'right',
        
       
        ...StyleSheet.absoluteFill
        
    }

});

export default Cart;
