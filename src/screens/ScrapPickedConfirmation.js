import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet,ScrollView,FlatList,TouchableOpacity,TextInput,Image} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {Colors, TextSpinnerBoxStyles,dimen,Styles, Config} from '../Constants';
import GenericSeperator from '../components/GenericSeperator';
import AppBar from '../components/AppBar';
import Axios from 'axios';
import qs from 'qs';
import SubmitButton from '../components/SubmitButton';

export default function ScrapPickedConfirmation({navigation,route}){
    const [notes,setNotes]=useState('');
    const { bidTitle } = route.params;
    const [amount,setAmount] = useState(0)
    const {item,actualUser} = route.params;
    const cardDetails = route.params;
 //   const {tag} =  'Vendor'           
 const {tag} = route.params;
    const [submitted, isSubmitted] = useState(false);
    const [incorrect,setIncorrect] = useState(false);

     console.log("cd "+ cardDetails.orderID)
    // console.log("Tag "+tag)

    const words = {
        vendorHeading : 'Mark pick-up complete?',
        userHeading : 'Was your scrap picked up for ____?',
        submit : 'Mark Complete',
        amountCorrect : 'Amount Correct',
        amountIncorrect : 'Amount Incorrect',
        amountPaid : 'Enter amount paid',
        amountPaidByVendor : 'Enter amount paid by vendor'
    }

    const markPickUpComplete = () => {
        Axios.post(Config.api_url+'php?'+qs.stringify({
            action: 'markScrapVendorPickup',
            order_id : cardDetails.orderID,
            pickup_amount: amount ,
            order_otp: '1234',

        })).then((response) => {
            console.log(response)
            alert('Pickup marked successfully')
            isSubmitted(false)
        })



       

    }
    const markUserConfirmed = (correct) => {
        if(correct){
            Axios.post(Config.api_url+'php?'+qs.stringify({
                action: 'confirmScrapUserPickup',
                order_id : cardDetails.orderID,
                pickup_confirmed : 'yes'
    
            })).then((response) => {
                console.log("Confirm pick up " + JSON.stringify(response))
                alert('Pickup marked successfully')
                isSubmitted(false)
            })

        }else{
            Axios.post(Config.api_url+'php?'+qs.stringify({
                action: 'confirmScrapUserPickup',
                order_id : cardDetails.orderID,
                pickup_amount: amount,
                pickup_confirmed : 'yes'
    
            })).then((response) => {
                console.log("Confirm pick up new amount " + JSON.stringify(response))
                alert('Pickup marked successfully')
                isSubmitted(false)
            })

        }
      



       

    }

    const onButton=(type)=>{
        if(type != 'cancel' && notes.trim() === ''){
            alert('Please enter a reason/some information');
            return;
        }
        else if(type != 'cancel'){
            Axios.post(Config.api_url+'php?'+qs.stringify({
                action: 'cancelBid',
                user_id: actualUser.user_id,
                bid_id: item.bid_id,
                bid_notes: notes
            })).then((response)=>{
                console.log(response.data);
                alert('Request completed sucessfully');
                navigation.goBack();
                navigation.goBack();
            }
            );
        }
        else if(type === 'cancel')
            navigation.goBack();
           return //dosomething
    

    }
    
const MySubscriptionOrder = ({name,pickUpDate,orderAmount,orderDate,imageUrl,status,cart}) => {
    const renderCartItems = (cart) => {
  //      console.log("order date"+ orderDate)
        let i,res = [];
        for(i in cart){
                res.push(<Text style={{fontWeight: 'bold',fontSize:13}}>{`${cart[i].homescrap_name}${i==cart.length-1? "" : ", "}`}</Text>)
        }
        return(res)
    }
    const getDate = (date) => {
       console.log("dayte"+date)
   let dayte = date.substring(0,11)
    let arr = dayte.split("-");
    console.log(arr)
    let months = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

        return (arr[2].trim() + "-" + months[arr[1].replace(/^0+/, "")] + "-" + arr[0])

    }

    

    const [alignment,setAlign] = useState(0);
  
       
  
    return(<View style={{flexDirection: 'column',width: dimen.width*0.9,borderColor: Colors.seperatorGray,
    borderWidth: 1,borderRadius: 8,alignSelf: 'center',height: dimen.height/4.35,padding:'2%'}}>
       
    

    <View style={{flexDirection: 'row',justifyContent:'space-between'}}>
        <Text style={styles.greyText1}>{getDate(orderDate)}</Text>
        <View style={{flexDirection:'row'}}>
        <Text style={{...styles.quantity,marginStart: 30,fontSize:13}}>{`Status : `}</Text>

        <Text style={{...styles.quantity,marginStart: 10,color: Colors.blue,fontSize:12}}>{status}</Text>
        </View>

    </View>
    <View style={{flexDirection: 'row',margin: 5,backgroundColor: 'transparent',flex: 1,width: '100%'}}>
        <Image onLayout={({nativeEvent}) => {
        setAlign(nativeEvent.layout.width)
    }} style={{height: dimen.width*0.2,width: dimen.width*0.2,flex: 0,alignSelf: 'center'} }  resizeMethod={'auto'} resizeMode='contain' source={{uri: imageUrl}}/>

        <View style={{flex: 0,backgroundColor: 'transparent',marginStart:10}}>
        <Text style={{...Styles.heading,alignSelf: 'center',width: '100%',marginStart:55,backgroundColor: 'transparent',marginBottom: '5%',fontSize:14}}>{name}</Text>
<ScrollView persistentScrollbar indicatorStyle='white' horizontal style={{flexDirection: 'row',padding:'3%',alignSelf:'flex-start',marginStart: 30,backgroundColor: Colors.whiteBackground,borderRadius: 5,borderColor: Colors.seperatorGray,borderWidth: 0.5}}>
{renderCartItems(cart)}
</ScrollView>

        
        
        <Text style={{...styles.quantity,marginStart: 30,alignSelf:'flex-start',fontSize:13}}>{`Pick-up Date : ${pickUpDate.substring(0,10)}`}</Text>
     
             <Text style={{...styles.quantity,color:'black',marginStart: 30,alignSelf:'flex-start',fontSize:13}}>Order Total : ₹{orderAmount}</Text>

            {/* <Text style = {{...styles.rate,color: 'black',marginStart: alignment/8,fontSize: 12,alignSelf:'center',marginTop:'3%'}}>{num+" deliveries"}</Text> */}
           
            <View style={{flexDirection:'row',justifyContent: 'flex-end'}}>
        
        </View>

            
        </View>

    </View>
    </View>)

};


    return(<View>
    <AppBar back funct={()=>{navigation.goBack()}}/>
    <ScrollView>
        <View style={{...Styles.parentContainer}}>
            <Text style={{...Styles.heading,fontSize: 18,textAlign: 'center',alignSelf: 'center',flex: 0,padding: 20}}>{tag == 'Vendor' ? words.vendorHeading : words.userHeading}</Text>
           
            {tag == 'Vendor' ? <View>
            <MySubscriptionOrder name={cardDetails.name} pickUpDate={cardDetails.pickUpDate} orderAmount={cardDetails.orderAmount} orderDate={cardDetails.orderDate} imageUrl={cardDetails.image} status={cardDetails.status} cart={cardDetails.cart} />

           

            </View> : <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                <TouchableOpacity disabled={incorrect ? true : false} onPress={()=>{
                    setIncorrect(!incorrect);
                //    onButton('cancel')
                    }} style={{backgroundColor: 'red',flex: 1,padding: 10,marginLeft: 30,marginRight: 10,alignItems: 'center',justifyContent: 'center',borderRadius: 7,alignSelf: 'center'}}>
                    <Text style={{color: 'white'}}>Amount Incorrect</Text>
                </TouchableOpacity>
               {!incorrect ?<TouchableOpacity onPress={()=>{

                  markUserConfirmed(true)
                   }} style={{backgroundColor: Colors.primary,flex: 1,padding: 10,marginLeft: 10,marginRight: 30,alignItems: 'center',justifyContent: 'center',borderRadius: 7,alignSelf:'center'}}>
                    <Text style={{color: 'white'}}>Amount Correct</Text>
                </TouchableOpacity> : null}
            </View>}
            {incorrect || tag=='Vendor' ? <View>
            <Text style={{marginTop: dimen.height/30,alignSelf: 'center',fontSize : 12,marginHorizontal: dimen.width*0.05,flex: 0,fontWeight: 'bold',color: 'black',alignItems:'center'}}>{(tag == 'Vendor' ? words.amountPaid : words.amountPaidByVendor)+" : "} </Text>

            <TextInput 
            placeholder= {`Enter amount`}
                onChangeText={setAmount}
                value={amount}
               
                keyboardType= 'numeric'
              
               
                numberOfLines={1}
            style={{fontSize: 15,color: 'black',padding: 15,margin: 15,flex: 0,borderColor: Colors.seperatorGray,borderWidth: 1,borderRadius: 5,maxHeight: dimen.height/3}} />
            <Text style={{marginTop: dimen.height/30,alignSelf: 'center',fontSize : 12,marginHorizontal: dimen.width*0.05,flex: 0,fontWeight: 'bold',color: 'black',alignItems:'center'}}>Please leave any additional notes or feedback here :</Text>
            <TextInput 
            placeholder= {`Feedback or additional information`}
                onChangeText={setNotes}
                textAlignVertical={'top'}
               multiline={true}
               line
                numberOfLines={10}
            style={{fontSize: 15,color: 'black',padding: 15,margin: 15,flex: 0,borderColor: Colors.seperatorGray,borderWidth: 1,borderRadius: 5,maxHeight: dimen.height/3}} />
            
             <SubmitButton styling={submitted ? true : false} onTouch={() =>{
                if(amount == null || amount == undefined || amount == '')
                alert('Please enter a valid amount');
                else{

                    isSubmitted(true);
                    {tag == 'Vendor' ?  markPickUpComplete() : markUserConfirmed(false)}

                }
                } } text={tag == 'Vendor'? words.submit : 'Submit'} />
                </View> : null}
        </View>
        </ScrollView>
        </View>
    )

}

const styles = StyleSheet.create({
    card: {
        width: dimen.width-dimen.width/10,
        height: dimen.height/3.4,
        borderRadius: 15,
        borderColor: Colors.seperatorGray,
        borderWidth: 0.5,
       padding:'2%',
        marginTop: '5%',
        alignSelf: 'center',
        backgroundColor: 'white',
        elevation: 1,
        // marginBottom:'1%'
        
    },
    cardTitle: {
        fontWeight: 'bold',
        color: Colors.primary,
        padding: '1%',
        fontSize: 14,
       
    },
    duration:{
        paddingVertical: 5,
        paddingHorizontal: 3,
        margin: 3,
        borderStyle: 'dashed',
        borderColor: Colors.primary,
        flexDirection: 'row'
    },
    
    line:{
        borderWidth: 0.5,
        borderColor: Colors.seperatorGray,
        marginVertical: '2%',
      
    }
    ,
    name: {
        fontWeight: '400',
        fontSize: 18,
        padding: 5,
        marginTop: '2%',
        fontWeight: 'bold',
        color:'black'
        
    },
    quantity: {
        marginStart: '35%',
        marginTop: '3%',
        fontWeight: 'bold',
        
        
        fontSize: 15,
       
        padding: 1
       
    },
    rate: {
        
        
        fontWeight: 'bold',
        fontSize: 14,
        marginTop: '3%',
       
        color:'black'
      

    },
    greyText: {
       
        color: 'gray',
        fontSize: 15,
        fontWeight: 'bold',
      marginStart: '10%',
      paddingVertical: '3%',
      
        marginVertical: '4%'
        
    },
    greyText1: {
        marginStart: '3%',
        color: 'gray',
        fontSize: 12,
        fontWeight: 'bold',
        margin: '2%',
        marginTop:'4%'
        
     
        
        
    },
    image1: {
        width: 60,
        height: 60,
        position: 'absolute',
        padding: 10,
        zIndex: 10000

        
       
    },
    image: {
        width: 80,
        height: 80,
        position: 'absolute',
        marginStart: '4%',
        marginTop: '10%',
       
        
       
    },
    icon: {
        marginVertical: '2.2%',
        
     position: 'absolute',
     right: '2%'
       
    },
    yes: {
        color: Colors.primary,
        marginTop: '3.5%',
        fontWeight: 'bold',
        fontSize: 15,
        
        
    }

});