
import React, { useState } from 'react';
import {View, StyleSheet, Text, Dimensions,Image} from 'react-native';
import { TouchableOpacity, FlatList,ScrollView } from 'react-native-gesture-handler';
import Vendor from '../components/Vendor';
import { userDetails } from '../UserDetails';
import { Avatar } from 'react-native-paper';
import {Styles} from '../Constants';
import Accordion  from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
import Stars from '../components/Stars';
import Product from '../components/Product';

const brandsArray=['https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Amul_Logo.jpg/220px-Amul_Logo.jpg',
'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ-PN3yAMsBkQdlKVjDsM19qCdITU5T-WT3vQ&usqp=CAU',
'https://images.squarespace-cdn.com/content/v1/57617d6101dbaeb2afbdb889/1515476392795-I9QJ7R79V49PD8JTUU10/ke17ZwdGBToddI8pDm48kK3ps5ejmz3q62CXHbquzbxZw-zPPgdn4jUwVcJE1ZvWhcwhEtWJXoshNdA9f1qD7aXK0t8ahyzoOLFEHArbPTLJhEsaYD6KiXgEn3u8MxqgwDJueXeye6jBpkNIR7uTkw/heritage+foods.png3'

];

export default class VendorScreen extends React.Component{

    constructor(props){
        super(props);
            this.state={
                brangImagesdata: [1,2,3,4,5,6,7,8,9,10],
                sections: [{one: 1,
                    category: 'Toned',two: 2},{one: 1,
                        category: 'Cow',two: 2},{one: 1,
                            category: 'Full Cream',two: 2},{one: 1,
                                category: 'Organic',two: 2}],
                collapsed: true,
                activesections: []
                                
            };
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
            <Image style={Styles.horizontalImage} source={{uri: item}
        }/>
        );
    };

    renderSectionTitle=()=>{
        return(
            <View style={Styles.collapsedView} >
                <Text style={Styles.collapsedText}>collapsedText</Text>
                <Text style= {Styles.expander}>v</Text>
            </View>

            );
    };
    renderHeader = (section, _, isActive) => {
        return (
          <Animatable.View
            duration={400}
            style={Styles.collapsedView}
            transition="backgroundColor"
          >
            <Text style={Styles.collapsedText}>{section.category}</Text>
            <Text style= {Styles.expander}>v</Text>
          </Animatable.View>
        );
      };
    

    renderContent= (section,_,isactive)=>{

        return(
            <Animatable.View
            duration={400}
            style={Styles.collapsibleView}
            transition="backgroundColor">
        <ScrapFlatList navigation={this.props.navigation} route={{params:{name: 'SampleVendor',stars: 4,reviews: 68}}}/>
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
    return (
        <View style={Styles.parentContainer}>
            <View style={Styles.fortyUpperPanel}>
               
                        <Vendor style={{height:'40%',width: '80%',alignSelf: 'center'}} buttonVisible={false} name={'Vendor 1'} reviews={68} stars={4} address='Marathahalli Bridge Outer Ring Rd Marathahalli 560037'/>
                 <Text style={{paddingLeft: 10,fontSize: 15, fontWeight: 'bold'}}>Brands:</Text>
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
    )
    }
}



const ScrapFlatList = ({route,navigation}) => {
   
    const [mlist,updatemList] = useState([
        {
            name: 'Nandini Toned Milk',
            quantity: '1 packet',
            price: '22'
        },
        {
            name: 'Heritage Toned Milk',
            quantity: '1 packet',
            price: '27'
        },
        {
            name: 'Thirumala Toned Milk',
            quantity: '1 packet',
            price: '24'
        }, {
            name: 'Nandini Toned Milk 1',
            quantity: '1 packet',
            price: '22'
        },
        {
            name: 'Heritage Toned Milk 1',
            quantity: '1 packet',
            price: '22'
        },
        {
            name: 'Thirumala Toned Milk 1',
            quantity: '1 packet',
            price: '23'
        }

    ]);

   

   

    const {name} = route.params;
    const {stars} = route.params;
    const {reviews} = route.params;

   // const order = navigation.getParams('order');
    return(<View style={style.container}>
    <FlatList
        data = {mlist}
        keyExtractor = {(item) => item.name}
        renderItem = {({item}) => { 
            return(
                <Product name={item.name} quantity={item.quantity} price={item.price} 
                subscribe={() => {
                   
                    const prodName = item.name;
                    const prodQuan = item.quantity;
                    const prodRate = item.price;
               
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
