import Axios from 'axios';
import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import WebView from 'react-native-webview';
import AppBar from '../components/AppBar';
import { Styles } from '../Constants';
import qs from 'qs';
import Spinner from 'react-native-loading-spinner-overlay';
import sendNotif from '../Utility/sendNotificationTo';






const Payment = ({ route,navigation }) => {
    const {actualUser} = route.params;
    const {order} = route.params;
   //  const {navigation} = route.params;
//   const  order={
//         id:10,
//         amount:800
//     }
//    const actualUser={
//         name:'Anam',
//         phone:97892328392,
//         email:''
//     }
    const [spinnerVis,setSpinnerVis] = useState(false);
    // console.log("usa "+ JSON.stringify(actualUser))

    const showSpinner = (tf) =>{
        setSpinnerVis(tf);
    }
    
   const uri = `https://we-link.in/dev.we-link.in/api/ccavPayment_api.php?order_id=${order.id}&amount=${order.amount}&billing_name=${actualUser.name}&billing_country=India&billing_tel=${actualUser.phone}&billing_email=${actualUser.email}`;
   // let inject;

   
    return(<View>
     <AppBar
     title={'Make Payment'}
      back
         funct={() => navigation.goBack()}
     />
     {/* {init()} */}
        <View style={Styles.parentContainer}>

    <Spinner
                    visible={spinnerVis}
                    textContent={'Loading'}
                    textStyle={{ color: '#FFF' }}
                     />

   <WebView
   onLoadStart={() => showSpinner(true)}
   style={{height:'100%',width:'100%'}}
   onLoadEnd={() => showSpinner(false)}
   onMessage ={(msg) => {
       console.log("msg! "+JSON.stringify(msg));
       navigation.popToTop()
       sendNotif('Hey','Your order has been successfully placed','user'+actualUser.user_id)


   }}
   
    source={{ uri }}
//   injectedJavaScript={inject}
     />
         </View>
      </View>)
};

export default Payment;