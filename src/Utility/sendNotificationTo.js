import functions from '@react-native-firebase/functions';
import {notification_identifiers} from '../Constants';
export default function sendNotif(title,message,to,id = notification_identifiers.misc ){
    functions().httpsCallable('sendNotification')({
        'title': title,
        'message': id,
        'body': message,
        'topic': to
      }).then(
        (response) =>{
          console.log('aoijsoiajsoiajoi');
          console.log("Notif response "+JSON.stringify(response));
        },(reason)=>{
          console.log('doifjdoijf');
          console.log(reason);
        }
      );
}