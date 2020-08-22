import React, { useState, useImperativeHandle, useEffect } from 'react';
import {View, StyleSheet, Text, Dimensions, Picker} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import SubmitButton from '../components/SubmitButton';
import Button from '../components/Button';
import Item from '../components/Item'
import { Feather } from '@expo/vector-icons';
import {Colors, Styles} from '../Constants'


const SubscriptionScreen = ({onCalendarOpen,onCalendarOpen1,pname,pquan,prate,dateref,dateref1,result}) => {

    const words = {
        quantityPerDay:'Quantity per day' ,
        repeat:'Repeat' ,
        recharge:'Recharge/Top-Up' ,
        duration: 'Duration',
        startDate: 'Set Start Date',
        endDate: 'Set End Date',
        subscribe: 'Subscribe'
    };
    const[number,setNumber] = useState(1);
    const[start,setStart]= useState('Select start');
    const[end,setEnd] = useState('Select end')
  //  const[wo,setWeek]= useState([true,true,true,true,true,true,true]);
    useEffect(()=>{
        setStart(dateref);
        setEnd(dateref1)
     //   console.log('Datereff: ' + dateref)
     //   console.log('Datereff1: ' + dateref1)
     
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
   const [allSet,setAllSet] = useState(true);
   const checkAllSet = () => {
       console.log('Check: ' + dateref + " " +dateref1)
       if(dateref == 'Select start' || dateref1 == 'Select end')
       return true;
       
       
       return false;

   };

  

return(<View style={style.container} >
    <Item name={pname} quantity={pquan} price={prate} />
    <View style={style.view1}>
    <Feather name="shopping-bag" size={22} color= {Colors.lightIcon} />

    <Text style={style.greyText}>{words.quantityPerDay}</Text>

    <View style = {style.quantityPick}>
   
        <TouchableOpacity style={style.minus} onPress={() => {
            setNumber(number!=1 ? number-1 : number)
        }}>
      
      <Text style={{fontSize: 17,color: 'gray',alignSelf: 'center',fontWeight: 'bold',borderRightColor: Colors.seperatorGray,borderRightWidth: 0.7,paddingRight: 6,color: Colors.primary}}>-</Text>
    

    </TouchableOpacity>

    
        <Text style ={{fontWeight: 'bold'}}>{number}</Text>

       
    <TouchableOpacity style={style.plus} onPress={() => {
        setNumber(number+1)
    }}>

        <Text style={{fontSize: 17,color: Colors.primary,alignSelf: 'center',fontWeight:'bold',borderLeftColor: Colors.seperatorGray,borderLeftWidth: 0.7,paddingLeft: 6}}>+</Text>
    </TouchableOpacity>
    </View>
    </View>


    <View style={Styles.grayfullline}></View>

   

     
    
    <View style={style.view1}>
    <Feather name="repeat" size={22} color={Colors.lightIcon} />
    <Text style={style.greyText}>{words.repeat}</Text>
    </View>

                {/* days */}
    <View style={{flexDirection: 'column',alignItems: 'center',width:Dimensions.get('window').width,marginVertical:'8%'}}>
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
     <View style={{...style.weekPick,marginTop: '8%'}}>
        
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


    <View style={style.view1}>
    <Feather name="calendar" size={22} color={Colors.lightIcon} />

    <Text style={style.greyText}>{words.duration}</Text>
    </View>

    <View>
    <View style={{flexDirection:'row', justifyContent: 'space-between',marginStart:'5%'}}>
        {/* <Button text={words.startDate} onTouch={onCalendarOpen}/> */}
        <TouchableOpacity onPress={onCalendarOpen} style={style.dbutton}>
        <Text style={style.btext}>{words.startDate}</Text>
            
        </TouchableOpacity>
        <Text style={{...style.dates,position: 'absolute',bottom: -7,end:30}}>{start}</Text>
    </View>

    <View style={{flexDirection:'row', justifyContent: 'space-between',marginStart:'5%',marginTop: '5%'}}>
    {/* <Button text={words.endDate} onTouch={onCalendarOpen1}/> */}
    <TouchableOpacity disabled={dateref == 'Select start'? true : false} onPress={onCalendarOpen1} 
    style={dateref == 'Select start' ? style.disabled : style.dbutton}>
        <Text style={dateref == 'Select start' ? {...style.btext,color:Colors.disabledButton} : style.btext}>{words.endDate}</Text>
            
        </TouchableOpacity>
    <Text style={{...style.dates,position: 'absolute',bottom: -7,end:30}}>{end}</Text>
    </View>


    </View>

   
   
       
       
      
   

      
  
       

         
       
   


   
    

  
    <View style={{position:'absolute',top:Dimensions.get('window').height/1.25,alignSelf:'center'}}>
    <TouchableOpacity style={(dateref == 'Select start' || dateref1 == 'Select end' ||
    (m == false && t == false && w == false && th == false && f == false && s == false && su == false)) ? 
    {...style.subscribe, backgroundColor: Colors.disabledButton} :style.subscribe }
    disabled={(dateref == 'Select start' || dateref1 == 'Select end' ||
    (m == false && t == false && w == false && th == false && f == false && s == false && su == false)) ? 
    true : false} onPress={() => {
        if(subsResult.s.start == 'Select start')
            console.log(subsResult.s.start)
        

      else result(subsResult)
        
    }}>
        <Text style={style.subscribeText}>Subscribe</Text>
    </TouchableOpacity>

    {/* <SubmitButton text='Subscribe' onTouch={() => {
            if(subsResult.s.start == 'Select start')
            console.log(subsResult.s.start)
        

      else result(subsResult)
        
    }}/> */}
    </View>
   

    

</View>)

};

const style = StyleSheet.create({
    container:{
       
       
        width: '100%',
        height: Dimensions.get('window').height
       
      
        
    },
   
    view1: {
        
       
        flexDirection: 'row',
       
        marginVertical: '6%',
        marginStart: '5%'
       
        
      
    },
  
    greyText: {
        marginStart: '4%',
        color: 'gray',
      
        fontSize: 15,
        fontWeight: 'bold',
        padding: 1
    },
   
    quantityPick:{
        flexDirection: 'row',
        width: '25%',
        aspectRatio:4/1.5,
        borderColor: Colors.primary,
        borderWidth: 1.5,
        borderRadius: 20,
        position: 'absolute',
        right: 15,
        alignItems: 'center',
        justifyContent: 'space-evenly'
        
       
        

    },
    
   

    dates: {

        fontSize: 15,
        fontWeight: 'bold',
        marginTop: '4%'
        
        

    },
   
    
 
    minus: {
        alignSelf: 'center'
    
},
plus: {
    alignSelf: 'center'
},
circleTapped : {
    backgroundColor: Colors.primary,
    height: 43,
    width: 43, 
    borderRadius: 45/2,
    flexDirection: 'row',
    
    


}, 
circle : {  //yes
    borderWidth: 1.5,
    borderColor: Colors.primary,
    height: 43,
    width: 43, 
    
    borderRadius: 45/2,
    flexDirection: 'row',
    


},
dayTapped: {  //yes

    
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    
    textAlign: 'center',
    alignItems: 'center',
    marginVertical: '25%',
    ...StyleSheet.absoluteFill
    
   
  
    

    
},
day: {  //yes

    
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 15,
    
    textAlign: 'center',
    alignItems: 'center',
    marginVertical: '25%',
    ...StyleSheet.absoluteFill
    
   
  
    

    
},
weekPick : {
    marginTop: '-8%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  
   alignItems: 'center',
   width: Dimensions.get('window').width-30,
   
  
  
   
  
   
},
dbutton: {
    borderRadius: 5,
    borderColor: Colors.primary,
    borderWidth: 1.5,
    
  //  width: Dimensions.get('window').width/10,
    height: Dimensions.get('window').height/25,
    aspectRatio:3/1 ,
    alignItems: 'center',
    paddingVertical: '5%',
  
   justifyContent: 'center'

}, 
disabled: {
    borderRadius: 5,
    borderColor: Colors.disabledButton,
    borderWidth: 1.5,
    
  //  width: Dimensions.get('window').width/10,
    height: Dimensions.get('window').height/25,
    aspectRatio:3/1 ,
    alignItems: 'center',
    paddingVertical: '5%',
  
   justifyContent: 'center'

}, 
btext:{
color:Colors.primary,
fontSize: 12,
fontWeight: 'bold',
flex: 1,

},
subscribe: {
    backgroundColor: Colors.primary,
    width: Dimensions.get('window').width-30,
    height: 45,
    borderRadius: 5,
    alignSelf: 'center',
    
},
subscribeText: {
    textAlign: "center",
    textAlignVertical: "center",
    alignSelf:"center",
    color: 'white',
    fontWeight: '300',
    ...StyleSheet.absoluteFill,
}


    
});

export default SubscriptionScreen;