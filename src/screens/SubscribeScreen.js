import React,{ Fragment, useState, useRef } from 'react';
import { View,Text,TouchableOpacity,StyleSheet,Dimensions,Alert } from 'react-native';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import SubmitButton from '../components/SubmitButton';
import moment from 'moment';
import Date,{okay} from './Date';
import WeekPicker from '../components/WeekPicker';
import SubscriptionScreen from './SubscriptionScreen';


bs = React.createRef();


const SubscribeScreen = ({navigation,route}) => {

  const {pname} = route.params;
  const {pquan} = route.params;
 
  const {prate} = route.params;
 
 
const [isPressed,setIsPressed] = useState(false)
const [dateResult,setResult] = useState('')
  thisDay = moment()
  .utcOffset('+05:30')
  .format('YYYY-MM-DD');

  // console.log('t:'+thisDay)
  
  renderContent1 = () => { 
  
   
    return(<View>

    <Date onSet={() => {
     
      
      setIsPressed(true)
     
    }}/>

    <TouchableOpacity style={style.button} onPress={() => {
      setResult({okay})
        bs.current.snapTo(2)
    }}>
    <Text style={style.buttonText}>Cancel</Text>

    </TouchableOpacity>

    {/* <SubmitButton text='Cancel' onTouch={() => {
        this.bs.current.snapTo(2)
    }
    }/> */}
    </View>
   


  )};
  
  renderContent2 = () => {
    
  return(<View style={{margin: 2}}>
 
  <WeekPicker back={() => {
    setIsPressed(false)
  }} 
  />
  <SubmitButton text='Cancel' onTouch={()=>{
      bs.current.snapTo(2)
    //  setIsPressed(false)
  
  }}/>

  

  </View>)
  };

  renderHeader = () => (
    <View style={style.header}>
      <View style={style.panelHeader}>
        <View style={style.panelHandle} />
      </View>
    </View>
  );

  
  fall = new Animated.Value(1);

  return (
    <View style={style.container}>
      <BottomSheet
        enabledContentTapInteraction={true}
        ref={bs}
        snapPoints={[600,400,0]}
        renderContent= {!isPressed ? bs.renderContent1 : bs.renderContent2}
        renderHeader={renderHeader}
        initialSnap={2}
        callbackNode={fall}
        enabledGestureInteraction={false}
      />
      <Animated.View style={{margin: 20,
        opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
    }}>
    
        <View style={{alignItems: 'center'}}>
         

          <SubscriptionScreen onCalendarOpen={() => {
            bs.current.snapTo(0)
            setIsPressed(false)
          }} dateResult='Today'
          pname = {pname}
          prate = {prate}
          pquan = {pquan}
            goTo={()=> navigation.navigate('Cart',{
              pname: pname,
              prate: prate,
              pquan: pquan

            })}
            onWeekOpen={() => {
              bs.current.snapTo(0)
              setIsPressed(true)
            }}
          />
          
           
              
          
         
        </View>

        
       
       
     
        
     
      </Animated.View>
    </View>
  );
};



const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
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