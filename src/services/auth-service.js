import React, {useState, useContext, useEffect, ReactDOM} from 'react';
import auth from '@react-native-firebase/auth';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import {Config} from '../Constants';
import qs from 'qs';
import App from '../../App';

export const AuthConstants = {
    saved_user: "saved_user",
    phone_unverified: 1,
    phone_verified: 2,
    new_user: 3,
    loading: 4,
    errored: 5

}


export const AuthContext = React.createContext({user: auth().currentUser,
                                                sync: ()=>{}});

export default function AuthProvider({children}){
    const [user, setUser ] = useState(AuthConstants.loading);


    const checkUserAccounts = () =>{
      NetInfo.addEventListener((state) =>{
        if(state.isInternetReachable)
          checkFirstTime();
        else
          setUser(AuthConstants.errored);
      })
    } 

    const syncAndCacheUser = async ()=>{
      try{
        const result = ( await ( Axios.get(Config.api_url + 'php?' + qs.stringify({
          action: "getUser",
         // id: 96
         phone: auth().currentUser.phoneNumber.substring(3)
        })))).data;
        if(result.user[0].status_code != 100){
          setUser(result.user[0]);
          //Caching? 
          AsyncStorage.setItem(AuthConstants.saved_user, JSON.stringify(result.user[0]));
        }
        else
          setUser(AuthConstants.new_user);
      }
      catch(error){
        setUser(AuthConstants.errored);
      }


    }

    const checkFirstTime = async  () =>{
        const saved_user = await AsyncStorage.getItem(AuthConstants.saved_user);

        if(auth().currentUser == null){
          setUser(AuthConstants.phone_unverified);
          if(saved_user != null)
            AsyncStorage.removeItem(AuthConstants.saved_user, (error)=>{});
          return; 
        }
        else if(saved_user != null || saved_user != undefined)
          try{
            setUser(JSON.parse(saved_user));
          }
          catch(err){//The next line fetches user from the database anyway
          }     
        syncAndCacheUser();
    }

    useEffect(()=>{
        checkUserAccounts();
    },[])

    return (
        <AuthContext.Provider value={{user: user,
                                      sync: syncAndCacheUser}} >
          <App/>
        </AuthContext.Provider>
    );
}

export const useAuth = ()=>{
    return useContext(AuthContext);
}