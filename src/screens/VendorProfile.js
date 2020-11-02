import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { BackHandler, View, StyleSheet, Dimensions, Image } from 'react-native';
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
    const [VendorProfileDetails, setVPD] = useState({
        company_name: "",
        vendor_img_url: "",
        addresses: [{addr_details: "",addr_landmark:""}],
        
    })
    const [actualUser, setActualUser] = useState(route.params.actualUser);
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
                    alert('Profile Picture uploaded succesfully');
                    retrieveData();

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
            office_cat_ids: office,
            homescrap_product_ids: home


        });
        var dataUnFormatted = qs.stringify({
            user_id: actualUser.user_id,
            vendor_id: VendorProfileDetails.vendor_id,
            vendor_type: services,
            milk_product_ids: milk,
            news_product_ids: paper,
            office_cat_ids: office,
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
           // checkVendorStatus();

        },(error)=>{
            console.log(error);
        })

        
    }

    const retrieveData = ()=>{
        Axios.get(Config.api_url + 'php?action=getUser&phone=' + actualUser.phone).
            then(({ data }) => {
                if (data.user[0] != undefined) {
                    //  console.log(data.user[0])
                    setProfileDetails(data.user[0]);
                }


                else
                    console.log('User does not exist' + data);

                Axios.get(Config.api_url + 'php?action=getVendorStatus&user_id=' + data.user[0].user_id).
                    then((response) => {
                        console.log("Got vendorID" + response.data.vendor[0].vendor_id)
                        setVendorID(response.data.vendor[0].vendor_id)


                        Axios.get(Config.api_url + "php?action=getVendor&vendor_id=" + vendorID)
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

















                    }, (error) => console.log("VendorID error" + error))

            }, (error) => console.log("Error " + error))


        console.log('mounted');
        console.log(route.params.actualUser);
        setActualUser(route.params.actualUser);
        setProfileDetails(route.params.actualUser);
    }

    useEffect(() => {
        retrieveData();



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
            Axios.get(Config.api_url + 'php?action=getUser&phone=' + actualUser.phone,).
                then(({ data }) => {
                    if (data.user[0] != undefined) {
                        setProfileDetails(data.user[0]);

                        //  route.params.setActualUser(data.user[0]);
                    }
                    else
                        console.log('User does not exitst', data);
                    Axios.get(Config.api_url + 'php?action=getVendorStatus&user_id=' + data.user[0].user_id).
                        then((response) => {
                            console.log("vendorID" + response.data.vendor[0].vendor_id)
                            setVendorID(response.data.vendor[0].vendor_id)

                            Axios.get(Config.api_url + "php?action=getVendor&vendor_id=" + response.data.vendor[0].vendor_id)
                                .then((resp) => {
                                    try {
                                        setVPD(resp.data.vendor)
                                        console.log("id" + VendorProfileDetails.vendor_id);
                                        console.log("vpd " +JSON.stringify(VendorProfileDetails))

                                        setVendorImage(resp.data.vendor.vendor_img_url);
                                        //   setServedAddresses(response.data.vendor.addresses);
                                        // console.log("add" + response.data.vendor.addresses[0].addr_name)
                                        // console.log("image" +vendorImage)

                                        //    this.setState({actualVendor : this.state.vendorDetails.company_name})
                                        //  console.log('Vd' + this.state.actualVendor)
                                    }
                                    catch (error) {
                                        //  this.setState({validVendor: false})

                                        console.log('the errorrr ' + error);

                                    }
                                }, (error) => {
                                    console.log('error' + error);

                                });





                        }), (error) => console.log(error);







                },
                    (error) => console.log('Error logged in profile', error))
            const onBackPress = () => {
                //  console.log('Can\'t go back from here');
                navigation.toggleDrawer();


                return true;

            };


            BackHandler.addEventListener('hardwareBackPress', onBackPress);
            setActualUser(route.params.actualUser);

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
            <AppBar funct={() => {
                navigation.toggleDrawer();
            }} />
        </View>



        <View style={Styles.parentContainer}>


            <ScrollView>
                <View style={{ flex: 0, marginBottom: 50 }}>

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


                    <View style={{ borderWidth: 0.5, borderRadius: 7, margin: '1%', borderColor: Colors.seperatorGray }}>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('EditVendorDetails', {

                                actualUser: profileDetails,
                                VendorProfileDetails: VendorProfileDetails,
                                refresh: retrieveData

                            })
                        }}>
                            <View style={{ flexDirection: 'row', margin: '5%', marginTop: '7%' }}>

                                <View style={{ marginTop: '1%' }}>
                                    <Icon
                                        name="account-outline"
                                        color='black'

                                        size={30}
                                    />
                                </View>


                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={style.blackText}>Vendor details</Text>
                                    <Text style={{ ...style.blackText, fontWeight: '900', color: 'gray', marginTop: '1%' }}>{VendorProfileDetails.company_name}</Text>
                                    <Text style={{ ...style.blackText, fontWeight: '900', color: 'gray', marginTop: '1%' }}>{VendorProfileDetails.email}</Text>
                                    {/* <Text style={{ ...style.blackText, fontWeight: '900', color: 'gray', marginTop: '1%' }}>{VendorProfileDetails.addresses[0].addr_details + " \nNear "+ VendorProfileDetails.addresses[0].addr_landmark}</Text> */}
                                </View>
                                <View style={{ position: 'absolute', right: 8 }}>

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
                    <View style={{ borderWidth: 0.3, borderRadius: 10, marginHorizontal: '1%', elevation: 0.3, borderColor: Colors.seperatorGray, flex: 0, marginVertical: '5%', justifyContent: 'flex-start' }}>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('AddressList', {
                             //   myAddresses: true,
                                actualUser: actualUser,
                                actualVendor: {vendor_id: VendorProfileDetails.vendor_id},
                                vendorEdit: true,
                                myAddresses: true
                             //   profileEdit: true,,
                             //   profile: true
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
                                <View style={{ position: 'absolute', right: 8 }}>

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
                    <View style={{ borderWidth: 0.3, borderRadius: 10, marginHorizontal: '1%', elevation: 0.3, borderColor: Colors.seperatorGray, flex: 0, marginVertical: '5%', justifyContent: 'flex-start' }}>
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


                                <View style={{ flexDirection: 'column', flex: 1 }}>
                                    <Text style={{ ...style.blackText, marginBottom: dimen.height / 70 }}>My Services & Products</Text>




                                </View>
                                <View style={{ position: 'absolute', right: 8 }}>

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

        height: Dimensions.get('window').height / 2

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
        margin: '1%',
        fontWeight: 'bold',
        fontSize: 14,
        marginStart: '15%',
        marginTop: '1%'
    },
    name: {
        color: 'white',
        fontSize: 15,
        marginVertical: '3%'
    }

})

export default VendorProfile;