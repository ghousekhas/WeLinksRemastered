import React,{useState,useEffect} from 'react';
import {View,StyleSheet,Image,Text, Dimensions} from 'react-native';
import {Styles} from '../Constants';
import Accordion  from 'react-native-collapsible/Accordion';
import Vendor from '../components/Vendor';
import ProductOne from '../components/ProductOne';
import { FlatList, TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import {Config} from  '../Constants';

export default class MilkVendor extends React.Component{

    constructor(props){
        super(props);
            this.state={
                brangImagesdata: [1,2,3,4],
                sections: [{one: 1,two: 2},{one: 1,two: 2},{one: 1,two: 2},{one: 1,two: 2}],
                collapsed: true,
                activesections: []
                                
            };
    }

    componentDidMount(){
        console.log('MilkVendorEntered')
        Axios.get(Config.api_url+'php?action=getProductsList&vendorID=1&vendor_type=milk',{}
        ).then((result) => {
            console.log(result);
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
        //console.log(sections);
        setTimeout(()=>{
        if(sections.length!=0)
        this.scrollView.scrollTo({
            x: 0,
            y: (Dimensions.get('window').height/9-20)*(sections[0]),
            animated: true
        });
        },1000);
      };
    
    renderItem=(item)=>{
        return(
            <Image style={Styles.horizontalImage}/>
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
            <Text style={Styles.collapsedText}>collapsedText</Text>
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
                <FlatList style={Styles.productList}
                renderItem={(item)=>{
                    return(<ProductOne style={Styles.vendorflat}/>)
                }}
                data={[1,2,3,4,5,6,7]}
                keyExtractor={(item,index)=> index.toString()}/>

        </Animatable.View>
        );
    };

    rendCont=(section,_,isactive)=>{
        return(
            <View style={{height:300,width:300}}>

            </View>
        )
    }

    render(){
    return (
        <View style={{...Styles.parentContainer}}>
            <View style={Styles.fortyUpperPanel}>
                <View style={{...Styles.horizontal}} >
                    <Image style={Styles.vendorImage} />
                    <View style={{...Styles.vendorInfo}}>
                        {/* <Vendor /> */}
                    </View>
                </View>
                <FlatList
                    style={Styles.halfFlatlist}
                    renderItem={this.renderItem}
                    data={[1,2,3,4,5,6,7,8,9]}
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