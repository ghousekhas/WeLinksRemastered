import React, { useState, Fragment } from 'react';
import { View, FlatList, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import { Colors, Constants, dimen, Styles } from '../Constants';
import Textbox from '../components/TextBox';
import Button from '../components/Button';
import SubmitButton from '../components/SubmitButton';
import DropDownPicker from 'react-native-dropdown-picker';
import { Picker } from '@react-native-community/picker';
import SpinnerBox from '../components/Spinner';
import AppBar from '../components/AppBar';
import Date from './Date';
import BottomSheet from 'reanimated-bottom-sheet';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import MyComponent from './test';



const a = [];
let bs = React.createRef();
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

for (var i = 0; i < 10; i++)
    a.push({ label: i.toString(), value: i.toString() })

export default function BidCreation1({ navigation }) {
    const thisDay = moment()
        .utcOffset('+05:30')
        .format('YYYY-MM-DD');
    const tomorrow = moment().add(1, 'day').endOf('day').format('YYYY-MM-DD')

    const [selected, setSelected] = useState(tomorrow);
    const [month, setMonth] = useState(monthNames[parseInt(thisDay.charAt(5) + thisDay.charAt(6) - 1)])
    const [year, setYear] = useState(thisDay.charAt(0) + thisDay.charAt(1) + thisDay.charAt(2) + thisDay.charAt(3))
    const [date, setThedate] = useState({
        day: moment().utcOffset('+05:30').day(),
        month: moment().utcOffset('+05:30').month(),
        year: moment().utcOffset('+05:30').year()
    });
    const [startDate,setStartDate] = useState(tomorrow);
    const [endDate,setEndDate] = useState(startDate);
    const [smonth,setSMonth] = useState(monthNames[parseInt(thisDay.charAt(5) + thisDay.charAt(6) - 1)])
    const [syear,setSYear] = useState(thisDay.charAt(0) + thisDay.charAt(1) + thisDay.charAt(2) + thisDay.charAt(3))
    const [emonth,setEMonth] = useState(monthNames[parseInt(thisDay.charAt(5) + thisDay.charAt(6) - 1)])
    const [eyear,setEYear] = useState(thisDay.charAt(0) + thisDay.charAt(1) + thisDay.charAt(2) + thisDay.charAt(3))

    const [dropdwon, setDropdown] = useState('');
    const [screenState, setScreenState] = useState('');

    const [dateType,setDateType] = useState(1);


    const strings = {
        bidTitle: 'Please enter your bid details'
    }
    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.panelHeader}>
                <View style={styles.panelHandle} />
            </View>
        </View>
    );
    const onDayPress = (day) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

            if(dateType == 1){
                setStartDate(day.dateString);
                setSMonth(monthNames[day.month - 1]);
                setSYear(day.year);
            }else if(dateType == 2)
            {setEndDate(day.dateString);
                setEMonth(monthNames[day.month - 1]);
                setEYear(day.year);}
            else

       { setSelected(day.dateString);
        setMonth(monthNames[day.month - 1]);
        setYear(day.year);}
        //   setThedate(day);



    };

    const choose = () => {
        if(dateType == 1)
        return startDate;
        if(dateType == 2)
        return endDate;
        return selected;
    }
    const chooseM = () => {
        if(dateType == 1)
        return smonth;
        if(dateType == 2)
        return emonth;
        return month;

    }
    const chooseY = () => {
        if(dateType == 1)
        return syear;
        if(dateType == 2)
        return eyear;
        return year;

    }

    const renderContent = () => {


        //    console.log(starting)
        return (<View style={{ backgroundColor: 'white' }}>



            <Fragment>

                <Calendar

                    disableAllTouchEventsForDisabledDays
                    displayLoadingIndicator
                    onDayPress={onDayPress}
                    minDate={tomorrow}
                    hideExtraDays
                    style={{
                        borderWidth: 0.3,
                        borderColor: Colors.primary,
                        height: Dimensions.get('window').height / 2,
                        borderRadius: 7,
                        margin: 5
                    }}
                    theme={{
                        todayTextColor: Colors.primary,
                        arrowColor: Colors.primary,
                        textDayFontSize: 16,
                        textMonthFontSize: 16,
                        textDayHeaderFontSize: 16



                    }}

                    markedDates={{

                        [choose()]: {

                            color: Colors.primary,
                            selected: true,

                            selectedColor: Colors.primary,
                            selectedTextColor: 'white',





                        }




                    }

                    }



                />
            </Fragment>
            <TouchableOpacity style={styles.button}
                onPress={() => {
                    // okay =  selected.charAt(0)+selected.charAt(1)+selected.charAt(2)+selected.charAt(3)
                    //   okay = selected.charAt(8)+selected.charAt(9)+" "+month+ " "+year;
                    //   console.log(okay);
                    // setUsableDate({...date});
                    //  setDate(okay);
                    bs.current.snapTo(2)





                }}>


                <Text style={styles.buttonText}>{'Set Date'} ({choose().charAt(8) + choose().charAt(9) + " " + chooseM() + " " + chooseY()})</Text>

            </TouchableOpacity>
            <TouchableOpacity style={styles.button}
                onPress={() => {
                bs.current.snapTo(2);

                }}>


                <Text style={styles.buttonText}>{'Cancel'}</Text>

            </TouchableOpacity>

        </View>

        )
    };
    var fall = new Animated.Value(1);
  //  return(<MyComponent />)

    return (
    <View>
        <BottomSheet
            enabledContentTapInteraction={true}
            ref={bs}
            snapPoints={[630, 600, 0]}
            renderContent={renderContent}
            renderHeader={renderHeader}
            initialSnap={2}
            callbackNode={fall}
            enabledGestureInteraction={false}
        />
        <AppBar back funct={() => navigation.pop()} />
        <View style={{ ...Styles.parentContainer, color: Colors.whiteBackground }}>
        <Animated.View style={{margin: '0.5%',
        opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
    }}>
    <View>
            <Text style={styles.heading}>{strings.bidTitle}</Text>
            <ScrollView style={{ marginBottom: '10%' }}>
                <View style={{ flex: 1, marginBottom: '30%', marginTop: '5%' }}>
                    <Textbox title={'BID TITLE'} hint={'Title'} />
                    <SpinnerBox title="CHOOSE PICKUP ADDRESS"
                        data={a}
                        changeOption={setDropdown} />
                        
                        <Textbox enable={false} title={'BID START DATE'} hint={'DDMMYYYY'} value={startDate.charAt(8) + startDate.charAt(9) + " " + smonth.substring(0,3) + " " + syear} />
                    <View style={{
                        alignSelf: 'flex-end', paddingHorizontal: dimen.width * 0.03
                    }}>
                        <Button text="Choose" onTouch={() => {
                            setDateType(1);
                          //  console.log('Open')
                            bs.current.snapTo(0);

                        }} />

                    </View>
                    <Textbox enable={false} title={'BID END DATE'} hint={'DDMMYYYY'} value={endDate.charAt(8) + endDate.charAt(9) + " " + emonth.substring(0,3) + " " + eyear} />
                    <View style={{
                        alignSelf: 'flex-end', paddingHorizontal: dimen.width * 0.03
                    }}>
                        <Button text="Choose" onTouch={() => {
                            setDateType(2);
                            bs.current.snapTo(0);

                        }} />

                    </View>

                    <Textbox enable={false} title={'PICKUP DATE'} hint={'DDMMYYYY'} value={selected.charAt(8) + selected.charAt(9) + " " + month.substring(0,3) + " " + year} />
                    <View style={{
                        alignSelf: 'flex-end', paddingHorizontal: dimen.width * 0.03
                    }}>
                        <Button text="Choose" onTouch={() => {
                            setDateType(3);
                            bs.current.snapTo(0);

                        }} />

                    </View>


                    <SpinnerBox title="PICKUP TIME SLOT"
                        data={a}
                        changeOption={setDropdown} />
                    <SpinnerBox title="SCRAP CATEGORY"
                        data={a}
                        changeOption={setDropdown} />
                    <SpinnerBox title="APPROXIMATE WEIGHT"
                        data={a}
                        changeOption={setDropdown} />
                    <View style={{ marginTop: '5%' }}>
                        <SubmitButton text='Next' styles={{ marginTop: '5%' }} onTouch={() => navigation.navigate('BidCreation2')} />
                    </View>

                </View>
            </ScrollView> 
            </View>
            </Animated.View>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    heading: {
        color: 'black',
        margin: '5%',
        fontSize: 20,
        marginVertical: '5%',
        fontWeight: 'bold'
    }, panel: {
        padding: 20,
        backgroundColor: 'white',
        paddingTop: 10,
        height: Dimensions.get('window').height
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        // shadowColor: '#000000',
        // shadowOffset: {width: 0, height: 0},
        // shadowRadius: 5,
        // shadowOpacity: 0.4,
    },
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        elevation: 0.2,
        paddingTop: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: '10%',
        aspectRatio: 5 / 0.5,
        borderRadius: 4,
        backgroundColor: 'gray',
        marginBottom: '3%',
    },

    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginVertical: 7,
    },
    buttonText: {
        textAlign: "center",
        textAlignVertical: "center",
        alignSelf: "center",
        color: 'white',
        fontWeight: '300',
        ...StyleSheet.absoluteFill,




    },
    button: {
        alignSelf: "center",
        marginTop: '5%',

        backgroundColor: Colors.primary,
        width: '92%',
        aspectRatio: 10 / 1.4,
        borderRadius: 5,



    },
})