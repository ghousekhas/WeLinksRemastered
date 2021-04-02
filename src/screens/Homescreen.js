import React, {useEffect, useState} from 'react';
import {StyleSheet,Text,View,TextInput, Dimensions,Image,FlatList,ScrollView} from 'react-native';

import { TouchableOpacity  } from 'react-native-gesture-handler';
import {CommonActions,useNavigation} from '@react-navigation/native';

import {Constants,dimen,Styles,Colors} from '../Constants';
import Axios from 'axios';
import { BackHandler } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

import { EvilIcons } from '@expo/vector-icons';
import {Config} from  '../Constants';
import sendNotif from '../Utility/sendNotificationTo';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import RatingComponentScreen from '../components/RatingComponentScreen';
import { MaterialIcons } from '@expo/vector-icons';
import qs from 'qs';
import ymdToApp, {getDuration} from '../Utility/dateConvertor';
import { useAuth } from '../services/auth-service';



//sendNotif('titleeee','boddy','user87');
//sendNotif('titleeee','boddy','vendor90');



var promoImageData = ['https://phlearn.com/wp-content/uploads/2019/03/fixed-ratio.png','https://phlearn.com/wp-content/uploads/2019/03/fixed-ratio.png',
'https://phlearn.com/wp-content/uploads/2019/03/fixed-ratio.png'];

export default class Homescreen extends React.Component{
    constructor(props){
        super(props);
        this.NAME = 'Albus Percival Wulfric Brian Dumbledore'
        this.state={
        
            firstLogin: false,
            username: 'William Darcy',
            city: 'Bengaluru',
            title: 'What are you looking for?',
            desc: 'Select services and checkout easily',
            milk: 'Milk Delivery',
            news: 'Newspaper Delivery',
            scrap: 'Corporate Scrap',
            corporate: 'Home Scrap',
            address: 'Tap here to add an address',
            actualUser: this.props.route.params.actualUser,
            pressedMenu: false,
            drawer: this.props.route.params.drawer,
            imageHeight : 0,
            fall: new Animated.Value(1),
            sheetOpen : false,
            newsPendingRatings: [],
            milkPendingRatings: [],
            corpPendingRatings: [],
            ratingOrderDetails: {},
            ratingOrderMeta: {},
            milkRatingOpen: false,
            ratingTypeOpen: 'news',
            remountRating: Math.random(0.2).toString(),
            heightS : dimen.height/1.1

        };
        this.images={
            milk: require('./../../assets/milk.png'),
            news: require('./../../assets/newspaper.png'),
            scrap: require('./../../assets/scrap.png'),
            banner: require('./../../assets/homebanner.png'),
        }
        this.bs=React.createRef();
        this.temp=0;
        this.sheetHeight=dimen.height;

    }


r
    checkIfFirstLogin= async ()=>{
      //  console.log('someeeeeething');
        const jsondata=  await AsyncStorage.getItem('firstLogin');
        const firstLogin= await JSON.parse(jsondata);
        if(firstLogin == null){
         //   console.log('meh',firstLogin);
            navigation.navigate('About')
          this.props.navigation.navigate('About',{firstLogin: true});
          this.setState({firstLogin: true})
        }
        else{
            this.setState({firstLogin: false})
        }
        
      }
    

    
     retrieveUserData= async ()=>{
        const user= this.props.route.params.user; //auth().currentUser;//this.props.route.params.user;
        
        Axios.get(Config.api_url+'php?action=getUser&phone='+user.phoneNumber.substring(3))
            .then((response)=>{
              try{
                console.log(response.data.user[0]);
                this.setState({actualUser: response.data.user[0]})

              }
              catch(error){
                console.log('theerror',error);
                
              }
            },(error)=>{
                console.log('error');
             
            });
      }
    
    retrievePendingRatings = async () => {
       
        try{
            const defUrl = Config.api_url+'php?action=getPendingRating&'+qs.stringify({
                user_id: this.state.actualUser.user_id})+'&product_type=';
            
            console.log('user_id', this.state.actualUser.user_id);
            const milk_pending = await Axios.get(defUrl+'milk');
            console.log('milkpending', milk_pending.data);
            this.setState({milkPendingRatings: milk_pending.data});
            const news_pending = await Axios.get(defUrl+'newspaper');
            console.log('news_pending', news_pending.data);
            this.setState({newsPendingRatings: news_pending.data});
            const corp_pending = await Axios.get(defUrl+'corporate_scrap');
            console.log('corps',corp_pending);
            this.setState({corpPendingRatings: corp_pending.data});

        }
        catch(error){
            console.log('pendingrating error', error);
        }

    }


    componentDidMount(){
        const {navigation}= this.props;
        //this.checkIfFirstLogin();
        // this.retrieveUserData(10);
        this.retrievePendingRatings();
        //this.setState({actualUser: this.props.actualUser});
    //     this.focusListener= navigation.addListener('focus',()=>{
    //         //this.checkIfFirstLogin();
    //         this.retrieveUserData(10);
    //         //this.retrievePendingRatings();
    //    });

        BackHandler.addEventListener('hardwareBackPress',this.onBackPress);
    }

    onBackPress=()=>{
     //   this.props.navigation.navigate('Homescreen');
     //   return true;
     
    //  this.props.navigation.reset();
    try{
        //this.props.navigation.popToTop();
       BackHandler.exitApp();
      // sendNotif('Hey','Closing','user165')

       console.log('Exiting');

    }
    catch(e){
    //    sendNotif('Hey','Check','user165')

    console.log('caught');
    };
       
      }
  
      componentWillUnmount(){
      //  this.props.navigation.popToTop();
        BackHandler.removeEventListener('hardwareBackPress',this.onBackPress);
       // this.props.navigation.popToTop();
      }
  
    
    promoImagesRender = ({item}) =>{
        return(
    

                <Image source={{uri: item.toString()}} style = {styles.imageBanner}/>
     
        );
    }

    renderContent = () => {
        return(<View key={this.state.remountRating}>
                <View
                        style={{backgroundColor: Colors.lightBlue,paddingBottom: 100}}
                        >

                        <View style={{backgroundColor:'white', alignItems:'flex-end',padding:'1%'}}>
                        <MaterialIcons name="keyboard-arrow-down" size={25} color="black" 
                        onPress={() => {
                            this.setState({sheetOpen:false})
                            this.bs.current.snapTo(2);

                        }}
                        />

              </View>
 
                        <View>
           <RatingComponentScreen buttonPress={(stars, comments)=>{
               console.log('posting review');
               if(this.state.ratingTypeOpen === 'corp')
                    Axios.post(Config.api_url+'php?'+qs.stringify({
                        action: 'postRating',
                        user_id: this.state.actualUser.user_id,
                        vendor_id: this.state.ratingOrderMeta.awarded_vendor.length > 0 ? this.state.ratingOrderMeta.awarded_vendor[0].vendor_id : 0 ,
                        product_type: 'corporate_scrap',
                        rating: stars,
                        feedback: comments,
                        order_id: this.state.ratingOrderMeta.bid_id
                    })).then((response)=>{
                        const data = response.data;
                        console.log("Rated "+data);
                        const tempCorp = this.state.corpPendingRatings;
                        tempCorp.splice(0,1);
                        if(tempCorp.length > 0){
                            const news = tempCorp;
                            this.setState({ratingTypeOpen: 'corp'});

                            this.setState({remountRating: Math.random(0.4).toString()});
                            console.log(news);
                            this.setState({ratingOrderMeta: news[0]});
                            this.setState({ratingOrderDetails : {
                                Date: ymdToApp(news[0].bid_pickupdate),
                                Duration: getDuration(news[0].bid_startdate, news[0].bid_enddate)+ ' Day/s',
                                Title: news[0].bid_title,
                                Product: news[0].officescrap_category_name,
                                Vendor: news[0].company_name
                            }}).catch((e) => {
                                console.log("Error: "+e)
                            })

                        }
                        else{
                            // this.props.route.params.goToMySubs();
                            this.bs.current.snapTo(2);
                            this.props.navigation.navigate('Bids',{
                                next: 'Bids',
                                user: this.props.route.params.user,
                                actualUser: this.state.actualUser,
                              
                                profile: true,
                                ...this.props.route.params
                            });
                        }

                    });
               else 
                Axios.post(Config.api_url+'php?'+qs.stringify({
                    action: 'postRating',
                    user_id: this.state.actualUser.user_id,
                    vendor_id: this.state.ratingOrderMeta.vendor_id,
                    product_type: this.state.ratingOrderMeta.product_type,
                    rating: stars,
                    feedback: comments,
                    order_id: this.state.ratingOrderMeta.order_id
                }),{}).then((response)=>{
                    console.log(response.data);
                    
                    if(!this.state.milkRatingOpen){
                            const tempNews = this.state.newsPendingRatings;
                            tempNews.splice(0,1);
                            this.setState({newsPendingRatings: tempNews});
                            

                            if(this.state.newsPendingRatings.length == 0){
                                this.setState({sheetOpen: false});
                                this.bs.current.snapTo(2);
                                this.props.navigation.navigate('AddressList',{
                                    next: 'PaperVendors',
                                    user: this.props.route.params.user,
                                    actualUser: this.state.actualUser,
                                    tag: 'Paper',
                                    profile: true
                                });
                            }
                            else{
                                const milk = tempNews;
                                this.setState({sheetOpen: false});
                                this.bs.current.snapTo(2);
                                this.setState({ratingOrderDetails : {
                                    Date: ymdToApp(milk[0].order_date),
                                    Duration: getDuration(milk[0].subscription_start_date, milk[0].subscription_end_date)+ ' Day/s',
                                    Product: milk[0].product_name,
                                    Quantitiy: milk[0].quantity,
                                    Vendor: milk[0].company_name
                                }});
                                this.setState({remountRating: Math.random(0.4).toString()});
                            }
                        }
                        else{
                            const tempMilk = this.state.milkPendingRatings;
                            tempMilk.splice(0,1);
                            this.setState({milkPendingRatings: tempMilk});

                            if(this.state.milkPendingRatings.length >0 ){
                                const milk = tempMilk;
                                this.setState({ratingOrderDetails : {
                                    Date: ymdToApp(milk[0].order_date),
                                    Duration: getDuration(milk[0].subscription_start_date, milk[0].subscription_end_date)+ ' Day/s',
                                    Product: milk[0].product_name,
                                    Quantitiy: milk[0].quantity,
                                    Vendor: milk[0].company_name
                                }});
                            }
                            else{
                                this.setState({sheetOpen: false});
                                this.bs.current.snapTo(2);
                                // this.props.route.params.goToMySubs();
                                this.props.navigation.navigate('AddressList',{
                                    next: 'MilkVendors',
                                    user: this.props.route.params.user,
                                    actualUser: this.state.actualUser,
                                    tag: 'Milk',
                                    profile: true,
                                    ...this.props.route.params
                                });
                                this.setState({remountRating: Math.random(0.4).toString()});

                            }
                            
                        }
                    //this.setState({newsPendingRatings: []});
                    //this.retrievePendingRatings();
                })
           }} order_details={this.state.ratingOrderDetails} />
           </View>
          </View>
        </View>
       )

    }

    renderHeader = () => (
        <View style={styles.header}>
                        <View style={styles.panelHandle} />

            <View style={styles.panelHeader}>
            </View>
        </View>
    );
   

    

    render(){
        const {navigation} =this.props;
        const {user} = this.props.route.params;

        let displayName = this.state.actualUser.name.split(' ');

    
        
        return(
            <View style={styles.fullscreen}>
               <View style={styles.topbar}>

             

              
               <TouchableOpacity onPress={() => {
                   this.setState({pressedMenu: true});
                  navigation.toggleDrawer();
                  }}>
    <EvilIcons name="navicon" size={24} color="black" style={{alignSelf: 'center',padding: 10}} />
    </TouchableOpacity>
    <View style={styles.topBarAlignChips}>
    <ProfileSmallView actualUser={this.state.actualUser} drawer={this.state.drawer}/>
    <TouchableOpacity  style={{...styles.usernamecontainer1}} onPress={()=>{this.props.navigation.navigate('City',{
        edit: true,
        tag : 'home',
        refreshUser: this.retrieveUserData,
        user_id: this.state.actualUser.user_id,
        actualUser: this.state.actualUser
    })}}>
        <Image style={styles.locim} source={require('../../assets/pin.png')}/>
        <Text adjustsFontSizeToFit style={styles.username}>{this.state.actualUser.city}</Text>
    </TouchableOpacity>
    </View>
              
               </View>
               <BottomSheet 
               enabledContentTapInteraction={true}
                ref={this.bs}
                onCloseStart={() => {
                    this.setState({sheetOpen: false});
                }}
                snapPoints={[dimen.height*0.85, 0, 0]}
                renderContent={this.renderContent}
             //   renderHeader={this.renderHeader}
                initialSnap={2}
                callbackNode={this.state.fall}
                enabledGestureInteraction={false}
              //  enabledContentGestureInteraction={true}
            //  enabledHeaderGestureInteraction={true}
               />
               <Animated.View 
               onPress={() => {
                   console.log('Tapped')
                   this.bs.current.snapTo(2);
               }}
               style={{...styles.banner,opacity: !this.state.sheetOpen ? 1.0 : Animated.add(0.1, Animated.multiply(this.fall, 1.0)),
}}>     

              
                <FlatList 
                        data = {promoImageData}
                        keyExtractor = {(item,index) => index.toString()}
                        renderItem = {this.promoImagesRender}
                        horizontal = {true}
                        snapToAlignment = {'start'}
                        snapToInterval ={styles.imageBanner.width}
                        />
                 
                </Animated.View>
                <Text style={styles.title}>{this.state.title}</Text>
                <Text style={styles.desc}>{this.state.desc}</Text>
              
                <View style={styles.horizontalview}>
              
                <ScrollView style={{flex: 1}}>
                <View style={styles.view1}>

               

                    <TouchableOpacity onLayout={(event) => {
                                this.setState({imageHeight : event.nativeEvent.layout.height/2})
                    }} style={styles.menuitem} onPress={()=>{
                        console.log('actualuser',this.state.actualUser);
                        //sendNotif('titleeee','boddy','user87');
                        this.setState({ratingTypeOpen: 'milk'});

                        const milk = this.state.milkPendingRatings;
                        if(milk.length > 0){
                            this.setState({remountRating: Math.random(0.4).toString()});
                            console.log("SOme milk thing "+milk);
                            this.setState({ratingOrderMeta: milk[0]});
                            this.setState({ratingOrderDetails : {
                                Date: ymdToApp(milk[0].order_date),
                                Duration: getDuration(milk[0].subscription_start_date, milk[0].subscription_end_date)+ ' Day/s',
                                Product: milk[0].product_name,
                                Quantitiy: milk[0].quantity,
                                Vendor: milk[0].company_name
                            }});
                            this.setState({milkRatingOpen: true})

                            this.setState({sheetOpen: true});
                            this.bs.current.snapTo(0);
                        }
                        else{
                            // this.setState({sheetOpen: false});
                            this.bs.current.snapTo(2);
                            // this.props.route.params.goToMySubs();
                            this.props.navigation.navigate('AddressList',{
                                next: 'MilkVendors',
                                user: user,
                                actualUser: this.state.actualUser,
                                tag: 'Milk',
                                profile: true,
                                ...this.props.route.params
                            });

                        }
                        // if(false){
                        //     this.props.navigation.navigate('RatingsPage',{
                        //         pendingList: [1,2,3,4],
                        //         next: 'MilkVendors',
                        //         user: user,
                        //         actualUser: this.state.actualUser,
                        //         tag: 'Milk',
                        //         profile: true
                        //     })
                        // }
                        // else
                        //     this.props.navigation.navigate('AddressList',{
                        //         next: 'MilkVendors',
                        //         user: user,
                        //         actualUser: this.state.actualUser,
                        //         tag: 'Milk',
                        //         profile: true
                        //     });
                    }
                        //this.props.navigation.navigate('MilkVendors')}
                }>
                        <Image style={{...styles.menuimage,height: this.state.imageHeight}} source={this.images.milk} />
                        <Text style={{...styles.menutext,marginTop: this.state.imageHeight*2/20}}>{this.state.milk}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuitem} 
                    onPress={()=>{
                     //   sendNotif('Hey','Paper','user165')
                        this.setState({ratingTypeOpen: 'newspaper'});

                        const news = this.state.newsPendingRatings;
                        if(news.length > 0){
                            this.setState({remountRating: Math.random(0.4).toString()});
                            console.log("Some news "+news);
                            this.setState({ratingOrderMeta: news[0]});
                            this.setState({ratingOrderDetails : {
                                Date: ymdToApp(news[0].order_date),
                                Duration: getDuration(news[0].subscription_start_date, news[0].subscription_end_date)+ ' Day/s',
                                Product: news[0].product_name,
                                Quantitiy: news[0].quantity,
                                Vendor: news[0].company_name
                            }});

                            this.setState({sheetOpen: true});
                            this.bs.current.snapTo(0);
                        }
                        else{
                            this.props.navigation.navigate('AddressList',{
                                next: 'PaperVendors',
                                user: user,
                                actualUser: this.state.actualUser,
                                tag: 'Paper',
                                profile: true,
                                ...this.props.route.params
                            });

                        }


                    //  console.log('Touvh')
                    //     this.setState({sheetOpen:true})
                    //     this.bs.current?.snapTo(0);

                    //     console.log('Touvh1')


                    
                    }}>
                        <Image style={{...styles.menuimage,height: this.state.imageHeight}} source={this.images.news}/>
                        <Text style={{...styles.menutext,marginTop: this.state.imageHeight*2/20}}>{this.state.news}</Text>
                    </TouchableOpacity>
                    </View>

                    <View style={styles.view1}>
                    
                    <TouchableOpacity style={styles.menuitem} 
                    onPress={()=>{

                        this.props.navigation.navigate('AddressList',{
                            next: 'ScrapVendors',            
                            user: user,
                            actualUser: this.state.actualUser,
                            tag: 'Milk',
                            profile: true,
                            ...this.props.route.params
                        });
                        // this.props.navigation.navigate('VendorsList',{
                        //     department: 'scrap'
                        // })
                    }}>
                        <Image style={{...styles.menuimage,height: this.state.imageHeight}} source={this.images.scrap} />
                        <Text style={{...styles.menutext,marginTop: this.state.imageHeight*2/20}}>{this.state.corporate}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuitem} 
                    onPress={()=>{
                        const news = this.state.corpPendingRatings;
                        console.log('here')
                        if(this.state.corpPendingRatings.length > 0){

                            this.setState({ratingTypeOpen: 'corp'});

                            this.setState({remountRating: Math.random(0.4).toString()});
                            console.log(news);
                            this.setState({ratingOrderMeta: news[0]});
                            this.setState({ratingOrderDetails : {
                                Date: ymdToApp(news[0].bid_pickupdate),
                                Duration: getDuration(news[0].bid_startdate, news[0].bid_enddate)+ ' Day/s',
                                Title: news[0].bid_title,
                                Product: news[0].officescrap_category_name,
                                Vendor: news[0].company_name
                            }});

                            this.setState({sheetOpen: true});
                            this.bs.current.snapTo(0);

                        }
                        else{
                            console.log('Going')
                            this.props.navigation.navigate('Bids',{
                                department: 'corporateScrap',
                                actualUser: this.state.actualUser,
                                ...this.props.route.params
                            })
                        }

                       
                        // this.props.navigation.navigate('VendorsList',{
                        //     department: 'scrap'
                        // })
                    }}>
                        <Image style={{...styles.menuimage,height: this.state.imageHeight}} source={this.images.scrap} />
                        <Text style={{...styles.menutext,marginTop: this.state.imageHeight*2/20}}>{this.state.scrap}</Text>
                    </TouchableOpacity>
                    </View>
              
                </ScrollView>
                </View>
                
            </View>

        );
    }
}

const ProfileSmallView = ({actualUser,drawer})=>{
    const navigation=useNavigation();
    const [displayName,setDisplayName]= useState('loading');
    const authContext = useAuth();
    const user = authContext.user;
    // useEffect(()=>{
    //    //s
    //    Axios.get(Config.api_url+'php?action=getUser&phone='+user.phone,).
    //    then(({data})=>{
    //        if(data.user[0]!=undefined)
    //            setUser(data.user[0]);
    //        else
    //            console.log('User does not exitst',data);
    //    },
    //    (error)=>console.log('Error logged in profile',error))
    //     if(actualUser.name!=null && actualUser.name != '')
    //         setDisplayName(actualUser.name.split(' ')[0]);
    // },[actualUser]);
    return (
        <TouchableOpacity style = {styles.usernamecontainer1} onPress={()=>{drawer.navigate('ProfileStack')}}>
        <Image style={styles.userimage} source={ user.img_url.trim()  != ''? {uri: user.img_url}: require('../../assets/notmaleavatar.png')  }/>
        <Text adjustsFontSizeToFit style={styles.username}>{user.name}</Text>
    </TouchableOpacity>
    )
}



const styles= StyleSheet.create({
    deliveringcontainer:{
        height: '0%',
        width: '100%',
        position: 'absolute',
        justifyContent: 'flex-start',
        backgroundColor: '#FFFFFF',
        bottom: 0,
        zIndex: 100,
        elevation: 100,

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
        color: 'black'
    },
    address:{
        fontWeight: '700',
        marginLeft: 10,
        marginBottom: 3,
        marginRight: 3,
        fontSize: 15,


    },
    fullscreen:{
        
        flexDirection: 'column',
        justifyContent: 'flex-start',
        flex: 1,
        backgroundColor: 'white'
    },
    topbar:{
       flexDirection: 'row',
     alignItems: 'center',
        height: '7%',
        width: '100%',
        marginBottom: '5%',
        alignContent: 'center',
        backgroundColor: '#f9f9f9',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
                width: 0,
                height: 2,
            },
        shadowOpacity: 0.37,
        shadowRadius: 6.49,
        elevation: 3,
       
    },

    usernamecontainer:{
        alignSelf: 'center',
        width: dimen.width/3,
        flexDirection: 'row',
        alignContent: 'center' ,
        borderRadius: 100,
        borderWidth: 0.525,
        borderColor: 'rgba(211,211,211,255)',
        padding: 10,
        justifyContent: 'center',
        marginLeft: Dimensions.get('window').width*0.005,
        marginRight: Dimensions.get('window').width*0.02,
    },

    usernamecontainer1 : {
        flexDirection: 'row',
        borderRadius: 100,
        borderWidth: 0.525,
        borderColor: 'rgba(211,211,211,255)',
        padding: '3%',
        paddingVertical: '0.5%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    
        height: '70%',
        
        
       
        
     

    },
    username:{
        fontWeight: 'bold',
        fontSize: 14,
      
        alignSelf: 'center',
        color: 'black',
        paddingVertical: '1%',
        paddingHorizontal: "2%"

    },
    topBarAlignChips: {
      
        flexDirection:'row',
        width: dimen.width-50,
        alignSelf:'center',
       justifyContent: "space-between",
       height: '100%',
       alignItems: 'center'
    },
 
    
    userdes:{
        fontSize: 11,
        alignSelf: 'center'

    },
    userimage:{
        height: Dimensions.get('window').height*0.023,
        width: Dimensions.get('window').height*0.023,
       
    },
    locim:{
        height: Dimensions.get('window').height*0.018,
        width: Dimensions.get('window').height*0.018,
       
     
    },
    city:{
        fontWeight: '600',
        fontSize: 13,
        color: 'black',
        fontWeight: 'bold'
    },
    banner:{
        width: Dimensions.get('window').width-5,
        height: Dimensions.get('window').height/3.5,
        alignSelf: 'center',
        borderRadius: 12,
       // backgroundColor:'orange'
    },
    title:{
        fontSize: 17,
        fontWeight: 'bold',
        marginLeft: 20,
        marginTop: 30,
        alignSelf: 'flex-start',
        color: 'black'
        
    },
    desc:{
        fontSize: 14,
        color: 'gray',
        marginTop: 3,
        marginLeft: 20,
        alignSelf: 'flex-start',
    },
    horizontalview:{
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        flex: 1,
      //  backgroundColor:'yellow'
    }, 
    view1 : {
        
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            flex: 1,
            marginTop: '6%'
        

    },
    menuitem:{
        height: Dimensions.get('window').width/2.95,
        width: Dimensions.get('window').width/3-25,
        margin: 10,
        flexDirection: 'column',
        shadowColor: "#000",
        shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 3,
        
        
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
        fontSize: 11,
        flex: 1,
        textAlign: 'center',
        color: 'black',
    },
    imageBanner:{
        width: Dimensions.get('window').width-100,
        height: '100%',
        marginRight: 15,
        alignSelf: 'flex-start'
    },
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        elevation: 0.2,
        paddingTop: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: '10%',
        aspectRatio: 5 / 0.5,
        borderRadius: 4,
        backgroundColor: 'gray',
        marginBottom: '3%',
    },
});