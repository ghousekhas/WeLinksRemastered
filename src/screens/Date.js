import React, { useState, Fragment } from 'react';
import {Text,View,StyleSheet,TextInput, Dimensions} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, Header } from '@react-navigation/stack';
import { Calendar } from 'react-native-calendars';
import SubmitButton from '../components/SubmitButton';
import moment from 'moment';
import { set } from 'react-native-reanimated';
import {Colors} from '../Constants'
import { mdiNumeric2CircleOutline } from '@mdi/js';
//aterialCommunityIcon';
// const doThis = ({props}) => {
//   props.onSet
// }

 export var okay = '';
// const fine = 'fine';

const Date = ({setDate,text,starting,setUsableDate}) => {

  thisDay = moment()
.utcOffset('+05:30')
.format('YYYY-MM-DD');
 // console.log('today:' + thisDay)
 
  const tomorrow = moment().add(1, 'day').endOf('day').format('YYYY-MM-DD')
 // console.log("tom: " + tomorrow)

  //console.log(tomorrow)





const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    
    const [selected, setSelected] = useState(tomorrow);
    const [month, setMonth] = useState(monthNames[parseInt(thisDay.charAt(5)+thisDay.charAt(6)-1)])
    const [year, setYear] = useState(thisDay.charAt(0)+thisDay.charAt(1)+thisDay.charAt(2)+thisDay.charAt(3))
    const [date,setThedate] = useState({
      day: moment().utcOffset('+05:30').day(),
      month: moment().utcOffset('+05:30').month(),
      year: moment().utcOffset('+05:30').year()
    });
    

    const onDayPress = (day) => {

      setSelected(day.dateString);
      setMonth(monthNames[day.month-1]);
      setYear(day.year);
      setThedate(day);
      


    };
    return(<View style={{backgroundColor: 'white'}}>
         <Fragment>
       
        <Calendar
         
        disableAllTouchEventsForDisabledDays
          displayLoadingIndicator
          onDayPress={onDayPress}
          minDate={starting}
          hideExtraDays
          style={{
    borderWidth: 0.3,
    borderColor: Colors.primary,
    height: Dimensions.get('window').height/2,
    borderRadius: 7,
    margin: 5
  }}
  theme= {{
      todayTextColor: Colors.primary,
      arrowColor : Colors.primary,
      textDayFontSize: 16,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 16
    
      

  }}
          
            markedDates={{
              
            [selected]: {
              
              color: Colors.primary,
              selected: true,
             
              selectedColor: Colors.primary,
              selectedTextColor: 'white',
              
              
             
              
              
            }
            
          
         
            
          }
         
          }
          
         
          
        />
      </Fragment> 
       <TouchableOpacity style={style.button}
      onPress = {() => {
      // okay =  selected.charAt(0)+selected.charAt(1)+selected.charAt(2)+selected.charAt(3)
        okay = selected.charAt(8)+selected.charAt(9)+" "+month+ " "+year;
     //   console.log(okay);
     setUsableDate({...date});
      setDate(okay);
    
      
     

      }}>
      
         
        <Text style={style.buttonText}>{text} ({selected.charAt(8)+selected.charAt(9)+" "+month+ " "+year})</Text>
       
        </TouchableOpacity>
       
       
    </View>)
}

const style = StyleSheet.create({
    buttonText: {
        textAlign: "center",
        textAlignVertical: "center",
        alignSelf:"center",
        color: 'white',
        fontWeight: '300',
        ...StyleSheet.absoluteFill,
        
        
        
        
    },
    button:{
        alignSelf: "center",
        marginTop: 20,
        backgroundColor: Colors.primary,
        width: Dimensions.get('window').width-30,
        height: 45,
        borderRadius: 5,
       
       

    },
})

export default Date;