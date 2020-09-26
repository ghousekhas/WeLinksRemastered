import React, { useState } from 'react';
import {View,Text,StyleSheet, Dimensions, Button, FlatList } from 'react-native';
import Axios from 'axios';
import { TextInput} from 'react-native-gesture-handler';


const Test = () => {
  const axios = require('axios')
  const baseURL = "https://api.dev.we-link.in/user_app.php?action=getProductsList&vendorID=1";

  const [data,setData] = useState([]);

  const getData = async () => {
    await axios({
      "method":"GET",
      "url": baseURL,
     
  
  }).then((response)=>{
    setData(response.data)
     console.log('this is what you get ' + response.data)
  })
  .catch((error)=>{
    console.log("Error")
  })
 
  }

  //getData();
  return(<View>

  <FlatList
    data = {data}
    renderItem = {({item}) => {
      console.log('Inside list '+item)
    }}
  />
    
  </View>
   
    )
  } 

  

export default Test;