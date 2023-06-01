import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './weatherView.module.css';
import {
  WiDaySunny,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiCloudy,
  WiFog,
} from 'weather-icons-react';

// weather icon
function Icon(props) {
  if (
    !props.condition ||
    props.condition === 'not defined' ||
    props.condition === 'Not available'
  ) {
    return (
      <img src="" alt="image not available" className={styles.weather_icon} />
    );
  } else if (props.condition.includes('clear')) {
    return <WiDaySunny size={45} color={'354f52'} />;
  } else if (
    props.condition.includes('drizzle') ||
    props.condition.includes('rain')
  ) {
    return <WiRain size={45} color={'354f52'} />;
  } else if (props.condition.includes('snow')) {
    return <WiSnow size={45} color={'354f52'} />;
  } else if (props.condition.includes('thunderstorm')) {
    return <WiThunderstorm size={45} color={'354f52'} />;
  } else if (
    props.condition.includes('cloudy') ||
    props.condition.includes('overcast')
  ) {
    return <WiCloudy size={45} color={'354f52'} />;
  } else if (props.condition.includes('fog')) {
    return <WiFog size={45} color={'354f52'} />;
  }
}

export default function WeatherView(props) {
  const [city, setCity] = useState(null);

  useState(() => {
    setCity(props.city);
  });

  const [weather, setWeather] = useState(null);

  // geo data for weather
  const [loc, setLoc] = useState(null);

  // get weather condition based on WMO Weather interpretation codes,
  // whe WMO documentation can be found at https://open-meteo.com/en/docs
  function getConditionByCode(code) {
    switch (parseInt(code)) {
      case 0:
        return 'clear sky';
      case 1:
        return 'mainly clear';
      case 2:
        return 'partly cloudy';
      case 3:
        return 'overcast';
      case 45:
        return 'fog';
      case 48:
        return 'depositing rime fog';
      case 51:
        return 'drizzle: light';
      case 53:
        return 'drizzle: moderate';
      case 55:
        return 'dense drizzle';
      case 56:
        return 'freezing drizzle: light';
      case 57:
        return 'freezing dense drizzle';
      case 61:
        return 'slight rain';
      case 63:
        return 'moderate rain';
      case 65:
        return 'heavy rain';
      case 66:
        return 'freezing light rain';
      case 67:
        return 'freezing heavy rain';
      case 71:
        return 'slight snow';
      case 73:
        return 'moderate snow';
      case 75:
        return 'heavy snow';
      case 77:
        return 'snow grains';
      case 80:
        return 'slight rain showers';
      case 81:
        return 'moderate rain showers';
      case 82:
        return 'violent rain showers';
      case 85:
        return 'light snow showers';
      case 86:
        return 'heavy snow showers';
      case 95:
        return 'thunderstorm';
      case 96 || 99:
        return 'thunderstorm with hail';
      default:
        return 'Not available';
    }
  }

  // load weather data, weather data by "https://open-meteo.com/"
  useEffect(() => {
    try {
      if (loc.data.results) {
        axios
          .get(
            `https://api.open-meteo.com/v1/forecast?latitude=${parseFloat(
              loc?.data.results[0].latitude
            )}&longitude=${parseFloat(
              loc?.data.results[0].longitude
            )}&daily=temperature_2m_min,temperature_2m_max,weathercode,windspeed_10m_max&forecast_days=16&timezone=auto`
          )
          .then((result) => {
            setWeather(result.data);
          });
      }
    } catch (e) {
      console.log(e);
    }
  }, [loc]);
  useEffect(() => {
    async function fetchLoc() {
      try {
        await axios
          .get(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en`
          )
          .then((res) => {
            setLoc(res);
          });
      } catch (error) {
        console.log(error);
      }
    }
    fetchLoc();
  }, [city]);

  return (
    <>
      <div
        style={{
          height: props.height,
          width: props.width,
          overflowX: 'scroll',
          overflowY: 'scroll',
          display: 'flex',
        }}
      >
        {weather?.daily.time.map((_, index) => {
          return (
            <div className={styles.weather_display} key={index}>
              <div className={styles.weather_card}>
                <div className={styles.card_header}>
                  Date: {weather?.daily.time[index]}
                </div>
                <div className={styles.card_body}>
                  {getConditionByCode(weather?.daily.weathercode[index]) &&
                  getConditionByCode(weather?.daily.weathercode[index]) !==
                    'not defined' &&
                  getConditionByCode(weather?.daily.weathercode[index]) !==
                    'Not available' ? (
                    <Icon
                      condition={getConditionByCode(
                        weather?.daily.weathercode[index]
                      )}
                    />
                  ) : (
                    <img
                      src=""
                      alt="image not available"
                      className={styles.weather_icon}
                    />
                  )}
                  <h5 className={styles.card_title}>
                    {getConditionByCode(weather?.daily.weathercode[index])}
                  </h5>
                  <p className={styles.card_text}>
                    Temperature: {weather?.daily.temperature_2m_min[index]}°C ~{' '}
                    {weather?.daily.temperature_2m_max[index]}
                    °C
                  </p>
                  <p className={styles.card_text}>
                    Max wind speed: {weather?.daily.windspeed_10m_max[index]}{' '}
                    km/h
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
