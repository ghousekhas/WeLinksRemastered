import React,{useState,useEffect}  from 'react';
import { useFocusEffect} from '@react-navigation/native';
import { BackHandler, View, StyleSheet, Dimensions,Image } from 'react-native';
import { dimen, Styles } from '../Constants';
import {Colors} from '../Constants';
import {Text} from 'react-native-paper';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppBar from '../components/AppBar';
import Axios from 'axios';
import auth from '@react-native-firebase/auth';
import DocumentPicker from 'react-native-document-picker';
import qs from 'qs';



const MyProfile = ({navigation,route}) => {
   const [profileDetails,setProfileDetails] = useState(route.params.actualUser);//[{name: 'holder',email: 'holder',subscription_count: 0,wallet_balance: 0,img_url: 0}]);
   const [addresses,setAddresses] = useState([]);
   const [user_id,setUserID] = useState(route.params.actualUser.user_id);
   const [actualUser,setActualUser] = useState(route.params.actualUser);
    // const [imageuri,setImageUri] = useState('content://com.android.providers.media.documents/document/image%3A17428');
    const words = {
        subscriptions : 'Subscriptions',
        rupee : '₹',
        balance : 'Balance'
    }

    const changeImage= async ()=>{
        try{
            const res = await DocumentPicker.pick({type: [DocumentPicker.types.images]});
            var formdata = new FormData();
            formdata.append('user_image_url',{
                uri: res.uri,
                type:'image/jpeg',
                name: res.name
            });
            console.log('attempting to upload picture');
            Axios.post('https://api.dev.we-link.in/user_app.php?action=editUserProfile&'+qs.stringify({
                user_id: profileDetails.user_id,


            }),formdata).then((response)=>{
                console.log(response.data,"picutre uploaded");
                //setActualUser({...actualUser,})
                setProfileDetails({...profileDetails,img_url: res.uri})
                route.params.getUserDetails(0,auth().currentUser);
                

            },(error)=>{
                console.log(error);
            })

        }
        catch(error){
            console.log(error);
            alert('Please pick a valid jpeg or png image');
        }
    }

   useEffect(() => {
        Axios.get('https://api.dev.we-link.in/user_app.php?action=getUser&phone='+actualUser.phone,).
            then(({data})=>{
                if(data.user[0]!=undefined)
                    setProfileDetails(data.user[0]);
                else
                    console.log('User does not exitst',data);
            },
            (error)=>console.log('Error logged in profile',error))
        //setProfileDetails(route)
        console.log('mounted');
        console.log(route.params.actualUser);
        setActualUser(route.params.actualUser);
        setProfileDetails(route.params.actualUser);
      
            Axios.get('https://api.dev.we-link.in/user_app.php?action=getUserAddresses&user_id='+user_id,{
            'Accept-Encoding': 'gzip'
                }).then((response) => {
                    
                    
                //     console.log("add " + response.data.addresses)
                setAddresses(response.data.addresses)
                //  console.log("jc" + addresses[1])
                }).catch((e) => {
                    console.log('Error with addresses: '+e);
                });
   

       
       
   },[route.params.actualUser])
   
    useFocusEffect(
        React.useCallback(() => {
            Axios.get('https://api.dev.we-link.in/user_app.php?action=getUser&phone='+actualUser.phone,).
            then(({data})=>{
                if(data.user[0]!=undefined)
                    setProfileDetails(data.user[0]);
                else
                    console.log('User does not exitst',data);
            },
            (error)=>console.log('Error logged in profile',error))
          const onBackPress = () => {
       //  console.log('Can\'t go back from here');
         navigation.toggleDrawer();
      
                  
              return true;
            
          };
    
          BackHandler.addEventListener('hardwareBackPress', onBackPress);
          setActualUser(route.params.actualUser);
    
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

    return(<View style={{...StyleSheet.absoluteFill}}>
        <View style={{elevation: 100,zIndex: 100}}>
   <AppBar funct={() => {
        navigation.toggleDrawer();
        }} />
    </View> 
   
    

   <View style={Styles.parentContainer}>
   
    
    <ScrollView>
        <View style={{flex: 0,marginBottom: 50}}>

    <View style={style.header}>

    
    <View style={style.avatarBG}>
        {profileDetails!=null? (
            <Image   // Change to Image
            style={style.avatar}
            source={ profileDetails.img_url.trim()  != ''? {uri: profileDetails.img_url}: require('../../assets/notmaleavatar.png')  }
          
        />
        ) : null}
            <View style={{position: 'absolute',bottom: '5%'}}>
        <TouchableOpacity onPress={()=> changeImage()} >
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

            <TouchableOpacity onPress={()=>navigation.navigate('MySubscriptions',{
                user: actualUser
            })}>
                <Text style = {style.chip}>{words.subscriptions + ' ( '+ actualUser.subscription_count + ' )' }</Text>
            </TouchableOpacity>


           <TouchableOpacity>
                <Text style = {style.chip}>{words.balance + ' ( '+ actualUser.wallet_balance + ' )'}</Text>
            </TouchableOpacity>

            </View>
       

         
    </View>

    <View style={{borderWidth: 0.5,borderRadius: 7,margin: '1%',borderColor: Colors.seperatorGray}}>
        <TouchableOpacity onPress={()=>{
            navigation.navigate('About',{
                edit: true,
                actualUser: actualUser,
                getUserDetails: route.params.getUserDetails
            })
        }}>
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


    <View style={{borderWidth: 0.3,borderRadius: 10,marginHorizontal: '1%',elevation: 0.3,borderColor: Colors.seperatorGray,flex: 0,marginVertical: '5%',justifyContent: 'flex-start'}}>
        <TouchableOpacity onPress={()=>{
            navigation.navigate('AddressList',{
                myAddresses: true,
                actualUser: actualUser,
                profileEdit: true
            })
        }}>
        <View style={{flexDirection: 'row',margin: '5%',flex: 0}}>
        

        <View style={{marginTop: '1%'}}>
        <Icon 
                                name="map-marker-outline" 
                                color='black'

                                
                                size={30}
                                />
        </View>
      

    <View style={{flexDirection: 'column',flex: 1}}>
    <Text style={{...style.blackText,marginBottom: dimen.height/70}}>Addresses</Text>
    
      {renderAddresses()} 
     
       
    </View>
    <View style={{flex:0,alignSelf: 'flex-start'}}>

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
    <View style={{height: dimen.height/30,width: dimen.width}}/>
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