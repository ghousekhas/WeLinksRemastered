
import React, { useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import {Entypo} from '@expo/vector-icons';
import AppBar from '../components/AppBar';
import Axios from 'axios';
import qs from 'qs';

const brandsArray=
[
'https://store-images.s-microsoft.com/image/apps.33526.9007199266247369.5693d8f7-e25b-4b66-bba9-e4d2a7521860.b7298f7d-d366-497a-bb18-02af5bb7a45e?mode=scale&q=90&h=200&w=200&background=%239b0000',
'https://jolla.com/content/uploads/2017/01/indian-express-logo.png',
'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTc3Hx3NU5UpE_9npNzyqhFMO8pL2ccGRlBPg&usqp=CAU'
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
        //console.log('MilkVendorEntered')
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
            <Image style={Styles.horizontalImage} source={{uri: item}}/>
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
            <View style={{height:300,width:300}}>

            </View>
        )
    }

    render(){
        const {name,stars,reviews,address,vendorAddress,imageUrl}=this.props.route.params;
    return (<View>
        <AppBar back 
        funct={() => {
        this.props.navigation.pop();
        }} />
  
        <View style={Styles.parentContainer}>
            <View style={Styles.fortyUpperPanel}>
               
                         <Vendor style={{height:'40%',width: '80%',alignSelf: 'center'}} buttonVisible={false} name={name} reviews={reviews} stars={stars} address={vendorAddress} imageUrl={imageUrl}/>

                        <Text style={{fontWeight: 'bold',fontSize: 16,marginLeft: 10}}>Brands:</Text>
                 
                <FlatList
                    style={Styles.halfFlatlist}
                    renderItem={this.renderItem}
                    data={brandsArray}
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


const ScrapFlatList = ({route}) => {

    const navigation = useNavigation();
    
    

    const [plist,updatepList] = useState([
        {
            name: 'The Hindu',
            quantity: '1 unit',
            price: '5',
            price_: '8'
        },
        {
            name: 'Times of India',
            quantity: '1 unit',
            price: '5',  
            price_: '8'      },
        {
            name: 'Prajavani',
            quantity: '1 unit',
            price: '5', 
            price_: '8'
               }, {
            name: 'The Hindu 1',
            quantity: '1 unit',
            price: '5', 
            price_: '8'       },
        {
            name: 'Times of India 1',
            quantity: '1 unit',
            price: '5',  
            price_: '8'      },
        {
            name: 'Prajavani 1',
            quantity: '1 unit',
            price: '5',    
            price_: '8'    }

    ]);

   

   

    const {name} = route.params;
    const {stars} = route.params;
    const {reviews} = route.params;

   // const order = navigation.getParams('order');
   useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
       navigation.navigate('PaperVendors');
          return true;
        
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    },)
  );

    return(<View style={style.container}>
    <FlatList
        data = {plist}
        keyExtractor = {(item) => item.name}
        renderItem = {({item}) => { 
            console.log(item.product_img_url);
            
            
            return(
                <Product name={item.name} quantity={item.quantity} price={item.price}  url={item.product_img_url} imageUrl={item.product_img_url}
                subscribe={() => {
                   
                    const prodName = item.name;
                    const prodQuan = item.quantity;
                    const prodRate = item.price;
                    
               
                    navigation.navigate('SubscribeScreen',{
                        tag : 'paper',
                        pname : prodName,
                        pquan : prodQuan,
                        prate: prodRate,
                        imageUrl: item.product_img_url,
                        actualUser: actualUser,
                        vendorId: vendorId,
                        productId: item.id
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

//export default VendorScreen1;
