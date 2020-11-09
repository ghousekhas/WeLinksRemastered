import React, { useState } from 'react';
import { View, StyleSheet, Text, Dimensions, Image } from 'react-native';
import Button from './Button';
import Stars from './Stars';



const Vendor = ({ name, brands, stars, reviews, onSelected, buttonVisible, address, scrap, imageUrl }) => {
    const [imageHeight, setImageHeight] = useState(0);

    const renderButton = () => {
        if (buttonVisible != false) {
            return (
                <View style={style.button}>
                    <Button text='Select' onTouch={onSelected} />
                </View>
            );
        }
    };

    const renderDesc = () => {
        if (scrap != null)
            return (
                <View style={{ flexDirection: 'row', width: '60%', alignSelf: 'center' }}>
                    <Text style={style.brandsTitle}>{scrap}</Text>
                </View>);
        if (buttonVisible != false)
            return (
                <View style={{ flexDirection: 'row' }}>
                    <Text style={style.brandsTitle}>Brands: </Text>
                    <Text style={style.brands}>{brands}</Text>
                </View>
            );


        return (
            <View style={{ flexDirection: 'row', width: '60%', alignSelf: 'center' }}>
                <Text style={style.brands}>{address != undefined && address != null  && address != 0 ? address : null}</Text>
            </View>
        );
    };

    return (
        <View style={style.container}>
            <Image style={{ ...style.image, height: imageHeight, aspectRatio: 1 / 1.7, alignSelf: 'flex-end', borderWidth: 1, flex: 1 }} source={{ uri: imageUrl }} />

            <View style={{ marginStart: '4%', flex: 4 }}>

                <View onLayout={({ nativeEvent }) => {
                    //  console.log('nativeevent',nativeEvent)
                    //   if(nativeEvent.layout.height!=null)
                    setImageHeight(nativeEvent.layout.height);

                }} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{ flexDirection: 'column', flex: 2, paddingLeft: 15, marginTop: 20 }}>
                        <Text style={style.name}> {name}</Text>
                        {renderDesc()}
                        <View style={{ flexDirection: 'row' }}>
                            <Stars number={stars} />
                            <Text style={style.review}>({reviews} reviews)</Text>
                        </View>
                    </View>
                    {renderButton()}
                </View>





            </View>
        </View>)
};

const style = StyleSheet.create({
    container: {
        margin: '0.5%',
        marginBottom: '10%',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        padding: '1%',
        borderWidth: 5,
        borderColor: 'transparent'
        //  paddingVertical: 10

    },
    top: {
        flexDirection: 'column',
        //   width: Dimensions.get('window').width-15,
        marginStart: '1%',
        alignItems: 'flex-end',



    },
    button: {
        flexDirection: 'column',
        width: Dimensions.get('window').width - 20,
        alignSelf: 'center', flex: 1,
        alignSelf: 'center',
        justifyContent: 'center'
    }
    ,

    name: {
        fontWeight: 'bold',

        fontSize: 17,
        //  alignSelf: 'flex-start',
        color: 'black'
    },
    brandsTitle: {
        color: 'gray',

        marginTop: '2%',
        fontWeight: 'bold',

    },

    brands: {
        color: 'gray',
        flex: 1,

        marginTop: '2%',



    },
    review: {
        color: 'gray',
        marginStart: '4%',
        marginTop: '2%',
        fontWeight: 'bold'
    },
    image: {
        width: 70,
        height: 90,
        //  position: 'absolute',
        //  margin :'1%'


    }


});


export default Vendor;