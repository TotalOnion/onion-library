// import ctbJs from 'Assets/js/modules/ctb-menu-click-handler.js';

export default function buyNowButtonJs(block) {
    if (!block) {
        return;
    }
    const buyNowButton = block.querySelector(
        `.${block.dataset.assetkey}__buy-now-button`
        );
    if (!buyNowButton) {
        return;
    }
    // ctbJs(block); 
    // console.log("🚀 ~ file: buy-now-button.js:5 ~ buyNowButtonJs ~ buyNowButton:", buyNowButton);
}