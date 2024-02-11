<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import SelectMenu from "./SelectMenu.vue";
import InputNumber from "./InputNumber.vue";
import { useSerialStore } from '../stores/useSerialStore'

const portsStore = useSerialStore()

const props = defineProps({
  value: Boolean,
});

watch(() => props.value, async (newValue) => {
  if (newValue) {
    await portsStore.fetchPorts();
  }
});

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
<div v-if="props.value" class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

  <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <div class="bg-white dark:bg-zinc-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div class="grid grid-cols-2 gap-1 items-center">
            <h3 class="text-base font-semibold leading-6 col-span-2" id="modal-title">Serial Port</h3>
            <span>Port</span>
            <SelectMenu v-model="selectedOption" :options="['None', ...portsStore.ports]"/>
            <span>Baudrate</span>
            <InputNumber v-model="baudrate"/>
            <h3 class="text-base font-semibold leading-6 col-span-2" id="modal-title">Output</h3>
            <span>Workspace Directory</span>
            <input type="text"/>
          </div>
        </div>
        <div class="bg-white dark:bg-zinc-800 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button @click="closeDialog" type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Close</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
