(() => {
  // components/block-back-to-top-button/back-to-top-button.js
  function backtotopbuttonJs(options = {}) {
    try {
      const { block } = options;
      const button = block.querySelector(".back-to-top-button__button");
      button.addEventListener(
        "click",
        () => window.scrollTo({ top: 0, behavior: "smooth" })
      );
    } catch (error) {
      console.error(error);
    }
  }
})();
