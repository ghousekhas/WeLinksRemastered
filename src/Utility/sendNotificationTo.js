import functions from '@react-native-firebase/functions';
export default function sendNotif(title,message,to){
    functions().httpsCallable('sendNotification')({
        'title': title,
        'message': message,
        'body': message,
        'topic': to
      }).then(
        (response) =>{
          console.log(response);
        },(reason)=>{
          console.log(reason);
        }
      );
}