import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, ScrollView, Image, FlatList, Dimensions, TouchableOpacity, Animated, Modal, TouchableHighlight } from 'react-native';
import { Style, dimen, Colors, Styles } from '../Constants';
import TextBox from '../components/TextBox';
import Button from '../components/Button';
import VendorSelectProduct from '../components/VendorSelectProduct';
import SubmitButton from '../components/SubmitButton';
import DocumentPicker from 'react-native-document-picker';
import { useNavigation, DrawerActions, useTheme } from '@react-navigation/native';
import AppBar from '../components/AppBar';
import { AntDesign } from '@expo/vector-icons';
import Axios from 'axios';

// Final selected sets
    let selectedMilk = new Set();
    let selectedPaper = new Set();
    let selectedHome = new Set();
    let selectedOffice = new Set();
export default function VendorServices({ submit }) {
    const navigation = useNavigation();

    const words = {
        milkDelivery: 'Milk Delivery',
        newspaperDelivery: 'Newspaper Delivery',
        homescrapCollection: 'Home Scrap Collection',
        officescrapCollection: 'Office Scrap Collection'

    }


    // const [selectedMilk,setSM] = useState(new Set());
    // const [selectedPaper,setSP] = useState(new Set());
    // const [selectedHome,setSH] = useState(new Set());
    // const [selectedOffice,setSO] = useState(new Set());


 


    

    const [service, setService] = useState(''); // Selected service

    const [translateCart, setTranslateCart] = useState(new Animated.Value((dimen.height - dimen.height / 16)));
   
    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);
    const [check3, setCheck3] = useState(false);
    const [check4, setCheck4] = useState(false);

    const [width, setWidth] = useState(0);
    let list = [];
    let available = new Set();

    

   

    const [milkProducts, setMilkProducts] = useState([
        {
            name: 'Nandini Toned',
            product_image_url: 'https://reactnative.dev/img/tiny_logo.png',
            sel: false


        }, {
            name: 'Heritage',
            product_image_url: 'https://reactnative.dev/img/tiny_logo.png',
           sel: false
        }, {
            name: 'Amul',
            product_image_url: 'https://reactnative.dev/img/tiny_logo.png',
           sel: false
        }, {
            name: 'Mother Dairy',
            product_image_url: 'https://reactnative.dev/img/tiny_logo.png',
           sel: false
        }

    ]);
    const [paperProducts, setPaperProducts] = useState([
        {
            name: 'Times',
            product_image_url: 'https://reactnative.dev/img/tiny_logo.png',
           sel: false


        }, {
            name: 'Hindu',
            product_image_url: 'https://reactnative.dev/img/tiny_logo.png',
           sel: false
        }, {
            name: 'Indian Express',
            product_image_url: 'https://reactnative.dev/img/tiny_logo.png',
           sel: false
        }, {
            name: 'Deccan Herald',
            product_image_url: 'https://reactnative.dev/img/tiny_logo.png',
           sel: false
        }

    ]);

    const [homeProducts, setHomeProducts] = useState([
        {
            name: 'Phone',
            product_image_url: 'https://reactnative.dev/img/tiny_logo.png',
           sel: false


        }, {
            name: 'Newspapers',
            product_image_url: 'https://reactnative.dev/img/tiny_logo.png',
           sel: false
        }, {
            name: 'Electronics',
            product_image_url: 'https://reactnative.dev/img/tiny_logo.png',
           sel: false
        }
    ]);
    const [officeProducts, setOfficeProducts] = useState([
        {
            name: 'Metal',
            product_image_url: 'https://reactnative.dev/img/tiny_logo.png',
           sel: false


        }, {
            name: 'Plastic',
            product_image_url: 'https://reactnative.dev/img/tiny_logo.png',
           sel: false
        }

    ]);

    const getMilkProducts = () => {
        Axios.get('https://api.dev.we-link.in/user_app_dev.php?action=getAllMilkProducts&city_id='+2)
        .then((response)=>{
            console.log("res" +response.data.products);
            setMilkProducts(response.data.products)
            //data=response.data;
         
        },(error)=>{
            console.log(error);
         
        })
    }
        const getPaperProducts = () => {
            Axios.get('https://api.dev.we-link.in/user_app_dev.php?action=getAllNewsPaperProducts&city_id='+2)
            .then((response)=>{
                console.log("res" +response.data.products);
                setPaperProducts(response.data.products)
               // setMilkProducts
                //data=response.data;
             
            },(error)=>{
                console.log(error);
             
            })
        }
            const getHomeProducts = () => {
                Axios.get('https://api.dev.we-link.in/user_app_dev.php?action=getAllHomeScrapProducts&city_id='+2)
                .then((response)=>{
                    console.log("res" +response.data.products);
                    setHomeProducts(response.data.products)
                   // setMilkProducts
                    //data=response.data;
                 
                },(error)=>{
                    console.log(error);
                 
                })
            }
                const getOfficeProducts = () => {
                    Axios.get('https://api.dev.we-link.in/user_app_dev.php?action=getAllCorporateScrapCategories&city_id='+2)
                    .then((response)=>{
                        console.log("res" +response.data.categories);
                        setOfficeProducts(response.data.categories)
                       // setMilkProducts
                        //data=response.data;
                     
                    },(error)=>{
                        console.log(error);
                     
                    })
            
            
      

    }
    useEffect(()=>{
        getMilkProducts();
        getPaperProducts();
        getHomeProducts();
        getOfficeProducts();
          
     //     console.log('retrieving')
       
    },[]);
    // Opens bottom sheet
    const toggleProducts = (retract) => {

        console.log('toggling', translateCart)

        if (retract)
            Animated.spring(translateCart, {
                toValue: 0,
                duration: 2500,
                useNativeDriver: true,
                speed: 5,
                bounciness: 3
            }).start();
        else {


            Animated.spring(translateCart, {
                toValue: dimen.height,
                duration: 2500,
                useNativeDriver: true,
                speed: 5,
                bounciness: 3
            }).start();

        }



    };
    // To select a service
    const CheckBox = (check) => {
        if (!check) return (<AntDesign name="checksquareo" size={24} color="gray" />)
        else return (<AntDesign name="checksquare" size={24} color={Colors.primary} />)
    }





    // Component for product in flatlist
    const VendorSelectProduct = ({ name, imageURL, product_id }) => {

        const [selected, setSelected] = useState(false);
        const adding = (name, imageURL) => {
            
            switch(service){
                case 'Milk':
                    milkProducts.forEach((p) => {
                        if(p.name == name){
                      //      p.sel = selected;
                        //    console.log(name + " " + "sel " + sel + " selected " + selected)
                        }
                    })
                    if (!selected) {
                        let obj = {
                            name,
                            imageURL
                        };
                        selectedMilk = (new Set(selectedMilk.add(obj)));
                      //  selectedMilk.add(obj);
                        
                   //     setSM(new Set(selectedMilk).add(obj));
                      
        
                    }
                    else if (selected) {
                        selectedMilk.forEach((product) => {
                            if (product.name == name)
                          //  setSM(new Set(selectedMilk.delete(product)));
                                selectedMilk.delete(product)
                        });
                        //          list = Array.from(available);
        
        
                    }
                    break;
                case 'Paper' :
                    paperProducts.forEach((p) => {
                        if(p.name == name){
                    //        p.sel = selected;
                        }
                    })
                    if (!selected) {
                        let obj = {
                            name,
                            imageURL
                        };
                       selectedPaper.add(obj);
                        //       list = Array.from(smp);
        
                    }
                    else if (selected) {
                       selectedPaper.forEach((product) => {
                           if (product.name == name)
                               selectedPaper.delete(product)
                       });
                        //          list = Array.from(available);
        
        
                    }
                   break;
                
                case 'Home' : 
                homeProducts.forEach((p) => {
                    if(p.name == name){
                //        p.sel = selected;
                    }
                })
                if (!selected) {
                    let obj = {
                        name,
                        imageURL
                    };
                    selectedHome.add(obj);
                    //       list = Array.from(smp);
    
                }
                else if (selected) {
                    selectedHome.forEach((product) => {
                        if (product.name == name)
                            selectedHome.delete(product)
                    });
                    //          list = Array.from(available);
    
    
                }
                break;
            case 'Office' :
                officeProducts.forEach((p) => {
                    if(p.name == name){
                //        p.sel = selected;
                    }
                })
                if (!selected) {
                    let obj = {
                        name,
                        imageURL
                    };
                    selectedOffice.add(obj);
                    //       list = Array.from(smp);
    
                }
                else if (selected) {
                    selectedOffice.forEach((product) => {
                        if (product.name == name)
                            selectedOffice.delete(product)
                    });
                    //          list = Array.from(available);
    
    
                }
                break;
            }
           

           console.log('Milk: \n');
           selectedMilk.forEach((p) => {
               console.log(p.name);
           });
           console.log('Paper: \n');
           selectedPaper.forEach((p) => {
               console.log(p.name);
           });
           console.log('Home: \n');
           selectedHome.forEach((p) => {
               console.log(p.name);
           });
           console.log('Office: \n');
           selectedOffice.forEach((p) => {
               console.log(p.name);
           });
           

            

        }

        const setSelectedAndAdd = (name,imageURL) => {

            adding(name, imageURL);
            setSelected(!selected);

        }


        return (<View style={{ flexDirection: 'row', marginVertical: '2%', margin: '1%', backgroundColor: Colors.whiteBackground, height: dimen.height / 8 }}>
            <Image style={style.image} source={{ uri: imageURL }} />

            <View style={{ alignSelf: 'center', flex: 1, flexDirection: 'row', marginStart: 80 }}>
                <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>{name}</Text>
                <AntDesign onPress={() => {

                    setSelectedAndAdd(name,imageURL);
                   
                    
                }} style={{ position: 'absolute', right: 10 }} name={selected  ? "checksquare" : "checksquareo"} size={30} color={!selected ? Colors.seperatorGray : Colors.primary} />

            </View>
        </View>)
    }

    // Heading of the type of product
    const selectHeading = () => {
        switch (service) {
            case 'Milk':
                return 'Choose Milk Products'

            case 'Paper':
                return 'Choose Newspapers'

            case 'Home':
                return 'Choose Home Scrap Items'

            case 'Office':
                return 'Choose Corporate Scrap Items'

        }
    }
    const selectData = () => {
        switch (service) {
            case 'Milk':
                return milkProducts

            case 'Paper':
                return paperProducts

            case 'Home':
                return homeProducts

            case 'Office':
                return officeProducts

        }
    }





    return (<View style={{ ...StyleSheet.absoluteFill }}>
        <AppBar back={false} funct={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
        <View style={{ height: dimen.height / 12 }} />
        <Text style={style.text}>What services do you offer?</Text>
        <View style={{ paddingHorizontal: 10 }}>
            <ScrollView>

                <View style={{ flexDirection: 'row', padding: '1%', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ ...style.checkableText, width: width }}>{words.milkDelivery}</Text>
                    <View style={{ opacity: check1 ? 1 : 0 }}>
                        <Button text='Select' onTouch={() => {
                            // { addProducts() }

                            setService('Milk');

                            toggleProducts(true)
                        }} />
                    </View>
                    <View>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => { setCheck1(!check1); console.log(check1) }}>
                            {CheckBox(check1)}
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={Styles.grayfullline} />

                <View style={{ flexDirection: 'row', padding: '1%', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ ...style.checkableText, width: width }}>{words.newspaperDelivery}</Text>
                    <View style={{ opacity: check2 ? 1 : 0 }}>
                        <Button text='Select' onTouch={() => {
                            // { addProducts() }
                            setService('Paper');
                            toggleProducts(true);
                        }} />
                    </View>
                    <View>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => { setCheck2(!check2) }}>
                            {CheckBox(check2)}
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={Styles.grayfullline} />
                <View style={{ flexDirection: 'row', padding: '1%', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ ...style.checkableText, width: width }}>{words.homescrapCollection}</Text>
                    <View style={{ opacity: check3 ? 1 : 0 }}>
                        <Button text='Select' onTouch={() => {
                            // { addProducts() }
                            setService('Home');
                            toggleProducts(true);
                        }} />
                    </View>
                    <View>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => { setCheck3(!check3); console.log(check1) }}>
                            {CheckBox(check3)}
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={Styles.grayfullline} />

                <View style={{ flexDirection: 'row', padding: '1%', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text onLayout={({ nativeEvent }) => { setWidth(nativeEvent.layout.width) }} style={style.checkableText}>{words.officescrapCollection}</Text>
                    <View style={{ opacity: check4 ? 1 : 0 }}>
                        <Button text='Select' onTouch={() => {
                            // { addProducts() }
                            setService('Office');
                            toggleProducts(true);
                        }} />
                    </View>
                    <View>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => { setCheck4(!check4); console.log(check1) }}>
                            {CheckBox(check4)}
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>

        <Animated.View style={{ width: dimen.width, height: dimen.height, zIndex: 100, elevation: 10, position: 'absolute', bottom: 0, transform: [{ translateY: translateCart }] }} >
            {/*Background blur*/}
            <View style={{ flex: 1, width: '100%', backgroundColor: 'rgba(255,255,255,0.7)', zIndex: 1000 }} onTouchEnd={() => {

                toggleProducts(false)
            }} />
            {/*Bottom Sheet*/}
            <View style={{ flex: 7, backgroundColor: 'white' }}>
                <Text style={{ ...Styles.heading, alignSelf: 'center', textAlign: 'center', padding: 10 }}>{selectHeading()}</Text>
                <TextInput placeholder='Enter search value' style={{backgroundColor: Colors.whiteBackground,padding:'1%',borderRadius:50,height:dimen.height/20,margin: '5%'}}/>

                <FlatList style={Styles.productList}
                    data={selectData()}
                    renderItem={({ item }) => {
                        //   return(<Text>{item.name}</Text>)
                        return (<VendorSelectProduct name={service == 'Office' ? item.officescrap_category_name : item.name} imageURL={item.product_image_url} product_id={item.id}/>)
                    }}

                    keyExtractor={(item, index) => index.toString()} />

            </View>

        </Animated.View>
        <View style={{ padding: 10, position: 'absolute', bottom: 0, alignSelf: 'center' }}>
            <SubmitButton text='Submit' onTouch={() => {
                let finalProducts = [];
                var temparr = [];
                if (check1) {
                    temparr.push('milk');
                    let ar = Array.from(selectedMilk);
                    finalProducts =  finalProducts.concat(ar)
                }
                if (check2) {
                    let ar = Array.from(selectedPaper);
                    finalProducts =  finalProducts.concat(ar)
                    temparr.push('newspaper')
                }
                if (check3) {
                    let ar = Array.from(selectedHome);
                    finalProducts =  finalProducts.concat(ar)
                    temparr.push('homescrap')
                }
                if (check4) {
                    let ar = Array.from(selectedOffice);
                    finalProducts =  finalProducts.concat(ar)
                    temparr.push('officescrap')
                }

                if (temparr === [])
                    alert('Please select at least one service');
                else
                    
                { 
                    let set = [];
                    finalProducts = finalProducts.sort()
                    for(let i=1;i<finalProducts.length;i++){
                       if(finalProducts[i]==finalProducts[i-1])
                       { finalProducts.delete(finalProducts[i])}
                        
                    }

                    finalProducts.forEach((i) => {
                        console.log("SET "  +i.name)
                    })
                    submit(temparr);
                
                  }
            }} />
        </View>

    </View>
    );
}

const style = StyleSheet.create({
    mainContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        padding: 10,
        backgroundColor: 'white',

    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        alignSelf: 'center',
        marginBottom: dimen.height / 20,
        width: dimen.width / 1.5,
        textAlign: 'center',
        letterSpacing: 1,
        lineHeight: 25,


        marginTop: 10,
        margin: 5
    },
    line: {
        borderWidth: 0.5,
        borderColor: '#5D5D5D',
        marginTop: 10,

    },
    view: {
        flexDirection: 'row',
        marginTop: 12

    },
    city: {
        marginTop: 5,
        marginStart: 7,
        fontSize: 18
    },
    checkableText: {
        marginStart: 10,
        alignSelf: 'center',
        fontWeight: 'bold',
        color: 'black',

    },
    image: {
        width: 79,
        height: 80,
        position: 'absolute',
        marginStart: '-1%',

        marginTop: '3%'


    }

});