import React, { useState } from 'react';
import { View, StyleSheet, Text, Dimensions, Image } from 'react-native';
import { dimen } from '../Constants';
import Button from './Button';
import Stars from './Stars';



const Vendor = ({ name, brands, stars, reviews, onSelected, buttonVisible, address, scrap, imageUrl }) => {
    const [imageHeight, setImageHeight] = useState(0);

    const renderButton = () => {
        if (buttonVisible != false) {
            return (
                <Button text='Select' onTouch={onSelected} />
            );
        }
    };

    const renderDesc = () => {
        if (scrap != null)
            return (
                <View style={{ flexDirection: 'row', paddingRight: 10 }}>
                    <Text style={style.brandsTitle}>Categories: </Text>
                    <Text style={style.brands}>{scrap}</Text>
                </View>);
        if (buttonVisible != false)
            return (
                <View style={{ flexDirection: 'row', paddingRight: 10 }}>
                    <Text style={style.brandsTitle}>Brands: </Text>
                    <Text style={style.brands}>{brands}</Text>
                </View>
            );


        return (
            <View style={{ flexDirection: 'row', width: '100%', alignSelf: 'center' }}>
                <Text style={style.brands}>{address != undefined && address != null && address != 0 ? address : null}</Text>
            </View>
        );
    };

    return (
        <View style={style.container}>
            <Image style={{ ...style.image, height: imageHeight, aspectRatio: 1 / 1.5, alignSelf: 'flex-end', borderWidth: 1, flex: 1 }} source={imageUrl.trim() != '' ? { uri: imageUrl } : require('../../assets/notmaleavatar.png')} />

            <View style={{ marginStart: '4%', flex: 4 }}>

                <View onLayout={({ nativeEvent }) => {
                    //  console.log('nativeevent',nativeEvent)
                    //   if(nativeEvent.layout.height!=null)
                    setImageHeight(nativeEvent.layout.height);

                }} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'column', flex: 2, paddingLeft: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text adjustsFontSizeToFit numberOfLines={1} style={style.name}> {name.trim()}</Text>
                            
                        </View>

                        {renderDesc()}
                        <View style={{ flexDirection: 'row' }}>
                            <Stars number={stars} />
                            <Text style={style.review}>({reviews} reviews)</Text>
                        </View>
                    </View>
                </View>
              




            </View>
            <View style={{ marginTop: '3%' }}>
                                {renderButton()}

                            </View>

        </View>)
};

const style = StyleSheet.create({
    container: {
        margin: '0.5%',
        // marginBottom: '10%',
        flexDirection: 'row',
        padding: '4%',
        //  backgroundColor: 'transparent',
        // borderWidth: 5,
        //  paddingVertical: 10

    },
    top: {
        flexDirection: 'column',
        alignItems: 'flex-end',



    },
    button: {
        flexDirection: 'column',
        width: Dimensions.get('window').width - 20,
        // alignSelf: 'center', 
        flex: 1,
        // alignSelf: 'center',
        //  justifyContent: 'center'
    }
    ,

    name: {
        fontWeight: 'bold',
        marginLeft: -3.5,

        fontSize: 16,
        alignSelf: 'flex-start',
        color: 'black',
        textAlign: 'left',
        marginVertical: '1.5%',
        flex: 1
    },
    brandsTitle: {
        color: 'gray',

        marginVertical: '1.5%',
        fontWeight: 'bold',
        fontSize: 14

    },

    brands: {
        color: 'gray',
        flex: 1,
        fontSize: 14,

        // width: dimen.width,
        //   backgroundColor:'blue',

        marginVertical: '1.5%'




    },
    review: {
        color: 'gray',
        marginStart: '4%',
        marginVertical: '1.5%',
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