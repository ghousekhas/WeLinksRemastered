import * as React from 'react';
import { Button, View, StyleSheet, Dimensions } from 'react-native';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Homescreen from '../screens/Homescreen';
import {Text,Drawer, Switch, TouchableRipple, Divider} from 'react-native-paper';


const DrawerContent = (props) => {
  return (
   <View style={{flex: 1,height: Dimensions.get('window').height}}>
       <DrawerContentScrollView {...props}>
         <View style={{height: Dimensions.get('window').height}}>
        
           <View style={{backgroundColor: '#00C99D',height:Dimensions.get('window').height/4,marginTop:'-3%'}}>
             {/* <Text style={{margin: '10%',color: 'white',fontSize: 30, fontWeight: 'bold'}}>WeLinks</Text> */}
           </View>
        
         <Drawer.Item
     style={{ backgroundColor: '#f9f9f9' }}
     icon="home-outline"
     label="Home"
     onPress={()=>{props.navigation.navigate('Home')}}
     
   />
    <Drawer.Item
     style={{ backgroundColor: '#f9f9f9' }}
     icon="account-outline"
     label="Account"
     onPress={()=>{}}
     
   />
   <Drawer.Item
     style={{ backgroundColor: '#f9f9f9' }}
     icon="cart-outline"
     label="My Subscriptions"
     onPress={()=>{}}
     
   />
   <Drawer.Item
     style={{ backgroundColor: '#f9f9f9' }}
     icon="settings-outline"
     label="Settings"
     onPress={()=>{}}
     
   />
   <Drawer.Item
     style={{ backgroundColor: '#f9f9f9' }}
     icon="card-text-outline"
     label="Terms and Conditions"
     onPress={()=>{}}
     
   />
   <View style={{...styles.bottom,flexDirection: 'row'}}>
   
 
   <Drawer.Item
   style={{position: 'absolute',bottom: -220}}
    
     icon="something"
     label="Switch to Vendor"
     
     onPress={()=>{}}
     
   />
  
  
   </View>
   
   
   


<Drawer.Item
     style={styles.bottom}
     icon="exit-to-app"
     
     label="Sign Out"
     
     onPress={()=>{}}
     
   />
  

   
            


            
   
   
   
         </View>
       </DrawerContentScrollView>
   </View>
  )};


  const styles = StyleSheet.create({
    bottom: {
   
    marginBottom: '80%',
    alignItems: 'stretch',
    borderTopColor: '#f4f4f4'
  },
  bottom1: {
    position: 'absolute',
   
    alignItems: 'stretch',
    borderTopColor: '#f4f4f4'

  }
  })


export default DrawerContent;