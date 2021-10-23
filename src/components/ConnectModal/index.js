import './ConnectModal.css';
import { connectToSphero } from "../../utils/ble";

const ConnectModal = (props) => {
	var xmlhttp = new XMLHttpRequest();
	var url = "http://raspberrypi:8080/";

	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var myArr = JSON.parse(this.responseText);
			console.log(myArr);
		}
	};

	return (
		<div className="modal">
			<div className="modal-content">
				<div>
					<h2>Sphero not connected.</h2>
					<input className="button" type="button" value="Connect" onClick={() => connectToSphero(props.onConnected, props.onDisconnected)} />
					<input className="button" type="button" value="Get JSON" onClick={() => {
						xmlhttp.open("GET", url, true);
						xmlhttp.send();
					}} />
				</div>
			</div>
		</div>
	);
};

export default ConnectModal;