"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CountryCard from "./components/CountryCard";
import WeatherCard from "./components/WeatherCard";
import dynamic from "next/dynamic";
import { mockWeather } from "./api/rest/weather/mockWeather";

type Country = {
  code: string;
  name: string;
  capital: string;
  emoji: string;
  currency: string;
  languages: { name: string }[];
  continent: { name: string };
};

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

const continentNames: { [key: string]: string } = {
  Africa: "アフリカ",
  Antarctica: "南極",
  Asia: "アジア",
  Europe: "ヨーロッパ",
  "North America": "北アメリカ",
  Oceania: "オセアニア",
  "South America": "南アメリカ",
};

const HomePageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCity = searchParams.get("city") || "";

  const [countries, setCountries] = useState<Country[]>([]);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [city, setCity] = useState(initialCity);
  const [filterContinent, setFilterContinent] = useState<string>("All");
  const [error, setError] = useState<boolean>(false);

  const [history, setHistory] = useState<{ name: string; error: boolean }[]>(
    () => {
      return JSON.parse(localStorage.getItem("weatherSearchHistory") || "[]");
    }
  );

  useEffect(() => {
    const initialize = async () => {
      await fetchCountries();
      if (initialCity) {
        fetchWeather(initialCity);
      }
    };

    initialize();
  }, [initialCity]);

  const fetchCountries = async () => {
    try {
      const response = await fetch("/api/graphql/countries");
      if (!response.ok) {
        throw new Error(`Failed to fetch countries: ${response.status}`);
      }
      const data = await response.json();
      setCountries(data.countries);
    } catch (error) {
      console.error(error);
    }
  };

  const saveHistory = (city: string, error: boolean) => {
    if (!city.trim()) return; // 空文字の場合は更新しない
    const isDuplicate = history.some(
      (item) => item.name === city && item.error === error
    );
    if (!isDuplicate) {
      const updatedHistory = [...history, { name: city, error }].slice(-5); // 最後の5つの検索を保持
      setHistory(updatedHistory);
      localStorage.setItem(
        "weatherSearchHistory",
        JSON.stringify(updatedHistory)
      );
    }
  };

  const fetchWeather = async (city: string) => {
    try {
      // NOTE: モックを使う場合はこちらをtrueにする。
      const isMock = false;
      if (isMock) {
        const data = mockWeather(city);
        setWeather(data);
        saveHistory(city, false);
        setError(false);
        return;
      }

      const response = await fetch(`/api/rest/weather?city=${city}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch weather: ${response.status}`);
      }
      const data = await response.json();
      setWeather(data);
      saveHistory(city, false);
      setError(false);
    } catch (error) {
      console.error(error);
      setWeather(null);
      saveHistory(city, true);
      setError(true);
    }
  };

  const handleSearch = () => {
    if (!city.trim()) return; // 空文字の場合は検索しない
    const encodedCity = encodeURIComponent(city);
    router.push(`/?city=${encodedCity}`);
    fetchWeather(city);
  };

  const handleContinentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterContinent(e.target.value);
  };

  const handleHistoryClick = (name: string) => {
    const encodedCity = encodeURIComponent(name);
    router.push(`/?city=${encodedCity}`);
    setCity(name);
    fetchWeather(name);
  };

  const filteredCountries = countries.filter(
    (country) =>
      filterContinent === "All" || country.continent.name === filterContinent
  );

  return (
    <div>
      <h1>Weather Explorer</h1>
      <p>都市名を入力して天気を検索できます。</p>
      <div>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="都市名を入力"
        />
        <button onClick={handleSearch}>天気を検索</button>
      </div>
      <div>
        <h2>検索履歴</h2>
        {history.length > 0 ? (
          <ul>
            {history.map((item, index) => (
              <li
                key={index}
                onClick={() => !item.error && handleHistoryClick(item.name)}
                style={{
                  textDecoration: item.error ? "line-through" : "none",
                  cursor: item.error ? "default" : "pointer",
                  color: item.error ? "grey" : "black",
                }}
              >
                {item.name}
              </li>
            ))}
          </ul>
        ) : (
          <p>履歴がありません</p>
        )}
      </div>
      {weather !== null || error ? (
        <WeatherCard weather={weather} error={error} />
      ) : null}
      <div>
        <h2>大陸で絞り込む</h2>
        <p>国名を参考にすることができます。</p>
        <select value={filterContinent} onChange={handleContinentChange}>
          <option value="All">すべて</option>
          {Array.from(
            new Set(countries.map((country) => country.continent.name))
          ).map((continent) => (
            <option key={continent} value={continent}>
              {continentNames[continent] || continent}
            </option>
          ))}
        </select>
      </div>
      <div className="countries">
        {filteredCountries.map((country) => (
          <CountryCard key={country.code} country={country} />
        ))}
      </div>
    </div>
  );
};

const HomePage = HomePageContent;
// NOTE:これにしたら動いてbuildも通る
// const HomePage = dynamic(() => Promise.resolve(HomePageContent), {
//   ssr: false,
// });

export default HomePage;
