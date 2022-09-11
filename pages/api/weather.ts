import moment from "moment";
import type { NextApiRequest, NextApiResponse } from "next";

const API_KEY = `4d5f63f3fc10e2558495c8ec8cbb1d46`;
const lat = "51.2134";
const lon = "17.3899";

interface WeatherData {
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  dt_txt: string;
  wind: {};
  weather: [];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
    {
      method: "GET",
    }
  );

  try {
    const results = await response.json();

    const city = results.city.name;

    const weatherData = results.list.map(
      ({ main, dt_txt, wind, weather }: WeatherData) => {
        const weatherDesc = weather.map((id: any) => {
          return {
            state: id.main,
            description: id.description,
            icon: id.icon,
          };
        });

        return {
          dt_txt,
          avgTemp: Math.floor(main.temp),
          min_temp: main.temp_min,
          max_temp: main.temp_max,
          wind: wind,
          weatherDesc,
          city,
        };
      }
    );

    const dailyForecast = weatherData.map((i: any) => {
      return {
        avgTemp: i.avgTemp,
        minTemp: i.min_temp,
        maxTemp: i.max_temp,
        description: i.weatherDesc[0].description,
        icon: i.weatherDesc[0].icon,
        windSpeed: i.wind.speed,
        windDirection: i.wind.deg,
        city: i.city,
        day: moment(i.dt_txt).format("dddd"),
      };
    });

    const formattedData = dailyForecast.filter(
      (v: any, i: any, a: any) =>
        a.findIndex((j: any) => ["day"].every((k) => j[k] === v[k])) === i
    );

    const data = { weatherData: formattedData };
    res.send(data);
  } finally {
  }
  res.end();
}
