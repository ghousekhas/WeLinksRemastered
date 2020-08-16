import React, { useState } from 'react';
import {View, StyleSheet, Text, Dimensions,Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import moment from 'moment';
import {Colors} from '../Constants'

const SubscriptionOrder = ({name,quantity,rate,num,days,startDate,endDate,bought}) => {
    var dayString = "";
   
        console.log(days[i])
         days[0].m ? dayString = dayString.concat("Y") : dayString =  dayString.concat("N")
         days[1].t ? dayString = dayString.concat("Y") : dayString =  dayString.concat("N")
         days[2].w ? dayString = dayString.concat("Y") : dayString =  dayString.concat("N")
         days[3].th ? dayString = dayString.concat("Y") : dayString =  dayString.concat("N")
         days[4].f ? dayString = dayString.concat("Y") : dayString =  dayString.concat("N")
         days[5].s ? dayString = dayString.concat("Y") : dayString =  dayString.concat("N")
         days[6].su ? dayString = dayString.concat("Y") : dayString =  dayString.concat("N")
       
  
    return(<View style={{flexDirection: 'row'}}>
       <Image style={quantity.includes('unit',0)? style.image : style.image1} source={
            quantity.includes('unit',0) ? 
            require('./../../assets/news_p.png')
            : require('./../../assets/milk_p.png')}/>
    
    <View style = {style.container}>
    <View style={{flexDirection: 'row'}}>
    <Text style={style.greyText1}>Period : {startDate+" - "+endDate}</Text>
    <Feather name="trash-2" size={24} color="black" style={style.icon}/>
    </View>
    
    <View style={style.line}/>
 <Text style={style.name}>{name}</Text>
 
        <View style={{flexDirection: 'column'}}>
       
        <View style={{flexDirection: 'row'}}>
        <Text style={style.quantity}>{bought+ " unit/s  · "}</Text>
        <Text style={dayString[0]=='Y'? style.yes : {...style.yes,color: 'gray'}}>  M </Text>
        <Text style={dayString[1]=='Y'? style.yes : {...style.yes,color: 'gray'}}>T </Text>
        <Text style={dayString[2]=='Y'? style.yes : {...style.yes,color: 'gray'}}>W </Text>
        <Text style={dayString[3]=='Y'? style.yes : {...style.yes,color: 'gray'}}>T </Text>
        <Text style={dayString[4]=='Y'? style.yes : {...style.yes,color: 'gray'}}>F </Text>
        <Text style={dayString[5]=='Y'? style.yes : {...style.yes,color: 'gray'}}>S </Text>
        <Text style={dayString[6]=='Y'? style.yes : {...style.yes,color: 'gray'}}>S </Text>
        </View>
       
        <Text style={style.rate}>₹{rate}</Text>
       
        </View>
        <Text style = {style.greyText}>{num+" deliveries"}</Text>


        <View>

        </View>
        </View>
    </View>)

};

const style = StyleSheet.create({
    container:{
        marginTop: '3%',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'gray',
        height: Dimensions.get('window').height/4,
        width: Dimensions.get('window').width-30,
        margin: '3%',
        elevation: 1,
        

        
        
    },
  
    line:{
        borderWidth: 0.5,
        borderColor: 'gray',
        marginVertical: '2%',
      
    }
    ,
    name: {
        marginStart: '34%',
        fontWeight: '400',
        fontSize: 18,
        padding: 5,
        marginTop: '2%',
        fontWeight: '900'
        
    },
    quantity: {
        marginStart: '35%',
        marginTop: '3%',
        fontWeight: 'bold',
        
        
        fontSize: 15,
       
        padding: 1
       
    },
    rate: {
        marginStart: '34%',
        
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: '3%',
        padding: 5
      

    },
    greyText: {
       
        color: 'gray',
        fontSize: 13,
        fontWeight: 'bold',
      
        textAlign: 'right',
        margin: '2%',
        marginEnd: '3.6%'
        
        
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
        width: 73,
        height: 70,
        position: 'absolute',
        marginStart: '4%',
        
        marginTop : '16%'
        
       
    },
    image: {
        width: 90,
        height: 60,
        position: 'absolute',
        marginStart: '3%',
        
        marginTop : '16%'
        
       
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
    

});

export default SubscriptionOrder
