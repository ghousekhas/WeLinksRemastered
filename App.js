
import * as React from 'react';
import {useState} from 'react';
import { View, Text,StatusBar,StyleSheet, Dimensions, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator,DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';

import { createStackNavigator } from '@react-navigation/stack';
import * as Notifications from 'expo-notifications';
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
import SubscriptionScreen from './src/screens/SubscriptionScreen';
import CheckOut from './src/screens/CheckOut'
import Cart from './src/screens/Cart';
import ScrapCart from './src/screens/ScrapCart';

import MilkVendors from './src/screens/MilkVendors';
import MilkVendor from './src/screens/MilkVendor';
import PaperVendors from './src/screens/PaperVendors';
import VendorScreen from './src/screens/VendorScreen';
import SubscribeScreen from './src/screens/SubscribeScreen';
import LottieView from 'lottie-react-native';
import AddressList from './src/screens/AddressList';


import Vendor from './src/components/Vendor';
import VendorScreen1 from './src/screens/VendorScreen1';
import WeekPicker from './src/components/WeekPicker';
import ScrapVendors from './src/screens/ScrapVendors';
import ScrapVendor from './src/screens/ScrapVendor';
import Pick, { okay } from './src/screens/Pick';

import test from './src/screens/test';
import DrawerContent from './src/components/DrawerContent';
import AppBar from './src/components/AppBar';
import MyProfile from './src/screens/MyProfile';
import SupportFAQ from './src/screens/SupportFAQ';
import FAQ from './src/screens/FAQ';

navigator.geolocation = require('@react-native-community/geolocation');

/*function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}*/

function School(){
  return <Homescreen/>
}


const Drawer = createDrawerNavigator();

const NavigationDrawer = () => {

  
  return (
    <NavigationContainer independent={true} >
      <Drawer.Navigator initialRouteName='Home'
      drawerContent={props => <DrawerContent {...props}/>}>
   
        <Drawer.Screen name="Home" component={App} />
        <Drawer.Screen name="MyProfile" component={myProfileStack} />
        <Drawer.Screen name="Support" component={userSupportStack} />
       
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
export default NavigationDrawer;



const Stack = createStackNavigator();
const myProfileStack = () => {
  return(
    <View style={{flex: 1}}>
  <NavigationContainer independent = {true}>
  <Stack.Navigator>
  <Stack.Screen name = "profile" component = {MyProfile} options={{headerShown: false}} />

</Stack.Navigator>

  </NavigationContainer>
  </View>)

};

const userSupportStack = () => {
  return(
    <View style={{flex: 1}}>
  <NavigationContainer independent = {true}>
  <Stack.Navigator initialRouteName="SupportFAQ">
  <Stack.Screen name = "SupportFAQ" component = {SupportFAQ} options={{headerShown: false}} />
  <Stack.Screen name = "FAQ" component = {FAQ} options={{headerShown: false}} />

</Stack.Navigator>

  </NavigationContainer>
  </View>)

};

function App() {
  const [firstlogin,setFirstLog]=useState(0);
  const [user,setUser]=useState(auth().currentUser);
  const [activesections,setActiveSections]=useState([]);
  var animations;
  //setUser(auth().currentUser);



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
  
  React.useEffect(()=>{
    setUser(auth().currentUser);
    //checkIfFirstLogin();
    console.log(user);
    
    //console.log('dees be some logs',auth().currentUser);
    const suser= auth().onAuthStateChanged(onAuthStateChanged);

    //return suser;// Don't unsubscribe to this? maybe 
  },[]);
  /*if(true)
    return  <View style={{flex: 1}}>
    <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen  name="Introduction" component={Introduction} 
      options={{
        headerShown: false
      }}/>
      <Stack.Screen name='Login' component={LoginScreen} options={{
        headerShown: false 
      }}/>
      <Stack.Screen name='AddAddress' component={AddAddress} options={{
        headerShown: false
      }}/>
      <Stack.Screen name = "City" component={City}/>
      <Stack.Screen name = "About" component={About}/>
    </Stack.Navigator>
  </NavigationContainer> 
  </View>*/
    //testing purposes above

  //return (<MilkVendor/>)

  //return (<MilkVendor/>);
  /*


  ;*/ //Animatunis here

  /*return <PaperVendors  route={{params: {
    pname: 'pname',
    prate: 5,
    pquan: '10'

  }}}/>*/

  /*const latte=()=>{
    animations.play();
  };

  return( 
    <View style={{position: 'absolute', top: 50,bottom: 50,left:50,right:50,backgroundColor: 'black'}}>
  
        <LottieView 
            hardwareAccelerationAndroid={true}
            renderToHardwareTextureAndroid={true}
            style= {{...StyleSheet.absoluteFill}}
            resizeMode={'contain'}
            ref= {(anim)=> {
              animations= anim

            }}
            onLayout= {latte}
            source= {require('./assets/animations/shapedance.json')}
            loop={true}/>
    </View>
  );*/

  //return <LoginScreen/>
/*

  return <AddAddress route={{params:{
    onComeBack: null,
    initialCamera: {
      center:{
      latitude: 12.69,
      longitude: 69.69,
      },
      pitch: 0,
      heading: 0,
      zoom: 14

    }
  }}}/>*/



  
  if(user==null){
    console.log('this is the prb');
    return (
      <View style={{flex: 1}}>
      <NavigationContainer independent={true}>
      <Stack.Navigator  initialRouteName= 'Homescreen'>
      <Stack.Screen  name="Introduction" component={Introduction} 
        options={{
          headerShown: false
        }}/>
        <Stack.Screen name='Login' component={LoginScreen} options={{
          headerShown: false 
        }}/>
        <Stack.Screen name='AddressSearch' component={AddressSearch}/>
        <Stack.Screen name='AddAddress' component={AddAddress} options={{
          headerShown: false
        }}/>
        <Stack.Screen name = "City" component={City}/>
        <Stack.Screen name = "About" component={About}/>
        <Stack.Screen name='MilkVendors' component={MilkVendors} options={{headerShown: false}}/>
        <Stack.Screen name='PaperVendors' component={PaperVendors} options={{headerShown: false}}/>
        <Stack.Screen name='VendorScreen' component={VendorScreen} options={{headerShown: false}}/>
        <Stack.Screen name='VendorScreen1' component={VendorScreen1}options={{headerShown: false}} />
        <Stack.Screen name='FAQ' component={FAQ} options={{headerShown: false}} />
        

      </Stack.Navigator>
    </NavigationContainer> 
    </View>
    );
    }
  /*  else if(firstlogin == 1){
      console.log('something something');
        return(
          <View style={{flex: 1}}>
          <NavigationContainer>
            <Stack.Navigator>
            <Stack.Screen name = "City" component={City}/>
            <Stack.Screen name = "About" component={About} navigation={Stack}/>
           
            <Stack.Screen name='AddressSearch' component={AddressSearch}/>
            <Stack.Screen name='AddAddress' component={AddAddress} options={{
          headerShown: false
        }}/>
        <Stack.Screen name='Homescreen' component={Homescreen} options={{
          headerShown: false 
        }}/>
        <Stack.Screen name='VendorsList' component={VendorsList} />
        <Stack.Screen name='MilkVendors' component={MilkVendors} />
        <Stack.Screen name='PaperVendors' component={PaperVendors} />
        <Stack.Screen name='VendorScreen' component={VendorScreen} />
        <Stack.Screen name='VendorScreen1' component={VendorScreen1} />
        <Stack.Screen name='SubscribeScreen' component={SubscribeScreen} />
        <Stack.Screen name='Cart' component={Cart} />
            </Stack.Navigator>
          </NavigationContainer>
          </View>
        );
      }*/


  return (
    <View style={{flex: 1}}>
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName='Homescreen'>
        <Stack.Screen name='Homescreen' component={Homescreen} options={{
          headerShown: false 
        }}/>
        <Stack.Screen name='School' component={School} options={{headerShown: false}}/> 
        <Stack.Screen name='AddressSearch' component={AddressSearch}/>
        <Stack.Screen name='AddAddress' component={AddAddress} options={{
          headerShown: false
        }}/>
         <Stack.Screen name = "About" component={About}/>
        <Stack.Screen name = "City" component={City}/>
        <Stack.Screen name='VendorsList' component={VendorsList} />
        <Stack.Screen name='MilkVendors' component={MilkVendors} options={{headerShown: false}}/>
        <Stack.Screen name='PaperVendors' component={PaperVendors} options={{headerShown: false}} />
        <Stack.Screen name='VendorScreen' component={VendorScreen} options={{headerShown: false}}/>
        <Stack.Screen name='VendorScreen1' component={VendorScreen1} options={{headerShown: false}} />
        <Stack.Screen name='AddressList' component={AddressList} options={{headerShown: false}}/>

        <Stack.Screen name='SubscribeScreen' component={SubscribeScreen} options={{headerShown: false}} />
        <Stack.Screen name='Cart' component={Cart} options={{headerShown: false}}/>
        <Stack.Screen name='FirstAbout' component={About} options={{headerShown: false}}/>
        <Stack.Screen name='FirstCity' component={City} options={{headerShown: false}}/>
        <Stack.Screen name='FirstAddress' component={AddressSearch} options={{headerShown: false}}/>
        <Stack.Screen name= 'ScrapVendors' component={ScrapVendors} options={{headerShown: false}}/>
        <Stack.Screen name='ScrapVendor' component={ScrapVendor} options={{headerShown: false}}/>
        <Stack.Screen name='FAQ' component={FAQ} options={{headerShown: false}} />
       

    
        
      </Stack.Navigator>
    </NavigationContainer>
    </View>
  );  
}


/*<Stack.Screen name = "Introduction" component={Introduction}/>
 export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text style={styles.text}> Something's going on in here</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    fontSize: 30,
    textAlign: "center",
    transform: [
      { translateX: -Dimensions.get('window').width*0.24},
      { rotateY: '60deg'},
      { perspective: 850 }
    ],
    color: '#0000FF'
  }
});*/
