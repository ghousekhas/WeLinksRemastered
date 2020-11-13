import React,{useState} from 'react';
import {View,StyleSheet,Text,TouchableOpacity,ScrollView} from 'react-native';
import {RadioButton} from 'react-native-paper';
import ExpandableTextBox from '../components/ExpandableTextBox';
import AppBar from '../components/AppBar';
import TextBox from '../components/TextBox';
import { Styles,dimen,Colors, Config } from '../Constants';
import SubmitButton from '../components/SubmitButton';
import Axios from 'axios';
import qs from 'qs';


export default function BidCreation2({navigation,route}){
    const [vehicle,setVehicle]=useState(null);
    const [manpower,setManPower]=useState(null);
    const [insurance,setInsurance]=useState(null);
    const [notes,setNotes]=useState('');
    const {actualUser,address,cat,weight,time,pick,end,start,title} = route.params;


    const radioView=(title,factor,setter)=>{
        return( <ScrollView>
        <View style={styles.vertical}>
                <Text style={{...Styles.subbold,fontWeight:'bold'}}>{title} </Text>
                <View style={styles.horizontal}>
                    <RadioButton 
                        value="1"
                        status={factor==="1"?'checked': 'unchecked'}
                        onPress={()=>setter("1")}/>
                    <Text style={{...Styles.subbold,marginRight: 10}}>Yes</Text>
                     <RadioButton 
                        value="1"
                        status={factor==="0"?'checked': 'unchecked'}
                        onPress={()=>setter("0")}/>
                    <Text style={Styles.subbold}>No</Text>

                </View>

            </View>
            
            </ScrollView>
        )

    }

    return(
       <View>
        <AppBar back funct={() => navigation.pop()} />
        <View style={Styles.parentContainer}>
           <Text style={styles.heading}>Please enter your bid details</Text>
           <ScrollView style={styles.scroll}>
           {radioView('Do you require a vehicle?',vehicle,setVehicle)}
           {radioView('Do you require man power?',manpower,setManPower)}
           {radioView('Do you require insurance',insurance,setInsurance)}
           
         <ExpandableTextBox title="Additional notes" hint="Any additional information for vendors." changeText={setNotes}/>
         <View style={styles.button}>
                   <SubmitButton text='Next' onTouch={()=>{
                       Axios.post(Config.api_url+'php?'+qs.stringify({
                        action: 'createCorporateBid',
                        bid_title: title,
                        bid_startdate: start,
                        bid_enddate: end,
                        //bid_status:
                        user_id: actualUser.user_id,
                        bid_addr_id: address.addr_id,
                        bid_pickupdate: pick,
                        bid_timeslot:  time,
                        bid_category_id: parseInt( cat),
                        bid_quantity_id:  parseInt(weight),
                        vehicle_need: parseInt(vehicle),
                        manpower_need: parseInt( manpower),
                        insurance_need:  parseInt(insurance),
                        bid_notes: notes,
                        bid_cancelled_notes: "asa "
                       }),).then((value)=>{
                           console.log('req',value.request);
                           console.log(value.data);
                           alert('Bid created successfully');
                           navigation.popToTop();

                        
                       })
                   }} />

            </View>
       </ScrollView>


          
            
</View>
  
        </View>
    )

}

const styles=StyleSheet.create({
    horizontal:{
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center'
    },
    vertical:{
        flexDirection: 'column',
        marginHorizontal: dimen.width*0.05,
        marginVertical: dimen.width*0.02,
        flex: 1
    },
    button:{alignSelf: 'center',marginVertical: 10,justifyContent: 'center',
       
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '15%'
    
},
    scroll:{
        position: 'absolute',
        bottom: dimen.height/15+30,
        top: dimen.height/15+15
    },
    heading:{
        color: 'black',
        margin: '5%',
        fontSize: 20,
        marginVertical: '5%',
        fontWeight: 'bold'
      }

})