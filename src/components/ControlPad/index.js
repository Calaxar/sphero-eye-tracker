import "./ControlPad.css"
import ArrowButton from "./ArrowButton";

const ControlPad = () => {
	return (
		<div className="control-pad">
			<div className="top" >
				<ArrowButton direction="up" />
			</div>
			<div className="middle" >
				<ArrowButton direction="left" />
				<ArrowButton direction="right" />
			</div>
			<div className="bottom" >
				<ArrowButton direction="down" />
			</div>
		</div>
	);
};

export default ControlPad;