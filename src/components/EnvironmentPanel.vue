<script setup lang="ts">
import ApexCharts from 'vue3-apexcharts'
import { ref } from "vue";
import { useSerialStore } from '../stores/useSerialStore';

const portsStore = useSerialStore();

const chartOptions = ref({
  theme: {
    mode: 'dark', // Switches the chart to the dark mode
    palette: 'palette1', // Optionally, choose a palette for the dark mode
    monochrome: {
      enabled: false,
      color: '#255aee',
      shadeTo: 'light',
      shadeIntensity: 0.65
    },
  },
  dataLabels: {
    enabled: false
  },
  chart: {
    background: 'transparent', // Dark background color
    toolbar: {
      show: false
    }
  },
  grid: {
    borderColor: '#444', // Darker grid lines for subtle contrast
  },
  xaxis: {
    range: 60,
    labels: {
      show: false // Set to false to hide the labels
    },
  }
})

const series = ref([{
  name: 'series-1',
  data: []
}])
</script>

<template>
<section class="grid grid-cols-2 gap-5 flex-1">
          <section class="drop-shadow-md bg-zinc-200 dark:bg-zinc-700 rounded-sm h-fit max-w-xl">
          <h2 class="text-center text-lg font-medium pt-5">Ambient Pressure [Pa]</h2>
            <ApexCharts width="100%" type="line" :options="chartOptions" :series="[{name: 'Ambient Pressure', data: portsStore.ambientPressure}]"></ApexCharts>
          </section>
          <section class="drop-shadow-md bg-zinc-200 dark:bg-zinc-700 rounded-sm h-fit max-w-xl">
          <h2 class="text-center text-lg font-medium pt-5">Humidity [%]</h2>
            <ApexCharts width="100%" type="line" :options="chartOptions" :series="[{name: 'Ambient Humidity', data: portsStore.ambientHumidity}]"></ApexCharts>
          </section><section class="drop-shadow-md bg-zinc-200 dark:bg-zinc-700 rounded-sm h-fit max-w-xl">
          <h2 class="text-center text-lg font-medium pt-5">Well Temperature [C]</h2>
            <ApexCharts width="100%" type="line" :options="chartOptions" :series="[{name: 'Well Temperature', data: portsStore.wellTemperature}]"></ApexCharts>
          </section>
          <section class="drop-shadow-md bg-zinc-200 dark:bg-zinc-700 rounded-sm h-fit max-w-xl">
          <h2 class="text-center text-lg font-medium pt-5">Ambient Temperature [C]</h2>
            <ApexCharts width="100%" type="line" :options="chartOptions" :series="[{name: 'Ambient Temperature', data: portsStore.ambientTemperature}]"></ApexCharts>
          </section>
        </section>
</template>
