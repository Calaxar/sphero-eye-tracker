import './StatusBar.css'

const StatusBar = (props) => {
	return (
		<div className="status-bar">
			<div className="status-row">
				<h1>Sphero</h1>
				<img src={props.spheroIsConnected ? "connected.svg" : "not_connected.svg"}/>
			</div>
			<div className="status-row">
				<h1>Camera</h1>
				<img src={props.cameraIsConnected ? "connected.svg" : "not_connected.svg"} />
			</div>
		</div>
	);
};

export default StatusBar;