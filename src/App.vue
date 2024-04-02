<script setup lang="ts">
import Nav from './components/Nav.vue'
import EnvironmentPanel from "./components/EnvironmentPanel.vue";
import SensorData from "./components/SensorData.vue";
import Settings from "./components/Settings.vue";

</script>

<template>
  <div class="main-panel bg-neutral-50">
    <section class="flex flex-col h-screen px-5 gap-5">
      <Nav/>
      <div class="flex gap-5">
        <div class="flex flex-col justify-between">
          <Settings/>
          <ul class="text-sm self-center">
            <li class="flex flex-row items-center relative mb-7">
              <div class="w-[2px] h-[1.5em] bg-neutral-200 absolute left-0.5 top-6"></div>
              <div class="w-[1.5em] h-[1.5em] left-[-0.5em] rounded-full absolute">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#4f46e5" aria-hidden="true" class="oc se ayg">
                  <circle r="5" cx="12" cy="12" fill="rgb(212 212 212)" />
                </svg>
              </div>
              <p class="ml-5">
                Idle
              </p>
            </li>
            <li class="flex flex-row items-center relative mb-7">
              <div class="w-[2px] h-[1.5em] bg-neutral-200 absolute left-0.5 top-6"></div>
              <div class="w-[1.5em] h-[1.5em] left-[-0.5em] rounded-full absolute">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#4f46e5" aria-hidden="true" class="oc se ayg"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd"></path></svg>
              </div>
              <p class="ml-5 text-neutral-300 cursor-pointer">
                Preparation
              </p>
            </li>
            <li class="flex flex-row items-center relative mb-7">
              <div class="w-[2px] h-[1.5em] bg-neutral-200 absolute left-0.5 top-6"></div>
              <div class="w-[1.5em] h-[1.5em] left-[-0.5em] rounded-full absolute">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#4f46e5" aria-hidden="true" class="oc se ayg"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd"></path></svg>
              </div>
              <p class="ml-5 text-neutral-300">
                Activation
              </p>
            </li>
            <li class="flex flex-row items-center relative mb-7">
              <div class="w-[2px] h-[1.5em] bg-neutral-200 absolute left-0.5 top-6"></div>
              <div class="w-[1.5em] h-[1.5em] left-[-0.5em] rounded-full absolute">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#4f46e5" aria-hidden="true" class="oc se ayg"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd"></path></svg>
              </div>
              <p class="ml-5 text-neutral-300">
                Growth
              </p>
            </li>
            <li class="flex flex-row items-center relative mb-7">
              <div class="w-[1.5em] h-[1.5em] left-[-0.5em] rounded-full absolute">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#4f46e5" aria-hidden="true" class="oc se ayg"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd"></path></svg>
              </div>
              <p class="ml-5 text-neutral-300">
                Optogenetic Induction
              </p>
            </li>
          </ul>
          <div></div>
        </div>

        <SensorData/>
        <EnvironmentPanel/>
      </div>
    </section>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

.main-panel {
  font-family: "Roboto", sans-serif;
}

</style>
