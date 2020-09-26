import React,{useState} from 'react';
import {View,StyleSheet,Text,TouchableOpacity,ScrollView} from 'react-native';
import {RadioButton} from 'react-native-paper';
import ExpandableTextBox from '../components/ExpandableTextBox';
import TextBox from '../components/TextBox';
import { Styles,dimen,Colors } from '../Constants';


export default function BidCreation2({navigation,route}){
    const [vehicle,setVehicle]=useState(null);
    const [manpower,setManPower]=useState(null);
    const [insurance,setInsurance]=useState(null);
    const [notes,setNotes]=useState('');


    const radioView=(title,factor,setter)=>{
        return(
            <View style={styles.vertical}>
                <Text style={Styles.subbold}>{title} </Text>
                <View style={styles.horizontal}>
                    <RadioButton 
                        value="yes"
                        status={factor==="yes"?'checked': 'unchecked'}
                        onPress={()=>setter("yes")}/>
                    <Text style={{...Styles.subbold,marginRight: 10}}>YES</Text>
                     <RadioButton 
                        value="yes"
                        status={factor==="no"?'checked': 'unchecked'}
                        onPress={()=>setter("no")}/>
                    <Text style={Styles.subbold}>NO</Text>

                </View>

            </View>
        )

    }

    return(
       <View style={{flex: 1}}>
           <Text style={Styles.heading}>Please enter your bid details</Text>
           <ScrollView style={styles.scroll}>
           {radioView('NEED VEHICLE?',vehicle,setVehicle)}
           {radioView('NEED MANPOWER?',manpower,setManPower)}
           {radioView('NEED INSURANCE?',insurance,setInsurance)}
            <ExpandableTextBox title="ADDITIONAL NOTES" hint="NOTES" changeText={setNotes}/>
           </ScrollView>

           <TouchableOpacity style={styles.button} onPress={()=>{return null}} >
                    <Text style={{...Styles.subbold}}>Next</Text>
            </TouchableOpacity>
          

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
        marginVertical: dimen.width*0.02
    },
    button:{height: dimen.height/15,width: dimen.width*0.9,alignSelf: 'center',marginVertical: 10,backgroundColor: Colors.primary,justifyContent: 'center',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    bottom:0},
    scroll:{
        position: 'absolute',
        bottom: dimen.height/15+30,
        top: dimen.height/15+15
    }

})