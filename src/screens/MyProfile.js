import React,{useState,useEffect}  from 'react';
import { useFocusEffect} from '@react-navigation/native';
import { BackHandler, View, StyleSheet, Dimensions,Image } from 'react-native';
import { Styles } from '../Constants';
import {Colors} from '../Constants';
import {Text,Appbar} from 'react-native-paper';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppBar from '../components/AppBar';
import Axios from 'axios';


const MyProfile = ({navigation}) => {
   const [profileDetails,setProfileDetails] = useState([{name: 'holder',email: 'holder'}]);
   const [addresses,setAddresses] = useState([]);
    // const [imageuri,setImageUri] = useState('content://com.android.providers.media.documents/document/image%3A17428');
    const words = {
        subscriptions : 'Subscriptions',
        rupee : '₹',
        balance : 'Balance'
    }

   useEffect(() => {
       Axios.get('https://api.dev.we-link.in/user_app.php?action=getUser&phone=9144200060',{
        'Accept-Encoding': 'gzip'
       }).then((response) => {
         
     
      setProfileDetails(response.data.user[0])
   //   console.log(profileDetails)
    
       }).catch((e) => {
           console.log('Error with profile: '+e);
       });


       Axios.get('https://api.dev.we-link.in/user_app.php?action=getUserAddresses&user_id=1',{
        'Accept-Encoding': 'gzip'
       }).then((response) => {
         
        
      //     console.log("add " + response.data.addresses)
      setAddresses(response.data.addresses)
     //  console.log("jc" + addresses[1])
       }).catch((e) => {
           console.log('Error with addresses: '+e);
       });
       
   })
   
    useFocusEffect(
        React.useCallback(() => {
          const onBackPress = () => {
       //  console.log('Can\'t go back from here');
         navigation.toggleDrawer();
      
                  
              return true;
            
          };
    
          BackHandler.addEventListener('hardwareBackPress', onBackPress);
    
          return () =>
            BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        },)
      );

      const renderAddresses = () => {
     
          let addressArray = [];
          for(let i in addresses){
                 // console.log(addresses[i].addr_details)
              addressArray.push(<View>
     <Text style={{...style.blackText,fontWeight: '900', color: 'gray',marginTop: '1%'}}>{addresses[i].addr_details}</Text>

              </View>)
          }
        //  console.log(addressArray)
   
          return addressArray;
      }
    return(<View>
   
     
   <AppBar funct={() => {
        navigation.toggleDrawer();
        }} />

   <View style={Styles.parentContainer}>
   
    
    <ScrollView>
        <View style={{flex: 1}}>

    <View style={style.header}>

    
    <View style={style.avatarBG}>
        <Image   // Change to Image
                style={style.avatar}
              
            />
            <View style={{position: 'absolute',bottom: '5%'}}>
        <TouchableOpacity >
            <Icon 
                    name='pencil'
                    size={20}
                    elevation={1}
                    color='white'
                />

          </TouchableOpacity>
                       </View>
    </View>

    <Text style={style.name}>{profileDetails.name}</Text>
    
    

            <View style={style.chips}>

            <TouchableOpacity>
                <Text style = {style.chip}>{words.subscriptions}</Text>
            </TouchableOpacity>


           <TouchableOpacity>
                <Text style = {style.chip}>{words.balance}</Text>
            </TouchableOpacity>

            </View>
       

         
    </View>

    <View style={{borderWidth: 0.5,borderRadius: 7,margin: '1%',borderColor: Colors.seperatorGray}}>
        <TouchableOpacity>
        <View style={{flexDirection: 'row',margin: '5%',marginTop: '7%'}}>

        <View style={{marginTop: '1%'}}>
        <Icon 
                                name="account-outline" 
                                color='black'
                                
                                size={30}
                                />
        </View>
      

        <View style={{flexDirection: 'column'}}>
            <Text style={style.blackText}>Profile details</Text>
            <Text style={{...style.blackText,fontWeight: '900', color: 'gray',marginTop: '1%'}}>{profileDetails.name}</Text>
            <Text style={{...style.blackText,fontWeight: '900', color: 'gray',marginTop: '1%'}}>{profileDetails.email}</Text>
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


    <View style={{borderWidth: 0.3,borderRadius: 10,margin: '1%',elevation: 0.3,borderColor: Colors.seperatorGray}}>
        <TouchableOpacity>
        <View style={{flexDirection: 'row',margin: '5%',marginTop: '7%'}}>

        <View style={{marginTop: '1%'}}>
        <Icon 
                                name="map-marker-outline" 
                                color='black'
                                
                                size={30}
                                />
        </View>
      

    <View style={{flexDirection: 'column'}}>
      {renderAddresses()} 
       
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

    </View>
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
        width: '100%',
        height: '100%',
        opacity: 0.9,
        borderRadius: 1000
        
        
    },
    avatarBG: {
        height: Dimensions.get('window').width/3.5,
        aspectRatio: 1/1,alignItems:'center',
        justifyContent: 'center',
        borderRadius: 8

    },
    chips: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: Dimensions.get('window').width,
        marginTop: '5%'

    },
    chip: {
        borderWidth : 1,
        borderRadius: 20,
        borderColor: Colors.seperatorGray,
        color: 'white',
        padding: '2%',
        width: Dimensions.get('window').width/3.2,
        textAlign: 'center',
        fontSize: 10,
        margin: '1%'

    },
    blackText: {
        margin: '1%',
        fontWeight: 'bold',
        fontSize: 14,
        marginStart: '15%',
        marginTop: '1%'
    },
    name: {
        color: 'white',
        fontSize: 15,
        marginVertical: '3%'
    }
   
})

export default MyProfile;