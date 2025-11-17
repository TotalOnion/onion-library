import lottie from "lottie-web";
export default function lottiecontentv3Js(block) {
  const lottieElement = block.querySelector(".lottie-animations");
  if (!lottieElement) {
    return;
  }
  const lottieData = lottieElement.dataset;
  const filePath = lottieData.lottiefile;
  if (!filePath) {
    return;
  }
  const loop = parseInt(lottieData.loop) ? true : false;
  const autoplay = parseInt(lottieData.autoplay) ? true : false;
  lottie.loadAnimation({
    container: lottieElement,
    renderer: "svg",
    loop,
    autoplay,
    path: filePath,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
      progressiveLoad: true
    }
  });
}
