import UUID from "./UUID";

let bluetoothDevice;
let gattServer;

let bleService;
let wakeCharacteristic;

let robotService;
let controlCharacteristic;

let busy = false;
let sequence = 0;

export function isWebBLEAvailable() {
	if (!navigator.bluetooth) {
		console.log('Web Bluetooth is not available!');
		return false;
	};

	return true;
};

function sendCommand(did, cid, data) {
	// Create client command packets
	// API docs: https://github.com/orbotix/DeveloperResources/blob/master/docs/Sphero_API_1.50.pdf
	// Next sequence number
	let seq = sequence & 255;
	sequence += 1
	// Start of packet #2
	let sop2 = 0xfc;
	sop2 |= 1; // Answer
	sop2 |= 2; // Reset timeout
	// Data length
	let dlen = data.byteLength + 1;
	let sum = data.reduce((a, b) => {
		return a + b;
	});
	// Checksum
	let chk = (sum + did + cid + seq + dlen) & 255;
	chk ^= 255;
	let checksum = new Uint8Array([chk]);

	let packets = new Uint8Array([0xff, sop2, did, cid, seq, dlen]);
	// Append arrays: packet + data + checksum
	let array = new Uint8Array(packets.byteLength + data.byteLength + checksum.byteLength);
	array.set(packets, 0);
	array.set(data, packets.byteLength);
	array.set(checksum, packets.byteLength + data.byteLength);
	return controlCharacteristic.writeValue(array);
}

export function setColor(r, g, b) {
	console.log('Set color: r=' + r + ',g=' + g + ',b=' + b);
	if (busy) {
		// Return if another operation pending
		return Promise.resolve();
	}
	busy = true;
	let did = 0x02; // Virtual device ID
	let cid = 0x20; // Set RGB LED Output command
	// Color command data: red, green, blue, flag
	let data = new Uint8Array([r, g, b, 0]);

	sendCommand(did, cid, data).then(() => {
		busy = false;
	})
	.catch(error => {
		console.log('Argh! ' + error);
	});
}

export function roll(heading) {
	console.log('Roll heading=' + heading);
	if (busy) {
		// Return if another operation pending
		return Promise.resolve();
	}
	busy = true;
	let did = 0x02; // Virtual device ID
	let cid = 0x30; // Roll command
	// Roll command data: speed, heading (MSB), heading (LSB), state
	let data = new Uint8Array([80, heading >> 8, heading & 0xFF, 1]);

	sendCommand(did, cid, data).then(() => {
		busy = false;
	})
	.catch(error => {
		console.log('Argh! ' + error);
	});
}

export function stop(heading) {
	console.log('Stopping.');
	if (busy) {
		// Return if another operation pending
		return Promise.resolve();
	}
	busy = true;
	let did = 0x02; // Virtual device ID
	let cid = 0x30; // Roll command
	// Roll command data: speed, heading (MSB), heading (LSB), state
	let data = new Uint8Array([0, heading >> 8, heading & 0xFF, 1]);

	sendCommand(did, cid, data).then(() => {
		busy = false;
	})
	.catch(error => {
		console.log('Argh! ' + error);
	});
}

export function connectToSphero(onConnected, onDisconnected) {

	let options = {
		filters: [
			{ name: 'SK-C385' }
		],
		optionalServices: [UUID.ble.uuid, UUID.robotControl.uuid]
	};

	console.log('Requesting BLE device info...')
	navigator.bluetooth.requestDevice(options)
		.then(device => {
			bluetoothDevice = device;
			bluetoothDevice.addEventListener('gattserverdisconnected', onDisconnected);
			console.log('Connecting to GATT Server...');
			return device.gatt.connect();
		})
		.then(server => {
			console.log('> Found GATT server');
			gattServer = server;
			// Get BLE service
			return gattServer.getPrimaryService(UUID.ble.uuid);
		})
		.then(service => {
			console.log('> Found BLE service');
			bleService = service;
			// Get antiDos characteristic
			return bleService.getCharacteristic(UUID.ble.characteristics.antiDOS.uuid);
		})
		.then(characteristic => {
			console.log('> Found antiDos characteristic');
			// Send special string
			let bytes = new Uint8Array('011i3'.split('').map(c => c.charCodeAt()));
			return characteristic.writeValue(bytes).then(() => {
				console.log('Anti DOS write done.');
			})
		})
		.then(() => {
			// Get TX Power characteristic
			return bleService.getCharacteristic(UUID.ble.characteristics.txPower.uuid);
		})
		.then(characteristic => {
			console.log('> Found TX Power characteristic');
			let array = new Uint8Array([0x07]);
			return characteristic.writeValue(array).then(() => {
				console.log('TX Power write done.');
			})
		})
		.then(() => {
			// Get Wake CPU characteristic
			return bleService.getCharacteristic(UUID.ble.characteristics.wake.uuid);
		})
		.then(characteristic => {
			console.log('> Found Wake CPU characteristic');
			wakeCharacteristic = characteristic;
			let array = new Uint8Array([0x01]);
			return characteristic.writeValue(array).then(() => {
				console.log('Wake CPU write done.');
			})
		})
		.then(() => {
			// Get robot service
			return gattServer.getPrimaryService(UUID.robotControl.uuid)
		})
		.then(service => {
			// Commands are sent to the robot service
			robotService = service;
			// Get Control characteristic
			return robotService.getCharacteristic(UUID.robotControl.characteristics.commands.uuid);
		})
		.then(characteristic => {
			console.log('> Found Control characteristic');
			// Cache the characteristic
			controlCharacteristic = characteristic;
			return onConnected();
		})
		.catch(error => {
			console.log('Argh! ' + error);
		});

}

export function isConnected() {
	wakeCharacteristic.readValue()
	.catch(() => {
		return false;
	});

	return true;
}