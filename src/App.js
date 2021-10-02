import { useState } from 'react';
import './App.css';
import ControlPad from './components/ControlPad';
import Modal from './components/Modal';
import StatusBar from './components/StatusBar';
import VideoFeed from './components/VideoFeed';
import { connectToSphero } from "./utils/ble";

function App() {
	const [showModal, setShowModal] = useState(true);

	return (
		<div className="App">
			<VideoFeed />
			<StatusBar />
			<ControlPad />
			{
				showModal &&
				<Modal onClose={() => setShowModal(false)}>
					<input type="button" value="Connect" onClick={() => connectToSphero()} />
				</Modal>
			}

		</div>
	);
}

export default App;
