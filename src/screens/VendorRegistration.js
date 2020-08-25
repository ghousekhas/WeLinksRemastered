import React,{useState, useEffect} from 'react';
import {View,TextInput,Text,StyleSheet,ScrollView, Alert} from 'react-native';
import {Styles,dimen,Constants} from '../Constants';
import TextBox from '../components/TextBox';
import Button from '../components/Button';
import SubmitButton from '../components/SubmitButton';
import  DocumentPicker from 'react-native-document-picker';
import {useNavigation} from '@react-navigation/native';

export default function VendorRegistration({navigation}){
    const [aadharFile,setAadharFile] = useState(null);
    const [gstFile,setGSTFile] = useState(null);
    const [uri,setUri] = useState(null);
    const [verification,setVerification] = useState(Constants.veTryAgain); 

    const submitRegistration= ()=>{

    }

    const getChangesToBeMade= ()=>{
        return 'Picture in Aadhar card isn\'t proper'
    }
    const tryingAgain =()=>{
        //send Trying again to the server
        setVerification(Constants.veFirstTime);
    }



    const fileselect =(filename)=>{
        try{
            
        }
        catch(e){}
    };

    if(verification == Constants.veFirstTime)
        return(
            <View style={{...StyleSheet.absoluteFill,backgroundColor: 'white'}}>
                <Text style={{...Styles.heading,alignSelf: 'center'}}>Tell us about your business</Text>    
                <View style={{marginTop: dimen.height/20,height: dimen.height*0.77}}>
                <ScrollView >
                    <TextBox title="NAME OF YOUR COMPANY" hint="Enter your company's name" />
                    <TextBox title="COMPANY EMAIL ADDRESS" hint="Enter company's E-mail address"/>
                    <TextBox title="COMPANY GST NUMBER" hint="Enter company's GST number"/>
                    <UploadButton title='GST CERTIFICATE' browseresult={fileselect}/>
                    <UploadButton title='ADDRESS' buttonTitle='Map' />
                    <UploadButton title='AADHAR/VERIFICATION' browseresult={fileselect}/>
                </ScrollView>
                </View>
                <SubmitButton onTouch={submitRegistration} text='Submit' />

            </View>
        )
    else if(verification == Constants.veInProgress)
            return(<View style={{...StyleSheet.absoluteFill,justifyContent: 'center',alignItems: 'center',padding: 20,backgroundColor: 'white'}}>
                <View>
                    <Text style={styl.head}>Your Application has been submitted</Text>  
                    <Text style={styl.subheading}>Please wait patiently until your application is verified</Text>      
                </View>

            </View>)
    else if(verification == Constants.veTryAgain)
            return(
                <View style={{...StyleSheet.absoluteFill,justifyContent: 'center',alignItems: 'center',padding: 20,backgroundColor: 'white'}}>
                <View>
                    <Text style={styl.head}>Your Application needs some changes to be approved</Text>  
                    <Text style={styl.subheading}>{getChangesToBeMade()}</Text>      
                </View>
                <View style={{padding: 10,position: 'absolute',bottom: 0,alignSelf: 'center'}}>
                    <SubmitButton text='Try Again' onTouch={()=>{tryingAgain()}}/>
                </View>

            </View>
            )
    else if(verification == Constants.verified)
                return(
                    <SubmitButton/>
                )
}

const styl = StyleSheet.create({
    subheading:{...Styles.subheading,alignSelf: 'center',marginTop: dimen.height/30,width: dimen.width/1.5,textAlign: 'center',fontSize: 15},
    head:{
        ...Styles.heading,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 25,
        width: dimen.width/1.2
    }
})

const UploadButton =({hint,title,browseresult,buttonTitle='Browse'})=>{
    const [filename,setFileName] = useState('Please select a file');
    const [uri,setUri] = useState(null);
    var navigation;
    try{
      navigation = useNavigation();
    }
    catch(e){}

    useEffect(()=>{
        if(buttonTitle == 'Map')
            setFileName('Please choose address');
    },[])

    const browse= async()=>{
        if(buttonTitle == 'Map'){
            navigation.navigate('Homescreen');
            return;
        }
        
        try{
            const res = await DocumentPicker.pick({type: [DocumentPicker.types.images,DocumentPicker.types.pdf]});
            setUri(res.uri);
            setFileName(res.name);
            console.log(res);
        }
        catch(err){
            if(DocumentPicker.isCancel(err)){
                Alert.alert('Please select a valid file');
            }
        }
    }

    return (<View style={{width: '90%',marginHorizontal: dimen.width*0.05}}>
        <Text style={{...Styles.subheading,marginTop: dimen.height/50,color: 'black',fontSize: 15,fontWeight: 'bold'}}>{title}</Text>
        <View style={{...Styles.horizontalRow,marginTop: dimen.height/80,alignSelf: 'flex-start',marginLeft: 0,alignContent: 'space-between',width: '100%'}}>
            <Text>{filename}</Text>
            <Button text={buttonTitle} onTouch={browse}/>
        </View>
    </View>)
}
