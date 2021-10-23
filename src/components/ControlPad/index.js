import "./ControlPad.css"
import ArrowButton from "./ArrowButton";

const ControlPad = (props) => {
	return (
		<div className="control-pad">
			<div className="top" >
				<ArrowButton direction="up" heading={props.heading} setHeading={props.setHeading} useEyetracker={props.useEyetracker} />
			</div>
			<div className="middle" >
				<ArrowButton direction="left" heading={props.heading} setHeading={props.setHeading} useEyetracker={props.useEyetracker} />
				<ArrowButton direction="right" heading={props.heading} setHeading={props.setHeading} useEyetracker={props.useEyetracker} />
			</div>
			<div className="bottom" >
				<ArrowButton direction="down" heading={props.heading} setHeading={props.setHeading} useEyetracker={props.useEyetracker} />
			</div>
		</div>
	);
};

export default ControlPad;