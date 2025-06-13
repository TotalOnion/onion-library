export default function formSelection(block) {
	const formContainer = block.querySelector('.form-container__modal');
	const openModal = block.querySelector('.form-container__modal-open');
	const closeModal = block.querySelector('.form-container__modal-close');
	if (formContainer) {
		openModal.addEventListener('click', function (e) {
			document.body.appendChild(formContainer);
			e.preventDefault();
			formContainer.style.display = 'block';
		});
		closeModal.addEventListener('click', function (e) {
			e.preventDefault();
			formContainer.style.display = 'none';
		});
	} else {
		return;
	}
}
