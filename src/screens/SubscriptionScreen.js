import React, { useState } from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Item from '../components/Item';
import SubmitButton from '../components/SubmitButton';
import Button from '../components/Button';
import Date,{okay,selected,fine} from './Date';


const SubscriptionScreen = ({onCalendarOpen,dateResult,goTo,pname,pquan,prate}) => {

    const words = {
        quantityPerDay:'Quantity per day' ,
        repeat:'Repeat' ,
        recharge:'Recharge/Top-Up' ,
        start: 'Start Date'

    };
    const[number,setNumber] = useState(1)
return(<View>
    <Item name={pname} quantity={pquan} price={prate} />
    <View style={style.view1}>
    <Text style={style.greyText}>{words.quantityPerDay}</Text>

    <View style = {style.quantityPick}>
    <TouchableOpacity style={{marginStart: '12%',justifyContent:'center',alignItems:'center'}} onPress={() => {
        setNumber(number!=1 ? number-1 : number)
    }}>
    <Text style={{fontSize: 20,color: '#00C99D'}}>-</Text>
    </TouchableOpacity>
    <Text style ={{marginStart: '24%',justifyContent:'center',alignItems:'center',marginTop:'4%'}}>{number}</Text>
    <TouchableOpacity style={{marginStart:'50%',justifyContent:'center'}}onPress={() => {
        setNumber(number+1)
    }}>
        <Text style={{fontSize: 18,color: '#00C99D'}}>+</Text>
    </TouchableOpacity>
    </View>
    </View>
    <View style={style.line}></View>

    <View style={style.view1}>
<Text style={style.greyText}>{words.repeat}</Text>
    
    <View style ={style.view3}>
    <View style = {style.view2}> 
        
        <View style ={style.circleTapped}>
        <Text style ={style.dayTapped}>M</Text>
        </View>
      
      
        <View style ={style.circleTapped}>
        <Text style ={style.dayTapped}>T</Text>
        </View>
       


  
        <View style ={style.circleTapped}>
        <Text style ={style.dayTapped}>W</Text>
        </View>
        

        <View style ={style.circleTapped}>
        <Text style ={style.dayTapped}>T</Text>
        </View>
        

   <View style ={style.circleTapped}>
        <Text style ={style.dayTapped}>F</Text>
        </View>
    
        <View style ={style.circleTapped}>
        <Text style ={style.dayTapped}>S</Text>
        </View>
        

        <View style ={style.circleTapped}>
        <Text style ={style.dayTapped}>S</Text>
        </View>
        
        
        
       
  
    
    
    </View>
    </View>
    </View>
    <View style={style.line}/>
    <View style={style.view}>
    <Text style={style.greyText}>{words.recharge}</Text>
    <Text style={style.text}>30 deliveries</Text>

    </View>
    <View style={style.line}/>
    <View style={style.selectDate}>
    <Text style={style.greyText}>{words.start}</Text>
    <View style={style.button}>
    <Button text='Change' onTouch={onCalendarOpen}/>
    </View>
    
    <Text style={style.selected}>{okay}</Text>

    </View>
    <View style={{position: 'absolute',bottom: '-10%',alignSelf:'center'}}>
    <SubmitButton text='Subscribe' onTouch={goTo}/>
    </View>

</View>)

};

const style = StyleSheet.create({
    view1: {
        
        height: Dimensions.get('window').height/8,
        flexDirection: 'row',
        marginTop: '5%'
    },
    greyText: {
        marginStart: '8%',
        color: 'gray',
        fontSize: 15,
        fontWeight: 'bold'
    },
    line: {
        borderWidth: 0.5,
        borderColor: 'gray'
    },
    quantityPick:{
        flexDirection: 'row',
        width: '28%',
        aspectRatio:3/1,
        borderColor: '#00C99D',
        borderWidth: 1.5,
        borderRadius: 20,
        position: 'relative',
        marginStart: '30%'
       
        

    },
    view2: {
        flexDirection : 'row',
       justifyContent: 'space-between',
       margin: 3,
       marginHorizontal: '10%',
       

    },
    dayTapped: {

        
        color: 'white',
        fontWeight: '300',
        fontSize: 10,
        
        textAlign: 'center',
        alignItems: 'center',
        marginVertical: 10,
        ...StyleSheet.absoluteFill
        
       
      
        
    
        
    },
    view: {
        
        height: Dimensions.get('window').height/8,
        flexDirection: 'column',
        
        marginTop: '6%',
       
        
        
    },
    text:{
        fontSize: 17,
        marginStart: '8%',
        fontWeight: 'bold',
        marginTop: '4%'
       
    },
    view3:{
        padding: 5,
        height: Dimensions.get('window').height/8,
        flexDirection: 'column',
        
        marginTop: '10%',
        
       
        position: 'absolute'
        

    },
    circleTapped : {
        backgroundColor: '#00C99D',
        height: 35,
        width: 35, 
        borderRadius: 45/2,
        flexDirection: 'row',
        margin: 5
        


    },
    selectDate:{
        flexDirection: 'row',
        marginHorizontal: '5%',
        height: Dimensions.get('window').height/8,
    marginTop: '5%',
        
        
        marginStart: '1%',
    },
    selected:{
        fontSize: 17,
        
        fontWeight: 'bold',
       
        position : 'absolute',
        marginStart: '8%',
        marginTop: '10%',
        

    },
    button:{
        alignItems: 'flex-end',
        flexDirection: 'column',
        width: Dimensions.get('window').width-120,
        marginTop: '2%'
    }
    
});

export default SubscriptionScreen;