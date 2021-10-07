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
            },
            values: {
                messageA_opacity_in: [0, 1,{ start:0.1, end:0.2}],
                messageA_opacity_out: [1, 0,{ start:0.25, end:0.3}],

                messageA_translateY_in :[20, 0, { start:0.1, end:0.2}],
                messageA_translateY_out :[0,-20, { start:0.25, end:0.3}],

                messageB_opacity_in: [0, 1,{ start:0.3, end:0.4}],
            },
        },
        { //1
            type: 'normal',
            heightNum: 2,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-1')
            }
        },
        { //2
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-2')
            }
        },
        { //3hg
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-3')
            }
        }
    ];

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
                if(scrollRatio <= 0.22){ // in
                    objs.messageA.style.opacity =calcValues(values.messageA_opacity_in, currentYOffset); // 스크롤 비율의 값을 opacity값에 대입
                    objs.messageA.style.transform = `translateY(${calcValues(values.messageA_translateY_in, currentYOffset)}%)`;
                } else { // out
                    objs.messageA.style.opacity =calcValues(values.messageA_opacity_out, currentYOffset); 
                    objs.messageA.style.transform = `translateY(${calcValues(values.messageA_translateY_out, currentYOffset)}%)`;
                }
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
        }
        document.body.setAttribute('id', `show-scene-${currentScene}`); // 초기 id값이 없기 때문에 초기값 설정
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
            totalScrollHeight += sceneInfo[i].scrollHeight; // 
            if (totalScrollHeight >= yOffset) {
                currentScene = i;
                break;
            }
        }
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

        if (enterNewScene) return; // 새로운 페이지에 들어갈 시 함수를 종료함 -> opacity 값이 음수가 나오기 때문에 
        playAnimation();
    }

    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        scrollLoop();
    });
    window.addEventListener('resize', setLayout);
    window.addEventListener('DOMContentLoaded', setLayout);

})();