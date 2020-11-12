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

import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function Bids({navigation}){
    const words = {
        openBids: 'Open Bids',
        closedBids: 'Closed Bids'
    }
    const [tab,setTab]=useState(1);
    const [cardWidth,setCardWidth] = useState(0);
    const openBidArray = [{
        bidTitle: 'Heavy Metals',
        bidDuration: '18th January 2000 - 17th January 2001',
        bidItems : ['Metals'],
        bidItemsWeight: 40,
        bidders : 14,
        pickUpTimeSlot: "7-10",
        manpower : true,
        insurance : false,
        vehicle: true
    },{
        bidTitle: 'Paper Scrap',
        bidDuration: '18th January 2000 - 17th January 2001',
        bidItems : ['Paper'],
        bidItemsWeight: 15,
        bidders : 6,
        pickUpTimeSlot: "7-10",
        manpower : true,
        insurance : true,
        vehicle: false   
    },{
        bidTitle: 'Broken Electronics',
        bidDuration: '18th January 2000 - 17th January 2001',
        bidItems : ['Electronics'],
        bidItemsWeight: 5,
        bidders : 10,
        pickUpTimeSlot: "7-10",
        manpower : true,
        insurance : false,
        vehicle: false
    },{
        bidTitle: 'Tyre Scrap',
        bidDuration: '18th January 2000 - 17th January 2001',
        bidItems : ['Metals'],
        bidItemsWeight: 25,
        bidders : 3,
        pickUpTimeSlot: "7-10",
        manpower : true,
        insurance : true,
        vehicle: true
    },
    {
        bidTitle: 'Plastics',
        bidDuration: '18th January 2000 - 17th January 2001',
        bidItems : ['Plastics'],
        bidItemsWeight: 30,
        bidders : 8,
        pickUpTimeSlot: "7-10",
        manpower : true,
        insurance : true,
        vehicle: true
    },{
        bidTitle: 'Old Books',
        bidDuration: '18th January 2000 - 17th January 2001',
        bidItems : ['Paper'],
        bidItemsWeight: 10,
        bidders : 10,
        pickUpTimeSlot: "7-10",
        manpower : true,
        insurance : true,
        vehicle: true
    }];
    const closedBidArray = [{
        bidTitle: 'Old Books',
        bidDuration: '18th January 2000 - 17th January 2001',
        bidItems : ['Metals'],
        bidItemsWeight: 15,
        status: 'Cancelled',
       
    },{
        bidTitle: 'Wood Scrap',
        bidDuration: '18th January 2000 - 17th January 2001',
        bidItems : ['Metals'],
        bidItemsWeight: 15,
        status: 'Closed',
        awardedTo: 'New Scrap Collectors'
        
    },{
        bidTitle: 'Metal Waste',
        bidDuration: '18th January 2000 - 17th January 2001',
        bidItems : ['Metals'],
        bidItemsWeight: 15,
        status: 'Closed',
        awardedTo: 'New Scrap Collectors'
    },{
        bidTitle: 'Glass Scrap',
        bidDuration: '18th January 2000 - 17th January 2001',
        bidItems : ['Glass'],
        bidItemsWeight: 20,
        status: 'Cancelled'

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
    <Text style={{...styles.cardTitle,color:'gray',marginVertical:'5%'}}>{openBidArray[0].bidDuration}</Text>

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
 <AppBar  funct={() => {
       navigation.toggleDrawer();
        }} />

        <View style={{...Styles.parentContainer,backgroundColor: Colors.whiteBackground}}>
    
        {renderTabs()}
    
        <View style={{flex:1,paddingBottom: dimen.height/17}}>
        <FlatList 
            style={{marginBottom:'5%'}}
          
            data = {tab == 1 ? openBidArray : closedBidArray}
            renderItem = {({item}) => {
                let cardDetails = {
        bidTitle: item.bidTitle,
        bidDuration: item.bidDuration,
        bidItems: item.bidItems[0],
        bidItemsWeight: item.bidItemsWeight,
        bidders: item.bidders,
        status: item.status,
        awardedTo: item.awardedTo,
        pickUpTimeSlot: item.pickUpTimeSlot,
        manpower : item.manpower,
        insurance : item.insurance,
        vehicle : item.vehicle
      
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
      onTouch = {() => {navigation.navigate('BidCreation1')
       
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
