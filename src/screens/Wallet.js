import React,{useState} from 'react';
import {View,TextInput,Text,StyleSheet,BackHandler,TouchableOpacity} from 'react-native';
import AppBar from '../components/AppBar';
import { Styles,Colors,dimen } from '../Constants';
import { useFocusEffect } from '@react-navigation/native';
import SubmitButton from '../components/SubmitButton';
import WebView from 'react-native-webview';

const wallet = ({navigation,route}) => {
    const constants={
        balance: `Wallet Balance`,
        rupee:`₹`,
        add:`Add money to WeLinks wallet`,
        button:`Add Money`,
        fiveHundred: `₹500`,
        thousand: `₹1000`,
        twoThousand: `₹2000`,
        uri:`https://www.google.com/`
    }
    
    // useFocusEffect(
    //     React.useCallback(() => {
    //         const onBackPress = () => {
    //             route.params.goBackToHome();
    //             return true;

    //         };

    //         BackHandler.addEventListener('hardwareBackPress', onBackPress);




    //         return () =>
    //             BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    //     })
    // );


    const [balance,setBalance] = useState(0);
    const [addBalance,setAddBalance] = useState(0);
    return(<View style={{flex:1,backgroundColor:'transparent'}}>
    <AppBar title="WeLinks Wallet" funct={() => navigation.toggleDrawer()} />
    <View style={Styles.parentContainer}>
        <View style={styles.greenBack}>
        <Text style={styles.heading}>{constants.balance}</Text>
        <Text style={styles.subheading}>{constants.rupee+balance}</Text>
        </View>

        <View>
        <Text style={{...styles.heading,fontSize:17,marginTop:'6%'}}>{constants.add}</Text>
        <View style={{paddingTop:'4%',padding:'6%',paddingStart:'3%'}}>
        <TextInput 
        style={styles.input} 
        value={addBalance}
        placeholder={constants.rupee}
        keyboardType='number-pad'
        
        onChangeText={(value)=>setAddBalance(value)}
        />
        <View style={styles.chips}>

        <View style={styles.chip}>
        <TouchableOpacity onPress={() => {
            setAddBalance(constants.fiveHundred)
        }}>
        <Text style={styles.chipText}>{constants.fiveHundred}</Text>
        </TouchableOpacity>
        </View>

        <View style={styles.chip}>
        <TouchableOpacity onPress={() => {
            setAddBalance(constants.thousand)
        }}>
        <Text style={styles.chipText}>{constants.thousand}</Text>
        </TouchableOpacity>

        </View>

        <View style={styles.chip}>
        <TouchableOpacity onPress={() => {
            setAddBalance(constants.twoThousand)
        }}>
        <Text style={styles.chipText}>{constants.twoThousand}</Text>
        </TouchableOpacity>

        </View>

        </View>
        </View>
        {/* <View style={{flex:1}}>
        <WebView style={{width:dimen.width,height:dimen.height}}
        source={{uri:constants.uri}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true} 
         /> 
         </View> */}
        
        <SubmitButton text={constants.button} />

        </View>
       



    </View>

    </View>)
};

export default wallet;

const styles=StyleSheet.create({
    greenBack:{
        backgroundColor: Colors.lightBlue,
        height: '20%',
        alignItems:'center',
  //      justifyContent:'center'

    },
    heading:{
        fontWeight:'bold',
        fontSize:16,
        color:'black',
        margin:'3%',
        marginBottom:'1%',
        marginTop:'10%'

    },
    subheading:{
        fontSize:16,
        color:'gray',
        margin:'3%',
        marginTop:'0%',
        textAlign:'center'

    },
    input:{
        borderRadius:10,
        borderColor:Colors.seperatorGray,
        backgroundColor:'white',
        borderWidth:0.5,
        padding:'4%',
        fontSize:15,
    },
    chips:{
        justifyContent:'space-evenly',
        flexDirection:'row',
        marginTop:'5%',
    
    },
    chip:{
        borderRadius:10,
        flex:1,
        padding:'2%',
        margin:'2%',
        borderWidth:0.8,
        borderColor:Colors.primary

    },
    chipText:{
        color:Colors.primary,
        textAlign:'center'
    }

});