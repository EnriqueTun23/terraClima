import type { IWeatherProvider } from "~/interfaces/IWeatherProvider";

export class WeatherAPIProvider implements IWeatherProvider {
    async getHumidity(lat: number, lon: number, date: string) {
      const apiKey = process.env.WEATHERAPI_KEY;
      const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`;
      const response = await fetch(url);
      const data = await response.json();
      const humidity = data.current.humidity;
      return { humidity, message: humidity > 30 ? "Cultivo posible." : "Humedad insuficiente." };
    }
  }