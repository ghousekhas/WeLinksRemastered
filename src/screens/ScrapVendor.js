import React, { useState,useEffect } from 'react';
import {View, StyleSheet, Text, Dimensions,Image,BackHandler,Animated} from 'react-native';
import { TouchableOpacity, FlatList,ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
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


var cart = [];

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
                translateCart: new Animated.Value((dimen.height-dimen.height/16)),
                cartState: false,
                extraData: 0,
                orderId: -1,
                open : false,
                actualUser: props.route.params.actualUser,
                address: props.route.params.address,
                cart: [],
                cartAmount: 0
               
                                
            };
            this.orderId=-1
    }

    async fetchOrderId(){
        var orderId,prevVendor;
        const {vendorId} = this.props.route.params;
        const {actualUser} =this.state;
        try{
            orderId = await AsyncStorage.getItem("ScrapOrderId");
            prevVendor = await AsyncStorage.getItem("PrevScrapVendor");
            console.log('roder',orderId);
            if(orderId != null){
                this.setState({orderId: orderId})
                this.orderId=orderId
                
            }
            else
                this.orderId = -1;

                if(prevVendor != null && prevVendor != vendorId){
                    alert('Your cart has been reset due to vendor change');
                    Axios.post('https://api.dev.we-link.in/user_app.php?action=resetCart&'+qs.stringify({
                        user_id: actualUser.user_id,
                        order_id: orderId
                    })).then((response)=>{
                        cart=[];
                        AsyncStorage.removeItem("ScrapOrderId");
                    this.setState({extraData: Math.random(0.5)});
                    this.setState({cart: cart})
                    this.orderId=-1;
                    })
                    
                }
                else if(prevVendor === null){
                    this.orderId = -1;
                    cart=[];
                    this.setState({extraData: Math.random(0.5)});
                    this.setState({cart: cart})
                }
                else{
                    if(orderId!= -1)
                    Axios.post('https://api.dev.we-link.in/user_app.php?action=getHomeScrapOrders&order_id='+orderId)
                    .then((response)=>{
                        console.log('response',response.data)
                        cart= response.data.order[0].cart != undefined ? response.data.order[0].cart: [];
                        console.log('carty',cart);
                        this.setState({extraData: Math.random(0.5)});
                        this.calculateCartAmount();
                    })
                }
        }
        catch(error){
            console.log('error encountered');
             this.setState({orderId: -1});
             this.orderId=-1;
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

    addItemToCart =(item,num)=>{
        console.log(item);
        console.log(num);
        var itemid,quantity;
        const {vendorId} = this.props.route.params;
        if(item.id != undefined)
            itemid= item.id;
        else
            itemid= item.cart_product_id;
      
        if(this.orderId === -1 || this.orderId === null ){
            console.log('firstorder');
            Axios.post('https://api.dev.we-link.in/user_app.php?action=addToCart&'+ qs.stringify({
                user_id: this.state.actualUser.user_id,
                product_id: itemid,
                quantity: num,
                address_id: this.state.address.addr_id,
                vendor_id: this.props.route.params.vendorId
            })).then((response)=>{
                AsyncStorage.setItem("ScrapOrderId",response.data.order.scrap_order_id)
                    .then(()=>{
                        this.orderId= response.data.order.scrap_order_id;
                        console.log(response.data.order.cart);
                        cart= response.data.order.cart != undefined ? response.data.order.cart: [];
                        AsyncStorage.setItem("PrevScrapVendor",vendorId);
                        this.setState({extraData: Math.random(0.3)})
                        var tempcart= cart;
                        cart =[];
                        this.setState({extraData: Math.random(0.2)});
                        cart= tempcart;
                        this.setState({extraData: Math.random(0.7)});
                        this.setState({cart: cart})
                        this.calculateCartAmount();
                    })
            })
        }
        else{
            console.log('rigsbee',{
                user_id: this.state.actualUser.user_id,
                product_id: itemid,
                quantity: num,
                address_id: this.state.address.addr_id,
                vendor_id: this.props.route.params.vendorId,
                order_id: this.orderId
            })
            Axios.post('https://api.dev.we-link.in/user_app.php?action=addToCart&'+ qs.stringify({
                user_id: this.state.actualUser.user_id,
                product_id: parseInt(itemid),
                quantity: num,
                address_id: parseInt(this.state.address.addr_id),
                vendor_id: parseInt(this.props.route.params.vendorId),
                order_id: parseInt(this.orderId)
            })).then((response)=>{
                    console.log(response);
                    console.log('frisbee',response.data)
                    cart= response.data.order.cart;
                    this.setState({extraData: Math.random(0.5)})
                    AsyncStorage.setItem("PrevScrapVendor",vendorId);
              
                        console.log(response.data.order.cart);
                    this.setState({cart: cart})
                    this.calculateCartAmount();
                    
            })
        }
        
    }

    removeItemFromCart =(item)=>{
        console.log('removing');
        var itemid = -1;
        if(item.id != undefined)
            itemid= item.id;
        else
            itemid= item.cart_product_id;
        
        console.log({
            user_id: this.state.actualUser.user_id,
            product_id: item.id,
            quantity: 0,
            address_id: this.state.address.addr_id,
            vendor_id: this.props.route.params.vendorId,
            order_id: this.orderId
        });
        Axios.post('https://api.dev.we-link.in/user_app.php?action=addToCart&'+ qs.stringify({
                user_id: this.state.actualUser.user_id,
                product_id: itemid,
                quantity: 0,
                address_id: this.state.address.addr_id,
                vendor_id: this.props.route.params.vendorId,
                order_id: this.orderId
            })).then((response)=>{
                console.log(response.data);
                if(response.data.order.cart!= undefined)
                    cart= response.data.order.cart;
                else 
                    cart=[]
                 this.setState({extraData: Math.random(0.5)})
                AsyncStorage.setItem("PrevScrapVendor",vendorId);
                
                        console.log(response.data.order.cart);
                this.setState({cart: cart})
                this.calculateCartAmount();
                    
            })

    }

    toggleCart = (retract)=>{
      //  this.setState({open: true})
        this.setState({extraData: Math.random(0.3)});
        this.setState({cart: cart})
        //const {cs} = this.state;
        console.log('toggling',this.state.translateCart)
        const {translateCart} = this.state;
        if(retract)
            Animated.spring(this.state.translateCart,{
                toValue: 0,
                duration: 2500,
                useNativeDriver: true,
                speed: 5,
                bounciness: 3
            }).start();
        else 
        Animated.spring(this.state.translateCart,{
            toValue: dimen.height,
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
        <ScrapFlatList removeItemFromCart={this.removeItemFromCart} addItemToCart={this.addItemToCart} navigation={this.props.navigation} route={{params:{name: 'SampleVendor',stars: 4,reviews: 68,vendorId: this.props.route.params.vendorId,actualUser: this.props.route.params.actualUser}}} data={section[(Object.keys(section))[0]]}/>
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
    calculateCartAmount = () => {
        let i,amount = 0;
        for(i in cart){
            amount += ((parseFloat(cart[i].homescrap_price)) * parseInt(cart[i].cart_quantity))
 
        }

        this.setState({cartAmount : amount})
         return amount;
     }

    
    

    render(){
        const {name,stars,reviews,address,vendorAddress,imageUrl}=this.props.route.params;
       
    return (<View>
        <AppBar back funct={() => this.props.navigation.pop()} />
   
        <View style={Styles.parentContainer}>
            <View style={Styles.fortyUpperPanel}>
            <TouchableWithoutFeedback onPress={() => {
              
                console.log('Pressed outside')
             //   if(this.state.open)
                 //  this.toggleCart(false)
                //   else console.log('Wont close')
            }}>
               
               <Vendor style={{height:'40%',width: '80%',alignSelf: 'center'}} buttonVisible={false} name={name} reviews={reviews} stars={stars} address={vendorAddress} imageUrl={imageUrl}/>
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
      cart,
      actualUser: this.state.actualUser,
      address: this.state.address,
      vendorId: this.props.route.params.vendorId,
      orderId: this.orderId

   })}
   style={{backgroundColor: Colors.primary,color: 'white',flex:1,alignItems:'center',justifyContent: 'center',padding: '3%',borderRadius:8}}>
       <Text numberOfLines={1} style={{color: 'white',fontWeight: 'bold'}}>Schedule Pickup</Text>
   </TouchableOpacity>

   </View>
                {/* <View style={{flexDirection: 'row',alignSelf: 'center',margin: 10,justifyContent: 'space-between',width: '80%'}}>
                    <Text style={{backgroundColor: Colors.primary,padding: 10, borderRadius: 5,color: 'white',fontWeight: 'bold'}}>Items in cart</Text>
                    <Text style={{backgroundColor: Colors.primary,padding: 10, borderRadius: 5,color: 'white',fontWeight: 'bold'}}> Schedule Pickup</Text>
                </View> */}
</TouchableWithoutFeedback>
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
        <Animated.View style={{width: dimen.width,height: dimen.height,zIndex: 100,elevation: 10,position: 'absolute',bottom: 0,transform: [{translateY: this.state.translateCart }]}} >
             <View style={{flex: 1,width: '100%',backgroundColor: 'rgba(255,255,255,0.7)',zIndex: 1000}} onTouchEnd={()=>this.toggleCart(false)}/>
             <View style={{flex: 7,backgroundColor: 'white'}}>
                 <Text style={{...Styles.heading,alignSelf: 'center',textAlign: 'center',padding: 10}}>Cart</Text>
                 {
                     this.state.extraData != null && cart[0] != undefined ? null: <Text style={{...Styles.subbold,margin: 100,alignSelf: 'center'}}>Cart is empty</Text> 
                 } 
                 
                 <FlatList
                   
                    data={cart}
                    extraData={this.state.cart}
                    keyExtractor={(item,index)=>index.toString()}
                    renderItem={({item,index})=>{
                        return(
                            <Appliance 
                            remove={true}
                            item = {item}
                            index= {index}
                            onAdd={(num) => {
                            
                                this.addItemToCart(item,num);
                 
                            /*    
                                 cart.push({
                                    ...item,
                                    itemQuantity : num
                                });
           
           
           
                                   console.log(cart)*/
                               
                               
                               
                           }} 
                           onRemove = {(whatever) => {
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
                           initquan={item.cart_quantity}
                           //onquanchange={calculateCartAmount}
                           name={item.homescrap_name} quantity={item.quantity} price={item.homescrap_price}  price_={item.price_} image={item.homescrap_image_url}
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


        <View style={style.gray}>
             <Text style={{margin: '1%'}}>Disclaimer: Prices shown are only approximate value. They can differ for different vendors/products.</Text>
             {/*<Text onPress={() => {
                //  this.props.navigation.navigate('FAQ') What about this?
             }} style={{textDecorationLine: 'underline',textAlign: 'left',margin: '1%',marginTop: 0}}>Learn more.</Text> */}
         </View>   

           <View  style={{padding: 10,backgroundColor: 'white',marginTop:dimen.width/60}}>
        
        <View style={{flexDirection:'row'}}>
            <Text style={style.billText}>{"Cart Amount"}</Text>
            <Text style={style.billCost}>₹{this.state.cartAmount}</Text>
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={style.billText}>{"Pick-Up Fee"}</Text>
            <Text style={style.billCost}>₹50</Text>
        </View>
        <View style={{...Styles.grayfullline, marginVertical: '3%'}}/>
        <View style={{flexDirection:'row'}}>
            <Text style={style.billText}>{"Total Cost"}</Text>
            <Text style={style.billCost}>₹{ this.state.cartAmount + 50}</Text>
        </View>
        <TouchableOpacity style={{backgroundColor: Colors.primary,width: dimen.width*0.9,alignSelf: 'center',borderRadius: 10,marginTop: 5}}onPress={()=>this.props.navigation.navigate('ScrapCart',{
      cart,
      actualUser: this.state.actualUser,
      address: this.state.address,
      vendorId: this.props.route.params.vendorId,
      orderId: this.orderId

   })}>
            <Text style={{...Styles.subheading,alignSelf: 'center',color: 'white',textAlign: 'center',padding: 15}}>Schedule Pickup</Text> 
        </TouchableOpacity>
        

        
        </View> 




             </View>
             <View style={{height: 20}}/>
             
        </Animated.View>
    </View>
    )
    }
}



const ScrapFlatList = ({route,navigation,data,addItemToCart,removeItemFromCart}) => {
   
    

   

   

    const {name} = route.params;
    const {stars} = route.params;
    const {tag} = route.params;
    
    const {reviews,actualUser} = route.params;
    console.log(actualUser)

    useFocusEffect(
        React.useCallback(() => {
          const onBackPress = () => {
      //     console.log('Go to milk');
           navigation.navigate('ScrapVendors');
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
                initquan={1}
                index={index}
                onAdd={(num) => {

                    addItemToCart(item,num);
                 
                        
                   /* cart.push({
                        ...item,
                        itemQuantity : num,
                        itemPrice : item.price
                    });




                        console.log(cart)*/
                    
                    
                    
                }} 
                onRemove = {() => {
                    removeItemFromCart(item);
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
    },
     gray: {
        padding: '1%',
       backgroundColor: Colors.seperatorGray,
        borderRadius: 10,
        height: Dimensions.get('window').height/11,
        margin: '3%',
       
        alignItems: 'flex-start',
        justifyContent:'center',
        elevation:1
    },
    billText:{
        fontSize: 18,
        marginTop: '2%',
        fontWeight: '900',
        margin: '2%'
    },
    billCost:{
        fontWeight: 'bold',
        fontSize: 16,
        margin: '2%',
        textAlign: 'right',
        
       
        ...StyleSheet.absoluteFill
        
    }
});

//export default ScrapVendors;
