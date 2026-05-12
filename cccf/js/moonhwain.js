/**
 * 문화인 예매 시스템 연동 JavaScript
 * @author CCCF
 * @since 2026-02-27
 */

/**
 * 현재 브라우저 주소의 origin을 반환한다.
 * - JSP의 request server 정보처럼 현재 접속 호스트/포트를 그대로 사용하기 위함
 * - 예: http://localhost:9080, http://211.192.116.152:9300
 *
 * @returns {string} 현재 origin
 */
function getCurrentOrigin() {
    if (window.location.origin) {
        return window.location.origin;
    }

    return window.location.protocol + '//' + window.location.host;
}

/**
 * 현재 origin 기준으로 상대 경로를 절대 URL로 만든다.
 *
 * @param {string} path - 절대화할 경로
 * @returns {string} 절대 URL
 */
function getCurrentUrl(path) {
    return getCurrentOrigin() + path;
}

/**
 * 문화인 공연 예매 팝업 열기
 * @param {string} b_id - 기관 아이디
 * @param {string} p_idx - 공연 PK (문화인 공연 PK)
 * @param {string} ci - 홈피 코드
 */

// jsp 에서 현재 주소를 가져와서 쓰듯이 여기도 그렇게 해야함 c.f. http://localhost:9080, http://211.192.116.152:9300 등을 파싱할 수 있어야함


//공연예매 (b_id : 기관아이디, vwClsPidx=1 : 빠른예매)
function wRsvPfm(b_id,p_idx,ci){
    window.open("https://cccf.moonhwain.net:451/rsvc/rsv_pm.html?useAuthCode=0&rq_homepy=login&b_id="+b_id+"&p_idx="+p_idx+"&q_homepy="+ci,
        "rsv","status=no, resizeable=no, scrollbars=yes, width=1100, height=1280");
}

//공연패키지 (b_id : 기관아이디)
function wRsvPfmPack(b_id,p_idx,ci){
    window.open("https://cccf.moonhwain.net:451/rsvc/rsv_pmPack.html?useAuthCode=0&b_id="+b_id+"&p_idx="+p_idx+"&q_homepy="+ci,
        "rsv","status=no, resizeable=no, scrollbars=yes, width=1100, height=1280");
}

//예매확인
function wMypage(){
    window.open("https://cccf.moonhwain.net:451/rsvc/mypage.html?useAuthCode=0","mypage",
        "status=no,resizeable=no, scrollbars=yes, width=1100, height=1280");
}

//유료회원 가입창 띄우기
function wPaid(){
    window.open("https://cccf.moonhwain.net:451/rsvc/paid.html?useAuthCode=0",
        "paid", "status=no, resizeable=no, scrollbars=yes, width=1100, height=1280");
}

// 회원가입
function wOpenJoin(){
    const returnUrl = getCurrentUrl("/others/member/join");
    const url = "https://cccf.moonhwain.net:451/rsvc/agree.html?useAuthCode=0&b_id=cccf&target=opener&goUrl=" + returnUrl + "&close=1&rq_homepy=join";
    window.open(url, "homepy","status=no, resizeable=no, scrollbars=yes, width=1100, height=1280");
}

// 로그인
function wOpenLogin() {
    const returnUrl = getCurrentUrl("/others/member/login");
    const url = "https://cccf.moonhwain.net:451/rsvc/login.html?useAuthCode=0&b_id=cccf&target=opener&close=1&rq_homepy=login&goUrl=" + returnUrl;
    window.open(url, "homepy","status=no, resizeable=no, scrollbars=yes, width=1100, height=1280");
}

// 로그아웃
function wOpenLogout(){
    const returnUrl = getCurrentUrl("/cccf");
    const url = "http://cccf.moonhwain.net/inc/logout.html?useAuthCode=0&b_id=cccf&target=opener&close=1&rq_homepy=logout&goUrl=" + returnUrl;
    window.open(url,"logout", "status=no, resizeable=no, scrollbars=yes, width=1100, height=1280");
}

// 정보수정
function wOpenModify(){
    const returnUrl = getCurrentUrl("/others/member/update");
    const url = "http://cccf.moonhwain.net/inc/logout.html?useAuthCode=0&b_id=cccf&target=opener&goUrl=" + returnUrl + "&close=1&rq_homepy=modify";
    window.open(url,"homepy","status=no, resizeable=no, scrollbars=yes, width=1100, height=1280");
}

/**
 * 문화인 공연 상세 팝업 열기
 * @param {string} b_id - 기관 아이디
 * @param {string} p_idx - 공연 PK (문화인 공연 PK)
 */
function wDetailPfm(b_id, p_idx) {
    const url = 'https://cccf.moonhwain.net:451/rsvc/detail.html?useAuthCode=0&b_id=' + b_id + '&p_idx=' + p_idx;
    const wo = window.open(url, 'detail_popup','width=1100,height=1280,scrollbars=yes,status=no,resizable=no');
    wo.focus();
}

/**
 * 문화인 로그인 정보 공유 팝업 열기 (SSO 연동용)
 * @param {string} goUrl - 콜백 URL
 */
function openMoonhwainLoginShare(goUrl) {
    // goUrl이 없는 경우 현재 페이지 URL 사용
    if (!goUrl) {
        goUrl = window.location.origin + window.location.pathname + window.location.search;
    }
    // 문화인 시스템에서 로그인 후 리다이렉트되는 URL이 문화인 도메인일 경우, 현재 페이지 URL로 변경
    if (goUrl.indexOf('cccf.moonhwain.net') > -1) {
        goUrl = window.location.origin + window.location.pathname + window.location.search;
    }

    // 파라미터 인코딩 (? → ~, & → ^)
    const encodedGoUrl = goUrl.replace(/\?/g, '~').replace(/&/g, '^');

    // 팝업 URL 생성
    const url = 'https://cccf.moonhwain.net:451/rsvc/login.html'
        + '?useAuthCode=0'
        + '&b_id=cccf'
        + '&target=opener'
        + '&close=1'
        + '&rq_homepy=login';
        + '&goUrl=' + encodedGoUrl

    // 팝업 열기
    window.open(
        url,
        'moonhwain_login_share',
        'width=1100,height=1280,scrollbars=yes,status=no,resizable=no'
    );
}