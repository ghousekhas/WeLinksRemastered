import React,{useState, useEffect} from 'react';
import {View,TextInput,Text,StyleSheet,ScrollView, Alert,Dimensions, TouchableOpacity,Animated} from 'react-native';
import {Styles,dimen,Colors} from '../Constants';
import TextBox from '../components/TextBox';
import Button from '../components/Button';
import SubmitButton from '../components/SubmitButton';
import  DocumentPicker from 'react-native-document-picker';
import {useNavigation} from '@react-navigation/native';
import AppBar from '../components/AppBar';
import { AntDesign } from '@expo/vector-icons';


export default function VendorServices({submit}){
    const [services,setServices] = useState(['unchecked','unchecked','unchecked','unchecked']);

    const words ={ 
        milkDelivery : 'Milk Delivery',
        newspaperDelivery : 'Newspaper Delivery',
        homescrapCollection : 'Home Scrap Collection',
        officescrapCollection : 'Office Scrap Collection'

    }
    
    const [check1,setCheck1] = useState(false);
    const [check2,setCheck2] = useState(false);
    const [check3,setCheck3] = useState(false);
    const [check4,setCheck4] = useState(false);

    const [width,setWidth] = useState(0);

    const [translateCart,setTranslateCart] = useState(new Animated.Value((dimen.height-dimen.height/16)));
    const [open,setOpen] = useState(false);
     
    const checkBox =(index)=> {
        var tempArray=[];
        services.forEach((item,i)=> {
            if(i == index)
                tempArray.push(item=='checked'?'unchecked':'checked');
            else
                tempArray.push(item);
        });
        console.log(tempArray);
        setServices(tempArray);
    }
     const toggleCart = (retract)=>{
        //  this.setState({open: true})
         
         
          console.log('toggling')
        
          if(retract)
          setTranslateCart(Animated.spring({
            toValue: 0,
            duration: 2500,
            useNativeDriver: true,
            speed: 5,
            bounciness: 3
        })).start();
              
          else 
          setTranslateCart(Animated.spring({
              toValue: dimen.height,
              duration: 2500,
              useNativeDriver: true,
              speed: 5,
              bounciness: 3
          })).start();
  
      }
   

    const CheckBox = (check) => {
        if(!check) return(<AntDesign name="checksquareo" size={24} color="gray" />)
        else return(<AntDesign name="checksquare" size={24} color={Colors.primary} />)
    }


    return(<View style={{...StyleSheet.absoluteFill}}>
                <AppBar back={false} />
                <View style={{height: dimen.height/12}}/> 
                <Text style = {style.text}>What services do you offer?</Text>
            <View style={{paddingHorizontal: 10}}>
                <ScrollView>

                    <View style={{flexDirection:'row',padding:'1%',alignItems: 'center',justifyContent:'space-between'}}>
                        <Text style={{...style.checkableText,width: width}}>{words.milkDelivery}</Text>
                        <View style={{opacity: check1 ? 1 : 0}}>
                        <Button text='Select' onTouch={() => {
                            setOpen(!open);
                            toggleCart(open)
                        }} />
                        </View>
                        <View>
                        <TouchableOpacity style={{flex:1}} onPress={() => {setCheck1(!check1); console.log(check1)}}>
                       {CheckBox(check1)}
                        </TouchableOpacity>
                        </View>
                    </View>

                    <View style={Styles.grayfullline}/>

                    <View style={{flexDirection:'row',padding:'1%',alignItems: 'center',justifyContent:'space-between'}}>
                        <Text style={{...style.checkableText,width: width}}>{words.newspaperDelivery}</Text>
                        <View style={{opacity: check2 ? 1 : 0}}>
                        <Button text='Select'/>
                        </View>
                        <View>
                        <TouchableOpacity style={{flex:1}} onPress={() => {setCheck2(!check2)}}>
                       {CheckBox(check2)}
                        </TouchableOpacity>
                        </View>
                    </View>
                   
                  
                    <View style={Styles.grayfullline}/>
                    <View style={{flexDirection:'row',padding:'1%',alignItems: 'center',justifyContent:'space-between'}}>
                        <Text style={{...style.checkableText, width: width}}>{words.homescrapCollection}</Text>
                        <View style={{opacity: check3 ? 1 : 0}}>
                        <Button text='Select'/>
                        </View>
                        <View>
                        <TouchableOpacity style={{flex:1}} onPress={() => {setCheck3(!check3); console.log(check1)}}>
                       {CheckBox(check3)}
                        </TouchableOpacity>
                        </View>
                    </View>

                    <View style={Styles.grayfullline}/>

                    <View style={{flexDirection:'row',padding:'1%',alignItems: 'center',justifyContent:'space-between'}}>
                        <Text onLayout={({nativeEvent}) => {setWidth(nativeEvent.layout.width)}} style={style.checkableText}>{words.officescrapCollection}</Text>
                        <View style={{opacity: check4 ? 1 : 0}}>
                        <Button text='Select'/>
                        </View>
                        <View>
                        <TouchableOpacity style={{flex:1}} onPress={() => {setCheck4(!check4); console.log(check1)}}>
                       {CheckBox(check4)}
                        </TouchableOpacity>
                        </View>
                    </View>
                    </ScrollView>
            </View>    
            <View style={{padding: 10,position: 'absolute',bottom: 0,alignSelf: 'center'}}>
                <SubmitButton text='Submit' onTouch={()=>{
                    var temparr=[];
                    if(services[0]==='checked'){
                            temparr.push('milk');
                    }
                    if(services[1]==='checked')
                       { 
                        
                           temparr.push('newspaper')}
                    if(services[2]==='checked')
                        {
                            temparr.push('homescrap')}
                    if(services[3]==='checked')
                     {   
                        temparr.push('officescrap')}

                    if(temparr === [])
                        alert('Please select at least one service');
                    else
                        submit(temparr);
                }}/>
            </View>

        </View>
    );
}

const style = StyleSheet.create({
    mainContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        padding: 10,
        backgroundColor: 'white',

    },
    text:{
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        alignSelf: 'center',
        marginBottom: dimen.height/20,
        width: dimen.width/1.5,
        textAlign: 'center',
        letterSpacing: 1,
        lineHeight: 25,
        
        
        marginTop: 10,
        margin: 5
    },
    line: {
        borderWidth: 0.5,
        borderColor: '#5D5D5D',
        marginTop: 10,
     
    },
    view: {
        flexDirection: 'row',
        marginTop: 12
        
    },
    city: {
        marginTop: 5,
        marginStart: 7,
        fontSize: 18
    },
    checkableText: {
        marginStart: 10,
        alignSelf:'center',
        fontWeight: 'bold',
        color:'black',
       
    }


});