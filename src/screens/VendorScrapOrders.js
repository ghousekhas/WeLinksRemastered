import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet,ScrollView,FlatList,TouchableOpacity, Dimensions, BackHandler,Image} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {Colors, TextSpinnerBoxStyles,dimen,Styles} from '../Constants';
import GenericSeperator from '../components/GenericSeperator';
import { useFocusEffect,CommonActions,useNavigation, StackActions } from '@react-navigation/native';
import {Ionicons} from '@expo/vector-icons';
import AppBar from '../components/AppBar';
import SubmitButton from '../components/SubmitButton'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Axios from 'axios';
import SubscriptionOrder from '../components/SubscriptionOrder';
import LottieView from 'lottie-react-native';
import { setStatusBarHidden } from 'expo-status-bar';
import {Config} from  '../Constants';
import { calendarFormat } from 'moment';

let data=[];


export default function VendorScrapOrders({navigation,route}){
    const [extraData,setExtraData]=useState(0);
    const {user}=route.params;
    const [apiLoaded,setApiLoaded]=useState(true);
    const {vendorID} = route.params;

    console.log("WHENDOR "+vendorID)
    

    const words = {

        title : 'My Scrap Orders'
    }

   

    useFocusEffect(
        React.useCallback(() => {
          const onBackPress = () => {
         console.log('Guess what? We can! go back from here');
       //  route.params.goBackToHome();
       
           navigation.navigate('VendorDashboard')
         //   navigation.reset();
                  
              return true;
            
          };
    
          BackHandler.addEventListener('hardwareBackPress', onBackPress);
          
          

    
          return () =>
            BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        },)
      );



      // here
    const prepareResponse =(responseArray)=>{
       // console.log(dataa);
        data=[];
        let i;
        try{
       data = responseArray;
       if(data == undefined)
            data = [];
        setExtraData(Math.random(0.3));
    }
    catch(e){}

    }

    const retrieveData=()=>{
       
        
        Axios.get(Config.api_url+'php?action=getVendorOrders&vendor_id='+vendorID)
        .then((response)=>{
         //    console.log("Response" +response.data.order);

          //   console.log("R E S "+response.data.order.company_name)
            //data=response.data;
            try{
                prepareResponse(response.data.order);
            }
            catch(error){
                data=[];
            }
            finally{
                setApiLoaded(true);
            }   
            setExtraData(Math.random(0.5));
            
        },(error)=>{
            console.log(error);
            setApiLoaded(true);
        })
        setApiLoaded(false);
    }

    useEffect(()=>{
        retrieveData();
        //const unsub = navigation.addListener('focus',()=>{
            //retrieveData();
         // })
     //     console.log('retrieving')
       
    },[]);
    

    
    const renderCard = (item) => {
        //const {name,quantity,rate,num,days,startDate,endDate,bought,imageUrl}=cardDetails;
        //console.log('myorder',item);
        
       
        return(
        
                <MySubscriptionOrder cardDetails={item} {...item} name={item.name} pickUpDate={item.pickUpDate} orderDate={item.orderDate} orderAmount={item.orderAmount} imageUrl={item.image} status={item.status} cart={item.cart} address={item.address}/>
            )   
    }


   
   

    return(<View style={{width: '100%',height: dimen.height,backgroundColor: 'white',justifyContent: 'flex-start'}}>
    <View style={{height: dimen.height/13}}>
        <AppBar title='My Scrap Orders'back funct={() => {
            
            navigation.navigate('VendorDashboard');
            }} />
        </View>

        <View style={{flex: 1,backgroundColor: 'white'}}>
        {/* <Text style={{...Styles.heading,alignSelf: 'center',paddingVertical: dimen.height/100}}>{words.title}</Text> */}

       <FlatList 
            style={{marginBottom:'5%',backgroundColor: 'white',flex: 1}}
            extraData={extraData}
            data = {data.reverse()}
            keyExtractor= {(item,index)=>index.toString()}
            renderItem = {({item}) => {
                console.log("Statts "+item.order_status)
                let cardDetails = {
                    name : item.user_name,
                    orderAmount : item.order_amount,
                    pickUpDate : item.pickup_date,
                    orderDate : item.order_date,
                    status : item.order_status,
                    image : item.user_image_url,
                    cart : item.cart,
                    orderID : item.scrap_order_id,
                    address : item.addr_details,
                    userID : item.user_id


                    
                }
                return(<TouchableOpacity disabled={true} onPress={() => {
                    let ordered = 'ORDERED'
                    if(cardDetails.status === ordered)
                     navigation.navigate('ScrapPickedConfirmation',{
                         ...cardDetails,
                         tag : 'Vendor',
                         theCard: 'som'
                     })
                    }}>
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
              :
               data[0] === undefined || data[0] === null? <Text style={{...Styles.subbold,alignSelf: 'center',flex:1}}>No sales to show </Text> : null
               
            }
        
      

       
    </View>)
   
}

const MySubscriptionOrder = ({name,pickUpDate,orderAmount,orderDate,imageUrl,status,cart,address,cardDetails}) => {

    const navigation = useNavigation();
    const renderCartItems = (cart) => {
  //      console.log("order date"+ orderDate)
        let i,res = [];
        res.push(<Text>  </Text>)

        for(i in cart){
                res.push(<Text style={{fontWeight: 'bold',fontSize:13}}>{`${cart[i].homescrap_name}${i==cart.length-1? "" : ", "}`}</Text>)

            }
            res.push(<Text>   </Text>)

        return(res)
    }
    const getDate = (date) => {
       console.log("dayte"+date)
   let dayte = date.substring(0,11)
    let arr = dayte.split("-");
    console.log(arr)
    let months = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

        return (arr[2].trim() + "-" + months[arr[1].replace(/^0+/, "")] + "-" + arr[0])

    }

    

    const [alignment,setAlign] = useState(0);


    const theCard = (
        <View style={{flexDirection: 'column',width: dimen.width*0.9,borderColor: Colors.seperatorGray,borderWidth: 1,borderRadius: 8,alignSelf: 'center',marginVertical: dimen.sHm/4,padding:'1%',paddingEnd: '3%'}}>
       
    

    <View style={{flexDirection: 'row',justifyContent:'space-between',alignItems: 'flex-start'}}>
        <Text style={{...styles.greyText1,alignSelf: 'center'}}>{getDate(orderDate)}</Text>
        <View style={{flexDirection:'row',alignSelf: 'center'}}>

        <Text style={{...styles.quantity,marginStart: 10,color: status == 'Cancelled' || status == 'CANCELLED' ? Colors.red : Colors.blue,fontSize:12}}>{status}</Text>
        </View>

    </View>
    <View style={{flexDirection: 'row',flex: 1,width: '100%',marginHorizontal: '3%',marginTop: 5}}>
        <Image onLayout={({nativeEvent}) => {
        setAlign(nativeEvent.layout.width)
    }} style={{height: dimen.width*0.2,width: dimen.width*0.2,flex: 0,alignSelf: 'flex-start',backgroundColor: 'transparent'} }  resizeMethod='resize' resizeMode='cover' source={imageUrl === null || imageUrl === undefined || imageUrl==='' ? require('../../assets/notmaleavatar.png') : {uri: imageUrl}}/>
        <View style={{flexDirection: 'column',marginLeft: '3%',flex:1}}>
        
        <Text style={{...Styles.heading,alignSelf: 'center',width: '100%',padding: 0,marginBottom: '3%',fontSize:14,marginTop: 0}}>
        {name}</Text>
        <ScrollView persistentScrollbar indicatorStyle='white' horizontal style={{flex: 0,flexDirection: 'row',marginRight: 20,padding:'3%',alignSelf:'flex-start',backgroundColor: Colors.whiteBackground,borderRadius: 5,borderColor: Colors.seperatorGray,borderWidth: 0.5}}>
        {renderCartItems(cart)}
        </ScrollView>

        <View style={{flexDirection:'row',width: '100%'}}>
        <Text numberOfLines={3} style={{...Styles.subheading,fontWeight: 'normal',paddingTop: 10,flex:1}}>{address}</Text>

        </View>
        <Text numberOfLines={1} style={{...styles.quantity,alignSelf:'flex-start',fontSize:13}}>{`Pick-up Date : ${getDate(pickUpDate.substring(0,10))}`}</Text>
     
             <Text style={{...styles.quantity,color:'black',alignSelf:'flex-start',fontSize:13}}>Order Total : ₹{orderAmount}</Text>

            {/* <Text style = {{...styles.rate,color: 'black',marginStart: alignment/8,fontSize: 12,alignSelf:'center',marginTop:'3%'}}>{num+" deliveries"}</Text> */}
           
            <View style={{flexDirection:'row',justifyContent: 'flex-end'}}>
        
    

            
        </View>

    </View>
    </View>
    <AntDesign style={{alignSelf:'flex-end',marginHorizontal:'3%',marginBottom: '1%'}} name="right" size={18} color={Colors.primary} />

    </View>


    );
  
       
  
    return(<TouchableOpacity onPress={() => {
        let ordered = 'ORDERED'
        if(status === ordered)
         navigation.navigate('ScrapPickedConfirmation',{
             ...cardDetails,
             tag : 'Vendor',
             theCard: theCard
         })
        }}>
        {theCard}
    </TouchableOpacity>)
        };


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
