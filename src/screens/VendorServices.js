import React,{useState, useEffect} from 'react';
import {View,TextInput,Text,StyleSheet,ScrollView, Alert,Dimensions, CheckBox} from 'react-native';
import {Styles,dimen,Colors} from '../Constants';
import TextBox from '../components/TextBox';
import Button from '../components/Button';
import SubmitButton from '../components/SubmitButton';
import  DocumentPicker from 'react-native-document-picker';
import {useNavigation} from '@react-navigation/native';
import {Checkbox} from 'react-native-paper';

export default function VendorServices(){
    const [services,setServices] = useState(['unchecked','unchecked','unchecked','unchecked']);

    const checkBox =(index)=>{
        var tempArray=[];
        services.forEach((item,i)=>{
            if(i == index)
                tempArray.push(item=='checked'?'unchecked':'checked');
            else
                tempArray.push(item);
        });
        setServices(tempArray);
    }


    return(<View style={{...StyleSheet.absoluteFill,padding: 10}}>
                <Text style = {style.text}>Select the services your company offers</Text>
            <View style={{paddingHorizontal: 10}}>
                <ScrollView>
                    <Checkbox.Item label="Milk Delivery" status={services[0]} labelStyle={{color: 'black'}} theme={{colors:{primary: 'black'}}} color={Colors.primary} onPress={()=>{checkBox(0)}} />
                    <View style={Styles.grayfullline}/>
                    <Checkbox.Item label="NewsPaper Delivery" status={services[1]} labelStyle={{color: 'black'}} theme={{colors:{primary: 'black'}}} onPress={()=>{checkBox(1)}}/>
                    <View style={Styles.grayfullline}/>
                    <Checkbox.Item label="Home Scrap Collection" status={services[2]} labelStyle={{color: 'black'}} theme={{colors:{primary: 'black'}}} onPress={()=>{checkBox(2)}}/>
                    <View style={Styles.grayfullline}/>
                    <Checkbox.Item label="Office Scrap Collection" status={services[3]} labelStyle={{color: 'black'}} theme={{colors:{primary: 'black'}}} onPress={()=>{checkBox(3)}}/>
                    </ScrollView>
            </View>    
            <View style={{padding: 10,position: 'absolute',bottom: 0,alignSelf: 'center'}}>
                <SubmitButton text='Submit'/>
            </View>

        </View>
    );
}

const style = StyleSheet.create({
    mainContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        padding: 10,
        backgroundColor: 'white',

    },
    text:{
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        alignSelf: 'center',
        marginBottom: dimen.height/20,
        width: dimen.width/1.5,
        textAlign: 'center',
        letterSpacing: 1,
        lineHeight: 25,
        
        
        marginTop: 10,
        margin: 5
    },
    line: {
        borderWidth: 0.5,
        borderColor: '#5D5D5D',
        marginTop: 10,
     
    },
    view: {
        flexDirection: 'row',
        marginTop: 12
        
    },
    city: {
        marginTop: 5,
        marginStart: 7,
        fontSize: 18
    }


});