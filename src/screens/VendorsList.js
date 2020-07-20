import React from 'react';
import {View,Text,TextInput,StyleSheet,Dimensions} from 'react-native';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';

class VendorComponent extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        return(
            <View style={style.listmaincontainer} >
                <Image style={style.listimage}/>
                <View style={style.listvendordesc} >
                    <Text style={style.listvendorname}></Text>
                    <Text style={style.listvendoraddress}></Text>
                    <Review style={style.review} />

                </View>
                <TouchableOpacity style={style.listbutton}
                    onPress={this.select}>
                    <Text> Select </Text>
                </TouchableOpacity>

            </View>
        );
    }
}

export default class VendorsList extends React.Component{
    constructor(props){
        super(props);
        this.state={

        };
        this.data=[{
            text: 'lorem ipsasdsum',
            lat: 12,
            lng: 13
          },{
            text: 'lorem iaapsum',
            lat: 12,
            lng: 13
          },{
            text: 'lorem iaspsum',
            lat: 12,
            lng: 13
          }];
          
    }
    renderSavedAddress=({item})=>{
        return(
          <View style={styles.horiz}>
            <Text style={styles.address}>{item.text}</Text>
            <TouchableOpacity styles={{borderWidth: 2, borderColor: 'gray',padding: 10}} onPress={()=>{
              this.setSelectedAddress()
            }}>
              <Text styles={{padding: 10}}>SELECT</Text>
            </TouchableOpacity>
          </View>
        );
      }


    render(){


        return(<View style={style.mainContainer}>
            <Text style = {style.text}>Vendors near you</Text>
            <FlatList 
            data={this.data}
            renderItem={this.renderSavedAddress}
            style={{flex:1}} 
            keyExtractor={(item,index)=> Math.random().toString(36).substr(2, 10)}
            />
         
         
        </View>)

    }

}


const style = StyleSheet.create({
    mainContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        padding: 10

    },
    text:{
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        
        marginTop: 10,
        margin: 5
    },
    line: {
        borderWidth: 0.5,
        borderColor: '#5D5D5D',
        marginTop: 10,
     
    },
    view: {
        flexDirection: 'row',
        marginTop: 12
        
    },
    city: {
        marginTop: 5,
        marginStart: 7,
        fontSize: 18
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'column',
        backgroundColor: '#ecf0f1',
        padding: 8,
      },
      address:{alignSelf: 'center', fontSize: 14,padding: 10,fontWeight: 'bold'},
      horiz:{width: Dimensions.get('window').width,height: 250,flexDirection: 'row',justifyContent: 'space-between'}


});


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      flexDirection: 'column',
      backgroundColor: '#ecf0f1',
      padding: 8,
    },
    address:{alignSelf: 'center', fontSize: 14,padding: 10,fontWeight: 'bold'},
    horiz:{width: Dimensions.get('window').width,height: 250,flexDirection: 'row',justifyContent: 'space-between'}

    
    
  });
