import React,{useState} from 'react';
import {View,FlatList,StyleSheet,Text,ScrollView,TouchableOpacity, Dimensions} from 'react-native';
import { Colors, Constants, dimen, Styles } from '../Constants';
import Textbox from '../components/TextBox';
import Button from '../components/Button';
import SubmitButton from '../components/SubmitButton';
import DropDownPicker from 'react-native-dropdown-picker';
import {Picker} from '@react-native-community/picker';
import SpinnerBox from '../components/Spinner';

const a=[];
for(var i=0;i<10;i++)
    a.push({label: i.toString(),value: i.toString()})

export default function BidCreation1({navigation}){
    const [dropdwon,setDropdown]=useState('');
    const [screenState,setScreenState]=useState('');
   

    const strings={
        bidTitle: 'Please enter your bid details'
    }

    return(<View style={{...StyleSheet.absoluteFill,flexDirection: 'column',backgroundColor: 'white'}}>
            <Text style={{...Styles.heading,alignSelf: 'center'}}>Live</Text>
            <ScrollView>
                <Textbox title={'BID TITLE'} hint={'TITLE'}/>
                <SpinnerBox title="CHOOSE PICKUP ADDRESS"
                    data={a}
                    changeOption={setDropdown} />              
                <Textbox title={'BID DURATION'} hint={'CALENDAR'}/>
                <Textbox title={'PICKUP DATE'} hint={'hint'}/>
                <SpinnerBox title="PICKUP TIME SLOT"
                    data={a}
                    changeOption={setDropdown} />   
                 <SpinnerBox title="SCRAP CATEGORY"
                    data={a}
                    changeOption={setDropdown} />   
                 <SpinnerBox title="APPROXIMATE WEIGHT"
                    data={a}
                    changeOption={setDropdown} />   
            </ScrollView>
            <TouchableOpacity onPress={()=>{navigation.navigate('Homescreen')}} >
                <View style={{height: dimen.height/15,width: dimen.width*0.9,alignSelf: 'center',marginVertical: 10,backgroundColor: Colors.primary,justifyContent: 'center'}}>
                    <Text style={{alignSelf: 'center',...Styles.subbold}}>Next</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}