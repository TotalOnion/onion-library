// LIBRARY FILE - Do not modify/override here as your changes will be lost when the package is updated.
export default function coreEditorThemeSelect(selectNames) {
	if (typeof acf != 'undefined') {
		acf.addAction(
			'select2_init',
			function ($select, args, settings, field) {
				if (selectNames.find((name) => name === field.data.name)) {
					const selected = $select.find(':selected').val()
						? $select.find(':selected').val().replace('__', '')
						: null;
					$select.val(selected);
				}
			}
		);
	}
}
