import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useGet(initialState = null, city) {
    // WEATHER related

    // option: http://api.weatherapi.com/v1/forecast.json
    // alternative: doc: https://open-meteo.com/en/docs, url: https://api.open-meteo.com/v1/forecast?latitude=-36.85&longitude=174.76&hourly=temperature_2m&forecast_days=16
    // const url_Weather = `https://api.weatherapi.com/v1/forecast.json?key=310ca3a0cb9a46a2b2d223227230404&q=${dest}&days=10`;
    // const geo_data = axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=Auckland&count=1&language=en`);

    const [data, setData] = useState(initialState);

    useEffect(() => {
        async function fetchData() {
            try {
                axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=Auckland&count=1&language=en`)
                    .then(res => {
                        console.log(parseFloat(res.data.results[0].latitude), parseFloat(res.data.results[0].longitude))
                        axios.request(`https://api.open-meteo.com/v1/forecast?latitude=${parseFloat(res.data.results[0].latitude)}&longitude=${parseFloat(res.data.results[0].longitude)}&hourly=temperature_2m&forecast_days=16`)
                    }).then((result) => {
                        setData(result.data)
                    })
            } catch (error) {
                alert(error)
            }
        }
        fetchData();
    }, [city]);
    return data;
}

