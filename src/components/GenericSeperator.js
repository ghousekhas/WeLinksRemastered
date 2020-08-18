import React from 'react';
import {View,StyleSheet} from 'react-native';

export default function GenericSeperator(){
    return(<View style={mainstyle.styles}/>);
};

const mainstyle = StyleSheet.create({
    styles:{
    width: '90%',
    height: 0,
    borderWidth: 0.35,
    borderStyle: 'dashed'
}
});


