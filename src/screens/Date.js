import React, { useState, Fragment } from 'react';
import {Text,View,StyleSheet,TextInput, Dimensions} from 'react-native';
import { Defs } from 'react-native-svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, Header } from '@react-navigation/stack';
import { Calendar } from 'react-native-calendars';
import SubmitButton from '../components/SubmitButton';
import moment from 'moment';
//aterialCommunityIcon';
// const doThis = ({props}) => {
//   props.onSet
// }

 export var okay = '';
// const fine = 'fine';

const Date = ({setDate,text,starting}) => {

  thisDay = moment()
  .utcOffset('+05:30')
  .format('YYYY-MM-DD');
  const tomorrow = moment().add(1, 'day').endOf('day').format('YYYY-MM-DD')

  //console.log(tomorrow)





const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
    
    
    const [selected, setSelected] = useState(thisDay);
    const [month, setMonth] = useState(monthNames[parseInt(thisDay.charAt(5)+thisDay.charAt(6))])
    const [year, setYear] = useState(thisDay.charAt(0)+thisDay.charAt(1)+thisDay.charAt(2)+thisDay.charAt(3))
    
    

    const onDayPress = (day) => {

      setSelected(day.dateString);
      setMonth(monthNames[day.month-1]);
      setYear(day.year);
      


    };
    return(<View>
         <Fragment>
       
        <Calendar
         
        disableAllTouchEventsForDisabledDays
          displayLoadingIndicator
          onDayPress={onDayPress}
          minDate={starting}
          hideExtraDays
          style={{
    borderWidth: 0.3,
    borderColor: '#00C99D',
    height: Dimensions.get('window').height/2,
    borderRadius: 7,
    margin: 5
  }}
  theme= {{
      todayTextColor: '#00C99D',
      arrowColor : '#00C99D',
      textDayFontSize: 16,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 16
    
      

  }}
          
            markedDates={{
              
            [selected]: {
              
              color: '#00C99D',
              selected: true,
             
              selectedColor: '#00C99D',
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
        console.log(okay);
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
        backgroundColor: '#00C99D',
        width: Dimensions.get('window').width-30,
        height: 45,
        borderRadius: 5,
       
       

    },
})

export default Date;