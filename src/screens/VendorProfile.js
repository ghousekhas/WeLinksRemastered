import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { BackHandler, View, StyleSheet, Dimensions, Image, Alert } from 'react-native';
import { dimen, Styles } from '../Constants';
import { Colors } from '../Constants';
import { Text } from 'react-native-paper';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppBar from '../components/AppBar';
import Axios from 'axios';
import auth from '@react-native-firebase/auth';
import DocumentPicker from 'react-native-document-picker';
import qs from 'qs';
import { AntDesign } from '@expo/vector-icons';
import { Config } from '../Constants';



const VendorProfile = ({ navigation, route }) => {
    const [profileDetails, setProfileDetails] = useState(route.params.actualUser);//[{name: 'holder',email: 'holder',subscription_count: 0,wallet_balance: 0,img_url: 0}]);
    const [address, setAddress] = useState([]);
    const [servedAddresses, setServedAddresses] = useState([])
    const [vendorID, setVendorID] = useState(null);
    const {actualUser} = route.params;
    const [VendorProfileDetails, setVPD] = useState({
        company_name: "",
        vendor_img_url: "",
        addresses: [{addr_details: "",addr_landmark:""}],
        newspaper_service: "no",
        homescrap_service: "no",
        officescrap_service: "no",
        milk_service: "no"

        
    })
   // const [actualUser, setActualUser] = useState(route.params.actualUser);
    const [vendorImage, setVendorImage] = useState(' ')
    // const [imageuri,setImageUri] = useState('content://com.android.providers.media.documents/document/image%3A17428');
    const words = {

        rupee: '₹',

    }

    const changeImage = async () => {
        try {
            const res = await DocumentPicker.pick({ type: [DocumentPicker.types.images] });
            var formdata = new FormData();
            if (res.size / 1000 > 50)
                alert('Selected picture must be below 50kb');
            else {
                formdata.append('vendor_img_url', {
                    uri: res.uri,
                    type: 'image/jpeg',
                    name: res.name
                });
                console.log('attempting to upload picture '+profileDetails.user_id + " "+ VendorProfileDetails.vendor_id + " "+ VendorProfileDetails.addresses[0].addr_id);
                Axios.post(Config.api_url+'php?' + qs.stringify({
                    action: 'updateVendor',
                    user_id: profileDetails.user_id,
                    vendor_id : VendorProfileDetails.vendor_id,
                    address_id : VendorProfileDetails.addresses[0].addr_id


                }), formdata).then((response) => {
                    console.log(response.data, "picutre uploaded");
                    //setActualUser({...actualUser,})
                   // setProfileDetails({ ...profileDetails, img_url: res.uri })
                  //  route.params.getUserDetails(0, auth().currentUser);
                    Alert.alert(
                        'Profile updated',
                        'Your company profile picture has been updated successfully'
                    )
                    retrieveData();
                    route.params.drawerRefresh()

                    // setTimout(() => route.params.navdrawer.navigate('ProfileStack', {
                    //     actualUser: actualUser,
                    //     getUserDetails: route.params.getUserDetails

                    // }), 1000);


                }, (error) => {
                    console.log(error);
                    alert('Error uploading your profile picture, please try again later');
                })
            }

        }
        catch (error) {
            console.log(error);
            alert('Please pick a valid jpeg or png image');
        }
    }

    const editVendorFunction = (services,milk,paper,office,home)=>{
        console.log(services);
        console.log(milk);
        console.log(paper);
        console.log(office);
        console.log(home);
        
      
        console.log({
            user_id: actualUser.user_id,
            vendor_type: services,
            milk_product_ids : milk,
            news_product_ids: paper,
            officescrap_cat_ids: office,
            homescrap_product_ids: home


        });
        var dataUnFormatted = qs.stringify({
            user_id: actualUser.user_id,
            vendor_id: VendorProfileDetails.vendor_id,
            update_data: 'services',
            vendor_type: services,
            milk_product_ids: milk,
            news_product_ids: paper,
            officescrap_cat_ids: office,
            homescrap_product_ids: home,
            address_id: VendorProfileDetails.addresses[0].addr_id



        });
        var replaer = new RegExp('%5B.%5D','g');
        var dataFormatted = dataUnFormatted.replace(replaer,'\[\]');
        /*
        var dataFormatted = dataUnFormatted.replaceAll('milk_product_ids%5B0%5D','milk_product_ids\[\]');
        var dataFormatted = dataFormatted.replaceAll('news_product_ids%5B0%5D','news_product_ids\[\]');
        var dataFormatted = dataFormatted.replaceAll('office_cat_ids%5B0%5D','office_cat_ids\[\]');
        var dataFormatted = dataFormatted.replaceAll('homescrap_product_ids%5B0%5D','homescrap_product_ids\[\]');
        var dataFormatted = dataFormatted.replaceAll('vendor_type%5B0%5D','vendor_type\[\]');
        */
        console.log(dataFormatted);
        
       // console.log(dataUnFormatted);
        Axios.post(Config.api_url+'php?action=updateVendor&'+dataFormatted).then((response)=>{
            console.log(response);
            console.log(response.data);
            retrieveData();
           // checkVendorStatus();

        },(error)=>{
            console.log(error);
        })

        
    }

    const retrieveData = ()=>{
      
             


                        Axios.get(Config.api_url + "php?action=getVendor&user_id=" + actualUser.user_id)
                            .then((response) => {
                                try {
                                    setVPD(response.data.vendor)
                                    console.log("id" + response.data.vendor);
                                 //   console.log("vpd " + response.data)

                                    setVendorImage(response.data.vendor.vendor_img_url);
                                    //   setServedAddresses(response.data.vendor.addresses);
                                    // console.log("add" + response.data.vendor.addresses[0].addr_name)
                                      console.log("image " +response.data.vendor.vendor_img_url)

                                    //    this.setState({actualVendor : this.state.vendorDetails.company_name})
                                    //  console.log('Vd' + this.state.actualVendor)
                                }
                                catch (error) {
                                    //  this.setState({validVendor: false})

                                    console.log('the error ' + error);

                                }
                            }, (error) => {
                                console.log('error');

                            });



        console.log('mounted');
        console.log(route.params.actualUser);
        //setActualUser(route.params.actualUser);
        //setProfileDetails(route.params.actualUser);
    }

    useEffect(() => {
        retrieveData();
        navigation.addListener('focus',()=>{
            console.log('fires')
            retrieveData();
        });



        // Axios.get(Config.api_url+'php?action=getUserAddresses&user_id=' + user_id, {
        //     'Accept-Encoding': 'gzip'ret
        // }).then((response) => {


        //     //     console.log("add " + response.data.addresses)
        //     setAddresses(response.data.addresses)
        //     //  console.log("jc" + addresses[1])
        // }).catch((e) => {
        //     console.log('Error with addresses: ' + e);
        // });




    }, [route.params.actualUser])

    useFocusEffect(
        React.useCallback(() => {
            
            const onBackPress = () => {
                //  console.log('Can\'t go back from here');
                route.params.goBackToHome();


                return true;

            };


            BackHandler.addEventListener('hardwareBackPress', onBackPress);
            //setActualUser(route.params.actualUser);

            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
            },[])
            );

    const renderAddresses = () => {

        let addressArray = [];
        for (let i in addresses) {
            // console.log(addresses[i].addr_details)
            addressArray.push(<View>
                <Text style={{ ...style.blackText, fontWeight: '900', color: 'gray', marginTop: '1%' }}>{addresses[i].addr_details}</Text>

            </View>)
        }
        //  console.log(addressArray)

        return addressArray;
    }

    return (<View style={{ ...StyleSheet.absoluteFill }}>
        <View style={{ elevation: 100, zIndex: 100 }}>
            <AppBar title='Vendor Profile'
            funct={() => {
                navigation.toggleDrawer();
            }} />
        </View>



        <View style={Styles.parentContainer}>


            <ScrollView>
                <View style={{ flex: 0, marginBottom: dimen.sHm }}>

                    <View style={style.header}>


                        <View style={style.avatarBG}>
                            {VendorProfileDetails != null ? (
                                <Image   // Change to Image
                                    style={style.avatar}
                                    source={vendorImage != ''  ? { uri: vendorImage } : require('../../assets/notmaleavatar.png')}
                                  //  source={require('../../assets/notmaleavatar.png')}
                                />
                            ) : null}
                            <View style={{ position: 'absolute', bottom: '5%' }}>
                                <TouchableOpacity onPress={() => changeImage()} >
                                    <Icon
                                        name='pencil'
                                        size={20}
                                        elevation={1}
                                        color='white'
                                    />

                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text style={style.name}>{VendorProfileDetails.company_name}</Text>



                        <View style={style.chips}>

                            {/* <TouchableOpacity onPress={() => {
                                route.params.navDrawer.navigate('MySubscriptions', {
                                    user: profileDetails
                                })
                            }
                            }>
                                <Text style={style.chip}>{words.subscriptions + ' (' + actualUser.subscription_count + ')'}</Text>
                            </TouchableOpacity> */}


                            {/* <TouchableOpacity>
                                <Text style={style.chip}>{words.balance + ' (' + actualUser.wallet_balance + ')'}</Text>
                            </TouchableOpacity> */}

                        </View>



                    </View>

                    {/* Basic Details */}


                    <View style={{  borderWidth: 0.3, borderRadius: 10, marginHorizontal: '1%', elevation: 0.3, borderColor: Colors.seperatorGray, flex: 0, marginVertical: dimen.sHm/4, justifyContent: 'flex-start' }}>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('EditVendorDetails', {

                                actualUser: profileDetails,
                                VendorProfileDetails: VendorProfileDetails,
                                refresh: retrieveData

                            })
                        }}>
                            <View style={{ flexDirection: 'row', margin: '5%', flex: 0  }}>

                                <View style={{ marginTop: '1%' }}>
                                    <Icon
                                        name="account-outline"
                                        color='black'

                                        size={30}
                                    />
                                </View>


                                <View style={{ flexDirection: 'column',flex: 1 }}>
                                    <Text style={style.blackText}>Vendor details</Text>
                                    <Text style={{ ...style.blackText, fontWeight: '900', color: 'gray', marginTop: '1%' }}>{VendorProfileDetails.company_name}</Text>
                                    <Text style={{ ...style.blackText, fontWeight: '900', color: 'gray', marginTop: '1%' }}>{VendorProfileDetails.email}</Text>
                                    {/* <Text style={{ ...style.blackText, fontWeight: '900', color: 'gray', marginTop: '1%' }}>{VendorProfileDetails.addresses[0].addr_details + " \nNear "+ VendorProfileDetails.addresses[0].addr_landmark}</Text> */}
                                </View>
                                <View style={{ flex: 0}}>

                                    <Icon
                                        name="chevron-right"
                                        color={Colors.primary}

                                        size={24}
                                    />

                                </View>



                            </View>

                        </TouchableOpacity>

                    </View>


                    {/* Addresses Served */}
                    <View style={{ borderWidth: 0.3, borderRadius: 10, marginHorizontal: '1%', elevation: 0.3, borderColor: Colors.seperatorGray, flex: 0, marginVertical: dimen.sHm/4, justifyContent: 'flex-start'   }}>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('AddressList', {
                             //   myAddresses: true,
                                actualUser: actualUser,
                                actualVendor: {vendor_id: VendorProfileDetails.vendor_id},
                                vendorEdit: true,
                                myAddresses: true,
                                profile: true
                            })
                        }}>
                            <View style={{ flexDirection: 'row', margin: '5%', flex: 0 }}>


                                <View style={{ marginTop: '1%' }}>
                                    <Icon
                                        name="map-marker-outline"
                                        color='black'


                                        size={30}
                                    />
                                </View>


                                <View style={{ flexDirection: 'column', flex: 1 }}>
                                    <Text style={{ ...style.blackText, marginBottom: dimen.height / 70 }}>Addresses Served</Text>
                                    {/* 
                                    {renderAddresses()} */}


                                </View>
                                <View style={{flex: 0 }}>

                                    <Icon
                                        name="chevron-right"
                                        color={Colors.primary}

                                        size={24}
                                    />

                                </View>


                            </View>


                        </TouchableOpacity>

                    </View>
                    {/* Products */}
                    <View style={{  borderWidth: 0.3, borderRadius: 10, marginHorizontal: '1%', elevation: 0.3, borderColor: Colors.seperatorGray, flex: 0, marginVertical: dimen.sHm/4, justifyContent: 'flex-start' }}>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('VendorServices', {
                                back: true,
                                editVendorFunction: editVendorFunction,
                                vendorEdit: true,
                                actualVendor: VendorProfileDetails
                            })

                        }}>
                            <View style={{ flexDirection: 'row', margin: '5%', flex: 0 }}>


                                <View style={{ marginTop: '1%' }}>
                                    <Icon
                                        name="id-card"
                                        color='black'


                                        size={30}
                                    />
                                </View>


                                <View style={{ flexDirection: 'column', flex: 1,backgroundColor: 'white' }}>
                                    <Text style={{ ...style.blackText, marginBottom: dimen.sHm/5 }}>My Services & Products</Text>
                                    {
                                        VendorProfileDetails.newspaper_service === "yes" ?(
                                            <Text style={{...style.grayText,fontSize: 12,margin: 0}}>
                                                Newspaper Delivery
                                               
                                           </Text>
                                        ): null
                                    }
                                    {
                                        VendorProfileDetails.milk_service === "yes" ?(
                                            <Text style={{...style.grayText,fontSize: 12,margin: 0}}>
                                                Milk Delivery
                                               
                                           </Text>
                                        ): null
                                    }
                                    {
                                        VendorProfileDetails.homescrap_service === "yes" ?(
                                            <Text style={{...style.grayText,fontSize: 12,margin: 0}}>
                                                Home Scrap
                                               
                                           </Text>
                                        ): null
                                    }
                                    {
                                        VendorProfileDetails.officescrap_service === "yes" ?(
                                            <Text style={{...style.grayText,fontSize: 12,margin: 0}}>
                                                Office Scrap
                                               
                                           </Text>
                                        ): null
                                    }
                                    




                                </View>
                                <View style={{flex: 0}}>

                                    <Icon
                                        name="chevron-right"
                                        color={Colors.primary}

                                        size={24}
                                    />

                                </View>


                            </View>


                        </TouchableOpacity>

                    </View>




                </View>



                <View style={{ height: dimen.height / 30, width: dimen.width }} />

            </ScrollView>

        </View>
    </View>)
};


const style = StyleSheet.create({
    container: {
        margin: '1%'
    },
    header: {
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',

        height: Dimensions.get('window').height / 3

    },
    avatar: {
        width: '100%',
        height: '100%',
        opacity: 0.9,
        borderRadius: 1000


    },
    avatarBG: {
        height: Dimensions.get('window').width / 3.5,
        aspectRatio: 1 / 1, alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8

    },
    chips: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: Dimensions.get('window').width,
        marginTop: '5%'

    },
    chip: {
        borderWidth: 1,
        borderRadius: 20,
        borderColor: Colors.seperatorGray,
        color: 'white',
        padding: '2%',
        width: Dimensions.get('window').width / 3.2,
        textAlign: 'center',
        fontSize: 10,
        margin: '1%'

    },
    blackText: {

        fontWeight: 'bold',
        fontSize: 14,
        marginStart: dimen.sHm*2,
 
    },
    name: {
        color: 'white',
        fontSize: 15,
        marginVertical: '3%'
    },
    grayText:{
        fontWeight: 'bold',
        fontSize: 14,
        marginStart: dimen.sHm*2,
        color: 'gray'

    }

})

export default VendorProfile;