import React,{useState} from 'react';
import {View,Text,TouchableOpacity, Image} from 'react-native';
import {Colors, dimen,Styles} from '../Constants';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

export default function VendorSubscriptionOrder({name,pickUpDate,orderAmount,orderDate,imageUrl,status,productType,address,cardDetails,startDate,endDate}) {
    console.log("stort "+startDate)
        const navigation = useNavigation();
        const renderCartItems = () => {
      //      console.log("order date"+ orderDate)
         return(<Text style={{fontWeight: 'bold',fontSize:13}}>{productType == 'milk' ? 'Milk Order' : 'Newspaper Order'}</Text>)
    
                
    
        }
        const getDate = (date) => {
           console.log("dayte"+date)
       let dayte = date.substring(0,11)
        let arr = dayte.split("-");
      //  console.log(arr)
        let months = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    
            return (arr[2].trim() + "-" + months[arr[1].replace(/^0+/, "")] + "-" + arr[0])
    
        }
    
        
    
        const [alignment,setAlign] = useState(0);
    
    
        const theCard = (
            <View style={{flexDirection: 'column',width: dimen.width*0.9,borderColor: Colors.seperatorGray,borderWidth: 1,borderRadius: 8,alignSelf: 'center',marginVertical: dimen.sHm/4,padding:'1%',paddingEnd: '3%'}}>
           
        
    
        <View style={{flexDirection: 'row',justifyContent:'space-between',alignItems: 'flex-start'}}>
            <Text style={{...styles.greyText1,alignSelf: 'center'}}>{`${getDate(startDate.substring(0,10))} to ${getDate(endDate.substring(0,10))}`}</Text>
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
            {/* <ScrollView persistentScrollbar indicatorStyle='white' horizontal style={{flex: 0,flexDirection: 'row',marginRight: 20,padding:'3%',alignSelf:'flex-start',backgroundColor: Colors.whiteBackground,borderRadius: 5,borderColor: Colors.seperatorGray,borderWidth: 0.5}}>
            {renderCartItems()}
            </ScrollView> */}
    
            <View style={{flexDirection:'row',width: '100%'}}>
            <Text numberOfLines={3} style={{...Styles.subheading,fontWeight: 'normal',paddingTop: 10,flex:1}}>{address}</Text>
    
            </View>
            <Text numberOfLines={1} style={{...styles.quantity,alignSelf:'flex-start',fontSize:13}}>{`Order Date : ${getDate(orderDate.substring(0,10))}`}</Text>
         
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
    
             navigation.navigate('VendorSubscriptionDetails',{
                 cardDetails,
                 card : theCard
             })
             
            }}>
            {theCard}
        </TouchableOpacity>)
            };
    