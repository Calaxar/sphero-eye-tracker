import { useEffect, useState } from 'react';
import './App.css';
import ControlPad from './components/ControlPad';
import ConnectModal from './components/ConnectModal';
import StatusBar from './components/StatusBar';
import VideoFeed from './components/VideoFeed';

function App() {
	const [showModal, setShowModal] = useState(true);
	const [spheroConnected, setSpheroConnected] = useState(false);
	const [heading, setHeading] = useState(0);
	const [useEyetracker, setUseEyetracker] = useState(false);

	function onConnected() {
		setSpheroConnected(true);
		setShowModal(false);
	};

	function onDisconnected() {
		setSpheroConnected(false);
		setShowModal(true);
	};

	return (
		<div className="App">
			<VideoFeed />
			<ControlPad heading={heading} setHeading={setHeading} useEyetracker={useEyetracker} />
			<StatusBar spheroIsConnected={spheroConnected} cameraIsConnected useEyetracker={useEyetracker} setUseEyetracker={setUseEyetracker} />
			{
				showModal &&
				<ConnectModal onConnected={onConnected} onDisconnected={onDisconnected} setHeading={setHeading} />
			}

		</div>
	);
}

export default App;
