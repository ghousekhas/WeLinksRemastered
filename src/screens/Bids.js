import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet,ScrollView,FlatList,TouchableOpacity, Dimensions} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {Colors, TextSpinnerBoxStyles,dimen,Styles} from '../Constants';
import GenericSeperator from '../components/GenericSeperator';
import {Ionicons} from '@expo/vector-icons';
import AppBar from '../components/AppBar';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';

import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function Bids({navigation}){
    const words = {
        openBids: 'Open Bids',
        closedBids: 'Closed Bids'
    }
    const [tab,setTab]=useState(1);
    const openBidArray = [{
        bidTitle: 'Fiesty First',
        bidDuration: '18th January 2000 - 17th January 2001',
        bidItems : ['Metals'],
        bidItemsWeight: 15,
        bidders : 14
    },{
        bidTitle: 'Sensational Second',
        bidDuration: '18th January 2000 - 17th January 2001',
        bidItems : ['Metals'],
        bidItemsWeight: 15,
        bidders : 6
    },{
        bidTitle: 'Terrific Third',
        bidDuration: '18th January 2000 - 17th January 2001',
        bidItems : ['Metals'],
        bidItemsWeight: 15,
        bidders : 10
    },{
        bidTitle: 'Fabulous Fourth',
        bidDuration: '18th January 2000 - 17th January 2001',
        bidItems : ['Metals'],
        bidItemsWeight: 15,
        bidders : 10
    }];
    const closedBidArray = [{
        bidTitle: 'Fiesty First Frozen',
        bidDuration: '18th January 2000 - 17th January 2001',
        bidItems : ['Metals'],
        bidItemsWeight: 15,
        status: 'Cancelled',
       
    },{
        bidTitle: 'Sensational Second Successful',
        bidDuration: '18th January 2000 - 17th January 2001',
        bidItems : ['Metals'],
        bidItemsWeight: 15,
        status: 'Closed',
        awardedTo: 'Mr. Vendor'
        
    },{
        bidTitle: 'Terrific Third Triumphed',
        bidDuration: '18th January 2000 - 17th January 2001',
        bidItems : ['Metals'],
        bidItemsWeight: 15,
        status: 'Closed',
        awardedTo: 'Mr. Vendor'
    },{
        bidTitle: 'Fabulous Fourth Failed',
        bidDuration: '18th January 2000 - 17th January 2001',
        bidItems : ['Metals'],
        bidItemsWeight: 15,
        status: 'Cancelled'

    }];

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
        return(<View  style={styles.card}>
     
            <Text style={{...styles.cardTitle,fontSize:16}}>{cardDetails.bidTitle}</Text>
           
         
            
            {/* <View style={{flexDirection: 'row',flex:1}}>
            <AntDesign name="tago"size={20} color= {Colors.primary} />
            <Text style={{...styles.cardTitle,flex:1,marginStart:'3%',fontSize:16}}>{`Number of bids: ${cardDetails.bidders}`}</Text>
            </View> */}

           
           
       
        <Text style={{...styles.cardTitle,color:'gray',marginVertical:'5%'}}>{openBidArray[0].bidDuration}</Text>

        <View style={{...styles.duration,paddingVertical: 0,justifyContent: 'space-between'}}>
                    <View style={{...styles.duration,borderStyle: 'dashed',borderRadius: 10,borderWidth: 2,borderColor: Colors.primary,justifyContent: 'flex-start',alignSelf: 'center'}}>
                        <MaterialCommunityIcons name="anvil" size={24} color="black" style={{paddingHorizontal: 5,paddingVertical: 2}} />
                        <Text style={{...Styles.subbold,fontWeight: 'bold',paddingLeft: 5,alignSelf: 'center',paddingVertical: 2,paddingRight: 10}}>Metal</Text>
                    </View>
                    <View style={{...styles.duration,borderStyle: 'dashed',borderRadius: 10,borderWidth: 2,borderColor: Colors.seperatorGray,justifyContent: 'flex-start',alignSelf: 'center',padding:'1%'}}>          
                        <MaterialCommunityIcons name="weight-kilogram" size={25} color="black" style={{paddingHorizontal: 5,paddingVertical: 2,alignSelf: 'center'}} />
                        <Text style={{...Styles.subbold,fontWeight: 'bold',paddingLeft: 5,alignSelf: 'center',paddingVertical: 2,paddingRight: 10}}>9-12</Text>

                    </View>
                    <View style={{...styles.duration,borderStyle: 'dashed',borderRadius: 10,borderWidth: 2,borderColor: Colors.primary,justifyContent: 'flex-start',alignSelf: 'center'}}>
                        <AntDesign name="clockcircleo" size={24} color="black" style={{paddingHorizontal: 5,paddingVertical: 2}}/>
                        <Text style={{...Styles.subbold,fontWeight: 'bold',paddingLeft: 5,alignSelf: 'center',paddingVertical: 2,paddingRight: 10}}>9-12</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',marginTop: '6%'}}>
                <Text style={{...styles.cardTitle,alignItems: 'flex-end',color:Colors.blue,marginVertical:'5%',fontSize:16}}>Active</Text>
      
            <AntDesign name="tago"size={15} color= {Colors.primary} style={{alignSelf:'center',marginStart:'35%'}}/>
            <Text style={{...styles.cardTitle,flex:1,marginStart:'1%',marginVertical:'5%'}}>{`Number of bids: ${cardDetails.bidders}`}</Text>

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
                <View style={{...styles.duration,borderStyle: 'dashed',borderRadius: 10,borderWidth: 2,borderColor: Colors.primary,justifyContent: 'flex-start',alignSelf: 'center'}}>
                    <MaterialCommunityIcons name="anvil" size={24} color="black" style={{paddingHorizontal: 5,paddingVertical: 2}} />
                    <Text style={{...Styles.subbold,fontWeight: 'bold',paddingLeft: 5,alignSelf: 'center',paddingVertical: 2,paddingRight: 10}}>Metal</Text>
                </View>
                <View style={{...styles.duration,borderStyle: 'dashed',borderRadius: 10,borderWidth: 2,borderColor: Colors.seperatorGray,justifyContent: 'flex-start',alignSelf: 'center',padding:'1%'}}>          
                    <MaterialCommunityIcons name="weight-kilogram" size={25} color="black" style={{paddingHorizontal: 5,paddingVertical: 2,alignSelf: 'center'}} />
                    <Text style={{...Styles.subbold,fontWeight: 'bold',paddingLeft: 5,alignSelf: 'center',paddingVertical: 2,paddingRight: 10}}>9-12</Text>

                </View>
                <View style={{...styles.duration,borderStyle: 'dashed',borderRadius: 10,borderWidth: 2,borderColor: Colors.primary,justifyContent: 'flex-start',alignSelf: 'center'}}>
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
    
        <View style={{flex:1}}>
        <FlatList 
            
            data = {tab == 1 ? openBidArray : closedBidArray}
            renderItem = {({item}) => {
                let cardDetails = {
        bidTitle: item.bidTitle,
        bidDuration: item.bidDuration,
        bidItems : item.bidItems[0],
        bidItemsWeight: item.bidItemsWeight,
        bidders:item.bidders,
        status:item.status,
        awardedTo: item.awardedTo
                }
                return(<TouchableOpacity onPress={() => {
            navigation.navigate('TitleBidDetails', {
                bidTitle : item.bidTitle,
                bidDuration : item.bidDuration,
                status : item.status
            }
         )
        }}>
                {renderCard(cardDetails)}
                </TouchableOpacity>)
                 
            }}
        />
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
        height: dimen.height/3.4,
        borderRadius: 15,
        borderColor: Colors.seperatorGray,
        borderWidth: 0.5,
       padding:'2%',
        marginTop: '5%',
        alignSelf: 'center',
        backgroundColor: 'white',
        elevation: 1
        
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
        borderStyle: 'dashed',
        borderColor: Colors.primary,
        flexDirection: 'row'
    },
})
