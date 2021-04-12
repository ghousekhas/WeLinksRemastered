import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native';

import {Colors, TextSpinnerBoxStyles,dimen,Styles, Config,monthNames as mn, notification_identifiers} from '../Constants';
import GenericSeperator from '../components/ui_components/GenericSeperator';
import AppBar from '../components/ui_components/AppBar';
import SubmitButton from '../components/SubmitButton';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Axios from 'axios';
import qs from 'qs';
import sendNotif from '../Utility/sendNotificationTo';


export default function AwardBid({navigation,route}){
 const  thisVendor  = route.params;
 const { tag,bid_id,vendor_id,bid_apply_id } = route.params;
 const {item,actualUser,user_id} = route.params;
 const appliedVendorsList = route.params.appliedVendorsList;
 console.log(thisVendor.image)
 const [submitted,isSubmitted] = useState(false);

 const sortDate = (date) => {
      
    console.log("Wrong date " + date)
    let d = date.split('-');
    
    let m = mn[Number(d[1] >= 10 ? d[1] : d[1]%10)];
    console.log(`${d[2]}-${m}-${d[0]}}`)
    return `${d[2]}-${m}-${d[0]}`


}

 const awardTheBid = ()=>{
     isSubmitted(true);
     Axios.post(Config.api_url+'php?'+qs.stringify({
        action: 'awardBid',
        user_id: actualUser.user_id,
        bid_id: bid_id,
        vendor_id: vendor_id,
        bid_apply_id: bid_apply_id
     })).then((response)=>{
         console.log(response.data);
         alert('Awarded Successfully!');
         sendNotif('Bid Awarded', 'A bid in corporate Scrap has been awarded to you', 'vendor'+vendor_id, notification_identifiers.vendor_corporate_orders);
         navigation.pop();
         navigation.pop();
     }

     )
 }


 return(<View>
    <AppBar 
    title={thisVendor.name}
    back
     funct={() => {
       navigation.pop();
        }} />

        <View style={{ ...Styles.parentContainer, backgroundColor: Colors.whiteBackground }}>

            {/* <Text style={{ ...Styles.heading, width: dimen.width, textAlign: 'center', fontSize: 20 }}>{`Vendor Details`}</Text> */}

            <View style={styles.card}>
                <Text style={{ ...Styles.heading, width: dimen.width }}>{thisVendor.name}</Text>
                <View style={{flexDirection: 'row'}}>

                    {/* Size is not right */}
                    <Image style={{ ...styles.image, aspectRatio: 1 / 1.7, alignSelf: 'flex-start', borderWidth: 1, flex: 1,marginTop: '3%' }} source={{ uri: "https://dev.we-link.in/dist/img/users/"+thisVendor.image }} />
                    <Text style={{ ...styles.address, flex: 4,margin:'3%' }}>{thisVendor.address}</Text>


                </View>

                <View style={{ flexDirection: 'row', marginTop: '5%' }}>
                    <Entypo name="calendar" size={23} color={Colors.blue} style={{ margin: '1%' }} />
                    <Text style={{ ...Styles.heading, fontSize: 14, color: Colors.blue }}>Offer made :  </Text>
                    <Text style={{ ...Styles.heading, fontWeight: 'bold', fontSize: 14, color: 'gray' }}>{sortDate(thisVendor.time.substring(0,10))}</Text>

                </View>

                <View style={{ flexDirection: 'row', marginTop: '1%' }}>
                    <FontAwesome5 name="money-bill-wave-alt" size={20} color={Colors.blue} style={{ alignSelf: 'center', margin: '1%' }} />
                    <Text style={{ ...Styles.heading, fontSize: 14, color: Colors.blue }}>Offer amount : </Text>
                    <Text style={{ ...Styles.heading, fontWeight: 'bold', fontSize: 14, color: 'gray' }}>{" ₹ " + thisVendor.amount}</Text>

                </View>




        </View>
        {tag != 'Cancelled' ? 
        <View style={{marginTop: '10%'}}>
        <SubmitButton styling={submitted} text={'Award Bid'} 
            onTouch={awardTheBid}
        />


            </View> : null}
          

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
       // height: dimen.height / 3
    },
    address: {
        padding: '1%',
        fontSize: 14,
        marginTop: '3%',
        flex: 1,


    },image: {
        width: 70,
        height: 90,
        //  position: 'absolute',
        //  margin :'1%'


    },

})