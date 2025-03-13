import type { IWeatherProvider } from "~/interfaces/IWeatherProvider";

export class OpenWeatherProvider implements IWeatherProvider {
    async getHumidity(lat: number, lon: number, date: string) {
      // Llamada a la API de OpenWeatherMap
      const apiKey = process.env.OPENWEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      console.log('url', url);
      const response = await fetch(url);
      const data = await response.json();
      const humidity = data.main.humidity;
      return { humidity, message: humidity > 30 ? "Condiciones óptimas para cultivo." : "Peligro. Humedad muy baja." };
    }
  }