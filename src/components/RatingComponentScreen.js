import React from 'react';
import {View, StyleSheet, Text,TextInput} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {Styles,strings_screen,dimen,Colors} from '../Constants';
import RatingComponent from './RatingsComponent';
import SubmitButton from './SubmitButton';
import TextBox from './TextBox';

const strings = strings_screen.ratings;


export default function RatingComponentScreen({order_details = {}}){
    var stars = 0;



    return (
        <View style={{...Styles.parentContainer,backgroundColor: Colors.lightBlue}}>
            <ScrollView>
            <Text style={[Styles.subheading,styles.mainheading]}>{ strings.heading }</Text>
            <View style={styles.order_card}>
                <Text style={{...Styles.heading,marginTop: 0}}>Order Details</Text> 
                <View style={{marginTop: dimen.sVm}}/>
                {
                    Object.keys(order_details).map((jKey, index)=>{
                        console.log(jKey);
                        return (
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{fontSize: 14,color: 'gray',fontWeight: 'bold',flex: 1,marginLeft: dimen.sHm/4}}>{jKey +": "}</Text>
                                <Text style={{fontSize: 14,color: 'black',fontWeight: 'bold',flex: 3,marginLeft: dimen.sHm/4}}>{order_details[jKey]}</Text>
                            </View>
                        )
                        return (<Text style={{...Styles.subbold,marginLeft: dimen.sHm/4}}>{jKey +": "+ order_details[jKey]}</Text>)
                    })
                }
            </View>
            <RatingComponent starChanged={(new_stars)=>{
                stars = new_stars;
            }} />
            <TextInput title={strings.textbox_title} numberOfLines={10} textAlignVertical="top" style={styles.input}  placeholder={strings.hint} />
            <SubmitButton text="Submit" />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    mainheading:{
        alignSelf: 'center',
        textAlign: 'left',
        margin: dimen.sHm,
        padding: dimen.sVm

    },
    order_card:{
        marginHorizontal: dimen.sHm,
        borderRadius: dimen.sHm,
        borderWidth: dimen.sVm/16,
        padding: dimen.sVm,
        zIndex: 10,
        elevation: 100,
        backgroundColor: Colors.seperatorGray

    },
    input:{
        marginStart: 10,
        backgroundColor: 'white',
        padding: dimen.sVm,
        marginHorizontal: dimen.sHm,
        borderRadius: dimen.sHm,
        marginBottom: dimen.bottomMargin
    }
});