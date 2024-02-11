<script setup lang="ts">
import { formatEnumValue, CapsuleState, StateProgress } from "../stores/commands.ts";
import { useSerialStore } from '../stores/useSerialStore';

const portsStore = useSerialStore();

</script>

<template>
<section class="drop-shadow-md bg-zinc-200 dark:bg-zinc-700 rounded-sm min-w-80 max-w-xs">
	<section class="font-medium p-5 border-b-[1px] dark:border-zinc-600">
	Experiment History
	</section>
	<section class="flex flex-col gap-2">
		<section class="flex px-2 py-2 gap-2 border-t-[1px] dark:border-zinc-600" v-for="(experiment, _) in portsStore.experimentStatus">
			<template v-if="experiment.progress == StateProgress.COMPLETE">
						<img  alt="" width="30" height="30" src="../assets/success.svg">
					<div>
					<p class="font-medium">{{formatEnumValue(experiment.state, CapsuleState)}}</p>
					<p>{{formatEnumValue(experiment.progress, StateProgress)}}</p>
				</div>
			</template>
			<template v-else>
						<img alt="" width="30" height="30" src="../assets/testIgnored.svg">
				<div>
					<p class="font-medium">{{formatEnumValue(experiment.state, CapsuleState)}}</p>
					<p>{{formatEnumValue(experiment.progress, StateProgress)}}</p>
				</div>
			</template>
		</section>
		<template v-if="portsStore.experimentStatus.length === 0">
		<section class="items-center justify-center flex px-2 py-2 gap-2 border-t-[1px] dark:border-zinc-600 text-zinc-300">
				No Data to Show
		</section>
		</template>
	</section>
</section>
</template>
