import React, { useState, useImperativeHandle, useEffect } from 'react';
import {View, StyleSheet, Text, Dimensions, Picker} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import SubmitButton from '../components/SubmitButton';
import Button from '../components/Button';
import Item from '../components/Item'
import {Colors, Styles} from '../Constants'


const SubscriptionScreen = ({onCalendarOpen,onCalendarOpen1,pname,pquan,prate,dateref,dateref1,result}) => {

    const words = {
        quantityPerDay:'Quantity \n per day' ,
        repeat:'Repeat' ,
        recharge:'Recharge/Top-Up' ,
        duration: 'Duration',
        startDate: 'Set Start Date:',
        endDate: 'Set End Date:'
    };
    const[number,setNumber] = useState(1);
    const[start,setStart]= useState('Not selected');
    const[end,setEnd] = useState('Not selected')
  //  const[wo,setWeek]= useState([true,true,true,true,true,true,true]);
    useEffect(()=>{
        setStart(dateref);
        setEnd(dateref1)
     //   var weeknd= {...weekref}
      //  setWeek(weeknd);
        //console.log(wo[0],wo[1],wo[2],wo[3],wo[4],wo[5],wo[6])
    },[dateref,dateref1]);




    const [m,ms] = useState(false);
    const [t,ts] = useState(false);
    const [w,ws] = useState(false);
    const [th,ths] = useState(false);
    const [f,fs] = useState(false);
    const [s,ss] = useState(false);
    const [su,sus] = useState(false);

    const [button1,tapButton1] = useState(false);
    const [button2,tapButton2] = useState(false);
    const [button3,tapButton3] = useState(false);


  

   // const Item = Picker.Item;
   // const [value,setValue ] = useState('');
    

   const subsResult = { 
       perDayQuan: {number},
       s:{start},
       e: {end},
       days: [{m},{t},{w},{th},{f},{s},{su}]

   };

  

return(<View style={style.container} >
    <Item name={pname} quantity={pquan} price={prate} />
    <View style={style.view1}>
    <Text style={style.greyText}>{words.quantityPerDay}</Text>

    <View style = {style.quantityPick}>
        <TouchableOpacity style={style.minus} onPress={() => {
            setNumber(number!=1 ? number-1 : number)
        }}>
        <Text style={{fontSize: 20,color: 'gray',alignSelf: 'center',fontWeight: 'bold',borderRightColor: Colors.seperatorGray,borderRightWidth: 0.7,paddingRight: 6}}>-</Text>
    </TouchableOpacity>
        <Text style ={{fontWeight: 'bold'}}>{number}</Text>
    <TouchableOpacity style={style.plus} onPress={() => {
        setNumber(number+1)
    }}>
        <Text style={{fontSize: 20,color: Colors.primary,alignSelf: 'center',fontWeight: 'bold',borderLeftColor: Colors.seperatorGray,borderLeftWidth: 0.7,paddingLeft: 6}}>+</Text>
    </TouchableOpacity>
    </View>
    </View>
    <View style={Styles.grayfullline}></View>

   

     
    
    <View style={style.view2}>
    <Text style={style.greyText}>{words.repeat}</Text>
    <View style={style.weekPick}> 
    <TouchableOpacity onPress={() => {
            m ? ms(false) : ms(true)
           
        }}>
        <View style ={m ? style.circleTapped : style.circle}>
        <Text style ={m ? style.dayTapped : style.day}>M</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
            t ? ts(false) : ts(true)
           
        }}>
        <View style ={t ? style.circleTapped : style.circle}>
        <Text style ={t ? style.dayTapped : style.day}>T</Text>
        </View>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => {
            w ? ws(false) : ws(true)
            
        }}>
        <View style ={w ? style.circleTapped : style.circle}>
        <Text style ={w ? style.dayTapped : style.day}>W</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
            th ? ths(false) : ths(true)
            
        }}>
        <View style ={th ? style.circleTapped : style.circle}>
        <Text style ={th ? style.dayTapped : style.day}>T</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
            f ? fs(false) : fs(true)
            
        }}>
        <View style ={f ? style.circleTapped : style.circle}>
        <Text style ={f ? style.dayTapped : style.day}>F</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
            s ? ss(false) : ss(true)
            
        }}>
        <View style ={s ? style.circleTapped : style.circle}>
        <Text style ={s ? style.dayTapped : style.day}>S</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
            su ? sus(false) : sus(true)
           
        }}>
        <View style ={su ? style.circleTapped : style.circle}>
        <Text style ={su ? style.dayTapped : style.day}>S</Text>
        </View>
        </TouchableOpacity>
        

        
     </View>
     <View style={{flexDirection: 'row',justifyContent: 'space-around',marginTop: '8%'}}>
        
     <TouchableOpacity onPress={() => {
          //  button1 ? tapButton1(false) : tapButton1(true)
            if(button1){
                if(button2 || button3){
                    tapButton2(false)
                    tapButton3(false)
                }
                tapButton1(false)
                ms(false); ts(false); ws(false); ths(false); fs(false); ss(false); sus(false)
            }else{
                
                tapButton1(true)
                tapButton2(true)
                tapButton3(true)
                ms(true); ts(true); ws(true); ths(true); fs(true); ss(true); sus(true)
                
                 
                
                }
            
        }}>
        <View style={button1 ?  {...style.dbutton,backgroundColor: '#64e4ce',borderColor:'white'} : style.dbutton}> 
        <Text style={button1 ? {...style.btext,color: 'white'}: style.btext}>Daily</Text>
        </View>

        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
       //     button2 ? tapButton2(false) : tapButton2(true)
       if(button2){
           if(button1)
           tapButton1(false)
                tapButton2(false)
                ms(false); ts(false); ws(false); ths(false); fs(false); 
            }else{
              
                tapButton2(true)
               
                ms(true); ts(true); ws(true); ths(true); fs(true); 
                
                 
                
                }
        }}>
       <View style={button2 ?  {...style.dbutton,backgroundColor: '#64e4ce',borderColor:'white'} : style.dbutton}> 
        <Text style={button2 ? {...style.btext,color: 'white'}: style.btext}>Weekdays</Text>
        </View>


        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
         //   button3 ? tapButton3(false) : tapButton3(true)
         if(button3){
            if(button1)
           tapButton1(false)
                tapButton3(false)
                 ss(false); sus(false)
            }else{
                
                tapButton3(true)
               
                ss(true); sus(true)
                 
                
                }
        }}>
       <View style={button3 ?  {...style.dbutton,backgroundColor: '#64e4ce',borderColor:'white'} : style.dbutton}> 
        <Text style={button3 ? {...style.btext,color: 'white'}: style.btext}>Weekends</Text>
        </View>

        </TouchableOpacity>
       

     

     </View>


     
    </View>
    
    <View style={Styles.grayfullline}/>
    <View style={{margin: '2%'}}>

    <Text style={style.greyText}>{words.duration}</Text>

    <View style={{margin: '2%',flexDirection:'row'}}>
       
        <Text style={{...style.dates,marginStart: '60%',position:'absolute',justifyContent: 'center'}}>{start}</Text>
        <View style={{marginTop: '5%'}}>
            <Button text={words.startDate} onTouch={onCalendarOpen}/>
        </View>
    </View>

    <View style={{margin: '2%',flexDirection:'row'}}>
      
    <Text style={{...style.dates,marginStart: '60%',position:'absolute',justifyContent: 'center'}}>{end}</Text>
        <View style={{marginTop: '5%'}}>
            <Button text={words.endDate} onTouch={onCalendarOpen1}/>
        </View>
    </View>


    </View>
    

  
    <View style={{position: 'absolute',bottom: '-18%',alignSelf:'center'}}>
    <SubmitButton text='Subscribe' onTouch={() => {
        result(subsResult)
        // {goTo}
    }}/>
    </View>
   

    

</View>)

};

const style = StyleSheet.create({
    container:{
         margin: '-15%',
        padding: '8%',
        width: '100%',
        height: '100%',
        marginLeft: '-40%'
    },
   
    view1: {
        
        height: Dimensions.get('window').height/15,
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        
        marginTop: '5%',
        
      
    },
    view2: {
        
        height: Dimensions.get('window').height/4.5,
        width: Dimensions.get('window').width,
        
        marginTop: '5%',
        borderColor: 'red',
      
    },
    greyText: {
        marginStart: '2%',
        color: 'gray',
        marginTop: '1%',
        fontSize: 15,
        fontWeight: 'bold',
        padding: 1
    },
    line: {
        borderWidth: 0.5,
        borderColor: 'gray'
    },
    quantityPick:{
        flexDirection: 'row',
        width: '28%',
        aspectRatio:3/1,
        borderColor: Colors.primary,
        borderWidth: 1.5,
        borderRadius: 20,
        position: 'absolute',
        right: 6,
        alignItems: 'center',
        justifyContent: 'space-evenly'
        
       
        

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
        fontSize: 15,
       marginStart:'5%',
        fontWeight: 'bold',
        marginTop: '4%'
       
    },
    dates: {

        fontSize: 15,
        fontWeight: 'bold',
        marginTop: '4%'
        
        

    },
    circleTapped : {
        backgroundColor: Colors.primary,
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
        alignSelf: 'center'
    
},
plus: {
    alignSelf: 'center'
},
circleTapped : {
    backgroundColor: Colors.primary,
    height: 45,
    width: 45, 
    borderRadius: 45/2,
    flexDirection: 'row',
    
    


},
circle : {
    borderWidth: 1.5,
    borderColor: Colors.primary,
    height: 45,
    width: 45, 
    
    borderRadius: 45/2,
    flexDirection: 'row',
    


},
dayTapped: {

    
    color: 'white',
    fontWeight: '300',
    fontSize: 15,
    
    textAlign: 'center',
    alignItems: 'center',
    marginVertical: 12,
    ...StyleSheet.absoluteFill
    
   
  
    

    
},
day: {

    
    color: Colors.primary,
    fontWeight: '300',
    fontSize: 15,
    
    textAlign: 'center',
    alignItems: 'center',
    marginVertical: 12,
    ...StyleSheet.absoluteFill
    
   
  
    

    
},
weekPick : {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '5%',
    
   
  
   
},
dbutton: {
    borderRadius: 5,
    borderColor: Colors.primary,
    borderWidth: 1,
    
    width: Dimensions.get('window').width/3.5,
    aspectRatio: 5/1.3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '3.5%'

}, 
btext:{
color:Colors.primary,
fontSize: 12,
fontWeight: 'bold',
flex: 1
}


    
});

export default SubscriptionScreen;