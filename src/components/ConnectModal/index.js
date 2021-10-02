import './ConnectModal.css';
import { connectToSphero } from "../../utils/ble";

const ConnectModal = (props) => {

	return (
		<div className="modal">
			<div className="modal-content">
				<div>
					<h2>Sphero not connected.</h2>
					<input className="button" type="button" value="Connect" onClick={() => connectToSphero(props.onConnected, props.onDisconnected)} />
				</div>
			</div>
		</div>
	);
};

export default ConnectModal;