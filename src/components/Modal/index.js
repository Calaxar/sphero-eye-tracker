import './Modal.css';

const Modal = (props) => {

	return (
		<div className="modal">
			<div className="modal-content">
				<div className="close" onClick={props.onClose}>&times;</div>
				<div>
					{props.children}
				</div>
			</div>
		</div>
	);
};

export default Modal;