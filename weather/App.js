import { View, StyleSheet,Text, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import Fontisto from '@expo/vector-icons/Fontisto';
//import 방법 다른애들도 있으니 항상 문서에서 확인할것

const { width : SCREEN_WIDTH } = Dimensions.get("window")

const API_KEY = "d19f7b7ca92a0c21a150ad4df832f64a"
//원래라면 어플에 API키를 넣지않음!! 서버에 넣어두고 어플에서 서버에 키를 요청해 다른작업을 수행해야함
//안전한 방식이 아님. 하지만 지금은 서버가 없으니까 그냥 일케 쓴다.
const icons = {
  "Clouds" : "cloudy",
  "Clear" : "day-sunny",
  "Thunderstorm" : "lightning",
  "Drizzle" : "day-rain",
  "Rain" : "rains",
  "Snow" : "snow",
  "Atmosphere" : "fog"
}

export default function App() {
  
  const [days,setDays] = useState([]);
  const [city, setCity] = useState("Loading...");
  const [ok, setOk] = useState(true);
  const getWeather = async()=>{
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if(!granted){
      setOk(false);
    }
    const {coords : {latitude, longitude }} = await Location.getCurrentPositionAsync({accuracy: 5});
    const location = await Location.reverseGeocodeAsync(
      {latitude, longitude},
      {useGoogleMaps: false});
      setCity(location[0].region);

    const { list } = await (
      await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`)
      ).json();
      
      
      const filteredList = list.filter(({ dt_txt }) => 
      dt_txt.endsWith("03:00:00"));
      setDays(filteredList);
      console.log(filteredList)

  }
  useEffect(()=>{
    getWeather();
  },[])

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView 
      horizontal 
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.weather}>
        {
          days.length === 0 ? 
          (<View style={styles.day}>
            <ActivityIndicator color={"white"} size={"large"} style={{marginTop : 10}}/>
          </View>):(
            days.map((day,i) => {
              return (<View key={i} style={styles.day}>
                <Text style={styles.date}>{new Date(day.dt * 1000).toString().substring(0, 10)}</Text>
                <View style= {{ flexDirection : "row", alignItems : 'center', width : "100%" }}>
                  <Text style={styles.temp}>{parseFloat(day.main.temp).toFixed(1)}</Text>
                  <Fontisto name={icons[day.weather[0].main]} size={68} color="white" style={{marginLeft : 60}}/>
                </View>
                <Text style={styles.description}>{day.weather[0].main}</Text>
                <Text style={styles.tinyText}>{day.weather[0].description}</Text>
              </View>)
            })
          )
          
        }
        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
    flex : 1 , 
    backgroundColor : "lightsalmon",
  },
  city : {
    flex : 1,
    justifyContent : "center",
    alignItems : "center",
  },
  cityName : {
    fontSize : 48,
    fontWeight : 500,
    color : "white",
  },
  weather : {
    marginLeft : 40,
  },
  day : {
    width : SCREEN_WIDTH,
    color : "white",
  },
  temp : {
    fontSize : 180,
    marginTop : 50,
    color : "white",
  },
  description : {
    marginTop : -40,
    fontSize : 50,
    color : "white",
  },
  tinyText : {
    fontSize : 20,
    color : "white",
  },
  date : {
    fontSize : 30,
    color : "white",
  }
})


