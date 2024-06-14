import React from "react";

type Weather = {
  name: string;
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  weather: {
    description: string;
  }[];
  wind: {
    speed: number;
  };
};

const WeatherCard: React.FC<{ weather: Weather | null; error: boolean }> = ({
  weather,
  error,
}) => {
  return (
    <div className="weather-card">
      {weather ? (
        <>
          <h2>{weather.name}</h2>
          <p>気温: {weather.main.temp}°C</p>
          <p>天気: {weather.weather[0].description}</p>
          <p>湿度: {weather.main.humidity}%</p>
          <p>風速: {weather.wind.speed} m/s</p>
          <p>気圧: {weather.main.pressure} hPa</p>
        </>
      ) : (
        <p>天気情報が取得できませんでした。</p>
      )}
    </div>
  );
};

export default WeatherCard;
