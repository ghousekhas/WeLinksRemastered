import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet,ScrollView,FlatList,TouchableOpacity, Dimensions, BackHandler} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {Colors, TextSpinnerBoxStyles,dimen,Styles} from '../Constants';
import GenericSeperator from '../components/GenericSeperator';
import { useFocusEffect,CommonActions,useNavigation, StackActions } from '@react-navigation/native';
import {Ionicons} from '@expo/vector-icons';
import AppBar from '../components/AppBar';
import SubmitButton from '../components/SubmitButton'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import Axios from 'axios';
import SubscriptionOrder from '../components/SubscriptionOrder';
import LottieView from 'lottie-react-native';

var data=[];


export default function MySubscriptions({navigation,route}){
    const [extraData,setExtraData]=useState(0);
    const {user}=route.params;
    const [apiLoaded,setApiLoaded]=useState(false);

    useFocusEffect(
        React.useCallback(() => {
          const onBackPress = () => {
         console.log('Can\'t go back from here');
         navigation.toggleDrawer();
       
        // navigation.goBack();
         //   navigation.reset();
                  
              return true;
            
          };
    
          BackHandler.addEventListener('hardwareBackPress', onBackPress);
          
          

    
          return () =>
            BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        },)
      );

    const prepareResponse =(dataa)=>{
        console.log(dataa);
        data=[];
        dataa.forEach(item => {
            console.log(item);
            //console.log('parsed',JSON.parse(item.subscription_days));
            data.push({
                name: item.product_name,
                imageUrl: item.product_image,
                startDate: item.subscription_start_date.substring(0,11),
                endDate: item.subscription_end_date.substring(0,11),
                bought: item.quantity,
                rate: item.order_amount,
                num: item.no_of_deliveries,
                days: item.subscription_days


            })
        });
        setExtraData(Math.random(0.3));

    }

    const retrieveData=()=>{
        
        Axios.get('https://api.dev.we-link.in/user_app.php?action=getSubscriptions&user_id='+user.user_id)
        .then((response)=>{
            console.log(response.data);
            //data=response.data;
            prepareResponse(response.data);
            setExtraData(Math.random(0.5));
            setApiLoaded(true);
        },(error)=>{
            console.log(error);
            setApiLoaded(true);
        })
        setApiLoaded(false);
    }

    useEffect(()=>{
        retrieveData();
        const unsub = navigation.addListener('focus',()=>{
            retrieveData();
          })
       
    },[]);
    

    
    const renderCard = (item) => {
        //const {name,quantity,rate,num,days,startDate,endDate,bought,imageUrl}=cardDetails;
        //console.log('myorder',item);
        
       
        return(
            <View style={{marginVertical: dimen.height/10,marginStart: dimen.width/20,backgroundColor: 'black',height: 100,width: 100}}>
                <SubscriptionOrder {...item} days={[{m: item.days.includes('Monday')},{t: item.days.includes('Tues')},{w: item.days.includes('Wednesday')},{th: item.days.includes('Thursday')},{fr: item.days.includes('Friday')},{s: item.days.includes('Saturday')},{su: item.days.includes('Sunday')}]} />
            </View>
            )   
    }


   

    return(<View style={{width: '100%',height: dimen.height,backgroundColor: 'white',justifyContent: 'flex-start'}}>
    <View style={{height: dimen.height/13}}>
        <AppBar back={false} funct={() => {
            
            navigation.toggleDrawer();
            }} />
        </View>

        <View style={{flex: 1,backgroundColor: 'white'}}>
        <Text style={{...Styles.heading,alignSelf: 'center',paddingVertical: dimen.height/100}}>Your subscriptions</Text>

        <FlatList 
            style={{marginBottom:'5%',backgroundColor: 'white',flex: 1}}
            extraData={extraData}
            data = {data}
            keyExtractor= {(item,index)=>index.toString()}
            renderItem = {({item}) => {
                let cardDetails = {
                    
                }
                return(<TouchableOpacity disabled={true} onPress={() => {
                        return null
                    }}>
                {renderCard(item)}
                </TouchableOpacity>)
                 
            }}
        />
       
    

        

      
       
        </View>

       
        {!apiLoaded && data[0] === undefined ?
        (
         <View style={{...StyleSheet.absoluteFill,backgroundColor: 'white',zIndex: 10}}>
                <LottieView  
                enableMergePathsAndroidForKitKatAndAbove
              style={{flex:1,padding: 50,margin:50}}  source={require('../../assets/animations/logistics.json')} resizeMode={'contain'} autoPlay={true} loop={true}/>
              </View>)
              :
               data[0] === undefined ? <Text style={{...Styles.subbold,alignSelf: 'center'}}>No subscriptions to show </Text> : null
               
            }
        
      

       
    </View>)
   
}


const styles = StyleSheet.create({
    tabs: {
        width: dimen.width-dimen.width/10,
        aspectRatio:10/1.5,
        borderRadius: 15,
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        marginTop: '5%',
        alignSelf: 'center',
        margin: '3%'

    },
    tab: {
        width: (dimen.width-dimen.width/10)/2,
        aspectRatio:(10/1.5)/2,
        borderRadius: 15,
        backgroundColor:'#43E0B4' ,
        flexDirection: 'row',
      //  marginTop: '6%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'

    },
    tabWord: {
        fontWeight: 'bold',
        color: Colors.white,

    },
    card: {
        width: dimen.width-dimen.width/10,
        height: dimen.height/3.4,
        borderRadius: 15,
        borderColor: Colors.seperatorGray,
        borderWidth: 0.5,
       padding:'2%',
        marginTop: '5%',
        alignSelf: 'center',
        backgroundColor: 'white',
        elevation: 1,
        // marginBottom:'1%'
        
    },
    cardTitle: {
        fontWeight: 'bold',
        color: Colors.primary,
        padding: '1%',
        fontSize: 14,
       
    },
    duration:{
        paddingVertical: 5,
        paddingHorizontal: 3,
        margin: 3,
        borderStyle: 'dashed',
        borderColor: Colors.primary,
        flexDirection: 'row'
    },
})
