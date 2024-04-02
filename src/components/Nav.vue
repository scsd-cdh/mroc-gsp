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

  </section>
</template>

