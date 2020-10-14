import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Axios from 'axios';
import { MuiPickersUtilsProvider,DateTimePicker, KeyboardDateTimePicker } from '@material-ui/pickers';
import {Autocomplete} from '@material-ui/lab'
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import { TextField,CardHeader } from '@material-ui/core';
import MicrosoftLogin from 'react-microsoft-login';
import * as qs from 'querystring';
import {SecondaryButton, PrimaryButton, TextArea, PanelHeader } from 'msteams-ui-components-react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import copy from 'copy-to-clipboard';
import { join } from 'path';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function App() {
  const [date,setDate]=useState(1);
  const [course,setCourse]=useState('');
  const [dourse,setDourse]=useState('');
  const [units,setUnits]=useState([]);
  const [title,setTitle]=useState('');
  const [startDateState,setStartDate]=useState(moment().toDate());
  const [endDate,setEndDate]=useState(moment().toDate())
  const [token,setToken]=useState('');
  const [login,setLogin]=useState(0);
  const [edxToken,setEdxToken]=useState('');
  const [users,setUsers]=useState([0]);
  const [userEmails,setUserEmails]=useState([0]);
  const [joinUrl,setJoinUrl]=useState('');
  const [description,setDescription]=useState('');
  const [open,setOpen]=useState(false);
  const [course_id,setCourseId]=useState('');
  const [unitIndex,setUnitIndex]=useState('');
  var linkRef= React.createRef();
  var a,b,c,d;
  var loginRef=React.createRef();
  const [courses,setCourses]=useState(['']);
  //var token='eyJ0eXAiOiJKV1QiLCJub25jZSI6Ii1lenZEMVcteW9OT1JlOEhiT2VnaVNtM0JFWk52RVN4UkxPXzQ2MlFmOUkiLCJhbGciOiJSUzI1NiIsIng1dCI6ImppYk5ia0ZTU2JteFBZck45Q0ZxUms0SzRndyIsImtpZCI6ImppYk5ia0ZTU2JteFBZck45Q0ZxUms0SzRndyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC82ZjM2NDRlOC03YjcxLTQ3OTgtODA5MS00MGZhOWU4MDQ4ZDYvIiwiaWF0IjoxNTk5NzQ2NTA2LCJuYmYiOjE1OTk3NDY1MDYsImV4cCI6MTU5OTc1MDQwNiwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFTUUEyLzhRQUFBQS81T2hDcnErUS9EeXF5d2I0YzJ5VWRpU2FEbWt6TWFyL1RjNGVhSk00UHc9IiwiYW1yIjpbInB3ZCJdLCJhcHBfZGlzcGxheW5hbWUiOiJHcmFwaCBleHBsb3JlciAob2ZmaWNpYWwgc2l0ZSkiLCJhcHBpZCI6ImRlOGJjOGI1LWQ5ZjktNDhiMS1hOGFkLWI3NDhkYTcyNTA2NCIsImFwcGlkYWNyIjoiMCIsImdpdmVuX25hbWUiOiJMYXhtaSIsImlkdHlwIjoidXNlciIsImlwYWRkciI6IjEwNi41MS4yNDMuMzYiLCJuYW1lIjoiTGF4bWkiLCJvaWQiOiIyYWIwODNiMi0zYzNkLTQ0NWEtOTcwNC04MzY2NmRmYzg2MTYiLCJwbGF0ZiI6IjE0IiwicHVpZCI6IjEwMDMyMDAwRDI3RjREOEIiLCJyaCI6IjAuQUFBQTZFUTJiM0Y3bUVlQWtVRDZub0JJMXJYSWk5NzUyYkZJcUsyM1NOcHlVR1FZQUlFLiIsInNjcCI6IkNhbGVuZGFycy5SZWFkV3JpdGUgb3BlbmlkIHByb2ZpbGUgVXNlci5SZWFkIGVtYWlsIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoiYmN4aTVzZ1VZUFJvai1zdmFTcWtLMWg4MndVX0drSDBjcWxtLWM5Q1ZpSSIsInRlbmFudF9yZWdpb25fc2NvcGUiOiJOQSIsInRpZCI6IjZmMzY0NGU4LTdiNzEtNDc5OC04MDkxLTQwZmE5ZTgwNDhkNiIsInVuaXF1ZV9uYW1lIjoiTGF4bWlAdnRlYW1sYWJzLmNvbSIsInVwbiI6IkxheG1pQHZ0ZWFtbGFicy5jb20iLCJ1dGkiOiJIc2xLbDlJVVAweWIyeXh5aVFFYkFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXSwieG1zX3N0Ijp7InN1YiI6IlVvSkFuQjFIa2EwWFZYT1pZM3pzTmxsZXpzNzJCTUYxancyTzVtMzUwcW8ifSwieG1zX3RjZHQiOjE0NDM0MjA2MDR9.wTRSUxLd6bRGzMt6qrk8MxLxEKwU9GxRa_Hcveqh_2_1XLCzyPRh3uhUP_3JIE6yj5uKCrIXDBmLmwrs5ein7mMFEW7oGLG9HmQ9DPxVW_urq2npfopL9w8mqDOMMOLE5UbjeAI45AWliKpVQ6DO8GmcN-uVY3hsiRfo4c96AV6eYuYefj9M4mbIDXJDVY2K9kG9tWcBlqp_qjli5AUIDjWLI2uRWqDM9fGv1f8F0HWpFDLaSI2_S8KPP3kRQLzxZYJXtkTzs3TBqM4jrL70llj88pcBu4PtbbGzTHY0jdpaV9c_cSJ-3IEzBvOlfrAM2mBPY6pa5AH1Q3tb5Y5BHA';

  useEffect(()=>{
    var arr=[];
    try{
    Axios.post('https://edxvteam.com/oauth2/access_token',
            qs.stringify(
              {
                grant_type:"client_credentials",
                client_id:"8vD6pKAbjTfgdEtNAKqdUwu0X6Ps574kyBh94Om0",
                client_secret:"ERRuuGZPMsEy8hjBHjFaMZsmDR3SRhXndOjgoiqEseor1p18kktkHSdUExFNFoKlTdWrmrtz2Oc0NyVa9fNASLuckPPRJY0uCXwkg7yEbRfUg8e0rfGetaGt7tuqUqRo",
                token_type:"Bearer" 
              }
            ),
            {
              headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }}).then((response)=>{
              
              
              setEdxToken(response.data.access_token);
            },(error)=>{
              setLogin(6);
              
            })
    }
    catch(e){
      
    }
    if(token == '')
      loginRef.login();
    Axios.get('https://edxvteam.com/api/courses/v1/courses/')
    .then((response)=>{
      arr=response.data.results;
      
      setCourses(arr);
    },(error)=>{
      setLogin(error);
      
    })
    
  },[]);

  const addEvent=()=>{

    const syear  = startDateState.getFullYear();
    const smonth = (startDateState.getMonth() + 1).toString().padStart(2, "0");
    const sday   = startDateState.getDate().toString().padStart(2, "0");
    const shours= startDateState.getHours().toString().padStart(2,"0");
    const sminutes= startDateState.getMinutes().toString().padStart(2,"0")
    const eyear  = endDate.getFullYear();
    const emonth = (endDate.getMonth() + 1).toString().padStart(2, "0");
    const eday   = endDate.getDate().toString().padStart(2, "0");
    const ehours= endDate.getHours().toString().padStart(2,"0");
    const eminutes= endDate.getMinutes().toString().padStart(2,"0")
    //alert(`${startDateState.getFullYear()}-${startDateState.getMonth()}-${startDateState.getDate()}T${startDateState.getHours()}:${startDateState.getMinutes()}:00${endDate.getFullYear()}-${endDate.getMonth()}-${endDate.getDate()}T${endDate.getHours()}:${endDate.getMinutes()}:00`)
    //getEmails
    //Axios.post
    //Add to calendar with emails
    Axios.post('https://graph.microsoft.com/v1.0/groups/48c4a928-f625-4837-90cc-4181c8b9191c/events'
            ,
            {
              subject: title,
              body: {
                contentType: "HTML",
                content: course+' '+dourse+'\n'+description
              },
              start: {
                  dateTime: `${syear}-${smonth}-${sday}T${shours}:${sminutes}:00`,
                  timeZone: "India Standard Time"
              },
              end: {
                  dateTime: `${eyear}-${emonth}-${eday}T${ehours}:${eminutes}:00`,
                  timeZone: "India Standard Time"
              },
              location:{
                  displayName:"Microsoft team"
              },
              attendees: userEmails,
              isOnlineMeeting: true,
              onlineMeetingProvider: "teamsForBusiness"
            },
            {
              headers: { Authorization: `Bearer ${token}` }
          }).then((response)=>{
            console.log(response);
            setJoinUrl(response.data.onlineMeeting.joinUrl);
            var tempUrl=response.data.onlineMeeting.joinUrl;
            setLogin(3);

                Axios.post('https://edxvteam.com/api/discussion/v1/threads/',{
                    course_id: course_id,
                    raw_body: `The class for ${course} titled ${title} for ${dourse} was successfully scheduled from ${startDateState.toString()} to ${endDate.toString()} at \n ${tempUrl} \n Additional Description: ${description}`,
                    type: "discussion",
                    title: title,
                    topic_id: "course"
                  },
                  {
                    headers:{
                      Authorization: `Bearer ${edxToken}`
                    }
                  }).then((response)=>{
                    console.log(response);
                  },(error)=>{console.log(error)})
              
              
            },(error)=>{console.log(error)})
        

  }
  
   
  const clicky=(event)=>{
    a=event.target.value;
    } 

  const authHandler=(err,data)=>{
    try{
      const {accessToken,account,idToken}= data.authResponseWithAccessToken;
      
      if(accessToken!=null){
        setToken(accessToken);
        setLogin(1);
      }
    }
    catch(e){
      
    }
  }

  const dourseChanged=(event,newValue)=>{
    console.log(event,newValue);
    setDourse(newValue.display_name);
    console.log(newValue.name);
    units.forEach((item,index,units)=>{
      if(newValue.block_id==item.block_id){
        setUnitIndex(index);
      }
    });

  }

  const courseChanged=(event,newValue)=>{
    var unitBlocks={};
   // 
    
    setCourse(newValue.name);
    setCourseId(newValue.course_id);
    
    var usernameslist='';
    var usernames=['satishag','satishag87'];
    
    //parallely
    Axios.get('https://edxvteam.com/api/enrollment/v1/enrollments?'+qs.stringify({course_id: newValue.course_id}),{
      headers:{
        Authorization: `Bearer ${edxToken}`
      }
    }).then((response)=>{
      
      if(response.data.results!=undefined){
        setUsers(response.data.results);
        var usersResponse = response.data.results;
        usernames= [];
        usersResponse.forEach((item,index,usersResponse)=>{
          usernames.push(item.user);
        })
        
        usernameslist= '';
        usernames.forEach((item,index,arr)=>{
          if(index<usernames.length-1)
            usernameslist=usernameslist+item+',';
          else
            usernameslist=usernameslist+item;
        });
        
        Axios.get('https://edxvteam.com/api/user/v1/accounts?username='+usernameslist,
        {
          headers:{
          Authorization:`Bearer ${edxToken}`
        }
        }).then((response)=>{
          var responseEmails= response.data;
          var tempArr=[];
          responseEmails.forEach((item,index,responseEmails)=>{
            tempArr.push( {
              emailAddress: {
                address: item.email,
                name: item.name
              },
              type: "required"
            });
          });
          tempArr.push( {
            emailAddress: {
              address: 'ghouse.khasim1@gmail.com',
              name: 'Ghouse Khasim'
            },
            type: "required"
          });
          setUserEmails(tempArr);
        },(error)=>{
          setLogin(6);
          
        })

      }
    },(error)=>{
      
    });
    //parallely
    Axios.get('https://edxvteam.com/api/courses/v1/blocks/?'+qs.stringify({course_id: newValue.course_id,
    depth: 'all',
    username: 'satishag',
    block_types_filter: 'discussion'
    }),{
      headers:{
        Authorization: `Bearer ${edxToken}`
      }
    }).then((response)=>{
      console.log(response.data);
      
      if(response.data.blocks != undefined){
        var unis=[];
        unitBlocks= response.data.blocks;
        for(var i in unitBlocks){
          
          unis.push(unitBlocks[i]);
        }
        setUnits(unis);
        

          
        

      }
    },(error)=>{
      setLogin(6);
      
    });
    usernames.forEach((item,index,arr)=>{
      if(index<usernames.length-1)
        usernameslist=usernameslist+item+',';
      else
        usernameslist=usernameslist+item;
    });
    
    /*Axios.get('https://edxvteam.com/api/user/v1/accounts/',
    qs.stringify({
      username: ['satishag','satishag87']
    }),
    {
      headers:{
      Authorization:`Bearer ${edxToken}`
    }
    }).then((response)=>
   /* Axios.get('https://edxvteam.com/api/courses/v1/blocks/'+
    qs.stringify({
      course_id: course_id,
      depth: 'all',
      username: 'satishag',
      block_types_filter: 'discussion'

    }),{
      headers:{
      Authorization:`Bearer ${edxToken}`
    }
  }).then((response)=>{
      
    })*/
    

  }
  const clearFields=()=>{
    window.location.reload();
  }

  if(login==6)
  return( <div className="App">
      <header className="App-header">
        <p>500 internal error</p>
      </header>
      <div className="Background">
      <body className="Bady">
        <p className="TextTitle abc">A network error occured, try again </p>
        
        <div className="HorizontalDivision">

      <PrimaryButton onClick={clearFields} variant='contained' color='primary' style={{margin: 30}} >Try Again</PrimaryButton>
      
       
      </div>
      </body>
      </div>
 
    </div>
    )

  const copyLink=(e)=>{
    copy(joinUrl);
    setOpen(true);

  }


  if(login===0)
    return (<MicrosoftLogin ref={(ref)=>loginRef=ref} clientId={'c4e63d26-dcf1-4d0a-bac1-ae0bc5afca83'} authCallback={authHandler} redirectUri={'https://ghousekhas.github.io/baseform/'} graphScopes={['Calendars.ReadWrite','Group.ReadWrite.All']} />)

  if(login==3)
    return( <div className="App">
      <header className="App-header">
        <p>Class scheduled successfully</p>
      </header>
      <div className="Background">
      <body className="Bady">
        <p className="TextTitle abc">The class for {course} was successfully scheduled from {startDateState.toString()} to {endDate.toString()} at 
          </p>
        <a ref={(ref)=>linkRef=ref} id='joinlink' className="TextTitle def" value={joinUrl}
        onClick={copyLink}>{joinUrl}</a>
        <div className="ScrollDivision">
          <p className="TextTitle abc">Following stuents have been invited:</p>
          {
          userEmails.map((item)=>{
            return(
            <p className="TextTitle abc">{item.emailAddress.name}</p>
            )
          })
}
        </div>
        <div className="HorizontalDivision">

      <PrimaryButton onClick={clearFields} variant='contained' color='primary' style={{margin: 30}} >Schedule another Class</PrimaryButton>
      
       
      </div>
      </body>
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Link Copied!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            The link has been copied to your clipboard
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpen(false)} color="primary">
            Okay
          </Button>
        </DialogActions>
      </Dialog>
 
    </div>
    )
  
    return (
    <div className="App">
      <header className="App-header">
        <p>Schedule a class</p> 
      </header>
      <div className="Background">
      <body className="Bady">
      <div className="Division">
        <p className="TextTitle">Meeting Title</p>
        <TextField
            color="white"
            type='text'
            label='Enter the meeting title'
            variant='outlined'
            onChange={(event)=> {
              setTitle(event.target.value);
              b=event.target.value;
            }}
            
            inputStyle={{color: 'white', padding: '0 25px'}}
            style={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 10000,borderWidth: 5,borderColor: 'black' }}
          />
      </div>
      <div className="HorizontalDivision">
        <div className="AnotherDivision">
          <p className="TextTitle">From</p>
            <MuiPickersUtilsProvider utils={MomentUtils}  >
              <DateTimePicker 
              variant='dialog' 
              onChange={(date)=>{
                setStartDate(date.toDate())}}
              value={startDateState}
              disablePast
              style={{width: '15vw'}}
              />
            </MuiPickersUtilsProvider>
        </div>
        <div className="AnotherDivision">
          <p className="TextTitle">To</p>
            <MuiPickersUtilsProvider utils={MomentUtils} >
              <DateTimePicker 
              variant='dialog' 
              minDate={startDateState}
              value={endDate}
              onChange={(date)=>{setEndDate(date.toDate())}}
              style={{width: '15vw',alignContent: 'center'}}
              />
            </MuiPickersUtilsProvider>
        </div>
      </div>
      <div className='Division'>
        <p className="TextTitle">Select the course</p>
          <Autocomplete options={courses}
              getOptionLabel={(option) => option.name}
              style={{width: '100%', margin: 0,alignSelf: 'center' }}
              //onInputChange={courseChanged}
              onChange={courseChanged}
              renderInput={(params) => <TextField {...params} label="Select the course" variant="outlined"   />}/>
           
      </div>
      <div className='Division'>
        <p className="TextTitle">Select the unit</p>
        <Autocomplete options={units}
            getOptionLabel={(option) => option.display_name}
            style={{width: '100%', margin: 0,alignSelf: 'center' }}
            //onInputChange={(event,newValue)=>setDourse(newValue)}
            onChange={dourseChanged}
            renderInput={(params) => <TextField {...params} label="Select course unit" variant="outlined" />}/>
      </div>
      <div className="Division">
        <p className="TextTitle">Description</p>
        <TextField
            color="white"
            type='text'
            label='Enter additional description'
            variant='outlined'
            onChange={(event)=> {
              setDescription(event.target.value);
              b=event.target.value;
            }}
            
            inputStyle={{color: 'white', padding: '0 25px'}}
            style={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 10000,borderWidth: 5,borderColor: 'black' }}
          />
      </div>
      <div className="HorizontalDivision">
      <SecondaryButton onClick={clearFields} variant='contained' color='secondary' style={{margin: 30}} >Cancel</SecondaryButton>
      <PrimaryButton onClick={addEvent} variant='contained' color='primary' style={{margin: 30}} >Submit</PrimaryButton>
      
       
      </div>
      
      
      </body>
      </div>
    </div>
  );
}





export default App;
