import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import {dimen} from '../Constants';

var stars = [];


//each rating is a number from 1 to 5 representing stars given.
export default function RatingComponent({starChanged = (rating)=>{}, initRatings = 0 ,numStars = 5}){
    const [ratingStars, setRatingStars] = useState(stars);
    const [remountKey, remount] = useState('abc');

    useEffect(()=>{
        for (var i = 0; i < numStars; i++)
            if(i >= initRatings)
                stars.push(false);
            else 
                stars.push(true);
        setRatingStars(stars);
    },[]);

    const starTouched = (index)=>{
        starChanged(index+1);
        for(var i = 0; i< numStars; i++)
            if(i <=index)
                stars[i] = true;
            else 
                stars[i]= false;
        setRatingStars(stars);
        remount(Math.random(0.3).toString());
    }

    return (
        <View style={style.container} key = {remountKey}>
            {
                ratingStars.map((star, index)=>{
                    return (
                       
                    <TouchableOpacity onPress={()=> {
                        starTouched(index);
                        }}>
                        
                        <Entypo name ={ star ? "star" : "star-outlined"} color = { star ? "#FFFF00" : "#B3B3B3" } size={50}/>
                        {star ? 
                        (<View style={{position: 'absolute'}}>
                        <Entypo name = "star-outlined" color = "#686970" size = {50}/>
                        </View>) : null }
                    </TouchableOpacity> 
                    );
                })
            }
        </View>
    )


}

const style = StyleSheet.create({
    container:{
        width: '90%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 50,
        paddingVertical: dimen.sVm,
        marginVertical: dimen.sVm
    },
    starContainer:{
        flex: 1,
        marginHorizontal: dimen.sHm
    }
});