import {StyleSheet, Dimensions} from 'react-native';

export const dimen={
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
}

export const Colors = {
    primary: '#00C99D'
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
   
  
    parentContainer:{
        ...StyleSheet.absoluteFill,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: 'white'
    },
    fortyUpperPanel:{
        width: '100%',
        height: '40%',
         
           

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
        height: Dimensions.get('window').height*0.65,
        width: '100%'
    }
    ,
    productList:{
        height: Dimensions.get('window').height*0.75-30,
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
    }




});