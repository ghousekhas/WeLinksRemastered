import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet,ScrollView,FlatList,TouchableOpacity,TextInput} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {Colors, TextSpinnerBoxStyles,dimen,Styles} from '../Constants';
import GenericSeperator from '../components/GenericSeperator';
import AppBar from '../components/AppBar';

export default function CancellationScreen({navigation,route}){
    const [notes,setNotes]=useState('');
    const { bidTitle } = route.params;

    const onButton=(type)=>{
        if(type != 'cancel' && notes.trim() === ''){
            alert('Please enter a reason/some information');
            return;
        }
        else if(type === 'cancel')
           return //dosomething
        else
           return //dosomething

    }


    return(<View>
    <AppBar back funct={() => {navigation.pop()}}/>
        <View style={{...Styles.parentContainer}}>
            <Text style={{...Styles.heading,alignSelf: 'center',flex: 0}}>{bidTitle}</Text>
            <Text style={{marginTop: dimen.height/30,alignSelf: 'center',marginHorizontal: dimen.width*0.05,flex: 0,fontWeight: 'bold',color: 'black',alignItems:'center'}}>Are you sure you want to cancel/close?</Text>
            <TextInput 
            placeholder= {`Reason for cancellation/other information`}
                onChangeText={setNotes}
                textAlignVertical={'top'}
               multiline={true}
               line
                numberOfLines={10}
            style={{fontSize: 15,color: 'black',padding: 15,margin: 30,flex: 0,borderColor: Colors.seperatorGray,borderWidth: 1,borderRadius: 5,maxHeight: dimen.height/3}} />
            <View style={{flexDirection: 'row',justifyContent: 'space-around'}}>
                <TouchableOpacity onPress={()=>onButton('cancel')} style={{backgroundColor: 'red',flex: 1,padding: 10,marginLeft: 30,marginRight: 10,alignItems: 'center',justifyContent: 'center',borderRadius: 7}}>
                    <Text style={{color: 'white'}}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>onButton('confirm')} style={{backgroundColor: Colors.primary,flex: 1,padding: 10,marginLeft: 10,marginRight: 30,alignItems: 'center',justifyContent: 'center',borderRadius: 7}}>
                    <Text style={{color: 'white'}}> Confirm</Text>
                </TouchableOpacity>
            </View>
        </View>
        </View>
    )

}