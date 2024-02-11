<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { TelecommandResult, getCommandName, explainTelecommandResult } from "../stores/commands.ts";
import { useSerialStore } from '../stores/useSerialStore';

const portsStore = useSerialStore();
const now = ref(Date.now());

// Update `now` every minute to trigger reactivity
onMounted(() => {
  updateTime();
  setInterval(updateTime, 1000);
});

const updateTime = () => {
  now.value = new Date();
};

// Reactive method to calculate time ago
const timeAgo = (date) => {
  if (!date) return '';
  const seconds = Math.floor((now.value - new Date(date)) / 1000);

  let interval = seconds / 31536000; // 365 days
  if (interval > 1) {
    return `${Math.floor(interval)} year${Math.floor(interval) > 1 ? "s" : ""} ago`;
  }
  interval = seconds / 2592000; // 30 days
  if (interval > 1) {
    return `${Math.floor(interval)} month${Math.floor(interval) > 1 ? "s" : ""} ago`;
  }
  interval = seconds / 86400; // 24 hours
  if (interval > 1) {
    return `${Math.floor(interval)} day${Math.floor(interval) > 1 ? "s" : ""} ago`;
  }
  interval = seconds / 3600; // 60 minutes
  if (interval > 1) {
    return `${Math.floor(interval)} hour${Math.floor(interval) > 1 ? "s" : ""} ago`;
  }
  interval = seconds / 60;
  if (interval > 1) {
    return `${Math.floor(interval)} minute${Math.floor(interval) > 1 ? "s" : ""} ago`;
  }
  return `${Math.floor(seconds)} seconds${Math.floor(seconds) > 1 ? "s" : ""} ago`;
};
</script>

<template>
  <section class="drop-shadow-md bg-zinc-200 dark:bg-zinc-700 rounded-sm min-w-80 max-w-xs flex-1">
    <h2 class="font-medium p-5 border-b-[1px] dark:border-zinc-600">Command History</h2>
    <section class="max-h-[80%] overflow-auto">
      <template v-for="(tcAcknowledge, _) in portsStore.telecommandAcknowledge">
        <section
        v-if="tcAcknowledge.telecommandResult === TelecommandResult.SUCCESS"
        class="grid grid-cols-4 flex px-2 py-2 gap-2 border-t-[1px] dark:border-zinc-600"
        >
          <img alt="Success bubble" class="justify-self-center self-center" width="40" height="40" src="../assets/success.svg">
          <div class="col-span-3">
            <p class="font-medium">{{getCommandName(tcAcknowledge.telecommandId)}} [0x{{tcAcknowledge.telecommandId.toString(16).toUpperCase()}}]</p>
            <p class="italic">{{timeAgo(tcAcknowledge.receivedAt)}}</p>
            <p>{{explainTelecommandResult(tcAcknowledge.telecommandResult)}}</p>
          </div>
        </section>
        <section
        v-else
        class="grid grid-cols-4 px-2 py-2 gap-2 border-t-[1px] dark:border-zinc-600"
        >
          <img alt="" class="justify-self-center self-center" width="40" height="40" src="../assets/error.svg">
          <div class="col-span-3">
            <p class="font-medium">{{getCommandName(tcAcknowledge.telecommandId)}} [0x{{tcAcknowledge.telecommandId.toString(16).toUpperCase()}}]</p>
            <p class="italic">{{timeAgo(tcAcknowledge.receivedAt)}}</p>
            <p>{{explainTelecommandResult(tcAcknowledge.telecommandResult)}}</p>
          </div>
        </section>
      </template>
    </section>
  </section>
</template>
