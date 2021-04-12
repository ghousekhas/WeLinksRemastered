import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet,FlatList,TouchableOpacity, BackHandler} from 'react-native';
import {Colors, dimen,Styles} from '../Constants';
import { useFocusEffect } from '@react-navigation/native';
import AppBar from '../components/ui_components/AppBar';
import Axios from 'axios';
import LottieView from 'lottie-react-native';
import {Config} from  '../Constants';
import VendorSubscriptionOrder from '../components/VendorSubscriptionOrder';

let data=[];


export default function VendorSubscriptions({navigation,route}){
    const {vendorID,tag} = route.params;

    const [extraData,setExtraData]=useState(0);
    const [apiLoaded,setApiLoaded]=useState(true);
    

    const words = {
        title : 'My Scrap Orders'
    }

   

    useFocusEffect(
        React.useCallback(() => {
        //Going back to vendor home on back
          const onBackPress = () => {
           navigation.navigate('VendorDashboard')                
              return true;
          };
    
          BackHandler.addEventListener('hardwareBackPress', onBackPress);
          
            
          return () =>
            BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        },)
      );



      // Adding items to list only if orders are not cancelled and making necessary changes to the response
    const prepareResponse =(responseArray)=>{
       // console.log(dataa);
        data=[];
        let i;
        try{
            responseArray.forEach((value)=>{
                if(value.order_status != "Canceled")
                    data.push(value);
            });
       if(data == undefined)
            data = [];
        setExtraData(Math.random(0.3));
    }
    catch(e){}

    }

    const retrieveData=()=>{
        
       if(tag == 'Milk'){
        Axios.get(Config.api_url+'php?action=getSubscriptionsForVendors&vendor_id='+vendorID+'&product_type=milk')
        .then((response)=>{
         //   console.log("Response" +response.data.order);
console.log(typeof(response.data))
            console.log("R E S "+JSON.stringify(response.data[0]))
            data=response.data;
            try{
                prepareResponse(response.data);
            }
            catch(error){
                console.log("Fetch error "+error)
                data=[];
            }
            finally{
                setApiLoaded(true);
            }   
            setExtraData(Math.random(0.5));
            
        },(error)=>{
            console.log("Err "+error);
            setApiLoaded(true);
        })
        setApiLoaded(false);
       }
       else{
        Axios.get(Config.api_url+'php?action=getSubscriptionsForVendors&vendor_id='+vendorID+'&product_type=newspaper')
        .then((response)=>{
         //   console.log("Response" +response.data.order);
console.log(typeof(response.data))
            console.log("R E S "+JSON.stringify(response.data[0]))
            data=response.data;
            try{
                prepareResponse(response.data);
            }
            catch(error){
                console.log("Fetch error "+error)
                data=[];
            }
            finally{
                setApiLoaded(true);
            }   
            setExtraData(Math.random(0.5));
            
        },(error)=>{
            console.log("Err "+error);
            setApiLoaded(true);
        })
        setApiLoaded(false);
       }
        
       
    }

    useEffect(()=>{
        retrieveData();       
    },[]);
    

    
    const renderCard = (item) => {
        return (<VendorSubscriptionOrder cardDetails={item} {...item}  name={item.name} pickUpDate={item.pickUpDate} orderDate={item.orderDate} orderAmount={item.orderAmount} imageUrl={item.image} status={item.status} cart={item.cart} address={item.address} startDate={item.startDate} endDate={item.endDate} />);
    }


    return(<View style={{width: '100%',height: dimen.height,backgroundColor: 'white',justifyContent: 'flex-start'}}>
    <View style={{height: dimen.height/13}}>
        <AppBar title={tag=='Milk' ? 'Milk Subscriptions':'Newspaper Subscriptions'} back funct={() => {
            
            navigation.navigate('VendorDashboard')
            }} />
        </View>

        <View style={{flex: 1,backgroundColor: 'white'}}>
        {/* <Text style={{...Styles.heading,alignSelf: 'center',paddingVertical: dimen.height/100}}>{words.title}</Text> */}

       <FlatList 
            style={{marginBottom:'5%',backgroundColor: 'white',flex: 1}}
            extraData={extraData}
            data = {data}
            keyExtractor= {(item,index)=>index.toString()}
            renderItem = {({item}) => {
                console.log("Statts "+item.quantity)
                let cardDetails = {
                    name : item.user_name,
                    orderAmount : item.order_total,
                    orderDate : item.order_date,
                    //status : item.order_status,
                    image : item.user_image_url,
                    productName : item.product_name,
                    productImage: item.product_image,
                    productType: item.product_type,
                    address : item.address.addr_details,
                    startDate : item.subscription_start_date,
                    endDate : item.subscription_end_date,
                    deliveries : item.no_of_deliveries,
                    days : item.subscription_days,
                    quantity : item.quantity,
                    status: item.subscription_status === "Pending" ? "Ongoing" : "Completed"


                    
                }
                return(<TouchableOpacity disabled={true} >
                {renderCard(cardDetails)}
                </TouchableOpacity>)
                 
            }}
        />
    
        </View>

       
        {!apiLoaded && data[0] === undefined?
        (
         <View style={{...StyleSheet.absoluteFill,backgroundColor: 'white',zIndex: 10}}>
                <LottieView  
                enableMergePathsAndroidForKitKatAndAbove
              style={{flex:1,padding: 50,margin:50}}  source={require('../../assets/animations/logistics.json')} resizeMode={'contain'} autoPlay={true} loop={true}/>
              </View>)
              : data[0] === undefined || data[0] === null? <Text style={{...Styles.subbold,alignSelf: 'center',flex:1}}>No subscriptions to show </Text> : null
               
            
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
    
    line:{
        borderWidth: 0.5,
        borderColor: Colors.seperatorGray,
        marginVertical: '2%',
      
    }
    ,
    name: {
        fontWeight: '400',
        fontSize: 18,
        padding: 5,
        marginTop: '2%',
        fontWeight: 'bold',
        color:'black'
        
    },
    quantity: {
       
       marginTop: '2%',
        fontWeight: 'bold',
        
        
        fontSize: 15,
       
        padding: 1
       
    },
    rate: {
        
        
        fontWeight: 'bold',
        fontSize: 14,
        marginTop: '3%',
       
        color:'black'
      

    },
    greyText: {
       
        color: 'gray',
        fontSize: 15,
        fontWeight: 'bold',
      marginStart: '10%',
      paddingVertical: '3%',
      marginVertical: '4%'  
    },
    greyText1: {
        marginStart: '3%',
        color: 'gray',
        fontSize: 12,
        fontWeight: 'bold',
        margin: '2%',
        marginTop:'4%'
        
    },
    image1: {
        width: 60,
        height: 60,
        position: 'absolute',
        padding: 10,
        zIndex: 10000

    },
    image: {
        width: 80,
        height: 80,
        position: 'absolute',
        marginStart: '4%',
        marginTop: '10%',
    },
    icon: {
        marginVertical: '2.2%',
        
     position: 'absolute',
     right: '2%'
       
    },
    yes: {
        color: Colors.primary,
        marginTop: '3.5%',
        fontWeight: 'bold',
        fontSize: 15,
        
        
    }
})
