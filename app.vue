<template>
  <div :class="['min-h-screen flex flex-col items-center p-6 transition-all duration-500', humidity !== null ? (humidity > 30 ? 'bg-green-900' : 'bg-red-900') : 'bg-gray-900']">
    <h1 class="text-3xl font-bold mb-6 text-white">TerraClima - Escáner de Humedad</h1>
    
    <Card class="w-full max-w-md">
      <CardContent class="p-6 space-y-4">
        <div>
          <Label for="lat">Latitud:</Label>
          <Input id="lat" v-model="lat" type="number" placeholder="Ej. 34.05" required />
        </div>
        
        <div>
          <Label for="lon">Longitud:</Label>
          <Input id="lon" v-model="lon" type="number" placeholder="Ej. -118.25" required />
        </div>
        
        <div>
          <Label for="date">Fecha:</Label>
          <Input id="date" v-model="date" type="date" required />
        </div>
        
        <div>
          <Label for="provider">Proveedor:</Label>
          <Select v-model="provider">
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un proveedor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="prov in providers" :key="prov.value" :value="prov.value">
                {{ prov.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button @click="fetchHumidity" class="w-full" :variant="humidity !== null ? (humidity > 30 ? 'default' : 'destructive') : 'default'" :disabled="loading">
          <Loader2 v-if="loading" class="mr-2 animate-spin" />
          {{ loading ? 'Analizando...' : 'Escanear el Clima' }}
        </Button>
        
        <div v-if="humidity !== null" class="text-center mt-4">
          <span class="text-6xl" :class="humidity > 30 ? 'text-green-400' : 'text-red-400'">
            {{ humidity > 30 ? '🌿' : '🔥' }}
          </span>
          <p class="mt-2 text-lg font-semibold" :class="humidity > 30 ? 'text-green-400' : 'text-red-400'">
            {{ message }}
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-vue-next";
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
