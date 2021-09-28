import { useState } from 'react';
import './App.css';
import Modal from './components/Modal';
import StatusBar from './components/StatusBar';
import VideoFeed from './components/VideoFeed';

function App() {
	const [showModal, setShowModal] = useState(true);

	return (
		<div className="App">
			<VideoFeed />
			<StatusBar />
			{
				showModal &&
				<Modal onClose={() => setShowModal(false)}>
					<h1>MODAL</h1>
				</Modal>
			}

		</div>
	);
}

export default App;
