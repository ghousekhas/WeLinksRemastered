import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet,ScrollView,FlatList,TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {Colors, TextSpinnerBoxStyles,dimen,Styles} from '../Constants';
import GenericSeperator from '../components/GenericSeperator';

export default function VendorBids(){
    const [tab,setTab]=useState(0);


    const renderCard=()=>{
        return (<View style={{marginVertical: 30,flexDirection: 'row'}}>
            <View style={{flexDirection: 'column',flex: 1,marginRight: 10}}>
                <Text style={{...Styles.subbold,alignSelf: 'flex-start'}}>One</Text>
                <Text style={{...Styles.subbold,alignSelf: 'flex-start'}}>One</Text>
                <Text style={{...Styles.subbold,alignSelf: 'flex-start'}}>One don </Text>
                <View style={{height: dimen.height/20,alignSelf: 'flex-start'}}/>
                <Text style={{...Styles.subbold,alignSelf: 'flex-start'}}>One</Text>
                <Text style={{...Styles.subbold,alignSelf: 'flex-start'}}>One</Text>
            </View>
            <TouchableOpacity style={{alignSelf: 'center',backgroundColor: Colors.primary,padding: 10,borderRadius: 7,flex: 0}}>
                <Text>View Details</Text> 
            </TouchableOpacity>

        </View>)
    }

    return (
        <View style={{...StyleSheet.absoluteFill,flexDirection: 'column'}}>
            <View style={styles.horizontal}>
                <TouchableOpacity style={{...styles.tab,backgroundColor: 'white',backgroundColor: tab==0? 'white': Colors.primary}}
                    onPress={()=>setTab(0)}>
                    <Text style={{textAlign: 'center'}} >Open Bids</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.tab,backgroundColor: 'white',backgroundColor: tab==1?'white': Colors.primary}}
                    onPress={()=>setTab(1)}>
                    <Text style={{textAlign: 'center'}} >Submitted Bids</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.tab,backgroundColor: 'white',backgroundColor: tab==2?'white': Colors.primary}}
                    onPress={()=>setTab(2)}>
                    <Text style={{textAlign: 'center'}} >Bids Won</Text>
                </TouchableOpacity>
            </View>
            <FlatList 
                data={tab==0? [1,2,3,4]: tab==1? [1,2,3,4,5,6]: [1,2,3,4,5,6,7,8,9,10]}
                renderItem={renderCard}
                style={styles.individualTab}
                ItemSeparatorComponent={()=><GenericSeperator/>}/>
        </View>    
        )
}

const styles=StyleSheet.create({
    horizontal: {
        flexDirection: 'row',
        flex: 0
    },
    tab:{
        textAlign: 'center',
        padding: 20,
        backgroundColor: Colors.primary,
        flex: 1,
        borderWidth: 0.5,
        borderColor: Colors.seperatorGray

    },
    thetab:{
        backgroundColor: 'red',
        padding: 0,
        width: dimen.width,
        flex: 1
    },
    individualTab:{
        flex: 1,
        padding: dimen.width*0.05,
        width: dimen.width
    }
})