import { roll, stop } from "../../utils/ble";

const ArrowButton = (props) => {
	var className;
	var direction;

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

	return (
		<img className={className} src="arrow.svg" onMouseDown={() => roll(direction)} onMouseUp={() => stop(direction)} />
	);
};

export default ArrowButton;