<script setup lang="ts">
import { ref, watchEffect, onMounted } from 'vue';
import Settings from './Settings.vue';
import { CapsuleState } from "../stores/commands.ts";
import { useSerialStore } from '../stores/useSerialStore'

const portsStore = useSerialStore()

const systemStatus = ref(portsStore.systemStatus);

watchEffect(() => {
  systemStatus.value = portsStore.systemStatus;
});

const formatUptime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const getCapsuleStateName = (state: CapsuleState): string => {
  return CapsuleState[state];
};

const currentTime = ref('');
const currentDay = ref('');
const currentDate = ref('');
const settingsOpen = ref(false);

const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  currentDay.value = now.toLocaleDateString('en-US', { weekday: 'long' });
  currentDate.value = now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

onMounted(async () => {
//  await requestSystemStatus();
  updateTime();
  setInterval(updateTime, 1000);
});
</script>


<template>
  <section class="grid grid-cols-3 items-center">
    <section>
      <p class="text-2xl">
        {{ currentTime }}
      </p>
      <span class="mr-5">
        {{ currentDay }}
      </span>
      <span class="border-l-[1px] border-zinc-500 pl-2">
        {{ currentDate }}
      </span>
    </section>
    <section class="self-start bg-zinc-200 dark:bg-zinc-700 py-2 px-5 rounded-b-lg drop-shadow-lg text-center min-w-80">
    <template v-if="systemStatus == null">
      <span class="text-zinc-300">Waiting for connection...</span>
    </template>
    <template v-else>
      <h2 class="text-xs text-zinc-300 font-medium">
        Firmware v{{ systemStatus.firmwareVersion }}
      </h2>
      <h2 class="text-lg font-medium">
        {{ getCapsuleStateName(systemStatus.state) }} MODE
      </h2>
      <p>
        {{ formatUptime(systemStatus.uptimeSeconds) }}
      </p>
    </template>
    </section>
    <section class="flex justify-end gap-5">
      <img @click="settingsOpen = true" alt="Gear" class="cursor-pointer" width="25" height="25" src="../assets/gear.svg">
      <img
      v-show="portsStore.fetchDataIntervalId === null"
        @click="portsStore.connect()"
        class="cursor-pointer"
        alt="Connection Status"
        width="25"
        height="25"
        src="../assets/disconnectedSerial_dark.svg">
      <img
        v-show="portsStore.fetchDataIntervalId !== null"
        @click="portsStore.disconnect()"
        class="cursor-pointer"
        alt="Connection Status"
        width="25"
        height="25"
        src="../assets/connectedSerial_dark.svg">
    </section>
    <Settings :value="settingsOpen" @update:value="(val) => settingsOpen = val" />
  </section>
</template>

