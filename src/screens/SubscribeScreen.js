import React,{ Fragment, useState, useRef } from 'react';
import { View,Text,TouchableOpacity,StyleSheet,Dimensions,Picker } from 'react-native';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import SubmitButton from '../components/SubmitButton';
import moment from 'moment';
import Date,{okay} from './Date';
import WeekPicker from '../components/WeekPicker';
import SubscriptionScreen from './SubscriptionScreen';


bs = React.createRef();

const figureDate = (dateref) => {
  console.log(dateref)
  const monthNames = ["","January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];


for(i=1;i<=12;i++){
  var t = i < 10 ? ("0"+i) : i;
  var starting;
  if(dateref.includes(monthNames[i])){
  starting = dateref.charAt(dateref.length-4)
  +dateref.charAt(dateref.length-3)+dateref.charAt(dateref.length-2)
    +dateref.charAt(dateref.length-1) + "-" + t + "-" +  dateref.charAt(0)+dateref.charAt(1)

    console.log(starting)
    return starting;
     }

  }

}


const SubscribeScreen = ({navigation,route}) => {

  const {pname} = route.params;
  const {pquan} = route.params;
  const {prate} = route.params;
  const{prate_} = route.params;
const [isPressed,setIsPressed] = useState(false);
// const [dateResult,setResult] = useState('');

// const [weekref,setWeekRef]= useState([true,true,true,true,true,true,true]);


thisDay = moment()
.utcOffset('+05:30')
.format('YYYY-MM-DD');
const tomorrow = moment().add(1, 'day').endOf('day').format('YYYY-MM-DD')

const [dateref,setDateRef] = useState('Select start');
const [dateref1,setDateRef1] = useState('Select end');
  // This sets start
  const setDate=(date)=> {
    setDateRef(date);
    bs.current.snapTo(2);
  };

  // This sets end
  const setDate1=(date1)=> {
    setDateRef1(date1);
    bs.current.snapTo(2);
  };

 // Start date Calendar
  const renderContent1 = () => { 
    
    
  //    console.log(starting)
   return(<View>

    <Date 
    setDate={setDate1}
  
    text = 'Set End Day'
    starting={figureDate(dateref)}
    />

    <TouchableOpacity style={style.button} onPress={() => {
        bs.current.snapTo(2)
    }}>
    <Text style={style.buttonText}>Cancel</Text>
    </TouchableOpacity>
    </View>
   
 )};
  // End date Calendar
  const renderContent2 = () => {
    
    return(<View>

      <Date 
      text= 'Set Start Day'
      setDate={setDate}
      starting = {tomorrow}
     
      />
  
      <TouchableOpacity style={style.button} onPress={() => {
          bs.current.snapTo(2)
      }}>
      <Text style={style.buttonText}>Cancel</Text>
      </TouchableOpacity>
      </View>
     
   )
  };

  const renderHeader = () => (
    <View style={style.header}>
      <View style={style.panelHeader}>
        <View style={style.panelHandle} />
      </View>
    </View>
  );

  var order = {};

  const subsResult = (sub) => {
     
      order = sub;
      console.log(order)

      navigation.navigate('Cart')

      // navigation.navigate('Cart',{
      //   pname: pname,
      //   prate: prate,
      //   pquan: pquan,         // Refers to 'Rs. 22 for 1 packet'
      //   prate_: prate_,
      //   pnumber: order.number,
      //   pdays: order.days,
      //   startDate: order.start,
      //   endDate: order.end


      // })
  };

  
  var fall = new Animated.Value(1);

  return (
    <View style={style.container}>
      <BottomSheet
        enabledContentTapInteraction={true}
        ref={bs}
        snapPoints={[600,400,0]}
        renderContent= {!isPressed ? renderContent1 : renderContent2}
        renderHeader={renderHeader}
        initialSnap={2}
        callbackNode={fall}
        enabledGestureInteraction={false}
      />
      <Animated.View style={{margin: 20,
        opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
    }}>
    
        <View  style={{alignItems: 'center'}}>
         

          <SubscriptionScreen 
           dateref= {dateref}
           dateref1 = {dateref1}
            result = {subsResult}

        
          
          onCalendarOpen={() => {
            bs.current.snapTo(0)
            setIsPressed(true)
          }} 
          onCalendarOpen1={() => {
            bs.current.snapTo(0)
            setIsPressed(false)
          }}
          
          
          
          pname = {pname}
          prate = {prate}
          pquan = {pquan}
          prate_ = {prate_}

          

          
            goTo={()=> navigation.navigate('Cart',{
              pname: pname,
              prate: prate,
              pquan: pquan,         // Refers to 'Rs. 22 for 1 packet'
              prate_: prate_,
              pnumber: order.number,
              pdays: order.days,
              startDate: order.start,
              endDate: order.end


            })}
            // onWeekOpen={() => {
            //   bs.current.snapTo(0)
            //   setIsPressed(true)
            // }}
          />
          
           
              
          
         
        </View>

        
       
       
     
        
     
      </Animated.View>
    </View>
  );
};



const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    
  },
 
  panel: {
    padding: 20,
    backgroundColor: 'white',
    paddingTop: 10,
    height: Dimensions.get('window').height
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    elevation: 0.2,
    paddingTop: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: '10%',
    aspectRatio: 5/0.5,
    borderRadius: 4,
    backgroundColor: 'gray',
    marginBottom: '3%',
  },
 
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
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
    marginTop: '5%',
 
    backgroundColor: '#00C99D',
    width: '92%',
    aspectRatio: 10/1.4,
    borderRadius: 5,
   
   

},
 
  
 
});

export default SubscribeScreen;