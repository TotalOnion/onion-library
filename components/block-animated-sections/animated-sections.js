import {getGsap, getSwiperAssetsV2} from '@pernod-ricard-global-cms/jsutils';
import('swiper/css/bundle');

export default function animatedsectionsJs(options = {}) {
	try {
		const {block} = options;
		Promise.all([getGsap(), getSwiperAssetsV2()]).then((results) => {
			// Modules and Libraries
			const gsap = results[0][0];
			const {
				Swiper,
				Navigation,
				Pagination,
				Lazy,
				Autoplay,
				EffectFade,
				EffectCreative
			} = results[1][0];

			//Flags
			const MOBILE_BREAKPOINT = 768; //px

			// Dom Declarations
			let foregroundElements;
			let backgroundElements;
			let timelineElements;

			if (window.innerWidth <= MOBILE_BREAKPOINT) {
				foregroundElements = Array.from(
					block.querySelectorAll(
						'.animated-sections__foreground-element--mobile'
					)
				);
				backgroundElements = Array.from(
					block.querySelectorAll(
						'.animated-sections__background-element--mobile'
					)
				);
				timelineElements = block.querySelectorAll(
					'.animated-sections__timeline--tablet-mobile'
				);
			} else {
				foregroundElements = Array.from(
					block.querySelectorAll(
						'.animated-sections__foreground-element--desktop'
					)
				);
				backgroundElements = Array.from(
					block.querySelectorAll(
						'.animated-sections__background-element--desktop'
					)
				);
				timelineElements = block.querySelectorAll(
					'.animated-sections__timeline--desktop'
				);
			}

			const allElements = [...backgroundElements, ...foregroundElements];

			// DOM Constants
			const siteHeader = document.getElementsByTagName('header')[0];
			const elementCanvas = block.querySelector(
				'.animated-sections__canvas-inner'
			);
			const contentElements = block.querySelectorAll(
				'.animated-sections__content-element'
			);
			const contentButtons = document.querySelectorAll(
				'[data-content-button]'
			);
			const backButton = block.querySelector(
				'.animated-sections__ui-element-back-button'
			);
			const nextButton = block.querySelector(
				'.animated-sections__ui-element-down-arrow'
			);
			const swiperWrapper = document.querySelector(
				'.animated-sections__swiper-content-wrapper'
			);
			const swiperOverlay = document.querySelector(
				'.animated-sections__swiper-content-overlay'
			);
			const timelineNavWrapper = document.querySelector(
				'.animated-sections__ui-element-timeline-nav-wrapper'
			);
			const dots = document.querySelectorAll(
				'.animated-sections__ui-element-timeline-dot'
			);
			const menuItems = document.querySelectorAll(
				'.animated-sections__ui-element-timeline-name'
			);
			const scrollBar = block.querySelector(
				'.animated-sections__progress-bar'
			);
			// const uiElementsContainer = block.querySelector(
			// 	'.animated-sections__ui-elements'
			// );

			// Constants
			const figmaDesktopHeight = parseFloat(block.dataset.desktopHeight);
			const figmaDesktopWidth = parseFloat(block.dataset.desktopWidth);
			const figmaMobileHeight = parseFloat(block.dataset.mobileHeight);
			const figmaMobileWidth = parseFloat(block.dataset.mobileWidth);

			const figmaTransformOrigin = block.dataset.transformOrigin;

			const swiperEnabled = block.dataset.swiperEnabled;

			// Variable Declarations
			let timelines = [];
			let allNavTimelines = [];
			let lastTime = null;
			let scrollAmount = 0;
			let lastScrollTop = 0;
			let forwardPlaybackHistory = [];

			let touchStartY = 0;
			let touchEndY = 0;
			let scrollVelocity = 0;
			let isDecelerating = false;
			let lastTouchY = 0;
			let isTouching = false;

			const state = {
				currentTimelineIndex: 0,
				canSwipe: true,
				timelinesVisited: false,
				lastSwipeFalseTime: 0
			};

			const SwiperManager = {
				swiper: null,
				init: function () {
					this.swiper = new Swiper('.swiper-container', {
						modules: [
							Navigation,
							Pagination,
							Lazy,
							Autoplay,
							EffectFade,
							EffectCreative
						],
						pagination: {
							el: '.animated-sections .swiper-pagination',
							clickable: true
						},
						allowTouchMove: false,
						effect: 'creative',
						speed: 1000,
						creativeEffect: {
							prev: {
								opacity: 0
							},
							next: {
								opacity: 0
							}
						},
						on: {
							init: function () {
								const swiperSlides = this.slides;
								swiperSlides.forEach((slide) => {
									const overlayColor = slide.dataset.color;
									swiperOverlay.className = '';
									swiperOverlay.classList.add(
										'animated-sections__swiper-content-overlay'
									);
									swiperOverlay.classList.add(
										'animated-sections__swiper-content-overlay--' +
											overlayColor
									);
								});
							}
						}
					});
				},
				initSwiperPaginationListener: function () {
					this.swiper.pagination.el.addEventListener('click', (e) => {
						if (!getState('canSwipe')) {
							return;
						}
						if (
							e.target.classList.contains(
								'swiper-pagination-bullet'
							)
						) {
							const index = [
								...this.swiper.pagination.el.childNodes
							].indexOf(e.target);
							const targetStepIndex =
								parseInt(
									this.swiper.slides[index].dataset.slideId
								) - 1;
							const currentStepIndex = getState(
								'currentTimelineIndex'
							);
							const stepDifference =
								targetStepIndex - currentStepIndex;

							if (
								Math.abs(stepDifference) > 1 ||
								Math.abs(stepDifference) < -1
							) {
								TimelineManager.fadeToBlack(() => {
									TimelineManager.navigateToTimeline(
										targetStepIndex
									);
								});
							} else if (Math.abs(stepDifference) == 0) {
								return;
							} else {
								TimelineManager.changeTimeline(stepDifference);
							}
						}
					});
				}
			};
			const TimelineManager = {
				createTimelinesAndNavigation: function () {
					timelineElements.forEach((step, index) => {
						const animation = step.dataset.animation;
						const animationObj = JSON.parse(animation);
						const tweens = this.createTweens(animationObj);
						const timeline = new TimelineLite({paused: true});

						timeline.add(tweens);
						timelines[index] = timeline;
					});
				},
				createTweens: function (animationObj) {
					const {
						widthRatio,
						heightRatio,
						scaleFactorWidth,
						scaleFactorHeight
					} = this.getFigmaDimensions();

					return allElements
						.map((elm) => {
							const obj = animationObj.find(
								(o) => o.name === elm.dataset.assetName
							);
							if (obj) {
								if (figmaTransformOrigin == '__top-left') {
									return TweenLite.to(elm, {
										x: obj.x,
										y: obj.y,
										scaleX: obj.width / elm.width,
										scaleY: obj.height / elm.height,
										opacity: obj.opacity,
										duration: obj.duration,
										backfaceVisibility: {
											visible: false
										}
									});
								} else if (figmaTransformOrigin == '__center') {
									return TweenLite.to(elm, {
										x:
											obj.x *
											widthRatio *
											scaleFactorWidth,
										y:
											obj.y *
											heightRatio *
											scaleFactorHeight,
										scale: Math.min(
											obj.width,
											obj.height,
											scaleFactorWidth,
											scaleFactorHeight
										),
										opacity: obj.opacity,
										duration: obj.duration,
										backfaceVisibility: {
											visible: false
										}
									});
								}

								return TweenLite.to(elm, {
									x: newX,
									y: newY,
									scaleX: obj.width / elm.width,
									scaleY: obj.height / elm.height,
									opacity: obj.opacity,
									duration: obj.duration,
									// display: displayValue,
									backfaceVisibility: {
										visible: false
									}
								});
							}

							return null;
						})
						.filter((tween) => tween !== null);
				},
				animationFrame: function (now) {
					if (!lastTime) {
						lastTime = now;
					}
					const deltaTime = now - lastTime;
					if (deltaTime >= 16) {
						timelines[getState('currentTimelineIndex')].time(
							timelines[getState('currentTimelineIndex')].time() +
								deltaTime / 1000
						);
						lastTime = now;
					}
					requestAnimationFrame(animationFrame);
				},
				changeTimeline: function (timelineIndex) {
					if (!getState('canSwipe')) {
						return;
					}
					setState('canSwipe', false);

					const currentTimelineIndex = getState(
						'currentTimelineIndex'
					);
					const nextTimelineIndex =
						currentTimelineIndex + timelineIndex;
					const isMovingBackwards = timelineIndex < 0;
					const currentTimeline = timelines[currentTimelineIndex];

					const tweensElements = currentTimeline.getChildren();

					let tweenElementType;

					tweensElements.forEach((tween) => {
						tween._targets.forEach((target) => {
							if (target.tagName == 'IMG') {
								tweenElementType = 'IMAGE';
							} else if (target.tagName == 'VIDEO') {
								tweenElementType = 'VIDEO';
							}
						});
					});

					const nextTimeline = timelines[nextTimelineIndex];
					if (
						nextTimelineIndex >= 0 &&
						nextTimelineIndex < timelineElements.length
					) {
						if (isMovingBackwards) {
							if (window.innerWidth <= MOBILE_BREAKPOINT) {
								currentTimeline.pause();
								setTimeout(() => {
									currentTimeline.reverse();
								}, 1000);

								setState(
									'currentTimelineIndex',
									parseInt(nextTimelineIndex)
								);

								setTimeout(() => {
									this.updateToNextTimeline();
								}, 100);
								VideoUtils.playReverseVideo(
									parseInt(nextTimelineIndex),
									() => {
										allElements.forEach(
											(elm) =>
												(elm.style.display = 'block')
										);
										nextTimeline.play();
									}
								);
							} else {
								if (tweenElementType == 'VIDEO') {
									currentTimeline.pause();
									setTimeout(() => {
										currentTimeline.reverse();
									}, 1000);

									setState(
										'currentTimelineIndex',
										parseInt(nextTimelineIndex)
									);
									setTimeout(() => {
										this.updateToNextTimeline();
									}, 100);
									VideoUtils.playReverseVideo(
										parseInt(nextTimelineIndex),
										() => {
											allElements.forEach(
												(elm) =>
													(elm.style.display =
														'block')
											);
											nextTimeline.play();
										}
									);
								} else if (tweenElementType == 'IMAGE') {
									currentTimeline.pause();
									currentTimeline.reverse();
									setState(
										'currentTimelineIndex',
										parseInt(nextTimelineIndex)
									);
									this.updateToNextTimeline();
									nextTimeline.play();
								}
							}
						} else {
							if (tweenElementType == 'VIDEO') {
								setState(
									'currentTimelineIndex',
									parseInt(nextTimelineIndex)
								);

								VideoUtils.handleVideoForward(false, () => {
									setTimeout(() => {
										this.updateToNextTimeline();
									}, 100);

									currentTimeline.pause();
									nextTimeline.play(0);
								});
							} else if (tweenElementType == 'IMAGE') {
								setState(
									'currentTimelineIndex',
									parseInt(nextTimelineIndex)
								);
								this.updateToNextTimeline();
								currentTimeline.pause();
								nextTimeline.play(0);
							}
						}
					}

					//Temporary Scroll Out Approach
					if (nextTimelineIndex === timelines.length - 1) {
						if (block.dataset.enableScrollOut == 1) {
							setTimeout(() => {
								setState('timelinesVisited', true);
								TouchScrollEventManager.removeScrollLockScreen();
								smoothScrollToTarget(block.nextElementSibling);
							}, block.dataset.scrollOutDelay * 1000);
						}
					}

					setTimeout(() => {
						if (nextTimelineIndex === timelineElements.length - 1) {
							return;
						}
						setState('canSwipe', true);
					}, 3000);
				},
				fadeToBlack: function (callback) {
					let overlay = block.querySelector(
						'.animated-sections__transition-overlay'
					);
					overlay.classList.add('active');
					setTimeout(() => {
						callback();
						setTimeout(() => {
							overlay.classList.remove('active');
						}, 1000);
					}, 500);
				},
				rebuildTweens: function () {
					this.createTimelinesAndNavigation();
					this.navigateToTimeline(getState('currentTimelineIndex'));
				},
				getFigmaDimensions: function () {
					let figmaWidth,
						figmaHeight,
						widthRatio,
						heightRatio,
						scaleFactorWidth,
						scaleFactorHeight;

					let actualCanvasWidth = elementCanvas.offsetWidth;
					let actualCanvasHeight = elementCanvas.offsetHeight;

					if (window.innerWidth <= MOBILE_BREAKPOINT) {
						figmaWidth = figmaMobileWidth;
						figmaHeight = figmaMobileHeight;
					} else {
						figmaWidth = figmaDesktopWidth;
						figmaHeight = figmaDesktopHeight;
					}

					widthRatio = actualCanvasWidth / figmaWidth;
					heightRatio = actualCanvasHeight / figmaHeight;

					scaleFactorWidth = actualCanvasWidth / figmaWidth;
					scaleFactorHeight = actualCanvasHeight / figmaHeight;

					return {
						figmaWidth,
						figmaHeight,
						widthRatio,
						heightRatio,
						scaleFactorWidth,
						scaleFactorHeight
					};
				},
				navigateToTimeline: function (index) {
					if (index >= 0 && index < timelineElements.length) {
						timelines.forEach((timeline) => timeline.pause());
						const increment =
							index - getState('currentTimelineIndex');
						this.changeTimeline(increment);
					} else {
						this.changeTimeline(index);
					}
				},
				updateToNextTimeline: function () {
					ContentManager.contentFrame();

					if (swiperEnabled == 'true') {
						this.handleSwiper(getState('currentTimelineIndex'));
						ContentManager.swiperFrame();
					}

					createBackButton(getState('currentTimelineIndex'));
					// updateUrl('currentTimelineIndex');
					this.timelineNavUpdateNavigation(
						getState('currentTimelineIndex')
					);
				},
				timelineNavUpdateNavigation: function (timelineIndex) {
					dots.forEach((dot, index) => {
						dot.classList.toggle('active', index === timelineIndex);

						if (
							dot.classList.contains(
								'hide_from_timeline_navigation'
							)
						) {
							dot.remove();
						} else {
							dot.style.display = 'block';
						}
					});

					menuItems.forEach((name, index) => {
						if (!name) {
							console.error(
								"Error: Found undefined 'menuItem' at index",
								index
							);
						} else {
							name.classList.toggle(
								'selected',
								index === timelineIndex
							);
							name.style.display =
								index === timelineIndex ||
								index === timelineIndex - 1 ||
								(index === timelineIndex + 1 &&
									timelineIndex !== menuItems.length - 1)
									? 'flex'
									: 'none';
						}
					});

					if (timelineNavWrapper && dots[timelineIndex]) {
						timelineNavWrapper.style.opacity = dots[
							timelineIndex
						].classList.contains('hide_from_timeline_navigation')
							? 0
							: 'var(--timeline-nav-opacity)';
					}
				},
				handleSwiper: function () {
					const swiperSlides = SwiperManager.swiper.slides;
					swiperSlides.forEach((slide) => {
						if (
							parseInt(slide.dataset.slideId) ===
							getState('currentTimelineIndex')
						) {
							SwiperManager.swiper.slideTo(slide.currentIndex);
							const overlayColor = slide.dataset.color;
							swiperOverlay.className = '';
							swiperOverlay.classList.add(
								'animated-sections__swiper-content-overlay'
							);
							swiperOverlay.classList.add(
								'animated-sections__swiper-content-overlay--' +
									overlayColor
							);
						}
					});
				}
			};
			const VideoUtils = {
				calculateSeconds: function (timeString, defaultSeconds = 0) {
					if (timeString) {
						let timeParts = timeString.split(':');
						return (
							parseInt(timeParts[0]) * 60 + parseInt(timeParts[1])
						);
					}
					return defaultSeconds;
				},
				pauseAllVideos: function () {
					allElements.forEach((elm) => {
						if (elm.tagName === 'VIDEO') {
							elm.pause();
						}
					});
				},
				saveVideoData: function () {
					const videoElementData = [];

					timelineElements.forEach((step, index) => {
						const stepData = {
							stepIndex: index,
							videoElements: []
						};

						allElements.forEach((elm) => {
							const animation = step.dataset.animation;
							const animationObj = JSON.parse(animation);
							const obj = animationObj.find(
								(o) => o.name === elm.dataset.assetName
							);

							if (obj) {
								let animationName = obj.name;
								let animationUrl = elm.src;

								let isLoaded = elm.dataset.isLoaded === 'true';

								stepData.videoElements.push({
									name: animationName,
									autoplay: obj.autoplay,
									url: animationUrl,
									startpos: obj.startpos,
									loop: obj.loop,
									endpos: obj.endpos,
									reversevideo: obj.reversevideo,
									activevideo: obj.enable_video_slide,
									isLoaded: isLoaded
								});
							}
						});

						videoElementData.push(stepData);
					});

					return videoElementData;
				},
				addVideoSource: function (videoElement, sourceUrl, type) {
					let source = document.createElement('source');
					source.src = sourceUrl;
					source.type = type;
					videoElement.appendChild(source);
				},
				handleVideoForward: function (fromReverse = false, callback) {
					this.pauseAllVideos();
					let nestedVideoData = this.saveVideoData();
					let currentStepData =
						nestedVideoData[getState('currentTimelineIndex')];

					if (currentStepData && currentStepData.videoElements) {
						allElements.forEach(async (element) => {
							let foundElement =
								currentStepData.videoElements.find(
									(data) =>
										element.dataset.assetName === data.name
								);

							if (foundElement) {
								let videoElement;
								if (foundElement.autoplay) {
									videoElement = allElements.find(
										(el) =>
											el.dataset.assetName ===
											foundElement.name
									);

									if (videoElement) {
										videoElement.loop = foundElement.loop;
										videoElement.muted = true;
										videoElement._currentAnimation =
											foundElement.name;

										if (
											videoElement.currentSrc !==
											foundElement.url
										) {
											videoElement.load();
										}

										videoElement.onloadeddata = () => {
											if (foundElement.autoplay) {
												if (
													videoElement.readyState >= 2
												) {
													setTimeout(() => {
														videoElement.play();
													}, 250);
												}
											}

											if (
												typeof callback === 'function'
											) {
												callback();
											}
										};

										videoElement.ontimeupdate = () => {
											let secondsEnd =
												this.calculateSeconds(
													foundElement.endpos,
													videoElement.duration
												);
											if (
												videoElement.currentTime >=
												secondsEnd
											) {
												if (foundElement.loop) {
													videoElement.currentTime =
														this.calculateSeconds(
															foundElement.startpos
														);
												} else {
													videoElement.pause();
												}
											}
										};

										if (fromReverse) {
											this.setVideoToEnd(videoElement);
										}
									}
								}
							}
						});
					}
				},
				playReverseVideo: function (timelineIndex, callback) {
					let nestedVideoData = this.saveVideoData();
					let relevantStepData = nestedVideoData[timelineIndex + 1];

					let activeVideoElement =
						relevantStepData.videoElements.find(
							(ve) => ve.autoplay
						);

					if (activeVideoElement) {
						let originalVideoElement;
						if (window.innerWidth >= MOBILE_BREAKPOINT) {
							originalVideoElement = document.querySelector(
								`.animated-sections__foreground-element--desktop[data-asset-name="${activeVideoElement.name}"]`
							);
						} else {
							originalVideoElement = document.querySelector(
								`.animated-sections__foreground-element--mobile[data-asset-name="${activeVideoElement.name}"]`
							);
						}
						let reverseVideoElement = document.querySelector(
							`[data-asset-name="${activeVideoElement.name}_reverse"]`
						);

						if (reverseVideoElement && originalVideoElement) {
							let computedStyle =
								window.getComputedStyle(originalVideoElement);
							for (let key of computedStyle) {
								reverseVideoElement.style[key] =
									computedStyle[key];
							}

							reverseVideoElement.style.opacity = '1';
							reverseVideoElement.style.visibility = 'visible';
							reverseVideoElement.muted = true;
							reverseVideoElement.autoplay = true;
							reverseVideoElement.load();
							reverseVideoElement.onloadedmetadata = () => {
								reverseVideoElement.currentTime = 0;
								reverseVideoElement.play();
								allElements.forEach(
									(elm) => (elm.style.display = 'none')
								);
								this.handleVideoForward(true);
							};

							reverseVideoElement.onended = () => {
								reverseVideoElement.style.visibility = 'hidden';
								originalVideoElement.currentTime = 0;

								if (typeof callback === 'function') {
									callback();
								}
							};
						} else {
							if (typeof callback === 'function') {
								callback();
							}
						}
					}
				},
				setVideoToEnd: function (videoElement) {
					return new Promise((resolve, reject) => {
						if (!videoElement)
							return reject('Video element not provided');

						const setEndPosition = () => {
							if (videoElement.seekable.length === 0) {
								setTimeout(setEndPosition, 100);
							} else {
								videoElement.currentTime = Math.max(
									0,
									videoElement.duration - 0.1
								);
								resolve();
							}
						};

						setEndPosition();
					});
				},
				preloadAllVideoSources: function () {
					let nestedVideoData = this.saveVideoData();
					let timelineIndex = getState('currentTimelineIndex');

					if (nestedVideoData[timelineIndex]) {
						let stepData = nestedVideoData[timelineIndex];

						if (stepData && stepData.videoElements) {
							stepData.videoElements.forEach((videoData) => {
								let videoElement;
								if (window.innerWidth >= MOBILE_BREAKPOINT) {
									videoElement = document.querySelector(
										`.animated-sections__foreground-element--desktop[data-asset-name="${videoData.name}"]`
									);
								} else {
									videoElement = document.querySelector(
										`.animated-sections__foreground-element--mobile[data-asset-name="${videoData.name}"]`
									);
								}

								if (videoElement) {
									if (
										videoElement &&
										videoElement.dataset.originalSource
									) {
										if (isSafari()) {
											let safariSource =
												videoElement.dataset
													.safariSource;
											if (safariSource) {
												this.addVideoSource(
													videoElement,
													safariSource,
													'video/mp4; codecs="hvc1"'
												);
											}
										} else {
											let sourceType =
												videoElement.dataset.originalSource.endsWith(
													'.webm'
												)
													? 'video/webm'
													: 'video/mp4';
											this.addVideoSource(
												videoElement,
												videoElement.dataset
													.originalSource,
												sourceType
											);
										}
									}

									if (
										videoElement &&
										videoElement.dataset.reverseSource
									) {
										let reverseElement =
											document.createElement('video');
										reverseElement.muted = true;
										reverseElement.dataset.assetName =
											videoData.name + '_reverse';
										reverseElement.preload = 'auto';
										reverseElement.style.opacity = '0';
										reverseElement.playsInline = true;
										reverseElement.setAttribute(
											'muted',
											''
										);
										reverseElement.setAttribute(
											'autoplay',
											'autoplay'
										);

										if (isSafari()) {
											let safariSource =
												videoElement.dataset
													.reverseSourceSafari;
											if (safariSource) {
												this.addVideoSource(
													reverseElement,
													safariSource,
													'video/mp4; codecs="hvc1"'
												);
											}
										} else {
											let sourceType =
												videoElement.dataset.reverseSource.endsWith(
													'.webm'
												)
													? 'video/webm'
													: 'video/mp4';
											this.addVideoSource(
												reverseElement,
												videoElement.dataset
													.reverseSource,
												sourceType
											);
										}

										if (elementCanvas) {
											elementCanvas.appendChild(
												reverseElement
											);
										}
									}
								}
							});
						}
					}
				}
			};
			const TimelineNavigation = {
				init: function () {
					const hideFromNavData = JSON.parse(
						block.dataset.hideFromNavSlides
					);
					this.timelineIdsToHide = hideFromNavData;

					this.toggleItemVisibility(this.timelineIdsToHide);
					this.toggleFirstThreeItems();
					this.timelineNavClickListener();
					this.updateAllNavTimelines();
				},
				toggleItemVisibility: function (timelineIdsToHide) {
					dots.forEach((dot, index) => {
						const stringIndex = (index + 1).toString();
						if (timelineIdsToHide.includes(stringIndex)) {
							dot.classList.add('hide_from_timeline_navigation');
						}
					});
					menuItems.forEach((item, index) => {
						const stringIndex = (index + 1).toString();
						if (timelineIdsToHide.includes(stringIndex)) {
							item.classList.add('hide_from_timeline_navigation');
						}
					});
				},
				toggleFirstThreeItems: function () {
					const firstThreeItems = [...menuItems].slice(0, 3);
					firstThreeItems.forEach(
						(name) => (name.style.display = 'flex')
					);
				},
				timelineNavClickListener: function () {
					const items = [...dots, ...menuItems];
					items.forEach((item, index) => {
						item.addEventListener('click', () =>
							this.timelineNavHandleClick(item, index, items)
						);
					});
				},
				timelineNavHandleClick: function (item) {
					if (!getState('canSwipe')) {
						return;
					}
					const targetStepIndex =
						parseInt(item.getAttribute('data-step')) - 1;
					const currentStepIndex = getState('currentTimelineIndex');
					const stepDifference = targetStepIndex - currentStepIndex;

					if (
						Math.abs(stepDifference) > 1 ||
						Math.abs(stepDifference) < -1
					) {
						TimelineManager.fadeToBlack(() => {
							TimelineManager.navigateToTimeline(targetStepIndex);
						});
					} else if (Math.abs(stepDifference) == 0) {
						return;
					} else {
						TimelineManager.changeTimeline(stepDifference);
					}
				},
				updateAllNavTimelines: function () {
					allNavTimelines = Array.from(menuItems)
						.filter(
							(item) =>
								!item.classList.contains(
									'hide_from_timeline_navigation'
								)
						)
						.map(
							(item) =>
								parseInt(item.getAttribute('data-step')) - 1
						);
				}
			};
			const ContentManager = {
				contentFrame: function () {
					const currentTimelineIndex = getState(
						'currentTimelineIndex'
					);
					contentElements.forEach((elm) => {
						const contentDelay = elm.dataset.slideDelay;
						const parts = contentDelay.split(':');
						const seconds =
							parseInt(parts[0], 10) * 60 +
							parseInt(parts[1], 10);
						const delay = seconds * 200;

						const contentActiveSlidesValue = elm.dataset.slideId;
						const contentActiveSlidesArray = JSON.parse(
							contentActiveSlidesValue
						);
						const parsedContentSlidesArray =
							contentActiveSlidesArray.map((value) =>
								parseInt(value)
							);
						const isActive = parsedContentSlidesArray.includes(
							currentTimelineIndex + 1
						);

						setTimeout(() => {
							elm.classList.toggle('active', isActive);
						}, delay);
					});
				},
				swiperFrame: function () {
					const currentTimelineIndex = getState(
						'currentTimelineIndex'
					);
					const swiperSlides = SwiperManager.swiper.slides;

					swiperSlides.forEach((slide) => {
						if (slide.dataset.slideId == currentTimelineIndex + 1) {
							SwiperManager.swiper.slideTo(
								slide.dataset.swiperSlideId - 1
							);
						}
					});

					const swiperActiveSlidesValue =
						swiperWrapper.dataset.swiperActiveSlides;

					const swiperDelay = swiperWrapper.dataset.swiperDelay;
					const swiperParts = swiperDelay.split(':');
					const swiperSeconds =
						parseInt(swiperParts[0], 10) * 60 +
						parseInt(swiperParts[1], 10);
					const swiperDelayTimeout = swiperSeconds * 2500;

					const swiperActiveSlidesArray = JSON.parse(
						swiperActiveSlidesValue
					);
					const parsedSwiperActiveSlidesArray =
						swiperActiveSlidesArray.map((value) => parseInt(value));
					const isActive = parsedSwiperActiveSlidesArray.includes(
						currentTimelineIndex + 1
					);

					if (isActive) {
						setTimeout(() => {
							swiperWrapper.classList.add('active');
						}, swiperDelayTimeout);
					} else {
						swiperWrapper.classList.remove('active');
					}
				}
			};
			const ScrollTypeSwitch = {
				init: function (block) {
					const isFullScreen =
						parseFloat(block.dataset.fullscreen) === 1;

					if (isFullScreen) {
						document.body.classList.add(
							'animated-sections-fullscreen'
						);
						startBlock();
						TouchScrollEventManager.addScrollLockScreen();
					} else {
						document.body.classList.remove(
							'animated-sections-fullscreen'
						);
						startBlock();
					}
				}
			};
			const TouchScrollEventManager = {
				decelerateScroll: function () {
					this.scrollVelocity *= 0.9;

					if (Math.abs(this.scrollVelocity) < 1) {
						this.isDecelerating = false;
						return;
					}

					window.scrollBy(0, this.scrollVelocity);

					requestAnimationFrame(this.decelerateScroll.bind(this));
				},
				isElementAtTop: function (element) {
					const headerHeight = siteHeader.offsetHeight;
					const bounding = element.getBoundingClientRect();
					return bounding.top <= headerHeight; // Adjusted to account for header height
				},
				isElementAtBottom: function (element) {
					const bounding = element.getBoundingClientRect();
					return bounding.bottom >= window.innerHeight;
				},
				addScrollLockScreen: function () {
					if (window.innerWidth <= MOBILE_BREAKPOINT) {
						isTouching = false;
						window.removeEventListener(
							'touchstart',
							handleTouchStart
						);
						window.removeEventListener(
							'touchmove',
							handleTouchMove
						);
						window.removeEventListener('touchend', handleTouchEnd);
						window.removeEventListener('wheel', handleWheelEvent);

						TimelineManager.navigateToTimeline(
							getState('currentTimelineIndex')
						);
					} else {
						window.removeEventListener('wheel', handleWheelEvent);
					}

					document.body.classList.add(
						'animated-sections-scroll-lock'
					);
					// siteHeader.classList.add('animated-sections-header-lock');
					smoothScrollToTarget(block);

					setTimeout(() => {
						if (window.innerWidth <= MOBILE_BREAKPOINT) {
							block.addEventListener(
								'touchstart',
								handleTimelineTouchStart
							);
							block.addEventListener(
								'touchmove',
								handleTimelineTouchMove
							);
							block.addEventListener(
								'touchend',
								handleTimelineTouchEnd
							);
							block.addEventListener(
								'wheel',
								handleTimelineScrollControl
							);
						} else {
							block.addEventListener(
								'wheel',
								handleTimelineScrollControl
							);
						}
					}, 100);
				},
				removeScrollLockScreen: function () {
					document.body.classList.remove(
						'animated-sections-scroll-lock'
					);
					// siteHeader.classList.remove('animated-sections-header-lock');

					setState('canSwipe', false);

					if (window.innerWidth <= MOBILE_BREAKPOINT) {
						block.removeEventListener(
							'touchstart',
							handleTimelineTouchStart
						);
						block.removeEventListener(
							'touchmove',
							handleTimelineTouchMove
						);
						block.removeEventListener(
							'touchend',
							handleTimelineTouchEnd
						);
						block.removeEventListener(
							'wheel',
							handleTimelineScrollControl
						);
					} else {
						block.removeEventListener(
							'wheel',
							handleTimelineScrollControl
						);
					}

					setTimeout(() => {
						if (window.innerWidth <= MOBILE_BREAKPOINT) {
							window.addEventListener(
								'touchstart',
								handleTouchStart
							);
							window.addEventListener(
								'touchmove',
								handleTouchMove
							);
							window.addEventListener('touchend', handleTouchEnd);
							window.addEventListener('wheel', handleWheelEvent);
						} else {
							window.addEventListener('wheel', handleWheelEvent);
						}
					}, 2000);
				}
			};
			const addEventListeners = {
				init: function () {
					backButton.addEventListener('click', handleBackButtonClick);
					nextButton.addEventListener('click', handleNextButtonClick);
					if (window.innerWidth <= MOBILE_BREAKPOINT) {
						window.addEventListener(
							'touchstart',
							handleTouchStart,
							{passive: true}
						);
						window.addEventListener('touchmove', handleTouchMove, {
							passive: true
						});
						window.addEventListener('touchend', handleTouchEnd, {
							passive: true
						});
						window.addEventListener('wheel', handleWheelEvent);
					} else {
						window.addEventListener(
							'resize',
							debounce(handleResize, 100)
						);
						window.addEventListener('wheel', handleWheelEvent);
					}

					if (contentButtons) {
						contentButtons.forEach((button) => {
							button.addEventListener(
								'click',
								handleContentButtonClick
							);
						});
					}
				}
			};

			// Initialize
			function init() {
				setState('canSwipe', false);
				setState('currentTimelineIndex', 0);
				setState('timelinesVisited', false);
				setState('lastSwipeFalseTime', 0);

				addEventListeners.init();
				VideoUtils.preloadAllVideoSources();

				TimelineManager.createTimelinesAndNavigation();
				console.log('init');
				TimelineNavigation.init();
				ScrollTypeSwitch.init(block);

				if (swiperEnabled == 'true') {
					SwiperManager.init();
					SwiperManager.initSwiperPaginationListener();
				}
			}

			// Utility Functions
			function getState(key) {
				return state[key];
			}
			function setState(key, value) {
				console.log(key);
				if (key === 'canSwipe') {
					if (value === false) {
						state[key] = value;
						updateScrollWrapperClass(value);
						state.lastSwipeFalseTime = Date.now();
					} else if (value === true) {
						const timeSinceLastFalse =
							Date.now() - state.lastSwipeFalseTime;
						if (timeSinceLastFalse >= 2000) {
							state[key] = value;
							updateScrollWrapperClass(value);
						}
					}
				} else {
					state[key] = value;
				}
			}
			function debounce(func, wait) {
				let timeout;
				return function executedFunction(...args) {
					const later = () => {
						clearTimeout(timeout);
						func(...args);
					};
					clearTimeout(timeout);
					timeout = setTimeout(later, wait);
				};
			}
			function smoothScrollToTarget(target) {
				let targetPosition = target.offsetTop;
				const startPosition = window.pageYOffset;
				const distance = targetPosition - startPosition;
				let startTime = null;

				const scrollSpeed = Math.abs(scrollVelocity);
				const dynamicDurationFactor = 250;
				const duration = Math.max(
					300,
					Math.min(
						1000,
						(distance / (scrollSpeed + 1)) * dynamicDurationFactor
					)
				);

				function animation(currentTime) {
					if (startTime === null) startTime = currentTime;
					const timeElapsed = currentTime - startTime;
					let run = easeOutCubic(
						timeElapsed,
						startPosition,
						distance,
						duration
					);

					if (
						(distance > 0 && run > targetPosition) ||
						(distance < 0 && run < targetPosition)
					) {
						run = targetPosition;
					}

					window.scrollTo(0, run);
					if (timeElapsed < duration && run !== targetPosition) {
						requestAnimationFrame(animation);
					}
				}

				function easeOutCubic(t, b, c, d) {
					t /= d;
					t--;
					return c * (t * t * t + 1) + b;
				}

				requestAnimationFrame(animation);
			}
			function isSafari() {
				return (
					/^((?!chrome|android).)*safari/i.test(
						navigator.userAgent
					) ||
					(/iPad|iPhone|iPod/.test(navigator.userAgent) &&
						!window.MSStream)
				);
			}
			function handleWheelEvent(event) {
				let currentScrollTop =
					window.pageYOffset || document.documentElement.scrollTop;
				let wheelScrollDelta = event.deltaY;
				checkBlockPosition(wheelScrollDelta, currentScrollTop);
			}
			function handleTimelineScrollControl() {
				if (!getState('canSwipe')) {
					return;
				}

				scrollAmount += event.deltaY;

				const currentTimelineIndex = getState('currentTimelineIndex');
				const totalTimelines = timelineElements.length;

				if (scrollAmount >= 100) {
					// Move forward
					if (currentTimelineIndex === totalTimelines - 1) {
						TouchScrollEventManager.removeScrollLockScreen();
						setState('timelinesVisited', true);
					} else {
						TimelineManager.changeTimeline(1);
						scrollAmount = 5;
					}
				} else if (scrollAmount <= -100) {
					// Move backward
					if (currentTimelineIndex === 0) {
						TouchScrollEventManager.removeScrollLockScreen();
						setState('timelinesVisited', false);
					} else {
						TimelineManager.changeTimeline(-1);
						scrollAmount = -5;
					}
				}

				if (scrollAmount > 0) {
					scrollBar.style.top = '0%';
					scrollBar.style.bottom = '';
				} else {
					scrollBar.style.top = '';
					scrollBar.style.bottom = '0%';
				}

				const scrollPercentage = (Math.abs(scrollAmount) / 100) * 100;

				scrollBar.style.height = `${scrollPercentage}%`;
			}
			function handleTouchStart(event) {
				if (event.touches.length === 1) {
					lastTouchY = event.touches[0].clientY;
					isTouching = true;
				}
			}
			function handleTouchMove(event) {
				if (isTouching) {
					let currentScrollTop =
						window.pageYOffset ||
						document.documentElement.scrollTop;
					let touchScrollDelta =
						event.touches[0].clientY - lastTouchY;
					if (
						checkBlockPosition(touchScrollDelta, currentScrollTop)
					) {
						if (event.cancelable) {
							event.preventDefault();
							event.stopPropagation(); // Stop event from propagating
						}
						isTouching = false;
						return;
					}
					lastTouchY = event.touches[0].clientY;
				}
			}

			function handleTouchEnd() {
				isTouching = false;
				// Start listening to scroll events
				window.addEventListener('scroll', handleScroll, {
					passive: true
				});
			}

			function handleScroll() {
				let currentScrollTop =
					window.pageYOffset || document.documentElement.scrollTop;
				if (checkBlockPosition(0, currentScrollTop)) {
					// Take action if the block position is exceeded
					// For example, scroll back to a safe position
					window.removeEventListener('scroll', handleScroll); // Remove the event listener if needed
				}
			}

			function handleTimelineTouchStart(e) {
				if (!getState('canSwipe')) {
					return;
				}
				e.preventDefault();
				e.stopPropagation();
				touchStartY = e.touches[0].screenY;
			}
			function handleTimelineTouchMove(e) {
				// if (!getState('canSwipe')) {
				// 	return;
				// }
				// e.preventDefault();
				// e.stopPropagation();
			}
			function handleTimelineTouchEnd(e) {
				if (!getState('canSwipe')) {
					return;
				}
				touchEndY = e.changedTouches[0].screenY;

				e.preventDefault();
				e.stopPropagation();
				const currentTimelineIndex = getState('currentTimelineIndex');
				const totalTimelines = timelineElements.length;

				if (touchEndY < touchStartY) {
					if (currentTimelineIndex === totalTimelines - 1) {
						TouchScrollEventManager.removeScrollLockScreen();
						setState('timelinesVisited', true);
					} else {
						TimelineManager.changeTimeline(1);
					}
				} else if (touchEndY > touchStartY) {
					if (currentTimelineIndex === 0) {
						TouchScrollEventManager.removeScrollLockScreen();
						setState('timelinesVisited', false);
					} else {
						TimelineManager.changeTimeline(-1);
					}
				}

				const scrollPercentage = Math.abs(touchEndY) * 100;
				scrollBar.style.height = `${scrollPercentage}%`;
				if (touchEndY > 0) {
					scrollBar.style.left = '0%';
					scrollBar.style.right = '';
				} else {
					scrollBar.style.left = '';
					scrollBar.style.right = '0%';
				}
			}

			//UI Functions
			function createBackButton() {
				const slidesJson = JSON.parse(
					block.dataset.slidesToHaveBackButton
				);
				const slides_to_have_back_button = slidesJson;

				let showBackButton = false;
				slides_to_have_back_button.forEach((slide) => {
					const stepId = slide;
					if (
						stepId &&
						parseInt(stepId) ===
							getState('currentTimelineIndex') + 1
					) {
						showBackButton = true;
					}
				});
				if (showBackButton) {
					backButton.style.visibility = 'visible';
					backButton.style.opacity = '1';
				} else {
					backButton.style.opacity = '0';
					backButton.style.visibility = 'hidden';
				}
			}
			function updateScrollWrapperClass(canSwipe) {
				const scrollWrapper = block.querySelector(
					'.animated-sections__progress-inner'
				);
				if (scrollWrapper) {
					if (canSwipe) {
						scrollWrapper.classList.remove('loading');
						if (SwiperManager.swiper) {
							SwiperManager.swiper.pagination.el.classList.remove(
								'loading'
							);
						}
					} else {
						scrollWrapper.classList.add('loading');
						if (SwiperManager.swiper) {
							SwiperManager.swiper.pagination.el.classList.add(
								'loading'
							);
						}
					}
				}
			}

			//Event Listener Functions
			function handleResize() {
				TimelineManager.rebuildTweens();
				if (getState('canSwipe')) {
					smoothScrollToTarget(block);
				}
			}
			function handleBackButtonClick() {
				if (getState('canSwipe')) {
					TimelineManager.navigateToTimeline(
						backButton.dataset.backButton
					);
				}
			}
			function handleNextButtonClick() {
				if (getState('canSwipe')) {
					TimelineManager.changeTimeline(1);
				}
			}
			function handleContentButtonClick() {
				if (getState('canSwipe')) {
					TimelineManager.navigateToTimeline(
						this.dataset.contentButton
					);
				}
			}

			function startBlock() {
				setState('canSwipe', true);
				TimelineManager.navigateToTimeline(
					getState('currentTimelineIndex')
				);
				// splashScreen.classList.remove('active');
				// uiElementsContainer.classList.remove('disabled');
			}

			//Dev Zone
			function checkBlockPosition(scrollDelta, currentScrollTop) {
				TouchScrollEventManager.scrollVelocity = scrollDelta;
				if (currentScrollTop > lastScrollTop) {
					if (!getState('timelinesVisited')) {
						if (TouchScrollEventManager.isElementAtTop(block)) {
							TouchScrollEventManager.addScrollLockScreen(true);

							if (!isDecelerating && scrollVelocity !== 0) {
								isDecelerating = true;
								TouchScrollEventManager.decelerateScroll();
							}
							if (!getState('canSwipe')) {
								setTimeout(() => {
									setState('canSwipe', true);
								}, 1000);
							}
							return true;
						}
					}
				} else {
					if (getState('timelinesVisited')) {
						if (TouchScrollEventManager.isElementAtBottom(block)) {
							TouchScrollEventManager.addScrollLockScreen();

							setTimeout(() => {
								setState('canSwipe', true);
							}, 1000);
							return true;
						}
					}
				}
				lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
				return false;
			}

			// Make the magic happen
			init();
			// fadeIn(block);
		});
	} catch (error) {
		console.error(error);
	}
}
