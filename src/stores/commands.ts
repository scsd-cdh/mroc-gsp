import { invoke } from '@tauri-apps/api/tauri';

// Telecommands
export const CMD_NEXT_EXPERIMENT_PHASE   = 0x01
export const CMD_RUN_EXPERIMENT_PHASE    = 0x02
export const CMD_SET_LED_STATE           = 0x03
export const CMD_TEST_SYSTEM_HEALTH      = 0x04
export const CMD_SET_STATE_IDLE          = 0x05
export const CMD_RESET                   = 0x55
export const CMD_TC_MAX                  = 0x7F

// Telemetry Request
export const CMD_SYSTEM_STATUS           = 0x80
export const CMD_EXPERIMENT_STATUS       = 0x81
export const CMD_HARDWARE_HEALTH_STATUS  = 0x82
export const CMD_ENVIRONMENT_INFORMATION = 0x83
export const CMD_PHOTOSENSOR_RESULTS     = 0x84
export const CMD_TELECOMMAND_ACKNOWLEDGE = 0x85

export const SYSTEM_STATUS_BUF_LEN       = 5
export const EXPERIMENT_STATUS_BUF_LEN   = 5
export const HARDWARE_HEALTH_BUF_LEN     = 7
export const ENV_INFO_BUF_LEN            = 8
export const SENSOR_RESULTS_BUF_LEN      = 2
export const TC_ACK_BUF_LEN              = 2

const commandNames: { [key: number]: string } = {
	0x01: "Next Experiment Phase",
	0x02: "Run Experiment Phase",
	0x03: "Set LED State",
	0x04: "Test System Health",
	0x05: "Set State Idle",
	0x55: "Reset",
	0x7F: "Max Telecommand",
	0x80: "System Status",
	0x81: "Experiment Status",
	0x82: "Hardware Health Status",
	0x83: "Environment Information",
	0x84: "Photosensor Results",
	0x85: "Telecommand Acknowledge",
};

// Function to get the name of the command by its ID
export function getCommandName(commandId: number): string {
	return commandNames[commandId] || "Unknown Command";
}

export function formatEnumValue(enumValue: number, enumType: typeof CapsuleState | typeof TelecommandResult | typeof StateProgress): string {
	const key = enumType[enumValue];
	return key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
}

export enum CapsuleState {
	IDLE,
	PREPARATION,
  	ACTIVATION,
  	GROWTH,
  	INDUCTION
}

export enum TelecommandResult {
	SUCCESS,
    NOT_IN_IDLE_MODE,
    UNKNOWN_COMMAND,
    UNKNOWN_EXPERIMENT_PHASE,
    TOO_MANY_ARGUMENTS,
    TOO_FEW_ARGUMENTS,
    TIMEOUT
}

export enum StateProgress {
	INCOMPLETE,
	COMPLETE,
	ONGOING,
}

export interface SystemStatus {
	firmwareVersion: number;
	state: CapsuleState;
	uptimeSeconds: number;
}

export function explainTelecommandResult(result: TelecommandResult): string {
	switch (result) {
		case TelecommandResult.SUCCESS:
			return "The operation completed successfully.";
		case TelecommandResult.NOT_IN_IDLE_MODE:
			return "The command was rejected because the system is not in idle mode.";
		case TelecommandResult.UNKNOWN_COMMAND:
			return "The command sent to the system is unknown or unsupported.";
		case TelecommandResult.UNKNOWN_EXPERIMENT_PHASE:
			return "The specified experiment state is unknown or invalid.";
		case TelecommandResult.TOO_MANY_ARGUMENTS:
			return "The command was rejected because it contained too many arguments.";
		case TelecommandResult.TOO_FEW_ARGUMENTS:
			return "The command was rejected because it did not contain enough arguments.";
		case TelecommandResult.TIMEOUT:
			return "The operation timed out before completion.";
		default:
			return "An unknown error occurred.";
	}
}

export const fetchSystemStatus = async (port: string): SystemStatus => {
	await invoke('send_command', { port, command: CMD_SYSTEM_STATUS });
	new Promise(resolve => setTimeout(resolve, 500));
	
	const len = SYSTEM_STATUS_BUF_LEN;
	const data: Uint8Array = await invokeWithTimeout('read', { port, len }, 100, 3);
	
	let isError = true;

	for (const byte of data) {
		if (byte !== 255) {
			isError = false;
			break; 
		}
	}

	if (isError) {
		throw new Error('Got only 0xFF in response');
	}
	
	if (data.length < len) {
		throw new Error('Data is too short to contain a valid SystemStatus');
	}
	
	const firmwareVersionAndState = data[0];
	const firmwareVersion = firmwareVersionAndState >> 3;
	const state = firmwareVersionAndState & 0x07;
	let uptimeSeconds = (
		(data[1]) |
	    (data[2] << 8) |
	    (data[3] << 16) |
    	(data[4] << 24) >>> 0
	);
	
	return {
		firmwareVersion: firmwareVersion as number,
		state: state as CapsuleState,
		uptimeSeconds: uptimeSeconds as number
	}
}

export interface ExperimentStatus {
	state: CapsuleState,
	progress: StateProgress
}

export const fetchExperimentStatus = async(port: string): ExperimentStatus => {
	await invoke('send_command', { port, command: CMD_EXPERIMENT_STATUS });
	new Promise(resolve => setTimeout(resolve, 500));
	
	const len = EXPERIMENT_STATUS_BUF_LEN;
	const data: Uint8Array = await invokeWithTimeout('read', { port, len }, 100, 3);

	let isError = true;

	for (const byte of data) {
		if (byte !== 255) {
			isError = false;
			break; 
		}
	}

	if (isError) {
		throw new Error('Got only 0xFF in response');
	}
	
	if (data.length < len) {
		throw new Error('Data is too short to contain a valid ExperimentStatus');
	}
	
	const lastSuccessfulStateAndProgress = data[0];
	const lastState = lastSuccessfulStateAndProgress >> 3;
	const result = lastSuccessfulStateAndProgress & 0x07;

	return {
		state: lastState as CapsuleState,
		progress: result as StateProgress
	};
}

export interface HardwareHealthStatus {
	ledIsWorking: boolean[],
	pumpIsWorking: boolean,
	heaterIsWorking: boolean,
	voltageRegulatorIsWorking: boolean
}

export const fetchHardwareHealthStatus = async(port: string): HardwareHealthStatus => {
	await invoke('send_command', { port, command: CMD_HARDWARE_HEALTH_STATUS });
	new Promise(resolve => setTimeout(resolve, 500));
	
	const len = HARDWARE_HEALTH_BUF_LEN;
	const data: Uint8Array = await invokeWithTimeout('read', { port, len }, 100, 3);
	
	let isError = true;
	
	for (const byte of data) {
		if (byte !== 255) {
			isError = false;
			break; 
		}
	}
	
	if (isError) {
		throw new Error('Got only 0xFF in response');
	}
	
	if (data.length < len) {
		throw new Error('Data is too short to contain a valid ExperimentStatus');
	}
	
	let ledIsWorking: boolean[] = [];
	for (let i = 0; i < 7; i++) { 
		for (let bit = 0; bit < 8; bit++) {
			const isWorking = (data[i] & (1 << bit)) !== 0;
			ledIsWorking.push(isWorking);
		}
	}

	const otherDevices = data[6];
	const pumpIsWorking = (otherDevices & 0x01) !== 0;
	const heaterIsWorking = (otherDevices & 0x02) !== 0;
	const voltageRegulatorIsWorking = (otherDevices & 0x04) !== 0;

	return {
		ledIsWorking,
		pumpIsWorking,
		heaterIsWorking,
		voltageRegulatorIsWorking
	};
}

export interface EnvironmentInformation {
	wellTemperature: number,
	ambientTemperature: number,
	ambientPressure: number,
	ambientHumidity: number
}

export const fetchEnvironmentInformation = async(port: string): EnvironmentInformation => {
	await invoke('send_command', { port, command: CMD_ENVIRONMENT_INFORMATION });
	new Promise(resolve => setTimeout(resolve, 500));
	
	const len = ENV_INFO_BUF_LEN; // Total bytes for 4 uint16_t values
    const data: Uint8Array = await invokeWithTimeout('read', { port, len }, 100, 3);
	
	let isError = true;

	for (const byte of data) {
		if (byte !== 255) {
			isError = false;
			break; 
		}
	}

	if (isError) {
		throw new Error('Got only 0xFF in response');
	}
	
    if (data.length < len) {
        throw new Error('Data is too short to contain a valid EnvironmentInformation');
    }
	
	const wellTemperature = data[0] | (data[1] << 8);
	const ambientTemperature = data[2] | (data[3] << 8);
	const ambientPressure = data[4] | (data[5] << 8);
	const ambientHumidity = data[6] | (data[7] << 8);

	return {
		wellTemperature,
		ambientTemperature,
		ambientPressure,
		ambientHumidity
	};
}

interface PhotosensorResults {
	value: number[]
}

export interface TelecommandAcknowledge {
	telecommandId: number,
	telecommandResult: TelecommandResult,
	receivedAt: Date;
}

export const fetchTelecommandAcknowledge = async (port: string): Promise<TelecommandAcknowledge> => {
	await invoke('send_command', { port, command: CMD_TELECOMMAND_ACKNOWLEDGE });
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const len = TC_ACK_BUF_LEN;
  const data: Uint8Array = await invokeWithTimeout('read', { port, len }, 100, 3);
  
  let isError = true;

  for (const byte of data) {
    if (byte !== 255) {
      isError = false;
      break; 
    }
  }

  if (isError) {
    throw new Error('Got only 0xFF in response');
  }
  
  if (data.length < len) {
    throw new Error('Data is too short to contain a valid TelecommandAcknowledge');
  }
  
  const telecommandId = data[0];
  const telecommandResult = data[1];
  const receivedAt = new Date();

	return {
		telecommandId,
		telecommandResult: telecommandResult as TelecommandResult,
		receivedAt
	};
}

function invokeWithTimeout(commandName: string, params: any, timeoutMs: number = 5000, retries: number = 3): Promise<any> {
	let attempt = 0;
	const attemptInvoke = (): Promise<any> => {
		return new Promise((resolve, reject) => {
			const timeoutId = setTimeout(() => {
				reject(new Error('Timeout'));
				}, timeoutMs);

			invoke(commandName, params)
        .then((result) => {
			clearTimeout(timeoutId);
			resolve(result);
		})
        .catch((error) => {
			clearTimeout(timeoutId);
			reject(error);
		});
		});
	};

	const invokeRetry = (): Promise<any> => {
		return attemptInvoke().catch((error) => {
			if (attempt < retries) {
				attempt++;
				console.log(`Attempt ${attempt} failed, retrying...`);
				return invokeRetry();
			} else {
				throw error;
			}
		});
	};

	return invokeRetry();
}
