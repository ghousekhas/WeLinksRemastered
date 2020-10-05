import React,{useState, useEffect} from 'react';
import {View,TextInput,Text,StyleSheet,ScrollView, Alert,BackHandler} from 'react-native';
import {Styles,dimen,Constants} from '../Constants';
import TextBox from '../components/TextBox';
import Button from '../components/Button';
import SubmitButton from '../components/SubmitButton';
import  DocumentPicker from 'react-native-document-picker';
import AppBar from '../components/AppBar';
import { useFocusEffect,CommonActions,useNavigation, StackActions } from '@react-navigation/native';
import Axios from 'axios';
import qs from 'qs';
import auth from '@react-native-firebase/auth'
import VendorServices from './VendorServices';
export default function VendorRegistration({navigation}){
    const [aadharFile,setAadharFile] = useState(null);
    const [gstFile,setGSTFile] = useState(null);
    const [uri,setUri] = useState(null);
    const [verification,setVerification] = useState(Constants.veFirstTime); 
    const [user,setUser]=useState(auth().currentUser);
    const [actualUser,setActualUser]=useState();
    const [name,companyName]=useState('');
    const [email,companyEmail]=useState('');
    const [gst,companyGstNumber]=useState('');
    const [address,setAddress]=useState(null);


    const checkVendorStatus=()=>{
        Axios.get('https://api.dev.we-link.in/user_app.php?action=getUser&phone='+user.phoneNumber.substring(3))
            .then((response)=>{
                console.log(response.data.user[0]);
                setActualUser('theactualuser',response.data.user[0]);
                var b=response.data.user[0];
                Axios.get('https://api.dev.we-link.in/user_app.php?action=getVendorStatus&user_id='+b.user_id,)
                    .then((response)=>{
                try{
                    var status= response.data.vendor[0].vendor_status;
                    if(status=== 'active')
                        setVerification(Constants.verified);
                    else if(status=== 'inactive')
                        setVerification(Constants.veFirstTime)
                    else
                        setVerification(Constants.veInProgress);
                    setVerification(Constants.veFirstTime);
                }
                catch(error){
                    setVerification(Constants.veFirstTime);
                }
            })
            },(error)=>{
                console.log('error');
            })
    }


    

    useEffect(()=>{
        
        console.log('ph',user.phoneNumber.substring(3));
        checkVendorStatus();
        
    },[]);

    const submitRegistration= (services)=>{
        var fromData=new FormData();
        fromData.append('id_proof_document',{
            uri: aadharFile.uri,
            type:'image/jpeg',
            name: aadharFile.name
        });
        fromData.append('vendor_img_url',{
            uri: gstFile.uri,
            type:'image/jpeg',
            name: aadharFile.name

        })
        Axios.post('https://api.dev.we-link.in/user_app.php?action=registerVendor&'+qs.stringify({
            user_id: actualUser.user_id,
            company_name: name,
            vendor_gstin: gst,
            email: email,
            lat: 1,
            lng: 1,
            pincode: 560092,
            label: 'office'


        }),fromData).then((response)=>{
            console.log(response.data);
            checkVendorStatus();

        },(error)=>{
            console.log(error);
        })

        
    }

    const getChangesToBeMade= ()=>{
        return 'Picture in Aadhar card isn\'t proper'
    }
    const tryingAgain =()=>{

        setVerification(Constants.veFirstTime);
    }



    const fileselect =(filename)=>{
        try{
            
        }
        catch(e){}
    };
    useFocusEffect(
        React.useCallback(() => {
          const onBackPress = () => {
         console.log('Can\'t go back from here');
         navigation.toggleDrawer();
    
                  
              return true;
            
          };
    
          BackHandler.addEventListener('hardwareBackPress', onBackPress);
    
          return () =>
            BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        },)
      );
    if(verification==67)
        return <VendorServices submit={submitRegistration}/>
    if(verification == Constants.veFirstTime)
        return(
            <View style={{...StyleSheet.absoluteFill,backgroundColor: 'white'}}>
                <AppBar  funct={() => {
        navigation.toggleDrawer();
        }} />
                <Text style={{...Styles.heading,alignSelf: 'center'}}>Tell us about your business</Text>    
                <View style={{marginTop: dimen.height/20,height: dimen.height*0.77}}>
                <ScrollView >
                    <TextBox title="NAME OF YOUR COMPANY" hint="Enter your company's name" changeText={companyName} />
                    <TextBox title="COMPANY EMAIL ADDRESS" hint="Enter company's E-mail address" changeText={companyEmail}/>
                    <TextBox title="COMPANY GST NUMBER" hint="Enter company's GST number" changeText={companyGstNumber}/>
                    <UploadButton title='GST CERTIFICATE' browseresult={fileselect} fileSetter={setGSTFile}/>
                    <UploadButton title='ADDRESS' buttonTitle='Map' setAddress={setAddress} actualUser={actualUser} />
                    <UploadButton title='AADHAR/VERIFICATION' browseresult={fileselect} fileSetter={setAadharFile}/>
                </ScrollView>
                </View>
                <SubmitButton onTouch={()=>setVerification(67)} text='Submit' />

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

const UploadButton =({hint,title,browseresult,fileSetter,actualUser,buttonTitle='Browse',setAddress})=>{
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
            navigation.navigate('AddAddress',{
                type: 'vendorRegistration',
                callback: setAddress,
                actualUser: actualUser,
                addrNameSetter: setFileName,
                initialCamera: {
                    center:{
                    latitude: 13.062314,
                    longitude: 77.591136,
                    },
                    pitch: 0,
                    heading: 0,
                    zoom: 14
                    
        
                  }
            });
            return;
        }
        
        try{
            const res = await DocumentPicker.pick({type: [DocumentPicker.types.images,DocumentPicker.types.pdf]});
            setUri(res.uri);
            setFileName(res.name);
            console.log(res);
            if(res.size%100>200){
                Alert.alert('Size of the file should be lesser than 200kb')
                setFileName('Please select a file');
            }
            fileSetter(res);
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
            <Text style={{width: '70%'}}>{filename}</Text>
            <Button text={buttonTitle} onTouch={browse}/>
        </View>
    </View>)
}
