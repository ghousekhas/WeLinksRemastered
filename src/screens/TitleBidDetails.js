import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet,ScrollView,FlatList,TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {Colors, TextSpinnerBoxStyles,dimen,Styles} from '../Constants';
import GenericSeperator from '../components/GenericSeperator';

export default function TitleBidDetails(){

    const renderItem=({item})=>{
        return (
            <Text style={
                {
                    fontSize: 15,
                    color: 'black',
                    padding: 20
                }
            }>One don't ick up tosdnhjkohnfeililuhn</Text>
        )
    }

    const renderHeader=()=>{
        return (
        <Text style={{...Styles.heading}}>Title Bid Details</Text>
        )
    }

    return(
        <FlatList
            ListHeaderComponent={renderHeader}
            data={[1,2,3,4,5,6,7,8]}
            renderItem={renderItem}
            ItemSeparatorComponent={()=><GenericSeperator/>}/>

            
    )
}