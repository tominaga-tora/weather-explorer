export const mockWeather = (city: string) => {
  const cityNumber = parseInt(city.replace("City", ""), 10);

  if (isNaN(cityNumber) || cityNumber < 1 || cityNumber > 10) {
    throw new Error("500 Internal Server Error");
  }

  return {
    name: `City${cityNumber}`,
    main: {
      temp: 20 + cityNumber,
      humidity: 50 + cityNumber,
      pressure: 1000 + cityNumber,
    },
    weather: [
      {
        description: cityNumber % 2 === 0 ? "clear sky" : "few clouds",
      },
    ],
    wind: {
      speed: 2 + cityNumber * 0.5,
    },
  };
};
