import React, { useState,useEffect } from 'react';
import {View, StyleSheet, Text, Dimensions,Image,BackHandler,Animated} from 'react-native';
import { TouchableOpacity, FlatList,ScrollView } from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';
import Vendor from '../components/Vendor';
import { Avatar, Button } from 'react-native-paper';
import {Styles, dimen} from '../Constants';
import Accordion  from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
import Stars from '../components/Stars';
import Product from '../components/Product';
import AppBar from '../components/AppBar'
import Appliance from '../components/Appliance';
import {Colors} from '../Constants';
import Axios from 'axios';
import qs from 'qs';
import {Entypo} from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';


let cart = [];
//a
export default class ScrapVendor extends React.Component{

    
    constructor(props){
        super(props);
            this.state={
                brandImagesData: [],
                sections: [],
                collapsed: true,
                activesections: [],
                width: 0,
                trasnlateCart: new Animated.Value((dimen.height-dimen.height/16)),
                cartState: false,
                extraData: 0,
                orderId: -1
                                
            };
    }

    async fetchOrderId(){
        var orderId;
        try{
            orderId = await AsyncStorage.getItem("ScrapOrderIdeee");
            console.log('roder',orderId);
            if(orderId != null)
                this.setState({orderId: orderId})
        }
        catch(error){
            console.log('error encountered');
        }
    }

    componentDidMount(){
        console.log('MilkVendorEntered')
        this.fetchOrderId();

        Axios.get('https://api.dev.we-link.in/user_app.php?action=getProductsList&'+qs.stringify({
            vendorID: this.props.route.params.vendorId,
            vendor_type: 'homescrap'
        }),{
            'Accept-Encoding': 'gzip'
        }
        ).then((result) => {
           var res = result.data.products;
           console.log('result',res);
           console.log('res',res.categories);
           this.setState({sections: res.categories});
           this.setState({brandImagesData: res.brands});
    
           

        }).catch((err) => {
            console.log(err);
            
        });
    }

    addItemToCart =()=>{
        
    }

    removeItemFromCart =()=>{

    }

    toggleCart = (retract)=>{
        this.setState({extraData: Math.random(0.3)});
        //const {cs} = this.state;
        console.log('toggling',this.state.trasnlateCart)
        const {trasnlateCart} = this.state;
        if(retract)
            Animated.spring(this.state.trasnlateCart,{
                toValue: 0,
                duration: 2500,
                useNativeDriver: true,
                speed: 5,
                bounciness: 3
            }).start();
        else 
        Animated.spring(this.state.trasnlateCart,{
            toValue: dimen.height-dimen.height/16,
            duration: 2500,
            useNativeDriver: true,
            speed: 5,
            bounciness: 3
        }).start();

    }
 

    toggleExpanded= ()=>{
        this.setState({collapsed: !collapsed});
    }
    setSectionsFunction = sections => {
        this.setState({
          activesections: sections.includes(undefined) ? [] : sections,
        });
        console.log(sections);
        setTimeout(()=>{
        if(sections.length!=0)
        this.scrollView.scrollTo({
            x: 0,
            y: (Dimensions.get('window').height/9-20)*(sections[0]),
            animated: true
        });
        },1000);
      };
    
    renderItem=({item})=>{
        return(
            <Image style={Styles.horizontalImage} source={require('../../assets/milk.png')}/>
        );
    };

    renderSectionTitle=()=>{
        return(
            <View style={Styles.collapsedView} >
                <Text style={Styles.collapsedText}>collapsedText</Text>
                <Entypo name='chevron-down' size={24} color={'black'}/>
            </View>

            );
    };
    renderHeader = (section, _, isActive) => {
        let expanderButton= (<Entypo name='triangle-down' size={24} color={'black'}/>)
       

        if(!isActive)
            expanderButton= (<Entypo name='chevron-down' size={24} color={'black'}/>)
        else
            expanderButton= (<Entypo name='chevron-up' size={24} color={'black'}/>)
        return (
          <Animatable.View
            duration={400}
            style={Styles.collapsedView}
            transition="backgroundColor"
          >
           <Text style={Styles.collapsedText}>{(Object.keys(section))[0]}</Text>
            {expanderButton}
          </Animatable.View>
        );
      };
    

    renderContent= (section,_,isactive)=>{

        return(
            <Animatable.View
            duration={400}
            style={Styles.collapsibleView}
            transition="backgroundColor">
        <ScrapFlatList navigation={this.props.navigation} route={{params:{name: 'SampleVendor',stars: 4,reviews: 68,vendorId: this.props.route.params.vendorId,actualUser: this.props.route.params.actualUser}}} data={section[(Object.keys(section))[0]]}/>
        </Animatable.View>);
        /*return(
            <Animatable.View
        duration={400}
        style={Styles.collapsibleView}
        transition="backgroundColor">
                <FlatList style={Styles.productList}
                renderItem={(item)=>{
                    return(<ProductOne style={Styles.vendorflat}/>)
                }}
                data={[1,2,3,4,5,6,7]}
                keyExtractor={(item,index)=> index.toString()}/>

        </Animatable.View>
        );*/
    };

    rendCont=(section,_,isactive)=>{
        return(
            <View style={{height:300,width:300}} />

        )
    }

    render(){
    return (<View>
        <AppBar back funct={() => this.props.navigation.pop()} />
   
        <View style={Styles.parentContainer}>
            <View style={Styles.fortyUpperPanel}>
               
                        <Vendor style={{height:'40%',width: '80%',alignSelf: 'center'}} buttonVisible={false} name={'Vendor 1'} reviews={68} stars={4} address={this.props.route.params.vendorAddress
                        }/>
                 <View style={{flexDirection: 'row',width: dimen.width,alignSelf:'center', justifyContent: 'space-around',height: dimen.height/17}}>
   <TouchableOpacity onPress={() => {
       console.log(cart)
        this.toggleCart(true);   
       //this.props.navigation.navigate('ScrapCart',cart)
    }
       } style={{backgroundColor: Colors.primary,color: 'white',flex:1,alignItems:'center',justifyContent: 'center',padding: '3%',borderRadius:8,width:this.state.width}}>
       <Text style={{color: 'white',fontWeight: 'bold'}}>Go to Cart</Text>
   </TouchableOpacity>

   <TouchableOpacity  onLayout={({nativeEvent}) => {
       this.setState({width: nativeEvent.layout.width})

   }}  
   onPress={()=>this.props.navigation.navigate('ScrapCart',{
       cart: cart
   })}
   style={{backgroundColor: Colors.primary,color: 'white',flex:1,alignItems:'center',justifyContent: 'center',padding: '3%',borderRadius:8}}>
       <Text numberOfLines={1} style={{color: 'white',fontWeight: 'bold'}}>Schedule Pickup</Text>
   </TouchableOpacity>

   </View>
                {/* <View style={{flexDirection: 'row',alignSelf: 'center',margin: 10,justifyContent: 'space-between',width: '80%'}}>
                    <Text style={{backgroundColor: Colors.primary,padding: 10, borderRadius: 5,color: 'white',fontWeight: 'bold'}}>Items in cart</Text>
                    <Text style={{backgroundColor: Colors.primary,padding: 10, borderRadius: 5,color: 'white',fontWeight: 'bold'}}> Schedule Pickup</Text>
                </View> */}

            </View>
            <View style={Styles.sixtyLowerPanel}>
                <ScrollView ref={(ref)=>this.scrollView=ref}>
                <View style={{marginTop: dimen.height/25}}>
                <Accordion
                    style={{...Styles.accordion}}
                    sections= {this.state.sections}
                    renderContent= {this.renderContent}
                    touchableComponent={TouchableOpacity}
                    expandMultiple={false}
                    renderHeader= {this.renderHeader}
                    activeSections={this.state.activesections}
                    onChange={this.setSectionsFunction}
                />
                </View>
                </ScrollView>
                
            </View>

        </View>
        <Animated.View style={{width: dimen.width,height: dimen.height-dimen.height/16,backgroundColor: 'white',zIndex: 100,elevation: 10,position: 'absolute',bottom: 0,transform: [{translateY: this.state.trasnlateCart }]}} onTouchEnd={()=>this.toggleCart(false)}>
             <View style={{flex: 1}}>
                 <Text style={{...Styles.heading,alignSelf: 'center',textAlign: 'center',padding: 10}}>Cart</Text>
                 {
                     this.state.extraData != null && cart[0] != undefined ? null: <Text style={{...Styles.subbold,margin: 100,alignSelf: 'center'}}>Cart is empty</Text> 
                 }
                 <FlatList
                   
                    data={cart}
                    extraData={this.state.extraData}
                    keyExtractor={(item,index)=>index.toString()}
                    renderItem={({item,index})=>{
                        return(
                            <Appliance 
                            remove={true}
                            item = {item}
                            index= {index}
                            onAdd={(num) => {
                            
                                this.addItemToCart(item);
                 
                            /*    
                                 cart.push({
                                    ...item,
                                    itemQuantity : num
                                });
           
           
           
                                   console.log(cart)*/
                               
                               
                               
                           }} 
                           onRemove = {() => {
                               this.removeItemFromCart(item);
                               /*console.log('Remove')
                               cart.splice(index,1);
                               console.log(cart);*/
                               // let temp = cart,i,ind = index;
                   
                               // for(i in temp){
                               //         if(i != ind)
                               //         cart.push(temp[i])
                               // }
                               // console.log(cart)
           
                           }}
                           name={item.name} quantity={item.quantity} price={item.price}  price_={item.price_} image={item.product_url}
                           subscribe={() => {
                              
                               const prodName = item.name;
                               const prodQuan = item.quantity;
                               const prodRate = item.price;
                               const prodRate_ = item.price_;
           
                               navigation.navigate('SubscribeScreen',{
                                   tag : 'paper',
                                   pname : prodName,
                                   pquan : prodQuan,
                                   prate: prodRate
                               }) } 
                           }/>
           
                        )

                    }}
                    />
             </View>
             
        </Animated.View>
    </View>
    )
    }
}



const ScrapFlatList = ({route,navigation,data}) => {
   
    

   

   

    const {name} = route.params;
    const {stars} = route.params;
    const {tag} = route.params;
    
    const {reviews,actualUser} = route.params;
    console.log(actualUser)

    useFocusEffect(
        React.useCallback(() => {
          const onBackPress = () => {
      //     console.log('Go to milk');
           navigation.navigate('MilkVendors');
              return true;
            
          };
    
          BackHandler.addEventListener('hardwareBackPress', onBackPress);
    
          return () =>
            BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        },)
      );
      const vendorId=route.params.vendorId;

   // const order = navigation.getParams('order');
    return(<View style={style.container}>
    <FlatList
        data = {data}
        keyExtractor = {(item) => item.name}
        renderItem = {({item,index}) => { 
            console.log(item.product_img_url);
            
            
            return(
                <Appliance 
                item={ item}
                index={index}
                onAdd={(num) => {
                 
                        
                    cart.push({
                        ...item,
                        itemQuantity : num
                    });




                        console.log(cart)
                    
                    
                    
                }} 
                onRemove = {() => {
                    console.log('Remove')
                    cart.splice(index,1);
                    console.log(cart);
                    // let temp = cart,i,ind = index;
        
                    // for(i in temp){
                    //         if(i != ind)
                    //         cart.push(temp[i])
                    // }
                    // console.log(cart)

                }}
                name={item.name} quantity={item.quantity} price={item.price}  price_={item.price_} image={item.product_url}
                subscribe={() => {
                   
                    const prodName = item.name;
                    const prodQuan = item.quantity;
                    const prodRate = item.price;
                    const prodRate_ = item.price_;

                    navigation.navigate('SubscribeScreen',{
                        tag : 'paper',
                        pname : prodName,
                        pquan : prodQuan,
                        prate: prodRate
                    }) } 
                }/>

            )
        }}
        

    />
  

    </View>)
};









const style = StyleSheet.create({
    container: {
        
        padding: 1,
        backgroundColor: 'white'
        
    },
    header: {
        backgroundColor: '#E5F6FE',
        height: Dimensions.get('window').height/3,
        padding:5,
        flexDirection: 'row'
       

    },
    name: {
        marginTop: 0.02 * Dimensions.get('window').height,
        marginStart: '29%',
        fontWeight: 'bold',
        fontSize: 20

    },
    address:{
        marginTop: 0.01 * Dimensions.get('window').height,
        marginStart: '29%',
        fontWeight: 'bold',
        fontSize: 13
    },
    brandsTitle:{
        color: 'gray',
        marginStart: '29%',
        marginTop: '2%',
        fontWeight: 'bold'
    },
    review:{
        color: 'gray',
        marginStart: '5%',
        marginTop: '2%',
        fontWeight: 'bold'
    },
    stars:{
        
        marginStart: '29%',
        marginTop: '2%',
        fontWeight: 'bold'
    },
    image : {
        height: 100,
        width: 100,
        position: 'absolute',
        marginTop: '3%'
    }
});

//export default ScrapVendors;
