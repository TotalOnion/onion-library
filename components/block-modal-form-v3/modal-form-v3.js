export default function modalformv3Js ( options = {} ) {
	try {
		const { block } = options;

		// form logic
		function validateFormFields(block) {
			const inputs = block.querySelectorAll(
				'.cdb_form_field input, .cdb_form_field select, .cdb_form_gdpr_information input, .cdb_form_privacypolicy_information input'
			);

			inputs.forEach((input) => {
				const wrapper = input.closest('.cdb_form_field, .cdb_form_gdpr_information, .cdb_form_privacypolicy_information');

				if (!wrapper) return;

				wrapper.classList.remove('invalid');

				if (!input.hasAttribute('required')) return;

				if (input.type === 'checkbox') {
					if (!input.checked) {
						wrapper.classList.add('invalid');
					}

					input.addEventListener('change', () => {
						if (input.checked) {
							wrapper.classList.remove('invalid');
						}
					});
				} else {
					if (!input.value.trim()) {
						wrapper.classList.add('invalid');
					}

					input.addEventListener('input', () => {
						if (input.value.trim()) {
							wrapper.classList.remove('invalid');
						}
					});
				}
			});
		}

		const submit = block.querySelector(
			'.cdb-submit'
		);

		submit.classList.add('cmpl-cta-style-11', 'cmpl-cta-animation-style-1');

		submit.addEventListener('click', (e) => {
			validateFormFields(block);
		});

	} catch ( error ) {
		console.error( error );
	}
}
