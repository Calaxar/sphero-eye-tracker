import { roll, stop } from "../../utils/ble";

const ArrowButton = (props) => {
	var className;
	var direction;

	var xmlhttp = new XMLHttpRequest();
	var url = "http://raspberrypi:8080/";

	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var headingObj = JSON.parse(this.responseText);
			console.log(headingObj);
			props.setHeading(parseInt(headingObj.heading));
		}
	};

	switch (props.direction) {
		case "up":
			className = "up-arrow";
			direction = 0;
			break;
		case "down":
			className = "down-arrow";
			direction = 180;
			break;
		case "left":
			className = "left-arrow";
			direction = 270;
			break;
		case "right":
			className = "right-arrow";
			direction = 90;
			break;
		default:
			className = "up-arrow";
			direction = 0;
			break;
	}

	direction += props.heading;
	if (direction > 359) {
		direction -= 359;
	}

	return (
		<img className={className} src="arrow.svg" onMouseDown={() => roll(direction)} onMouseUp={() => {
			stop(direction);
			xmlhttp.open("GET", url, true);
			xmlhttp.send();
		}} />
	);
};

export default ArrowButton;