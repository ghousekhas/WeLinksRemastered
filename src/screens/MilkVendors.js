import React, { useState } from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import Vendor from '../components/Vendor';
import { userDetails } from '../UserDetails';


const MilkVendors = (props) => {

    const words = {
        milk: 'Milk Vendors in your locality',

    }
  
   

    const [vendors,updateVendors] = useState([
        {
            name: 'Vendor 1',
            brands: 'Nandini, Heritage, Akshayakalpa',
            stars: 3,
            reviews:  10
        },
        {
            name: 'Vendor 2',
            brands: 'Nandini, Heritage, Akshayakalpa',
            stars: 3,
            reviews:  10
        },
        {
            name: 'Vendor 3',
            brands: 'Nandini, Heritage, Akshayakalpa',
            stars: 5,
            reviews:  10
        },
        {
            name: 'Vendor 4',
            brands: 'Nandini, Heritage, Akshayakalpa',
            stars: 2,
            reviews:  10
        },
        {
            name: 'Vendor 5',
            brands: ' Nandini, Heritage, Akshayakalpa',
            stars: 5,
            reviews:  10
        }


    ]);

    
    return(<View>
    <View style={style.container}>
        <Text style ={style.username}>{userDetails.USER_NAME}</Text>
        <Text style={style.address}>{userDetails.USER_ADDRESS}</Text>
    </View>
    <View style={style.line} />

    <Text style={style.heading}>{words.milk}</Text>

    <FlatList 
        data={vendors}
        keyExtractor={(item) => item.name}
        renderItem={({item}) => {
            const vendorName = item.name;
            const vendorStars = item.stars;
            const vendorReviews = item.reviews
            return(
                <Vendor name={item.name} brands={item.brands} stars={item.stars} reviews={item.reviews}
                onSelected={() => {
             
                props.navigation.navigate('VendorScreen',{
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
    container: {
        margin: 10,
        padding: 10,
        alignItems: 'flex-start',
    },
    username: {
        fontWeight: 'bold',
        marginStart: 50,
        fontSize: 18
    },
    address: {
        marginTop: '3%',
        borderRadius: 5,
        backgroundColor: '#00C99D',
        color: 'white',
        padding: 3,
        marginStart: 50,
        paddingHorizontal: 6,
        
        fontSize: 13,
        
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
    }

})

export default MilkVendors;