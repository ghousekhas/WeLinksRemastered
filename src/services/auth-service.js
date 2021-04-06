import React, {useState, useContext, useEffect, ReactDOM} from 'react';
import auth from '@react-native-firebase/auth';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import {Config, Constants} from '../Constants';
import qs from 'qs';
import App from '../../App';

export const AuthConstants = {
    saved_user: "saved_user",
    phone_unverified: 1,
    phone_verified: 2,
    new_user: 3,
    loading: 4,
    errored: 5,
    saved_vendor: "saved_vendor"

}


export const AuthContext = React.createContext({user: auth().currentUser,
                                                sync: ()=>{}});

export default function AuthProvider({children}){
    const [user, setUser ] = useState(AuthConstants.loading);
    const [vendor, setVendor] = useState(AuthConstants.loading);
    const debug = false;
    const debugNumber = "8548080245";


    const checkUserAccounts = () =>{
      NetInfo.addEventListener((state) =>{
        if(state.isInternetReachable)
          checkFirstTime();
        else
          setUser(AuthConstants.errored);
      })
    } 

    const logout = ()=>{
     
      auth().signOut();
      setUser(AuthConstants.phone_unverified);
      AsyncStorage.removeItem(AuthConstants.saved_user);
      AsyncStorage.removeItem(AuthConstants.saved_vendor,)
      checkUserAccounts();

    }



    const syncAndCacheUser = async ()=>{
      try{
        if(user == AuthConstants.phone_verified)
          setUser(AuthConstants.loading);
        const result = ( await ( Axios.get(Config.api_url + 'php?' + qs.stringify({
          action: "getUser",
          phone: debug ?  debugNumber : auth().currentUser.phoneNumber.substring(3)
        })))).data;
        if(result.user[0].status_code != 100){
          setUser(result.user[0]);
          //Caching? 
          AsyncStorage.setItem(AuthConstants.saved_user, JSON.stringify(result.user[0]));
          //Vendor
          try{
            const result = (await (Axios.get(Config.api_url + 'php?action=getVendorStatus&user_id=' + result.user[0].user_id))).data;
            setVendor(result);
              if(result.vendor[0].vendor_status === "active"){
                try{
                  const result1 = ( await ( Axios.get(Config.api_url + 'php?' + qs.stringify({
                    action: "getVendor",
                    user_id: user.user_id
                  })))).data;
                  if(result1.vendor.status_code != 100){
                    setVendor(result1.vendor);
                    //Caching? 
                    AsyncStorage.setItem(AuthConstants.saved_vendor, JSON.stringify(result1.vendor));
                  }
                  else
                    setVendor(AuthConstants.new_user);
                }
                catch(error){
                  setVendor(AuthConstants.errored);
                }
            }
            else if(result.vendor[0].vendor_status === "inprogress"){
              setVendor(Constants.veInProgress);
            }
            else{
              setVendor(Constants.veTryAgain);
            }
          
        
          }
          catch(r){
            setVendor({vendor_status: Constants.veFirstTime})
          }
          
         

        }
        else{
          setUser(AuthConstants.phone_verified);
          AsyncStorage.removeItem(AuthConstants.saved_user);
          AsyncStorage.removeItem(AuthConstants.saved_vendor);
        }
      }
      catch(error){
        setUser(AuthConstants.errored);
      }

      //sync and cache vendor
     

      


    }

    const checkFirstTime = async  () =>{
        const saved_user = await AsyncStorage.getItem(AuthConstants.saved_user);

        // if(debug)
        //   syncAndCacheUser();

        if(auth().currentUser == null && debug == false){
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
        else
          syncAndCacheUser();     

        try{
          const saved_vendor = await AsyncStorage.getItem(AuthConstants.saved_vendor);
          if(saved_vendor != null && saved_vendor != undefined)
            try{
              setVendor(JSON.parse(saved_vendor))
            }
            catch(error){

            }
        }
        catch(error){}

        syncAndCacheUser();
    }

    useEffect(()=>{
        checkUserAccounts();
        auth().onAuthStateChanged((user)=>{
            if(user != null){
              //setUser(AuthConstants.phone_verified);
              checkUserAccounts();
            }
        });
    },[])

    return (
        <AuthContext.Provider value={{user: user,
                                      vendor: vendor,
                                      phone: debug  ? debugNumber : auth().currentUser != null ?  auth().currentUser.phoneNumber.substring(3) : null,
                                      sync: syncAndCacheUser,
                                      logout: logout,
                                      checkFirstTime: checkFirstTime
                                      }} >
          <App/>
        </AuthContext.Provider>
    );
}

export const useAuth = ()=>{
    return useContext(AuthContext);
}