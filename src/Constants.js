import {StyleSheet, Dimensions} from 'react-native';

export const dimen={
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
}

export const Colors = {
    primary: '#00C99D',
    secondary: '#EDF9F9',
    seperatorGray: 'rgba(211,211,211,255)'
}

export const Constants={
    Logged: 'Logged',
    firstLogin: 'FIRST_LOGIN',
    username: 'USERNAME',
    city: 'CITY',
    selectedAddress: 'selectedAddress',
    shareMessage: 'Hey! Check out weLinks, one stop destination for your daily needs https://www.google.com get my referral maybe? Update us with the referral'

    
}
export const Styles=StyleSheet.create({

    //Common Styles
    heading:{
        fontSize: 17,
        fontWeight: 'bold',
        marginLeft: 20,
        marginTop: 20,
        alignSelf: 'flex-start',
        color: 'black'
        
    },
    grayfullline:{
        height: 1,
        width: '95%',
        backgroundColor: Colors.seperatorGray,
        marginVertical: 5,
        alignSelf: 'center'
    },
   
  
    parentContainer:{
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: 'white'

    },
    fortyUpperPanel:{
        width: '100%',
        height: '40%',
        backgroundColor: Colors.secondary,
         
        
    },
    horizontal:{
        flexDirection: 'row',
        width: '100%',
        height: '50%',
        alignContent: 'center',
         
           
    },
    vendorImage:{
       flex:1,
       height: '100%',
        
          
    },
    vendorInfo:{
        flex: 3,
        height: '100%',
         
           
    },
    halfFlatList:{
        height: '40%',
        width: '100%',
        padding: 10,
         
           
    },
    horizontalImage:{
        marginTop: 5,
        height: Dimensions.get('window').height*0.13-30,
        width: Dimensions.get('window').height*0.13-30,
        marginHorizontal: 10
         
           
    },
    sixtyLowerPanel:{
        height: '70%',
         
          
    },
    accordion:{
        width: '100%',
        height: Dimensions.get('window').height*0.6-20,
       // borderWidth: 5,
          
    },
    collapsedView:{
        height: Dimensions.get('window').height/9-20,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
         
          
        flexDirection: 'row',
        padding: 30,
        alignItems: 'center'
    },
    collapsibleView:{
        height: Dimensions.get('window').height*0.45,
        width: '100%'
    }
    ,
    productList:{
        height: Dimensions.get('window').height*0.45,//nominal value was 65 -30
        width: '100%',
         
           

    },
    header:{
        backgroundColor: '#F5FCFF',
         padding: 10,
         flexDirection: 'row',
         justifyContent: 'space-between'
    },
    vendorFlat:{
        width: Dimensions.get('window').width,
    },
    submitButton:{
        position: 'absolute',
        flex: 1,
        bottom: 20,
        left: 10,
        right: 10,
        width: Dimensions.get('window').width-20,
        borderRadius: 10,
        height: Dimensions.get('window').height/12,
        minHeight: 40,
    },
    collapsedText:{
        fontSize: 17,
        fontWeight: 'bold',
        color: 'black'
    },
    touchableButtonBorder:{
        borderWidth: 1,
        borderColor: Colors.primary,
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 5
    },

    //Scrapcart.js mainly
    submitButtonBottom:{
        width: '90%',
        height: Dimensions.get('window').height/12,
        bottom: 15,
        position: 'absolute',
        alignSelf: 'center',
        backgroundColor: Colors.primary,
        borderRadius: 10

    },
    horizontalCalendarButtonsRow:{
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        padding: 30
    },
    horizontalRow:{
        justifyContent: 'space-between',
        padding: 10,
        margin: 10,
        flexDirection: 'row'
    }




});