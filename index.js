import { registerRootComponent } from 'expo';

import App from './App';
import AuthApp from './AuthApp';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import { firebase } from '@react-native-firebase/auth';
import {Notifications} from 'react-native-notifications';
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
messaging().subscribeToTopic("all");

//Callback on message recieved from firebase function (WeLinks Google account) check function in firebaseFunctions in parent folder
messaging().onMessage((message)=>{
    console.log('sdisodiji');
    console.log(message);
    Notifications.registerRemoteNotifications();
    Notifications.postLocalNotification({
        identifier: message.data.body,
        body: message.notification.body,
        title: message.data.title,
        sound: 'chime.aiff',
        category: 'SOME_CATEGORY',
        link: 'localNotificationLink',
        fireDate: new Date()
      }, Math.random(0.3));
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



registerRootComponent(AuthApp);
