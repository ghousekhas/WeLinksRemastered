
import React, { useState } from 'react';
import {View, StyleSheet, Text, Dimensions,Image,BackHandler} from 'react-native';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import Vendor from '../components/Vendor';
import { useFocusEffect } from '@react-navigation/native';
import AppBar from '../components/AppBar';
import { Avatar } from 'react-native-paper';
import { Styles,Colors } from '../Constants';
import { Feather } from '@expo/vector-icons';


const ScrapVendors = ({navigation,route}) => {
const {actualUser} = route.params;
const address = route.params.address;

    const words = {
        milk: 'Scrap vendors in your locality',

    }
  
   

    const [vendors,updateVendors] = useState([
        {
            name: 'Vendor 1',
            brands: 'Nandini, Heritage, Akshayakalpa',
            stars: 3,
            reviews: '10' ,
            image: './../../assets.vendor.png'
        },
        {
            name: 'Vendor 2',
            brands: 'Nandini, Heritage, Akshayakalpa',
            stars: 2,
            reviews: '10' ,
            image: './../../assets.vendor.png'
        },
        {
            name: 'Vendor 3',
            brands: 'Nandini, Heritage, Akshayakalpa',
            stars: 5,
            reviews: '10' ,
            image: './../../assets.vendor.png'
        },
        {
            name: 'Vendor 4',
            brands: 'Nandini, Heritage, Akshayakalpa',
            stars: 4,
            reviews: '10' ,
            image: './../../assets.vendor.png'
        },
        {
            name: 'Vendor 5',
            brands: ' Nandini, Heritage, Akshayakalpa',
            stars: 3,
            reviews: '10' ,
            image: './../../assets.vendor.png'
        }


    ]);
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
       
        <Text style={{fontSize: 13}}>{address.addr_details+".\nLanmark: " + address.addr_landmark }</Text>
        </View>
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
            const vendorStars = item.stars;
            const vendorReviews = item.reviews;
            const imageUrl = 'https:\/\/dev.we-link.in\/dist\/img\/users\/user_img_1601972083.jpg';
            
            return(
                <Vendor imageUrl={imageUrl} name={item.name} brands={item.brands} stars={item.stars} reviews={item.reviews} scrap={'Mobiles, Tablets, Paper'}
                onSelected={() => {
             
                navigation.navigate('ScrapVendor',{
                    tag: 'milk',
                    name: vendorName,
                    stars: vendorStars,
                    reviews: vendorReviews
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
