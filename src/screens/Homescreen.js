import * as React from 'react';
import {StyleSheet,Text,View,TextInput, Dimensions,Image,StatusBar} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Constants,Styles} from '../Constants';


export default class Homescreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username: 'Roco',
            city: 'City',
            title: 'What are you looking for?',
            desc: 'Select services and checkout easily',
            milk: 'Milk Delivery',
            news: 'NewsPaper Delivery',
            scrap: 'Scrap Collection',
            address: 'Tap here to add an address'
        };
        this.images={
            milk: require('./../../assets/milk.png'),
            news: require('./../../assets/newspaper.png'),
            scrap: require('./../../assets/scrap.png'),
            banner: require('./../../assets/homebanner.png'),
        }

    }
    
    render(){
        const {navigation} =this.props;
        return(
            <View style={styles.fullscreen}>
                <View style={styles.topbar}>
                    <View style={styles.usernamecontainer}>
                        <Image style={styles.userimage}/>
                        <View style={styles.usernandd}>
                            <Text style={styles.username}>{this.state.username}</Text>
                            <Text style={styles.userdes}>{this.state.userdes}</Text>
                        </View>
                    </View>
                    <View>
                        <Image styles={styles.locationimage}/>
                        <Text style={styles.city}>{this.state.city}</Text>
                    </View>
                </View>
                <Image style={styles.banner} source={this.images.banner}/>
                <Text style={styles.title}>{this.state.title}</Text>
                <Text style={styles.desc}>{this.state.desc}</Text>
                <View style={styles.horizontalview}>
                    <TouchableOpacity style={styles.menuitem} onPress={()=>{
                        this.props.navigation.navigate('MilkVendors')}
                }>
                        <Image style={styles.menuimage} source={this.images.milk} />
                        <Text style={styles.menutext}>{this.state.milk}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuitem} 
                    onPress={()=>{this.props.navigation.navigate('PaperVendors')}}>
                        <Image style={styles.menuimage} source={this.images.news}/>
                        <Text style={styles.menutext}>{this.state.news}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuitem} onPress={()=>{
                        this.props.navigation.navigate('VendorsList',{
                            department: 'scrap'
                        })
                    }}>
                        <Image style={styles.menuimage} source={this.images.scrap} />
                        <Text style={styles.menutext}>{this.state.scrap}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.deliveringcontainer}>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate('AddressSearch');
                }} >
                    <Text style={styles.deliveringTitle}>Delivering to:</Text>
                    <Text style={styles.address}>{this.state.address}</Text>
                </TouchableOpacity>
                </View>
            </View>

        );
    }
}
const styles= StyleSheet.create({
    deliveringcontainer:{
        height: 60,
        width: '100%',
        position: 'absolute',
        justifyContent: 'flex-start',
        backgroundColor: '#FFFFFF',
        bottom: 0,
        zIndex: 100,
        elevation: 100
    },
    deliveringTitle:{
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        fontSize: 12,
        fontWeight: '500',
        color: 'gray'
    },
    address:{
        fontWeight: '700',
        marginLeft: 10,
        marginBottom: 3,
        marginRight: 3,
        fontSize: 15,


    },
    fullscreen:{
        ...StyleSheet.absoluteFill,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    topbar:{
        justifyContent: 'space-between',
        height: '8%',
        width: '100%',
        padding: 20,
        marginBottom: '7%',
        alignContent: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
                width: 0,
                height: 4,
            },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,

            elevation: 6,
    },
    usernamecontainer:{
        flexWrap: 'wrap',
        alignSelf: 'center'
        
        
    },
    username:{
        fontWeight: 'bold',
        fontSize: 15,
    },
    userdes:{
        fontSize: 11,
        alignSelf: 'center'

    },
    userimage:{
        height: 20,
        width: 20,
        alignSelf: 'center'
    },
    locationimage:{
        height: 20,
        width: 20,
        alignSelf: 'center'
    },
    city:{
        fontWeight: '600',
        fontSize: 13,
        color: 'black'
    },
    banner:{
        width: Dimensions.get('window').width-30,
        alignSelf: 'center',
        borderRadius: 12
    },
    title:{
        fontSize: 17,
        fontWeight: 'bold',
        marginLeft: 20,
        marginTop: 30,
        alignSelf: 'flex-start',
        
    },
    desc:{
        fontSize: 14,
        color: 'gray',
        marginTop: 3,
        marginLeft: 20,
        alignSelf: 'flex-start',
    },
    horizontalview:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flex: 1,
    }, 
    menuitem:{
        height: Dimensions.get('window').width/3,
        width: Dimensions.get('window').width/3-25,
        margin: 10,
        flexDirection: 'column',
        
        
        backgroundColor: 'rgba(255,255,255,255)',
        padding: 10,
        borderRadius: 5

    },
    menuimage:{
        height: '70%',
        width: '70%',
        alignSelf: 'center'
    },
    menutext:{
        fontWeight: 'bold',
        fontSize: 12,
        textAlign: 'center'
    }
});