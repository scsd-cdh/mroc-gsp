<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  options: Array,
  modelValue: String,
});

const emit = defineEmits(['update:modelValue']);
const selectedValue = ref(props.modelValue || 'None');

watch(() => props.modelValue, (newValue) => {
  selectedValue.value = newValue;
});

// Method to update the selected value and emit the change
const updateValue = (newValue) => {
  selectedValue.value = newValue;
  emit('update:modelValue', newValue);
  closeOptions();
};

const showOptions = ref(false);

const toggleOptions = (event) => {
  event.stopPropagation();
  showOptions.value = !showOptions.value;
};

const closeOptions = () => {
  showOptions.value = false;
};

onMounted(() => {
  document.addEventListener('click', closeOptions);
});

onUnmounted(() => {
  document.removeEventListener('click', closeOptions);
});

</script>


<template>
  <div class="select-none relative mt-2" @click.stop="toggleOptions">
    <button class="relative w-full cursor-default rounded-sm bg-white dark:bg-zinc-700 py-1.5 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-zinc-600 sm:text-sm sm:leading-6" aria-haspopup="listbox">
      <span class="flex items-center">
        <span class="ml-3 block truncate">{{ selectedValue }}</span>
      </span>
      <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" />
        </svg>
      </span>
    </button>

    <ul v-show="showOptions" class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white dark:bg-zinc-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" tabindex="-1" role="listbox">
      <li v-for="(option, index) in props.options" :key="index" @click.stop="updateValue(option)" class="cursor-pointer hover:dark:bg-zinc-600 select-none py-2 pl-3 pr-9" role="option">
        <div class="flex items-center">
          <span class="font-normal ml-3 block truncate">{{ option }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
