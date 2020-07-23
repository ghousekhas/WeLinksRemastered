import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import FastImage from 'react-native-fast-image';


var showRealApp=false;
const slides = [
    {
      key: 'one',
      title: 'Free milk delivery at home',
      text: 'Choose from a wide range of our milk products',
      image: require('../../assets/intromilk.jpg'),
      backgroundColor: '#F3F7FA',
    },
    {
      key: 'two',
      title: 'Your favorite newspaper at your doorstep',
      text: 'Find the best newspaper delivery companies for homes, offices',
      image: require('../../assets/intronews.png'),
      backgroundColor: '#F3F7FA',
    },
    {
      key: 'three',
      title: 'Online doorstep scrap pickup service',
      text: 'Sell your scrap easily and get better prices and offers',
      image: require('../../assets/introscrapsell.jpg'),
      backgroundColor: '#F3F7FA',
    },
    {
        key: 'four',
        title: 'Scrap selling for corporates',
        text: 'We have an option for corporates to systematically get rid of the scrap and get certificates of recycling',
        image: require('../../assets/introscrap.jpg'),
        backgroundColor: '#F3F7FA'
  }];


   
export default class Introduction extends React.Component{
    _renderItem = ({ item }) => {
        return (
          <View style={{...styles.slide ,backgroundColor: item.backgroundColor}}>
          
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.text}>{item.text}</Text>
            <FastImage style={styles.image} source={item.image} />
           
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
          return <AppIntroSlider renderItem={this._renderItem} data={slides} onDone={this._onDone}
                initialNumToRender={4}/>;
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
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 20,
        
        padding: 10,
       
        
    },
    image:{
      marginTop: 70,
        height: 300,
        width: 300,
        alignSelf: 'center',
        
    },
    text: {
      fontSize: 15,
      textAlign: 'center',
      marginTop: 5,
      color: 'gray',
      margin: 15
      
    }
});
