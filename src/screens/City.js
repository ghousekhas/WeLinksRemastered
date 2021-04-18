import React, { useState, useEffect } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
} from 'react-native'
import { Colors, dimen, Styles } from '../Constants'
import Axios from 'axios'
import { FlatList } from 'react-native-gesture-handler'
import { RadioButton } from 'react-native-paper'
import qs from 'qs'
import LottieView from 'lottie-react-native'
import { Config } from '../Constants'
import AppBar from '../components/ui_components/AppBar'
import { useAuth } from '../services/auth-service'

// List of service cities

const City = ({ navigation, route, setAboutDone }) => {
  const [cities, setCities] = useState([])
  const [value, setValue] = useState([])
  const [done, setDone] = useState(false)
  const { edit, tag } = route.params

  const authContext = useAuth()
  const user = authContext.user

  const backFunction = () => {
    if (!edit) {
      setAboutDone(false)
      return
    }
    navigation.pop()
  }

  const getCitiesData = async () => {
    Axios.get(Config.api_url + 'php?action=getCityList', {
      'Accept-Encoding': 'gzip',
    })
      .then((result) => {
        console.log(result.data.cities)

        let i
        let cities = result.data.cities
        let cityList = []
        for (i in cities)
          cityList.push({
            cityname: cities[i].city_name,
            city_id: cities[i].city_id,
          })
        setCities(cityList)
        if (edit) setValue(user.city_id)
      })
      .catch((error) => {
        console.log('Error reading city data: ', error)
      })
  }

  useEffect(() => {
    getCitiesData()

    console.log('user', user)
    const backhand = BackHandler.addEventListener('hardwareBackPress', () => {
      backFunction()
    })

    return () => {
      backhand.remove()
    }
  }, [])

  const setCity = () => {
    if (edit) {
      Axios.post(
        Config.api_url + 'php?action=editUserProfile&',
        qs.stringify({
          city_id: value,
          user_id: user.user_id,
        }),
      ).then(
        (response) => {
          console.log('here', response.data)
          // route.params.refreshUser();
          authContext.sync()
          alert('City changed')
          navigation.goBack()
        },
        (error) => {
          console.log('while city change', error)
          navigation.goBack()
        },
      )

      return
    }

    setDone(true)

    Axios.post(
      Config.api_url +
        'php?' +
        qs.stringify({
          action: 'registerUser',
          name: user.name,
          phone: user.phone,
          email: user.email,
          city_id: value,
        }),
    )
      .then(function (response) {
        console.log(response.data)
        authContext.sync()
      })
      .catch(function (error) {
        console.log(error)
        alert('Server unreachable, make sure you are connected to the internet')
        setDone(false)
      })
  }

  if (done) {
    return (
      <View style={{ ...StyleSheet.absoluteFill, backgroundColor: 'white' }}>
        <LottieView
          enableMergePathsAndroidForKitKatAndAbove
          style={{ flex: 1, padding: 50, margin: 50 }}
          source={require('../../assets/animations/logistics.json')}
          resizeMode={'contain'}
          autoPlay={true}
          loop={true}
        />
      </View>
    )
  }

  return (
    <View>
      <AppBar
        back
        funct={() => {
          backFunction()
        }}
      />
      <View style={Styles.parentContainer}>
        <Text style={styles.text}>
          {tag == 'home'
            ? 'Cities where our services are available'
            : 'Select your City'}
        </Text>
        <View style={Styles.grayfullline} />

        <RadioButton.Group
          onValueChange={(value) => setValue(value)}
          value={value}
        >
          <FlatList
            style={{ flex: 1 }}
            data={cities}
            renderItem={({ item }) => {
              return (
                <View style={styles.view}>
                  <RadioButton value={item.city_id} />
                  <Text style={styles.city}>{item.cityname}</Text>
                </View>
              )
            }}
          />
        </RadioButton.Group>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setCity()
          }}
        >
          <Text
            style={{
              backgroundColor: Colors.primary,
              alignSelf: 'center',
              padding: 10,
              color: 'white',
              width: dimen.width * 0.9,
              textAlign: 'center',
              borderRadius: 10,
            }}
          >
            {edit ? 'Select' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    width: dimen.width,
    height: dimen.height,
    padding: 10,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',

    margin: 15,
  },
  line: {
    borderWidth: 0.5,
    borderColor: '#5D5D5D',
    marginTop: 10,
  },
  view: {
    flexDirection: 'row',
    marginTop: 12,
  },
  city: {
    marginTop: 5,
    marginStart: 7,
    fontSize: 18,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: Colors.primary,
    position: 'absolute',
    bottom: '5%',
    borderRadius: 10,
    flex: 0,
  },
})
export default City
