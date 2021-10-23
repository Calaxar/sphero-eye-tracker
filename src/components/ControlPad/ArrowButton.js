import { roll, stop } from "../../utils/ble";

const ArrowButton = (props) => {
	var className;
	var direction;
	var timer;

	var xmlhttp = new XMLHttpRequest();
	var url = "http://raspberrypi:8080/";

	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var headingObj = JSON.parse(this.responseText);
			console.log(headingObj);
			props.setHeading(parseInt(headingObj.heading));
		}
	};

	const stopAndSync = () => {
		stop(direction);
		xmlhttp.open("GET", url, true);
		xmlhttp.send();
	};

	switch (props.direction) {
		case "up":
			className = `up-arrow ${props.useEyetracker && "eyetracker"}`;
			direction = 0;
			break;
		case "down":
			className = `down-arrow ${props.useEyetracker && "eyetracker"}`;
			direction = 180;
			break;
		case "left":
			className = `left-arrow ${props.useEyetracker && "eyetracker"}`;
			direction = 270;
			break;
		case "right":
			className = `right-arrow ${props.useEyetracker && "eyetracker"}`;
			direction = 90;
			break;
		default:
			className = `up-arrow ${props.useEyetracker && "eyetracker"}`;
			direction = 0;
			break;
	}

	direction += props.heading;
	if (direction > 359) {
		direction -= 359;
	}

	return (
		<img
			className={className}
			src="arrow.svg"
			onMouseDown={() => {
				if (!props.useEyetracker) roll(direction)();
			}}
			onMouseUp={() => {
				if (!props.useEyetracker) stopAndSync();
			}}
			onMouseOver={() => {
				if (props.useEyetracker) {
					timer = setTimeout(() => {roll(direction)}, 1000);
				}
			}}
			onMouseOut={() => {
					if (props.useEyetracker) {
						stopAndSync();
						if (timer) clearTimeout(timer);
					}
			}}
		/>
	);
};

export default ArrowButton;