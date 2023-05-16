import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';

import axios from 'axios';
import {useEffect, useState} from 'react';
import DaysItem from './src/components/Days';
const App = () => {
  const {width} = Dimensions.get('window').width;
  const {height} = Dimensions.get('window').height;
  const [weatherData, setWeatherData] = useState([]);
  const [weatherDataDays, setWeatherDataDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('');
  const [goalCity, setGoalCity] = useState('Konya');
  const url =
    'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/' +
    goalCity +
    '?unitGroup=metric&include=events%2Cdays%2Chours%2Calerts%2Ccurrent&key=Y2J89C2TG3AKGMTJ9WBRVK9HR&contentType=json';

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [goalCity]);
  const fetchData = async () => {
    const {data} = await axios.get(url);
    console.log(data);
    setWeatherData(data);
    setWeatherDataDays(data.days);
    setLoading(false);
  };

  const handleCity = () => {
    setGoalCity(city);
    setCity('');
  };
  const renderItem = ({item}) => {
    return <DaysItem data={item} />;
  };

  if (loading) {
    return <ActivityIndicator size={'large'} />;
  }
  return (
    <ImageBackground
      source={require('./src/assets/bg.jpg')}
      resizeMode="cover"
      style={{flex: 1}}>
      <ScrollView style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)'}}>
        <TextInput
          placeholder="Şehir gir "
          style={{
            backgroundColor: 'white',
            padding: 10,
            margin: 20,
            borderRadius: 25,
          }}
          placeholderTextColor="black"
          onChangeText={setCity}
          value={city}
        />
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={{backgroundColor: '#FFD700', width: '50%', borderRadius: 25}}
            onPress={handleCity}>
            <Text style={{color: 'black', textAlign: 'center', padding: 10}}>
              Ara
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.contentConditions}>
          {weatherData.currentConditions.conditions}
        </Text>
        <View style={styles.imageContainer}>
          {(weatherData.currentConditions.conditions === 'Partially cloudy' ||
            weatherData.currentConditions.conditions === 'Overcast') && (
            <Image
              source={require('./src/assets/clouds.png')}
              style={styles.weatherImage}
            />
          )}
          {(weatherData.currentConditions.conditions === 'Sun' ||
            weatherData.currentConditions.conditions === 'Clear') && (
            <Image
              source={require('./src/assets/sun.png')}
              style={styles.weatherImage}
            />
          )}
          {(weatherData.currentConditions.conditions === 'Rain' ||
            weatherData.currentConditions.conditions === 'Rain, Overcast') && (
            <Image
              source={require('./src/assets/rainy.png')}
              style={styles.weatherImage}
            />
          )}
        </View>
        <Text style={styles.contentTemp}>
          {weatherData.currentConditions.temp}°
        </Text>
        <Text style={styles.city}>{weatherData.resolvedAddress}</Text>
        <Text style={styles.title}>15 Günlük Veriler</Text>
        <FlatList data={weatherDataDays} renderItem={renderItem} />
      </ScrollView>
    </ImageBackground>
  );
};

export default App;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'red',
    flex: 1,
  },
  city: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    fontStyle: 'italic',
  },
  content: {
    color: 'white',
    fontSize: 20,
    marginLeft: 20,
    marginTop: 20,
  },
  contentTemp: {
    color: 'white',
    fontSize: 50,
    marginLeft: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  contentConditions: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  title: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
    marginVertical: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  weatherImage: {
    width: 150,
    height: 150,
  },
});
