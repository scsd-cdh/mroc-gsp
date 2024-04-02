<script setup lang="ts">
import {
  CMD_NEXT_EXPERIMENT_PHASE,
  CMD_TEST_SYSTEM_HEALTH,
  CMD_SET_STATE_IDLE,
  CMD_RESET,
  fetchExperimentStatus,
  CapsuleState
} from '../stores/commands.ts'
import { ref } from 'vue';
import { useSerialStore } from '../stores/useSerialStore'
import SelectMenu from "./SelectMenu.vue";
const portsStore = useSerialStore()
const experimentPhases = ['Idle', 'Preparation', 'Activation', 'Growth', 'Optogenetic Induction']
const experimentPhaseSelected =  ref('Idle')

</script>

<template>
<section class="drop-shadow-md bg-zinc-200 dark:bg-zinc-700 rounded-sm min-w-80 max-w-xs">
  <section class="font-medium p-5 border-b-[1px] dark:border-zinc-600">
  Commands
  </section>
  <section class="flex flex-col gap-2 p-2">
    <button
        @click="portsStore.setIdle()"
        class="hover:bg-blue-400 dark:hover:bg-blue-500 dark:bg-blue-600 group flex items-center rounded-sm bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm">
      <img alt="" width="20" height="20" class="mr-2" src="../assets/exclMark.svg">
      Set Idle State
    </button>
    <button
    @click="portsStore.sendCommand(CMD_NEXT_EXPERIMENT_PHASE)"
    class="hover:bg-blue-400 dark:hover:bg-blue-500 dark:bg-blue-600 group flex items-center rounded-sm  bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm">
      <img alt="" width="20" height="20" class="mr-2" src="../assets/SetNextStatement(RiderLight).svg">
      Next Experiment Phase
    </button>
    <div class="flex gap-2">
      <SelectMenu class="flex-1" v-model="experimentPhaseSelected" :options="experimentPhases"/>
      <button
          @click="portsStore.sendCommand(CMD_TEST_SYSTEM_HEALTH)"
          class="hover:bg-blue-400 dark:hover:bg-blue-500 dark:bg-blue-600 group flex items-center rounded-sm bg-blue-500 text-white text-sm font-medium px-2 shadow-sm">
        <img alt="" width="20" height="20" src="../assets/threadRunning.svg">
      </button>
    </div>
    <button
        @click="portsStore.sendCommand(CMD_TEST_SYSTEM_HEALTH)"
        class="hover:bg-blue-400 dark:hover:bg-blue-500 dark:bg-blue-600 group flex items-center rounded-sm bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm">
      <img alt="" width="20" height="20" class="mr-2" src="../assets/springBootHealth.svg">
      Test System Health
    </button>
    <button
    @click="portsStore.sendCommand(CMD_RESET)"
    class="hover:bg-blue-400 dark:hover:bg-blue-500 dark:bg-blue-600 group flex items-center rounded-sm bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm">
      <img alt="" width="20" height="20" class="mr-2" src="../assets/resetLesson.svg">
      Reset MCU
    </button>
  </section>
</section>
</template>


