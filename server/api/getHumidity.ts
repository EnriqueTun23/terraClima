import { defineEventHandler, readBody } from "h3";
import { WeatherService } from "~/services/WeatherService";


export default defineEventHandler(async (event) => {
  console.log('se ejecuta')
  try {
    const body = await readBody(event);
    console.log("Datos recibidos en la API:", body);

    const { lat, lon, date, provider } = body;

    if (!lat || !lon || !date) {
      return { error: "Todos los campos son obligatorios" };
    }

    const weatherService = new WeatherService(provider);
    console.log("Usando proveedor:", provider);

    const result = await weatherService.getHumidity(Number(lat), Number(lon), date);
    console.log("Respuesta del proveedor:", result);

    return { date, humidity: result.humidity, message: result.message };
  } catch (error) {
    console.error("Error en la API de humedad:", error);
    return { error: "Error al procesar la solicitud" };
  }
});