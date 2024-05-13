'use client';

import { useState } from 'react';
import WeatherDashboard from '../components/WeatherDashboard';
import styles from '../styles/Home.module.css';

export default function ClientComponent() {
  const [location, setLocation] = useState('');

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Weather App</h1>
      <div className={styles.locationInput}>
        <input
          type="text"
          value={location}
          onChange={handleLocationChange}
          placeholder="Enter a location"
          className={styles.input}
        />
      </div>
      <div className={styles.dashboard}>
        <WeatherDashboard location={location} />
      </div>
    </div>
  );
}