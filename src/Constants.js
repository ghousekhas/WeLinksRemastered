import {StyleSheet, Dimensions} from 'react-native';
export const Constants={
    Logged: 'Logged',
    
}
export const Styles=StyleSheet.create({
    parentContainer:{
        ...StyleSheet.absoluteFill,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    fortyUpperPanel:{
        width: '100%',
        height: '30%',
        borderWidth: 2,
        borderColor: 'black'

    },
    horizontal:{
        flexDirection: 'row',
        width: '100%',
        height: '50%',
        alignContent: 'center',
        borderWidth: 2,
        borderColor: 'black'
    },
    vendorImage:{
       flex:1,
       height: '100%',
       borderWidth: 2,
        borderColor: 'black',
    },
    vendorInfo:{
        flex: 3,
        height: '100%',
        borderWidth: 2,
        borderColor: 'black'
    },
    halfFlatList:{
        height: '100%',
        width: '100%',
        padding: 10,
        borderWidth: 2,
        borderColor: 'black'
    },
    horizontalImage:{
        marginTop: 15,
        height: Dimensions.get('window').height*0.15-30,
        width: Dimensions.get('window').height*0.15-30,
        borderWidth: 2,
        borderColor: 'black'
    },
    sixtyLowerPanel:{
        height: '70%',
        borderWidth: 2,
        borderColor: 'black',
    },
    accordion:{
        width: '100%',
        height: Dimensions.get('window').height*0.6-20,
        borderWidth: 5,
        borderColor: 'black',
    },
    collapsedView:{
        height: Dimensions.get('window').height/9-20,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'black',
        flexDirection: 'row',
        padding: 30,
        alignItems: 'center'
    },
    collapsibleView:{
        height: Dimensions.get('window').height*0.70,
        width: '100%'
    }
    ,
    productList:{
        height: Dimensions.get('window').height*0.75-30,
        width: '100%',
        borderWidth: 2,
        borderColor: 'black'

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
    }




});