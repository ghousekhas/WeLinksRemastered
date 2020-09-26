import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet,ScrollView,FlatList,TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {Colors, TextSpinnerBoxStyles,dimen,Styles} from '../Constants';
import GenericSeperator from '../components/GenericSeperator';

export default function Bidds(){
    const [tab,setTab]=useState(0);

    const renderCard=()=>{
        return (<View style={{marginVertical: 30}}>
            <Text style={{...Styles.subbold,alignSelf: 'flex-start'}}>One</Text>
            <Text style={{...Styles.subbold,alignSelf: 'flex-start'}}>One</Text>
            <Text style={{...Styles.subbold,alignSelf: 'flex-start'}}>One</Text>
            <Text style={{...Styles.subbold,alignSelf: 'flex-start'}}>One</Text>
            <Text style={{...Styles.subbold,alignSelf: 'flex-start'}}>One</Text>
            <TouchableOpacity style={{alignSelf: 'flex-end',backgroundColor: Colors.primary,padding: 10,borderRadius: 7}}>
                <Text>View Details</Text> 
            </TouchableOpacity>

        </View>)
    }



    return(
        <View style={{width: '100%',height: '100%',flexDirection: 'column'}}>
            <View style={styles.horizontal}>
                <TouchableOpacity style={{...styles.tab,backgroundColor: 'white',backgroundColor: tab==1?Colors.primary: 'white'}}
                    onPress={()=>setTab(0)}>
                    <Text style={{textAlign: 'center'}} >Open Bids</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.tab,backgroundColor: 'white',backgroundColor: tab==0?Colors.primary: 'white'}}
                    onPress={()=>setTab(1)}>
                    <Text style={{textAlign: 'center'}} >Closed/Cancelled Bids</Text>
                </TouchableOpacity>
            </View>
            <FlatList 
                        data={tab==0? [1,2,3,4]: [1,2,3,4,5,6,7]}
                        renderItem={renderCard}
                        style={styles.individualTab}
                        ItemSeparatorComponent={()=><GenericSeperator/>}/>
            

            {/*<ScrollView style={styles.thetab} scrollEnabled={true} showsHorizontalScrollIndicator={false} horizontal={true}  contentContainerStyle={{flexGrow: 1}}>
                <View style={styles.individualTab}>

                </View>
                <View style={styles.thetab}>

                </View>

            </ScrollView>
    */}
        
            
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
