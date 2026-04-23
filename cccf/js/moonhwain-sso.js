/**
 * 문화인 SSO (Single Sign-On) 통합 모듈
 * 
 * 문화인 시스템과의 로그인 정보 공유를 처리하는 JavaScript 모듈
 * 팝업 방식으로 동작하며, 문화인 로그인 후 자동 로그인을 구현
 * 
 * @author System
 * @since 2026.03.16
 * @version 1.0
 * 
 * 사용법:
 * 1. 이 파일을 HTML에 포함: <script src="moonhwain-sso.js"></script>
 * 2. 예매 버튼에 onclick="handleBookingClick()" 추가
 * 3. 로그인 여부 확인은 isLoggedIn() 함수로 수행
 */

(function() {
    'use strict';

    // 환경 설정
    const SSO_CONFIG = {
        // 문화인 SSO 팝업 URL
        moonhwainBaseUrl: 'https://cccf.moonhwain.net:451/rsvc/login.html',
        
        // 기관 ID
        bId: 'cccf',
        
        // CCCF 콜백 엔드포인트
        callbackUrl: '/moonhwain/sso/verify',
        
        // 팝업 설정
        popupWidth: 1100,
        popupHeight: 1280,
        popupName: 'moonhwain_login_share'
    };

    // ================================================================
    // 로그인 여부 확인
    // ================================================================

    /**
     * 로그인 여부 확인
     * 
     * @returns {boolean} 로그인 여부
     */
    window.isLoggedIn = function() {
        try {
            // 방식 1: 쿠키 확인
            if (document.cookie.indexOf('LoginVO') !== -1) {
                return true;
            }
            
            // 방식 2: 세션 스토리지 확인
            if (typeof sessionStorage !== 'undefined' && 
                sessionStorage.getItem('isLoggedIn') === 'true') {
                return true;
            }
            
            // 방식 3: 로컬 스토리지 확인 (선택사항)
            if (typeof localStorage !== 'undefined' && 
                localStorage.getItem('userLoggedIn') === 'true') {
                return true;
            }
            
            return false;
        } catch (error) {
            console.error('[MoonhwainSSO] 로그인 여부 확인 중 오류:', error);
            return false;
        }
    };

    // ================================================================
    // 예매 프로세스 처리
    // ================================================================

    /**
     * 예매 버튼 클릭 처리
     * 로그인 여부에 따라 직접 예매 진행 또는 SSO 팝업 실행
     */
    window.handleBookingClick = function() {
        console.log('[MoonhwainSSO] 예매 버튼 클릭');
        
        try {
            if (isLoggedIn()) {
                // 로그인된 사용자 - 직접 예매 진행
                console.log('[MoonhwainSSO] 로그인 상태 확인 - 직접 예매 진행');
                goToBooking();
            } else {
                // 미로그인 사용자 - SSO 팝업 시작
                console.log('[MoonhwainSSO] 비로그인 상태 - SSO 팝업 시작');
                openMoonhwainLoginShare();
            }
        } catch (error) {
            console.error('[MoonhwainSSO] 예매 처리 중 오류:', error);
            alert('예매 처리 중 오류가 발생했습니다.');
        }
    };

    /**
     * 예매 페이지로 이동
     */
    window.goToBooking = function() {
        console.log('[MoonhwainSSO] 예매 페이지로 이동');
        window.location.href = '/booking/list';
    };

    // ================================================================
    // 문화인 SSO 팝업 처리
    // ================================================================

    /**
     * 문화인 로그인정보 공유 팝업 호출
     * 
     * @param {string} returnUrl - 로그인 후 돌아올 URL (기본값: 현재 페이지)
     */
    window.openMoonhwainLoginShare = function(returnUrl) {
        try {
            // Step 1: returnUrl 설정
            if (!returnUrl) {
                returnUrl = window.location.href;
            }

            // 로컬/운영 공통으로 항상 현재 사이트 기준 URL을 사용한다.
            const currentSiteUrl = window.location.origin + window.location.pathname + window.location.search;
            if (returnUrl.indexOf('cccf.moonhwain.net') > -1) {
                returnUrl = currentSiteUrl;
            }
            console.log('[MoonhwainSSO] returnUrl:', returnUrl);

            // Step 2: 파라미터 인코딩 (? → ~, & → ^)
            const encodedGoUrl = returnUrl
                .replace(/\?/g, '~')
                .replace(/&/g, '^');
            console.log('[MoonhwainSSO] encodedGoUrl:', encodedGoUrl);

            // Step 3: 팝업 URL 생성
            const popupUrl = buildPopupUrl(encodedGoUrl);
            console.log('[MoonhwainSSO] popupUrl:', popupUrl);

            // Step 4: 팝업 열기
            const popupWindow = window.open(
                popupUrl,
                SSO_CONFIG.popupName,
                buildPopupFeatures()
            );

            // Step 5: 팝업 차단 확인
            if (!popupWindow || popupWindow.closed || typeof popupWindow.closed === 'undefined') {
                console.warn('[MoonhwainSSO] 팝업이 차단되었습니다.');
                showPopupBlockedMessage();
            } else {
                console.log('[MoonhwainSSO] 팝업 열기 성공');
            }

        } catch (error) {
            console.error('[MoonhwainSSO] 팝업 열기 중 오류:', error);
            alert('팝업을 열 수 없습니다. 팝업 차단 설정을 확인해주세요.');
        }
    };

    /**
     * 팝업 URL 빌드
     * 
     * @param {string} encodedGoUrl - 인코딩된 returnUrl
     * @returns {string} 팝업 URL
     */
    function buildPopupUrl(encodedGoUrl) {
        // API 문서 요구사항에 맞춰 goUrl 치환값(~, ^)을 유지한 채 전달한다.
        return SSO_CONFIG.moonhwainBaseUrl
            + '?useAuthCode=0'
            + '&b_id=' + SSO_CONFIG.bId
            + '&target=opener'
            + '&goUrl=' + encodedGoUrl
            + '&close=1'
            + '&rq_homepy=Y';
    }

    /**
     * 팝업 기능 옵션 빌드
     * 
     * @returns {string} 팝업 기능 옵션
     */
    function buildPopupFeatures() {
        return 'width=' + SSO_CONFIG.popupWidth + 
               ',height=' + SSO_CONFIG.popupHeight + 
               ',scrollbars=yes' +
               ',status=no' +
               ',resizable=no';
    }

    /**
     * 팝업 차단 메시지 표시
     */
    function showPopupBlockedMessage() {
        alert(
            '팝업이 차단되었습니다.\n\n' +
            '팝업 허용 설정을 하신 후 다시 시도해주세요.\n\n' +
            '브라우저별 팝업 차단 해제 방법:\n' +
            '- Chrome: 주소 표시줄 옆 팝업 아이콘 > 항상 허용\n' +
            '- Firefox: 팝업 차단 알림 > 예외 추가\n' +
            '- Edge: 설정 > 개인정보, 검색 및 서비스 > 팝업 차단'
        );
    }

    // ================================================================
    // 문화인 SSO 콜백 처리
    // ================================================================

    /**
     * 문화인 시스템으로부터 로그인 정보 수신
     * 
     * window.open으로 열린 팝업에서 부모 창의 이 함수 호출
     * opener.receiveMoonhwainLoginInfo(q_homepy)
     * 
     * @param {string} q_homepy - 암호화된 로그인 정보
     */
    window.receiveMoonhwainLoginInfo = function(q_homepy) {
        if (!q_homepy) {
            console.error('[MoonhwainSSO] 로그인 정보 없음');
            alert('로그인 정보가 없습니다.');
            return;
        }

        console.log('[MoonhwainSSO] 로그인 정보 수신 시작');
        console.log('[MoonhwainSSO] q_homepy:', q_homepy.substring(0, 50) + '...');

        try {
            // Step 1: 서버로 q_homepy 전송하여 검증 및 세션 생성
            sendLoginInfoToServer(q_homepy);

        } catch (error) {
            console.error('[MoonhwainSSO] 로그인 정보 처리 중 오류:', error);
            alert('로그인 정보 처리 중 오류가 발생했습니다.');
        }
    };

    /**
     * 서버로 로그인 정보 전송
     * 
     * @param {string} q_homepy - 암호화된 로그인 정보
     */
    function sendLoginInfoToServer(q_homepy) {
        const formData = new FormData();
        formData.append('q_homepy', q_homepy);

        fetch(SSO_CONFIG.callbackUrl, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('HTTP ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            // q_homepy를 함께 전달
            handleLoginResponse(data, q_homepy);
        })
        .catch(error => {
            console.error('[MoonhwainSSO] 요청 오류:', error);
            alert('서버와의 통신 중 오류가 발생했습니다.\n' + error.message);
        });
    }

    /**
     * 로그인 응답 처리
     * 
     * @param {object} data - 서버 응답 데이터
     */
    function handleLoginResponse(data) {
        console.log('[MoonhwainSSO] 서버 응답:', data);

        if (data.result === 'SUCCESS') {
            console.log('[MoonhwainSSO] 로그인 성공:', data.memberId);
            
            // 환영 메시지 표시
            alert(data.memberName + '님으로 로그인되었습니다.');
            
            // 세션 정보 로컬 저장 (선택사항)
            if (typeof sessionStorage !== 'undefined') {
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('memberId', data.memberId);
                sessionStorage.setItem('memberName', data.memberName);
            }
            
            // 페이지 새로고침 (서버 세션 반영)
            console.log('[MoonhwainSSO] 페이지 새로고침');
            location.reload();

        } else {
            // 로그인 실패
            console.error('[MoonhwainSSO] 로그인 실패:', data.message);
            const errorMessage = data.message || '알 수 없는 오류가 발생했습니다.';
            alert('로그인에 실패했습니다.\n' + errorMessage);
            
            // 사용자가 다시 시도할 수 있도록 안내
            if (confirm('다시 시도하시겠습니까?')) {
                openMoonhwainLoginShare();
            }
        }
    }

    /** 2026-04-06
     * URL 파라미터에서 goUrl을 추출한다.
     * 디버깅/운영 점검 용도로만 사용하며 동작에는 필수는 아니다.
     */
    function extractGoUrlFromParams() {
        try {
            const params = new URLSearchParams(window.location.search);
            const goUrlParam = params.get('goUrl');
            if (!goUrlParam) {
                return;
            }

            const decodedGoUrl = goUrlParam
                .replace(/~/g, '?')
                .replace(/\^/g, '&');
            console.log('[MoonhwainSSO] URL goUrl 파라미터:', decodedGoUrl);
        } catch (error) {
            console.warn('[MoonhwainSSO] goUrl 파라미터 파싱 실패:', error);
        }
    }

    /**
     * URL 쿼리에서 원본 값을 꺼낸다.
     * URLSearchParams는 '+'를 공백으로 바꿀 수 있어 q_homepy 추출에는 직접 파싱을 사용한다.
     */
    function getRawQueryParam(paramName) {
        if (!paramName || !window.location.search) {
            return '';
        }

        const escapedName = paramName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const matcher = new RegExp('(?:^|[?&])' + escapedName + '=([^&]*)');
        const matched = window.location.search.match(matcher);
        if (!matched || matched.length < 2) {
            return '';
        }

        try {
            return decodeURIComponent(matched[1]);
        } catch (error) {
            console.warn('[MoonhwainSSO] URL 파라미터 decode 실패:', error);
            return matched[1];
        }
    }

    /** 2026-04-06
     * URL 파라미터(q_homepy) 기반 콜백 처리.
     * target=opener 흐름 외에 goUrl 리다이렉트 방식에서도 로그인 처리가 가능하도록 보완한다.
     */
    function handleQHomepyFromUrl() {
        try {
            const params = new URLSearchParams(window.location.search);
            const qHomepy = getRawQueryParam('q_homepy');
            if (!qHomepy) {
                return;
            }

            console.log('[MoonhwainSSO] URL q_homepy 파라미터 감지');
            receiveMoonhwainLoginInfo(qHomepy);

            // 중복 처리 방지를 위해 주소창에서 q_homepy를 제거한다.
            params.delete('q_homepy');
            const queryString = params.toString();
            const cleanUrl = window.location.pathname + (queryString ? '?' + queryString : '');
            window.history.replaceState({}, document.title, cleanUrl);
        } catch (error) {
            console.warn('[MoonhwainSSO] q_homepy URL 처리 실패:', error);
        }
    }

    // ================================================================
    // 유틸리티 함수
    // ================================================================

    /**
     * 디버그 정보 출력
     */
    window.debugMoonhwainSSO = function() {
        console.log('[MoonhwainSSO] 디버그 정보');
        console.log('- SSO_CONFIG:', SSO_CONFIG);
        console.log('- isLoggedIn():', isLoggedIn());
        console.log('- userAgent:', navigator.userAgent);
        console.log('- 현재 URL:', window.location.href);
    };

    /**
     * 쿠키 값 읽기
     * 
     * @param {string} name - 쿠키 이름
     * @returns {string} 쿠키 값
     */
    window.getCookie = function(name) {
        const nameEQ = name + '=';
        const cookies = document.cookie.split(';');
        
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.indexOf(nameEQ) === 0) {
                return decodeURIComponent(cookie.substring(nameEQ.length));
            }
        }
        
        return null;
    };

    /**
     * 세션 정보 조회
     * 
     * @returns {object} 세션 정보
     */
    window.getSessionInfo = function() {
        return {
            isLoggedIn: isLoggedIn(),
            memberId: getCookie('memberId') || sessionStorage.getItem('memberId'),
            memberName: getCookie('memberName') || sessionStorage.getItem('memberName')
        };
    };

    // ================================================================
    // 문화인 예매 팝업 함수 (MW_API_예매팝업.txt 참고)
    // ================================================================

    /**
     * 공연 예매 팝업 실행
     * 
     * @param {string} bId - 기관 ID (기본값: 'cccf')
     * @param {string} pIdx - 문화인 공연 PK
     */
    window.wRsvPfm = function(bId, pIdx) {
        bId = bId || SSO_CONFIG.bId;
        
        if (!pIdx) {
            alert('공연 정보가 없습니다.');
            console.warn('[MoonhwainSSO] wRsvPfm: pIdx 미지정');
            return;
        }
        
        // 로그인 여부 확인
        if (!isLoggedIn()) {
            console.log('[MoonhwainSSO] 미로그인 상태 - SSO 로그인 후 예매 진행');
            alert('로그인이 필요합니다. SSO 로그인을 진행합니다.');
            
            // SSO 로그인 후 예매 진행
            openMoonhwainLoginShare(
                window.location.href.split('?')[0] + '?action=booking&pIdx=' + pIdx
            );
            return;
        }
        
        // 로그인된 상태 - 직접 예매 팝업 실행
        const rsvUrl = 'https://cccf.moonhwain.net:451/rsvc/rsv_pm.html?' +
            'useAuthCode=0&b_id=' + bId + '&p_idx=' + pIdx;
        
        console.log('[MoonhwainSSO] 공연 예매 팝업 실행: ' + rsvUrl);
        window.open(rsvUrl, 'rsv', 
            'status=no, resizeable=no, scrollbars=yes, width=' + 
            SSO_CONFIG.popupWidth + ', height=' + SSO_CONFIG.popupHeight);
    };

    /**
     * 공연 패키지 예매 팝업 실행
     * 
     * @param {string} bId - 기관 ID (기본값: 'cccf')
     * @param {string} pIdx - 문화인 공연 PK
     */
    window.wRsvPfmPack = function(bId, pIdx) {
        bId = bId || SSO_CONFIG.bId;
        
        if (!pIdx) {
            alert('공연 정보가 없습니다.');
            console.warn('[MoonhwainSSO] wRsvPfmPack: pIdx 미지정');
            return;
        }
        
        if (!isLoggedIn()) {
            console.log('[MoonhwainSSO] 미로그인 상태 - SSO 로그인 후 패키지 예매 진행');
            alert('로그인이 필요합니다. SSO 로그인을 진행합니다.');
            openMoonhwainLoginShare(
                window.location.href.split('?')[0] + '?action=booking_pack&pIdx=' + pIdx
            );
            return;
        }
        
        const rsvUrl = 'https://cccf.moonhwain.net:451/rsvc/rsv_pmPack.html?' +
            'useAuthCode=0&b_id=' + bId + '&p_idx=' + pIdx;
        
        console.log('[MoonhwainSSO] 공연 패키지 예매 팝업 실행: ' + rsvUrl);
        window.open(rsvUrl, 'rsv',
            'status=no, resizeable=no, scrollbars=yes, width=' + 
            SSO_CONFIG.popupWidth + ', height=' + SSO_CONFIG.popupHeight);
    };

    /**
     * 예매 확인/마이페이지 팝업 실행
     */
    window.wMypage = function() {
        if (!isLoggedIn()) {
            alert('로그인이 필요합니다. SSO 로그인을 진행합니다.');
            openMoonhwainLoginShare();
            return;
        }
        
        const mypageUrl = 'https://cccf.moonhwain.net:451/rsvc/mypage.html?useAuthCode=0';
        
        console.log('[MoonhwainSSO] 예매 확인(마이페이지) 팝업 실행');
        window.open(mypageUrl, 'mypage',
            'status=no, resizeable=no, scrollbars=yes, width=' + 
            SSO_CONFIG.popupWidth + ', height=' + SSO_CONFIG.popupHeight);
    };

    /**
     * 유료 회원 가입 팝업 실행
     */
    window.wPaid = function() {
        if (!isLoggedIn()) {
            alert('로그인이 필요합니다. SSO 로그인을 진행합니다.');
            openMoonhwainLoginShare();
            return;
        }
        
        const paidUrl = 'https://cccf.moonhwain.net:451/rsvc/paid.html?useAuthCode=0';
        
        console.log('[MoonhwainSSO] 유료 회원 가입 팝업 실행');
        window.open(paidUrl, 'paid',
            'status=no, resizeable=no, scrollbars=yes, width=' + 
            SSO_CONFIG.popupWidth + ', height=' + SSO_CONFIG.popupHeight);
    };

    // ================================================================
    // 테스트 함수
    // ================================================================

    /**
     * SSO 통합 테스트
     * 테스트 페이지에서 사용
     */
    window.runSSOTest = function() {
        console.log('========================================');
        console.log('[MoonhwainSSO Test] 통합 테스트 시작');
        console.log('========================================');
        
        const testResults = [];
        
        // Test 1: 로그인 여부 확인
        try {
            const loggedIn = isLoggedIn();
            testResults.push({
                test: 'Test 1: isLoggedIn()',
                result: loggedIn ? 'PASS' : 'NOT_LOGGED_IN',
                status: 'PASS',
                message: '로그인 상태: ' + (loggedIn ? '로그인됨' : '비로그인')
            });
            console.log('[Test 1] ✅ isLoggedIn():', loggedIn);
        } catch (error) {
            testResults.push({
                test: 'Test 1: isLoggedIn()',
                result: 'FAIL',
                status: 'FAIL',
                message: error.message
            });
            console.error('[Test 1] ❌ 오류:', error);
        }
        
        // Test 2: 세션 정보 조회
        try {
            const sessionInfo = getSessionInfo();
            testResults.push({
                test: 'Test 2: getSessionInfo()',
                result: JSON.stringify(sessionInfo),
                status: 'PASS',
                message: '세션 정보: ' + JSON.stringify(sessionInfo)
            });
            console.log('[Test 2] ✅ getSessionInfo():', sessionInfo);
        } catch (error) {
            testResults.push({
                test: 'Test 2: getSessionInfo()',
                result: 'FAIL',
                status: 'FAIL',
                message: error.message
            });
            console.error('[Test 2] ❌ 오류:', error);
        }
        
        // Test 3: 설정 확인
        try {
            testResults.push({
                test: 'Test 3: SSO_CONFIG',
                result: 'PASS',
                status: 'PASS',
                config: SSO_CONFIG
            });
            console.log('[Test 3] ✅ SSO_CONFIG:', SSO_CONFIG);
        } catch (error) {
            testResults.push({
                test: 'Test 3: SSO_CONFIG',
                result: 'FAIL',
                status: 'FAIL',
                message: error.message
            });
        }
        
        // Test 4: Cookie 읽기
        try {
            const testCookie = getCookie('LoginVO');
            testResults.push({
                test: 'Test 4: getCookie()',
                result: testCookie ? 'FOUND' : 'NOT_FOUND',
                status: 'PASS',
                message: 'LoginVO 쿠키: ' + (testCookie ? testCookie : 'NOT_FOUND')
            });
            console.log('[Test 4] ✅ getCookie("LoginVO"):', testCookie);
        } catch (error) {
            testResults.push({
                test: 'Test 4: getCookie()',
                result: 'FAIL',
                status: 'FAIL',
                message: error.message
            });
            console.error('[Test 4] ❌ 오류:', error);
        }
        
        // Test 5: 디버그 정보
        try {
            debugMoonhwainSSO();
            testResults.push({
                test: 'Test 5: debugMoonhwainSSO()',
                result: 'PASS',
                status: 'PASS',
                message: '디버그 정보 출력 완료'
            });
            console.log('[Test 5] ✅ debugMoonhwainSSO() 완료');
        } catch (error) {
            testResults.push({
                test: 'Test 5: debugMoonhwainSSO()',
                result: 'FAIL',
                status: 'FAIL',
                message: error.message
            });
            console.error('[Test 5] ❌ 오류:', error);
        }
        
        // Test 6: 함수 존재 확인
        try {
            const functions = [
                'handleBookingClick',
                'isLoggedIn',
                'openMoonhwainLoginShare',
                'receiveMoonhwainLoginInfo',
                'wRsvPfm',
                'wRsvPfmPack',
                'wMypage',
                'wPaid'
            ];
            
            let allExists = true;
            const missing = [];
            
            functions.forEach(func => {
                if (typeof window[func] !== 'function') {
                    allExists = false;
                    missing.push(func);
                }
            });
            
            testResults.push({
                test: 'Test 6: 함수 존재 확인',
                result: allExists ? 'PASS' : 'MISSING: ' + missing.join(', '),
                status: allExists ? 'PASS' : 'FAIL',
                message: allExists ? '모든 함수 존재' : 'Missing: ' + missing.join(', ')
            });
            console.log('[Test 6] ' + (allExists ? '✅' : '❌') + ' 함수 확인:', allExists);
        } catch (error) {
            testResults.push({
                test: 'Test 6: 함수 존재 확인',
                result: 'FAIL',
                status: 'FAIL',
                message: error.message
            });
        }
        
        // 테스트 결과 요약
        console.log('========================================');
        console.log('[MoonhwainSSO Test] 테스트 결과 요약');
        console.log('========================================');
        
        testResults.forEach((result, index) => {
            const statusIcon = result.status === 'PASS' ? '✅' : '❌';
            console.log(`${statusIcon} [${index + 1}] ${result.test}: ${result.result}`);
            if (result.message) {
                console.log(`    메시지: ${result.message}`);
            }
        });
        
        const passCount = testResults.filter(r => r.status === 'PASS').length;
        const totalCount = testResults.length;
        const percentage = Math.round((passCount / totalCount) * 100);
        
        console.log('========================================');
        console.log(`[MoonhwainSSO Test] 성공률: ${passCount}/${totalCount} (${percentage}%)`);
        console.log('========================================');
        
        return {
            totalTests: totalCount,
            passed: passCount,
            failed: totalCount - passCount,
            percentage: percentage,
            results: testResults
        };
    };

    /**
     * 예매 함수 테스트
     * 
     * @param {string} testType - 'booking', 'booking_pack', 'mypage', 'paid'
     * @param {string} pIdx - 공연 PK (booking, booking_pack 시 필수)
     */
    window.testBookingFunction = function(testType, pIdx) {
        console.log('[MoonhwainSSO] 예매 함수 테스트 시작:', testType);
        
        switch (testType) {
            case 'booking':
                console.log('[Test] wRsvPfm() 실행:', pIdx);
                wRsvPfm(SSO_CONFIG.bId, pIdx);
                break;
            case 'booking_pack':
                console.log('[Test] wRsvPfmPack() 실행:', pIdx);
                wRsvPfmPack(SSO_CONFIG.bId, pIdx);
                break;
            case 'mypage':
                console.log('[Test] wMypage() 실행');
                wMypage();
                break;
            case 'paid':
                console.log('[Test] wPaid() 실행');
                wPaid();
                break;
            default:
                console.error('[Test] 알 수 없는 테스트 타입:', testType);
                alert('알 수 없는 테스트 타입입니다: ' + testType);
        }
    };

    /**
     * SSO 로그인 테스트
     * q_homepy 샘플 데이터로 로그인 테스트
     */
    window.testSSOLogin = function(sampleQHomepy) {
        console.log('[MoonhwainSSO Test] SSO 로그인 테스트');
        
        if (!sampleQHomepy) {
            console.error('[Test] q_homepy 샘플 데이터 필요');
            alert('q_homepy 샘플 데이터가 필요합니다.\n(문화인 테스트 계정으로 로그인 후 획득)');
            return;
        }
        
        console.log('[Test] q_homepy:', sampleQHomepy.substring(0, 50) + '...');
        
        // 서버로 전송
        const formData = new FormData();
        formData.append('q_homepy', sampleQHomepy);
        
        fetch(SSO_CONFIG.callbackUrl, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            console.log('[Test] 응답 상태:', response.status);
            return response.json();
        })
        .then(data => {
            console.log('[Test] 응답 데이터:', data);
            alert('[테스트 결과]\n' + JSON.stringify(data, null, 2));
            
            if (data.result === 'SUCCESS') {
                console.log('[Test] ✅ SSO 로그인 성공:', data.memberId);
            } else {
                console.error('[Test] ❌ SSO 로그인 실패:', data.message);
            }
        })
        .catch(error => {
            console.error('[Test] ❌ 요청 오류:', error);
            alert('[테스트 오류]\n' + error.message);
        });
    };

    // ================================================================
    // 초기화
    // ================================================================

    // 페이지 로드 시 로그인 상태 확인
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initMoonhwainSSO();
        });
    } else {
        initMoonhwainSSO();
    }

    /**
     * SSO 모듈 초기화
     */
    function initMoonhwainSSO() {
        console.log('[MoonhwainSSO] 모듈 초기화');
        console.log('[MoonhwainSSO] 로그인 상태:', isLoggedIn() ? '로그인됨' : '비로그인');
        
        // URL 파라미터에서 goUrl 추출
        extractGoUrlFromParams();
        
        // URL 파라미터에서 q_homepy 추출 (콜백 URL인 경우)
        handleQHomepyFromUrl();
    }

})();

