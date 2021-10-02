import { useState } from 'react';
import './App.css';
import ControlPad from './components/ControlPad';
import ConnectModal from './components/ConnectModal';
import StatusBar from './components/StatusBar';
import VideoFeed from './components/VideoFeed';

function App() {
	const [showModal, setShowModal] = useState(true);
	const [spheroConnected, setSpheroConnected] = useState(false);

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
			<StatusBar spheroIsConnected={spheroConnected} />
			<ControlPad />
			{
				showModal &&
				<ConnectModal onConnected={onConnected} onDisconnected={onDisconnected} />
			}

		</div>
	);
}

export default App;
