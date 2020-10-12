import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Text, Dimensions,Image} from 'react-native';
import { TouchableOpacity, FlatList,ScrollView } from 'react-native-gesture-handler';
import Vendor from '../components/Vendor';
import { Avatar } from 'react-native-paper';
import {Styles,ScrapStyles} from '../Constants';
import Accordion  from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
import Stars from '../components/Stars';
import Product from '../components/Product';
import {Entypo} from '@expo/vector-icons'
import { Rect } from 'react-native-svg';
import GenericSeperator from '../components/GenericSeperator';
import SubmitButton from '../components/SubmitButton';
import {EvilIcons} from '@expo/vector-icons';
import { Colors } from '../Constants';
import firestore from '@react-native-firebase/firestore';



export default class ScrapCart extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            startDate: 1,
            startMonth: 2,
            startYear: 2020,
            startDay: 0,
            selectedDate: null,
            selectedTIme: null,
            timeSelected: [false,false,false],
            cartItems: ['Electronics- Mobile','Recyclables= Paper','Large Appliance- Fridge','Electronics- Mobile',
            'Recyclables= Paper','Large Appliance- Fridge']
        };
    };

    getTodaysDate =  ()=>{
        var date =  firestore.Timestamp.now().toDate();
        var newDate =  {
            startDate: date.getDate(),
            startMonth: date.getMonth(),
            startYear: date.getFullYear(),
            startDay: date.getDay()};
        console.log(newDate);
        this.setState({
            newDate
        });
        console.log(this.state.startDate);
    }

    componentDidMount= ()=>{
        this.getTodaysDate();
        
    }

    renderCartItem = (item)=>{
        return (
            <View style={Styles.horizontalRow}>
                <Text style={Styles.subbold}>{item.item}</Text>
                <TouchableOpacity style={Styles.touchableButtonBorder} onPress={()=>{
                    var i;
                    var temparr=this.state.cartItems;
                    for(i=item.index;i<temparr.length-1;i++)
                        temparr[i] = temparr[i+1];
                    temparr.pop();
                    this.setState({cartItems: temparr})}}>
                    <Text>remove</Text>
                </TouchableOpacity>
            </View>
        );
    };

    dateSelectedCallback= (date)=>{
        this.setState({selectedDate: date})
        console.log(date);
    };
    timeSelected= (index) =>{
        var i;
        var temparr;
        this.setState({
            selectedTime: index
        });
        temparr = [false,false,false];
        temparr[index] = true;
        this.setState({
            timeSelected: temparr
        })
        

    }


    render(){
        

        return(
            <View style={Styles.parentContainer}>
                <View style={Styles.scrapTopCart}>
                    <FlatList numColumns={1} 
                        scrollEnabled={true}
                        renderItem = {this.renderCartItem}
                        ItemSeparatorComponent = {GenericSeperator}
                        data = {this.state.cartItems}
                        keyExtractor= {(item,index) => index}
                        style={{width: '100%',height: '40%',paddingHorizontal: '1%',marginVertical: '2%'}}
                        />
                </View>
                <View style={Styles.scrapBottom}>
                    <Text style={ScrapStyles.heading}>Pickup Date and Time</Text>
                    <View style={Styles.horizontalCalendarRow}>
                        {//SevenViewshere
                        }
                    </View>                    
                    <WeekView start={{day: this.state.startDay,date: this.state.startDate,
                    month: this.state.startMonth,year: this.state.startYear}} selectedChangeInParent={this.dateSelectedCallback}/>
                    <Text style={ScrapStyles.heading}>Schedule Time</Text>
                    <View style={Styles.horizontalCalendarButtonsRow}>
                        <TouchableOpacity style={this.state.timeSelected[0] ? {...ScrapStyles.timebutton,
                            borderColor: Colors.primary,paddingVertical: 10}:{...ScrapStyles.timebutton,borderColor: Colors.seperatorGray}}
                                        onPress={()=>{this.timeSelected(0)}}
                                        >
                            <View style={{flexDirection: 'row'}}>
                                <EvilIcons name="clock" size={24} color="black" />
                                <Text style={Styles.subbold}>  9:00 AM -  </Text>
                            </View>
                            <Text style={Styles.subbold}> 12:00 PM</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={ this.state.timeSelected[1] ? {...ScrapStyles.timebutton,
                            borderColor: Colors.primary,paddingVertical: 10}:{...ScrapStyles.timebutton,borderColor: Colors.seperatorGray}}
                                        onPress={()=>{this.timeSelected(1)}}
                                        >
                            <View style={{flexDirection: 'row'}}>
                                <EvilIcons name="clock" size={24} color="black" />
                                <Text style={Styles.subbold}>  12:00 PM -  </Text>
                            </View>
                            <Text style={Styles.subbold}>3:00 PM</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={this.state.timeSelected[2]? {...ScrapStyles.timebutton,
                            borderColor: Colors.primary,paddingVertical: 10}:{...ScrapStyles.timebutton,borderColor: Colors.seperatorGray}}
                                        onPress={()=>{this.timeSelected(2)}}
                                        >
                            <View style={{flexDirection: 'row'}}>
                                <EvilIcons name="clock" size={24} color="black" />
                                <Text style={Styles.subbold}>  3:00 PM -  </Text>
                            </View>
                            <Text style={Styles.subbold}> 5:00 PM</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={Styles.submitButtonBottom}>
                    <TouchableOpacity style={{width: '100%',height: '100%',justifyContent: 'center'}}>
                       <Text style={{alignSelf: 'center',zIndex: 100,color: 'white',fontSize: 15}} >CONFIRM PICKUP</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );

    }
}


WeekView =({start,selectedChangeInParent})=>{
    var i;
    var someArray =[];
    var [initArray,setInitArray] = useState([]);
    var date,day,nextDay;
    const [selected,setSelected]= useState([false,false,false,false,false,false,false]);
    var selectedDate= null;

    useEffect(()=>{
        someArray.push(start);
        setInitArray(someArray);
        for(i = 0;i < 6; i++){
           nextDay ={...getNextDate(someArray[i]),day: getNextDay(someArray[i].day)}
            someArray.push(nextDay);
           setInitArray(someArray);
        }

    },[]);

    getNextDay = (currentDay)=>{
        if(currentDay == 6)
            return 0
        return currentDay+1
    }

    getNextDate= (startDate)=>{
        const {month,date,year} = startDate;
        if(month == 2 && date>=28){
            if(date ==28)
                if(((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0))
                    return{
                        date: 29,
                        month: 2,
                        year: year
                    }      
            return {
                date: 1,
                month: 3,
                year: year
            }
        }     
        else if(((month == 4 || month == 6 || month == 9 || month == 11) && date==30))
                return {
                    date: 1,
                    month: month+1,
                    year: year
                };
        else if(date== 31)
                if(month == 12)
                    return {
                        date: 1,
                        month: 1,
                        year: year+1
                    };
                else 
                    return {
                        date: 1,
                        month: month+1,
                        year: year
                    };
        return {
            date: date+1,
            month: month,
            year: year
        };
    }

    itemSelected= (index)=>{
        var temparr= [];
        selectedDate = initArray[index];
        for(i = 0; i<7; i++)
            if(index==i)
                temparr.push(true);
            else
                temparr.push(false);
        setSelected(temparr);
        selectedChangeInParent(selectedDate);
            
    }
    
    return(
        <View style={Styles.scrapWeekView}>
            {initArray.map((item,index) =>{
                return (
                    <DayButton key={index} dateInfo={item} onSelected={itemSelected} selected={selected[index]} index={index}/>
                );
            })}
        </View>
    )

}

DayButton =({dateInfo,onSelected,selected,index})=>{
    var days= ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']; 
    

    const theNeedful=()=>{
        onSelected(index);
    }

    return(
        <View style={Styles.dayButton}>
            <TouchableOpacity onPress={theNeedful}>
                <View style={{...Styles.dayButton,backgroundColor: selected ? Colors.primary: 'transparent' }}>
                    <Text style={!selected ? Styles.subheading :{...Styles.subbold,paddingVertical: 5,fontSize: 15}}>{days[dateInfo.day]}</Text>
                    <Text style={!selected ? {...Styles.subbold,paddingVertical: 5 }:{...Styles.subbold,fontSize: 15}}>{dateInfo.date}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )

}
