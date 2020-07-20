import React from 'react';
import {Text,View,StyleSheet,TextInput, Dimensions} from 'react-native';
import { Defs } from 'react-native-svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {FontAwesome5} from '@expo/vector-icons'

const TextBox = ({title,hint,icon}) => {
    return(<View style={style.mainContainer}>
       <Text style={style.text}>{title}</Text>
       <View style={style.answer}>
       <TextInput style={style.input}
       placeholder={hint}></TextInput>
       <View style={style.icon}>
       <FontAwesome5 name={icon} size={30} color='#5D5D5D' backgroundColor='white' />
       </View>
     
       </View>
      
    </View>)

};



const style = StyleSheet.create({
    mainContainer:{
        padding: 10,
        marginTop: 10
    },
   text:{
        fontSize: 15,
        fontWeight: '200',
        backgroundColor: '#F9F9F9'

   },
   input: {
    height: 40, 
    textAlign: 'left',
    
    flex: 5,
    marginStart: 10,
    backgroundColor: 'white'
   
   
    
   
},
    answer:{
    flexDirection:'row',
    marginTop: 8,
    
    height: 45,
    width: Dimensions.get('window').width-30,
    alignSelf: 'center',
    backgroundColor: 'white',
   
  
    borderColor: '#5D5D5D',
    borderWidth: 1,
    borderRadius: 5
},
icon:{
    padding: 6
}
});
export default TextBox;