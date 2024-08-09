import React, { useState } from "react";
import { Weather } from "./Weather";
import "./App.css";

function App() {
  const [city, setCity] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [weather, setWeather] = useState<{
    temp: number;
    description: string;
  } | null>(null);
  console.log(error);

  const fetchWeather = () => {
    const apiKey = "1ce2c8f1225f14bf33b893989c1548cf";

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.cod === "404") {
          setError("City not found");
          setWeather(null);
        } else {
          setWeather({
            temp: json.main.temp,
            description: json.weather[0].description,
          });
          setError(null);
        }
      })
      .catch((error) => {
        console.error("Ошибка:", error);
        setError("An error occurred");
        setWeather(null);
      });
  };

  return (
    <div className="App">
      <div>
        <h1>Weather App</h1>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
        />
        <button onClick={fetchWeather}>Get weather</button>
      </div>

      {error && <div style={{ color: "red" }}>{error}</div>}
      {weather && (
        <Weather temp={weather.temp} description={weather.description} />
      )}
    </div>
  );
}

export default App;
