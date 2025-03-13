export interface IWeatherProvider {
    getHumidity(lat: number, lon: number, date: string): Promise<{ humidity: number; message: string; }>;
  }