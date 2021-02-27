import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import {dimen, strings_screen} from '../Constants';




//each rating is a number from 1 to 5 representing stars given.
export default function RatingComponent({starChanged = (rating)=>{}, initRatings = 0 ,numStars = 5}){
    const [ratingStars, setRatingStars] = useState([]);

    useEffect(()=>{
        const stars = [];
        for (var i = 0; i < numStars; i++)
            stars.push( i < initRatings )
        setRatingStars(stars);
    },[]);

    const starTouched = (index)=>{
        starChanged(index+1);
        const stars = [];
        for(var i = 0; i< numStars; i++)
            stars.push( i<= index);
        setRatingStars(stars);

    }

    return (
        <View style={style.container} >
            {
                ratingStars.map((star, index)=>{
                    return (
                        <TouchableOpacity  onPress={()=> starTouched(index)}>
                            <Entypo  name ={ star ? "star" : "star-outlined"} color = { star ? "#FFFF00" : "#B3B3B3" } size={50}/>
                            {star ? <Entypo style={{position: 'absolute'}}  name = "star-outlined" color = "#686970" size = {50}/> : null }
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