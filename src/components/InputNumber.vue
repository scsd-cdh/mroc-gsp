<script setup lang="ts">

const props = defineProps({
	modelValue: Number,
});

</script>


<template>
  <div class="select-none relative mt-2" @click.stop="toggleOptions">

    <input v-model="props.modelValue" class="relative w-full cursor-default rounded-sm bg-white dark:bg-zinc-700 py-1.5 pl-6 pr-10 text-left shadow-sm ring-1 ring-inset outline-none hover:cursor-pointer ring-gray-300 dark:ring-zinc-600 sm:text-sm sm:leading-6" type="text"/>
  </div>
</template>
