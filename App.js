import * as React from 'react';
import {useState} from 'react';
import { View,StyleSheet,Text,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Introduction from './src/screens/Introduction'
import LoginScreen from './src/screens/Login';
import City from './src/screens/City';
import About from './src/screens/About';
import AddAddress from './src/screens/AddAddress';
import Homescreen from './src/screens/Homescreen';
import AddressSearch from './src/screens/AddressSearch';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage'
import VendorsList from './src/screens/VendorsList';
import Cart from './src/screens/Cart';
import MilkVendors from './src/screens/MilkVendors';
import PaperVendors from './src/screens/PaperVendors';
import VendorScreen from './src/screens/VendorScreen';
import SubscribeScreen from './src/screens/SubscribeScreen';
import AddressList from './src/screens/AddressList';
import VendorScreen1 from './src/screens/VendorScreen1';
import ScrapVendors from './src/screens/ScrapVendors';
import ScrapVendor from './src/screens/ScrapVendor';
import DrawerContent from './src/components/DrawerContent';
import MyProfile from './src/screens/MyProfile';
import SupportFAQ from './src/screens/SupportFAQ';
import FAQ from './src/screens/FAQ';
import Test from './src/screens/test';
import VendorRegistration from './src/screens/VendorRegistration';
import BidCreation1 from './src/screens/BidCreation1';
import BidCreation2 from './src/screens/BidCreation2';
import Bids from './src/screens/Bids';
import VendorBids from './src/screens/VendorBids';
import TitleBidDetails from './src/screens/TitleBidDetails';

import PrivacyPolicy from './src/screens/PrivacyPolicy';
import CancellationScreen from './src/screens/CancellationScreen';
import ScrapCart from './src/screens/ScrapCart';
import Axios from 'axios';
import { Styles } from './src/Constants';


navigator.geolocation = require('@react-native-community/geolocation');


// function School(){
//   return <Homescreen/>
// };


const Drawer = createDrawerNavigator();

const NavigationDrawer = ({user,actualUser}) => {
  const [vendor,setVendor] = useState(false);
  const [updateState,setUpdateState]=useState(actualUser!=null? actualUser:{name: 'loading',user_id: -1,email: 'f'});

  React.useEffect(()=>{
    setUpdateState(actualUser!=null? actualUser:{name: 'loading'});
  },[actualUser]);


  

  const switchVendorApp = (flag)=>{
    setVendor(flag);

  }




  if(vendor)
    return(
      <NavigationContainer independent={true} >
        <Drawer.Navigator initialRouteName='Home'
          drawerContent={props => <DrawerContent {...props} actualUser={updateState} switchVendor={switchVendorApp} />}>
        
        <Drawer.Screen name="Home" component={vendorStack} initialParams={{user: user,actualUser: updateState}} />
        <Drawer.Screen name="ProfileStack" component={myProfileStack} initialParams={{user: user,actualUser: updateState}}/>
        <Drawer.Screen name="SupportStack" component={userSupportStack} initialParams={{user: user,actualUser: updateState}}/>
      </Drawer.Navigator>
    </NavigationContainer>
    );

 // return(<BidCreation2 />)
  return (
    <NavigationContainer independent={true}  >
      <Drawer.Navigator initialRouteName='HomeStack' backBehavior='none' 
        drawerContent={props => <DrawerContent {...props} actualUser={updateState} switchVendor={switchVendorApp} />}  >
       
      <Drawer.Screen name="HomeStack" component={PostLoginHome} initialParams={{user: user,actualUser: updateState,sm: 1}} />
      <Drawer.Screen name="ProfileStack" component={myProfileStack} initialParams={{user: user,actualUser: updateState}}/>
      <Drawer.Screen name="SupportStack" component={userSupportStack} initialParams={{user: user,actualUser: updateState}}/>
       
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();

const vendorStack=({navigation})=>{
  return(
    <View style={{flex: 1}}>
  <NavigationContainer independent = {true}>
    <Stack.Navigator initialRouteName="Profile">

    <Stack.Screen name = "Profile" component = {VendorRegistration} options={{headerShown: false}} />
    <Stack.Screen name ="AddAddress" component={AddAddress} options={{headerShown: false}}/>
  </Stack.Navigator>
  </NavigationContainer>
  </View>)
}

const myProfileStack = ({navigation,route}) => {
  const {user,actualUser} = route.params;
  console.log('Starting Profile Stack');
  return(
    <View style={{flex: 1}}>
  <NavigationContainer independent = {true}>
  <Stack.Navigator initialRouteName="Profile">
    <Stack.Screen name = "Profile" component = {MyProfile} options={{headerShown: false}} initialParams={{user: user,actualUser: actualUser}}/>
  </Stack.Navigator>
  </NavigationContainer>
  </View>)

};

const userSupportStack = ({navigation}) => {
  console.log('Starting Support Stack')
   //return(<BidCreation1 />)
  return(
    <View style={{flex: 1}}>
  <NavigationContainer independent = {true}>
  <Stack.Navigator initialRouteName="SupportFAQ">
  <Stack.Screen name = "SupportFAQ" component = {SupportFAQ} options={{headerShown: false}} />
  <Stack.Screen name = "FAQ" component = {FAQ} options={{headerShown: false}} />
  <Stack.Screen name = "PrivacyPolicy" component = {PrivacyPolicy} options={{headerShown: false}} />

  </Stack.Navigator>

  </NavigationContainer>
  </View>)

};


export default function App() {
  const [firstlogin,setFirstLog]=useState(0);
  const [user,setUser]=useState(auth().currentUser);
  const [userDetails,setUserDetails]=useState(null);
  const [networkState,setNetworkState]=useState('available');
  const [splash,setSplash]=useState(true);

  const getUserDetails= async (networkTries,user)=>{
    setSplash(true);
    console.log('getUserDetails');
    if(networkTries>10){
      setNetworkState('unavailable');
      return;
    }
    else{


    Axios.get('https://api.dev.we-link.in/user_app.php?action=getUser&phone='+user.phoneNumber.substring(3))
            .then((response)=>{
              setSplash(false);
              try{
                console.log(response.data.user[0]);
                if(response.data.user != null &&response.data.user!= undefined )
                  if(response.data.user[0].status_code === 100)
                    setUserDetails(100)
                  else
                    setUserDetails(response.data.user[0]);
                else
                  setUserDetails(null);
                setNetworkState('working');

              }
              catch(error){
                console.log(error);
                //getUserDetails(networkTries+1,user)
              }
            },(error)=>{
                console.log('error');
                //getUserDetails(networkTries+1,user);
            });
      }
  };





  onAuthStateChanged= (user) =>{
    setUser(user);
    //console.log(user);

  }

  checkIfFirstLogin= async ()=>{
    const jsondata=  await AsyncStorage.getItem('firstLogin');
    const firstLogin= await JSON.parse(jsondata);
    console.log(firstLogin.firstLogin);
    if(firstLogin == null)
      setFirstLog(1);
    
  }
  const fetchUserDetails = ()=>{
    var i=5;
  }
  
  React.useEffect(()=>{
    console.group('firebaseuser',auth().currentUser)
    setInterval(()=>{
      setSplash(false);
    },2500);
    setUser(auth().currentUser);
    //checkIfFirstLogin();
    console.log(user);
    if(userDetails===null)
      getUserDetails(0,user);
    //setUser('something')
    const suser= auth().onAuthStateChanged(onAuthStateChanged);

   
  },[]);

  if(splash){
    return(<View style={{...StyleSheet.absoluteFill,backgroundColor: 'white',justifyContent: 'center',alignItems: 'center'}}>
        <Image resizeMode={'center'} resizeMethod={'auto'} style={{...StyleSheet.absoluteFill,alignSelf: 'center'}} source={require('./assets/ic_launcher.png')} />
      
    </View>)
  }

  
 
  
  if(user==null){
    return (
      <View style={{flex: 1}}>
        <NavigationContainer independent={true}>
        <Stack.Navigator>
        <Stack.Screen  name="Introduction" component={Introduction} 
          options={{
            headerShown: false
          }} initialParams={{getUserDetailsa: getUserDetails}}/>
          <Stack.Screen name='Login' component={LoginScreen} initialParams={{getUserDetailsa: getUserDetails}} options={{
            headerShown: false 
          }}/>
        </Stack.Navigator>
      </NavigationContainer> 
    </View>
    );
    }
    else if(userDetails === 100 ){
      //getUserDetails(5);
      return (
        <View style={{flex: 1}}>
          <About user={user} getUserDetails={getUserDetails} />
          {/*
          <NavigationContainer independent={true}>
          <Stack.Navigator initialRouteName='About'>
            <Stack.Screen  name="About" component={About} 
              options={{
                headerShown: false
              }}/>
              <Stack.Screen name='City' component={City} options={{
                headerShown: false 
              }}/>
          </Stack.Navigator>
         
        </NavigationContainer> 
         */}
      </View>
      )
    }
    else if(userDetails!= 100 && userDetails !=null){
      return (
        <View style={{flex: 1}}>
          <NavigationDrawer user={user} actualUser={userDetails} />
        </View>
      ); 

    }
   
    return(<View style={{...StyleSheet.absoluteFill,backgroundColor: 'white',justifyContent: 'center',alignItems: 'center'}}>
        <Image resizeMode={'center'} resizeMethod={'auto'} style={{...StyleSheet.absoluteFill,alignSelf: 'center'}} source={require('./assets/ic_launcher.png')} />
      
    </View>)
}

const PostLoginHome =({route,navigation})=>{
  const {user,actualUser,sm}=route.params;
  const [updateState,setUpdateState]=useState(route.params.actualUser);

  
  React.useEffect(()=>{
    setUpdateState(route.params.actualUser);
    console.log(route.params.actualUser,"I will not go through no dum")
  },[route])

  if(updateState != false){
    console.log('got my feet up on the dash ',updateState)
  return(
    <View style={{flex: 1}}>
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName='Homescreen' >
        <Stack.Screen name='Homescreen' component={Homescreen} options={{
          headerShown: false 
        }} initialParams={{user: route.params.user,actualUser: updateState,drawer: navigation}}/>
        {/* <Stack.Screen name='School' component={School} options={{headerShown: false}}/>  */}
        <Stack.Screen name='AddressSearch' component={AddressSearch}/>
        <Stack.Screen name='AddAddress' component={AddAddress} options={{
          headerShown: false
        }}/>
         <Stack.Screen name = "About" component={About} initialParams={{user: user}}/>
        <Stack.Screen name = "City" component={City} initialParams={{user: user}}/>
        <Stack.Screen name='VendorsList' component={VendorsList} initialParams={{user: user}} />
        <Stack.Screen name='MilkVendors' component={MilkVendors} options={{headerShown: false}} initialParams={{user: user}}/>
        <Stack.Screen name='PaperVendors' component={PaperVendors} options={{headerShown: false}} initialParams={{user: user}} />
        <Stack.Screen name='VendorScreen' component={VendorScreen} options={{headerShown: false}} initialParams={{user: user}}/>
        <Stack.Screen name='VendorScreen1' component={VendorScreen1} options={{headerShown: false}} />
        <Stack.Screen name='AddressList' component={AddressList} options={{headerShown: false}}/>

        <Stack.Screen name='SubscribeScreen' component={SubscribeScreen} options={{headerShown: false}} />
        <Stack.Screen name='Cart' component={Cart} options={{headerShown: false}}/>
        <Stack.Screen name='FirstAbout' component={About} options={{headerShown: false}}/>
        <Stack.Screen name='FirstCity' component={City} options={{headerShown: false}}/>
        <Stack.Screen name='FirstAddress' component={AddressSearch} options={{headerShown: false}}/>
        <Stack.Screen name= 'ScrapVendors' component={ScrapVendors} options={{headerShown: false}}/>
        <Stack.Screen name='ScrapVendor' component={ScrapVendor} options={{headerShown: false}}/>
        <Stack.Screen name="Bids" component={Bids} options={{headerShown: false}}/>
        <Stack.Screen name="BidCreation1" component={BidCreation1} options={{headerShown: false}}/>
        <Stack.Screen name="BidCreation2" component={BidCreation2} options={{headerShown: false}}/>
        <Stack.Screen name="TitleBidDetails" component={TitleBidDetails} options={{headerShown: false}}/>
        {/* <Stack.Screen name='ProfileStack' component={MyProfile} options={{headerShown: false}}/> */}


    
        
      </Stack.Navigator>
    </NavigationContainer>
    </View>
  )
  }
}
