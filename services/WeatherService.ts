import type { IWeatherProvider } from "~/interfaces/IWeatherProvider";
import { MockWeatherProvider } from "~/providers/MockWeatherProvider";
import { OpenWeatherProvider } from "~/providers/OpenWeatherProvider";
import { WeatherAPIProvider } from "~/providers/WeatherAPIProvider";

export class WeatherService {
    private provider: IWeatherProvider;
    
    constructor(providerType: string) {
      switch (providerType) {
        case "openweather":
          this.provider = new OpenWeatherProvider();
          break;
        case "weatherapi":
          this.provider = new WeatherAPIProvider();
          break;
        default:
          this.provider = new MockWeatherProvider();
      }
    }
    
    async getHumidity(lat: number, lon: number, date: string) {
      return this.provider.getHumidity(lat, lon, date);
    }
  }