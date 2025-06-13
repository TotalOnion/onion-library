export default function reservebarPopup(block = document) {
	block
		.querySelectorAll('.reservebar-popup-trigger')
		.forEach(function (trigger) {
			if (
				trigger.classList.contains(
					'reservebar-popup-trigger--click-assigned'
				)
			) {
				return;
			}
			trigger.addEventListener('click', function (event) {
				event.preventDefault();
				let liquidGroupingID =
					trigger.attributes['reservebar-liquid-id']?.value;
				generatePopup(liquidGroupingID);
			});
			trigger.classList.add('reservebar-popup-trigger--click-assigned');
		});
	import(
		'Assets/scss/modules/library-modules/reservebar-popup/reservebar-popup.scss'
	);
}

function generatePopup(liquidGroupingID) {
	const popup = document.createElement('div');
	popup.innerHTML = `
        <div class="reservebar-popup reservebar-popup__container" style="" >
            <div class="reservebar-popup__content">
                <div class="reservebar-popup__close"></div>
                <h4 class="reservebar-popup__title">Check Availability</h4>
                <div class="reservebar-popup__content" liquid-id=${liquidGroupingID}>
                <div liquid-address-typeahead></div>
                </div>
            </div>
        </div>`;
	document.body.appendChild(popup);
	document.body.classList.add('lock-position');
	const reservebarClose = document.querySelector('.reservebar-popup__close');
	reservebarClose.addEventListener('click', function () {
		popup.remove();
		document.body.classList.remove('lock-position');
	});
}
