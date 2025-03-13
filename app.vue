<template>
  <div class="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
    <h1 class="text-3xl font-bold mb-6">TerraClima - Escáner de Humedad</h1>
    <div class="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
      <label class="block mb-2">Latitud:</label>
      <input v-model="lat" type="number" class="w-full p-2 rounded bg-gray-700 text-white border border-gray-600" placeholder="Ej. 34.05" required />
      
      <label class="block mt-4 mb-2">Longitud:</label>
      <input v-model="lon" type="number" class="w-full p-2 rounded bg-gray-700 text-white border border-gray-600" placeholder="Ej. -118.25" required />
      
      <label class="block mt-4 mb-2">Fecha:</label>
      <input v-model="date" type="date" class="w-full p-2 rounded bg-gray-700 text-white border border-gray-600" required />
      
      <label class="block mt-4 mb-2">Proveedor:</label>
      <select v-model="provider" class="w-full p-2 rounded bg-gray-700 text-white border border-gray-600">
        <option v-for="prov in providers" :key="prov.value" :value="prov.value">{{ prov.label }}</option>
      </select>
      
      <button @click="fetchHumidity" class="mt-6 w-full py-2 px-4 rounded-lg font-bold flex justify-center items-center" :class="humidity !== null ? (humidity > 30 ? 'bg-green-600' : 'bg-red-600') : 'bg-blue-600'">
        <span v-if="loading" class="loader mr-2"></span>
        {{ loading ? 'Analizando...' : 'Escanear el Clima' }}
      </button>
      
      <p v-if="message" class="mt-4 text-center" :class="humidity !== null && humidity > 30 ? 'text-green-400' : 'text-red-400'">{{ message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Provider {
  label: string;
  value: string;
}

interface HumidityResponse {
  date: string;
  humidity: number;
  message: string;
}

const lat = ref<string>('');
const lon = ref<string>('');
const date = ref<string>('');
const provider = ref<string>('openweather');
const humidity = ref<number | null>(null);
const loading = ref<boolean>(false);
const message = ref<string>('');

const providers: Provider[] = [
  { label: 'OpenWeatherMap', value: 'openweather' },
  { label: 'WeatherAPI', value: 'weatherapi' },
  { label: 'Datos Ficticios', value: 'mock' }
];

const fetchHumidity = async () => {
  if (!lat.value || !lon.value || !date.value) {
    message.value = 'Por favor, completa todos los campos';
    return;
  }
  
  loading.value = true;
  message.value = '';
  try {
    const response: HumidityResponse = await $fetch('/api/getHumidity', {
      method: 'POST',
      body: { lat: lat.value, lon: lon.value, date: date.value, provider: provider.value }
    });

    console.log(response);
    humidity.value = response.humidity;
    message.value = response.message;
  } catch (error) {
    message.value = 'Error al obtener la humedad';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
input, select {
  outline: none;
}

.loader {
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid white;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
