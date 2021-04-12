import * as React from 'react';
import { useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MyScrapSales from '../screens/MyScrapSales';
import MyScrapSaleOrder from '../screens/MyScrapSaleOrder';

const MyScrapStack = ({ navigation, route }) => {
    const [user, setUser] = useState(route.params.user);
    const {getUserDetails } = route.params;
    const [remountKey, setRemountKey] = useState(0);
  
    return (
      <View style={{ flex: 1 }}>
        <NavigationContainer independent={true}>
          <Stack.Navigator initialRouteName="Profile">
            <Stack.Screen name="MyScrapSales" component={MyScrapSales} key={remountKey.toString()} options={{ headerShown: false }} initialParams={{ ...route.params, user: user }} />
            <Stack.Screen name="MyScrapSaleOrder" component={MyScrapSaleOrder} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>)
  
  
  }

  export default MyScrapStack;