import * as React from 'react';
import { useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Introduction from './src/screens/Introduction'
import LoginScreen from './src/screens/Login';
import City from './src/screens/City';
import About from './src/screens/About';
import AddAddress from './src/screens/AddAddress';
import Homescreen from './src/screens/Homescreen';
import AddressSearch from './src/screens/AddressSearch';
import auth, { firebase } from '@react-native-firebase/auth';
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
import EditVendorDetails from './src/screens/EditVendorDetails';
import VendorProfile from './src/screens/VendorProfile';
import ScrapCart from './src/screens/ScrapCart';
import Axios from 'axios';
import { Constants, Styles } from './src/Constants';
import LottieView from 'lottie-react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import TermsAndConditions from './src/screens/TermsAndConditions';
import MySubscriptions from './src/screens/MySubscriptions';
import MyScrapSales from './src/screens/MyScrapSales';
import MySubscriptionOrder from './src/components/MySubscriptionOrder';
import SubscriptionScreen from './src/screens/SubscriptionScreen';
import VendorServices from './src/screens/VendorServices';
import VendorDashboard from './src/screens/VendorDashboard';
import VendorSubscriptions from './src/screens/VendorSubscriptions';
import VendorSubscriptionDetails from './src/screens/VendorSubscriptionDetails';
import AddressesServedList from './src/screens/AddressesServedList';
import {Config} from  './src/Constants';
import VendorViewBids from './src/screens/VendorViewBids';
import VendorBidDetails from './src/screens/VendorBidDetails';
import ChooseAddress from './src/screens/ChooseAddress';
import AwardBid from './src/screens/AwardBid';
import CorporateMarkPickupScreen from './src/screens/CorporateMarkPickupScreen';
import functions from '@react-native-firebase/functions';
import ScrapPickedConfirmation from './src/screens/ScrapPickedConfirmation';
import VendorScrapOrders from './src/screens/VendorScrapOrders';
import VendorScrapOrder from './src/screens/VendorScrapOrder';
import MyScrapSaleOrder from './src/screens/MyScrapSaleOrder';
import messaging from '@react-native-firebase/messaging';
import RatingComponent from './src/components/RatingsComponent';
import RatingComponentScreen from './src/components/RatingComponentScreen';

navigator.geolocation = require('@react-native-community/geolocation');


const Drawer = createDrawerNavigator();

const NavigationDrawer = ({ user, actualUser,getUserDetails, getVendorDetails,setUser }) => {
  const [vendor, setVendor] = useState(false);
  const [updateState, setUpdateState] = useState(actualUser != null ? actualUser : { name: 'loading', user_id: -1, email: 'f' });
  const [privacyData, setPrivacyData] = useState(null);
  const [termsData, setTermsData] = useState(null);
  const [contactUsData, setContactUsData] = useState(null);
  const [dashboard,goTodashboard] = useState(true);
  const [theActualUser,setTheActualUser] = useState(actualUser);
  var ref;

  const updateChildScreens = async () => {
    const privacyUrl = Config.api_url+'php?action=getPrivacyPolicy';
    const termsUrl = Config.api_url+'php?action=getTerms';
    const contactUsUrl = Config.api_url+'php?action=getContactUs&city_id=';

    Axios.get(privacyUrl)
      .then(({ data }) => setPrivacyData(data));
    Axios.get(termsUrl,)
      .then(({ data }) => setTermsData(data));
    if (user != null && actualUser.user_id != undefined) {
      Axios.get(contactUsUrl + actualUser.city_id,)
        .then(({ data }) => setContactUsData(data));
    }

  }


 
  React.useEffect(() => {
    setUpdateState(actualUser != null ? actualUser : { name: 'loading' });
    updateChildScreens();
  }, [actualUser]);


  // Notification test
  React.useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:'
     //   remoteMessage.notification,
      );
      navigation.navigate(remoteMessage.data.type);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:'
         //   remoteMessage.notification,
          );
    //      setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }else{
          console.log('Cant catch')
        }
     ///   setLoading(false);
      });
  }, []);



  const switchVendorApp = (flag) => {
    setVendor(flag);

  }
  // return(<VendorScrapOrders route={{params : null}}/>)


  //DEBUG
  // return(
  //   <VendorScrapOrder />
  // )

  // return( <VendorScrapOrders route={{params: {
  //   bidTitle: "Was your order picked up for xxxx amount"
  // }}} />)
 
  // return <ScrapPickedConfirmation route={{params: {
  //   bidTitle: "Was your order picked up for xxxx amount"
  // }}} />



  if(vendor){

    //checkVendorStatus();
   console.log('Switching to vendor')
   console.log(dashboard)
    var initialParams= {user: user, actualUser: theActualUser}
   // return(<VendorViewBids />)

    
    return (
    
      <NavigationContainer independent={true}>
        <Drawer.Navigator initialRouteName="VendorHomeStack"
          drawerContent={props => <DrawerContent {...props} getUserDetails={getUserDetails} getVendorDetails={getVendorDetails} setUser={setUser} actualUser={updateState} switchVendor={switchVendorApp} cachedData={{
            termsData: termsData,
            contactUsData: contactUsData,
            privacyData: privacyData
          }} />}>
           <Drawer.Screen name="VendorHomeStack" component={VendorHomeStack} initialParams={initialParams}/>
          <Drawer.Screen name="VendorProfileStack" component={VendorProfileStack} initialParams={{ user: user, actualUser: updateState }} /> 
          <Drawer.Screen name="VendorSubscriptions" component={VendorSubscriptions} options={{headerShown : false}} /> 
          <Drawer.Screen name="VendorSubscriptionDetails" component={VendorSubscriptionDetails} options={{headerShown : false}} /> 
          <Drawer.Screen name="VendorSupportStack" component={userSupportStack} initialParams={{
            user: user, actualUser: updateState, cachedData: {
              termsData: termsData,
              contactUsData: contactUsData,
              privacyData: privacyData
            }
          }} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
    }

  return (

    <NavigationContainer independent={true}  >
      <Drawer.Navigator initialRouteName='HomeStack' backBehavior='none'
        drawerContent={props => <DrawerContent {...props} getUserDetails={getUserDetails} setUser={setUser} actualUser={updateState} switchVendor={switchVendorApp} cachedData={{
          termsData: termsData,
          contactUsData: contactUsData,
          privacyData: privacyData
        }} />} >

        <Drawer.Screen name="HomeStack" component={PostLoginHome} initialParams={{ user: user, actualUser: updateState, sm: 1, getUserDetails: getUserDetails }} />
        <Drawer.Screen name="ProfileStack" component={myProfileStack} initialParams={{actualUser: actualUser,user: user }} options={{ headerShown: false }} />
        <Drawer.Screen name="MyAddresses" component={myAddressStack} initialParams={{actualUser: updateState}} />
        <Drawer.Screen name="MySubscriptions" component={MySubscriptions} initialParams={{actualUser: actualUser}} />
        <Drawer.Screen name="MyScrapSales" component={MyScrapStack} initialParams={{user: actualUser}}/>
        <Drawer.Screen name="SupportStack" component={userSupportStack} initialParams={{
          user: user, actualUser: updateState, cachedData: {
            termsData: termsData,
            contactUsData: contactUsData,
            privacyData: privacyData
          }
        }} />

      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const MyScrapStack =({navigation,route})=>{
  const [user, setUser] = useState(route.params.user);
  const [actualUser, setActualUser] = useState(route.params.actualUser);
  const { getUserDetails } = route.params;
  const [remountKey, setRemountKey] = useState(0);



  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="Profile">
          <Stack.Screen name="MyScrapSales" component={MyScrapSales} key={remountKey.toString()} options={{ headerShown: false }} initialParams={{...route.params,user: user}} />
          <Stack.Screen name="MyScrapSaleOrder" component={MyScrapSaleOrder} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>)


}

const Stack = createStackNavigator();


const myAddressStack = ({ navigation, route }) => {
  const [user, setUser] = useState(route.params.user);
  const [actualUser, setActualUser] = useState(route.params.actualUser);
  const { getUserDetails } = route.params;
  const [remountKey, setRemountKey] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      console.log(route.params.actualUser);
      setActualUser(route.params.actualUser);
      setRemountKey(Math.random(0.5));
      return () => null;
    }, [route])
  );

  React.useEffect(() => {
    console.log(route.params.actualUser);
    setActualUser(route.params.actualUser);
    setRemountKey(Math.random(0.5));
  }, [route.params]);
  console.log('Starting address Stack');
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="Profile">
          <Stack.Screen name="AddressList" component={AddressList} key={remountKey.toString()} options={{ headerShown: false }} initialParams={{...route.params ,user: user, actualUser: actualUser, getUserDetails: getUserDetails, navigator: navigation, myAddresses: true, profile: route.params.profile }} />
          <Stack.Screen name="AddAddress" component={AddAddress} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>)

};

const myProfileStack = ({ navigation, route }) => {
  const [user, setUser] = useState(route.params.user);
  const [actualUser, setActualUser] = useState(route.params.actualUser);
  const { getUserDetails } = route.params;
  const [remountKey, setRemountKey] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      console.log(route.params.actualUser);
      setActualUser(route.params.actualUser);
      setRemountKey(Math.random(0.5));
      return () => null;
    }, [route])
  );

  React.useEffect(() => {
    console.log(route.params.actualUser);
    setActualUser(route.params.actualUser);
    setRemountKey(Math.random(0.5));
  }, [route.params]);
  console.log('Starting Profile Stack');
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="Profile">
          <Stack.Screen name="Profile" component={MyProfile} key={remountKey.toString()} options={{ headerShown: false }} initialParams={{...route.params ,user: user, actualUser: actualUser, getUserDetails: getUserDetails, navDrawer: navigation, setActualUser: route.params.setActualUser }} />
          <Stack.Screen name="AddressList" component={AddressList} options={{ headerShown: false }} initialParams={{navigator : navigation}}/>
          <Stack.Screen name="AddAddress" component={AddAddress} options={{headerShown: false}} />
          <Stack.Screen name="MySubscriptions" component={MySubscriptions} options={{ headerShown: false }} initialParams={{navigator : navigation,actualUser:actualUser}} />
          <Stack.Screen name="MyScrapSales" component={MyScrapSales} options={{ headerShown: false }} />
          <Stack.Screen name="About" component={About} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>)

};

const VendorHomeStack=({navigation,route})=>{
  const[user,setUser] = useState(route.params.user);
  const[actualUser,setActualUser]= useState(route.params.actualUser);
  const [vendorID,setVendorID] = useState(null);
  const {getUserDetails} = route.params;
  const [remountKey, setRemountKey] = useState(0);
  const [verification,setVerification] = useState(Constants.veFirstTime);
  const [loading,setLoading]= useState(true);
  const [errorState,setError] = useState(false);
  const [pendingActions,setPendingActions] = useState(0);
  const [pendingActionItem,setPendingActionItem] = useState(null);


  useFocusEffect(
    React.useCallback(() => {
      console.log(route.params.actualUser);
      setActualUser(route.params.actualUser);
      setRemountKey(Math.random(0.5));
      return () => null;
    }, [route])
  );

  const retreieveVendorData = ()=>{
    Axios.get(Config.api_url+'php?action=getVendorStatus&user_id='+ actualUser.user_id,)
            .then((response)=>{
              console.log('refreshvendordata');
               //setLoading(false);
               // console.log("HEREs"+response.data.vendor[0].vendor_id)
                setVerification(Constants.veFirstTime) // uncomment this
            try{
                
                var status= response.data.vendor[0].vendor_status;
                if(status=== 'active'){
                  setVerification(Constants.verified);
                  setVendorID(response.data.vendor[0].vendor_id);
                  //messss
                  messaging().subscribeToTopic("vendor"+response.data.vendor[0].vendor_id);
                  setPendingActions(response.data.vendor[0].pending_actions.homescrap.length);
                  if(response.data.vendor[0].pending_actions.homescrap.length)
                    setPendingActionItem(response.data.vendor[0].pending_actions.homescrap[0]);
                

                }
                else if(status=== 'inactive')
                    setVerification(Constants.veFirstTime)
                else
                    setVerification(Constants.veInProgress);
                //setVerification(Constants.veFirstTime);
                setLoading(false);
                
            }
            catch(error){
                setVerification(Constants.veFirstTime);
                setLoading(false);
                
            }
        });
  }

  React.useEffect(() => {
    console.log(route.params.actualUser);
    setActualUser(route.params.actualUser);
    setRemountKey(Math.random(0.5));
    retreieveVendorData();
  }, [route.params]);
  
  if(loading)
  return (
    <View style={{ ...StyleSheet.absoluteFill, backgroundColor: 'white' }}>
      <LottieView
        enableMergePathsAndroidForKitKatAndAbove
        style={{ flex: 1, padding: 50, margin: 50 }} source={require('./assets/animations/logistics.json')} resizeMode={'contain'} autoPlay={true} loop={true} />
    </View>
  );
  else if(errorState)
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
      <Text style={{ ...Styles.heading, alignSelf: 'center', textAlign: 'center' }}>Network connection failed, Try again later</Text>
    </View>

  );

  var theInitialParams = {actualUser: actualUser,user: user};


  if(verification != Constants.verified)
    return  (<View style={{ flex: 1 }}>
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="VendorRegistration">
          <Stack.Screen name="VendorRegistration" component={VendorRegistration} key={remountKey.toString()} options={{ headerShown: false }} initialParams={{ user: user, actualUser: actualUser,vendorRefresh: retreieveVendorData, getUserDetails: getUserDetails, navDrawer: navigation, setActualUser: route.params.setActualUser }} />
          <Stack.Screen name="VendorServices" component={VendorServices} options={{headerShown: false}}/>
          <Stack.Screen name="AddAddress" component={AddAddress} options={{headerShown: false}} />
          <Stack.Screen name="VendorDashboard" component={VendorDashboard} options={{ headerShown: false }} initialParams={theInitialParams} />
          <Stack.Screen name="VendorViewBids" component={VendorViewBids} options={{headerShown : false}} />
          <Stack.Screen name = "VendorBidDetails" component={VendorBidDetails} options={{headerShown : false}} />
          <Stack.Screen name = "VendorScrapOrders" component={VendorScrapOrders} options={{headerShown : false}} />
          <Stack.Screen name = "ScrapPickedConfirmation" component={ScrapPickedConfirmation} options={{headerShown : false}} initialParams={user} />
          <Stack.Screen name="VendorSubscriptions" component={VendorSubscriptions} options={{headerShown : false}} /> 
          <Stack.Screen name="VendorSubscriptionDetails" component={VendorSubscriptionDetails} options={{headerShown : false}} /> 

    
  
        </Stack.Navigator>
      </NavigationContainer>
    </View>)
  


  return (<View style={{ flex: 1 }}>
    <NavigationContainer independent={true}>
      <Stack.Navigator>

        <Stack.Screen name="VendorDashboard" component={VendorDashboard} options={{ headerShown: false }} initialParams={theInitialParams} />
        <Stack.Screen name="VendorViewBids" component={VendorViewBids} options={{ headerShown: false }} />
        <Stack.Screen name = "VendorBidDetails" component={VendorBidDetails} options={{headerShown : false}} />

        <Stack.Screen name = "VendorScrapOrders" component={VendorScrapOrders} options={{headerShown : false}} />
        <Stack.Screen name = "ScrapPickedConfirmation" component={ScrapPickedConfirmation} options={{headerShown : false}}  initialParams={theInitialParams} />


        <Stack.Screen name="AddAddress" component={AddAddress} options={{headerShown: false}} />
        <Stack.Screen name="VendorProfileStack" component={VendorProfileStack} options={{headerShown: false}} initialParams={{ user: user, actualUser: actualUser }} /> 
       
        <Stack.Screen name="VendorSubscriptions" component={VendorSubscriptions} options={{headerShown : false}}  /> 
        <Stack.Screen name="VendorSubscriptionDetails" component={VendorSubscriptionDetails} options={{headerShown : false}} /> 

          {/*
          <Drawer.Screen name="AddAddress" component={AddAddress} />
          <Drawer.Screen name="myAddresses" component={myAddressStack} />
          <Drawer.Screen name="MySubscriptions" component={MySubscriptions} />
          <Drawer.Screen name="MyScrapSales" component=
            
          {MyScrapSales} />
          */}
          <Stack.Screen name="VendorBids" component={VendorBids} options={{ headerShown: false }} initialParam={{vendorID : vendorID}} />

  

        
  

      </Stack.Navigator>
    </NavigationContainer>
  </View>)


}

const VendorProfileStack = ({ navigation, route }) => {
  const [user, setUser] = useState(route.params.user);
  const [actualUser, setActualUser] = useState(route.params.actualUser);
  const { getUserDetails } = route.params;
  const [remountKey, setRemountKey] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      console.log(route.params.actualUser);
      setActualUser(route.params.actualUser);
      setRemountKey(Math.random(0.5));
      return () => null;
    }, [route])
  );

  React.useEffect(() => {
    console.log(route.params.actualUser);
    setActualUser(route.params.actualUser);
    setRemountKey(Math.random(0.5));
  }, [route.params]);
  console.log('Starting Vendor Profile Stack');
  return (<View style={{ flex: 1 }}>
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="VendorProfile">
        <Stack.Screen name="VendorProfile" component={VendorProfile} key={remountKey.toString()} options={{ headerShown: false }} initialParams={{ ...route.params,user: user, actualUser: actualUser, getUserDetails: getUserDetails, navDrawer: navigation, setActualUser: route.params.setActualUser }} />
        <Stack.Screen name="AddAddress" component={AddAddress} options={{headerShown: false}}  />
        <Stack.Screen name="VendorServices" component = {VendorServices} options={{ headerShown: false }} initialParams={{ actualUser: actualUser }} />
        <Stack.Screen name="AddressList" component={AddressList} options={{headerShown: false}} initialParams={{actualUser: actualUser,navigator : navigation}} />
        <Stack.Screen name="EditVendorDetails" component={EditVendorDetails} options={{headerShown: false}} />
        <Stack.Screen name="VendorViewBids" component={VendorViewBids} options={{headerShown: false}} />
        
      </Stack.Navigator>
    </NavigationContainer>
  </View>)

}
const userSupportStack = ({ navigation, route }) => {
  console.log('Starting Support Stack')
  const [cachedData, setCachedData] = useState(route.params.cachedData);
  React.useEffect(() => {
    //const { privacyData, termsData, contactUsData } = route.params.cachedData;
    //setCachedData(route.params.cachedData);
    //console.log('dome', route.params.cachedData);
  }, []);

  //return(<BidCreation1 />)
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="SupportFAQ">
          <Stack.Screen name="SupportFAQ" component={SupportFAQ} options={{ headerShown: false }} initialParams={{
            ...route.params,
            cachedData: cachedData,
            draweNav: navigation
          }} />
          <Stack.Screen name="FAQ" component={FAQ} options={{ headerShown: false }} />
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{ headerShown: false }} />
          <Stack.Screen name="Terms" component={TermsAndConditions} options={{ headerShown: false }} />

        </Stack.Navigator>

      </NavigationContainer>
    </View>)

};


export default function App() {
  const Stack = createStackNavigator();

 
  

  const [firstlogin, setFirstLog] = useState(0);
  const [user, setUser] = useState(auth().currentUser); 
  const [userDetails, setUserDetails] = useState(null);
  const [vendorDetails, setVendorDetails] = useState(null);
  const [networkState, setNetworkState] = useState(true);
  const [splash, setSplash] = useState(true);
  const [status,setStatus] = useState('no status')
  const [pendingAction,setPendingAction] = useState(0);
  const [pendingActionItem,setPendingActionItem] = useState(null);

  const getUserDetails = async (networkTries, user, nextRoute = 0) => {
    
    const checkVendorStatus = (user_id) => {
      Axios.get("http://api.dev.we-link.in/user_app.php?action=getVendorStatus&user_id="+ user_id,)
      .then((response)=>{
        try{
          console.log("Vendor Status "+response.data.vendor[0].vendor_status)
          setStatus(response.data.vendor[0].vendor_status)
    
          
        //  setVerification(Constants.veFirstTime) // uncomment this
     
       //   var status= response.data.vendor[0].vendor_status;
          if(status=== 'active')
          goTodashboard(true);
          else if(status=== 'inactive')
             console.log("Inac")
          else
             console.log("prog")
            setSplash(false);
          //setVerification(Constants.veFirstTime);
      }
      catch(error){
        console.log('Error Encountered');
        setSplash(false);
       setVerification(Constants.veFirstTime);
      }
    });
    
     }
    
    setSplash(true);
    console.log('getUserDetails');

    if (networkTries > 10) {
      //setNetworkState('unavailable');
      return;
    }
    else {
    

      if(user !=null)
      Axios.get(Config.api_url+'php?action=getUser&phone=' + user.phoneNumber.substring(3))
        .then((response) => {
          setSplash(false);
          try {
            console.log(response.data.user[0]);
            if (response.data.user != null && response.data.user != undefined)
              if (response.data.user[0].status_code === 100)
                setUserDetails(100)
              else
                setUserDetails(response.data.user[0]);
            else
              setUserDetails(null);
              
            //setNetworkState('working');

              console.log("UID"+response.data.user[0].user_id)
              messaging().subscribeToTopic("user"+response.data.user[0].user_id);

             checkVendorStatus(response.data.user[0].user_id);
             setPendingAction(response.data.user[0].pending_action.homescrap.length);
             console.log(response.data.user[0].pending_action.homescrap.length);
             if(response.data.user[0].pending_action.homescrap.length>0)
              setPendingActionItem(response.data.user[0].pending_action.homescrap[0]);
             setSplash(false);

          }
          catch (error) {
            console.log(error);
            //getUserDetails(networkTries+1,user)
          }
        }, (error) => {
          console.log('error');
          //getUserDetails(networkTries+1,user);
        });
    }
  };

  const getVendorDetails = async (networkTries, user, nextRoute = 0) => {
    setSplash(true);
    console.log('getVendorDetails');

    if (networkTries > 10) {
      //setNetworkState('unavailable');
      return;
    }
    else {

      // try{
      // Axios.get(Config.api_url+'php?action=getVendorStatus&user_id=' + userDetails.user_id)
      //   .then((response) => {
      //     console.log('VENDOR'+response.data.vendor[0])
      //     setSplash(false);
      //     try {
      //       if(response.data.vendor[0] != null && response.data.vendor[0]!= undefined)
      //      { console.log(response.data.vendor[0])
      //       var status= response.data.vendor[0].vendor_status;
      //           if(status=== 'active')
      //              setVendorDetails(response.data.vendor[0])
      //           else
      //               setVendorDetails(null);
      //           //setVerification(Constants.veFirstTime);
      //      }
      //       }
          
      //     catch (error) {
      //       console.log(error);
      //       //getUserDetails(networkTries+1,user)
      //     }
      //   }, (error) => {
      //     console.log('error');
      //     //getUserDetails(networkTries+1,user);
      //   });
      // }
      // catch(error){

      // }
    }
  };





  onAuthStateChanged = (user) => {
    setUser(user);
    //console.log(user);

  }

  checkIfFirstLogin = async () => {
    const jsondata = await AsyncStorage.getItem('firstLogin');
    const firstLogin = await JSON.parse(jsondata);
    //console.log(firstLogin.firstLogin);
    if (firstLogin == null)
      setFirstLog(1);

  }
  const fetchUserDetails = () => {
    var i = 5;
  }

  const checkNetworkState = async () => {
    console.log('api_url',Config.api_url);
    Axios.get(Config.api_url+'php?action=getTerms')
      .then((response) => {
        setNetworkState(true);
      }, (error) => {
        console.log(error);
        setNetworkState(false);
      });
  }

  // const sendNotif = async ()=>{
  //  // await firebase.initializeApp(); 
  //  setTimeout(()=>{
  //   functions().httpsCallable('sendNotification')({
  //     'title': 'Notification',
  //     'message': 'Message',
  //     'body': "Body",
  //     'topic': "all"
  //   }).then(
  //     (response) =>{
  //       console.log(response);
  //     },(reason)=>{
  //       console.log(reason);
  //     }
  //   );
  //  },5000);

  // }

  console.log("cuu "+JSON.stringify(user))

  React.useEffect(() => {


    checkNetworkState()
    getUserDetails(0,user);

    console.group('firebaseuser', auth().currentUser);
    setSplash(false);
    setTimeout(()=>{
      setSplash(false);
    },1500
    )
    setUser(auth().currentUser);
    checkIfFirstLogin();
    console.log("USER" + JSON.stringify(user));
    if (userDetails === null && user != null)
      getUserDetails(0, user);
    const suser = auth().onAuthStateChanged(onAuthStateChanged);
    getVendorDetails();
    
    

     
  
    // To debug with custom phone number comment above and uncomment below
    // if (userDetails === null){
    //   getUserDetails(0, user);
    //   //sendNotif();

    // }








  }, []);

  return (<RatingComponentScreen order_details ={ {something: "something1",somethings: "somethings2"}} />);

  /*
  return (<View style={{...StyleSheet.absoluteFill,backgroundColor: 'blue'}}>
    <RatingComponent/>
  </View>)*/

  if (networkState == false)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
        <Text style={{ ...Styles.heading, alignSelf: 'center', textAlign: 'center' }}>Network connection failed, Try again later</Text>
      </View>

    )


  if (splash) {
    return (
      <View style={{ ...StyleSheet.absoluteFill, backgroundColor: 'white' }}>
        <LottieView
          enableMergePathsAndroidForKitKatAndAbove
          style={{ flex: 1, padding: 50, margin: 50 }} source={require('./assets/animations/logistics.json')} resizeMode={'contain'} autoPlay={true} loop={true} />
      </View>
    )
  }




  if (user == null) {
    return (
      <View style={{ flex: 1 }}>
        <NavigationContainer independent={true}>
          <Stack.Navigator>
            <Stack.Screen name="Introduction" component={Introduction}
              options={{
                headerShown: false
              }} initialParams={{ getUserDetailsa: getUserDetails }} />
            <Stack.Screen name='Login' component={LoginScreen} initialParams={{ getUserDetailsa: getUserDetails }} options={{
              headerShown: false
            }} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
  else if (userDetails === 100) {
    //getUserDetails(5);
    return (
      <View style={{ flex: 1 }}>
        <About user={user} getUserDetails={getUserDetails} />
      </View>
    )
  }
  else if (userDetails != 100 && userDetails != null) {

    //Applock
   
     if(pendingAction > 0 && pendingActionItem != null){
       console.log("I exist "+pendingActionItem)
      return <ScrapPickedConfirmation  route={{params:{item: pendingActionItem,refreshCallback: getUserDetails,actualUser: userDetails, cardDetail: pendingActionItem,tag: 'User',user: user }}}  />
     }


    return (
      <View style={{ flex: 1 }}>
        <NavigationDrawer user={user} actualUser={userDetails} getUserDetails={getUserDetails} setUser={setUser} />
      </View>
    );

  }

  return (<View style={{ ...StyleSheet.absoluteFill, backgroundColor: 'white' }}>
    <LottieView
      enableMergePathsAndroidForKitKatAndAbove
      style={{ flex: 1, padding: 50, margin: 50 }} source={require('./assets/animations/logistics.json')} resizeMode={'contain'} autoPlay={true} loop={true} />
  </View>
  )
}

const PostLoginHome = ({ route, navigation }) => {
  const { user, actualUser, sm } = route.params;
  const [updateState, setUpdateState] = useState(route.params.actualUser);


  React.useEffect(() => {
    setUpdateState(route.params.actualUser);
  }, [route])

  if (updateState != false) {
    //console.log('got my  on the dash ', updateState)
    return (
      <View style={{ flex: 1 }}>
        <NavigationContainer independent={true}>
          <Stack.Navigator initialRouteName='Homescreen' >
            <Stack.Screen name='Homescreen' component={Homescreen} options={{
              headerShown: false
            }} initialParams={{ user: route.params.user, actualUser: updateState, drawer: navigation, getUserDetails: route.params.getUserDetails, setActualUser: route.params.setActualUser }} />
            {/* <Stack.Screen name='School' component={School} options={{headerShown: false}}/>  */}
            <Stack.Screen name='AddressSearch' component={AddressSearch} />
            <Stack.Screen name='AddAddress' component={AddAddress} options={{
              headerShown: false
            }} />
            <Stack.Screen name="About" component={About} initialParams={{ user: user }} />
            <Stack.Screen name="City" component={City} initialParams={{ user: user }} options={{headerShown: false}} />
            <Stack.Screen name='VendorsList' component={VendorsList} initialParams={{ user: user }} />
            <Stack.Screen name='MilkVendors' component={MilkVendors} options={{ headerShown: false }} initialParams={{ user: user }} />
            <Stack.Screen name='PaperVendors' component={PaperVendors} options={{ headerShown: false }} initialParams={{ user: user }} />
            <Stack.Screen name='VendorScreen' component={VendorScreen} options={{ headerShown: false }} initialParams={{ user: user }} />
            <Stack.Screen name='VendorScreen1' component={VendorScreen1} options={{ headerShown: false }} />
            <Stack.Screen name='AddressList' component={AddressList} options={{ headerShown: false }} initialParams={{ navigator: navigation }} />

            <Stack.Screen name='SubscribeScreen' component={SubscribeScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Cart' component={Cart} options={{ headerShown: false }} />
            <Stack.Screen name='FirstAbout' component={About} options={{ headerShown: false }} />
            <Stack.Screen name='FirstCity' component={City} options={{ headerShown: false }} />
            <Stack.Screen name='FirstAddress' component={AddressSearch} options={{ headerShown: false }} />
            <Stack.Screen name='ScrapVendors' component={ScrapVendors} options={{ headerShown: false }} />
            <Stack.Screen name='ScrapVendor' component={ScrapVendor} options={{ headerShown: false }} />
            <Stack.Screen name="Bids" component={Bids} options={{ headerShown: false }} />
            <Stack.Screen name="BidCreation1" component={BidCreation1} options={{ headerShown: false }} />
            <Stack.Screen name="ChooseAddress" component={ChooseAddress} options={{headerShown: false}}/>
            <Stack.Screen name="BidCreation2" component={BidCreation2} options={{ headerShown: false }} />
            <Stack.Screen name="TitleBidDetails" component={TitleBidDetails} options={{ headerShown: false }} />
            <Stack.Screen name="AwardBid" component={AwardBid} options={{ headerShown: false }} />
            <Stack.Screen name="CancellationScreen" component={CancellationScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CorporateMarkPickupScreen" component={CorporateMarkPickupScreen} options={{headerShown: false}}/>
            <Stack.Screen name="ScrapCart" component={ScrapCart} options={{ headerShown: false }} />
            {/* <Stack.Screen name='ProfileStack' component={MyProfile} options={{headerShown: false}}/> */}




          </Stack.Navigator>
        </NavigationContainer>
      </View>
    )
  }
}
