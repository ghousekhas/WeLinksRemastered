import React,{useState} from 'react';
import {View,FlatList,StyleSheet,Text,ScrollView,TouchableOpacity, Dimensions} from 'react-native';
import { Colors, Constants, dimen, Styles } from '../Constants';
import Textbox from '../components/TextBox';
import Button from '../components/Button';
import SubmitButton from '../components/SubmitButton';
import DropDownPicker from 'react-native-dropdown-picker';
import {Picker} from '@react-native-community/picker';
import SpinnerBox from '../components/Spinner';
import AppBar from '../components/AppBar';

const a=[];
for(var i=0;i<10;i++)
    a.push({label: i.toString(),value: i.toString()})

export default function BidCreation1({navigation}){
    const [dropdwon,setDropdown]=useState('');
    const [screenState,setScreenState]=useState('');
   

    const strings={
        bidTitle: 'Please enter your bid details'
    }

    return(<View>
    <AppBar back funct={() => navigation.pop()} />
    <View style={{...Styles.parentContainer,color: Colors.whiteBackground}}>
            <Text style={styles.heading}>{strings.bidTitle}</Text>
            <ScrollView style={{marginBottom:'10%'}}>
            <View style={{flex:1,marginBottom: '30%',marginTop: '5%'}}>
                <Textbox title={'BID TITLE'} hint={'Title'}/>
                <SpinnerBox title="CHOOSE PICKUP ADDRESS"
                    data={a}
                    changeOption={setDropdown} />              
                <Textbox title={'BID DURATION'} hint={'Calendar'}/>
                <Textbox title={'PICKUP DATE'} hint={'DDMMYYYY'}/>
                <SpinnerBox title="PICKUP TIME SLOT"
                    data={a}
                    changeOption={setDropdown} />   
                 <SpinnerBox title="SCRAP CATEGORY"
                    data={a}
                    changeOption={setDropdown} />   
                 <SpinnerBox title="APPROXIMATE WEIGHT"
                    data={a}
                    changeOption={setDropdown} /> 
                    <View style={{marginTop:'5%'}}> 
                    <SubmitButton text='Next' styles={{marginTop:'5%'}} onTouch={() => navigation.navigate('BidCreation2')} />
                    </View> 
         
            </View>
            </ScrollView>
           
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    heading:{
        color: 'black',
        margin: '5%',
        fontSize: 20,
        marginVertical: '5%',
        fontWeight: 'bold'
      },
})