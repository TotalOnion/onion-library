export default function countdownJs(block) {
	const countDownDateEl = document.querySelectorAll('.countdowndate');

	if (countDownDateEl.length > 0) {
		countDownDateEl.forEach((item) => {
			const startDateTime = item.dataset.countDownDateTime;

			const dateObject = new Date(startDateTime);
			const timestamp = dateObject.getTime();

			const formatTime = (time) => (time < 10 ? `0${time}` : time);

			const updateElement = (id, value) => {
				const element = document.getElementById(id);
				if (element) {
					element.innerHTML = value;
				}
			};

			const updateCountdown = () => {
				const now = new Date().getTime();
				const distance = timestamp - now;

				if (distance < 0) {
					clearInterval(x);
					updateElement('days', 'EXPIRED');
					return;
				}

				const days = Math.floor(distance / (1000 * 60 * 60 * 24));
				const hours = Math.floor(
					(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
				);
				const minutes = Math.floor(
					(distance % (1000 * 60 * 60)) / (1000 * 60)
				);
				const seconds = Math.floor((distance % (1000 * 60)) / 1000);

				updateElement(
					'days',
					`<span>${formatTime(days)} </span>${
						days === 1 ? 'DAY' : 'DAYS'
					}`
				);
				updateElement(
					'hours',
					`${formatTime(hours)}h ${formatTime(minutes)}m ${formatTime(
						seconds
					)}s`
				);
			};

			updateCountdown();

			const x = setInterval(updateCountdown, 1000);
		});
	}
}
