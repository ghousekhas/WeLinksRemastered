import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet,ScrollView,FlatList,TouchableOpacity, Dimensions} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {Colors, TextSpinnerBoxStyles,dimen,Styles} from '../Constants';
import GenericSeperator from '../components/GenericSeperator';
import {Ionicons} from '@expo/vector-icons';
import AppBar from '../components/AppBar';
import SubmitButton from '../components/SubmitButton'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import Axios from 'axios';
import SubscriptionOrder from '../components/SubscriptionOrder';

var data=[];


export default function MySubscriptions({navigation}){
    const [extraData,setExtraData]=useState(0);

    useEffect(()=>{
        Axios.get('https://api.dev.we-link.in/user_app.php?action=getSubscriptions&user_id='+'2')
        .then((response)=>{
            console.log(response.data);
            data=response.data;
            setExtraData(Math.random(0.5));
        },(error)=>{
            console.log(error);
        })
    },[]);
    

    
    const renderCard = (cardDetails) => {
        const {name,quantity,rate,num,days,startDate,endDate,bought,imageUrl}=cardDetails;
       
        return(
            <View>
                <SubscriptionOrder name={name} quantity={quantity} rate={rate} num={nuum} days={days} startDate={startDate} endDate={endDate} bought={bought} imageUrl={imageUrl} />
            </View>
        )
    }


   

    return(<View>
 <AppBar funct={() => {
       navigation.toggleDrawer();
        }} />

        <View style={{...Styles.parentContainer,backgroundColor: Colors.whiteBackground}}>
        <Text style={{...Styles.heading,alignSelf: 'center',paddingVertical: dimen.height/100}}>Your subscriptions</Text>
        <View style={{flex:1,paddingBottom: '35%'}}>
        <FlatList 
            style={{marginBottom:'5%'}}
            extraData={extraData}
            data = {data}
            renderItem = {({item}) => {
                let cardDetails = {
                    
                }
                return(<TouchableOpacity onPress={() => {
            navigation.navigate('TitleBidDetails', cardDetails)
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
        borderStyle: 'dashed',
        borderColor: Colors.primary,
        flexDirection: 'row'
    },
})
