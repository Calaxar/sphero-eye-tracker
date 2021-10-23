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
			<StatusBar spheroIsConnected={spheroConnected} cameraIsConnected />
			<ControlPad heading={heading} setHeading={setHeading} />
			{
				showModal &&
				<ConnectModal onConnected={onConnected} onDisconnected={onDisconnected} setHeading={setHeading} />
			}

		</div>
	);
}

export default App;
