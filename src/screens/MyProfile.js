import * as React from 'react';
import { Button, View, StyleSheet, Dimensions } from 'react-native';
import { Constants, Styles } from '../Constants';
import {Colors} from '../Constants'
import {Text,Drawer, Switch, TouchableRipple, Divider, Avatar} from 'react-native-paper';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { userDetails } from '../UserDetails';
import AppBar from '../components/AppBar';
import { DrawerActions } from "react-navigation";


const MyProfile = (props) => {
    const words = {
        subscriptions : 'Subscriptions',
        rupee : '₹',
        balance : 'Balance'
    }
    return(<View style={Styles.parentContainer}>
     
     <AppBar profile={() => {
        props.navigation.navigate('About')}} 
        city={() => {
        props.navigation.navigate('City')}}
        prev={() =>{
            props.navigation.pop(1)
        } }
        toggle={() => {
            props.navigation.dispatch(DrawerActions.openDrawer());
        }} />
      
    <ScrollView>
        <View style={{flex: 1,marginBottom: '1.5%'}}>

    <View style={style.header}>

    <View style={style.avatarBG}>
    <Avatar.Image source={require('../../assets/avatar.png')}  // Change to Image
            style={style.avatar}
            // height={Dimensions.get('window').height/4}
            // width={Dimensions.get('window').height/4}
          />
          <View style={{position: 'absolute',bottom: 1,right: 1}}>
          <TouchableOpacity>
          <Icon 
                  name='pencil'
                  size={20}
                  color='white'
              />

          </TouchableOpacity>
                       </View>
    </View>
    

            <View style={style.chips}>

            <TouchableOpacity>
            <Text style = {style.chip}>{words.subscriptions}</Text>
            </TouchableOpacity>


           <TouchableOpacity>
            <Text style = {style.chip}>{words.balance}</Text>
            </TouchableOpacity>

            </View>
       

         
    </View>

    <View style={{borderWidth: 0.5,borderRadius: 10,margin: '2%',elevation: 0.5,borderColor: 'gray'}}>
        <TouchableOpacity>
        <View style={{flexDirection: 'row',margin: '5%',marginTop: '7%'}}>

        <View style={{marginTop: '1%'}}>
        <Icon 
                                name="account-outline" 
                                color='gray'
                                
                                size={30}
                                />
        </View>
      

    <View style={{flexDirection: 'column'}}>
        <Text style={style.blackText}>Profile details</Text>
        <Text style={{...style.blackText,fontWeight: '900', color: 'gray',marginTop: '1%'}}>{userDetails.USER_NAME}</Text>
        <Text style={{...style.blackText,fontWeight: '900', color: 'gray',marginTop: '1%'}}>{userDetails.USER_EMAIL}</Text>
    </View>
    <View style={{position: 'absolute',right: 8}}>

    <Icon 
                                name="chevron-right" 
                                color={Colors.primary}
                                
                                size={24}
                                />

    </View>

  
        </View>
            
            
        </TouchableOpacity>

    </View>


    <View style={{borderWidth: 0.3,borderRadius: 10,margin: '2%',elevation: 0.3,borderColor: 'gray'}}>
        <TouchableOpacity>
        <View style={{flexDirection: 'row',margin: '5%',marginTop: '7%'}}>

        <View style={{marginTop: '1%'}}>
        <Icon 
                                name="map-marker-outline" 
                                color='gray'
                                
                                size={30}
                                />
        </View>
      

    <View style={{flexDirection: 'column'}}>
        <Text style={style.blackText}>Addresses</Text>
        <Text style={{...style.blackText,fontWeight: '900', color: 'gray',marginTop: '1%'}}>{userDetails.USER_ADDRESS}</Text>
        <Text style={{...style.blackText,fontWeight: '900', color: 'gray',marginTop: '1%'}}>Address 2</Text>
        <Text style={{...style.blackText,fontWeight: '900', color: 'gray',marginTop: '1%'}}>Address 3</Text>
        <Text style={{...style.blackText,fontWeight: '900', color: 'gray',marginTop: '1%'}}>Address 4</Text>
        <Text style={{...style.blackText,fontWeight: '900', color: 'gray',marginTop: '1%'}}>Address 5</Text>
        <Text style={{...style.blackText,fontWeight: '900', color: 'gray',marginTop: '1%'}}>Address 6</Text>
        <Text style={{...style.blackText,fontWeight: '900', color: 'gray',marginTop: '1%'}}>Address 7</Text>
        <Text style={{...style.blackText,fontWeight: '900', color: 'gray',marginTop: '1%'}}>Address 8</Text>
        <Text style={{...style.blackText,fontWeight: '900', color: 'gray',marginTop: '1%'}}>Address 9</Text>
        <Text style={{...style.blackText,fontWeight: '900', color: 'gray',marginTop: '1%'}}>Address 10</Text>
       
    </View>
    <View style={{position: 'absolute',right: 8}}>

    <Icon 
                                name="chevron-right" 
                                color={Colors.primary}
                                
                                size={24}
                                />

    </View>

  
        </View>
            
            
        </TouchableOpacity>
        
    </View>

    </View>
    </ScrollView>

    </View>)
};


const style = StyleSheet.create({
    container: {
        margin: '1%'
    },
    header: {
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
      
        height: Dimensions.get('window').height/2

    },
    avatar :{
        
    },
    avatarBG: {
        borderWidth: 1,
        borderColor: 'white',
        height: Dimensions.get('window').width/3.5,
        aspectRatio: 1/1,alignItems:'center',
        justifyContent: 'center',
        borderRadius: 8

    },
    chips: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: Dimensions.get('window').width,
        marginTop: '10%'

    },
    chip: {
        borderWidth : 1,
        borderRadius: 20,
        borderColor: 'white',
        color: 'white',
        padding: '2%',
        width: Dimensions.get('window').width/3.2,
        textAlign: 'center',
        fontSize: 10

    },
    blackText: {
        margin: '1%',
        fontWeight: 'bold',
        fontSize: 14,
        marginStart: '15%',
        marginTop: '1%'
    },
   
})

export default MyProfile;