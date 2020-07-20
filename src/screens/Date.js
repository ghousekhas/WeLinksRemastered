import React, { useState, Fragment } from 'react';
import {Text,View,StyleSheet,TextInput, Dimensions} from 'react-native';
import { Defs } from 'react-native-svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, Header } from '@react-navigation/stack';
import { Calendar } from 'react-native-calendars';
import SubmitButton from '../components/SubmitButton';
import moment from 'moment';

const Date = ({onSet}) => {
  thisDay = moment()
  .utcOffset('+05:30')
  .format('YYYY-MM-DD');

//   thisDay = thisDay.charAt(8) + thisDay.charAt(9) + ' ' +  
//   (thisDay.charAt(6)== 0 ? monthNames[charAt(7)] : monthNames[charAt(7)+charAt(8)]+ ' ' +
//  moment.utcOffset('+05:30').format('YYYY'));

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
    
    const [selected, setSelected] = useState(thisDay);
    const [month, setMonth] = useState(monthNames[parseInt(thisDay.charAt(5)+thisDay.charAt(6))])
    const [year, setYear] = useState(thisDay.charAt(0)+thisDay.charAt(1)+thisDay.charAt(2)+thisDay.charAt(3))
    


    const onDayPress = (day) => {
      setSelected(day.dateString);
      setMonth(monthNames[day.month-1])
      setYear(day.year)
    };
    return(<View>
         <Fragment>
       
        <Calendar
          
          displayLoadingIndicator
          onDayPress={onDayPress}
          style={{
    borderWidth: 0.1,
    borderColor: '#00C99D',
    height: Dimensions.get('window').height/2-50,
    borderRadius: 7,
    margin: 10
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
              selected: true,
              disableTouchEvent: true,
              selectedColor: '#00C99D',
              selectedTextColor: 'white',
              
              
            }
          }}
          
        />
      </Fragment> 
       <TouchableOpacity style={style.button}
       onPress = {onSet}>
         
        <Text style={style.buttonText}>Set start date ({selected.charAt(8)+selected.charAt(9)+" "+month+ " "+year})</Text>
       
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