import React from 'react';
import {Text,View,StyleSheet,TextInput, Dimensions} from 'react-native';
import { Defs } from 'react-native-svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {FontAwesome5} from '@expo/vector-icons';
import {Colors,dimen,TextSpinnerBoxStyles} from '../Constants';

<<<<<<< HEAD
const TextBox = ({title,hint,icon,changeText,text}) => {
    return(<View style={style.mainContainer}>
       <Text style={style.text}>{title}</Text>
       <View style={style.answer}>
       <TextInput style={style.input} value={text}
=======
const TextBox = ({title,hint,icon,changeText,defaultValue}) => {
    return(<View style={style.mainContainer}>
       <Text style={style.text}>{title}</Text>
       <View style={style.answer}>
       <TextInput style={style.input} 
       defaultValue={defaultValue}
>>>>>>> 8a2f08ec480097d72103684f14385b4670b6d7b0
       placeholder={hint} onChangeText={changeText}></TextInput>
       <View style={style.icon}>
       <FontAwesome5 name={icon} size={30} color='#5D5D5D' backgroundColor='white' />
       </View>
     
       </View>
      
    </View>)

};



const style = StyleSheet.create({
    mainContainer:{
        paddingVertical: dimen.height/100,
        marginTop: dimen.height/100,
        paddingHorizontal: dimen.width*0.1,
        alignSelf: 'center'
    },
   text:{
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold'
     //   backgroundColor: '#F9F9F9'

   },
   input: {
    height: TextSpinnerBoxStyles.input.height, 
    textAlign: 'left',
    
    flex: 5,
    marginStart: 10,
    backgroundColor: 'white'
   
   
    
   
},
    answer:{
    flexDirection:'row',
    marginTop: 8,
    alignItems: 'center',
    height: TextSpinnerBoxStyles.answer.height,
    width: Dimensions.get('window').width-30,
    backgroundColor: 'white',
   
  
    borderColor: Colors.seperatorGray,
    borderWidth: 1,
    borderRadius: 5
},
icon:{
    padding: 6
}
});
export default TextBox;