<template>
  <Card class="w-full max-w-md">
    <CardContent class="p-6">
      <h2 class="text-lg font-bold mb-4">Tendencia de Humedad</h2>

      <!-- Spinner de carga -->
      <div v-if="loading" class="flex justify-center items-center h-40">
        <Loader2 class="animate-spin text-gray-500 w-8 h-8" />
      </div>

      <!-- Gráfico de Humedad -->
      <canvas v-show="!loading" ref="chartCanvas"></canvas>

      <!-- Mensaje si no hay datos -->
      <p v-if="!loading && humidityCharts.length === 0" class="text-center text-gray-500 mt-4">
        No hay datos disponibles
      </p>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, defineProps } from 'vue';
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-vue-next";
import Chart from 'chart.js/auto';

interface HistoryEntry {
  date: string;
  humidity: number;
}

const props = defineProps<{ humidityCharts: HistoryEntry[] }>();
const chartCanvas = ref<HTMLCanvasElement | null>(null);
const loading = ref<boolean>(true);
let chartInstance: Chart | null = null;

const renderChart = () => {

  console.log('ejecutandose')
  if (!chartCanvas.value || props.humidityCharts.length === 0) return;

  // Destruir gráfico anterior si existe
  if (chartInstance) {
    chartInstance.destroy();
  }

  // Crear nuevo gráfico
  chartInstance = new Chart(chartCanvas.value, {
    type: 'line',
    data: {
      labels: props.humidityCharts.map(entry => entry.date),
      datasets: [
        {
          label: 'Humedad (%)',
          data: props.humidityCharts.map(entry => entry.humidity),
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });

  loading.value = false; // Ocultar spinner
};

// Monitorear cambios en `historyData`
watch(() => props.humidityCharts, () => {
  loading.value = true; // Mostrar spinner antes de actualizar
  setTimeout(renderChart, 500); // Retraso para evitar parpadeos
}, { deep: true });

// Renderizar gráfico al montar el componente
onMounted(() => {
  setTimeout(renderChart, 1000);
});

// Limpiar gráfico al desmontar el componente
onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy();
  }
});
</script>

<style scoped>
canvas {
  max-height: 300px;
}
</style>

