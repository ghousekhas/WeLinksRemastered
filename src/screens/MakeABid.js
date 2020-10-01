import React from 'react';
import {Text,View,StyleSheet} from 'react-native';
import TextBox from '../components/TextBox';
import SubmitButton from '../components/SubmitButton';
import AppBar from '../components/AppBar';
import { Styles } from '../Constants';
import { ScrollView } from 'react-native-gesture-handler';

const BidMaker = () => {
    return(<View>
     <AppBar  
       back
       funct={() => {
       navigation.pop();
        }} />
        <ScrollView>
        <View style={Styles.parentContainer}>
        
        <TextBox
    title='Vendor Name'
     />
        </View>
    
</ScrollView>
    </View>)
   
}

export default BidMaker;