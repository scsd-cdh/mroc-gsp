<script setup lang="ts">
import Nav from './components/Nav.vue'
import ExperimentHistory from './components/ExperimentHistory.vue'
import CommandCenter from './components/CommandCenter.vue'
import CommandHistory from './components/CommandHistory.vue'
import EnvironmentPanel from './components/EnvironmentPanel.vue';

</script>

<template>
  <div class="dark main-panel">
    <section class="dark:bg-zinc-900 dark:text-zinc-200 flex flex-col h-screen px-10 gap-5">
      <Nav/>

      <section class="flex gap-5">
      <section class="flex flex-col gap-5">
        <ExperimentHistory />
        <a href="/new" class="hover:bg-blue-400 dark:hover:bg-blue-500 dark:bg-blue-600 group flex items-center rounded-sm  bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm">
            <img width="20" height="20" class="mr-2" src="./assets/chartLine.svg">
            View Live Experiment Data
          </a>
          <section class="drop-shadow-md bg-zinc-200 dark:bg-zinc-700 rounded-sm min-w-80 max-w-xs">
            <h2 class="font-medium p-5 dark:border-zinc-600">System Health</h2>
            <section class="max-h-80 overflow-auto">
              <section class="flex px-2 py-2 gap-2 items-center border-t-[1px] dark:border-zinc-600">
                <img width="30" height="30" src="./assets/successDialog.svg">
                <p class="font-medium">LEDs Health</p>
              </section>
              <section class="flex px-2 py-2 gap-2 items-center border-t-[1px] dark:border-zinc-600">
                <img width="30" height="30" src="./assets/successDialog.svg">
                <p class="font-medium">Pump Health</p>
              </section>
              <section class="flex px-2 py-2 gap-2 items-center border-t-[1px] dark:border-zinc-600">
                <img width="30" height="30" src="./assets/successDialog.svg">
                <p class="font-medium">Heater Health</p>
              </section>
              <section class="flex px-2 py-2 gap-2 items-center border-t-[1px] dark:border-zinc-600">
                <img width="30" height="30" src="./assets/successDialog.svg">
                <p class="font-medium">Voltage Regulator Health</p>
              </section>
            </section>

          </section>
        </section>
        <EnvironmentPanel />
        <section class="flex flex-col gap-5">
        <CommandCenter />
        <CommandHistory />
        </section>
        </section>
    </section>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap');

.main-panel {
  font-family: "Segoe UI", sans-serif;
}

</style>
