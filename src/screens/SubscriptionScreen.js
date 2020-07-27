import React, { useState, useImperativeHandle, useEffect } from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Item from '../components/Item';
import SubmitButton from '../components/SubmitButton';
import Button from '../components/Button';



const SubscriptionScreen = ({onCalendarOpen,onWeekOpen,goTo,pname,pquan,prate,dateref,weekref}) => {

    const words = {
        quantityPerDay:'Quantity per day' ,
        repeat:'Repeat' ,
        recharge:'Recharge/Top-Up' ,
    };
    const[number,setNumber] = useState(1);
    const[start,setStart]= useState( 'Start Date');
    const[wo,setWeek]= useState([true,true,true,true,true,true,true]);
    useEffect(()=>{
        setStart(dateref);
        var weeknd= {...weekref}
        setWeek(weeknd);
        //console.log(wo[0],wo[1],wo[2],wo[3],wo[4],wo[5],wo[6])
    },[dateref,weekref]);

return(<View >
    <Item name={pname} quantity={pquan} price={prate} />
    <View style={style.view1}>
    <Text style={style.greyText}>{words.quantityPerDay}</Text>

    <View style = {style.quantityPick}>
    <TouchableOpacity style={style.minus} onPress={() => {
        setNumber(number!=1 ? number-1 : number)
    }}>
    <Text style={{fontSize: 20,color: '#00C99D'}}>-</Text>
    </TouchableOpacity>
    <Text style ={style.plus}>{number}</Text>
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
     <View style={style.button}>
    <Button text='Change' onTouch={onWeekOpen}/>
    </View>
    
    <View style ={style.view3}>
    <View style = {style.view2}> 
        
        <View style ={wo[0]?style.circleTapped:{...style.circleTapped,backgroundColor:'gray'}}>
        <Text style ={style.dayTapped}>M</Text>
        </View>
      
      
        <View style ={wo[1]?style.circleTapped:{...style.circleTapped,backgroundColor:'gray'}}>
        <Text style ={style.dayTapped}>T</Text>
        </View>
       


  
        <View style ={wo[2]?style.circleTapped:{...style.circleTapped,backgroundColor:'gray'}}>
        <Text style ={style.dayTapped}>W</Text>
        </View>
        

        <View style ={wo[3]?style.circleTapped:{...style.circleTapped,backgroundColor:'gray'}}>
        <Text style ={style.dayTapped}>T</Text>
        </View>
        

        <View style ={wo[4]?style.circleTapped:{...style.circleTapped,backgroundColor:'gray'}}>
        <Text style ={style.dayTapped}>F</Text>
        </View>
    
        <View style ={wo[5]?style.circleTapped:{...style.circleTapped,backgroundColor:'gray'}}>
        <Text style ={style.dayTapped}>S</Text>
        </View>
        

        <View style ={wo[6]?style.circleTapped:{...style.circleTapped,backgroundColor:'gray'}}>
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
    <Text style={style.greyText}>{start}</Text>
    <View style={style.button}>
    <Button text='Change' onTouch={onCalendarOpen}/>
    </View>
    
    <Text style={style.selected}></Text>

    </View>
    <View style={{position: 'absolute',bottom: '-5%',alignSelf:'center'}}>
    <SubmitButton text='Subscribe' onTouch={goTo}/>
    </View>

</View>)

};

const style = StyleSheet.create({
    view1: {
        
        height: Dimensions.get('window').height/7,
        flexDirection: 'row',
        marginTop: '5%',
        
      
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
    
    alignItems: 'stretch',
        
        
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
       
        flexDirection: 'column',
        width: Dimensions.get('window').width/4,
        aspectRatio: 5/1.3,
        marginTop: '2%',
        
        position: 'absolute',
        marginStart: Dimensions.get('window').width/1.4,
        
    },
    button1:{
        alignItems: 'flex-end',
        flexDirection: 'column',
        width: Dimensions.get('window').width-120,
        marginTop: '2%',
        marginStart: '30%'
        
    },
    minus: {
    marginStart: '12%',
    justifyContent:'center',
    alignItems:'center',
    
},
plus: {
    marginStart: '24%',
    justifyContent:'center',
    alignItems:'center',
    marginTop:'4%'
}


    
});

export default SubscriptionScreen;