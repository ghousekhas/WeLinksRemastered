import React from 'react';
import {View,StyleSheet,TextInput, Dimensions} from 'react-native';
import {Text} from 'react-native-paper';
import AppBar from '../components/AppBar';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { userDetails } from '../UserDetails';
import SubmitButton from '../components/SubmitButton';

const SupportFAQ = ({navigation}) => {
    const words = {
        allTopics: 'All Topics',
        faq: 'Frequently Asked Questions',
        privacy: 'Privacy Policy',
        terms: 'Terms and Conditions',
        contact: 'Contact Us',
        phone: 'Phone',
        email : 'Email',
        feedback: 'Send Feedback'

    };
    return(<View style={style.container}>
    
     <AppBar 
        toggle={() => {
            navigation.toggleDrawer();
        }} />
      
        <ScrollView>
        <View style={{backgroundColor: 'white',flex:1,marginBottom: '30%'}}>
        
    <Text style={style.heading}>{words.allTopics}</Text>

    <View style={{borderWidth: 0.5,marginTop: '5%'}}/>

    <View>
        <TouchableOpacity>
        <View style={{flexDirection: 'row',margin: '5%',marginTop: '7%'}}>

        <View style={{marginTop: '1%'}}>
        <Icon 
                                name="help-circle-outline" 
                                color='gray'
                                
                                size={22}
                                />
        </View>
      

    <View style={{flexDirection: 'column'}}>
      
        <Text style={{...style.blackText,fontWeight: 'bold', color: 'gray',marginTop: '2%',marginStart: '10%'}}>{words.faq}</Text>
       
    </View>
    <View style={{position: 'absolute',right: 8,top: 8}}>

    <Icon 
                                name="chevron-right" 
                                color='#00C99D'
                                
                                size={20}
                                />

    </View>

  
        </View>
            
            
        </TouchableOpacity>

    </View>


    <View>
        <TouchableOpacity>
        <View style={{flexDirection: 'row',margin: '5%',marginTop: '1%'}}>

        <View style={{marginTop: '1%'}}>
        <Icon 
                                name="shield-outline" 
                                color='gray'
                                
                                size={22}
                                />
        </View>
        

      

    <View style={{flexDirection: 'column'}}>
      
        <Text style={{...style.blackText,fontWeight: 'bold', color: 'gray',marginTop: '4%',marginStart: '15%'}}>{words.privacy}</Text>
       
    </View>
    <View style={{position: 'absolute',right: 8,top: 8}}>

    <Icon 
                                name="chevron-right" 
                                color='#00C99D'
                                
                                size={20}
                                />

    </View>

  
        </View>
            
            
        </TouchableOpacity>


    </View>


{/**/ }


    <View>
        <TouchableOpacity>
        <View style={{flexDirection: 'row',margin: '5%',marginTop: '1%'}}>

        <View style={{marginTop: '1%'}}>
        <Icon 
                                name="file-document-outline" 
                                color='gray'
                                
                                size={22}
                                />
        </View>
      

    <View style={{flexDirection: 'column'}}>
      
        <Text style={{...style.blackText,fontWeight: 'bold', color: 'gray',marginTop: '3%',marginStart: '10%'}}>{words.terms}</Text>
       
    </View>
    <View style={{position: 'absolute',right: 8,top: 8}}>

    <Icon 
                                name="chevron-right" 
                                color='#00C99D'
                                
                                size={20}
                                />

    </View>

  
        </View>
            
            
        </TouchableOpacity>

    </View>
    <View style={{borderWidth: 0.5,marginTop: '5%'}}/>


    {/**/}

    <View>
        <TouchableOpacity>
        <View style={{flexDirection: 'row',margin: '5%',marginTop: '7%'}}>

        <View style={{marginTop: '1%'}}>
        <Icon 
                                name="information-outline" 
                                color='gray'
                                
                                size={22}
                                />
        </View>
      

    <View style={{flexDirection: 'column'}}>
      
        <Text style={{...style.blackText,fontWeight: 'bold', color: 'gray',marginTop: '3%',marginStart: '15%'}}>{words.contact}</Text>
       
    </View>
  

  
        </View>
            
            
        </TouchableOpacity>

    </View>

    <View>
        <TouchableOpacity>
        <View style={{flexDirection: 'row',margin: '5%',marginTop: '1%'}}>

        <View style={{marginTop: '1%',marginStart: '10%'}}>
        <Icon 
                                name="phone-outline" 
                                color='gray'
                                
                                size={22}
                                />
        </View>
      

    <View style={{flexDirection: 'column'}}>
      
        <Text style={{...style.blackText,fontWeight: 'bold', color: 'gray',marginTop: '5%',marginStart: '17%'}}>{words.phone}</Text>
       
    </View>
    <View style={{position: 'absolute',right: 8,top: 8}}>

    <Icon 
                                name="chevron-right" 
                                color='#00C99D'
                                
                                size={20}
                                />

    </View>

  
        </View>
            
            
        </TouchableOpacity>

    </View>



    <View>
        <TouchableOpacity>
        <View style={{flexDirection: 'row',margin: '5%',marginTop: '1%'}}>

        <View style={{marginTop: '1%',marginStart: '10%'}}>
        <Icon 
                                name="email-edit-outline" 
                                color='gray'
                                
                                size={22}
                                />
        </View>
      

    <View style={{flexDirection: 'column'}}>
      
        <Text style={{...style.blackText,fontWeight: 'bold', color: 'gray',marginTop: '5%',marginStart: '17%'}}>{words.email}</Text>
       
    </View>
    <View style={{position: 'absolute',right: 8,top: 8}}>

    <Icon 
                                name="chevron-right" 
                                color='#00C99D'
                                
                                size={20}
                                />

    </View>

  
        </View>
            
            
        </TouchableOpacity>

    </View>

    <View style={{borderWidth: 0.5,marginTop: '5%'}}/>

    {/*Feedback*/}
    <View>
    <View style={{flexDirection: 'row',margin: '5%',marginTop: '1%'}}>

<View style={{marginTop: '4%'}}>
<Icon 
                        name="information-outline" 
                        color='gray'
                        
                        size={22}
                        />
</View>


<View style={{flexDirection: 'column'}}>

<Text style={{...style.blackText,fontWeight: 'bold', color: 'gray',marginTop: '14%',marginStart: '17%'}}>{words.feedback}</Text>

</View>


</View>

<TextInput style={style.feedback}
multiline>

</TextInput>

<View style={{marginTop: '2%'}}>
<SubmitButton text='Send Feedback' />
</View>



</View>

  
    

    </View>
    </ScrollView>



    </View>)
};

const style = StyleSheet.create({
    container: {
        backgroundColor:'white',
       
        
    },
    heading: {
        fontSize: 22,
        color: 'black',
        fontWeight: '900',
        margin: '2%',
        marginTop: '20%',
        marginStart: '3%'
    },
    blackText: {
        margin: '1%',
        fontWeight: 'bold',
   
        fontSize: 14,
      
        marginTop: '1%'
    },
    feedback: {
        borderWidth: 1,
        width: Dimensions.get('window').width-30,
      
       
      
        borderRadius: 10,
        margin: '3%',
       
        alignSelf: 'center',
        flex: 1
     
    }
});

export default SupportFAQ;