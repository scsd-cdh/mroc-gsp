<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import SelectMenu from "./SelectMenu.vue";
import InputNumber from "./InputNumber.vue";
import { useSerialStore } from '../stores/useSerialStore'

const portsStore = useSerialStore()

const emit = defineEmits(['update:value']);
const baudrate = ref(115200);
const closeDialog = () => {
  emit('update:value', false);
};

const selectedOption = computed({
  get: () => portsStore.current_port,
  set: (newValue) => {
    portsStore.set_port(newValue);
  }
});

</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex justify-between">
      <h2 class="font-medium">Connection Settings</h2>
      <div class="cursor-pointer">
        <img alt="" width="20" height="20" class="mr-2" src="../assets/resetLesson.svg">
      </div>
    </div>
    <div class="flex flex-col gap-2 bg-white p-2 rounded-xl border-[1px] border-gray-300 shadow-sm">
      <div class="flex flex-col">
        <span class="text-sm">Port</span>
        <SelectMenu v-model="selectedOption" :options="['None', ...portsStore.ports]"/>
      </div>
      <div class="flex flex-col">
        <span class="text-sm">Baudrate</span>
        <InputNumber v-model="baudrate"/>
      </div>
      <button type="button" class="pointer-events-auto rounded-md bg-indigo-600 px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500">Connect</button>
    </div>
  </div>

</template>
