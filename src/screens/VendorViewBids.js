import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet,ScrollView,FlatList,TouchableOpacity, Dimensions} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {Colors, TextSpinnerBoxStyles,dimen,Styles} from '../Constants';
import GenericSeperator from '../components/GenericSeperator';
import {Ionicons} from '@expo/vector-icons';
import AppBar from '../components/AppBar';
import { Feather } from '@expo/vector-icons';
import SubmitButton from '../components/SubmitButton'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function VendorViewBids({navigation}){
    const words = {
        openBids: 'Open Bids',
        bidsSubmitted: 'Bids Submitted',
        bidsWon: 'Bids Won'

    }
    const [tab,setTab]=useState(1);
    const [cardWidth,setCardWidth] = useState(0);
    const openBidArray = [{
        companyName: 'Fidelity',
        bidDuration: '18th January 2000 - 17th January 2001',
        bidItems : ['Metals'],
        bidItemsWeight: 40,
        contact : "8548080255",
        pickUpTimeSlot: "7-10",
        manpower : true,
        insurance : false,
        vehicle: true,
        address : "#221 B, Baker's Street",
        status : 'Open'
    },{
        companyName: 'Dekko Digital',
        bidDuration: '18th January 2000 - 17th January 2001',
        bidItems : ['Paper'],
        bidItemsWeight: 15,
        contact : "8548080255",
        pickUpTimeSlot: "7-10",
        manpower : true,
        insurance : true,
        vehicle: false,
        address : "#221 B, Baker's Street",
        status : 'Open'
    },{
        companyName: 'Electronics Company',
        bidDuration: '18th January 2000 - 17th January 2001',
        bidItems : ['Electronics'],
        bidItemsWeight: 5,
        contact : "8548080255",
        pickUpTimeSlot: "7-10",
        manpower : true,
        insurance : false,
        vehicle: false,
        address : "#221 B, Baker's Street",
        status : 'Open'
    },{
        companyName: 'Tyre Scrap',
        bidDuration: '18th January 2000 - 17th January 2001',
        bidItems : ['Metals'],
        bidItemsWeight: 25,
        contact :"8548080255",
        pickUpTimeSlot: "7-10",
        manpower : true,
        insurance : true,
        vehicle: true,
        address : "#221 B, Baker's Street",
        status : 'Open'
    },
    {
        companyName: 'Plastics',
        bidDuration: '18th January 2000 - 17th January 2001',
        bidItems : ['Plastics'],
        bidItemsWeight: 30,
        contact :"8548080255",
        pickUpTimeSlot: "7-10",
        manpower : true,
        insurance : true,
        vehicle: true,
        address : "#221 B, Baker's Street",
        status : 'Open'
    },{
        companyName: 'Old Books',
        bidDuration: '18th January 2000 - 17th January 2001',
        bidItems : ['Paper'],
        bidItemsWeight: 10,
        contact : "8548080255",
        pickUpTimeSlot: "7-10",
        manpower : true,
        insurance : true,
        vehicle: true,
        status : "Open"
    }];
    const bidsSubmitted = [{
        companyName: 'Old Books',
        bidDuration: '18th January 2000 - 17th January 2001',
        bidItems : ['Metals'],
        bidItemsWeight: 15,
        status: 'Submitted',
        contact : '9535311386',
        address : "#221 B, Baker's Street",
        cost : 200

       
    },{
        companyName: 'Wood Scrap',
        bidDuration: '18th January 2000 - 17th January 2001',
        bidItems : ['Metals'],
        bidItemsWeight: 15,
        status: 'Submitted',
        contact : '9535311386',
        awardedTo: 'New Scrap Collectors',
        address : "#221 B, Baker's Street",
        cost : 200
        
    },{
        companyName: 'Metal Waste',
        bidDuration: '18th January 2000 - 17th January 2001',
        bidItems : ['Metals'],
        bidItemsWeight: 15,
        status: 'Submitted',
        contact : '9535311386',
        awardedTo: 'New Scrap Collectors',
        address : "#221 B, Baker's Street",
        cost : 200
    },{
        companyName: 'Glass Scrap',
        bidDuration: '18th January 2000 - 17th January 2001',
        bidItems : ['Glass'],
        bidItemsWeight: 20,
        status: 'Submitted',

        contact : '9535311386',
        address : "#221 B, Baker's Street",
        cost : 200
    },
   ];
   const bidsWon = [{
    companyName: 'Old Books',
    bidDuration: '18th January 2000 - 17th January 2001',
    bidItems : ['Metals'],
    bidItemsWeight: 15,
    status: 'Closed',
    contact : '9535311386',
        address : "#221 B, Baker's Street",
       
        cost : 500
   
},{
    companyName: 'Wood Scrap',
    bidDuration: '18th January 2000 - 17th January 2001',
    bidItems : ['Metals'],
    bidItemsWeight: 15,
    status: 'Closed',
    awardedTo: 'New Scrap Collectors',
    contact : '9535311386',
        address : "#221 B, Baker's Street",
       cost : 500
    
},{
    companyName: 'Metal Waste',
    bidDuration: '18th January 2000 - 17th January 2001',
    bidItems : ['Metals'],
    bidItemsWeight: 15,
    status: 'Closed',
    awardedTo: 'New Scrap Collectors',
    contact : '9535311386',
        address : "#221 B, Baker's Street",
       cost : 500
},{
    companyName: 'Glass Scrap',
    bidDuration: '18th January 2000 - 17th January 2001',
    bidItems : ['Glass'],
    bidItemsWeight: 20,
    status: 'Closed',
    contact : '9535311386',
        address : "#221 B, Baker's Street",
       cost : 500

},
];

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
        <Text style={styles.tabWord}>{words.bidsSubmitted}</Text>
     
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => {
            setTab(3);
        }} style={tab == 3 ? styles.tab : {...styles.tab,backgroundColor: 'transparent'}}>
        <Text style={styles.tabWord}>{words.bidsWon}</Text>
     
        </TouchableWithoutFeedback>

        </View>)

    }

    const renderCard = (cardDetails) => {
        if(tab == 1){
        return(<View onLayout={(event) => {
            setCardWidth(event.nativeEvent.layout.width);
        }}  style={styles.card}>
     
            <Text style={{...styles.cardTitle,fontSize:16}}>{cardDetails.companyName}</Text>
           
         
            
            {/* <View style={{flexDirection: 'row',flex:1}}>
            <AntDesign name="tago"size={20} color= {Colors.primary} />
            <Text style={{...styles.cardTitle,flex:1,marginStart:'3%',fontSize:16}}>{`Number of bids: ${cardDetails.contact}`}</Text>
            </View> */}

           
           
       
        <Text style={{...styles.cardTitle,color:'gray',marginVertical:'5%'}}>{cardDetails.bidDuration}</Text>
        <View style={{flexDirection:'row'}}>
        <Entypo name="map" size={18} color="gray" />
        <Text style={{...styles.cardTitle,color:'gray'}}>#221 B, Baker Street</Text>


        </View>
        <View style={{flexDirection:'row'}}>
        <Entypo name="phone" size={18} color= {Colors.primary} />
        <Text style={{...styles.cardTitle,color:Colors.primary}}>{cardDetails.contact}</Text>


        </View>

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
                {/* <View style={{flexDirection:'row',marginTop: '6%'}}>
                <Text style={{...styles.cardTitle,alignItems: 'flex-end',color:Colors.blue,marginVertical:'5%',fontSize:16}}>Active</Text>
      
            <AntDesign name="tago"size={15} color= {Colors.primary} style={{alignSelf:'center',marginStart: cardWidth/4.5}}/>
            <Text numberOfLines={1} style={{...styles.cardTitle,flex:1,marginStart:'1%',marginVertical:'5%'}}>{`Number of bids: ${cardDetails.contact}`}</Text>

            </View> */}



        </View>)}
return(<View style={styles.card}>
    <View style={{flexDirection: 'row',width: dimen.width-dimen.width/10}}>
        <Text style={{...styles.cardTitle,fontSize:16}}>{cardDetails.companyName}</Text>

        <View style={{flexDirection: 'row',flex:1,marginStart:'20%'}}>
        </View>

       
       
    </View>
    <Text style={{...styles.cardTitle,color:'gray',marginVertical:'5%'}}>{openBidArray[0].bidDuration}</Text>
    <View style={{flexDirection:'row'}}>
        <Entypo name="map" size={18} color="gray" />
        <Text style={{...styles.cardTitle,color:'gray'}}>{cardDetails.address}</Text>


        </View>
        <View style={{flexDirection:'row'}}>
        <Entypo name="phone" size={18} color= {Colors.primary} />
        <Text style={{...styles.cardTitle,color:Colors.primary}}>{cardDetails.contact}</Text>


        </View>
{tab == 3 ?
    <View style={{flexDirection:'row'}}>
<FontAwesome5 name="money-bill-wave-alt" size={17} color="#E0BA3F" style={{alignSelf:'center'}} />       
<Text style={{...styles.cardTitle,color:"#E0BA3F"}}>{" ₹" +cardDetails.cost}</Text>


</View> : null}

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


            <Text style={{...styles.cardTitle,alignItems: 'flex-end',color: Colors.blue,marginVertical:'5%',fontSize:16}}>{cardDetails.status == "Closed" ? cardDetails.status: cardDetails.status}</Text>


    </View>)



    }
    const setData = () => {
        if(tab == 1)
        return openBidArray;
        if (tab == 2)
        return bidsSubmitted;
        return bidsWon;
        
    }

   

    return(<View>
 <AppBar  back={true} funct={() => {
       navigation.goBack();
        }} />

        <View style={{...Styles.parentContainer,backgroundColor: Colors.whiteBackground}}>
    
        {renderTabs()}
    
        <View style={{flex:1,paddingBottom: dimen.height/17}}>
        <FlatList 
           
          
            data = {setData()}
            renderItem = {({item}) => {
                let cardDetails = {
        companyName: item.companyName,
        bidDuration: item.bidDuration,
        bidItems: item.bidItems[0],
        bidItemsWeight: item.bidItemsWeight,
        contact: item.contact,
        status: item.status,
        awardedTo: item.awardedTo,
        pickUpTimeSlot: item.pickUpTimeSlot,
        manpower : item.manpower,
        insurance : item.insurance,
        vehicle : item.vehicle,
        cost : item.cost,
        address: item.address
      
                }
                const selectTab = () => {
                    if(tab == 1)
                    return 'Open'
                    if(tab == 2)
                    return 'Submittied'
                    return 'Won'
                }
                return(<TouchableOpacity onPress={() => {
            navigation.navigate('VendorBidDetails', {
                ...cardDetails,
                tag : selectTab()
                })
        }}>
                {renderCard(cardDetails)}
                </TouchableOpacity>)
                 
            }}
        />
      {/* <View style={{alignItems: 'center'}}>
      <SubmitButton 
      text='+ Make a new bid' 
      onTouch = {() => {navigation.navigate('BidCreation1')
       
      }}
      />
      </View>
     */}
    
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
        width: (dimen.width-dimen.width/10)/3,
        aspectRatio:(10/1.5)/3,
        borderRadius: 15,
        backgroundColor:'#43E0B4' ,
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
