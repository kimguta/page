document.addEventListener("DOMContentLoaded", function () {
    // 지도 pin 클릭 이벤트
    document.querySelectorAll(".pin-btn").forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();

            const pinWrap = this.closest(".pin-wrap");
            const modal = pinWrap.nextElementSibling;
            if (!modal) return;

            // 모달을 flex로 표시
            modal.style.display = "flex";

            // 화면 너비와 모달 너비
            const windowWidth = window.innerWidth;
            const modalWidth = modal.offsetWidth;

            // 버튼의 left(% 값) 가져오기
            const leftPercent = parseFloat(this.style.left) || 0;

            // 모달 폭을 %로 환산
            const modalPercent = (modalWidth / windowWidth) * 100;

            // 핀과 모달 사이 간격(%). 기존 offset = 3에 추가 여유를 더 줍니다.
            const baseOffset = 3;
            const extraOffsetForRight = 5; // 50% 이하일 때 좀 더 오른쪽으로 이동하기 위한 추가값

            let newLeft;

            // 50 이하 → 오른쪽 배치
            if (leftPercent <= 50) {
                // (핀 left + 기본 오프셋 + 추가 오프셋)
                newLeft = leftPercent + baseOffset + extraOffsetForRight;

                // 모달이 화면 오른쪽을 넘어가는지 체크
                if (newLeft + modalPercent > 100) {
                    newLeft = 100 - modalPercent;
                }
            } else {
                // 50 초과 → 왼쪽 배치
                newLeft = leftPercent - modalPercent - baseOffset;
                // 0 미만 방지
                if (newLeft < 0) {
                    newLeft = 0;
                }
            }

            modal.style.left = `${newLeft}%`;

            // 색상 가져오기
            const colorOut = this.querySelector(".color-out");
            if (colorOut) {
                const bgColor = window.getComputedStyle(colorOut).backgroundColor;
                modal.querySelectorAll(".color-in").forEach(el => {
                    el.style.backgroundColor = bgColor;
                });
            }

            // strong 태그 텍스트를 모달 h2에 넣기
            const titleText = this.querySelector("strong")?.textContent.trim();
            if (titleText) {
                const h2 = modal.querySelector("h2");
                if (h2) {
                    h2.textContent = titleText;
                }
            }

            // 기존 .on 제거 후 현재 버튼에 .on 추가
            document.querySelectorAll(".pin-btn.on").forEach(btn => {
                btn.classList.remove("on");
            });
            this.classList.add("on");
            pinWrap.classList.add("on");
        });
    });

    // 모달 닫기
    document.querySelectorAll(".pin-modal .close").forEach(closeBtn => {
        closeBtn.addEventListener("click", function () {
            const modal = this.closest(".pin-modal");
            const pinWrap = modal.previousElementSibling;

            // 모달 숨기기
            modal.style.display = "none";

            // pin-wrap에서 on 제거, 내부 .pin-btn on 제거
            if (pinWrap) {
                pinWrap.classList.remove("on");
                pinWrap.querySelectorAll(".pin-btn").forEach(btn => {
                    btn.classList.remove("on");
                });
            }
        });
    });

    // vr 목록 클릭 이벤트
    document.querySelectorAll(".pin-modal a").forEach(function (link) {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            // VR 뷰 박스를 보이게 함
            let vrViewBox = document.querySelector(".vr-view-bx");
            if (vrViewBox) {
                vrViewBox.classList.add("show", "on");
                vrViewBox.style.display = "block";
            }
        });
    });

    // VR 뷰 박스 닫기 버튼 클릭 시 숨기기
    document.querySelector(".vr-view-bx .close").addEventListener("click", function () {
        let vrViewBox = document.querySelector(".vr-view-bx");
        if (vrViewBox) {
            vrViewBox.classList.remove("show", "on");
            vrViewBox.style.display = "none";

            isVRMode = true;
            updateModeBox(true);

            // vr-thumbnail-img 제거
            const thumbnailImg = vrDataBx.querySelector('.vr-thumbnail-img');
            if (thumbnailImg) {
                thumbnailImg.remove();
            }
        }
    });

    // .vr-open 클릭 시 동작
    document.querySelector(".vr-open").addEventListener("click", function (event) {
        event.preventDefault(); // 기본 이벤트 방지
        document.documentElement.classList.add("vr-mode"); // html에 vr-mode 추가
        document.querySelector("#vr-wrap").classList.add("on"); // #vr-wrap에 on 클래스 추가
        document.querySelector("#vr-wrap").style.display = "block"; // #vr-wrap 보이기

        // #vr-wrap 내 첫 번째 a 요소로 포커스 이동
        let firstLink = document.querySelector("#vr-wrap a");
        if (firstLink) {
            firstLink.focus();
        }
    });

    // .vr-close 클릭 시 동작
    document.querySelector(".vr-close").addEventListener("click", function () {
        document.documentElement.classList.remove("vr-mode"); // html에서 vr-mode 제거
        document.querySelector("#vr-wrap").classList.remove("on"); // #vr-wrap에서 on 클래스 제거
        document.querySelector("#vr-wrap").style.display = "none"; // #vr-wrap 숨기기

        // .vr-open 버튼으로 포커스 이동
        let vrOpenButton = document.querySelector(".vr-open");
        if (vrOpenButton) {
            vrOpenButton.focus();
        }
    });

    // pin tag display none & show
    const pinWrapPins = document.querySelectorAll(".pin-wrap .pin-btn");
    const pinModalPins = document.querySelectorAll(".pin-modal .btn-pin-modal");

    pinWrapPins.forEach(pinWrapPin => {
        pinWrapPin.addEventListener('click', function() {
            const targetClass = this.classList[1];

            pinModalPins.forEach(pinModalPin => {
                if (pinModalPin?.classList.contains(targetClass)) {
                    pinModalPin.style.display = '';
                } else {
                    pinModalPin.style.display = 'none';
                }
            });
        });
    });

    const vrDataBx = document.querySelector('.vr-data-bx');
    const modeBx = document.querySelector('.mode-bx');
    let currentVrImage = '';
    let currentTitle = '';
    let isVRMode = true;

    // vr 호출 (viewer)
    function fnVrLoad(title, filePath) {
        // vr viewer
        if(viewer !== null) {
            viewer.destroy();
        }

        viewer = new PhotoSphereViewer.Viewer({
            container: 'viewer',
            panorama: filePath,
            defaultZoomLvl: 1,
            autorotateSpeed: '0.9rpm',
            autorotateDelay: 500,
            lang: {
                autorotate: '자동회전',
                zoom      : '확대/축소',
                zoomOut   : '축소',
                zoomIn    : '확대',
                move      : '이동',
                download  : '다운로드',
                fullscreen: '전체보기',
                menu      : '메뉴',
                twoFingers: '두 손가락을 사용하여 탐색',
                ctrlZoom  : 'ctrl + scroll을 사용하여 이미지를 확대/축소합니다.',
                loadError : '이미지가 없습니다.',
            },
            caption: title,
        });
    }

    // 모드 전환 핸들러
    function handleModeToggle() {
        isVRMode = !isVRMode;

        if (isVRMode) {
            // VR 모드 활성화
            vrDataBx.innerHTML = '';
            fnVrLoad(currentTitle, `/page/gwu/images/vr/${currentVrImage}`);
        } else {
            if (viewer) {
                viewer.destroy();
                viewer = null;
            }
            vrDataBx.innerHTML = `<img class="vr-thumbnail-img" src="/page/gwu/images/vr/normal/${currentVrImage}" alt="VR Image">`;
        }
        updateModeBox(isVRMode);
    }

    function updateTitleBox(titleText, locationText) {
        const titleBx = document.querySelector('.vr-view-bx .title-bx');
        const imgElement = titleBx?.querySelector('img');

        if (titleBx && imgElement) {
            titleBx.querySelector('strong').textContent = titleText;

            let nextNode = imgElement.nextSibling;
            while (nextNode && nextNode.nodeType === Node.TEXT_NODE) {
                nextNode.remove();
                nextNode = imgElement.nextSibling;
            }

            imgElement.insertAdjacentText('afterend', ' ' + locationText);
        }
    }

    function updateModeBox(isVR) {
        const icon = modeBx.querySelector('i img');
        const text = modeBx.childNodes[modeBx.childNodes.length - 1];

        if (isVR) {
            icon.src = "/page/gwu/images/main/vr_photo_icon.png";
            icon.alt = "사진보기";
            text.textContent = "사진보기";
        } else {
            icon.src = "/page/gwu/images/main/vr_360_icon.png";
            icon.alt = "VR보기";
            text.textContent = "VR보기";
        }
    }

    // 모드 버튼 클릭 이벤트
    modeBx.addEventListener('click', handleModeToggle);

    // change vi-view-bx(title-bx) text when click pin-modal button
    document.querySelector('.pin-modal')?.addEventListener('click', function(e) {
        const clickedLink = e.target.closest('a.color-in');
        if (!clickedLink) return;

        currentVrImage = clickedLink.dataset.vrImage;
        currentTitle = clickedLink.dataset.title;

        // 텍스트 추출
        const titleText = clickedLink.querySelector('span:first-child')?.textContent.replace(clickedLink.querySelector('em')?.textContent || '', '').trim();
        const locationText = clickedLink.querySelector('span:last-child')?.textContent.trim();

        updateTitleBox(titleText, locationText);

        isVRMode = true;
        fnVrLoad(currentTitle, `/page/gwu/images/vr/${currentVrImage}`);
        updateModeBox(true);
    });


});