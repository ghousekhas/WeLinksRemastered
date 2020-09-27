import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet,ScrollView,FlatList,TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {Colors, TextSpinnerBoxStyles,dimen,Styles} from '../Constants';
import GenericSeperator from '../components/GenericSeperator';
import {Ionicons} from '@expo/vector-icons';

export default function Bidds({navigation}){
    const [tab,setTab]=useState(0);

    const renderCard=({item})=>{
        return (<View style={{marginVertical: 30}}>
            <Text style={{...Styles.subbold,alignSelf: 'flex-start'}}>One</Text>
            <Text style={{...Styles.subbold,alignSelf: 'flex-start'}}>One</Text>
            <Text style={{...Styles.subbold,alignSelf: 'flex-start'}}>One</Text>
            <Text style={{...Styles.subbold,alignSelf: 'flex-start'}}>One</Text>
            <Text style={{...Styles.subbold,alignSelf: 'flex-start'}}>One</Text>
            <TouchableOpacity style={{alignSelf: 'flex-end',backgroundColor: Colors.primary,padding: 10,borderRadius: 7}}
                onPress={()=>{
                    navigation.navigate('TitleBidDetails',{
                        item: item
                    })
                }}            
            >
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
                        extraData={tab}
                        style={styles.individualTab}
                        ItemSeparatorComponent={()=><GenericSeperator/>}/>
            <TouchableOpacity style={{...styles.addBidButton,flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between',height: 50}} onPress={()=>{
                navigation.navigate( 'BidCreation1',{
                        something: 'something'
                    }
                );
            }}>
                <View style={{justifyContent: 'flex-start',flex: 1,flexDirection: 'row',position: 'absolute',width: '100%',bottom: 0,top: 0,alignSelf: 'center'}}>
                    <Ionicons name="md-add" size={Styles.subheading.fontSize*1.5} color="white" style={{paddingHorizontal: 15,alignSelf: 'center',flex: 0}}/>
                    <View style={{justifyContent: 'center',flex: 0,position: 'absolute',alignSelf: 'center',right: 0,left: 0}}>
                        <Text style={{...Styles.subbold,alignSelf: 'center',color: 'white',paddingVertical: 5,textAlign: 'center'}}>CREATE BID</Text>
                    </View>
                </View>
                
            </TouchableOpacity>
            

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
    },
    addBidButton:{
        flex: 0,
        padding: 10,
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 5,
        elevation: 5,
        shadowColor: Colors.seperatorGray,
        backgroundColor: Colors.primary
    }
})
