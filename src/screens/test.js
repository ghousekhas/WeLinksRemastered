import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, StyleSheet, Text, Dimensions, Image, BackHandler } from 'react-native';
import { TouchableOpacity, FlatList, ScrollView } from 'react-native-gesture-handler';
import Vendor from '../components/Vendor';
import { Styles, Colors, dimen } from '../Constants';
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
import Product from '../components/Product';
import { Entypo } from '@expo/vector-icons'
import AppBar from '../components/ui_components/AppBar';
import Axios from 'axios';
import qs from 'qs';
import { Config } from '../Constants';

export default class VendorScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            brandImagesData: [],
            sections: [],
            collapsed: true,
            activesections: []

        },
        //this.vendorData = this.props.route.params;
        this.vendorData = {"tag":"Newspaper","vendorName":"Express Service","vendorStars":"3.5194444391462536","vendorReviews":"36","vendorAddress":"703, Service Rd, HRBR Layout 1st Block, HRBR Layout 2nd Block, HRBR Layout, Banaswadi, Bengaluru, Karnataka 560043, India Near store 560043","imageUrl":"","user":{"user_id":"177","name":"Anam","phone":"9535311386","email":"anamxali1@gmail.com","city_id":"2","city":"Banglore","img_url":"https://dev.we-link.in/dist/img/users/user_img_1617806194.png","gstin":"","country_code":"0","subscription_count":4,"wallet_balance":0,"pending_action":{"homescrap":[]}},"vendorId":"143" }
    
  
    }

    

    componentDidMount() {
        this.fetchVendor(10);
    }



    toggleExpanded = () => {
        this.setState({ collapsed: !collapsed });
    }
    setSectionsFunction = sections => {
        this.setState({
            activesections: sections.includes(undefined) ? [] : sections,
        });
        console.log(sections);
        setTimeout(() => {
            if (sections.length != 0)
                this.scrollView.scrollTo({
                    x: 0,
                    y: (Dimensions.get('window').height / 9 - 20) * (sections[0]),
                    animated: true
                });
        }, 1000);
    };

    renderItem = ({ item }) => {
        return (
            <View style={{ flex: 0 }}>
                <Image style={{ ...Styles.horizontalImage }} source={{ uri: item.brand_img_url }
                } />
            </View> 
        );
    };

    renderSectionTitle = () => {
        return (
            <View style={Styles.collapsedView} >
                <Text style={Styles.collapsedText}>collapsedText</Text>
                <Entypo name='chevron-down' size={24} color={'black'} />
            </View>

        );
    };
    renderHeader = (section, _, isActive) => {
        var actualUser = this.props.route.params.actualUser;
        const { tag } = this.props.route.params;
        console.log('vs', actualUser);

        var expanderButton = (<Entypo name='triangle-down' size={20} color={'black'} />)


        if (!isActive)
            expanderButton = (<Entypo name='chevron-down' size={21} color={'black'} />)
        else
            expanderButton = (<Entypo name='chevron-up' size={21} color={'black'} />)

        return (
            <Animatable.View
                duration={400}
                style={{flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}
                // style={Styles.collapsedView}
                transition="backgroundColor"
            >
                <Text style={{fontWeight: 'bold', fontSize: 14,color: 'black',paddingHorizontal: 10, paddingVertical: 5}} >{(Object.keys(section))[0]}</Text>
                {expanderButton}
            </Animatable.View>
        );
    };


    renderContent = (section, _, isactive) => {
        console.log(section[(Object.keys(section))[0]]);

        return (
            <Animatable.View
                duration={400}
                style={{ ...Styles.collapsibleView }}
                transition="backgroundColor">
                <ScrapFlatList navigation={this.props.navigation} route={{ params: { name: 'SampleVendor', stars: 4, reviews: 68, vendorId: this.props.route.params.vendorId, actualUser: this.props.route.params.actualUser, address: this.props.route.params.address,...this.props.route.params } }} data={section[(Object.keys(section))[0]]} />
            </Animatable.View>);
       
    };

    rendCont = (section, _, isactive) => {
        return (
            <View style={{ height: 300, width: 300,backgroundColor: 'purple' }}>

            </View>
        )
    }

    render() {
     //   return<View></View>
        const { name, stars, reviews, vendorAddress, imageUrl } = this.props.route.params;
        return (<View style={{ ...StyleSheet.absoluteFill }}>
            <View>
                <AppBar title={name} back={true} funct={() => {
                    // props.navigation.toggleDrawer();
                    this.props.navigation.pop();
                }} />
            </View>
            <View style={{ height: dimen.height / 16 }} />

            <View style={{ flex: 0, backgroundColor: Colors.secondary, padding: 10 }}>
<View style={{margin: '0%',padding: '0%'}}>
<Vendor style={{ height: '40%', width: '80%', alignSelf: 'center' }} buttonVisible={false} name={name} reviews={reviews} stars={stars} address={vendorAddress} imageUrl={imageUrl} />

</View>
                <View>
                <Text style={{ paddingLeft: 14,fontSize: 15, fontWeight: 'bold', marginBottom: 5 }}>Brands:</Text>
                <FlatList
                    style={{...Styles.halfFlatlist,paddingLeft:5}}
                    renderItem={this.renderItem}
                    data={this.state.brandImagesData}
                    horizontal={true}
                    keyExtractor={(item, index) => index.toString()} />
                    </View>
            </View>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView ref={(ref) => this.scrollView = ref}>
                    <Accordion
                        style={{...Styles.accordion}}
                        sections={this.state.sections}
                        renderContent={this.renderContent}
                        touchableComponent={TouchableOpacity}
                        expandMultiple={false}
                        renderHeader={this.renderHeader}
                        activeSections={this.state.activesections}
                        onChange={this.setSectionsFunction}
                    />
                </ScrollView>
            </View>

        </View>

       )
    }
}



const ScrapFlatList = ({ route, navigation, data }) => {

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
        })
    );
    const vendorId = route.params.vendorId;
  
    // const order = navigation.getParams('order');
    return (<View style={{ ...style.container }}>
        <FlatList
            data={data}
            keyExtractor={(item) => item.name}
            style={{ maxHeight: dimen.height * 0.5}}
            renderItem={({ item }) => {
                console.log(item.product_img_url);

               

                return (
                    
                    <Product place="list" name={item.name} quantity={item.quantity} price={item.price} url={item.product_img_url} imageUrl={item.product_img_url}
                        subscribe={() => {

                            const prodName = item.name;
                            const prodQuan = item.quantity;
                            const prodRate = item.price;
                            const productId = item.id


                            navigation.navigate('SubscribeScreen', {
                                tag: 'Milk',
                                pname: prodName,
                                pquan: prodQuan,
                                prate: prodRate,
                                imageUrl: item.product_img_url,
                                actualUser: actualUser,
                                vendorId: vendorId,
                                productId: productId,
                                vendorType: 'milk',
                                address: address,
                                ...route.params
                            })
                        }
                        } />

                )
            }}

        />


    </View>)
};


const style = StyleSheet.create({
    container: {

        padding: 1,

    },
    header: {
        backgroundColor: '#E5F6FE',
        height: Dimensions.get('window').height / 3,
        padding: 5,
        flexDirection: 'row'


    },
    name: {
        marginTop: 0.02 * Dimensions.get('window').height,
        marginStart: '29%',
        fontWeight: 'bold',
        fontSize: 20

    },
    address: {
        marginTop: 0.01 * Dimensions.get('window').height,
        marginStart: '29%',
        fontWeight: 'bold',
        fontSize: 13
    },
    brandsTitle: {
        color: 'gray',
        marginStart: '29%',
        marginTop: '2%',
        fontWeight: 'bold'
    },
    review: {
        color: 'gray',
        marginStart: '5%',
        marginTop: '2%',
        fontWeight: 'bold'
    },
    stars: {

        marginStart: '29%',
        marginTop: '2%',
        fontWeight: 'bold'
    },
    image: {
        height: 100,
        width: 100,
        position: 'absolute',
         marginStart: 10
    }
});