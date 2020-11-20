import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet,ScrollView,FlatList,TouchableOpacity,TextInput} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {Colors, TextSpinnerBoxStyles,dimen,Styles, Config} from '../Constants';
import GenericSeperator from '../components/GenericSeperator';
import AppBar from '../components/AppBar';
import Axios from 'axios';
import qs from 'qs';

export default function ScrapPickedConfirmation({navigation,route}){
    const [notes,setNotes]=useState('');
    const { bidTitle } = route.params;
    const {item,actualUser} = route.params;

    const onButton=(type)=>{
        if(type != 'cancel' && notes.trim() === ''){
            alert('Please enter a reason/some information');
            return;
        }
        else if(type != 'cancel'){
            Axios.post(Config.api_url+'php?'+qs.stringify({
                action: 'cancelBid',
                user_id: actualUser.user_id,
                bid_id: item.bid_id,
                bid_notes: notes
            })).then((response)=>{
                console.log(response.data);
                alert('Request completed sucessfully');
                navigation.goBack();
                navigation.goBack();
            }
            );
        }
        else if(type === 'cancel')
            navigation.goBack();
           return //dosomething
    

    }


    return(<View>
        <View style={{...Styles.parentContainer}}>
            <Text style={{...Styles.heading,fontSize: 25,textAlign: 'center',alignSelf: 'center',flex: 0,padding: 20}}>{bidTitle} ?</Text>
            <Text style={{marginTop: dimen.height/30,alignSelf: 'center',marginHorizontal: dimen.width*0.05,flex: 0,fontWeight: 'bold',color: 'black',alignItems:'center'}}>Please leave any additional notes or feedback here</Text>
            <TextInput 
            placeholder= {`Feedback or additional information`}
                onChangeText={setNotes}
                textAlignVertical={'top'}
               multiline={true}
               line
                numberOfLines={10}
            style={{fontSize: 15,color: 'black',padding: 15,margin: 30,flex: 0,borderColor: Colors.seperatorGray,borderWidth: 1,borderRadius: 5,maxHeight: dimen.height/3}} />
            <View style={{flexDirection: 'row',justifyContent: 'space-around'}}>
                <TouchableOpacity onPress={()=>onButton('cancel')} style={{backgroundColor: 'red',flex: 1,padding: 10,marginLeft: 30,marginRight: 10,alignItems: 'center',justifyContent: 'center',borderRadius: 7}}>
                    <Text style={{color: 'white'}}>Amount Incorrect</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>onButton('confirm')} style={{backgroundColor: Colors.primary,flex: 1,padding: 10,marginLeft: 10,marginRight: 30,alignItems: 'center',justifyContent: 'center',borderRadius: 7}}>
                    <Text style={{color: 'white'}}> Amount Correct</Text>
                </TouchableOpacity>
            </View>
        </View>
        </View>
    )

}