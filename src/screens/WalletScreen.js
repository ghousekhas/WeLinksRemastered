import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import {Text, View, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import AppBar from '../components/AppBar';
import {Colors, dimen, Styles} from '../Constants';
import { useAuth } from '../services/auth-service';
import ymdToApp from '../Utility/dateConvertor';

const transcations =[{
    "wallet_trans_id": "11",
    "user_id": "96",
    "trans_id": "",
    "wallet_trans_amount": "10",
    "trans_type": "debit",
    "timestamp": "2021-03-25 11:23:02"
},
{
    "wallet_trans_id": "10",
    "user_id": "96",
    "trans_id": "",
    "wallet_trans_amount": "10",
    "trans_type": "debit",
    "timestamp": "2021-03-25 11:22:53"
},
{
    "wallet_trans_id": "9",
    "user_id": "96",
    "trans_id": "47",
    "wallet_trans_amount": "100",
    "trans_type": "credit",
    "timestamp": "2021-03-25 10:52:01"
},
{
    "wallet_trans_id": "8",
    "user_id": "96",
    "trans_id": "46",
    "wallet_trans_amount": "100",
    "trans_type": "credit",
    "timestamp": "2021-03-25 10:50:57"
},
{
    "wallet_trans_id": "7",
    "user_id": "96",
    "trans_id": "45",
    "wallet_trans_amount": "100",
    "trans_type": "credit",
    "timestamp": "2021-03-25 10:42:38"
},
{
    "wallet_trans_id": "6",
    "user_id": "96",
    "trans_id": "44",
    "wallet_trans_amount": "100",
    "trans_type": "credit",
    "timestamp": "2021-03-25 10:31:55"
},
{
    "wallet_trans_id": "5",
    "user_id": "96",
    "trans_id": "43",
    "wallet_trans_amount": "10",
    "trans_type": "credit",
    "timestamp": "2021-03-25 10:18:20"
},
{
    "wallet_trans_id": "4",
    "user_id": "96",
    "trans_id": "42",
    "wallet_trans_amount": "100",
    "trans_type": "credit",
    "timestamp": "2021-03-25 10:12:13"
}];

export default function WalletScreen({}){
    

    const [flatListre, setFlatReference] = useState(null);
    
    const [selectedTab, setSelectedTab] = useState(0);
    
    
    return (
        <View style={{...StyleSheet.absoluteFill, flexDirection: 'column'}}>
            <View>
                <AppBar
                    back
                    funct={()=>{}} 
                
                    
                />
            </View>
            <View style={{justifyContent: 'center', flex: 1.5, flexDirection: 'row'}}>
                <View style={{justifyContent: 'center', flexDirection: 'column'}}> 
                    <Text>
                        Rs. 100
                    </Text>
                    <TouchableOpacity>
                        <View>
                            {/* <Image>
                            </Image> */}
                            <Text>Add Money To Wallet</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[{flex: 3}, {flexDirection: 'column'}]}>
                <View style={{flexDirection: 'row', flex: 0, justifyContent: 'space-between', padding: 10}}>
                    {["All","Debit","Credit"].map((it,ind)=>{
                        return (<TouchableOpacity onPress={()=> {setSelectedTab(ind); flatListre.scrollToIndex({index: ind})}}>
                                    <View>
                                        <Text style={ind == selectedTab ? {}:{fontSize: 25, fontWeight: 'bold'}}>Something</Text>
                                    </View>
                                </TouchableOpacity>)
                    })}
                </View>
                <View style={{flex: 1}}>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={["All","debit","credit"]}
                        key={(index)=> index.toString()}
                        // contentContainerStyle={{backgroundColor: 'yellow'}}
                        disableIntervalMomentum={true}
                        // style={{backgroundColor: 'blue'}}
                        bounces={false}
                        pagingEnabled
                        ref={(reference) => setFlatReference(reference)}
                        renderItem={({item})=>{
                            console.log(item);
                            return (<View style={{width: dimen.width}}>
                                <FlatList
                                data={item == "All" ?  transcations: transcations.filter(transaction => item == transaction.trans_type )}
                                key= {( index)=> index.toString()}
                                // style={{backgroundColor: 'pink'}}
                                ItemSeparatorComponent={()=> <View style={{backgroundColor: Colors.seperatorGray, width: dimen.width*90, height: 1}}/>}
                                renderItem={({item})=>{
                                    console.log(item);
                                    return (
                                        <View style={{flex: 1, flexDirection: 'row', backgroundColor: item.trans_type == 'debit' ? 'red' : 'green', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 10 }}>
                                            <Text>{item.wallet_trans_amount}</Text>
                                            <Text>{ymdToApp( item.timestamp)}</Text>
                                        </View>
                                    )
                                }}
                            />
                                </View>)

                        }}
                    />
                </View>

            </View>
        </View>
    );
}