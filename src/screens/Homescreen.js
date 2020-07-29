import React, {useEffect} from 'react';
import {StyleSheet,Text,View,TextInput, Dimensions,Image,StatusBar} from 'react-native';

import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import {CommonActions,useNavigation} from '@react-navigation/native';

import {Constants,Styles} from '../Constants';
import Axios from 'axios';
import { BackHandler } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import About from './About';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { EvilIcons } from '@expo/vector-icons';





export default class Homescreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
        
            firstLogin: false,
            
            username: 'Anom',
            city: 'city',
            title: 'What are you looking for?',
            desc: 'Select services and checkout easily',
            milk: 'Milk Delivery',
            news: 'NewsPaper Delivery',
            scrap: 'Scrap Collection',
            corporate: 'Corporate Scrap Collection',
            address: 'Tap here to add an address'
        };
        this.images={
            milk: require('./../../assets/milk.png'),
            news: require('./../../assets/newspaper.png'),
            scrap: require('./../../assets/scrap.png'),
            banner: require('./../../assets/homebanner.png'),
        }

    }

    checkIfFirstLogin= async ()=>{
        console.log('someeeeeething');
        const jsondata=  await AsyncStorage.getItem('firstLogin');
        const firstLogin= await JSON.parse(jsondata);
        if(firstLogin == null){
            console.log('meh',firstLogin);
            navigation.navigate('About')
          this.props.navigation.navigate('About',{firstLogin: true});
          this.setState({firstLogin: true})
        }
        else{
            this.setState({firstLogin: false})
        }
        
      }
      retreiveInitData= async()=>{
          const {navigation} =this.props;
          try{
            const selectedAddress= await JSON.parse(await AsyncStorage.getItem(Constants.selectedAddress));
            const userName= await JSON.parse(await AsyncStorage.getItem(Constants.username));
            const city= await JSON.parse(await AsyncStorage.getItem(Constants.city));
            console.log('cc',selectedAddress);
            if(userName == null )
                navigation.navigate('About');
            else if(city== null)
                navigation.navigate('City');
            else if(selectedAddress == null)
                navigation.navigate('AddressSearch');
            this.setState({address: selectedAddress.text,lat: selectedAddress.lat,lng: selectedAddress.lng,username: userName});
          }
          catch(error){
              console.log(error);
          }
      }

    
    

    componentDidMount(){
        const {navigation}= this.props;
        this.checkIfFirstLogin();
        this.retreiveInitData();
        this.focusListener= navigation.addListener('focus',()=>{
            console.log('fjknkf');
            this.checkIfFirstLogin();
            this.retreiveInitData();
       });
        //BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        /*Axios.post('https://5f1552a54693a6001627551c.mockapi.io/ahyeah')
        .then((response)=>{
            console.log(response.data);
        });
        this.props.navigation.po*/
    }
    
    
    render(){
        const {navigation} =this.props;
    
        
        return(
            <View style={styles.fullscreen}>
                <View style={styles.topbar}>
                <TouchableOpacity onPress={() => {
                    navigation.toggleDrawer();
                }}>
                <EvilIcons name="navicon" size={24} color="black" />
                </TouchableOpacity>
                    <TouchableOpacity style={styles.usernamecontainer} onPress={()=>{this.props.navigation.navigate('About')}}>
                        <Image style={styles.userimage} source={require('../../assets/avatar.png')}/>
                        <View style={styles.usernandd}>
                            <Text style={styles.username}>{this.state.username}</Text>
                            <Text style={styles.userdes}>{this.state.userdes}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity  style={styles.usernamecontainer} onPress={()=>{this.props.navigation.navigate('City')}}>
                        <Image style={styles.locim} source={require('../../assets/pin.png')}/>
                        <Text style={styles.city}>{this.state.city}</Text>
                    </TouchableOpacity>
                </View>
                <Image style={styles.banner} source={this.images.banner}/>
                <Text style={styles.title}>{this.state.title}</Text>
                <Text style={styles.desc}>{this.state.desc}</Text>
              
                <View style={styles.horizontalview}>
                <ScrollView style={{flex: 1}}>
                <View style={styles.view1}>

               

                    <TouchableOpacity style={styles.menuitem} onPress={()=>{
                        this.props.navigation.navigate('AddressList',{
                            next: 'MilkVendors'
                        });
                    }
                        //this.props.navigation.navigate('MilkVendors')}
                }>
                        <Image style={styles.menuimage} source={this.images.milk} />
                        <Text style={styles.menutext}>{this.state.milk}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuitem} 
                    onPress={()=>{this.props.navigation.navigate('AddressList',{
                        next: 'PaperVendors'
                    });}}>
                        <Image style={styles.menuimage} source={this.images.news}/>
                        <Text style={styles.menutext}>{this.state.news}</Text>
                    </TouchableOpacity>
                    </View>

                    <View style={styles.view1}>
                    <TouchableOpacity style={styles.menuitem} 
                    onPress={()=>{
                        // this.props.navigation.navigate('VendorsList',{
                        //     department: 'scrap'
                        // })
                    }}>
                        <Image style={styles.menuimage} source={this.images.scrap} />
                        <Text style={styles.menutext}>{this.state.scrap}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuitem} 
                    onPress={()=>{
                        this.props.navigation.navigate('AddressList',{
                            next: 'ScrapVendors'
                        });
                        // this.props.navigation.navigate('VendorsList',{
                        //     department: 'scrap'
                        // })
                    }}>
                        <Image style={styles.menuimage} source={this.images.scrap} />
                        <Text style={styles.menutext}>{this.state.scrap}</Text>
                    </TouchableOpacity>
                    </View>
              
                </ScrollView>
                </View>
                <View style={styles.deliveringcontainer}>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate('AddressSearch');
                }} >
                    <Text style={styles.deliveringTitle}>Delivering to:</Text>
                    <Text style={styles.address}>{this.state.address}</Text>
                </TouchableOpacity>
                </View>
            </View>

        );
    }
}



const styles= StyleSheet.create({
    deliveringcontainer:{
        height: '0%',
        width: '100%',
        position: 'absolute',
        justifyContent: 'flex-start',
        backgroundColor: '#FFFFFF',
        bottom: 0,
        zIndex: 100,
        elevation: 100,

    },
    deliveringTitle:{
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        fontSize: 12,
        fontWeight: '500',
        color: 'black'
    },
    address:{
        fontWeight: '700',
        marginLeft: 10,
        marginBottom: 3,
        marginRight: 3,
        fontSize: 15,


    },
    fullscreen:{
        
        flexDirection: 'column',
        justifyContent: 'flex-start',
        flex: 1,
        backgroundColor: 'white'
    },
    topbar:{
        justifyContent: 'space-between',
        height: '8%',
        width: '100%',
        padding: 20,
        marginBottom: '7%',
        alignContent: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
                width: 0,
                height: 4,
            },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,

            elevation: 6,
    },
    usernamecontainer:{
        alignSelf: 'center',
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignContent: 'center' ,
        
    },
    username:{
        fontWeight: 'bold',
        fontSize: 15,
    },
    userdes:{
        fontSize: 11,
        alignSelf: 'center'

    },
    userimage:{
        height: 19,
        width: 19,
        marginRight: 10
    },
    locim:{
        height: 20,
        width: 20,
        alignSelf: 'center',
        marginRight: 10
    },
    city:{
        fontWeight: '600',
        fontSize: 13,
        color: 'black'
    },
    banner:{
        width: Dimensions.get('window').width-30,
        height: Dimensions.get('window').height/3.5,
        alignSelf: 'center',
        borderRadius: 12
    },
    title:{
        fontSize: 17,
        fontWeight: 'bold',
        marginLeft: 20,
        marginTop: 30,
        alignSelf: 'flex-start',
        color: 'black'
        
    },
    desc:{
        fontSize: 14,
        color: 'gray',
        marginTop: 3,
        marginLeft: 20,
        alignSelf: 'flex-start',
    },
    horizontalview:{
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        flex: 1,
    }, 
    view1 : {
        
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            flex: 1,
        

    },
    menuitem:{
        height: Dimensions.get('window').width/3,
        width: Dimensions.get('window').width/3-25,
        margin: 10,
        flexDirection: 'column',
        shadowColor: "#000",
        shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 3,
        
        
        backgroundColor: 'rgba(255,255,255,255)',
        padding: 10,
        borderRadius: 5

    },
    menuimage:{
        height: '70%',
        width: '70%',
        alignSelf: 'center'
    },
    menutext:{
        fontWeight: 'bold',
        fontSize: 12,
        textAlign: 'center'
    }
});