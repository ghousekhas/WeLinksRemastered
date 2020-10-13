
import React, { useState,useEffect } from 'react';
import {View, StyleSheet, Text, Dimensions,Image,BackHandler} from 'react-native';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import Vendor from '../components/Vendor';
import { useFocusEffect } from '@react-navigation/native';
import AppBar from '../components/AppBar';
import { Avatar } from 'react-native-paper';
import { Styles,Colors, dimen } from '../Constants';
import { Feather } from '@expo/vector-icons';
import Axios from 'axios';
import qs from 'qs';

var vendors;
const ScrapVendors = ({navigation,route}) => {
    const address= route.params.address;
    const {actualUser}=route.params;
    const [vendorExtraData,updateVendor]=useState(1);
    const {tag} = route.params;
    const [nameY,setNameY] = useState(0);

    console.log(address);
    console.log('milky',actualUser)

    const words = {
        milk: 'Scrap vendors in your locality',

    }

    const retrieveData= async (t)=>{
        if(t<0)
            return;
        console.log('retrieving milk vendors');
        Axios.get('https://api.dev.we-link.in/user_app.php?action=getVendors&'+qs.stringify({
            vendor_type: 'homescrap',
            lat: address.lat,
            lng: address.lng
        }),).then((response)=>{
            try{
                console.log('vend ',response.data.vendor);
                vendors= response.data.vendor;
                updateVendor(Math.random(0.5));
                
            }
            catch(error){
                console.log('milkvendoreasarror',error);
                //retrieveData(t-1);
            }
        },(error)=>{
            console.log('milkvendorerror',error);
           // retrieveData(t-1);
        })
    }

    useEffect(()=>{
        retrieveData(10);
    },[]);
  
    useFocusEffect(
        React.useCallback(() => {
          const onBackPress = () => {
          console.log('Go to homescreen');
           navigation.navigate('AddressList');
              return true;
            
          };
    
          BackHandler.addEventListener('hardwareBackPress', onBackPress);
    
          return () =>
            BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        },)
      );

    
    return(<View style={{flex: 1,backgroundColor: 'white'}}>
 
    <AppBar back  funct={() => {
      navigation.pop();
        }} />
            <View style={{flexDirection: 'row',marginTop: Dimensions.get('window').height/14}}>

    <Image  style ={style.avatar} source={require('./../../assets/avatar.png')}/>
  
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

   
    <View style={{...Styles.grayfullline,marginTop: '5%'}} />
   
  

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
            const vendor_id= item.vendor_id;
            var brandsString= '';
            const brands= item.brands != undefined? item.brands: [];
            const imageUrl=item.vendor_img_url;
            const vendorAddress= item.addresses[0] !=undefined ? item.addresses[0].addr_details+' '+item.addresses[0].addr_landmark+' '+item.addresses[0].addr_pincode : ' ';
            console.log('itembrands',brands);
            for(let i=0;i<brands.length-1;i++)
               brandsString= brandsString+brands[i].brand.toString()+','+' ';
            if(brands.length>0)
            brandsString=brandsString+brands[brands.length-1].brand.toString();
            console.log(brandsString);

            return(
                <Vendor name={item.name} scrap={brandsString} stars={item.avg_ratings} reviews={item.reviews_number} imageUrl={imageUrl}
                onSelected={() => {
             
                navigation.navigate('ScrapVendor',{
                    tag: 'scrap',
                    name: vendorName,
                    stars: vendorStars,
                    reviews: vendorReviews,
                    address: address,
                    vendorAddress: vendorAddress,
                    imageUrl: imageUrl,
                    actualUser: actualUser,
                    vendorId: vendor_id
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
        fontSize: 20,
        padding: 10,
        fontWeight: 'bold',
        marginVertical: '5%'
    },
    avatar: {
        width: 50,
        height: 50,
        margin: '5%',
        padding: '3%',
        position: 'absolute'
        
       
    }

})

export default ScrapVendors;
