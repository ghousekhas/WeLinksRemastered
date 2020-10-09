import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import {View, StyleSheet, Text, Dimensions,Image,BackHandler} from 'react-native';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import Vendor from '../components/Vendor';
import AppBar from '../components/AppBar';
import { Feather } from '@expo/vector-icons';
import {Colors,Styles} from '../Constants';
import Axios from 'axios';
import qs from 'qs';

const PaperVendors = (props) => {
    const address= props.route.params.address;
    const [offset,setOffset] = useState(0);
    const {tag} = props.route.params;
    const {actualUser}=props.route.params;
    const words = {
        paper: 'Newspaper vendors in your locality',

    }

    console.log('add' + address.lat)



    const [vendors,updateVendors] = useState([]);

    const retrieveData= async (t)=>{
        if(t<=0)
            return;
        Axios.get('https://api.dev.we-link.in/user_app.php?action=getVendors&'+qs.stringify({
            vendor_type: 'newspaper',
            lat: address.lat,
            lng: address.lng
        }),).then((response)=>{
            try{
                console.log('LOGGGGSSSS',address.lat);
                updateVendors(response.data.vendor);
            }
            catch(error){
                console.log('milkvendoreasarror',error);
                //retrieveData(t-1);
            }
        },(error)=>{
            console.log('milkvendorerror',error);
            //retrieveData(t-1);
        })
    }

    useEffect(()=>{
        retrieveData(10);
    },[]);
    useFocusEffect(
        React.useCallback(() => {
          const onBackPress = () => {
     //     console.log('Go to homescreen');
           props.navigation.navigate('AddressList');
              return true;
            
          };
    
          BackHandler.addEventListener('hardwareBackPress', onBackPress);
    
          return () =>
            BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        },)
      );
    return(
    <View style={{flex: 1,backgroundColor: 'white'}}>

<AppBar back funct={() => {
        props.navigation.pop();
        }} />

        <View onLayout={({nativeEvent}) => {
                setOffset(nativeEvent.layout.height);
        }} style={{flexDirection: 'row',marginTop: Dimensions.get('window').height/14}}>
        <Image  style ={{...style.avatar}} source={ actualUser.img_url.trim()  != ''? {uri: actualUser.img_url}: require('../../assets/notmaleavatar.png')  }/>
      
       
        <View style={style.header}>
        <Text style ={{...style.username}}>{actualUser.name}</Text>
        <View style ={{...style.address}}>
        <View style = {{flexDirection: 'row',alignItems: 'center'}}>
        <Feather name="map-pin" size={12} color="black" />
        <Text style={{fontSize: 13}}>{ " " +address.addr_name}</Text>
        </View>
       
        <Text style={{fontSize: 13}}>{address.addr_details+".\nLandmark: " + address.addr_landmark }</Text>
        </View>
    </View>
        </View>
        <View style={Styles.grayfullline} />
    
        <View style={style.heading}>
<Text style={{...Styles.title,fontSize: 17}}>{words.paper}</Text>
</View>
    
        <FlatList 
            data={vendors}
            keyExtractor={(item) => item.name}
            renderItem={({item}) => {
                const actualUser=props.route.params.actualUser;
                const vendorName = item.name;
                const vendorStars = item.avg_ratings;
                const vendorReviews = item.reviews_number;
                var brandsString= '';
                const brands= item.brands!=undefined? item.brands: [];
                const imageUrl=item.vendor_img_url;
                const vendorId=item.vendor_id;
                const vendorAddress= item.addresses[0]!= undefined? item.addresses[0].addr_details+' '+item.addresses[0].addr_landmark+' '+item.addresses[0].addr_pincode: ' ';
              //  console.log('itembrands',brands);
                for(let i=0;i<brands.length-1;i++)
                    brandsString=brandsString+brands[i].brand.toString()+','+' ';
                if(brands.length>0)
                    brandsString=brandsString+brands[brands.length-1].brand.toString();
    
                return(
                    <Vendor name={item.name} brands={brandsString} stars={item.avg_ratings} reviews={item.reviews_number} imageUrl={imageUrl}
                    onSelected={() => {
                 
                    props.navigation.navigate('VendorScreen1',{
                        tag: "Paper",
                        name: vendorName,
                        stars: vendorStars,
                        reviews: vendorReviews,
                        address: address,
                        vendorAddress: vendorAddress,
                        imageUrl: imageUrl,
                        actualUser: actualUser,
                        vendorId: vendorId
                    })
                    
                        
                    }}
    
                    />
                )
    
            }}
        />
    
       
    
        </View>)
}

const style = StyleSheet.create({
    header: {
        margin: '5%',
        padding: '3%',
        marginStart: '20%'
        
    },
    username: {
        fontWeight: 'bold',
        marginStart: 50,
        fontSize: 18,
      
        color: 'black'
    },
    address: {
        marginTop: '3%',
        borderRadius: 5,
        backgroundColor: Colors.whiteBackground,
       borderColor: Colors.seperatorGray,
       borderWidth: 0.5,
        marginStart:48,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 13,
        elevation: 1
        
    },
    line:{
        borderWidth: 0.5,
        borderColor: 'gray',
        marginVertical: '2%',
          
        
    },
    heading: {
       
        marginBottom: '5%',
        
    },
    avatar: {
        width: 50,
        height: 50,
        margin: '5%',
        padding: '3%',
        position: 'absolute',
     
        
       
    }

})

export default PaperVendors;
