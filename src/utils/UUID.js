const UUID = {
	ble: {
		uuid: "22bb746f-2bb0-7554-2d6f-726568705327",
		characteristics: {
			wake: {
				uuid: "22bb746f-2bbf-7554-2d6f-726568705327"
			},
			txPower: {
				uuid: "22bb746f-2bb2-7554-2d6f-726568705327"
			},
			antiDOS: {
				uuid: "22bb746f-2bbd-7554-2d6f-726568705327"
			}
		}
	},
	robotControl: {
		uuid: "22bb746f-2ba0-7554-2d6f-726568705327",
		characteristics: {
			commands: {
				uuid: "22bb746f-2ba1-7554-2d6f-726568705327"
			},
			response: {
				uuid: "22bb746f-2ba6-7554-2d6f-726568705327"
			}
		}
	}
}

export default UUID;