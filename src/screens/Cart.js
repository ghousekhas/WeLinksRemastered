import React,{useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';

import {View, StyleSheet, Text, Dimensions,BackHandler,Alert} from 'react-native';
import SubscriptionOrder from '../components/SubscriptionOrder';
import SubmitButton from '../components/SubmitButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import moment, { weekdays } from 'moment';
import { Styles, Colors,dimen} from '../Constants'
import AppBar from '../components/AppBar'
import Axios from 'axios';
import qs from 'qs';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {Config} from  '../Constants';


const Cart = ({route,navigation,Tag}) => {
    let selectedDays = [],i;
    const [orderMade,setOrderMade] = useState(false);
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
    const {prate_} = route.params;
    const {pquan} = route.params;
    const {pnumber} = route.params;
    const {porder,actualUser} = route.params;
    const {tag} = route.params;
   // console.log("days " +porder.days);
    

    var numberOfDeliveries,numberOfPaperWeekdays,numberOfPaperWeekends;
    var dayString = "";
    var day=porder.days;


 
     porder.days[0].m ? dayString = dayString.concat("Y") : dayString =  dayString.concat("N")
     porder.days[1].t ? dayString = dayString.concat("Y") : dayString =  dayString.concat("N")
     porder.days[2].w ? dayString = dayString.concat("Y") : dayString =  dayString.concat("N")
     porder.days[3].th ? dayString = dayString.concat("Y") : dayString =  dayString.concat("N")
     porder.days[4].f ? dayString = dayString.concat("Y") : dayString =  dayString.concat("N")
     porder.days[5].s ? dayString = dayString.concat("Y") : dayString =  dayString.concat("N")
     porder.days[6].su ? dayString = dayString.concat("Y") : dayString =  dayString.concat("N")


     
    const calculatePaperDeliveries = (startDate,endDate) => {
        // console.log('cd:'+ startDate)
 
         var  start = startDate.charAt(0)+startDate.charAt(1) + " " + startDate.charAt(3) + startDate.charAt(4)
           + startDate.charAt(5) +" " + startDate.charAt(startDate.length-4)  + startDate.charAt(startDate.length-3)
           + startDate.charAt(startDate.length-2)  + startDate.charAt(startDate.length-1) + " 00:00:00 GMT";
           var end = endDate.charAt(0)+endDate.charAt(1) + " " + endDate.charAt(3) + endDate.charAt(4)
           + endDate.charAt(5) +" " + endDate.charAt(endDate.length-4)  + endDate.charAt(endDate.length-3)
           + endDate.charAt(endDate.length-2)  + endDate.charAt(endDate.length-1) + " 00:00:00 GMT";
   
     
       
         
     
         dayString = dayString + dayString[0];
         const dayString1 = dayString[6] + dayString.substring(0,6)
 
        // console.log(dayString1)
       
         const daysOfTheWeek = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
 
        
            for(i in dayString1)
            if(dayString1[i] == 'Y')
            selectedDays.push(daysOfTheWeek[i]);
 
        //    console.log(selectedDays)
 
 
             
         
      
         let weekdaysCount = 0;
         let weekendsCount = 0;
         for(i=0;i<7;i++){
           var dateObj1 = new Date(Date.parse(start));
           var dateObj2 = new Date(Date.parse(end));
      
       if(dayString1[i] == 'Y'){
     
           var dayIndex = i;
       
           while ( dateObj1.getTime() <= dateObj2.getTime() )
           {
           
              if (dateObj1.getDay() == dayIndex && dayIndex != 0 && dayIndex != 6)
              {
                 weekdaysCount++
              }
              else if (dateObj1.getDay() == dayIndex && (dayIndex == 0 || dayIndex == 6 ))
              {
                 weekendsCount++;
              }
       
              dateObj1.setDate(dateObj1.getDate() + 1);
           }
       
          
       }
         }
       
         numberOfPaperWeekdays = weekdaysCount;
         numberOfPaperWeekends = weekendsCount;
       console.log("Weekends " + weekendsCount+ " Weekdays "+weekdaysCount)
       return weekdaysCount + weekendsCount;
   
       };

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
 
         console.log(dayString1)
       
         const daysOfTheWeek = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
 
        
            for(i in dayString1)
            if(dayString1[i] == 'Y')
            selectedDays.push(daysOfTheWeek[i]);
 
            console.log(selectedDays)
 
 
             
         
      
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
        if(tag == 'Milk')
       { cartTotal = (prate * numberOfDeliveries * porder.perDayQuan.number)
  }
        else if(tag == 'Paper') cartTotal = prate * numberOfPaperWeekdays * porder.perDayQuan.number 
        + prate_ * numberOfPaperWeekends * porder.perDayQuan.number

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
    


    return(<View style={{width: '100%',height: dimen.height,backgroundColor: 'white',justifyContent: 'flex-start'}}>
        <View>
      <AppBar back={true} funct={() => {
         
           navigation.pop();
        }} />
        </View>
   

      {/*ScrollView parent */}
      <View style={{height:  dimen.height-dimen.height/8,position: 'absolute',top: dimen.height/14}}>
      <ScrollView style={{flex: 1,padding: 5}}>
      <View style={{flex: 1,alignSelf: 'center',justifyContent: 'center'}}>
      
    <Text style={{...Styles.title,marginBottom : '2%'}}>{words.title}</Text>

    <View style={{alignItems: 'center',width: dimen.width}}>
        <SubscriptionOrder name={pname}
         quantity={pquan} rate={prate}  bought={porder.perDayQuan.number}
         startDate={porder.s.start} 
         endDate={porder.e.end}
          days={porder.days} 
          tag = {tag}
          rate_={prate_}
          num = {tag == 'Milk' ? calculateDeliveries(porder.s.start,porder.e.end) : calculatePaperDeliveries(porder.s.start,porder.e.end)}
          imageUrl={route.params.imageUrl}
         />
         </View>
<View style={{marginTop: dimen.height/60}}>
         <View style={style.gray}>
             <Text style={style.text}>{words.disclaimer}</Text>
         </View>


         <View style={{...style.gray, flexDirection: 'row',justifyContent: 'flex-start'}}>
         <MaterialCommunityIcons name="sale" size={30} color="#6CC35A" style={style.couponIcon}/>
         
             <Text style={style.coupon}>{words.couponText}</Text>
         </View>
</View>
         <View  style={{padding: 10,backgroundColor: 'white',marginTop:dimen.width/60}}>
        
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

         
         </View>
         </View>
</ScrollView>

        <View style={{flex: 0,marginHorizontal: 10,marginVertical: 3,justifyContent: 'center'}}>
         <SubmitButton styling={orderMade} text='Confirm Order' onTouch={() => {
                setOrderMade(true);
                const {year,month,day}=route.params.startDate;
                const endDate=route.params.endDate;
                console.log('vendortype',route.params.vendorType);

                console.log('pop to top')
                console.log(porder.s)
                Axios.post(Config.api_url+'php?action=addSubscription&'+qs.stringify({
                    user_id: actualUser.user_id,
                    vendor_id: route.params.vendorId,
                    quantity: pquan,
                    subscription_days: selectedDays,
                    subscription_start_date: year.toString()+'-'+month.toString()+'-'+day.toString(),
                    subscription_end_date:  endDate.year.toString()+'-'+endDate.month.toString()+'-'+endDate.day.toString(),
                    no_of_deliveries: tag == 'Paper' ? numberOfPaperWeekdays+numberOfPaperWeekends : numberOfDeliveries,
                    delivery_fee: 50,
                    product_type: route.params.vendorType,
                    order_gst: 0,
                    product_id: route.params.productId,
                    cartamount: calculateCartAmount(),
                    discount: 0,
                    order_total: calculateCartAmount()+50,
                    address_id: route.params.address.addr_id

                }),).then((response)=>{
                    console.log(response);
                    console.log(response.data);
                    alert('Your order has been placed');
                    
                    navigation.popToTop();
                },(error)=>{
                    console.log(error);
                })
                
            }}/>
         
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
       
        padding: '1%',
       backgroundColor: Colors.seperatorGray,
        borderRadius: 10,
        height: Dimensions.get('window').height/11,
        margin: '3%',
       
        alignItems: 'center',
        justifyContent:'center',
        elevation:1
        
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
        padding: '2%',
        
       
       
       
        fontWeight: 'bold'

    },
    billText:{
        fontSize: 16,
        marginTop: '2%',
        fontWeight: 'bold',
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