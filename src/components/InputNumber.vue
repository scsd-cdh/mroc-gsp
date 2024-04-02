<script setup lang="ts">

const props = defineProps({
	modelValue: Number,
});

</script>


<template>
  <div class="select-none relative" @click.stop="toggleOptions">
    <input v-model="props.modelValue" class="relative w-full cursor-default rounded-md bg-white dark:bg-zinc-700 py-1.5 px-2 text-left shadow-sm ring-1 ring-inset outline-none hover:cursor-pointer ring-gray-300 dark:ring-zinc-600 sm:text-sm sm:leading-6" type="text"/>
  </div>
</template>
