import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet,ScrollView,FlatList,TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {Colors, TextSpinnerBoxStyles,dimen,Styles} from '../Constants';
import GenericSeperator from '../components/GenericSeperator';
import AppBar from '../components/AppBar';
import moment from 'moment';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import SubmitButton from '../components/SubmitButton';

export default function TitleBidDetails({navigation,route}){
 const  cardDetails  = route.params;
 const { tag } = route.params;

 console.log(cardDetails)
  console.log(tag)
    const [title,stitle]=useState("Bid Title");
    const [address,sAddress]=useState('No.17, 23rd Cross 18th A main road, G Block, Sahakarnagar, Bangalore - 560092.')

    const renderItem=({item})=>{
        return (
            <Text style={
                {
                    fontSize: 15,
                    color: 'black',
                    padding: 20
                }
            }>Local Vendor</Text>
        )
    }

    const renderHeader=()=>{
        return (<View style={{flex: 0}}>
            <Text style={{...Styles.heading,alignSelf: 'center'}}>Bid Details</Text>
            <View style={styles.bidcard}>
                <Text style={styles.title}>{cardDetails.bidTitle}</Text>
                <Text style={styles.info}> {address}</Text>
                <View style={styles.duration}>
                    <Text style={{...styles.title,color: 'gray',marginVertical: '3%'}}> {moment().toString()} </Text>
                    <Text style={{...Styles.subbold,fontWeight: '700'}}></Text>
                </View>
                <View style={{...styles.duration,paddingVertical: 0,justifyContent: 'space-between'}}>
                    <View style={{...styles.duration,borderStyle: 'dashed',borderRadius: 10,borderWidth: 2,borderColor: Colors.primary,justifyContent: 'flex-start',alignSelf: 'center'}}>
                        <MaterialCommunityIcons name="anvil" size={24} color="black" style={{paddingHorizontal: 5,paddingVertical: 2}} />
                        <Text style={{...Styles.subbold,fontWeight: 'bold',paddingLeft: 5,alignSelf: 'center',paddingVertical: 2,paddingRight: 10}}>{cardDetails.bidItems}</Text>
                    </View>
                    <View style={{...styles.duration,borderStyle: 'dashed',borderRadius: 10,borderWidth: 2,borderColor: Colors.seperatorGray,justifyContent: 'flex-start',alignSelf: 'center'}}>          
                        <Text style={{...Styles.subbold,fontWeight: 'bold',paddingLeft: 5,alignSelf: 'center',paddingVertical: 2,paddingLeft: 10}}>{cardDetails.bidItemsWeight}</Text>
                        <MaterialCommunityIcons name="weight-kilogram" size={25} color="black" style={{paddingHorizontal: 5,paddingVertical: 2,alignSelf: 'center'}} />
                    </View>
                    <View style={{...styles.duration,borderStyle: 'dashed',borderRadius: 10,borderWidth: 2,borderColor: Colors.primary,justifyContent: 'flex-start',alignSelf: 'center'}}>
                        <AntDesign name="clockcircleo" size={24} color="black" style={{paddingHorizontal: 5,paddingVertical: 2}}/>
                        <Text style={{...Styles.subbold,fontWeight: 'bold',paddingLeft: 5,alignSelf: 'center',paddingVertical: 2,paddingRight: 10}}>{cardDetails.pickUpTimeSlot}</Text>
                    </View>
                </View>
                <View style={styles.duration}>
                <View style={{flexDirection: 'row',alignItems:'center',justifyContent: 'space-between'}}>
                    <Text style={{alignSelf: 'center',fontWeight: 'bold',marginTop: '4%',paddingVertical:2}}>Require: </Text>
                    {cardDetails.manpower ? 
                    <View style={{...styles.requirementsButton,backgroundColor: Colors.primary,marginTop:'2%'}}>
                  
                        <Text style={{...Styles.subbold,paddingHorizontal: 0.2,paddingVertical: 2,color: 'white'}}>Manpower</Text>
                    </View> : null}
                    {cardDetails.insurance ? 
                    <View style={{...styles.requirementsButton,backgroundColor: Colors.primary}}>
                        <Text style={{...Styles.subbold,paddingHorizontal: 0.2,paddingVertical: 2,color: 'white'}}>Insurance</Text>
                    </View>  : null}

                   {cardDetails.vehicle ?  <View style={{...styles.requirementsButton,backgroundColor: Colors.primary}}>
                        <Text style={{...Styles.subbold,paddingHorizontal: 0.2,paddingVertical: 2,color: 'white'}}>Vehicle</Text>
                    </View> : null}
                    </View>
                </View>
                <View style={{flex: 0}}>
                    <Text style={{...styles.title}}>Additional Notes</Text>
                    <Text style={{...styles.info}}>There's a hope that's waiting for you in the dark.</Text>
                </View>
                <View>
                    <Text style={{...styles.title,marginVertical:'3%',color: Colors.blue}}>Bid Status</Text>
                </View>
            </View>
            {/* <SubmitButton text='Cancel Bid' /> */}
            {tag == 'Open'  ?
            <TouchableOpacity style={styles.cancelButton} onPress={()=>{
                // alert('Are you sure you want to cancel this bid?');
                navigation.navigate('CancellationScreen',{
                    bidTitle : cardDetails.bidTitle
                    });
            }}>
                <Text style={styles.cancelText}>Cancel Bid</Text>
            </TouchableOpacity>
            : <View style={{marginTop : dimen.height/50}} /> }
            <Text style={{...Styles.heading,alignSelf:'center', marginTop : dimen.height/20}}>Bids Received</Text>

        </View>
        )
    }

    

    return(<View>
     <AppBar 
     back
      funct={() => {
        navigation.pop();
         }} />

         <View style={{...Styles.parentContainer,backgroundColor: Colors.whiteBackground}}>
         
        <FlatList
            ListHeaderComponent={renderHeader}
            data={[1,2,3,4,5,6,7,8]}
            renderItem={renderItem}
            ItemSeparatorComponent={()=><GenericSeperator/>}/>
            </View>
            </View>
            
    )
}

const styles=StyleSheet.create({
    bidcard:{
        width: dimen.width-dimen.width/10,
        // height: dimen.height/3.8,
        borderRadius: 15,
        borderColor: Colors.seperatorGray,
        borderWidth: 0.5,
       padding:'2%',
        marginTop: '5%',
        alignSelf: 'center',
        backgroundColor: 'white',
        elevation: 1
    },
    duration:{
        paddingVertical: 5,
        paddingHorizontal: 3,
        margin: 3,
        borderStyle: 'dashed',
        borderColor: Colors.primary,
        flexDirection: 'row'
    },
    requirementsButton:{
        paddingVertical: '0.5%',
        paddingHorizontal: 10,
        alignSelf: 'baseline',
        borderRadius: 10,
        marginHorizontal: '1%'
    },
    cancelText:{
        ...Styles.subbold,
        color: 'white',
        textAlign: 'center',
        alignSelf: 'center',
        fontWeight: '700',
        padding: 15
    },
    cancelButton:{
        backgroundColor: Colors.red,
        // height: '100%',
        width: '97%',
        aspectRatio: 10/1.4,
        borderRadius: 5,
        alignSelf:'center',
        marginVertical: '5%'
        
    },
    title: {
        fontWeight: 'bold',
        color: Colors.primary,
        padding: '1%',
        fontSize: 16,
    },
    info:{
        padding: '1%',
        fontSize: 14,
        marginTop:'3%',
        flex: 1,
       

    }
})