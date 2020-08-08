import * as React from 'react';
import { Button, View, StyleSheet, Dimensions } from 'react-native';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import {Text,Drawer, Switch, TouchableRipple, Divider, Avatar} from 'react-native-paper';
import { userDetails } from '../UserDetails';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SupportFAQ from '../screens/SupportFAQ';



const DrawerContent = (props) => {
  
  return (
   <View style={{flex: 1,height: Dimensions.get('window').height}}>
       <DrawerContentScrollView {...props}>
         <View style={{height: Dimensions.get('window').height}}>
         <Drawer.Section>
        
           <View style={styles.header}>
             {/* <Text style={{margin: '10%',color: 'white',fontSize: 30, fontWeight: 'bold'}}>WeLinks</Text> */}
          <View style={{marginTop: '5%', margin: '5%'}}>
          <Avatar.Image source={require('../../assets/avatar.png')}
            style={styles.avatar}
          />
          </View>

          <Text style={styles.username}>
          {userDetails.USER_NAME}
          </Text>

          <View style={{flexDirection: 'row',marginStart: '5%'}}>

          <View style={{marginTop:'1.5%'}}>
          <Icon name="phone" color='gray' size={16}/>

          </View>
          
                             
                            

          <Text style={{...styles.username,fontWeight: '200',color:'gray',marginStart:'2%'}}>
          {userDetails.USER_PHONE}
          </Text>

          </View>

         
         

            
          
           </View>
           </Drawer.Section>

           <Drawer.Section>
        
         <Drawer.Item
     style={{ }}
     icon="home-outline"
     label="Consumer Zone"
     onPress={()=>{props.navigation.navigate('Home')}}
     
   />
    <Drawer.Item
     style={{}}
     icon="account-outline"
     label="My Profile"
     onPress={()=>{props.navigation.navigate('MyProfile')}}
     
   />
   <Drawer.Item
  
     icon= 'map-marker-outline'
     label="Addresses"
     onPress={()=>{}}
     
   />
   <Drawer.Item

   
    
     icon="wallet-outline"
     label="WeLinks Wallet"
     onPress={()=>{}}
     
   />
   <Drawer.Item
    
    icon="cart-outline"
    label="My Subscriptions"
    onPress={()=>{}}
    
  />
   <Drawer.Item
    
    icon= {({color, size}) => (
                                <Icon 
                                name="share-outline" 
                                color={color}
                                size={size}
                                />
                            )}

    label="Share App"
    onPress = {()=>{}}
    
  />
     <Drawer.Item
    
    icon="card-text-outline"
    label="Support and FAQs"
    onPress={()=> {props.navigation.navigate(SupportFAQ)}}
    
  />
 


 </Drawer.Section>
   <Drawer.Section>
 
 <Drawer.Item
    
    icon= {({color, size}) => (
                                <Icon 
                                name="account-box-multiple" 
                                color={color}
                                size={size}
                                />
                            )}

    label="Switch to Vendor"
    onPress = {()=>{}}
    
  />


  
  
  
   
   
   
   


<Drawer.Item
     style={styles.bottom}
     icon="exit-to-app"
     
     label="Sign Out"
     
     onPress={()=>{}}
     
   />

  
    
 

   
            


            
   
   
     </Drawer.Section>

     <Text style={styles.version}>Version 1.0.0</Text>
         </View>
       </DrawerContentScrollView>
   </View>
  )};


  const styles = StyleSheet.create({
 
  header: {
    
    height:Dimensions.get('window').height/5.1,
   
   
  
    flexDirection: 'column',
   
   
  },
  username: {
   
    
    marginStart: '6%',
    fontSize: 17,
    fontWeight: 'bold',
    
    
  },
  version: {
    color: '#929292',
    fontWeight: '900',
    margin: '5%',
    marginTop: '10%',
    fontSize: 18
  }
  })


export default DrawerContent;