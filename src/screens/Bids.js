import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet,ScrollView,FlatList,TouchableOpacity, Dimensions} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {Colors, TextSpinnerBoxStyles,dimen,Styles, Config} from '../Constants';
import GenericSeperator from '../components/GenericSeperator';
import {Ionicons} from '@expo/vector-icons';
import AppBar from '../components/AppBar';
import { Feather } from '@expo/vector-icons';
import SubmitButton from '../components/SubmitButton'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import Axios from 'axios';

var dataOpen = [
    {
        "bid_id": "1",
        "bid_title": "Dummy Bid",
        "bid_startdate": "2020-11-10",
        "bid_enddate": "2020-11-10",
        "bid_status": "Pickup Completed",
        "user_id": "101",
        "bid_addr_id": "302",
        "bid_pickupdate": null,
        "bid_timeslot": null,
        "bid_category_id": "1",
        "bid_quantity_id": "1",
        "vehicle_need": "1",
        "manpower_need": "1",
        "insurance_need": "0",
        "bid_notes": "some notes here optional",
        "bid_cancelled_notes": null,
        "bid_pickup_notes": null,
        "addr_id": "302",
        "addr_user_id": "101",
        "addr_vendor_id": null,
        "addr_name": "Home",
        "addr_details": "2, Kammanahalli Main Rd, Indra Nagar, Kacharakanahalli, Bengaluru, Karnataka 560084, India",
        "addr_pincode": "560084",
        "addr_latitude": "13.0195",
        "addr_longitude": "77.637",
        "addr_landmark": "Nothing much",
        "addr_status": "active",
        "applied_vendors": [
            {
                "vendor_id": "1",
                "user_id": "2",
                "company_name": "Milk Shop",
                "company_email_id": "company@welink.in",
                "id_proof_document": "id_proof_1604229542.jpg",
                "gst_cert_img": null,
                "milk_service": "yes",
                "newspaper_service": "yes",
                "homescrap_service": "yes",
                "officescrap_service": "yes",
                "vendor_address_id": "1",
                "vendor_avg_ratings": "0",
                "milk_product_ids": "[\"1\"]",
                "news_product_ids": "[\"2\"]",
                "homescrap_product_ids": "[\"1\"]",
                "milk_brand_ids": null,
                "news_brand_ids": null,
                "homescrap_cat_ids": null,
                "officescrap_cat_ids": "[\"\"]",
                "vendor_img_url": "vendor_img_1604229542.jpg",
                "vendor_status": "active",
                "vendor_gstin": "29DVGCH55151",
                "bid_apply_id": "1",
                "bid_id": "1",
                "owner_id": "101",
                "appln_amount": "1001",
                "appln_timestamp": "2020-11-12 08:41:34",
                "awarded_status": "1"
            }
        ]
    },
];

var dataCloseOrCancel = [];


export default function Bids({navigation,route}){
    const words = {
        openBids: 'Open Bids',
        closedBids: 'Closed Bids'
    }
    const [tab,setTab]=useState(1);
    const [cardWidth,setCardWidth] = useState(0);
    const [remount,setRemount] = useState(5);
     const [actualUser,setActualUser] = useState(route.params.actualUser);

 

   useEffect(()=>{
       console.log(actualUser);
    Axios.get(Config.api_url+'php?action=getBids&user_id='+actualUser.user_id)
        .then((response)=>{
            var responseArray = response.data;
            console.log(responseArray);
            try{
                responseArray.forEach((p)=>{
                    if(p.bid_status === "Open")
                        dataOpen.push(p);
                    else
                        dataCloseOrCancel.push(p);
                    setRemount(Math.random(0.5));
                })
            }
            catch(error){
                console.log('To err is human',error);
            }

        },(error)=>{
            console.log('error');
        })
   },[]);

    const renderTabs = () => {

        return(<View style={styles.tabs}>
        <TouchableWithoutFeedback onPress={() => {
            setTab(1);
        }} style={tab == 1 ? styles.tab : {...styles.tab,backgroundColor: 'transparent'}}>
        <Text style={styles.tabWord}>{words.openBids}</Text>
     
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => {
            setTab(2);
        }} style={tab == 2 ? styles.tab : {...styles.tab,backgroundColor: 'transparent'}}>
        <Text style={styles.tabWord}>{words.closedBids}</Text>
     
        </TouchableWithoutFeedback>

        </View>)

    }

    const renderCard = (cardDetails) => {
        if(tab == 1){
        return(<View onLayout={(event) => {
            setCardWidth(event.nativeEvent.layout.width);
        }}  style={styles.card}>
     
            <Text style={{...styles.cardTitle,fontSize:16}}>{cardDetails.bidTitle}</Text>
           
         
            
            {/* <View style={{flexDirection: 'row',flex:1}}>
            <AntDesign name="tago"size={20} color= {Colors.primary} />
            <Text style={{...styles.cardTitle,flex:1,marginStart:'3%',fontSize:16}}>{`Number of bids: ${cardDetails.bidders}`}</Text>
            </View> */}

           
           
       
        <Text style={{...styles.cardTitle,color:'gray',marginVertical:'5%'}}>{cardDetails.bidDuration}</Text>

        <View style={{...styles.duration,paddingVertical: 0,justifyContent: 'space-between'}}>
                    <View style={{...styles.duration,borderRadius: 10,borderWidth: 1,borderColor: Colors.primary,justifyContent: 'flex-start',alignSelf: 'center'}}>
                    <Feather name="truck" size={24} color="black" style={{paddingHorizontal:5,paddingVertical:2}} />                     
                       <Text style={{...Styles.subbold,fontWeight: 'bold',paddingLeft: 5,alignSelf: 'center',paddingVertical: 2,paddingRight: 10}}>{cardDetails.bidItems}</Text>
                    </View>
                    <View style={{...styles.duration,borderRadius: 10,borderWidth: 1,borderColor: Colors.seperatorGray,justifyContent: 'flex-start',alignSelf: 'center',padding:'1%'}}>          
                        <MaterialCommunityIcons name="weight-kilogram" size={25} color="black" style={{paddingHorizontal: 5,paddingVertical: 2,alignSelf: 'center'}} />
                        <Text style={{...Styles.subbold,fontWeight: 'bold',paddingLeft: 5,alignSelf: 'center',paddingVertical: 2,paddingRight: 10}}>{cardDetails.bidItemsWeight}</Text>

                    </View>
                    <View style={{...styles.duration,borderRadius: 10,borderWidth: 1,borderColor: Colors.primary,justifyContent: 'flex-start',alignSelf: 'center'}}>
                        <AntDesign name="clockcircleo" size={24} color="black" style={{paddingHorizontal: 5,paddingVertical: 2}}/>
                        <Text style={{...Styles.subbold,fontWeight: 'bold',paddingLeft: 5,alignSelf: 'center',paddingVertical: 2,paddingRight: 10}}>{cardDetails.pickUpTimeSlot}</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',marginTop: '6%'}}>
                <Text style={{...styles.cardTitle,alignItems: 'flex-end',color:Colors.blue,marginVertical:'5%',fontSize:16}}>Active</Text>
      
            <AntDesign name="tago"size={15} color= {Colors.primary} style={{alignSelf:'center',marginStart: cardWidth/4.5}}/>
            <Text numberOfLines={1} style={{...styles.cardTitle,flex:1,marginStart:'1%',marginVertical:'5%'}}>{`Number of bids: ${cardDetails.bidders}`}</Text>

            </View>



        </View>)}
return(<View style={styles.card}>
    <View style={{flexDirection: 'row',width: dimen.width-dimen.width/10}}>
        <Text style={{...styles.cardTitle,fontSize:16}}>{cardDetails.bidTitle}</Text>

        <View style={{flexDirection: 'row',flex:1,marginStart:'20%'}}>
        </View>

       
       
    </View>
    <Text style={{...styles.cardTitle,color:'gray',marginVertical:'5%'}}>{cardDetails.bidDuration}</Text>

    <View style={{...styles.duration,paddingVertical: 0,justifyContent: 'space-between'}}>
                <View style={{...styles.duration,borderRadius: 10,borderWidth: 1,borderColor: Colors.primary,justifyContent: 'flex-start',alignSelf: 'center'}}>
                <Feather name="truck" size={24} color="black" style={{paddingHorizontal:5,paddingVertical:2}} />                     
                    <Text style={{...Styles.subbold,fontWeight: 'bold',paddingLeft: 5,alignSelf: 'center',paddingVertical: 2,paddingRight: 10}}>Metal</Text>
                </View>
                <View style={{...styles.duration,borderRadius: 10,borderWidth: 1,borderColor: Colors.seperatorGray,justifyContent: 'flex-start',alignSelf: 'center',padding:'1%'}}>          
                    <MaterialCommunityIcons name="weight-kilogram" size={25} color="black" style={{paddingHorizontal: 5,paddingVertical: 2,alignSelf: 'center'}} />
                    <Text style={{...Styles.subbold,fontWeight: 'bold',paddingLeft: 5,alignSelf: 'center',paddingVertical: 2,paddingRight: 10}}>9-12</Text>

                </View>
                <View style={{...styles.duration,borderRadius: 10,borderWidth: 1,borderColor: Colors.primary,justifyContent: 'flex-start',alignSelf: 'center'}}>
                    <AntDesign name="clockcircleo" size={24} color="black" style={{paddingHorizontal: 5,paddingVertical: 2}}/>
                    <Text style={{...Styles.subbold,fontWeight: 'bold',paddingLeft: 5,alignSelf: 'center',paddingVertical: 2,paddingRight: 10}}>9-12</Text>
                </View>
            </View>


            <Text style={{...styles.cardTitle,alignItems: 'flex-end',color: cardDetails.status == "Cancelled" ? Colors.red : Colors.blue,marginVertical:'5%',fontSize:16}}>{cardDetails.status == "Cancelled" ? cardDetails.status: cardDetails.status +" · Awarded to " + cardDetails.awardedTo}</Text>


    </View>)



    }

   

    return(<View>
 <AppBar back  funct={() => {
       navigation.pop();
        }} />

        <View style={{...Styles.parentContainer,backgroundColor: Colors.whiteBackground}}>
    
        {renderTabs()}
    
        <View style={{flex:1,paddingBottom: dimen.height/17}}>
        <FlatList 
            style={{marginBottom:'5%'}}
          
            data = {tab == 1 ? dataOpen.reverse() : dataCloseOrCancel.reverse()}
            extraData= {remount}
            renderItem = {({item}) => {
                var awardedVendor;
                item.applied_vendors.forEach((i)=>{
                    if(i.awarded_status == 1)
                        awardedVendor = i;
                });
                //var item = dataOpen[0];
                let cardDetails = {
        bidTitle: item.bid_title,
        bidDuration: item.bid_startdate+' to '+item.bid_enddate,
        bidItems: item.bid_category_id,
        bidItemsWeight: item.bid_quantity_id,
        bidders: item.applied_vendors.length,
        status: item.bid_status,
        awardedTo: tab == 1 ?"not awarderd": awardedVendor.company_name,
        pickUpTimeSlot: item.bid_timeslot,
        manpower : item.manpower_need==="1"? "Yes": "No",
        insurance : item.insurance_need === "1" ? "Yes": "No",
        vehicle : item.vehicle_need === "1" ?"Yes":"No"
      
                }
                return(<TouchableOpacity onPress={() => {
            navigation.navigate('TitleBidDetails', {
                ...cardDetails,
                tag : tab == 1 ? 'Open' : 'Closed'
                })
        }}>
                {renderCard(cardDetails)}
                </TouchableOpacity>)
                 
            }}
        />
      <View style={{alignItems: 'center'}}>
      <SubmitButton 
      text='+ Make a new bid' 
      onTouch = {() => {navigation.navigate('BidCreation1',{
          ...route.params
      })
       
      }}
      />
      </View>
    
    
        </View>
      
       
        </View>
      

       
    </View>)
   
}


const styles = StyleSheet.create({
    tabs: {
        width: dimen.width-dimen.width/10,
        aspectRatio:10/1.5,
        borderRadius: 15,
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        marginTop: '5%',
        alignSelf: 'center',
        margin: '3%'

    },
    tab: {
        width: (dimen.width-dimen.width/10)/2,
        aspectRatio:(10/1.5)/2,
        borderRadius: 15,
        backgroundColor:'#00dece' ,
        flexDirection: 'row',
      //  marginTop: '6%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'

    },
    tabWord: {
        fontWeight: 'bold',
        color: Colors.white,

    },
    card: {
        width: dimen.width-dimen.width/10,
        
        borderRadius: 15,
        borderColor: Colors.seperatorGray,
        borderWidth: 0.5,
        padding:'2%',
        marginTop: '5%',
        alignSelf: 'center',
        backgroundColor: 'white',
        elevation: 1,
        // marginBottom:'1%'
        
    },
    cardTitle: {
        fontWeight: 'bold',
        color: Colors.primary,
        padding: '1%',
        fontSize: 14,
       
    },
    duration:{
        paddingVertical: 5,
        paddingHorizontal: 3,
        margin: 3,
      
        borderColor: Colors.primary,
        flexDirection: 'row'
    },
})
