import './Modal.css';

const Modal = (props) => {

	return (
		<div class="modal">
			<div class="modal-content">
				<span class="close" onClick={props.onClose}>&times;</span>
				{props.children}
			</div>
		</div>
	);
};

export default Modal;