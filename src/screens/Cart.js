import React from 'react';
import { useFocusEffect } from '@react-navigation/native';

import {View, StyleSheet, Text, Dimensions,BackHandler,Alert} from 'react-native';
import SubscriptionOrder from '../components/SubscriptionOrder';
import SubmitButton from '../components/SubmitButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';
import { Styles} from '../Constants'
import AppBar from '../components/AppBar'
import Axios from 'axios';
import qs from 'qs';


const Cart = ({route,navigation}) => {
    const words = {
        title : 'Subscription Orders',
        disclaimer: 'Total number of deliveries may be adjusted as per market rates.',
        couponText :'Got a coupon code? Apply',
        cartAmount : 'Cart Amount',
        deliveryFee: 'Delivery fee',
        amountToPay : 'Amount to pay'

    };

    const {pname} = route.params;
    const {prate} = route.params;
    const {pquan} = route.params;
    const {pnumber} = route.params;
    const {porder,actualUser} = route.params;
    console.log(actualUser);
    

    var ans,numberOfDeliveries;
    var dayString = "";
    var day=porder.days;


 
     porder.days[0].m ? dayString = dayString.concat("Y") : dayString =  dayString.concat("N")
     porder.days[1].t ? dayString = dayString.concat("Y") : dayString =  dayString.concat("N")
     porder.days[2].w ? dayString = dayString.concat("Y") : dayString =  dayString.concat("N")
     porder.days[3].th ? dayString = dayString.concat("Y") : dayString =  dayString.concat("N")
     porder.days[4].f ? dayString = dayString.concat("Y") : dayString =  dayString.concat("N")
     porder.days[5].s ? dayString = dayString.concat("Y") : dayString =  dayString.concat("N")
     porder.days[6].su ? dayString = dayString.concat("Y") : dayString =  dayString.concat("N")

    const calculateDeliveries = (startDate,endDate) => {
       // console.log('cd:'+ startDate)

        var  start = startDate.charAt(0)+startDate.charAt(1) + " " + startDate.charAt(3) + startDate.charAt(4)
          + startDate.charAt(5) +" " + startDate.charAt(startDate.length-4)  + startDate.charAt(startDate.length-3)
          + startDate.charAt(startDate.length-2)  + startDate.charAt(startDate.length-1) + " 00:00:00 GMT";
          var end = endDate.charAt(0)+endDate.charAt(1) + " " + endDate.charAt(3) + endDate.charAt(4)
          + endDate.charAt(5) +" " + endDate.charAt(endDate.length-4)  + endDate.charAt(endDate.length-3)
          + endDate.charAt(endDate.length-2)  + endDate.charAt(endDate.length-1) + " 00:00:00 GMT";
  
    
      
        
    
        dayString = dayString + dayString[0];
        const dayString1 = dayString[6] + dayString.substring(0,6)
     
        var count = 0;
        for(i=0;i<7;i++){
          var dateObj1 = new Date(Date.parse(start));
          var dateObj2 = new Date(Date.parse(end));
     
      if(dayString1[i] == 'Y'){
    
          var dayIndex = i;
      
          while ( dateObj1.getTime() <= dateObj2.getTime() )
          {
          
             if (dateObj1.getDay() == dayIndex )
             {
                count++
             }
      
             dateObj1.setDate(dateObj1.getDate() + 1);
          }
      
         
      }
        }

      numberOfDeliveries = count;
       return count;
  
      };

   // This is the number of days from start to end date; unused
    const numberOfDays = (end,start) => {
        // console.log('sstart:'+start);
        // console.log('eend:'+end);
        var res;

        const month = (date) => {
            
           const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

            for(i=0;i<12;i++){
                if(date.includes(monthNames[i])){
                    res = (i < 10 ? "0" + i : i)
                }
            }
            return(res)
            
            

        }
       
        start =  start.charAt(start.length-4) +start.charAt(start.length-3) +start.charAt(start.length-2) + start.charAt(start.length-1) + "-" + month(start) + "-" + start.charAt(0) + start.charAt(1);
        end =  end.charAt(end.length-4) +end.charAt(end.length-3) +end.charAt(end.length-2) + end.charAt(end.length-1) + "-" + month(end) + "-" + end.charAt(0) + end.charAt(1);


            start = moment(start,"YYYY-MM-DD")
            end = moment(end,"YYYY-MM-DD")
          ans = start.diff(end,'days')+1; 
    

          





         return ans;

    }
    var cartTotal;
    const calculateCartAmount = () => {
        cartTotal = (prate * numberOfDeliveries * porder.perDayQuan.number)
        return cartTotal;

    };
    useFocusEffect(
        React.useCallback(() => {
          const onBackPress = () => {
        //  console.log('Go to sub');
        Alert.alert(
            'Are you sure you want to go back?',
            'Your progress will be lost.',
            [
           
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => {
                navigation.navigate('SubscribeScreen');
              
              }},
            ],
            { cancelable: false }
          )
         
          return true;
          };
    
          BackHandler.addEventListener('hardwareBackPress', onBackPress);
    
          return () =>
            BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        },)
      );
    


    return(<View>
      <AppBar back={true} funct={() => {
         
           navigation.pop();
        }} />
      <View style={{...Styles.parentContainer}}>
    <Text style={style.title}>{words.title}</Text>
    <View style={{alignItems: 'center'}}>
        <SubscriptionOrder name={pname}
         quantity={pquan} rate={prate}  bought={porder.perDayQuan.number}
         startDate={porder.s.start} 
         endDate={porder.e.end}
          days={porder.days}
          num = {calculateDeliveries(porder.s.start,porder.e.end)}
          imageUrl={route.params.imageUrl}
         />
         </View>

         <View style={style.gray}>
             <Text style={style.text}>{words.disclaimer}</Text>
         </View>


         <View style={style.gray1}>
         <MaterialCommunityIcons name="sale" size={30} color="#6CC35A" style={style.couponIcon}/>
         
             <Text style={style.coupon}>{words.couponText}</Text>
         </View>

         <View  style={{padding: 10,backgroundColor: 'white'}}>
        
         <View style={{flexDirection:'row'}}>
             <Text style={style.billText}>{words.cartAmount}</Text>
             <Text style={style.billCost}>₹{calculateCartAmount()}</Text>
         </View>
         <View style={{flexDirection:'row'}}>
             <Text style={style.billText}>{words.deliveryFee}</Text>
             <Text style={style.billCost}>₹50</Text>
         </View>
         <View style={{...Styles.grayfullline, marginVertical: '3%'}}/>
         <View style={{flexDirection:'row'}}>
             <Text style={style.billText}>{words.amountToPay}</Text>
             <Text style={style.billCost}>₹{cartTotal + 50}</Text>
         </View>

         <View style={{position: 'absolute',bottom: '-55%',alignSelf:'center',backgroundColor: 'white'}}>

            <SubmitButton text='Confirm' onTouch={() => {
                console.log('pop to top')
                Axios.post('http://api.dev.we-link.in/user_app.php?action=addSubscription&'+qs.stringify({
                    user_id: actualUser.user_id,
                    vendor_id: route.params.vendorId,
                    quantity: pquan,
                    subscription_days: porder.days,
                    subscription_start_date: porder.s,
                    subscription_end_date: porder.e,
                    no_of_deliveries: 0,
                    delivery_fee: 50,
                    order_gst: 0
                }),).then((response)=>{
                    console.log(response.data);
                    navigation.popToTop();
                },(error)=>{
                    console.log(error);
                })
                
            }}/>

         </View>

         </View>

        
    </View>
    </View>)

};

const style = StyleSheet.create({
    line:{
        borderWidth: 0.5,
        borderColor: 'gray',
        marginVertical: '2%',
      
    },
    container: {
        ...StyleSheet.absoluteFill,
        padding: 15,
        backgroundColor: 'white'
    },
    title:{
        fontSize: 20,
        marginHorizontal: '5%',
        marginVertical: '3%',
        fontWeight: 'bold',
        color: 'black'
    },
    gray: {
        marginTop: '3%',
        padding: '1%',
       backgroundColor: '#e0e0e0',
        borderRadius: 10,
        height: Dimensions.get('window').height/12,
        margin: '3%'
        
    },
    gray1: {
        flexDirection: 'row',
        marginTop: 10,
       backgroundColor: '#e0e0e0',
        borderRadius: 10,
        borderWidth: 0.6,
        elevation: -5,
        margin: '3%',
        height: Dimensions.get('window').height/12,
    },
    text: {
        padding: 10,
        color: 'gray',
        fontWeight: '900'
    },
    coupon: {
      
        fontWeight: '800',
        fontSize: 16,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: '4%',
        fontWeight: 'bold'

    },
    billText:{
        fontSize: 18,
        marginTop: '2%',
        fontWeight: '900',
        margin: '2%'
    },
    billCost:{
        fontWeight: 'bold',
        fontSize: 16,
        margin: '2%',
        textAlign: 'right',
        
       
        ...StyleSheet.absoluteFill
        
    },
    couponIcon: {
        padding: '4%',
        marginTop: '0.3%'
    }

});

export default Cart;
