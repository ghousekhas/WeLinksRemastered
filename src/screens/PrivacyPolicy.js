import React, { useState,useEffect } from 'react';
import {Text,View,StyleSheet,TextInput, Dimensions,TouchableOpacity} from 'react-native';
import {Styles} from '../Constants';
import AppBar from '../components/AppBar';
import Axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

export default function PrivacyPolicy ({navigation}) {
  const [policy,setPolicy] = useState('Loading...');

  const samplePolicy = [{
      'content' : `Mann yeh saahib ji, jaane hai sab ji  Phir bhi banaye bahaane  Naina nawaabi ji, dekhe hain sab ji  Phir bhi na samjhe ishaare  Mann yeh saahib ji haan karta bahaane   Naina nawaabi ji na samjhe ishaare (na samjhe ishaare) Dheere dheere, nainon ko dheere dheere  Jiya ko dheere dheere bhaayo re Saibo  Dheere dheere, begaana dheere dheere  Apna sa dheere dheere lage re Saibo  Surkhhiyaan hain hawaaon mein, do dilon ke milne ki  Dheere dheere, nainon ko dheere dheere  Jiya ko dheere dheere bhaayo re Saibo  Dheere dheere, begaana dheere dheere  Apna sa dheere dheere lage re Saibo  Saibo... Saibo...`
  }]
  useEffect(() => {
    Axios.get('http://api.dev.we-link.in/user_app.php?action=getPrivacyPolicy',{
        'Accept-Encoding': 'gzip'
    }
    ).then((result) => {
  //  console.log("k " +result.data.privacy_policy)
   setPolicy(result.data.privacy_policy)

  
       
  
    }).catch((error) => {
        console.log("Error fetching Privacy Policy: " + err);
        setPolicy(samplePolicy);
        
    });
  });
return(<View>
 <AppBar back ={true} funct={() => {
        navigation.pop();
        }} />

<View style={Styles.parentContainer}>
<Text style={styles.heading}>Privacy Policy</Text>
<View style={Styles.grayfullline}/>
<ScrollView>
<View>
<Text style={{margin: '5%'}}>{policy}</Text>
</View>
</ScrollView>
</View>
</View>)
}

const styles = StyleSheet.create({
    heading:{
        color: 'black',
        margin: '5%',
        fontSize: 20,
        marginVertical: '5%',
        fontWeight: 'bold'
      }

})

