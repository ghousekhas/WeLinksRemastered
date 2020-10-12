import React, { useState } from 'react';
import {View, StyleSheet, Text, Dimensions,Image} from 'react-native';
import { TouchableOpacity, FlatList,ScrollView } from 'react-native-gesture-handler';
import Vendor from '../components/Vendor';
import { Avatar, Button } from 'react-native-paper';
import {Styles, dimen} from '../Constants';
import Accordion  from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
import Stars from '../components/Stars';
import Product from '../components/Product';
import AppBar from '../components/AppBar'
import Appliance from '../components/Appliance';
import {Colors} from '../Constants'
import {Entypo} from '@expo/vector-icons'

let cart = [];

export default class ScrapVendor extends React.Component{

    constructor(props){
        super(props);
            this.state={
                brangImagesdata: [1,2,3,4,5,6,7,8,9,10],
                sections: [
                    {'Small Appliances':''},
                      { 'Large Appliances':''},
                           { 'Electronics':''},
                               { 'Recyclable':''}],
                collapsed: true,
                activesections: [],
                width : 0,
                
                                
            }

           

       
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
        <ScrapFlatList route={{params:{name: 'SampleVendor',stars: 4,reviews: 68}}}/>
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
               
                        <Vendor style={{height:'40%',width: '80%',alignSelf: 'center'}} buttonVisible={false} name={'Vendor 1'} reviews={68} stars={4} address={'7th cross near hebbal flyover Bengaluru 560092'
                        }/>
                 <View style={{flexDirection: 'row',width: dimen.width,alignSelf:'center', justifyContent: 'space-around',height: dimen.height/17}}>
   <TouchableOpacity onPress={() => {
       console.log(cart)
       this.props.navigation.navigate('ScrapCart',cart)}} style={{backgroundColor: Colors.primary,color: 'white',flex:1,alignItems:'center',justifyContent: 'center',padding: '3%',borderRadius:8,width:this.state.width}}>
       <Text style={{color: 'white',fontWeight: 'bold'}}>Go to Cart</Text>
   </TouchableOpacity>

   <TouchableOpacity  onLayout={({nativeEvent}) => {
       this.setState({width: nativeEvent.layout.width})

   }}  style={{backgroundColor: Colors.primary,color: 'white',flex:1,alignItems:'center',justifyContent: 'center',padding: '3%',borderRadius:8}}>
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
        </View>
    )
    }
}



const ScrapFlatList = ({route,navigation}) => {

   
    
    

    const [plist,updatepList] = useState([
        {
            name: 'Mobile Phone',
            quantity: '1 unit',
            price: '5',
            price_: '8',
            image: 'https://png.pngtree.com/png-vector/20190120/ourlarge/pngtree-mobile-vector-icon-png-image_470662.jpg'
        },
        {
            name: 'Washing Machine',
            quantity: '1 unit',
            price: '5',  
            price_: '8',   
            image: 'data:image/png;base64,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'   },
        {
            name: 'Fridge',
            quantity: '1 unit',
            price: '5', 
            price_: '8',
            image: 'https://static.vecteezy.com/system/resources/thumbnails/000/351/209/small/Electronic_Devices__28456_29.jpg'
               }, {
            name: 'TV',
            quantity: '1 unit',
            price: '5', 
            price_: '8'       },
        {
            name: 'Chair',
            quantity: '1 unit',
            price: '5',  
            price_: '8'      },
        {
            name: 'Table',
            quantity: '1 unit',
            price: '5',    
            price_: '8',
            

        }

    ]);

   

   

    const {name} = route.params;
    const {stars} = route.params;
    const {reviews} = route.params;

 //   const cart = [];

   // const order = navigation.getParams('order');
    return(<View style={style.container}>
    <FlatList
        data = {plist}
        keyExtractor = {(item) => item.name}
        renderItem = {({item,index}) => { 
            // console.log(index)
            return(
                <Appliance onAdd={(num) => {
                 
                        
                     cart.push({
                         itemName : item.name,
                         itemQuantity : num
                     });



                        console.log(cart)
                    
                    
                    
                }} 
                onRemove = {() => {
                    console.log('Remove')
                    // let temp = cart,i,ind = index;
        
                    // for(i in temp){
                    //         if(i != ind)
                    //         cart.push(temp[i])
                    // }
                    // console.log(cart)

                }}
                name={item.name} quantity={item.quantity} price={item.price}  price_={item.price_} image={item.image}
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
