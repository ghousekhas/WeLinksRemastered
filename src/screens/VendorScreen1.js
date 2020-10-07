
import React, { Profiler, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import {View, StyleSheet, Text, Dimensions,Image,BackHandler} from 'react-native';
import { TouchableOpacity, FlatList,ScrollView } from 'react-native-gesture-handler';
import Vendor from '../components/Vendor';
import { userDetails } from '../UserDetails';
import { Avatar } from 'react-native-paper';
import {Styles} from '../Constants';
import Accordion  from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
import Stars from '../components/Stars';
import Product from '../components/Product';
import {Entypo} from '@expo/vector-icons'
import AppBar from '../components/AppBar';
import Axios from 'axios';
import qs from 'qs';

const brandsArray=['https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Amul_Logo.jpg/220px-Amul_Logo.jpg',
'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ-PN3yAMsBkQdlKVjDsM19qCdITU5T-WT3vQ&usqp=CAU',
'https://images.squarespace-cdn.com/content/v1/57617d6101dbaeb2afbdb889/1515476392795-I9QJ7R79V49PD8JTUU10/ke17ZwdGBToddI8pDm48kK3ps5ejmz3q62CXHbquzbxZw-zPPgdn4jUwVcJE1ZvWhcwhEtWJXoshNdA9f1qD7aXK0t8ahyzoOLFEHArbPTLJhEsaYD6KiXgEn3u8MxqgwDJueXeye6jBpkNIR7uTkw/heritage+foods.png3'

];

export default class VendorScreen1 extends React.Component{

    constructor(props){
        super(props);
            this.state={
                brandImagesData: [],
                sections: [],
                collapsed: true,
                activesections: []
                                
            };
    }

    componentDidMount(){
        console.log('MilkVendorEntered')
        Axios.get('https://api.dev.we-link.in/user_app.php?action=getProductsList&'+qs.stringify({
            vendorID: this.props.route.params.vendorId,
            vendor_type: 'newspaper'
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
            <Image style={Styles.horizontalImage} source={{uri: item.brand_image_url}
        }/>
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
    var      actualUser= this.props.route.params.actualUser;
        console.log('vs',actualUser);

        var expanderButton= (<Entypo name='triangle-down' size={24} color={'black'}/>)
        console.log('meh',section);

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
        console.log(section[(Object.keys(section))[0]]);

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
            <View style={{height:300,width:300}}>

            </View>
        )
    }

    render(){
        const {name,stars,reviews,address,vendorAddress,imageUrl}=this.props.route.params;
    return (<View>
     <AppBar back={true} funct={() => {
           // props.navigation.toggleDrawer();
           this.props.navigation.pop();
        }} />
        <View style={Styles.parentContainer}>
       
            <View style={Styles.fortyUpperPanel}>
               
                <Vendor style={{height:'40%',width: '80%',alignSelf: 'center'}} buttonVisible={false} name={name} reviews={reviews} stars={stars} address={vendorAddress} imageUrl={imageUrl}/>
                 <Text style={{paddingLeft: 10,fontSize: 15, fontWeight: 'bold',marginBottom: 5}}>Brands:</Text>
                <FlatList
                    style={Styles.halfFlatlist}
                    renderItem={this.renderItem}
                    data={this.state.brandImagesData}
                    horizontal={true}
                    keyExtractor={(item,index)=>  index.toString()}/>

            </View>
            <View style={Styles.sixtyLowerPanel}>
                <ScrollView ref={(ref)=>this.scrollView=ref}>
                <Accordion
                    style={Styles.accordion}
                    sections= {this.state.sections}
                    renderContent= {this.renderContent}
                    touchableComponent={TouchableOpacity}
                    expandMultiple={false}
                    renderHeader= {this.renderHeader}
                    activeSections={this.state.activesections}
                    onChange={this.setSectionsFunction}
                />
                </ScrollView>
            </View>

        </View>
        </View>
    )
    }
}



const ScrapFlatList = ({route,navigation,data}) => {
   
    

   

   

    const {name} = route.params;
    const {stars} = route.params;
    const {reviews,actualUser} = route.params;
    const {tag} = route.params;
    console.log(actualUser)

    useFocusEffect(
        React.useCallback(() => {
          const onBackPress = () => {
      //     console.log('Go to milk');
           navigation.navigate('PaperVendors');
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
        renderItem = {({item}) => { 
            console.log(item.product_image_url);
            const imageUrl= item.product_image_url;
            
            return(
                <Product name={item.name} quantity={item.quantity} price={item.weekday_price} price_={item.weekend_price} url={item.product_image_url} imageUrl={imageUrl}
                subscribe={() => {
                   
                    const prodName = item.name;
                    const prodQuan = item.quantity;
                    const prodRate = item.weekday_price;
                    const prodRate_ = item.weekend_price;
                    const productId = item.id
                    
               
                    navigation.navigate('SubscribeScreen',{
                        tag : 'Paper',
                        pname : prodName,
                        pquan : prodQuan,
                        prate: prodRate,
                        prate_: prodRate_ ,
                        imageUrl: imageUrl,
                        actualUser: actualUser,
                        vendorId: vendorId,
                        productId: item.id,
                        productId: productId
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
