(() => {

    let yOffset = 0; // window.pageYoffset 대신 쓸 변수
    let prevScrollHeight = 0; // 현재 스크롤 위치보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
    let currentScene = 0; // 현재 활성화된 씬
    let enterNewScene = false; // 새로운 scene이 시작되는 순간 true

    const sceneInfo = [{ //0
            type: 'sticky',
            heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-0'),
                messageA: document.querySelector('#scroll-section-0 .main-message.a'),
                messageB: document.querySelector('#scroll-section-0 .main-message.b'),
                messageC: document.querySelector('#scroll-section-0 .main-message.c'),
                messageD: document.querySelector('#scroll-section-0 .main-message.d'),
				canvas: document.querySelector('#video-canvas-0'),
				context: document.querySelector('#video-canvas-0').getContext('2d'),
				videoImages: []
            },
            values: {
				videoImageCount: 300,
				imageSequence: [0, 299],
				canvas_opacity: [1,0,{start:0.9, end:1}],
                messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
				messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
				messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
				messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
				messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
				messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
				messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
				messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
				messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
				messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
				messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
				messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
				messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
				messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
				messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
				messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }]
            },
        },
        {
			// 1
			type: 'normal',
			heightNum: 2,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-1'),
				content: document.querySelector('#scroll-section-1 .description')
			}
		},
        { //2
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
				container: document.querySelector('#scroll-section-2'),
				messageA: document.querySelector('#scroll-section-2 .a'),
				messageB: document.querySelector('#scroll-section-2 .b'),
				messageC: document.querySelector('#scroll-section-2 .c'),
				pinB: document.querySelector('#scroll-section-2 .b .pin'),
				pinC: document.querySelector('#scroll-section-2 .c .pin'),
				canvas: document.querySelector('#video-canvas-1'),
				context: document.querySelector('#video-canvas-1').getContext('2d'),
				videoImages: []
			},
            values: {
				videoImageCount: 960,
				imageSequence: [0, 959],
				canvas_opacity_in: [0, 1, { start: 0, end: 0.1 }],
				canvas_opacity_out: [1, 0, { start: 0.95, end: 1 }],
				messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
				messageB_translateY_in: [30, 0, { start: 0.5, end: 0.55 }],
				messageC_translateY_in: [30, 0, { start: 0.72, end: 0.77 }],
				messageA_opacity_in: [0, 1, { start: 0.15, end: 0.2 }],
				messageB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
				messageC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
				messageA_translateY_out: [0, -20, { start: 0.3, end: 0.35 }],
				messageB_translateY_out: [0, -20, { start: 0.58, end: 0.63 }],
				messageC_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
				messageA_opacity_out: [1, 0, { start: 0.3, end: 0.35 }],
				messageB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
				messageC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
				pinB_scaleY: [0.5, 1, { start: 0.5, end: 0.55 }],
				pinC_scaleY: [0.5, 1, { start: 0.72, end: 0.77 }],
				pinB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
				pinC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
				pinB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
				pinC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }]
			}
        },
        { //3
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-3'),
				canvasCaption: document.querySelector('.canvas-caption'),
				canvas: document.querySelector('.image-blend-canvas'),
				context : document.querySelector('.image-blend-canvas').getContext('2d'),
				imagesPath: [
					'./images/blend-image-1.jpg',
					'./images/blend-image-2.jpg',
				],
				images: [],
			},
			values: {
				rectLX: [0, 0, {start:0, end:0}],
				rectRX: [0, 0, {start:0, end:0}],
			}
        }
    ];

	function setCanvasImages(){
		let imgElem;
		for (let i = 0; i < sceneInfo[0].values.videoImageCount; i++) {
			imgElem = new Image();
			imgElem.src = `./images/IMG_${6726 + i}.JPG`;
			sceneInfo[0].objs.videoImages.push(imgElem);
		}

		let imgElem2;
		for (let i = 0; i < sceneInfo[2].values.videoImageCount; i++) {
			imgElem2 = new Image();
			imgElem2.src = `./images/IMG_${7027 + i}.JPG`;
			sceneInfo[2].objs.videoImages.push(imgElem2);
		}

		let imgElem3;
		for(let i = 0; i < sceneInfo[3].objs.imagesPath.length; i++) {
			imgElem3 = new Image();
			imgElem3.src = sceneInfo[3].objs.imagesPath[i];
			sceneInfo[3].objs.images.push(imgElem3);
		}
		// console.log(sceneInfo[3].objs.images);
	}

    function calcValues(values, currentYOffset) {
        let rv;
        // 현재 씬에서 스크롤된 범위를 비율로 구하기
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;
        if( values.length === 3 ){
            // start ~ end 사이에 에니메이션 실행
            const partScrollStart = values[2].start * scrollHeight;
            const partScrollEnd = values[2].end * scrollHeight;
            // 애니메이션 실행부분의 높이
            const partScrollHeight = partScrollEnd - partScrollStart;

            if(currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd)
            {
                rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
            }
            else if (currentYOffset < partScrollStart){
                rv = values[0];
            }
            else if(currentYOffset > partScrollEnd){
                rv = values[1];
            }
        } else{
            rv = scrollRatio * (values[1] - values[0]) + values[0];
        }
        return rv;
    }

    function playAnimation() {
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeight; // 현재 씬의 scrollHeight
        const scrollHeight = sceneInfo[currentScene].scrollHeight; // 현재 씬의 높이
        const scrollRatio = currentYOffset/scrollHeight; // 현재 씬의 scrollHeight의 비율;


        switch (currentScene) {
            case 0:   
				let sequence = parseInt(calcValues(values.imageSequence, currentYOffset));
				objs.context.drawImage(objs.videoImages[sequence],0,0);
				objs.canvas.style.opacity = calcValues(values.canvas_opacity, currentYOffset); // 캔버스 투명도 지정

                if (scrollRatio <= 0.22) {
                    // in
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
                }
                if (scrollRatio <= 0.42) {
					// in
					objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
					objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
				} else {
					// out
					objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
					objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
				}

				if (scrollRatio <= 0.62) {
					// in
					objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
					objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
				} else {
					// out
					objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
					objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
				}

				if (scrollRatio <= 0.82) {
					// in
					objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
					objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
				} else {
					// out
					objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
					objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`;
				}
                break;
            case 2:
				let sequence2 = parseInt(calcValues(values.imageSequence, currentYOffset));
				objs.context.drawImage(objs.videoImages[sequence2],0,0);

				if (scrollRatio <= 0.5) {
					objs.canvas.style.opacity = calcValues(values.canvas_opacity_in,currentYOffset);
				} else {
					objs.canvas.style.opacity = calcValues(values.canvas_opacity_out,currentYOffset);
				}
				if (scrollRatio <= 0.25) {
					// in
					objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
					objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
				} else {
					// out
					objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
					objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
				}

				if (scrollRatio <= 0.57) {
					// in
					objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
					objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
					objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
				} else {
					// out
					objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
					objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
					objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
				}

				if (scrollRatio <= 0.83) {
					// in
					objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
					objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
					objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
				} else {
					// out
					objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
					objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
					objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
				}
                break;
            case 3:
				// 가로 / 세로 모두 꽉 차게 하기 위해 ( 계산 필요 )
				const widthRatio = window.innerWidth / objs.canvas.width;
				const heightRatio = window.innerHeight / objs.canvas.height;

				let canvasScaleRatio;
				if(widthRatio <= heightRatio){
					// 캔버스보다 브러우저 창이 홀쭉한 경우
					canvasScaleRatio = heightRatio;
				} else {
					// 캔버스보다 브러우저 창이 납작한 경우
					canvasScaleRatio = widthRatio;
				}
				objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
				objs.context.drawImage(objs.images[0], 0, 0);

				// 캔버스 사이즈에 맞춰 가정한 innerWidth와 innerHeight
				const recalculatedInnerWidth = window.innerWidth / canvasScaleRatio;
				const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;

				const whiteRectwidth = recalculatedInnerWidth * 0.15;
				values.rectLX[0] = (objs.canvas.width - recalculatedInnerWidth) / 2;
				values.rectLX[1] = values.rectLX[0] - whiteRectwidth;
				values.rectRX[0] = values.rectLX[0] + recalculatedInnerWidth - whiteRectwidth;
				values.rectRX[1] = values.rectRX[0] + whiteRectwidth;
				
				objs.context.fillRect(values.rectRX[0], 0, parseInt(whiteRectwidth), objs.canvas.height);
				objs.context.fillRect(values.rectLX[0], 0, parseInt(whiteRectwidth), objs.canvas.height);

                break;
        }
    }
    
    function setLayout() {
        // 각 스크롤 섹션의 높이 세팅
        for (let i = 0; i < sceneInfo.length; i++) {
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`; // 컨테이너에 높이 값 넣기
        }

        let totalScrollHeight = 0; // 전체 scrollHeight 값
        yOffset = window.pageYOffset;
        for (let i = 0; i < sceneInfo.length; i++) {
            totalScrollHeight += sceneInfo[i].scrollHeight; 
            if (totalScrollHeight >= yOffset) {
                currentScene = i;
                break;
            }
        }
		document.body.setAttribute('id',`show-scene-${currentScene}`);// 초기 id값이 없기 때문에 초기값 설정
		const heightRatio = window.innerHeight / 1080;
		sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%,-50%, 0) scale(${heightRatio})`;
		sceneInfo[2].objs.canvas.style.transform = `translate3d(-50%,-50%, 0) scale(${heightRatio})`;
    }

    function scrollLoop() {
        enterNewScene = false;
        prevScrollHeight = 0;
        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }
        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            enterNewScene = true;
            currentScene++;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }
        if (yOffset < prevScrollHeight) {
            enterNewScene = true;
            if (currentScene === 0) return; // 브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }

        if (enterNewScene)return; // 새로운 페이지에 들어갈 시 함수를 종료함 -> opacity 값이 음수가 나오기 때문에 
        playAnimation();
    }

    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        scrollLoop();
    });
    window.addEventListener('load', ()=>{
		setLayout();
		sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0],0,0);
	});
    window.addEventListener('resize', setLayout);

	setCanvasImages();

})();