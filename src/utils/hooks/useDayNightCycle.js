import { useState, useEffect } from 'react';

const PHASES = {
  sunrise: { lightIntensity: 0.6, lightColor: '#ffd4a3', ambientIntensity: 0.3, skyColor: '#d4a574' },
  day: { lightIntensity: 1.0, lightColor: '#ffffff', ambientIntensity: 0.5, skyColor: '#a8c8ec' },
  sunset: { lightIntensity: 0.4, lightColor: '#ffb366', ambientIntensity: 0.25, skyColor: '#cc8866' },
  night: { lightIntensity: 0.05, lightColor: '#6699cc', ambientIntensity: 0.1, skyColor: '#0f1130ff' }
};

const lerp = (a, b, t) => a + (b - a) * t;

const lerpColor = (color1, color2, t) => {
  const r1 = parseInt(color1.slice(1, 3), 16);
  const g1 = parseInt(color1.slice(3, 5), 16);
  const b1 = parseInt(color1.slice(5, 7), 16);
  const r2 = parseInt(color2.slice(1, 3), 16);
  const g2 = parseInt(color2.slice(3, 5), 16);
  const b2 = parseInt(color2.slice(5, 7), 16);
  
  const r = Math.round(lerp(r1, r2, t));
  const g = Math.round(lerp(g1, g2, t));
  const b = Math.round(lerp(b1, b2, t));
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

export const useDayNightCycle = () => {
  const [time, setTime] = useState(Date.now());
  
  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 500);
    return () => clearInterval(interval);
  }, []);
  
  const totalProgress = (time / 60000) % 4; // 4 phases over 4 minutes
  const phaseIndex = Math.floor(totalProgress);
  const t = totalProgress - phaseIndex; // 0-1 within current phase
  
  const phases = ['sunrise', 'day', 'sunset', 'night'];
  const currentPhase = PHASES[phases[phaseIndex]];
  const nextPhase = PHASES[phases[(phaseIndex + 1) % 4]];
  
  const progress = (totalProgress / 4) * Math.PI * 2;
  const sunPosition = [
    Math.cos(progress) * 40,
    Math.sin(progress) * 15,
    -20
  ];

  return {
    sunPosition,
    lightIntensity: lerp(currentPhase.lightIntensity, nextPhase.lightIntensity, t),
    lightColor: lerpColor(currentPhase.lightColor, nextPhase.lightColor, t),
    ambientIntensity: lerp(currentPhase.ambientIntensity, nextPhase.ambientIntensity, t),
    skyColor: lerpColor(currentPhase.skyColor, nextPhase.skyColor, t)
  };
};
