export default class modalController {
  constructor(settings = {}) {
    let defaultGlobalSettings = {
      bodyClass: "modal-active",
      activeStateClass: "modal-active",
      enableDebugLogs: true,
      userInteracted: false,
      addCloseButton: true,
      closeSelector: "#modal-controller-popup__close-btn",
      closeDelay: 1,
      closingClass: "something",
      activateDelay: 0,
      lenis: false,
    };
    this.scanForNewTriggers();

    console.log("hello!");

    if (modalController.instance instanceof modalController) {
      return modalController.instance;
    }
    modalController.instance = this;
    this.globalSettings = { ...defaultGlobalSettings, ...settings };
    this.enableDebugLogs = this.globalSettings.enableDebugLogs;
    this.handleModalTriggers();
    this.handleBgClicks();
  }

  scanForNewTriggers() {
    this.globalModalTriggers = document.body.querySelectorAll(
      "[data-modalpopuptrigger]",
    );
  }
  handleBgClicks() {
    window.addEventListener("click", (event) => {
      const modalPopup = document.getElementById("modal-controller-popup");
      this.closePopupOnClickOutside(event, modalPopup);
    });
  }
  handleCloseButtonClicks() {
    const modalPopup = document.getElementById("modal-controller-popup");
    if (!modalPopup) {
      return;
    }
    const closeButtons = modalPopup.querySelectorAll(
      this.globalSettings.closeSelector || "#modal-controller-popup__close-btn",
    );
    closeButtons.forEach((closeButton) => {
      if (closeButton.dataset.modalpopupCloseBound === "true") {
        return;
      }
      closeButton.dataset.modalpopupCloseBound = "true";
      closeButton.addEventListener("click", () => {
        const modalPopup = document.getElementById("modal-controller-popup");
        this.closePopup(modalPopup);
      });
    });
  }
  handleModalTriggers() {
    this.globalModalTriggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        this.triggerModalPopup(trigger.dataset.modalpopuptrigger);
      });
    });
  }
  triggerModalPopup(triggerName) {
    let modalPopup = document.getElementById("modal-controller-popup");
    if (!modalPopup) {
      const modalPopupHtml = `<div class="modal-controller-popup" id="modal-controller-popup">
      <div class="modal-controller-popup__container">
      ${this.globalSettings.addCloseButton ? '<span class="modal-controller-popup__close-btn" id="modal-controller-popup__close-btn"></span>' : ""}
      <div class="modal-controller-popup__content"></div>
      </div>
      </div>`;
      document.body.insertAdjacentHTML("beforeend", modalPopupHtml);
      modalPopup = document.getElementById("modal-controller-popup");
    }

    if (!modalPopup) {
      return;
    }

    const popupContent = document.querySelector(
      ".modal-controller-popup__content",
    );

    if (!popupContent) {
      return;
    }

    let templateContent;

    const modalPopupContent = document.querySelector(
      `[data-modalpopupcontent=${triggerName}]`,
    );

    if (!modalPopupContent) {
      this.closePopup(modalPopup);
      return;
    }

    //Check if the actual content element is already in the popup content container, if not - move it there.
    if (
      !popupContent.querySelector(`[data-modalpopupcontent=${triggerName}]`)
    ) {
      if (modalPopupContent) {
        templateContent = modalPopupContent;
      }

      if (modalPopupContent.nodeName === "TEMPLATE") {
        templateContent = modalPopupContent.content;
      }

      popupContent.appendChild(templateContent);
    } else {
      templateContent = popupContent.querySelector(
        `[data-modalpopupcontent=${triggerName}]`,
      );
    }

    const activateDelay = Number(this.globalSettings.activateDelay) || 0;
    if (activateDelay > 0) {
      templateContent.classList.remove("active");
      window.setTimeout(() => {
        templateContent.classList.add("active");
      }, activateDelay);
    } else {
      templateContent.classList.add("active");
    }
    requestAnimationFrame(() => {
      modalPopup.classList.add("open");
      document.documentElement.classList.add("lock-position");
      if (this.globalSettings.lenis) {
        document.body.dataset.lenisPrevent = "true";
      }
    });
    this.handleCloseButtonClicks();
  }
  closePopup(modalPopup) {
    if (!modalPopup) {
      return;
    }
    modalPopup.classList.remove("open");
    document.documentElement.classList.remove("lock-position");
    if (this.globalSettings.lenis) {
      delete document.body.dataset.lenisPrevent;
    }
    const popupContent = modalPopup.querySelector(
      ".modal-controller-popup__content",
    );

    if (popupContent) {
      const activeContents = popupContent.querySelectorAll(
        "[data-modalpopupcontent].active",
      );
      const closeDelay = Number(this.globalSettings.closeDelay) || 0;
      const closingClass = this.globalSettings.closingClass;

      if (closeDelay > 0 && closingClass) {
        activeContents.forEach((activeContent) => {
          activeContent.classList.add(closingClass);
        });
        setTimeout(() => {
          activeContents.forEach((activeContent) => {
            activeContent.classList.remove(closingClass);
          });
        }, closeDelay);
      }

      activeContents.forEach((activeContent) => {
        activeContent.classList.remove("active");
      });
    }
  }
  closePopupOnClickOutside(event, modalPopup) {
    if (event.target === modalPopup) {
      this.closePopup(modalPopup);
    }
  }
  setGlobalSettings(settings = {}) {
    this.globalSettings = { ...this.globalSettings, ...settings };
  }
}
