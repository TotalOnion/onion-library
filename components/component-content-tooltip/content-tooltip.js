export default function contentTooltip(block) {
    if (!block) {
		return;
	}

	try {
        import(
            'Assets/scss/modules/library-modules/content-tooltip/content-tooltip.scss'
        ).then(() => {

            const contentTooltips = block.querySelectorAll('.content-tooltip-wrapper');
            if (!contentTooltips) {
                return;
            }

            // Not to show the popup on smaller screens, basically avoid on mobile view
            if (window.innerWidth >= 768) {
                contentTooltips.forEach(function(el) {
                    let tooltipID = decodeURIComponent(el.querySelector('a').getAttribute("data-cttid"));

                    const element = document.getElementById(tooltipID);
                    let tooltipTimeout;

                    el.addEventListener("mouseenter", () => {
                        clearTimeout(tooltipTimeout);
                        element.style.visibility = "visible";
                        element.style.opacity = "1";
                        element.style.display = 'block';
                    });

                    el.addEventListener("mouseleave", () => {
                        tooltipTimeout = setTimeout(() => {
                            element.style.visibility = "hidden";
                            element.style.opacity = "0";
                            element.style.display = 'none';
                        }, 300);
                    });
                });
            }
        });
    } catch (error) {
		console.error(error);
	}
}