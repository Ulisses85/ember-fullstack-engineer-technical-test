import React from "react";
import styled from "styled-components";

interface WeatherData {
  avgTemp: number;
  day: string;
  time: string;
  minTemp: number;
  maxTemp: number;
  description: string;
  windSpeed: number;
  windDirection: number;
  city: string;
  icon: string;
}
export interface WeatherCardProps {
  weatherData: [WeatherData];
}

const WeatherCard: React.FC<WeatherCardProps> = (data) => {
  const refreshPage = () => {
    window.location.reload();
  };

  const currentWeather = data.weatherData[0];

  const forecastListItems = data.weatherData
    .map((item: any, index: number) => (
      <WeatherListBody key={index}>
        <h4>{item.day}</h4>
        <WeatherIcon
          src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
        />
        <p>{item.description}</p>
        <div>{`Min temp: ${item.minTemp}`}</div>
        <div>{`Max temp: ${item.maxTemp}`}</div>
      </WeatherListBody>
    ))
    .slice(1);

  return (
    <>
      <WeatherCardWrapper>
        <DetailsWrapper>
          <WeatherCardCity>{currentWeather.city}</WeatherCardCity>
          <WeatherCardDate> {currentWeather.day}</WeatherCardDate>
          <WeatherCardSubHeading>
            {currentWeather.description}
          </WeatherCardSubHeading>
          <WeatherCardSubHeading>{`Wind: ${currentWeather.windSpeed} km/h, ${currentWeather.windDirection} deg`}</WeatherCardSubHeading>
        </DetailsWrapper>
        <TempWrapper>
          <WeatherIcon
            src={`https://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`}
            alt="Weather Icon"
          />
          <WeatherCardTemp>{currentWeather.avgTemp} &#x2103;</WeatherCardTemp>
        </TempWrapper>
        <ForecastList>{forecastListItems}</ForecastList>
        <RefreshButton onClick={() => refreshPage()} title={"Refresh"}>
          Refresh Button
        </RefreshButton>
      </WeatherCardWrapper>
    </>
  );
};

const WeatherCardWrapper = styled.div`
  margin: 50px;
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  padding: 5px 30px;
  width: 800px;
  height: 800px;
  border-radius: 3px;
  background-color: #fff;
  box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.2);
`;

const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TempWrapper = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

export const WeatherCardCity = styled.div`
  margin-bottom: 0px;
  font-weight: 300;
  font-size: 2.25em;
`;

export const WeatherCardDate = styled.div`
  margin-top: 2px;
  color: #777;
  font-weight: 400;
  font-size: 1.2em;
`;

export const WeatherCardSubHeading = styled.div`
  color: black;
  font-weight: 400;
  font-size: 1.4em;
  :first-letter {
    text-transform: capitalize;
  }
`;

export const WeatherIcon = styled.img`
  align-self: center;
  width: 200px;
  height: 200px;
`;

export const WeatherCardTemp = styled.div`
  color: #666;
  font-weight: 300;
  font-size: 6em;
  text-align: center;
`;

export const WeatherListBody = styled.div`
display: flex;
flex-direction: column;
justify-content: center:
align-items: center;
text-align: center;
margin-top: 2px;
color: #777;
font-weight: 400;
font-size: 1em;
margin-right: 20px;
`;

export const ForecastList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  img {
    width: 80px;
    height: 80px;
  }
  p:first-letter {
    text-transform: capitalize;
  }
`;

const RefreshButton = styled.button`
  margin-top: 35px;
  align-self: center;
  border: solid;
  color: black;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  transition-duration: 0.4s;
  cursor: pointer;
`;

export default WeatherCard;
