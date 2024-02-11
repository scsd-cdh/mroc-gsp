import { defineStore } from 'pinia'
import { invoke } from '@tauri-apps/api/tauri';
import {
	fetchSystemStatus,
	fetchExperimentStatus,
	fetchHardwareHealthStatus,
	fetchEnvironmentInformation,
	fetchTelecommandAcknowledge,
	CMD_SET_STATE_IDLE,
	SystemStatus,
	ExperimentStatus,
	HardwareHealthStatus,
	EnvironmentInformation,
	TelecommandAcknowledge
} from './commands.ts';

interface SerialState {
	current_port: String | null;
	ports: String[];
	fetchDataIntervalId: number | null;
	systemStatus: SystemStatus | null;
	experimentStatus: ExperimentStatus[];
	hardwareHealthStatus: HardwareHealthStatus | null;
	wellTemperature: number[],
	ambientTemperature: number[],
	ambientPressure: number[],
	ambientHumidity: number[],
	telecommandAcknowledge: TelecommandAcknowledge[];
}

export const useSerialStore = defineStore('serial', {
	state: (): SerialState => ({
		current_port: null,
		ports: [],
		fetchDataIntervalId: null,
		systemStatus: null,
		experimentStatus: [],
		hardwareHealthStatus: null,
		wellTemperature: [],
		ambientTemperature: [],
		ambientPressure: [],
		ambientHumidity: [],
		telecommandAcknowledge: []
	}),
	actions: {
		set_port(new_port: String) {
			this.current_port = new_port
		},
		clear_port() {
			this.current_port = ''
		},
		async fetchPorts() {
			try {
				this.ports = await invoke('get_ports');
			} catch (error) {
				console.error('Failed to fetch ports:', error);
				this.ports = [];
			}
		},
		connect() {
			if (this.fetchDataIntervalId !== null) {
				clearInterval(this.fetchDataIntervalId);
			}
			this.fetchDataIntervalId = setInterval(async () => {
				await this.fetchData();
				}, 1000);
		},
		disconnect() {
			if (this.fetchDataIntervalId !== null) {
				clearInterval(this.fetchDataIntervalId);
				this.fetchDataIntervalId = null;
			}
		},
		async setIdle() {
			if (!this.current_port) {
				console.error('No port selected');
				return;
			}
			
			await invoke('send_command', { port: this.current_port, command: CMD_SET_STATE_IDLE });
			new Promise(resolve => setTimeout(resolve, 300));
			this.experimentStatus.push(await fetchExperimentStatus(this.current_port));
		},
		async sendCommand(commandId: number) {
			if (!this.current_port) {
				console.error('No port selected');
				return;
			}
			
			await invoke('send_command', { port: this.current_port, command: commandId });
			new Promise(resolve => setTimeout(resolve, 300));
			this.telecommandAcknowledge.push(await fetchTelecommandAcknowledge(this.current_port));
		},
		async fetchData() {
			if (!this.current_port) {
				console.error('No port selected');
				return;
			}
			try {
				const port = this.current_port;
				this.systemStatus = await fetchSystemStatus(port);
				this.hardwareHealthStatus = await fetchHardwareHealthStatus(port);
				
				const environmentInformation = await fetchEnvironmentInformation(port);
				this.wellTemperature.push(environmentInformation.wellTemperature);
				this.ambientTemperature.push(environmentInformation.ambientTemperature);
				this.ambientPressure.push(environmentInformation.ambientPressure);
				this.ambientHumidity.push(environmentInformation.ambientHumidity);
			} catch (error) {
				console.error('Failed to fetch data:', error);
			}
		}
	},
})
