import {StyleSheet, Dimensions} from 'react-native';

export const dimen={
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
}

export const Colors = {
    primary: '#00C99D',
    secondary: '#EDF9F9',
    seperatorGray: 'rgba(211,211,211,255)',
    lightIcon: '#D3D3D3',
    disabledButton: '#BBC0C4'
}

export const Constants={
    Logged: 'Logged',
    firstLogin: 'FIRST_LOGIN',
    username: 'USERNAME',
    city: 'CITY',
    selectedAddress: 'selectedAddress',
    shareMessage: 'Hey! Check out weLinks, one stop destination for your daily needs https://www.google.com get my referral maybe? Update us with the referral',
    veFirstTime: 'firstTime',
    veInProgress: 'inProgress',
    veRejected: 'rejected',
    veTryAgain: 'tryAgain',
    verified: 'verified'

    
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
    subheading:{
        fontSize: 14,
        color: 'gray'
    },
    subbold:{
        fontSize: 14,
        color: 'black',
        fontFamily: 'bold'
    },
    grayfullline:{
        height: 0.5,
        width: '95%',
        borderWidth: 0.025,
        borderColor: Colors.seperatorGray,
     //   color: Colors.seperatorGray,
        marginVertical: 5,
        alignSelf: 'center',
        zIndex: 100,
        elevation: 0.2
    },
    selectionButton:{
        
    },
   
  
    parentContainer:{
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        marginTop: Dimensions.get('window').height/14


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
        height: Dimensions.get('window').height/14,
        bottom: 15,
        position: 'absolute',
        alignSelf: 'center',
        backgroundColor: Colors.primary,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: Colors.seperatorGray,
        elevation: 1

    },
    horizontalCalendarButtonsRow:{
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-evenly',
        marginVertical: '5%',
        alignItems: 'center'
    },
    horizontalRow:{
        justifyContent: 'space-between',
        padding: 5,
        margin: 5,
        width: '90%',
        alignSelf: 'center',
        flexDirection: 'row'
    },
    horizontalCalendarRow:{
        fontSize: 14,
        marginLeft: 20,
        marginTop: 20,
        alignSelf: 'flex-start',
        color: 'gray'
    },
    dayButton:{
        width: dimen.width/8,
        height: dimen.width/8,
        alignItems: 'center',
        borderRadius: 100,
        justifyContent: 'center',
    },
    scrapWeekView:{
        width: '100%',
        flexDirection: 'row',
        padding: '2%',
        justifyContent: 'space-evenly'
    },
    scrapTopCart:{
        height: '40%',
        width: '100%',
        paddingVertical: '5%'
    },
    scrapBottom:{
        height: '60%',
        width: '100%',
        backgroundColor: Colors.secondary
    }





});

export const ScrapStyles=StyleSheet.create({
    heading:{
        ...Styles.heading,
        alignSelf: 'center',
        color: Colors.primary

    },
    subheading:{
        ...Styles.subheading,
        alignSelf: 'center'
    },
    timebutton:{
        borderWidth: 1,
        borderRadius: 5,
        padding: '3%',
        alignSelf: 'center'
    }
});