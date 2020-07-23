
import * as React from 'react';
import {useState} from 'react';
import { View, Text,StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
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
import Cart from './src/screens/Cart'
import MilkVendors from './src/screens/MilkVendors';
import PaperVendors from './src/screens/PaperVendors';
import VendorScreen from './src/screens/VendorScreen';
import SubscribeScreen from './src/screens/SubscribeScreen';
import Vendor from './src/components/Vendor';
import VendorScreen1 from './src/screens/VendorScreen1';
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

const Stack = createStackNavigator();

function App() {
  const [firstlogin,setFirstLog]=useState(0);
  const [user,setUser]=useState(null);
  const [activesections,setActiveSections]=useState([]);



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


  
  if(user==null){
    console.log('this is the prb');
    return (
      <View style={{flex: 1}}>
      <NavigationContainer>
<<<<<<< HEAD
      <Stack.Navigator  initialRouteName= 'Homescreen'>
=======
      <Stack.Navigator  initialRouteName= 'Introduction'>
>>>>>>> 908c6f9df6672acff18d1b2358255f673d0e7f88
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
        <Stack.Screen name='MilkVendors' component={MilkVendors} />
        <Stack.Screen name='PaperVendors' component={PaperVendors} />
        <Stack.Screen name='VendorScreen' component={VendorScreen1} />
        <Stack.Screen name='VendorScreen1' component={VendorScreen1} />


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
    <NavigationContainer>
      <Stack.Navigator >
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
        <Stack.Screen name='MilkVendors' component={MilkVendors} />
        <Stack.Screen name='PaperVendors' component={PaperVendors} />
        <Stack.Screen name='VendorScreen' component={VendorScreen} />
        <Stack.Screen name='VendorScreen1' component={VendorScreen1} />

        <Stack.Screen name='SubscribeScreen' component={SubscribeScreen} />
        <Stack.Screen name='Cart' component={Cart} />
        <Stack.Screen name='FirstAbout' component={About} options={{headerShown: false}}/>
        <Stack.Screen name='FirstCity' component={City} options={{headerShown: false}}/>
        <Stack.Screen name='FirstAddress' component={AddressSearch} options={{headerShown: false}}/>
        
      </Stack.Navigator>
    </NavigationContainer>
    </View>
  );  
}

export default App;

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
