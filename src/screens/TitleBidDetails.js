import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { Colors, TextSpinnerBoxStyles, dimen, Styles } from '../Constants';
import GenericSeperator from '../components/GenericSeperator';
import AppBar from '../components/AppBar';
import Vendor from '../components/Vendor';
import Button from '../components/Button';
import moment from 'moment';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import SubmitButton from '../components/SubmitButton';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';



export default function TitleBidDetails({ navigation, route }) {
    const cardDetails = route.params;
    const { tag } = route.params;
    const { item, actualUser } = route.params;
    const appliedVendorsList = route.params.appliedVendorsList;
    console.log("VENDOR " + JSON.stringify(appliedVendorsList))

    //console.log("Apply "+cardDetails.appliedVendors[0].company_name)
    // console.log(tag)
    const [title, stitle] = useState("Bid Title");
    const [address, sAddress] = useState('No.17, 23rd Cross 18th A main road, G Block, Sahakarnagar, Bangalore - 560092.')




    const renderHeader = () => {
        //   console.log(cardDetails)
        return (<View style={{ flex: 0 }}>
            <Text style={{ ...Styles.heading, alignSelf: 'center' }}>Bid Details</Text>
            <View style={styles.bidcard}>
                <Text style={styles.title}>{cardDetails.bidTitle}</Text>
                <Text style={styles.info}> {cardDetails.address}</Text>
                <View style={styles.duration}>
                    <Text style={{ ...styles.title, color: 'gray', marginVertical: '3%' }}> {moment().toString()} </Text>
                    <Text style={{ ...Styles.subbold, fontWeight: '700' }}></Text>
                </View>
                <View style={{ ...styles.duration, paddingVertical: 0, justifyContent: 'space-between' }}>
                    <View style={{ ...styles.duration, borderRadius: 10, borderWidth: 1, borderColor: Colors.primary, justifyContent: 'flex-start', alignSelf: 'center' }}>
                        <Feather name="truck" size={24} color="black" style={{ paddingHorizontal: 5, paddingVertical: 2 }} />
                        <Text style={{ ...Styles.subbold, fontWeight: 'bold', paddingLeft: 5, alignSelf: 'center', paddingVertical: 2, paddingRight: 10 }}>{cardDetails.bidItems}</Text>
                    </View>
                    <View style={{ ...styles.duration, borderRadius: 10, borderWidth: 1, borderColor: Colors.seperatorGray, justifyContent: 'flex-start', alignSelf: 'center' }}>
                        <Text style={{ ...Styles.subbold, fontWeight: 'bold', paddingLeft: 5, alignSelf: 'center', paddingVertical: 2, paddingLeft: 10 }}>{cardDetails.bidItemsWeight}</Text>
                        <MaterialCommunityIcons name="weight-kilogram" size={25} color="black" style={{ paddingHorizontal: 5, paddingVertical: 2, alignSelf: 'center' }} />
                    </View>
                    <View style={{ ...styles.duration, borderRadius: 10, borderWidth: 1, borderColor: Colors.primary, justifyContent: 'flex-start', alignSelf: 'center' }}>
                        <AntDesign name="clockcircleo" size={24} color="black" style={{ paddingHorizontal: 5, paddingVertical: 2 }} />
                        <Text style={{ ...Styles.subbold, fontWeight: 'bold', paddingLeft: 5, alignSelf: 'center', paddingVertical: 2, paddingRight: 10 }}>{cardDetails.pickUpTimeSlot}</Text>
                    </View>
                </View>
                <View style={styles.duration}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ alignSelf: 'center', fontWeight: 'bold', marginTop: '4%', paddingVertical: 2 }}>Require: </Text>
                        {cardDetails.manpower == 1 ?
                            <View style={{ ...styles.requirementsButton, backgroundColor: Colors.primary, marginTop: '2%' }}>

                                <Text style={{ ...Styles.subbold, paddingHorizontal: 0.2, paddingVertical: 2, color: 'white' }}>Manpower</Text>
                            </View> : null}
                        {cardDetails.insurance == 1 ?
                            <View style={{ ...styles.requirementsButton, backgroundColor: Colors.primary }}>
                                <Text style={{ ...Styles.subbold, paddingHorizontal: 0.2, paddingVertical: 2, color: 'white' }}>Insurance</Text>
                            </View> : null}

                        {cardDetails.vehicle == 1 ? <View style={{ ...styles.requirementsButton, backgroundColor: Colors.primary }}>
                            <Text style={{ ...Styles.subbold, paddingHorizontal: 0.2, paddingVertical: 2, color: 'white' }}>Vehicle</Text>
                        </View> : null}
                    </View>
                </View>
                <View style={{ flex: 0 }}>
                    <Text style={{ ...styles.title }}>Additional Notes</Text>
                    <Text style={{ ...styles.info }}>{cardDetails.notes}</Text>
                </View>
                <View>
                    <Text style={{ ...styles.title, marginVertical: '3%', color: Colors.blue }}>{cardDetails.status}</Text>
                </View>
            </View>
            {/* <SubmitButton text='Cancel Bid' /> */}
            {tag == 'Open' ?
                <TouchableOpacity style={styles.cancelButton} onPress={() => {
                    // alert('Are you sure you want to cancel this bid?');
                    navigation.navigate('CancellationScreen', {
                        bidTitle: cardDetails.bidTitle,
                        item: item,
                        actualUser: actualUser

                    });
                }}>
                    <Text style={styles.cancelText}>Cancel Bid</Text>
                </TouchableOpacity>
                : <View style={{ marginTop: dimen.height / 50 }} />}
            <Text style={{ ...Styles.heading, alignSelf: 'center', marginTop: dimen.height / 20 }}>Bids Received</Text>

        </View>
        )
    }


    const renderItem = ({ item }) => {
        // const [imageHeight,setImageHeight] = useState(0);
        return (<Text>l</Text>
            //     <View style={styles.container}>
            //     <Image style={{ ...styles.image, aspectRatio: 1 / 1.7, alignSelf: 'flex-end', borderWidth: 1, flex: 1 }} source={{ uri: item.vendor_img_url }} />

            //     <View style={{ marginStart: '4%', flex: 4 }}>

            //         <View onLayout={({ nativeEvent }) => {
            //             //  console.log('nativeevent',nativeEvent)
            //             //   if(nativeEvent.layout.height!=null)
            //         //    setImageHeight(nativeEvent.layout.height);

            //         }} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            //             <View style={{ flexDirection: 'column', flex: 2, paddingLeft: 15, marginTop: 20 }}>
            //                 <Text style={styles.name}> {item.company_name}</Text>
            //                 {renderDesc()}
            //                 <View style={{ flexDirection: 'row' }}>
            //                     {/* <Stars number={stars} />
            //                     <Text style={style.review}>({reviews} reviews)</Text> */}
            //                 </View>
            //             </View>
            //             <View style={styles.button}>
            //             <Button text='Select' onTouch={() => {

            //             }} />
            //         </View>
            //         </View>





            //     </View>
            // </View>
        )
    }

    //  const [vendorsList,setVendorsList] = useState(appliedVendorsList);
    return (<View>
        <AppBar
            back
            funct={() => {
                navigation.pop();
            }} />

        <View style={{ ...Styles.parentContainer, backgroundColor: Colors.whiteBackground }}>

            <FlatList
                ListHeaderComponent={renderHeader}
                data={appliedVendorsList}
                renderItem={({ item }) => {
                    let thisVendor = {
                        name: item.company_name,
                        email: item.company_email_id,
                        amount: item.appln_amount,
                        image: item.vendor_img_url,
                        time: item.appln_timestamp,
                        vendor_id: item.vendor_id,
                        bid_apply_id: item.bid_apply_id,
                        bid_id: item.bid_id


                    };

                    return (<View style={styles.container}>
                        <Image style={{ ...styles.image, aspectRatio: 1 / 1.7, alignSelf: 'flex-end', borderWidth: 1, flex: 1 }} source={{ uri: item.vendor_img_url }} />
                        <View style={{ marginStart: '4%', flex: 4, alignSelf: 'center' }}>
                            <Text style={styles.name}> {item.company_name}</Text>
                            <View style={{ flexDirection: 'row', marginTop: '2%' }}>
                                <FontAwesome5 name="money-bill-wave-alt" size={17} color={Colors.blue} style={{ alignSelf: 'center' }} />
                                <Text style={{ ...styles.name, fontSize: 14 }}> {'Offer : '}</Text>
                                <Text style={{ ...styles.name, fontSize: 14, color: Colors.blue }}> {"₹ " + item.appln_amount}</Text>
                            </View>

                        </View>
                        <View style={{ alignSelf: 'center' }}>
                            <Button text='View' onTouch={() => {
                                navigation.navigate('AwardBid', {
                                    ...thisVendor,
                                    actualUser: actualUser
                                })

                            }} />
                        </View>


                    </View>)
                }}

                ItemSeparatorComponent={() => <GenericSeperator />} />
        </View>
    </View>

    )
}

const styles = StyleSheet.create({
    name: {
        fontWeight: 'bold',

        fontSize: 17,
        //  alignSelf: 'flex-start',
        color: 'black'
    }, image: {
        width: 70,
        height: 90,
        //  position: 'absolute',
        //  margin :'1%'


    },
    button: {
        flexDirection: 'column',
        width: dimen.width - 20,
        alignSelf: 'center', flex: 1,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    bidcard: {
        width: dimen.width - dimen.width / 10,
        // height: dimen.height/3.8,
        borderRadius: 15,
        borderColor: Colors.seperatorGray,
        borderWidth: 0.5,
        padding: '2%',
        marginTop: '5%',
        alignSelf: 'center',
        backgroundColor: 'white',
        elevation: 1
    },
    duration: {
        paddingVertical: 5,
        paddingHorizontal: 3,
        margin: 3,

        borderColor: Colors.primary,
        flexDirection: 'row'
    },
    requirementsButton: {
        paddingVertical: '0.5%',
        paddingHorizontal: 10,
        alignSelf: 'baseline',
        borderRadius: 10,
        marginHorizontal: '1%'
    },
    cancelText: {
        ...Styles.subbold,
        color: 'white',
        textAlign: 'center',
        alignSelf: 'center',
        fontWeight: '700',
        padding: 15
    },
    cancelButton: {
        backgroundColor: Colors.red,
        // height: '100%',
        width: '97%',
        aspectRatio: 10 / 1.4,
        borderRadius: 5,
        alignSelf: 'center',
        marginVertical: '5%'

    },
    title: {
        fontWeight: 'bold',
        color: Colors.primary,
        padding: '1%',
        fontSize: 16,
    },
    info: {
        padding: '1%',
        fontSize: 14,
        marginTop: '3%',
        flex: 1,


    },
    container: {
        margin: '1%',
        marginBottom: '10%',
        flexDirection: 'row',
        marginTop: '10%',
        justifyContent: 'space-between',
        elevation: 1,

        padding: '1%',
        borderWidth: 5,
        borderColor: 'transparent',
        borderRadius: 10,
        borderWidth: 0.5,
        backgroundColor: 'white'
        //  paddingVertical: 10

    },
})