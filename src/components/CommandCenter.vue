<script setup lang="ts">
import {
  CMD_NEXT_EXPERIMENT_PHASE,
  CMD_TEST_SYSTEM_HEALTH,
  CMD_SET_STATE_IDLE,
  CMD_RESET,
  fetchExperimentStatus
} from '../stores/commands.ts'
import { useSerialStore } from '../stores/useSerialStore'
const portsStore = useSerialStore()

</script>

<template>
<section class="drop-shadow-md bg-zinc-200 dark:bg-zinc-700 rounded-sm min-w-80 max-w-xs">
  <section class="font-medium p-5 border-b-[1px] dark:border-zinc-600">
  Commands
  </section>
  <section class="flex flex-col gap-2 p-2">
    <button
    @click="portsStore.sendCommand(CMD_NEXT_EXPERIMENT_PHASE)"
    class="hover:bg-blue-400 dark:hover:bg-blue-500 dark:bg-blue-600 group flex items-center rounded-sm  bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm">
      <img alt="" width="20" height="20" class="mr-2" src="../assets/SetNextStatement(RiderLight).svg">
      Next Experiment Phase
    </button>
    <button class="hover:bg-blue-400 dark:hover:bg-blue-500 dark:bg-blue-600 group flex items-center rounded-sm bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm">
      <img alt="" width="20" height="20" class="mr-2" src="../assets/threadRunning.svg">
      Run Experiment Phase
    </button>
    <button class="hover:bg-blue-400 dark:hover:bg-blue-500 dark:bg-blue-600 group flex items-center rounded-sm bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm">
      <img alt="" width="20" height="20" class="mr-2" src="../assets/intentionBulb.svg">
      Customize LED Pattern
    </button>
    <button
    @click="portsStore.sendCommand(CMD_TEST_SYSTEM_HEALTH)"
    class="hover:bg-blue-400 dark:hover:bg-blue-500 dark:bg-blue-600 group flex items-center rounded-sm bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm">
      <img alt="" width="20" height="20" class="mr-2" src="../assets/springBootHealth.svg">
      Test System Health
    </button>
    <button
    @click="portsStore.setIdle()"
    class="hover:bg-blue-400 dark:hover:bg-blue-500 dark:bg-blue-600 group flex items-center rounded-sm bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm">
      <img alt="" width="20" height="20" class="mr-2" src="../assets/exclMark.svg">
      Set Idle State
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


