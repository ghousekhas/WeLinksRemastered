import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider'


var showRealApp=false;
const slides = [
    {
      key: 'one',
      title: 'Some lorem ipsum dolor amet  1',
      text: 'Description.\nSay something cool',
      image: require('./../../assets/1.jpg'),
      backgroundColor: '#59b2ab',
    },
    {
      key: 'two',
      title: 'Title 2',
      text: 'Refrigerator',
      image: require('./../../assets/2.jpg'),
      backgroundColor: '#febe29',
    },
    {
      key: 'three',
      title: 'Title 3',
      text: 'Freezer',
      image: require('./../../assets/3.jpg'),
      backgroundColor: '#22bcb5',
    },
    {
        key: 'four',
        title: 'Title 4',
        text: 'Morgue',
        image: require('./../../assets/4.jpg'),
        backgroundColor: '#febe29'
  }];


   
export default class Introduction extends React.Component{
    _renderItem = ({ item }) => {
        return (
          <View style={{...styles.slide ,backgroundColor: item.backgroundColor}}>
            <Text style={styles.title}>{item.title}</Text>
            <Image style={styles.image} source={item.image} />
            <Text style={styles.text}>{item.text}</Text>
          </View>
        );
      }
     _onDone = () => {
        // User finished the introduction. Show real app through
        // navigation or simply by controlling state
        showRealApp=true;
        this.props.navigation.navigate('Login')
      }
    
      render(){
        /*if (this.state.showRealApp) {
          return <App />;
        } else {*/
          return <AppIntroSlider renderItem={this._renderItem} data={slides} onDone={this._onDone}/>;
       /* }*/
      }
    }


const styles= StyleSheet.create({
    slide:{
        marginTop: 30,
        backgroundColor: 'rgba(255,0,0,0)',
        flex: 1,
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'flex-start',
        paddingBottom: 200,
    },
    title:{
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '200',
        marginLeft: 20,
        padding: 10,
        marginBottom: 50,
        backgroundColor: 'rgba(0,0,0,0)'
    },
    image:{
        height: 300,
        width: 300,
        alignSelf: 'center',
        
    },
    text: {
      fontSize: 20,
      textAlign: 'center',
      marginTop: 10
    }
});
