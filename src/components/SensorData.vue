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
  <section class="flex flex-col gap-2 flex-1">
    <h2 class="col-span-4 font-medium">Sensor Data</h2>
    <section class="shadow-sm border-[1px] border-gray-300 bg-white dark:bg-zinc-700 rounded-2xl">
      <div class="flex gap-2 p-1">
        <img alt="" class="p-2 justify-self-center self-center bg-neutral-50 border-[1px] border-gray-300 rounded-2xl" width="45" height="45" src="../assets/lightbulb.png">
        <div class="flex flex-col">
          <h2 class="text-sm text-neutral-500">Illuminance</h2>
          <span class="font-bold">0 lux</span>
        </div>
      </div>

      <ApexCharts height="50%" type="line" :options="chartOptions" :series="[{name: 'Ambient Pressure', data: portsStore.ambientPressure}]"></ApexCharts>
    </section>
    <section class="shadow-sm border-[1px] border-gray-300 bg-white dark:bg-zinc-700 rounded-2xl h-fit">
      <div class="flex gap-2 p-1">
        <img alt="" class="p-2 justify-self-center self-center bg-neutral-50 border-[1px] border-gray-300 rounded-2xl" width="45" height="45" src="../assets/lightbulb.png">
        <div class="flex flex-col">
          <h2 class="text-sm text-neutral-500">Illuminance</h2>
          <span class="font-bold">0 lux</span>
        </div>
      </div>

      <ApexCharts height="50%" type="line" :options="chartOptions" :series="[{name: 'Ambient lightbulb', data: portsStore.ambientlightbulb}]"></ApexCharts>
    </section>
    <section class="shadow-sm border-[1px] border-gray-300 bg-white dark:bg-zinc-700 rounded-2xl h-fit">
      <div class="flex gap-2 p-1">
        <img alt="" class="p-2 justify-self-center self-center bg-neutral-50 border-[1px] border-gray-300 rounded-2xl" width="45" height="45" src="../assets/lightbulb.png">
        <div class="flex flex-col">
          <h2 class="text-sm text-neutral-500">Illuminance</h2>
          <span class="font-bold">0 lux</span>
        </div>
      </div>

      <ApexCharts height="50%" type="line" :options="chartOptions" :series="[{name: 'Ambient Temperature', data: portsStore.ambientTemperature}]"></ApexCharts>
    </section>
    <section class="shadow-sm border-[1px] border-gray-300 bg-white dark:bg-zinc-700 rounded-2xl h-fit">
      <div class="flex gap-2 p-1">
        <img alt="" class="p-2 justify-self-center self-center bg-neutral-50 border-[1px] border-gray-300 rounded-2xl" width="45" height="45" src="../assets/lightbulb.png">
        <div class="flex flex-col">
          <h2 class="text-sm text-neutral-500">Illuminance</h2>
          <span class="font-bold">0 lux</span>
        </div>
      </div>

      <ApexCharts height="50%" type="line" :options="chartOptions" :series="[{name: 'Ambient Temperature', data: portsStore.ambientTemperature}]"></ApexCharts>
    </section>
  </section>
</template>
