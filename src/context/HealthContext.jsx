import React, { createContext, useState, useEffect, useContext } from 'react';
import { triggerSOS as triggerSOSService } from '../services/emergencyService';
import { useAuth } from './AuthContext';

const HealthContext = createContext();

export const useHealth = () => useContext(HealthContext);

export const HealthProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [healthData, setHealthData] = useState({
    heartRate: 75,
    spo2: 98,
    temperature: 36.5,
    bloodPressure: { sys: 120, dia: 80 },
    stressLevel: 30, // Percentage
    respirationRate: 16, // Breaths per min
    fallDetected: false,
    history: []
  });

  useEffect(() => {
    // Simulate real-time ESP32 IoT sensor data every 3 seconds
    const interval = setInterval(() => {
      setHealthData(prev => {
        const newHR = 65 + Math.floor(Math.random() * 20); // 65-85 normal resting
        const newSpO2 = 96 + Math.floor(Math.random() * 4); // 96-100
        const newTemp = +(36.4 + (Math.random() * 0.8)).toFixed(1); // 36.4-37.2
        const sys = 110 + Math.floor(Math.random() * 15);
        const dia = 70 + Math.floor(Math.random() * 10);
        const newStress = 20 + Math.floor(Math.random() * 30);
        const newResp = 14 + Math.floor(Math.random() * 6);

        const newReading = {
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          heartRate: newHR,
          spo2: newSpO2,
          temperature: newTemp
        };

        const updatedHistory = [...prev.history, newReading].slice(-12);

        return {
          ...prev,
          heartRate: newHR,
          spo2: newSpO2,
          temperature: newTemp,
          bloodPressure: { sys, dia },
          stressLevel: newStress,
          respirationRate: newResp,
          history: updatedHistory
        };
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const triggerSOS = async () => {
    console.log("SOS Triggered! Alerts sent to emergency contacts.");
    if (currentUser) {
      try {
        await triggerSOSService(currentUser.uid, { lat: 0, lng: 0 }); // Hardcoded location for now
        alert('Emergency SOS dispatched to your contacts!');
      } catch (error) {
        console.error("Failed to send SOS", error);
      }
    } else {
      alert("Please login to use SOS.");
    }
  };

  return (
    <HealthContext.Provider value={{ ...healthData, triggerSOS }}>
      {children}
    </HealthContext.Provider>
  );
};
