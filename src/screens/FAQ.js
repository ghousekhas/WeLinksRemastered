import React,{useState} from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { List } from 'react-native-paper';
import {Colors, Styles} from '../Constants'
import AppBar from '../components/AppBar'
import { ScrollView } from 'react-native-gesture-handler';


const FAQ = ({navigation}) => {
  const [questions,updateQuestions] = useState([
    {
        q:'How do subscriptions work?',
        a:'Its simple, You choose your favourite brand, quantity and frequency. You make a payment. Sit back and enjoy products delivered to your doorstep!',
     
    },
    {
     q:'Do you deliver in my area?',
     a:'Its simple, You choose your favourite brand, quantity and frequency. You make a payment. Sit back and enjoy products delivered to your doorstep!',

 },
 {
     q:'Is there a delivery fee?',
     a:'Its simple, You choose your favourite brand, quantity and frequency. You make a payment. Sit back and enjoy products delivered to your doorstep!',
 },
 {
  q:'How do subscriptions work?',
  a:'Its simple, You choose your favourite brand, quantity and frequency. You make a payment. Sit back and enjoy products delivered to your doorstep!',

},
{
q:'Do you deliver in my area?',
a:'Its simple, You choose your favourite brand, quantity and frequency. You make a payment. Sit back and enjoy products delivered to your doorstep!',

},
{
q:'Is there a delivery fee?',
a:'Its simple, You choose your favourite brand, quantity and frequency. You make a payment. Sit back and enjoy products delivered to your doorstep!',
},

]);

const renderAccordion = () => {
  const accordions = [];
  for(var i=0;i<questions.length;i++){
      
      accordions.push(
    <View>

 <List.Accordion title={questions[i].q} id={i} titleStyle={styles.question}>
 <List.Item  descriptionNumberOfLines={5} descriptionStyle={styles.answer} description={questions[i].a}/>
 </List.Accordion>

 <View style={Styles.grayfullline}/>


</View>)

  }
return accordions;
};


  return(
  <View style={{flex:1}}>
   <AppBar back ={true} funct={() => {
        navigation.pop();
        }} />
  
        <ScrollView>
  <View style={{...Styles.parentContainer,flex: 1,height:Dimensions.get('window').height}}>
  
  <Text style={styles.heading}>Frequently Asked Questions</Text>
  <View style={Styles.grayfullline}/>

  {renderAccordion()}
  </View>
  </ScrollView>
  </View>)

};

const styles = StyleSheet.create({
  heading:{
    color: 'black',
    margin: '5%',
    fontSize: 20,
    marginVertical: '5%',
    fontWeight: 'bold'
  },
  question: {
    color: 'black',
    fontSize: 16,
    fontWeight: '900',
    
  },
  answer: {
    color: 'gray',
    marginTop: '-10%'
  }
  
});
 
export default FAQ;