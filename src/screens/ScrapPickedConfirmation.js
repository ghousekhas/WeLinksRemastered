import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet,ScrollView,FlatList,TouchableOpacity,TextInput,Image} from 'react-native';
import {Colors, TextSpinnerBoxStyles,dimen,Styles, Config} from '../Constants';
import AppBar from '../components/AppBar';
import Axios from 'axios';
import qs from 'qs';
import SubmitButton from '../components/SubmitButton';
import sendNotif from '../Utility/sendNotificationTo';
import auth, { firebase } from '@react-native-firebase/auth';



export default function ScrapPickedConfirmation({navigation,route}){
    const [vnotes,setVNotes]=useState('');
    const [amount,setAmount] = useState(0)
    let cardDetails = route.params;
    const cardDetail = route.params;
   // const tag =  'User'           
    const {tag} = route.params;
    const [submitted, isSubmitted] = useState(false);
    const [incorrect,setIncorrect] = useState(false);
    const [show,setShow] = useState(false);
    const {user} = route.params;


  //   console.log("cd "+ JSON.stringify(cardDetail.item))
 // console.log("Vendor Amount "+ cardDetail.item.pickup_amount_by_vendor)
     console.log("Tag "+tag)

     if(tag == 'User'){
         try{
         cardDetails = {
             name : cardDetail.item.company_name,
             vendorID : cardDetail.item.vendor_id,
             orderID : cardDetail.item.scrap_order_id,
             pickUpDate : cardDetail.item.pickup_date,
             orderAmount : cardDetail.item.order_amount,
             orderDate : cardDetail.item.order_date,
             image : cardDetail.item.vendor_img_url,
             status : cardDetail.item.order_status,
             cart : cardDetail.item.cart,
             vendorAmount: cardDetail.item.pickup_amount_by_vendor,
             userID : cardDetail.item.user_id





         }
         console.log("log "+JSON.stringify(cardDetails.userID))
     }
     catch(e){
         cardDetails = {}
     }
}
    

    const words = {
        vendorHeading : 'Update Pick-up status',
        userHeading : `Was your scrap picked up for ${cardDetails.vendorAmount}?`,
        submit : 'Submit',
        amountCorrect : 'Amount Correct',
        amountIncorrect : 'Amount Incorrect',
        amountPaid : 'Enter amount paid',
        amountPaidByVendor : 'Enter amount paid by vendor'
    }

    const markPickUpComplete = (yesOrno) => {
        Axios.post(Config.api_url+'php?'+qs.stringify({
            action: 'markScrapVendorPickup',
            order_id : cardDetails.orderID,
            pickup_amount_by_vendor: amount ,
            pickup_status_by_vendor : toString(yesOrno),
            pickup_notes_by_vendor : vnotes
          //  order_otp: '1234',

        })).then((response) => {
            console.log("OH NO"+response+" "+yesOrno)
           alert('Status Updated Successfully')
         //   isSubmitted(false)
         sendNotif("Action Pending","Update your order details!","user"+cardDetails.userID)
         navigation.navigate('VendorDashboard')
          //  route.params.refreshCallback()
        })



       

    }
    const markUserConfirmed = (yesOrno) => {
       
            Axios.post(Config.api_url+'php?'+qs.stringify({
                action: 'confirmScrapUserPickup',
                order_id : cardDetails.orderID,
                pickup_amount_by_user: amount,
                pickup_status_by_user: toString(yesOrno) ,
                pickup_notes_by_user: vnotes
    
            })).then((response) => {
                console.log(yesOrno)
                console.log("Confirm pick Up " + response.data.status)
              //  alert('Pickup marked successfully')
               // isSubmitted(false)
               sendNotif("Update","Order pick-up confirmed by user!","vendor"+cardDetails.vendorID)

                route.params.refreshCallback(0,auth().currentUser);

            })

      

        
      



       

    }

    // const onButton=(type)=>{
    //     if(type != 'cancel' && notes.trim() === ''){
    //         alert('Please enter a reason/some information');
    //         return;
    //     }
    //     else if(type != 'cancel'){
    //         Axios.post(Config.api_url+'php?'+qs.stringify({
    //             action: 'cancelBid',
    //             user_id: actualUser.user_id,
    //             bid_id: item.bid_id,
    //             bid_notes: notes
    //         })).then((response)=>{
    //             console.log(response.data);
    //             alert('Request completed sucessfully');
    //             navigation.goBack();
    //             navigation.goBack();
    //         }
    //         );
    //     }
    //     else if(type === 'cancel')
    //         navigation.goBack();
    //        return //dosomething
    

    // }
    
const MySubscriptionOrder = ({name,pickUpDate,orderAmount,orderDate,imageUrl,status,cart,address}) => {
    const renderCartItems = (cart) => {
  //      console.log("order date"+ orderDate)
        let i,res = [];
        for(i in cart){
            res.push(<Text style={{fontWeight: 'bold',fontSize:11}}>{`${cart[i].homescrap_name}${i==cart.length-1? "" : ", "}`}</Text>)
        }
        return(res)
    }
    const getDate = (date) => {
    //   console.log("dayte"+date)

   let dayte = date.substring(0,11)
    let arr = dayte.split("-");
  //  console.log(arr)
    let months = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return (arr[2].trim() + "-" + months[arr[1].replace(/^0+/, "")] + "-" + arr[0])
       

    }

    

    //const [alignment,setAlign] = useState(0);
  
       
  
    return(<View style={{flexDirection: 'column',width: dimen.width*0.9,borderColor: Colors.seperatorGray,
    borderWidth: 1,borderRadius: 8,alignSelf: 'center',height: dimen.height/3.8,padding:'2%',backgroundColor:'white'}}>
       
    

    <View style={{flexDirection: 'row',justifyContent:'space-between'}}>
        <Text style={styles.greyText1}>{getDate(orderDate)}</Text>
        <View style={{flexDirection:'row'}}>
        <Text style={{...styles.quantity,marginStart: 30,fontSize:13}}>{`Status : `}</Text>

        <Text style={{...styles.quantity,marginStart: 10,color: Colors.blue,fontSize:12}}>{status}</Text>
        </View>

    </View>
    <View style={{flexDirection: 'row',margin: 5,backgroundColor: 'transparent',flex: 1,width: '100%'}}>
        <Image style={{height: dimen.width*0.2,width: dimen.width*0.2,flex: 0,alignSelf: 'center'} }  resizeMethod={'auto'} resizeMode='contain' source={ imageUrl.trim()!=''?{uri: imageUrl}:require('../../assets/notmaleavatar.png')}/>

        <View style={{flex: 0,backgroundColor: 'transparent',marginStart:10}}>
        <Text style={{...Styles.heading,alignSelf: 'center',width: '100%',marginStart:55,backgroundColor: 'transparent',marginBottom: '5%',fontSize:14}}>{name}</Text>
        <ScrollView persistentScrollbar indicatorStyle='white' horizontal
         style={{alignSelf:'flex-start',flexDirection: 'row',margin: '1%',padding: '2%',marginStart: 30,backgroundColor: Colors.whiteBackground,borderRadius: 5,borderColor: Colors.seperatorGray,borderWidth: 0.5}}>
{renderCartItems(cart)}
</ScrollView>

<Text style={{...Styles.subheading,fontWeight: 'normal',marginStart: 30,paddingTop: 10}}>{address}</Text>

        
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
    {tag == 'Vendor' ? <AppBar back funct={()=>{navigation.goBack()}}/> : null}
    <ScrollView style={{backgroundColor: 'white'}}>
        <View style={{...Styles.parentContainer,marginBottom: '20%'}}>
            <Text style={{...Styles.heading,fontSize: 18,textAlign: 'center',alignSelf: 'center',flex: 0,padding: 20}}>{words.vendorHeading}</Text>
    <View>
            <MySubscriptionOrder name={cardDetails.name} pickUpDate={cardDetails.pickUpDate} orderAmount={cardDetails.orderAmount} orderDate={cardDetails.orderDate} imageUrl={cardDetails.image} status={cardDetails.status} cart={cardDetails.cart} address={cardDetails.address}/>

           

            </View> 
            {/* <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
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
            </View>} */}

            <View style={{flexDirection :'row',justifyContent: 'space-around',marginTop: '5%'}}>
                <TouchableOpacity  onPress={() => setShow(true)} style ={{backgroundColor:Colors.primary,padding:'3%',borderRadius: 8}}>
                    <Text style={{color: 'white'}}>Mark complete</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => tag == 'Vendor' ? markPickUpComplete('no') : markUserConfirmed('no')} style ={{backgroundColor:Colors.red,padding:'3%',borderRadius: 8}}>
                    <Text style={{color :'white'}}>Mark incomplete</Text>
                </TouchableOpacity>
            </View>


            {show ? <View>
            <Text style={{marginTop: dimen.height/30,alignSelf: 'center',fontSize : 12,marginHorizontal: dimen.width*0.05,flex: 0,fontWeight: 'bold',color: 'black',alignItems:'center'}}>{(tag == 'Vendor' ? words.amountPaid : words.amountPaidByVendor)} </Text>

            <TextInput 
            placeholder= {`Enter amount`}
                onChangeText={text => setAmount(text)}
                value={amount}
               
                keyboardType= 'numeric'
              
               
                numberOfLines={1}
            style={{fontSize: 15,color: 'black',padding: 15,margin: 15,flex: 0,borderColor: Colors.seperatorGray,borderWidth: 1,borderRadius: 5,maxHeight: dimen.height/3}} />
            <Text style={{marginTop: dimen.height/30,alignSelf: 'center',fontSize : 12,marginHorizontal: dimen.width*0.05,flex: 0,fontWeight: 'bold',color: 'black',alignItems:'center'}}>Please leave any additional notes or feedback here</Text>
            <TextInput 
            placeholder= {`Feedback or additional information`}
                onChangeText={notes => setVNotes(notes)}
                textAlignVertical={'top'}
                value={vnotes}
               multiline={true}
               line
                numberOfLines={10}
            style={{fontSize: 15,color: 'black',padding: 15,margin: 15,flex: 0,borderColor: Colors.seperatorGray,borderWidth: 1,borderRadius: 5,maxHeight: dimen.height/3}} />
            <View>
             <SubmitButton styling={submitted ? true : false} onTouch={() =>{
                if(amount == null || amount == undefined || amount == '')
                alert('Please enter a valid amount');
                else{

                    isSubmitted(true);
                    {tag == 'Vendor' ?  markPickUpComplete('yes') : markUserConfirmed(true)}

                }
                } } text={words.submit} />
                </View>
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