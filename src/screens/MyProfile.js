import * as React from 'react';
import { Button, View, StyleSheet, Dimensions } from 'react-native';
import { Constants, Styles } from '../Constants';


const MyProfile = () => {
    return(<View style={Styles.parentContainer}>
    <View style={style.header}>

    </View>

    </View>)
};


const style = StyleSheet.create({
    container: {
        margin: '1%'
    },
    header: {
        backgroundColor: '#00C99D',
      
        height: Dimensions.get('window').height/2

    }
})

export default MyProfile;