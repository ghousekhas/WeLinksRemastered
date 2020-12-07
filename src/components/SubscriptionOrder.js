import React, { useState } from 'react';
import {View, StyleSheet, Text, Dimensions,Image,Alert} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import moment from 'moment';
import {Colors,dimen} from '../Constants'
import {useNavigation} from '@react-navigation/native';

const SubscriptionOrder = ({tag,name,quantity,rate,num,days,startDate,endDate,quan,imageUrl,rate_}) => {
    const navigation = useNavigation();
    const getDate = (date) => {
       let arr = date.split(' ');
       console.log(arr[0] + "-" + arr[1].slice(0,3) +"-" + arr[2]);
       return arr[0] + "-" + arr[1].slice(0,3) +"-" + arr[2];
    }
    console.log('Tag :' + tag);

    const [alignment,setAlign] = useState(0);
    var dayString = "";
   
        //console.log(days[i])
         days[0].m ? dayString = dayString.concat("Y") : dayString =  dayString.concat("N")
         days[1].t ? dayString = dayString.concat("Y") : dayString =  dayString.concat("N")
         days[2].w ? dayString = dayString.concat("Y") : dayString =  dayString.concat("N")
         days[3].th ? dayString = dayString.concat("Y") : dayString =  dayString.concat("N")
         days[4].f ? dayString = dayString.concat("Y") : dayString =  dayString.concat("N")
         days[5].s ? dayString = dayString.concat("Y") : dayString =  dayString.concat("N")
         days[6].su ? dayString = dayString.concat("Y") : dayString =  dayString.concat("N")

       //  getDate(startDate)
       
  
    return(<View style={{flexDirection: 'row',height: dimen.height/3.5 }}>
       
    
    <View style = {style.container}>
    
    <View style={{flexDirection: 'row'}}>
    
    <Text style={style.greyText1}>{getDate(startDate)+" to "+getDate(endDate)}</Text>
   
    </View>
    
    <View style={style.line}/>
    <View style={{flexDirection: 'row'}}>
    <Image onLayout={({nativeEvent}) => {
        setAlign(nativeEvent.layout.height)
    }} style={{...style.image,height: alignment*0.7,width: alignment*0.7,zIndex: 100,alignSelf:'flex-start'}} width={60}  resizeMethod={'auto'} resizeMode='contain' source={imageUrl.trim() != '' ? {uri: imageUrl}: require('../../assets/notmaleavatar.png')}/>
 <Text style={{...style.name,marginStart: alignment+alignment/4-9}}>{name}</Text>
 <Feather onPress={() => {
  Alert.alert(
      "Are you sure you want to remove this item?",
      "",
      [
    
        {
          text: "Confirm",
          onPress: () => {if(tag == "Milk")
          navigation.navigate('VendorScreen')
          else navigation.navigate('VendorScreen1')
          },
         
        },
        { text: "Close", onPress: () => console.log("OK Pressed"), style: "cancel" }
      ],
      { cancelable: false }
    );
 }} name="trash-2" size={22} color={Colors.seperatorGray} style={style.icon}/>
 </View>
 
        <View>
    
      
     
        
       
        <View style={{flexDirection: 'row',margin: '2%'}}>
        <Text style={{...style.quantity,marginStart: alignment+alignment/4-9,fontSize: 13}}>{quantity.includes('unit') ? num + " units · " : quantity +" · "}</Text>
        <Text style={dayString[0]=='Y'? style.yes : {...style.yes,color: 'gray'}}>  M </Text>
        <Text style={dayString[1]=='Y'? style.yes : {...style.yes,color: 'gray'}}>T </Text>
        <Text style={dayString[2]=='Y'? style.yes : {...style.yes,color: 'gray'}}>W </Text>
        <Text style={dayString[3]=='Y'? style.yes : {...style.yes,color: 'gray'}}>T </Text>
        <Text style={dayString[4]=='Y'? style.yes : {...style.yes,color: 'gray'}}>F </Text>
        <Text style={dayString[5]=='Y'? style.yes : {...style.yes,color: 'gray'}}>S </Text>
        <Text style={dayString[6]=='Y'? style.yes : {...style.yes,color: 'gray'}}>S </Text>
        </View>

       <View style={{flexDirection:'row',paddingBottom: '5%'}}>
       {tag == 'Milk' ? <Text style={{...style.rate,marginStart: alignment+alignment/4}}>₹{rate}</Text> : <View>
       <Text style={{...style.rate,marginStart: alignment+alignment/4}}>Weekdays : ₹{rate}</Text>
       <Text style={{...style.rate,marginStart: alignment+alignment/4}}>Weekends : ₹{rate_}</Text>
       </View>}
       <View style={{flex:1,justifyContent: 'flex-end'}}>
       <Text style = {{...style.rate,color: 'gray',textAlign: 'left',fontSize: 12,alignSelf:'flex-end'}}>{num+" deliveries"}</Text>

       </View>
       </View>
       
       
        </View>
       


        <View>

        </View>
        </View>
    </View>)

};

const style = StyleSheet.create({
    container:{
    
      
       
        width: Dimensions.get('window').width-30,
        
        elevation: 1,
        padding: '1%',
       
        borderRadius: 15,
        borderColor: Colors.seperatorGray,
        borderWidth: 0.3,
      
       
      
        alignSelf: 'center',
        backgroundColor: 'white',
        elevation: 1,
        

        
        
    },
  
    line:{
        borderWidth: 0.5,
        borderColor: Colors.seperatorGray,
        marginVertical: '2%',
      
    }
    ,
    name: {
     //   marginStart: '34%',
        fontWeight: '400',
        fontSize: 16,
        padding: 5,
        marginTop: '2%',
        fontWeight: 'bold',
        color:'black'
        
    },
    quantity: {
      //  marginStart: '35%',
        marginTop: '3%',
        fontWeight: 'bold',
        
        
        fontSize: 13,
       
        padding: 1
       
    },
    rate: {
        
        
        fontWeight: 'bold',
        fontSize: 13,
        marginHorizontal: '8%',
       
        color:'black'
      

    },
    greyText: {
       
        color: 'gray',
        fontSize: 15,
        fontWeight: 'bold',
     // marginStart: '10%',
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
        fontSize: 13,
        
        
    }
    

});

export default SubscriptionOrder
