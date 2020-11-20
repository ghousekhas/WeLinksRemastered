import { registerRootComponent } from 'expo';

import App from './App';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import { firebase } from '@react-native-firebase/auth';
import {Notifications} from 'react-native-notifications';
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
messaging().subscribeToTopic("all");

messaging().onMessage((message)=>{
    Notifications.registerRemoteNotifications();
    Notifications.postLocalNotification({
        body: 'hey your order is waiting !',
        title: 'Go collect scrap buddy',
        sound: 'chime.aiff',
        category: 'SOME_CATEGORY',
        link: 'localNotificationLink',
        fireDate: new Date()
      }, 2);
});

messaging().setBackgroundMessageHandler((message)=>{
    console.log(message);
});

//for notifications
PushNotification.configure({
    onRegister: (token)=>{
        console.log('token',token);
    },
    onNotification: (notification)=>{
        console.log(notification);
    }
})



registerRootComponent(App);
