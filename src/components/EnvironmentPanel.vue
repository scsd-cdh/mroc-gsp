<script setup lang="ts">
import ApexCharts from 'vue3-apexcharts'
import { ref } from "vue";
import { useSerialStore } from '../stores/useSerialStore';

const portsStore = useSerialStore();

const chartOptions = ref({
  theme: {
    mode: 'dark',
    palette: 'palette1',
    monochrome: {
      enabled: false,
      color: '#4f46e5',
      shadeTo: 'light',
      shadeIntensity: 0.65
    },
  },
  dataLabels: {
    enabled: false
  },
  chart: {
    background: 'transparent',
    toolbar: {
      show: false
    }
  },
  grid: {
    show: false,
    xaxis: {
      lines: {
        show: false
      }
    },
    yaxis: {
      lines: {
        show: false
      }
    },
  },
  yaxis: {
    labels: {
      show: false
    }
  },
  xaxis: {
    range: 60,
    labels: {
      show: false
    },
  }
})
</script>

<template>
<section class="flex flex-col gap-2 flex-1 items-start">
  <h2 class="font-medium">Environment Information</h2>
  <div class="flex gap-2">
    <section class="border-[1px] border-gray-300 shadow-sm bg-white dark:bg-zinc-700 rounded-2xl h-fit">
      <div class="flex gap-2 p-1">
        <img alt="" class="p-2 justify-self-center self-center bg-neutral-50 border-[1px] border-gray-300 rounded-2xl" width="45" height="45" src="../assets/pressure.png">
        <div class="flex flex-col">
          <h2 class="text-sm text-neutral-500">Ambient Pressure</h2>
          <span class="font-bold">0 psi</span>
        </div>
      </div>

      <ApexCharts width="100%" type="line" :options="chartOptions" :series="[{name: 'Ambient Pressure', data: portsStore.ambientPressure}]"></ApexCharts>
    </section>
    <section class="border-[1px] border-gray-300 shadow-sm bg-white dark:bg-zinc-700 rounded-2xl h-fit">
      <div class="flex gap-2 p-1">
        <img alt="" class="p-2 justify-self-center self-center bg-neutral-50 border-[1px] border-gray-300 rounded-2xl" width="45" height="45" src="../assets/humidity.png">
        <div class="flex flex-col">
          <h2 class="text-sm text-neutral-500">Ambient Humidity</h2>
          <span class="font-bold">0 %</span>
        </div>
      </div>

      <ApexCharts width="100%" type="line" :options="chartOptions" :series="[{name: 'Ambient Humidity', data: portsStore.ambientHumidity}]"></ApexCharts>
    </section>
  </div>
  <div class="flex gap-2">
    <section class="border-[1px] border-gray-300 shadow-sm bg-white dark:bg-zinc-700 rounded-2xl h-fit">
      <div class="flex gap-2 p-1">
        <img alt="" class="p-2 justify-self-center self-center bg-neutral-50 border-[1px] border-gray-300 rounded-2xl" width="45" height="45" src="../assets/temperature.png">
        <div class="flex flex-col">
          <h2 class="text-sm text-neutral-500">Ambient Temperature</h2>
          <span class="font-bold">0 °C</span>
        </div>
      </div>

      <ApexCharts width="100%" type="line" :options="chartOptions" :series="[{name: 'Ambient Temperature', data: portsStore.ambientTemperature}]"></ApexCharts>
    </section>
    <section class="border-[1px] border-gray-300 shadow-sm bg-white dark:bg-zinc-700 rounded-2xl h-fit">
      <div class="flex gap-2 p-1">
        <img alt="" class="p-2 justify-self-center self-center bg-neutral-50 border-[1px] border-gray-300 rounded-2xl" width="45" height="45" src="../assets/temperature.png">
        <div class="flex flex-col">
          <h2 class="text-sm text-neutral-500">Well Temperature</h2>
          <span class="font-bold">0 °C</span>
        </div>
      </div>

      <ApexCharts width="100%" type="line" :options="chartOptions" :series="[{name: 'Well Temperature', data: portsStore.wellTemperature}]"></ApexCharts>
    </section>
  </div>
</section>
</template>
