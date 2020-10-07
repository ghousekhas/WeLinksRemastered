import React, {useEffect, useState} from 'react';
import {StyleSheet,Text,View,TextInput, Dimensions,Image,Animated,FlatList} from 'react-native';

import { TouchableOpacity, ScrollView  } from 'react-native-gesture-handler';
import {CommonActions,useNavigation} from '@react-navigation/native';

import {Constants,dimen,Styles} from '../Constants';
import Axios from 'axios';
import { BackHandler } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import About from './About';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { EvilIcons } from '@expo/vector-icons';
import { DEFAULT_APPBAR_HEIGHT } from 'react-native-paper';
import { DrawerActions } from 'react-navigation-drawer';
import { NavigationActions } from 'react-navigation';
import auth from '@react-native-firebase/auth';



var promoImageData = ['https://phlearn.com/wp-content/uploads/2019/03/fixed-ratio.png','https://phlearn.com/wp-content/uploads/2019/03/fixed-ratio.png',
'https://phlearn.com/wp-content/uploads/2019/03/fixed-ratio.png'];

export default class Homescreen extends React.Component{
    constructor(props){
        super(props);
        this.NAME = 'Albus Percival Wulfric Brian Dumbledore'
        this.state={
        
            firstLogin: false,
            username: 'William Darcy',
            city: 'Bengaluru',
            title: 'What are you looking for?',
            desc: 'Select services and checkout easily',
            milk: 'Milk Delivery',
            news: 'Newspaper Delivery',
            scrap: 'Corporate Scrap',
            corporate: 'Home Scrap',
            address: 'Tap here to add an address',
            actualUser: this.props.route.params.actualUser,
            pressedMenu: false,
            drawer: this.props.route.params.drawer,
            imageHeight : 0
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
    

    
     retrieveUserData= async ()=>{
        const user= auth().currentUser;
        
        Axios.get('https://api.dev.we-link.in/user_app.php?action=getUser&phone='+user.phoneNumber.substring(3))
            .then((response)=>{
              try{
                console.log(response.data.user[0]);
                this.setState({actualUser: response.data.user[0]})

              }
              catch(error){
                console.log('theerror',error);
                
              }
            },(error)=>{
                console.log('error');
             
            });
      }


    componentDidMount(){
        const {navigation}= this.props;
        //this.checkIfFirstLogin();
        //this.retrieveUserData(10);
        //this.setState({actualUser: this.props.actualUser});
        this.focusListener= navigation.addListener('focus',()=>{
            //this.checkIfFirstLogin();
            //this.retrieveUserData(10);
       });

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

        let displayName = this.state.actualUser.name.split(' ');
       

    
        
        return(
            <View style={styles.fullscreen}>
               <View style={styles.topbar}>
              
               <TouchableOpacity onPress={() => {
                   this.setState({pressedMenu: true});
                  navigation.toggleDrawer();
                  }}>
    <EvilIcons name="navicon" size={24} color="black" style={{alignSelf: 'center',padding: 10}} />
    </TouchableOpacity>
    <View style={styles.topBarAlignChips}>
    <ProfileSmallView actualUser={this.state.actualUser} drawer={this.state.drawer}/>
    <TouchableOpacity  style={{...styles.usernamecontainer1}} onPress={()=>{this.props.navigation.navigate('City',{
        edit: true,
        refreshUser: this.retrieveUserData,
        user_id: this.state.actualUser.user_id
    })}}>
        <Image style={styles.locim} source={require('../../assets/pin.png')}/>
        <Text adjustsFontSizeToFit style={styles.username}>{this.state.actualUser.city}</Text>
    </TouchableOpacity>
    </View>
              
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

               

                    <TouchableOpacity onLayout={(event) => {
                                this.setState({imageHeight : event.nativeEvent.layout.height/2})
                    }} style={styles.menuitem} onPress={()=>{
                        console.log('actualuser',this.state.actualUser);
                        this.props.navigation.navigate('AddressList',{
                            next: 'MilkVendors',
                            user: user,
                            actualUser: this.state.actualUser
                        });
                    }
                        //this.props.navigation.navigate('MilkVendors')}
                }>
                        <Image style={{...styles.menuimage,height: this.state.imageHeight}} source={this.images.milk} />
                        <Text style={{...styles.menutext,marginTop: this.state.imageHeight*2/20}}>{this.state.milk}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuitem} 
                    onPress={()=>{this.props.navigation.navigate('AddressList',{
                        next: 'PaperVendors',
                        user: user,
                        actualUser: this.state.actualUser
                    });}}>
                        <Image style={{...styles.menuimage,height: this.state.imageHeight}} source={this.images.news}/>
                        <Text style={{...styles.menutext,marginTop: this.state.imageHeight*2/20}}>{this.state.news}</Text>
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
                        <Image style={{...styles.menuimage,height: this.state.imageHeight}} source={this.images.scrap} />
                        <Text style={{...styles.menutext,marginTop: this.state.imageHeight*2/20}}>{this.state.scrap}</Text>
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
                        <Image style={{...styles.menuimage,height: this.state.imageHeight}} source={this.images.scrap} />
                        <Text style={{...styles.menutext,marginTop: this.state.imageHeight*2/20}}>{this.state.corporate}</Text>
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

const ProfileSmallView = ({actualUser,drawer})=>{
    const navigation=useNavigation();
    const [displayName,setDisplayName]= useState('loading');
    useEffect(()=>{
       //s
        if(actualUser.name!=null && actualUser.name != '')
            setDisplayName(actualUser.name.split(' ')[0]);
    },[actualUser]);
    return (
        <TouchableOpacity style = {styles.usernamecontainer1} onPress={()=>{drawer.navigate('ProfileStack')}}>
        <Image style={styles.userimage} source={require('../../assets/avatar.png')}/>
        <Text adjustsFontSizeToFit style={styles.username}>{displayName}</Text>
    </TouchableOpacity>
    )
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
       flexDirection: 'row',
     alignItems: 'center',
        height: '7%',
        width: '100%',
        marginBottom: '5%',
        alignContent: 'center',
        backgroundColor: '#f9f9f9',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
                width: 0,
                height: 2,
            },
        shadowOpacity: 0.37,
        shadowRadius: 6.49,
        elevation: 3,
       
    },

    usernamecontainer:{
        alignSelf: 'center',
        width: dimen.width/3,
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

    usernamecontainer1 : {
        flexDirection: 'row',
        borderRadius: 100,
        borderWidth: 0.525,
        borderColor: 'rgba(211,211,211,255)',
        padding: '3%',
        paddingVertical: '0.5%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    
        height: '70%',
        
        
       
        
     

    },
    username:{
        fontWeight: 'bold',
        fontSize: 14,
      
        alignSelf: 'center',
        color: 'black',
        paddingVertical: '1%',
        paddingHorizontal: "2%"

    },
    topBarAlignChips: {
      
        flexDirection:'row',
        width: dimen.width-50,
        alignSelf:'center',
       justifyContent: "space-between",
       height: '100%',
       alignItems: 'center'
    },
 
    
    userdes:{
        fontSize: 11,
        alignSelf: 'center'

    },
    userimage:{
        height: Dimensions.get('window').height*0.023,
        width: Dimensions.get('window').height*0.023,
       
    },
    locim:{
        height: Dimensions.get('window').height*0.018,
        width: Dimensions.get('window').height*0.018,
       
     
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