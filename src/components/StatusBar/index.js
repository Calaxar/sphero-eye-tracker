import './StatusBar.css'

const StatusBar = (props) => {
	return (
		<div class="status-bar">
			<div class="status-row">
				<h1>Sphero</h1>
				<img src={props.spheroIsConnected ? "connected.svg" : "not_connected.svg"}/>
			</div>
			<div class="status-row">
				<h1>Camera</h1>
				<img src={props.cameraIsConnected ? "connected.svg" : "not_connected.svg"} />
			</div>
		</div>
	);
};

export default StatusBar;