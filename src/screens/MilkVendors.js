import React, { useState,useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import {View, StyleSheet, Text, Dimensions,Image, BackHandler} from 'react-native';
import { TouchableOpacity, FlatList, BorderlessButton } from 'react-native-gesture-handler';
import Vendor from '../components/Vendor';
import { userDetails } from '../UserDetails';
import { Avatar } from 'react-native-paper';
import AppBar from '../components/AppBar';
import {Colors, Styles} from '../Constants';
import Axios from 'axios';
import qs from 'qs';

const MilkVendors = (props) => {
    const address= props.route.params.address;
    console.log(address);

    const words = {
        milk: 'Milk vendors in your locality',

    }

    useEffect(()=>{
        Axios.get('http://api.dev.we-link.in/user_app.php?action=getVendors&'+qs.stringify({
            vendor_type: 'milk',
            lat: address.lat,
            lng: address.lng
        }),).then((response)=>{
            console.log('one',response.data.vendor);
            updateVendors(response.data.vendor);
        })
    },[]);
  
   

    const [vendors,updateVendors] = useState([

    ]);
    useFocusEffect(
        React.useCallback(() => {
          const onBackPress = () => {
         //  console.log('Go to homescreen');
           props.navigation.navigate('AddressList');
              return true;
            
          };
    
          BackHandler.addEventListener('hardwareBackPress', onBackPress);
    
          return () =>
            BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        },)
      );
 

    
    return(<View style={{flex: 1,backgroundColor: 'white'}}>
     <AppBar back ={true} funct={() => {
       props.navigation.pop();
        }} />
    <View style={{flexDirection: 'row',marginTop: Dimensions.get('window').height/14}}>
    <Image  style ={style.avatar} source={require('./../../assets/avatar.png')}/>
  
   
    <View style={style.header}>
        <Text style ={style.username}>{userDetails.USER_NAME}</Text>
        <Text style={style.address}>{address.addr_name+' '+ address.addr_pincode}</Text>
    </View>
    </View>
    <View style={Styles.grayfullline} />
<View style={style.heading}>
<Text style={Styles.heading}>{words.milk}</Text>
</View>
   

    <FlatList 
        data={vendors}
        keyExtractor={(item) => item.name}
        renderItem={({item}) => {
            const vendorName = item.name;
            const vendorStars = item.avg_ratings;
            const vendorReviews = item.reviews_number;
            var brandsString= '';
            const brands= item.brands;
            const imageUrl=item.img_url;
            const vendorAddress= item.addresses[0].addr_details+' '+item.addresses[0].addr_landmark+' '+item.addresses[0].addr_pincode;
            console.log('itembrands',brands);
            for(let i=0;i<brands.length-1;i++)
               brandsString= brandsString+brands[i].brand+','+' ';
            brandsString=brandsString+brands[brands.length-1];

            return(
                <Vendor name={item.name} brands={brandsString} stars={item.avg_ratings} reviews={item.reviews_number} imageUrl={imageUrl}
                onSelected={() => {
             
                props.navigation.navigate('VendorScreen',{
                    tag: 'milk',
                    name: vendorName,
                    stars: vendorStars,
                    reviews: vendorReviews,
                    address: address,
                    vendorAddress: vendorAddress,
                    imageUrl: imageUrl
                })
                
                    
                }}

                />
            )

        }}
    />

   

    </View>)
};

const style = StyleSheet.create({
    header: {
        margin: '5%',
        padding: '3%',
        marginStart: '20%'
        
    },
    username: {
        fontWeight: 'bold',
        marginStart: '25%',
        fontSize: 18
    },
    address: {
        marginTop: '3%',
        borderRadius: 5,
        backgroundColor: Colors.primary,
        color: 'white',
        padding: 3,
        marginStart: '25%',
        paddingHorizontal: 6,
        
        fontSize: 13,
        
    },
    line:{
        borderWidth: 0.5,
        borderColor: 'gray',
        marginVertical: '2%',
          
        
    },
    heading: {
        marginBottom: '5%'
    },
    avatar: {
        width: 50,
        height: 50,
        margin: '5%',
        padding: '3%',
        position: 'absolute'
        
       
    }

})

export default MilkVendors;
