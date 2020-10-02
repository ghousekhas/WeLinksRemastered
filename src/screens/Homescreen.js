import React, {useEffect} from 'react';
import {StyleSheet,Text,View,TextInput, Dimensions,Image,StatusBar,FlatList} from 'react-native';

import { TouchableOpacity, ScrollView  } from 'react-native-gesture-handler';
import {CommonActions,useNavigation} from '@react-navigation/native';

import {Constants,Styles} from '../Constants';
import Axios from 'axios';
import { BackHandler } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import About from './About';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { EvilIcons } from '@expo/vector-icons';



var promoImageData = ['https://phlearn.com/wp-content/uploads/2019/03/fixed-ratio.png','https://phlearn.com/wp-content/uploads/2019/03/fixed-ratio.png',
'https://phlearn.com/wp-content/uploads/2019/03/fixed-ratio.png'];

export default class Homescreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
        
            firstLogin: false,
            
            username: 'William',
            city: 'Bengaluru',
            title: 'What are you looking for?',
            desc: 'Select services and checkout easily',
            milk: 'Milk Delivery',
            news: 'Newspaper Delivery',
            scrap: 'Corporate Scrap',
            corporate: 'Home Scrap',
            address: 'Tap here to add an address',
            actualUser: ''
        };
        this.images={
            milk: require('./../../assets/milk.png'),
            news: require('./../../assets/newspaper.png'),
            scrap: require('./../../assets/scrap.png'),
            banner: require('./../../assets/homebanner.png'),
        }

    }

    checkIfFirstLogin= async ()=>{
      //  console.log('someeeeeething');
        const jsondata=  await AsyncStorage.getItem('firstLogin');
        const firstLogin= await JSON.parse(jsondata);
        if(firstLogin == null){
         //   console.log('meh',firstLogin);
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
              //Load Coupons, username and city
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
     //   BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        /*Axios.post('https://5f1552a54693a6001627551c.mockapi.io/ahyeah')
        .then((response)=>{
            console.log(response.data);
        });
        this.props.navigation.po*/
        const {user}=this.props.route.params;
        console.log('ph',user.phoneNumber.substring(3));
        Axios.get('https://api.dev.we-link.in/user_app.php?action=getUser&phone='+user.phoneNumber.substring(3))
            .then((response)=>{
                console.log(response.data.user[0]);
                this.setState({actualUser: response.data.user[0]});
            },(error)=>{
                console.log('error');
            })


        BackHandler.addEventListener('hardwareBackPress',this.onBackPress);



    }


    onBackPress=()=>{
     //   this.props.navigation.navigate('Homescreen');
     //   return true;
     
    //  this.props.navigation.reset();
    try{
        //this.props.navigation.popToTop();
       BackHandler.exitApp();
       console.log('Exiting');

    }
    catch(e){
    console.log('caught');
    };
       
      }
  
      componentWillUnmount(){
      //  this.props.navigation.popToTop();
        BackHandler.removeEventListener('hardwareBackPress',this.onBackPress);
       // this.props.navigation.popToTop();
      }
  
    
    promoImagesRender = ({item}) =>{
        return(
    
                <Image source={{uri: item.toString()}} style = {styles.imageBanner}/>
     
        );
    }
    
    
    render(){
        const {navigation} =this.props;
        const {user} = this.props.route.params;
       

    
        
        return(
            <View style={styles.fullscreen}>
                <View style={styles.topbar}>
                <View style={{flexDirection: 'row',justifyContent: 'center',paddingVertical: 10, height: '100%'}}>
                    <TouchableOpacity onPress={() => {
                        navigation.toggleDrawer();
                    }}>
                    <EvilIcons name="navicon" size={24} color="black" style={{alignSelf: 'center',padding: 10}} />
                </TouchableOpacity>
                    <TouchableOpacity style={styles.usernamecontainer} onPress={()=>{this.props.navigation.navigate('About')}}>
                        <Image style={styles.userimage} source={require('../../assets/avatar.png')}/>
                        <View style={styles.usernandd}>
                            <Text style={styles.username}>{this.state.username}</Text>
                           {/* <Text style={styles.userdes}>{this.state.userdes}</Text>*/}
                        </View>
                    </TouchableOpacity>
                    </View>
                    <TouchableOpacity  style={styles.usernamecontainer} onPress={()=>{this.props.navigation.navigate('City')}}>
                        <Image style={styles.locim} source={require('../../assets/pin.png')}/>
                        <Text style={styles.city}>{this.state.city}</Text>
                    </TouchableOpacity>
                </View>
               <View style={styles.banner}> 
                   <FlatList 
                        data = {promoImageData}
                        keyExtractor = {(item,index) => index.toString()}
                        renderItem = {this.promoImagesRender}
                        horizontal = {true}
                        snapToAlignment = {'start'}
                        snapToInterval ={styles.imageBanner.width}
                        />
                </View>
                <Text style={styles.title}>{this.state.title}</Text>
                <Text style={styles.desc}>{this.state.desc}</Text>
              
                <View style={styles.horizontalview}>
                <ScrollView style={{flex: 1}}>
                <View style={styles.view1}>

               

                    <TouchableOpacity style={styles.menuitem} onPress={()=>{
                        console.log('actualuser',this.state.actualUser);
                        this.props.navigation.navigate('AddressList',{
                            next: 'MilkVendors',
                            user: user,
                            actualUser: this.state.actualUser
                        });
                    }
                        //this.props.navigation.navigate('MilkVendors')}
                }>
                        <Image style={styles.menuimage} source={this.images.milk} />
                        <Text style={styles.menutext}>{this.state.milk}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuitem} 
                    onPress={()=>{this.props.navigation.navigate('AddressList',{
                        next: 'PaperVendors',
                        user: user,
                        actualUser: this.state.actualUser
                    });}}>
                        <Image style={styles.menuimage} source={this.images.news}/>
                        <Text style={styles.menutext}>{this.state.news}</Text>
                    </TouchableOpacity>
                    </View>

                    <View style={styles.view1}>
                    <TouchableOpacity style={styles.menuitem} 
                    onPress={()=>{
                        this.props.navigation.navigate('Bids',{
                            department: 'corporateScrap'
                        })
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
                            next: 'ScrapVendors',
                            actualUser: this.state.actualUser,
                            user: user
                        });
                        // this.props.navigation.navigate('VendorsList',{
                        //     department: 'scrap'
                        // })
                    }}>
                        <Image style={styles.menuimage} source={this.images.scrap} />
                        <Text style={styles.menutext}>{this.state.corporate}</Text>
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
        alignItems: 'center',
        height: '8%',
        width: '100%',
        marginBottom: '7%',
        alignContent: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
                width: 0,
                height: 2,
            },
        shadowOpacity: 0.37,
        shadowRadius: 6.49,

            elevation: 4,
    },
    usernamecontainer:{
        alignSelf: 'center',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignContent: 'center' ,
        borderRadius: 100,
        borderWidth: 0.525,
        borderColor: 'rgba(211,211,211,255)',
        padding: 10,
        justifyContent: 'center',
        marginLeft: Dimensions.get('window').width*0.005,
        marginRight: Dimensions.get('window').width*0.02,
    },
    usernameactualcontainer:{
        flexDirection: 'row',
        borderWidth: 0.525,
        justifyContent: 'space-between',
        borderColor: 'rgba(211,211,211,255)',
        alignItems: 'center'

    },
    username:{
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        color: 'black'

    },
    userdes:{
        fontSize: 11,
        alignSelf: 'center'

    },
    userimage:{
        height: Dimensions.get('window').height*0.023,
        width: Dimensions.get('window').height*0.023,
        marginRight: 10,
    },
    locim:{
        height: Dimensions.get('window').height*0.022,
        width: Dimensions.get('window').height*0.022,
        alignSelf: 'center',
        marginRight: Dimensions.get('window').width*0.015
    },
    city:{
        fontWeight: '600',
        fontSize: 13,
        color: 'black',
        fontWeight: 'bold'
    },
    banner:{
        width: Dimensions.get('window').width-5,
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
            marginTop: '6%'
        

    },
    menuitem:{
        height: Dimensions.get('window').width/2.95,
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
        fontSize: 11,
        flex: 1,
        textAlign: 'center',
        color: 'black',
    },
    imageBanner:{
        width: Dimensions.get('window').width-100,
        height: '100%',
        marginRight: 15,
        alignSelf: 'flex-start'
    }
});