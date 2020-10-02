import React,{useState} from 'react';
import {View,StyleSheet,Text,TouchableOpacity,ScrollView} from 'react-native';
import {RadioButton} from 'react-native-paper';
import ExpandableTextBox from '../components/ExpandableTextBox';
import AppBar from '../components/AppBar';
import TextBox from '../components/TextBox';
import { Styles,dimen,Colors } from '../Constants';
import SubmitButton from '../components/SubmitButton';


export default function BidCreation2({navigation,route}){
    const [vehicle,setVehicle]=useState(null);
    const [manpower,setManPower]=useState(null);
    const [insurance,setInsurance]=useState(null);
    const [notes,setNotes]=useState('');


    const radioView=(title,factor,setter)=>{
        return( <ScrollView>
        <View style={styles.vertical}>
                <Text style={{...Styles.subbold,fontWeight:'bold'}}>{title} </Text>
                <View style={styles.horizontal}>
                    <RadioButton 
                        value="yes"
                        status={factor==="yes"?'checked': 'unchecked'}
                        onPress={()=>setter("yes")}/>
                    <Text style={{...Styles.subbold,marginRight: 10}}>Yes</Text>
                     <RadioButton 
                        value="yes"
                        status={factor==="no"?'checked': 'unchecked'}
                        onPress={()=>setter("no")}/>
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
                   <SubmitButton text='Next' />

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