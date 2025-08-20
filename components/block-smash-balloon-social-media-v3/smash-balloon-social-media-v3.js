export default function smashballoonsocialmediav3Js(options = {}) {
	try {
		const {block} = options;
		if (!block) return;

		// in carousel need to be moving without stops and delays
		if (block.dataset.marquee) {
			if (block.dataset.sbiMarqueeInit === '1') return;
			block.dataset.sbiMarqueeInit = '1';

			const outer = block.querySelector(
				'.sbi-owl-stage-outer, .owl-stage-outer'
			);
			const stage = block.querySelector('.sbi-owl-stage, .owl-stage');
			if (!outer || !stage) return;

			// --- Config ---
			const PX_PER_SEC = 50; // adjust speed as needed

			const uid = `sbi-marquee-${Math.random().toString(36).slice(2)}`;
			block.setAttribute('data-sbi-marquee-id', uid);

			const style = document.createElement('style');
			style.textContent = `
      [data-sbi-marquee-id="${uid}"] .sbi-owl-stage,
      [data-sbi-marquee-id="${uid}"] .owl-stage {
        transition: none !important;
        animation: none !important;
        will-change: transform;
      }
      [data-sbi-marquee-id="${uid}"] .owl-nav,
      [data-sbi-marquee-id="${uid}"] .owl-dots {
        display: none !important;
      }
    `;
			block.appendChild(style);

			// --- Helpers ---
			const nonClonedItems = () =>
				Array.from(
					stage.querySelectorAll(
						'.sbi-owl-item:not(.cloned), .owl-item:not(.cloned)'
					)
				);

			const getLoopWidth = () => {
				const items = nonClonedItems();
				if (!items.length)
					return stage.scrollWidth / 2 || stage.scrollWidth || 0;
				let w = 0;
				for (const el of items) w += el.getBoundingClientRect().width;
				return w;
			};


			let loopW = getLoopWidth();
			let x = 0;
			let last = performance.now();
			let raf = null;

			function tick(now) {
				const dt = (now - last) / 1000;
				last = now;

				x -= PX_PER_SEC * dt;

				if (-x >= loopW) x += loopW;

				stage.style.setProperty(
					'transform',
					`translate3d(${x}px,0,0)`,
					'important'
				);
				raf = requestAnimationFrame(tick);
			}

			const ro = new ResizeObserver(() => {
				loopW = getLoopWidth();
			});
			ro.observe(stage);

			outer.addEventListener('mouseenter', () => {
				if (raf) cancelAnimationFrame(raf);
				raf = null;
			});
			outer.addEventListener('mouseleave', () => {
				if (!raf) {
					last = performance.now();
					raf = requestAnimationFrame(tick);
				}
			});

			last = performance.now();
			raf = requestAnimationFrame(tick);

			block._sbiMarqueeDestroy = () => {
				if (raf) cancelAnimationFrame(raf);
				ro.disconnect();
				style.remove();
				stage.style.removeProperty('transform');
				delete block.dataset.sbiMarqueeInit;
				delete block._sbiMarqueeDestroy;
			};
		}
	} catch (error) {
		console.error(error);
	}
}
