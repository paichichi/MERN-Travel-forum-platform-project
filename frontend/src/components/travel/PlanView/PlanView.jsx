import React from 'react';
import styles from '../../../pages/Travel/Travel.module.css';
import BasicMap from '../../3-party-map/map';
import PlanList from './PlanList';
import WeatherView from '../WeatherView/WeatherView';

function Weather(props) {
  const cities = props.cities;
  return cities.map((city, index) => {
    return (
      <div key={index} style={{ overflowX: 'scroll' }}>
        <span className={styles.tripHeader}>Weather in {city.trim()}</span>
        <WeatherView city={city.trim()} height="100%" width="90%" />
      </div>
    );
  });
}

export default function PlanView(props) {
  const plans = props.plans;
  const planDisplays = plans.map((plan) => ({
    id: plan._id,
    destination: plan.destination,
    accomodation: plan.accomodation,
    arrive: plan.checkIn,
    leave: plan.checkOut,
    teamsize: plan.guestNum,
    price: plan.price,
  }));

  const data_map = plans.map((plan) => ({
    longitude: plan.longitude,
    latitude: plan.latitude,
  }));

  const cities = plans.map((plan) => {
    return plan.destination;
  });

  const cities_weather = cities.filter((item, index) => {
    return cities.indexOf(item) === index;
  });

  let totalPrice = 0;
  planDisplays
    ? planDisplays.map((item) => {
        totalPrice += parseFloat(item.price);
      })
    : (totalPrice = 0);

  return (
    <>
      <div className={styles.AM_container}>
        <div className={styles.AM_column} style={{ margin: 'auto' }}>
          {planDisplays.length !== 0 ? (
            <PlanList planDisplays={planDisplays} />
          ) : (
            'No data yet'
          )}

          <div></div>
          {/* total price */}
          <div className={styles.priceTagContainer}>
            <div className={styles.priceTagContent}>
              <span>Total price : ${totalPrice}</span>
            </div>
          </div>
          <div></div>
          <br />
          {/* weather */}
          <div
            className={styles.search_Container}
            style={{ height: '50vh', overflowY: 'scroll' }}
          >
            <Weather cities={cities_weather} />
          </div>
        </div>
        <div className={styles.AM_column}>
          {/* right: map */}
          {data_map.length !== 0 ? (
            <BasicMap data={data_map} zoom={0} height={'80vh'} />
          ) : (
            'loading'
          )}
        </div>
      </div>
    </>
  );
}
