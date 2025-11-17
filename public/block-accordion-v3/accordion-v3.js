export default function accordionv3Js(options = {}) {
  try {
    const { block } = options;
    const blockClassName = block.dataset.assetkey;
    const sections = block.querySelectorAll(
      `.${blockClassName}-content`
    );
    const closeAccordionSections = () => {
      sections.forEach((section) => {
        if (section.classList.contains("active")) {
          const question = section.querySelector(
            `.${blockClassName}-question-wrapper`
          );
          const answer = section.querySelector(
            `.${blockClassName}-answer-wrapper`
          );
          const svg = section.querySelector(
            `.${blockClassName}-icon`
          );
          const iconImage = section.querySelector(
            `.${blockClassName}-image-wrapper`
          );
          const sectionHeight = answer.scrollHeight;
          answer.animate(
            [
              {
                height: sectionHeight + "px"
              },
              { height: "0px" }
            ],
            {
              fill: "forwards",
              duration: 200,
              easing: "ease-out"
            }
          );
          answer.setAttribute("aria-hidden", "true");
          question.classList.remove("active");
          section.classList.remove("active");
          if (svg) {
            svg.classList.remove("active");
          }
          if (iconImage) {
            iconImage.classList.remove("image-icon-active");
          }
        }
      });
    };
    sections.forEach((section) => {
      const question = section.querySelector(
        `.${blockClassName}-question-wrapper`
      );
      const answer = section.querySelector(
        `.${blockClassName}-answer-wrapper`
      );
      const svg = section.querySelector(`.${blockClassName}-icon`);
      const iconImage = section.querySelector(
        `.${blockClassName}-image-wrapper`
      );
      question.addEventListener("click", () => {
        const isCollapsed = answer.getAttribute("aria-hidden") === "true";
        closeAccordionSections();
        if (isCollapsed) {
          const sectionHeight = answer.scrollHeight;
          answer.animate(
            [
              { height: "0px" },
              {
                height: sectionHeight + "px"
              }
            ],
            {
              fill: "forwards",
              duration: 200,
              easing: "ease-out"
            }
          );
          section.classList.add("active");
          answer.classList.add("active");
          answer.setAttribute("aria-hidden", "false");
          if (svg) {
            svg.classList.add("active");
          }
          if (iconImage) {
            iconImage.classList.add("image-icon-active");
          }
        } else {
          const sectionHeight = answer.scrollHeight;
          section.classList.remove("active");
          answer.animate(
            [
              {
                height: sectionHeight + "px"
              },
              { height: "0px" }
            ],
            {
              fill: "forwards",
              duration: 200,
              easing: "ease-out"
            }
          );
          answer.classList.remove("active");
          answer.setAttribute("aria-hidden", "true");
          if (svg) {
            svg.classList.remove("active");
          }
          if (iconImage) {
            iconImage.classList.remove("image-icon-active");
          }
        }
      });
    });
  } catch (error) {
    console.error(error);
  }
}
