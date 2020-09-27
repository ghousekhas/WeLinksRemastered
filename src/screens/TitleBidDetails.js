import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet,ScrollView,FlatList,TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {Colors, TextSpinnerBoxStyles,dimen,Styles} from '../Constants';
import GenericSeperator from '../components/GenericSeperator';
import moment from 'moment';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 

export default function TitleBidDetails(){
    const [title,stitle]=useState('Title');
    const [address,sAddress]=useState('No.17, 23rd cross 18th A main road G block sahakarnagar bangalore 560092')

    const renderItem=({item})=>{
        return (
            <Text style={
                {
                    fontSize: 15,
                    color: 'black',
                    padding: 20
                }
            }>Mix it up with some Aderall and wait to get to the top</Text>
        )
    }

    const renderHeader=()=>{
        return (<View style={{flex: 0}}>
            <Text style={{...Styles.heading,alignSelf: 'center'}}>Title Bid Details</Text>
            <View style={styles.bidcard}>
                <Text style={{...Styles.subbold,fontWeight: 'bold'}}>{title}</Text>
                <Text style={{...Styles.subheading,marginLeft: dimen.width/200,textAlign: 'left',paddingTop: 2,paddingHorizontal: 5}}> {address}</Text>
                <View style={styles.duration}>
                    <Text style={{...Styles.subbold,fontWeight: 'bold'}}>Duration: </Text>
                    <Text style={{...Styles.subbold,fontWeight: '700'}}>{moment().toString()}</Text>
                </View>
                <View style={{...styles.duration,paddingVertical: 0,justifyContent: 'space-between'}}>
                    <View style={{...styles.duration,borderStyle: 'dashed',borderRadius: 10,borderWidth: 2,borderColor: Colors.primary,justifyContent: 'flex-start',alignSelf: 'center'}}>
                        <MaterialCommunityIcons name="anvil" size={24} color="black" style={{paddingHorizontal: 5,paddingVertical: 2}} />
                        <Text style={{...Styles.subbold,fontWeight: 'bold',paddingLeft: 5,alignSelf: 'center',paddingVertical: 2,paddingRight: 10}}>Metal</Text>
                    </View>
                    <View style={{...styles.duration,borderStyle: 'dashed',borderRadius: 10,borderWidth: 2,borderColor: Colors.seperatorGray,justifyContent: 'flex-start',alignSelf: 'center'}}>          
                        <Text style={{...Styles.subbold,fontWeight: 'bold',paddingLeft: 5,alignSelf: 'center',paddingVertical: 2,paddingLeft: 10}}>9-12</Text>
                        <MaterialCommunityIcons name="weight-kilogram" size={25} color="black" style={{paddingHorizontal: 5,paddingVertical: 2,alignSelf: 'center'}} />
                    </View>
                    <View style={{...styles.duration,borderStyle: 'dashed',borderRadius: 10,borderWidth: 2,borderColor: Colors.primary,justifyContent: 'flex-start',alignSelf: 'center'}}>
                        <AntDesign name="clockcircleo" size={24} color="black" style={{paddingHorizontal: 5,paddingVertical: 2}}/>
                        <Text style={{...Styles.subbold,fontWeight: 'bold',paddingLeft: 5,alignSelf: 'center',paddingVertical: 2,paddingRight: 10}}>9-12</Text>
                    </View>
                </View>
                <View style={styles.duration}>
                    <Text style={{alignSelf: 'center'}}>Require</Text>
                    <View style={{...styles.requirementsButton,backgroundColor: Colors.primary}}>
                        <Text style={{...Styles.subbold,paddingHorizontal: 1,paddingVertical: 3,color: 'white'}}>Manpower</Text>
                    </View>
                    <View style={{...styles.requirementsButton,backgroundColor: 'gray'}}>
                        <Text style={{...Styles.subbold,paddingHorizontal: 1,paddingVertical: 3,color: 'white'}}>Insurance</Text>
                    </View>
                    <View style={{...styles.requirementsButton,backgroundColor: Colors.primary}}>
                        <Text style={{...Styles.subbold,paddingHorizontal: 1,paddingVertical: 3,color: 'white'}}>Vehicle</Text>
                    </View>
                </View>
                <View style={{flex: 0}}>
                    <Text style={{...Styles.subbold,fontWeight: 'bold'}}>Additional Notes</Text>
                    <Text style={{...Styles.subbold,color: 'gray',fontWeight: 'normal',marginLeft: 10}}>My scrap is fragiel bring thermocol pls Also this is the first time I'm giving my scrap away, possibly I'm still attached to my scrap, you'd have to seperate me from my scrap by pulling me away so please don't damage my scrap or I might end up crying, this scrap means a lot to me, it contains the laptop I learnt to type on, this message is typed in </Text>
                </View>
                <View>
                    <Text style={{alignSelf: 'flex-end',color: Colors.primary,paddingTop: 5}}>STATUS: OPEN</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.cancelButton} onPress={()=>{
                alert('eh it\'ll be cancelled now wait da');
            }}>
                <Text style={styles.cancelText}>Cancel Bid</Text>
            </TouchableOpacity>

        </View>
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

const styles=StyleSheet.create({
    bidcard:{
        borderWidth: 1,
        borderColor: Colors.seperatorGray,
        padding: dimen.width/35,
        borderRadius: 10,
        marginRight: 20,
        marginLeft: 10,
        marginVertical: 10
    },
    duration:{
        paddingVertical: 5,
        paddingHorizontal: 3,
        margin: 3,
        borderStyle: 'dashed',
        borderColor: Colors.primary,
        flexDirection: 'row'
    },
    requirementsButton:{
        paddingVertical: 1,
        paddingHorizontal: 10,
        alignSelf: 'baseline',
        borderRadius: 10,
        marginHorizontal: 5
    },
    cancelText:{
        ...Styles.subbold,
        color: 'white',
        textAlign: 'center',
        alignSelf: 'center',
        fontWeight: '700',
        padding: 15
    },
    cancelButton:{
        backgroundColor: 'red',
        marginVertical: 5, 
        marginHorizontal: 10,
        justifyContent: 'center',
        flex: 1,
        borderRadius: 7
        
    }
})