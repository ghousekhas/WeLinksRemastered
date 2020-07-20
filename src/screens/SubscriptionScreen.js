import React, { useState } from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Item from '../components/Item';
import SubmitButton from '../components/SubmitButton';


const SubscriptionScreen = () => {
    const[number,setNumber] = useState(1)
return(<View>
    <Item name='Thirumala Double Toned Milk (500ml) ' quantity='1 Ptk' price='200' bought='30 Pkts' />
    <View style={style.view1}>
    <Text style={style.greyText}>Quantity per day</Text>

    <View style = {style.quantityPick}>
    <TouchableOpacity style={{marginStart: 10,justifyContent:'center'}} onPress={() => {
        setNumber(number!=1 ? number-1 : number)
    }}>
    <Text style={{fontSize: 20,color: '#00C99D'}}>-</Text>
    </TouchableOpacity>
    <Text style ={{marginStart: 22,marginTop: 3}}>{number}</Text>
    <TouchableOpacity style={{marginStart:25,justifyContent:'center'}}onPress={() => {
        setNumber(number+1)
    }}>
        <Text style={{fontSize: 18,color: '#00C99D'}}>+</Text>
    </TouchableOpacity>
    </View>
    </View>
    <View style={style.line}></View>

    <View style={style.view1}>
<Text style={style.greyText}>Repeat</Text>
    
    <View style ={style.view3}>
    <View style = {style.view2}> 
        <TouchableOpacity onPress={() => {
          
        }}>
        <View style ={style.circleTapped}>
        <Text style ={style.dayTapped}>M</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
            
           
        }}>
        <View style ={style.circleTapped}>
        <Text style ={style.dayTapped}>T</Text>
        </View>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => {
           
        }}>
        <View style ={style.circleTapped}>
        <Text style ={style.dayTapped}>W</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
           
            
        }}>
        <View style ={style.circleTapped}>
        <Text style ={style.dayTapped}>T</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
           
            
        }}>
        <View style ={style.circleTapped}>
        <Text style ={style.dayTapped}>F</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
       
            
        }}>
        <View style ={style.circleTapped}>
        <Text style ={style.dayTapped}>S</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
           
           
        }}>
        <View style ={style.circleTapped}>
        <Text style ={style.dayTapped}>S</Text>
        </View>
        </TouchableOpacity>
        
        
       
  
    
    
    </View>
    </View>
    </View>
    <View style={style.line}/>
    <View style={style.view}>
    <Text style={style.greyText}>Recharge/Top up</Text>
    <Text style={style.text}>30 deliveries</Text>

    </View>
    <View style={style.line}/>
    <View style={style.view}>
    <Text style={style.greyText}>Start Date</Text>
    <Text style={style.text}>Tomorrow</Text>

    </View>
    <SubmitButton text='Subscribe'/>

</View>)

};

const style = StyleSheet.create({
    view1: {
        padding: 10,
        height: Dimensions.get('window').height/8,
        flexDirection: 'row',
        marginTop: 10
    },
    greyText: {
        marginStart: 30,
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
        width: 90,
        height: 30,
        borderColor: '#00C99D',
        borderWidth: 1.5,
        borderRadius: 20,
        position: 'relative',
        marginStart: 60
       
        

    },
    view2: {
        flexDirection : 'row',
       justifyContent: 'space-between',
       margin: 3,
       marginHorizontal: 10,
       

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
        padding: 5,
        height: Dimensions.get('window').height/8,
        flexDirection: 'column',
        
        marginTop: 30,
        
        marginStart: 10,

    },
    text:{
        fontSize: 17,
        marginStart: 30,
        fontWeight: 'bold',
        marginTop: 8
    },
    view3:{
        padding: 5,
        height: Dimensions.get('window').height/8,
        flexDirection: 'column',
        
        marginTop: 30,
        
       
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
    
});

export default SubscriptionScreen;