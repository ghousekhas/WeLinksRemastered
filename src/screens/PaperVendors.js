import React, { useState } from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import Vendor from '../components/Vendor';


const PaperVendors = ({navigation}) => {

    const vendors = [
        {
            name: 'Vendor 1',
            brands: 'The Hindu, Times of India, Prajavani',
            stars: 3,
            reviews:  10
        },
        {
            name: 'Vendor 2',
            brands: 'The Hindu, Times of India, Prajavani',
            stars: 3,
            reviews:  10
        },
        {
            name: 'Vendor 3',
            brands: 'The Hindu, Times of India, Prajavani',
            stars: 3,
            reviews:  10
        },
        {
            name: 'Vendor 4',
            brands: 'The Hindu, Times of India, Prajavani',
            stars: 3,
            reviews:  10
        },
        {
            name: 'Vendor 5',
            brands: ' The Hindu, Times of India, Prajavani',
            stars: 3,
            reviews:  10
        }


    ]
    return(<View>
    <View style={style.container}>
        <Text style ={style.username}>User Name</Text>
        <Text style={style.address}>Kalyan Nagar, Bangalore</Text>
    </View>
    <View style={style.line} />

    <Text style={style.heading}>Newspaper Vendors in your locality</Text>

    <FlatList 
        data={vendors}
        keyExtractor={(item) => item.name}
        renderItem={({item}) => {
            return(
                <Vendor name={item.name} brands={item.brands} stars={item.stars} reviews={item.reviews}
                onSelected={() => {
                    console.log('sel')
                    navigation.navigate('SubscribeScreen')
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
        marginTop: 7,
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
        marginVertical: 5,
          
        
    },
    heading: {
        fontSize: 20,
        padding: 10,
        fontWeight: 'bold',
        marginVertical: 20
    }

})

export default PaperVendors;