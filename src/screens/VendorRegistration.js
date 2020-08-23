import React,{useState} from 'react';
import {View,TextInput,Text,StyleSheet,ScrollView} from 'react-native';
import {Styles,dimen} from '../Constants';
import TextBox from '../components/TextBox';

export default function VendorRegistration({navigation}){


    return(
        <View style={{...StyleSheet.absoluteFill}}>
             <Text style={{...Styles.heading,alignSelf: 'center'}}>Tell us about your business</Text>    
            <ScrollView style={{marginTop: dimen.height/20}}>
                <TextBox title="NAME OF YOUR COMPANY" hint="Enter your company's name" />
                <TextBox title="COMPANY EMAIL ADDRESS" hint="Enter conpany's E-mail address"/>
                <TextBox title="COMPANY GST NUMBER" hint="Enter company's GST number"/>
            </ScrollView>

        </View>
    )
}

const uploadButton =({hint,title,browseresult})=>{
    
}