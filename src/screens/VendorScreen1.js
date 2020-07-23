import React,{ Fragment, useState, useRef } from 'react';
import { View,Text,TouchableOpacity,StyleSheet,Dimensions ,Image} from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Product from '../components/Product';
import Stars from '../components/Stars';


const VendorScreen1 = ({route,navigation}) => {
    
    

    const [plist,updatepList] = useState([
        {
            name: 'The Hindu',
            quantity: '1 unit',
            price: '5',
            price_: '8'
        },
        {
            name: 'Times of India',
            quantity: '1 unit',
            price: '5',  
            price_: '8'      },
        {
            name: 'Prajavani',
            quantity: '1 unit',
            price: '5', 
            price_: '8'
               }, {
            name: 'The Hindu 1',
            quantity: '1 unit',
            price: '5', 
            price_: '8'       },
        {
            name: 'Times of India 1',
            quantity: '1 unit',
            price: '5',  
            price_: '8'      },
        {
            name: 'Prajavani 1',
            quantity: '1 unit',
            price: '5',    
            price_: '8'    }

    ]);

   

   

    const {name} = route.params;
    const {stars} = route.params;
    const {reviews} = route.params;

   // const order = navigation.getParams('order');
    return(<View style={style.container}>
    <View style={style.header}>
    <View>
        <Text style={style.name}>{JSON.stringify(name).slice(1,-1)}</Text>
        <Text style={style.address}>#101, 1st main, Kalyan Nagar, Bangalore - 560043</Text>

       <View style = {{flexDirection: 'row',marginStart:'29%'}}>
        {/* <Text style={style.brandsTitle}>{JSON.stringify(stars)+' stars'}</Text> */}
        <Stars number={parseInt(JSON.stringify(stars))}/>
            <Text style = {style.review}>({JSON.stringify(reviews)+' reviews'})</Text>
        </View>
        <Text style={{fontSize: 20,fontWeight:'bold',marginTop: 30,marginStart: 3}}>Brands</Text>
        </View>
        <Image  style ={style.image} source={require('./../../assets/vendor.png')}/>
        
    </View>
    <FlatList
        data = {plist}
        keyExtractor = {(item) => item.name}
        renderItem = {({item}) => { 
            return(
                <Product name={item.name} quantity={item.quantity} price={item.price}  price_={item.price_}
                subscribe={() => {
                   
                    const prodName = item.name;
                    const prodQuan = item.quantity;
                    const prodRate = item.price;
                    const prodRate_ = item.price_;

                    navigation.navigate('SubscribeScreen',{
                        tag : 'paper',
                        pname : prodName,
                        pquan : prodQuan,
                        prate: prodRate
                    }) } 
                }/>

            )
        }}

    />
  

    </View>)
};


const style = StyleSheet.create({
    container: {
        
        padding: 1
        
    },
    header: {
        backgroundColor: '#E5F6FE',
        height: Dimensions.get('window').height/3,
        padding:5,
        flexDirection: 'row'
       

    },
    name: {
        marginTop: 0.02 * Dimensions.get('window').height,
        marginStart: '29%',
        fontWeight: 'bold',
        fontSize: 20

    },
    address:{
        marginTop: 0.01 * Dimensions.get('window').height,
        marginStart: '29%',
        fontWeight: 'bold',
        fontSize: 13
    },
    brandsTitle:{
        color: 'gray',
        marginStart: '29%',
        marginTop: '2%',
        fontWeight: 'bold'
    },
    review:{
        color: 'gray',
        marginStart: '5%',
        marginTop: '2%',
        fontWeight: 'bold'
    },
    stars:{
        
        marginStart: '29%',
        marginTop: '2%',
        fontWeight: 'bold'
    },
    image : {
        height: 100,
        width: 100,
        position: 'absolute',
        marginTop: '3%'
    }
});

export default VendorScreen1;