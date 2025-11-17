export default function cocktailrecipev3Js(options = {}) {
  try {
    const { block } = options;
    const valueEl = block.querySelector("[data-servings-value]");
    const decBtn = block.querySelector("[data-servings-dec]");
    const incBtn = block.querySelector("[data-servings-inc]");
    const decWrapper = block.querySelector(".dec-btn-wrapper");
    const amountEls = block.querySelectorAll("[data-ingredients]");
    const unitToggle = document.querySelector("[data-unit-toggle]");
    const checkbox = unitToggle?.querySelector("[data-unit-checkbox]");
    amountEls.forEach((el) => {
      if (!el.dataset.baseAmount) {
        el.dataset.baseAmount = el.dataset.amount || "";
      }
      if (!el.dataset.baseUnit) {
        el.dataset.baseUnit = el.dataset.unit || "";
      }
    });
    let currentUnit = "ml";
    const ML_TO_OZ = 0.033814;
    const getServings = () => parseInt(valueEl.textContent, 10) || 1;
    const setServings = (n) => {
      valueEl.textContent = `${n}x`;
      updateInactiveState(n);
    };
    const updateInactiveState = (value) => {
      if (!decWrapper) return;
      if (value <= 1) decWrapper.classList.add("inactive");
      else decWrapper.classList.remove("inactive");
    };
    const formatNumber = (num, unit) => {
      if (unit === "oz")
        return (Math.round(num * 100) / 100).toFixed(2).replace(/\.?0+$/, "");
      if (unit === "ml")
        return (Math.round(num * 10) / 10).toString().replace(/\.0$/, "");
      return (Math.round(num * 100) / 100).toString().replace(/\.?0+$/, "");
    };
    const convert = (value, fromUnit, toUnit) => {
      if (isNaN(value)) return value;
      if (fromUnit === toUnit) return value;
      if (fromUnit === "ml" && toUnit === "oz") return value * ML_TO_OZ;
      if (fromUnit === "oz" && toUnit === "ml") return value / ML_TO_OZ;
      return value;
    };
    const renderIngredients = () => {
      const servings = getServings();
      amountEls.forEach((el) => {
        const baseAmount = parseFloat(el.dataset.baseAmount);
        const baseUnit = el.dataset.baseUnit || "";
        const name = el.dataset.name || "";
        if (isNaN(baseAmount)) {
          el.textContent = name;
          return;
        }
        let amount = baseAmount * servings;
        let displayUnit = baseUnit;
        if ((baseUnit === "ml" || baseUnit === "oz") && currentUnit !== baseUnit) {
          amount = convert(amount, baseUnit, currentUnit);
          displayUnit = currentUnit;
        }
        const numStr = formatNumber(amount, displayUnit);
        const unitStr = displayUnit ? displayUnit : "";
        el.textContent = `${numStr}${unitStr ? unitStr : ""}${unitStr ? " " : " "}${name}`.trim();
      });
    };
    decBtn?.addEventListener("click", () => {
      const cur = getServings();
      if (cur > 1) {
        setServings(cur - 1);
        renderIngredients();
      }
    });
    incBtn?.addEventListener("click", () => {
      const cur = getServings();
      if (cur < 99) {
        setServings(cur + 1);
        renderIngredients();
      }
    });
    if (checkbox) {
      checkbox.addEventListener("change", (e) => {
        currentUnit = e.target.checked ? "oz" : "ml";
        renderIngredients();
      });
    }
    setServings(getServings() || 1);
    currentUnit = "ml";
    renderIngredients();
    updateInactiveState(getServings());
  } catch (error) {
    console.error(error);
  }
}
