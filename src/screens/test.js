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


export default function VendorServices({ submit }) {
    const navigation = useNavigation();

    const words = {
        milkDelivery: 'Milk Delivery',
        newspaperDelivery: 'Newspaper Delivery',
        homescrapCollection: 'Home Scrap Collection',
        officescrapCollection: 'Office Scrap Collection'

    }
// Final selected sets
    // let selectedMilk = new Set();
    // let selectedPaper = new Set();
    // let selectedHome = new Set();
    // let selectedOffice = new Set();

    const [selectedMilk,setSM] = useState(new Set());
    const [selectedPaper,setSP] = useState(new Set());




    const [service, setService] = useState(''); // Selected service

    const [translateCart, setTranslateCart] = useState(new Animated.Value((dimen.height - dimen.height / 16)));
   
    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);
    const [check3, setCheck3] = useState(false);
    const [check4, setCheck4] = useState(false);

    const [width, setWidth] = useState(0);
    let list = [];
    let available = new Set();

    const addProducts = () => {
        list = Array.from(available);

        switch (service) {
            case 'Milk':
                setSMP(list);
                break;
            case 'Paper':
                setSPP(list);
                break;
            case 'Home':
                setSHP(list);
                break;
            case 'Office':
               setSOP(list);
                break;

        }





        // console.log('LIST_M: ');
        // SelectedMilkProducts.forEach((p) => {
        //     console.log(p.name);
        // });
        // console.log('LIST_P: ');
        // SelectedPaperProducts.forEach((p) => {
        //     console.log(p.name);
        // });
        // console.log('LIST_H: ');
        // SelectedHomeProducts.forEach((p) => {
        //     console.log(p.name);
        // })
        // console.log('LIST_O: ');
        // SelectedOfficeProducts.forEach((p) => {
        //     console.log(p.name);
        // })
    }

    


   

    const [milkProducts, setMilkProducts] = useState([
        {
            name: 'Nandini Toned',
            image: 'https://reactnative.dev/img/tiny_logo.png',
            in: 0


        }, {
            name: 'Heritage',
            image: 'https://reactnative.dev/img/tiny_logo.png',
            in: 0
        }, {
            name: 'Amul',
            image: 'https://reactnative.dev/img/tiny_logo.png',
            in: 0
        }, {
            name: 'Mother Dairy',
            image: 'https://reactnative.dev/img/tiny_logo.png',
            in: 0
        }

    ]);
    const [paperProducts, setPaperProducts] = useState([
        {
            name: 'Times',
            image: 'https://reactnative.dev/img/tiny_logo.png',
            in: 0


        }, {
            name: 'Hindu',
            image: 'https://reactnative.dev/img/tiny_logo.png',
            in: 0
        }, {
            name: 'Indian Express',
            image: 'https://reactnative.dev/img/tiny_logo.png',
            in: 0
        }, {
            name: 'Deccan Herald',
            image: 'https://reactnative.dev/img/tiny_logo.png',
            in: 0
        }

    ]);

    const [homeProducts, setHomeProducts] = useState([
        {
            name: 'Phone',
            image: 'https://reactnative.dev/img/tiny_logo.png',
            in: 0


        }, {
            name: 'Newspapers',
            image: 'https://reactnative.dev/img/tiny_logo.png',
            in: 0
        }, {
            name: 'Electronics',
            image: 'https://reactnative.dev/img/tiny_logo.png',
            in: 0
        }
    ]);
    const [officeProducts, setOfficeProducts] = useState([
        {
            name: 'Metal',
            image: 'https://reactnative.dev/img/tiny_logo.png',
            in: 0


        }, {
            name: 'Plastic',
            image: 'https://reactnative.dev/img/tiny_logo.png',
            in: 0
        }

    ]);
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
    const VendorSelectProduct = ({ name, imageURL }) => {

        const [selected, setSelected] = useState(false);
        const adding = (name, imageURL) => {
            
            switch(service){
                case 'Milk':
                    if (!selected) {
                        let obj = {
                            name,
                            imageURL
                        };
                        //selectedMilk.add(obj);
                        setSM(new Set(selectedMilk).add(obj));
                      
        
                    }
                    else if (selected) {
                        selectedMilk.forEach((product) => {
                            if (product.name == name)
                            setSM(new Set(selectedMilk.delete(product)));
                             //   selectedMilk.delete(product)
                        });
                        //          list = Array.from(available);
        
        
                    }
                    break;
                case 'Paper' :
                    if (!selected) {
                        let obj = {
                            name,
                            imageURL
                        };
                   //     selectedPaper.add(obj);
                        //       list = Array.from(smp);
        
                    }
                    else if (selected) {
                   //     selectedPaper.forEach((product) => {
                     //       if (product.name == name)
                       //         selectedPaper.delete(product)
                       // });
                        //          list = Array.from(available);
        
        
                    }
                   break;
                }
            //     case 'Home' : 
            //     if (!selected) {
            //         let obj = {
            //             name,
            //             imageURL
            //         };
            //         selectedHome.add(obj);
            //         //       list = Array.from(smp);
    
            //     }
            //     else if (selected) {
            //         selectedHome.forEach((product) => {
            //             if (product.name == name)
            //                 selectedHome.delete(product)
            //         });
            //         //          list = Array.from(available);
    
    
            //     }
            //     break;
            // case 'Office' :
            //     if (!selected) {
            //         let obj = {
            //             name,
            //             imageURL
            //         };
            //         selectedOffice.add(obj);
            //         //       list = Array.from(smp);
    
            //     }
            //     else if (selected) {
            //         selectedOffice.forEach((product) => {
            //             if (product.name == name)
            //                 selectedOffice.delete(product)
            //         });
            //         //          list = Array.from(available);
    
    
            //     }
            //     break;
            // }
           

           console.log('Milk: \n');
           selectedMilk.forEach((p) => {
               console.log(p.name);
           });
           console.log('Paper: \n');
           selectedPaper.forEach((p) => {
               console.log(p.name);
           });
        //    console.log('Home: \n');
        //    selectedHome.forEach((p) => {
        //        console.log(p.name);
        //    });
        //    console.log('Office: \n');
        //    selectedOffice.forEach((p) => {
        //        console.log(p.name);
        //    });
           

            

        }


        return (<View style={{ flexDirection: 'row', marginVertical: '2%', margin: '1%', backgroundColor: Colors.whiteBackground, height: dimen.height / 8 }}>
            <Image style={style.image} source={{ uri: imageURL }} />

            <View style={{ alignSelf: 'center', flex: 1, flexDirection: 'row', marginStart: 80 }}>
                <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>{name}</Text>
                <AntDesign onPress={() => {
                    setSelected(!selected);
                    adding(name, imageURL);
                }} style={{ position: 'absolute', right: 10 }} name={selected ? "checksquare" : "checksquareo"} size={30} color={!selected ? Colors.seperatorGray : Colors.primary} />

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

                <FlatList style={Styles.productList}
                    data={selectData()}
                    renderItem={({ item }) => {
                        //   return(<Text>{item.name}</Text>)
                        return (<VendorSelectProduct name={item.name} imageURL={item.image} />)
                    }}

                    keyExtractor={(item, index) => index.toString()} />

            </View>

        </Animated.View>
        <View style={{ padding: 10, position: 'absolute', bottom: 0, alignSelf: 'center' }}>
            <SubmitButton text='Submit' onTouch={() => {
                var temparr = [];
                if (check1) {
                    temparr.push('milk');
                }
                if (check2) {

                    temparr.push('newspaper')
                }
                if (check3) {
                    temparr.push('homescrap')
                }
                if (check4) {
                    temparr.push('officescrap')
                }

                if (temparr === [])
                    alert('Please select at least one service');
                else
                    submit(temparr);
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