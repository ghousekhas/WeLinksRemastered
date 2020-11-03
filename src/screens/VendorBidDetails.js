import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet,ScrollView,FlatList,TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {Colors, TextSpinnerBoxStyles,dimen,Styles} from '../Constants';
import GenericSeperator from '../components/GenericSeperator';
import AppBar from '../components/AppBar';
import moment from 'moment';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import SubmitButton from '../components/SubmitButton';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';


export default function VendorBidDetails({navigation,route}){
 const  cardDetails  = route.params;
 const { tag } = route.params;

 console.log(cardDetails)
  console.log(tag)
    const [title,stitle]=useState("Bid Title");
    const [address,sAddress]=useState('#221 B, Baker Street')

    // const renderItem=({item})=>{
    //     return (
    //         <Text style={
    //             {
    //                 fontSize: 15,
    //                 color: 'black',
    //                 padding: 20
    //             }
    //         }>Local Vendor</Text>
    //     )
    // }

    const renderHeader=()=>{
        return (<View style={{flex: 0}}>
            <Text style={{...Styles.heading,alignSelf: 'center'}}>Bid Details</Text>
            <View style={styles.bidcard}>
                <Text style={styles.title}>{cardDetails.companyName}</Text>
                <Text style={{...styles.info,fontWeight:'bold'}}> {address}</Text>
                <View style={{...styles.duration,flexDirection: 'column'}}>
                    <Text style={{...styles.title,color: 'gray',marginVertical: '3%'}}> {moment().toString()} </Text>
                    <Text style={{...styles.title,color: 'gray',marginVertical: '3%'}}>{"Pick Up : "+cardDetails.address}</Text>
                </View>
               { tag == 'Won' ? <View style={{flexDirection:'row'}}>
        <FontAwesome5 name="money-bill-wave-alt" size={17} color="#E0BA3F" style={{alignSelf:'center'}} />       
         <Text style={{...styles.cardTitle,color:"#E0BA3F", fontWeight: 'bold',margin:'2%'}}>{" Winning Amount : ₹500"}</Text>


        </View> : null}
                <View style={{flexDirection:'row'}}>
        <Entypo name="phone" size={17} color= {Colors.primary} style={{alignSelf:'center'}} />
        <Text style={{...styles.cardTitle,color:Colors.primary,fontWeight:'bold'}}>{cardDetails.contact}</Text>
        </View>
                <View style={{...styles.duration,paddingVertical: 0,justifyContent: 'space-between'}}>
                    <View style={{...styles.duration,borderRadius: 10,borderWidth: 1,borderColor: Colors.primary,justifyContent: 'flex-start',alignSelf: 'center'}}>
                    <Feather name="truck" size={24} color="black" style={{paddingHorizontal:5,paddingVertical:2}} />                     
                        <Text style={{...Styles.subbold,fontWeight: 'bold',paddingLeft: 5,alignSelf: 'center',paddingVertical: 2,paddingRight: 10}}>{cardDetails.bidItems}</Text>
                    </View>
                    <View style={{...styles.duration,borderRadius: 10,borderWidth: 1,borderColor: Colors.seperatorGray,justifyContent: 'flex-start',alignSelf: 'center'}}>          
                        <Text style={{...Styles.subbold,fontWeight: 'bold',paddingLeft: 5,alignSelf: 'center',paddingVertical: 2,paddingLeft: 10}}>{cardDetails.bidItemsWeight}</Text>
                        <MaterialCommunityIcons name="weight-kilogram" size={25} color="black" style={{paddingHorizontal: 5,paddingVertical: 2,alignSelf: 'center'}} />
                    </View>
                    <View style={{...styles.duration,borderRadius: 10,borderWidth: 1,borderColor: Colors.primary,justifyContent: 'flex-start',alignSelf: 'center'}}>
                        <AntDesign name="clockcircleo" size={24} color="black" style={{paddingHorizontal: 5,paddingVertical: 2}}/>
                        <Text style={{...Styles.subbold,fontWeight: 'bold',paddingLeft: 5,alignSelf: 'center',paddingVertical: 2,paddingRight: 10}}>{`9-12`}</Text>
                    </View>
                </View>
                <View style={styles.duration}>
                <View style={{flexDirection: 'row',alignItems:'center',justifyContent: 'space-between'}}>
                    <Text style={{alignSelf: 'center',fontWeight: 'bold',marginTop: '4%',paddingVertical:2}}>Require: </Text>
                   
                    <View style={{...styles.requirementsButton,backgroundColor: Colors.primary,marginTop:'2%'}}>
                  
                        <Text style={{...Styles.subbold,paddingHorizontal: 0.2,paddingVertical: 2,color: 'white'}}>Manpower</Text>
                    </View> 
                   
                    <View style={{...styles.requirementsButton,backgroundColor: Colors.primary}}>
                        <Text style={{...Styles.subbold,paddingHorizontal: 0.2,paddingVertical: 2,color: 'white'}}>Insurance</Text>
                    </View>  

                   <View style={{...styles.requirementsButton,backgroundColor: Colors.primary}}>
                        <Text style={{...Styles.subbold,paddingHorizontal: 0.2,paddingVertical: 2,color: 'white'}}>Vehicle</Text>
                    </View> 
                    </View>
                </View>
                <View style={{flex: 0}}>
                    <Text style={{...styles.title}}>Additional Notes</Text>
                    <Text style={{...styles.info}}>There's a hope that's waiting for you in the dark.</Text>
                </View>
               {tag != 'Won' ? <View>
                <TextInput editable={tag != 'Open' ? false : true} keyboardType="numbers-and-punctuation" value={tag == 'Open' ? "" : "₹500"} placeholder="Enter your bid amount" style={{borderRadius: 10,marginTop:'2%',borderWidth: 0.5,borderColor:'gray'}}/>
                </View> : null}
            </View>
            {/* <SubmitButton text='Cancel Bid' /> */}
            {tag == 'Open'  ?
            <TouchableOpacity style={{...styles.cancelButton,backgroundColor:Colors.primary}}>
                <Text style={styles.cancelText}>Bid Now</Text>
            </TouchableOpacity>
            : <TouchableOpacity style={{...styles.cancelButton,backgroundColor:Colors.primary}}>
                <Text style={styles.cancelText}>Edit Now</Text>
            </TouchableOpacity> }

        </View>
        )
    }

    

    return(<View>
     <AppBar 
     back
      funct={() => {
        navigation.pop();
         }} />

         <View style={{...Styles.parentContainer,backgroundColor: Colors.whiteBackground}}>
         
        <FlatList
            ListHeaderComponent={renderHeader}
            data={[1,2,3,4,5,6,7,8]}
           // renderItem={renderItem}
            ItemSeparatorComponent={()=><GenericSeperator/>}/>
            </View>
            </View>
            
    )
}

const styles=StyleSheet.create({
    bidcard:{
        width: dimen.width-dimen.width/10,
        // height: dimen.height/3.8,
        borderRadius: 15,
        borderColor: Colors.seperatorGray,
        borderWidth: 0.5,
       padding:'2%',
        marginTop: '5%',
        alignSelf: 'center',
        backgroundColor: 'white',
        elevation: 1
    },
    duration:{
        paddingVertical: 5,
        paddingHorizontal: 3,
        margin: 3,
       
        borderColor: Colors.primary,
        flexDirection: 'row'
    },
    requirementsButton:{
        paddingVertical: '0.5%',
        paddingHorizontal: 10,
        alignSelf: 'baseline',
        borderRadius: 10,
        marginHorizontal: '1%'
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
        backgroundColor: Colors.red,
        // height: '100%',
        width: '97%',
        aspectRatio: 10/1.4,
        borderRadius: 5,
        alignSelf:'center',
        marginVertical: '5%'
        
    },
    title: {
        fontWeight: 'bold',
        color: Colors.primary,
        padding: '1%',
        fontSize: 16,
    },
    info:{
        padding: '1%',
        fontSize: 14,
        marginTop:'3%',
        flex: 1,
       

    }
})