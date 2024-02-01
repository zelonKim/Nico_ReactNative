/*
import { StatusBar } from 'expo-status-bar'; // show status bar in app`s top
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello. I made a RN App.</Text>
      <StatusBar style="light" />
    </View>
  )
}


const styles = StyleSheet.create({ // 'StyleSheet' provides an auto complete
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    border: "1px green dashed",
  },
  text: {
    fontSize: 28,
    color:"white",
  }
});
*/



///////////////////////////



/* import React from "react";
import { View } from "react-native";

export default function App() {
  return (
    <View style={{ flexDirection: "row" }}> 
      <View style={{width: 200, height:200, backgroundColor:"tomato"}}></View>
      <View style={{width: 200, height:200, backgroundColor:"teal"}}></View>
      <View style={{width: 200, height:200, backgroundColor:"orange"}}></View>
    </View>
  ) 
}  // By default, 'flexDirection' has "Column" 
*/


////////////////////


/* import React from "react";
import { View } from "react-native";

export default function App() {
  return (
    <View style={{ flex: 1, flexDirection:"row" }}>  
      <View style={{ flex: 1, backgroundColor:"tomato"}}></View>
      <View style={{ flex: 1, backgroundColor:"teal"}}></View>
      <View style={{ flex: 1, backgroundColor:"orange"}}></View>
    </View>
  )
} // 'flex: 비율' set the width and height responsively by Screen Size
 */





///////////////////////////////////////////////////////





import { View, Text, StyleSheet, ScrollView, Dimensions, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { Fontisto } from "@expo/vector-icons"


const API_KEY="0cdbb28c8333cfadfac25f5410ae5611"


const icons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Rain: "rains",
  Snow: "snow",
}



export default function App() {
  const [ok, setOk] = useState(true);
  const [city, setCity] = useState("Loading...")
  const [district, setDistrict] = useState()
  const [days, setDays] = useState([]);



  const getWeather = async() => {
    // const permission = await Location.requestForegroundPermissionsAsync();
    // console.log(permission) // {"canAskAgain": true, "expires": "never", "granted": true, "status": "granted"}
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if(!granted){
      setOk(false);
    }


    // const postion = await Location.getCurrentPositionAsync({accuracy: 5});
    // console.log(position) // {"coords": {"accuracy": 12.27338442894202, "altitude": 16.863550186157227, "altitudeAccuracy": 3.806243419647217, "heading": -1, "latitude": 37.31074163780541, "longitude": 126.86144157513812, "speed": -1}, "timestamp": 1706517098493.36}
    const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy: 5});
    const location = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps: false}) // returns the real address by latitude and longitude
    console.log(location); // [{"city": "안산시", "country": "대한민국", "district": "이동", "isoCountryCode": "KR", "name": "이동 542-7", "postalCode": "15509", "region": "경기도", "street": "이동", "streetNumber": "542-7", "subregion": null, "timezone": "Asia/Seoul"}]
    setCity(location[0].city)
    setDistrict(location[0].district)


    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
    const {list} = await response.json();
    const filteredList = list.filter(({dt_txt}) => dt_txt.endsWith("00:00:00"));
    setDays(filteredList)
  }


  useEffect(() => {
    getWeather();
  }, [])


////////////////////////////////


  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>  
        <Text style={styles.districtName}>{district}</Text>  
      </View>
      <ScrollView 
        pagingEnabled
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.weather}
      >
        {days.length === 0 ? (
          <View style={{ ...styles.day, alignItems: "center" }}> 
            <ActivityIndicator color="white" style={{marginTop: 10}} size="large" />
          </View>
        ): (
          days.map((day, index) => 
            <View key={index} style={styles.day}>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent:"space-between"}}>
                <Text style={styles.temp}>{parseFloat(day.main.temp).toFixed(1)}</Text>
                <Fontisto name={icons[day.weather[0].main]} size={58} color="black" />
              </View>
              <Text style={styles.main}>{day.weather[0].main}</Text>
              <Text style={styles.description}>{day.weather[0].description}</Text>
            </View>
          )
        )}
      </ScrollView>  
    </View>
  )
}



const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get("window") // get the Screen Size
console.log(SCREEN_HEIGHT); // 568
console.log(SCREEN_WIDTH); // 320



const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: "tomato"
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  cityName: {
    fontSize: 48,
    fontWeight: "500",
  },
  districtName: {
    fontSize: 28,
    marginTop: 15,
    fontWeight:"600"
  }, 
  weather:{
    
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temp: {
    marginTop: 30,
    fontSize: 110
  },
  main: {
    marginTop: -5,
    fontSize: 40
  },
  description: {
    fontSize: 20,
  }
})
fetch