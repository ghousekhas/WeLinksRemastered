import React from 'react';
import { View, FlatList } from 'react-native';
import Product from '../components/Product';
import { dimen } from '../Constants';


const ProductsList = ({ navigation, data }) => {
    return (<View style={{ padding: 1 }}>
        <FlatList
            data={data}
            keyExtractor={(item) => item.name}
            style={{ maxHeight: dimen.height * 0.5 }}
            renderItem={({ item }) => {

                return (

                    <Product place="list" name={item.name} quantity={item.quantity} weekendPrice={item.weekend_price} price={item.weekday_price} uri={item.product_image_url}
                        subscribe={() => {

                            const prodName = item.name;
                            const prodQuan = item.quantity;
                            const prodRate = item.price;
                            const productId = item.id


                            navigation.navigate('SubscribeScreen', {
                                tag: 'Milk',
                                pname: prodName,
                                pquan: prodQuan,
                                prate: prodRate,
                                imageUrl: item.product_img_url,
                                vendorId: vendorId,
                                productId: productId,
                                vendorType: 'milk',
                                address: address,

                            })
                        }
                        } />

                )
            }}

        />


    </View>)
};


export default ProductsList;