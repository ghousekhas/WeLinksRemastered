import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native';

import {Colors, TextSpinnerBoxStyles,dimen,Styles, Config} from '../Constants';
import GenericSeperator from '../components/GenericSeperator';
import AppBar from '../components/AppBar';
import SubmitButton from '../components/SubmitButton';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Axios from 'axios';
import qs from 'qs';


export default function AwardBid({navigation,route}){
 const  thisVendor  = route.params;
 const { tag,bid_id,vendor_id,bid_apply_id } = route.params;
 const {item,actualUser,user_id} = route.params;
 const appliedVendorsList = route.params.appliedVendorsList;

 const awardTheBid = ()=>{
     Axios.post(Config.api_url+'php?'+qs.stringify({
        action: 'awardBid',
        user_id: 2,
        bid_id: bid_id,
        vendor_id: vendor_id,
        bid_apply_id: bid_apply_id
     })).then((response)=>{
         console.log(response.data);
         navigation.pop();
         navigation.pop();
     }

     )
 }


 return(<View>
    <AppBar 
    back
     funct={() => {
       navigation.pop();
        }} />

        <View style={{ ...Styles.parentContainer, backgroundColor: Colors.whiteBackground }}>

            <Text style={{ ...Styles.heading, width: dimen.width, textAlign: 'center', fontSize: 20 }}>{`Vendor Details`}</Text>

            <View style={styles.card}>
                <Text style={{ ...Styles.heading, width: dimen.width }}>{thisVendor.name}</Text>
                <View style={{ flexDirection: 'row' }}>

                    {/* Size is not right */}
                    <Image style={{ flex: 1.5 }} source={{ uri: thisVendor.image }} />
                    <Text style={{ ...styles.address, flex: 4 }}>{"Address : " + "#123 some road, some layout, some city, near something - 122344"}</Text>


                </View>

                <View style={{ flexDirection: 'row', marginTop: '20%' }}>
                    <Entypo name="calendar" size={23} color={Colors.blue} style={{ margin: '1%' }} />
                    <Text style={{ ...Styles.heading, fontSize: 14, color: Colors.blue }}>Offer made :  </Text>
                    <Text style={{ ...Styles.heading, fontWeight: 'bold', fontSize: 14, color: 'gray' }}>{thisVendor.time}</Text>

                </View>

                <View style={{ flexDirection: 'row', marginTop: '10%' }}>
                    <FontAwesome5 name="money-bill-wave-alt" size={20} color={Colors.blue} style={{ alignSelf: 'center', margin: '1%' }} />
                    <Text style={{ ...Styles.heading, fontSize: 14, color: Colors.blue }}>Offer amount : </Text>
                    <Text style={{ ...Styles.heading, fontWeight: 'bold', fontSize: 14, color: 'gray' }}>{" ₹ " + thisVendor.amount}</Text>

                </View>




        </View>
        <View style={{marginTop: '10%'}}>
        <SubmitButton text={'Award Bid'} 
            onTouch={awardTheBid}
        />


            </View>
            <View style={{ marginTop: '10%' }}>
                <SubmitButton text={'Award Bid'} />


            </View>


        </View>


    </View>)


}

const styles = StyleSheet.create({

    card: {
        width: dimen.width - dimen.width / 10,
        // height: dimen.height/3.8,
        borderRadius: 15,
        borderColor: Colors.seperatorGray,
        borderWidth: 0.5,
        padding: '2%',
        marginTop: '5%',
        alignSelf: 'center',
        backgroundColor: 'white',
        elevation: 1,
        height: dimen.height / 2.5
    },
    address: {
        padding: '1%',
        fontSize: 14,
        marginTop: '3%',
        flex: 1,


    },

})