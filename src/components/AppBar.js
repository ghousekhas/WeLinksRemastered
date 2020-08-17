import * as React from 'react';
import { Appbar, TouchableRipple } from 'react-native-paper';
import { StyleSheet, Dimensions } from 'react-native';

import { Avatar,Subheading,Button } from 'react-native-paper';
import { View } from 'react-native-animatable';
import { userDetails } from '../UserDetails';
import { Entypo } from '@expo/vector-icons'; 
import { EvilIcons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';
import {Colors} from '../Constants'
import { TouchableOpacity } from 'react-native-gesture-handler';


const AppBar = ({toggle}) => { 
    return(
    <View style={{zIndex: 150,elevation: 100}}><Appbar style={styles.bottom}>
        <Appbar.Header style={styles.header}>
        <TouchableOpacity onPress={(toggle)} underlayColor='rgba(0,0,0,0)' rippleColor= 'transparent' style={styles.ripple}  >
              <EvilIcons name="navicon" size={26} color="white" style={styles.hamburger} />
        </TouchableOpacity>
        
           
          </Appbar.Header>

        
         
          {/* <Avatar.Image size={30} source={require('../../assets/avatar.png')}
          style={styles.avatar} />
         
           <Subheading style={styles.username}>{userDetails.USER_NAME}</Subheading>
           

           <Button labelStyle={styles.cityText}
            style={styles.city} uppercase={false} contentStyle = {styles.cityTextStyle}
             mode="contained" onPress={() => console.log('Pressed')} compact={true}>
           
            {userDetails.USER_CITY}
           </Button> */}
         </Appbar>
       
        </View>)
};
    
  
    
  


const styles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: Dimensions.get('window').height/14,
    backgroundColor: Colors.primary,
    color: Colors.primary,
    
    elevation: 1.5
  },
  header: {
    backgroundColor: 'transparent',
    elevation: 0,
    flexDirection: 'row',
    borderRadius: 100

  },
  back: {
   color: 'white',
      
  },
  avatar: {
      position: 'absolute',
      right: Dimensions.get('window').width/3,
    //   borderWidth: 0.5,
    // //   borderColor: 'white',

      
  },
  username :{
      fontSize: 12,
      color: 'white',
      fontWeight :'800',
      position: 'absolute',
      right:Dimensions.get('window').width/6,
      top: 3,
      
  },
  city: {
      width:Dimensions.get('window').width/5,
      aspectRatio: 10/2.5,
      backgroundColor : 'transparent',
      elevation: 0,
    
    color: 'white',
   
   
    borderRadius : 5,
    borderWidth : 0.5,
    borderColor: 'white',    
    position: 'absolute',
    right:Dimensions.get('window').width/8,
    bottom: 8,
   
    

  },
  cityText : {
      fontSize : 10,
      flex: 1,
      color: 'white'
  },
  cityTextStyle: {
      padding: 1,
      width:Dimensions.get('window').width/5,
      aspectRatio: 10/2.5,
  },
  more: {
      position: 'absolute',
      right: 0.1,
      alignItems: 'center',
      justifyContent: 'center'
  },
  ripple:{
    width: Dimensions.get('window').height/14,
    height: Dimensions.get('window').height/14,
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0)',
    borderRadius: Dimensions.get('window').height/14
  },
  hamburger:{
    alignSelf: 'center',

    borderRadius: 100

  }
});

export default AppBar