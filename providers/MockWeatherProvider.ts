import type { IWeatherProvider } from "~/interfaces/IWeatherProvider";

export class MockWeatherProvider implements IWeatherProvider {
    async getHumidity(lat: number, lon: number, date: string) {
      const humidity = Math.floor(Math.random() * 100);
      return { humidity, message: humidity > 30 ? "Simulación: cultivo viable." : "Simulación: humedad insuficiente." };
    }
  }
  