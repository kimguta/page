/**
 * 문화인 예매 시스템 연동 JavaScript
 * @author CCCF
 * @since 2026-02-27
 */

/**
 * 문화인 공연 예매 팝업 열기
 * @param {string} b_id - 기관 아이디
 * @param {string} p_idx - 공연 PK (문화인 공연 PK)
 */
//공연예매 (b_id : 기관아이디, vwClsPidx=1 : 빠른예매)
function wRsvPfm(b_id,p_idx)
{
    window.open("https://cccf.moonhwain.net:451/rsvc/rsv_pm.html?useAuthCode=0&b_id="+b_id+"&p_idx="+p_idx,"rsv","status=no, resizeable=no, scrollbars=yes, width=1100, height=1280");
}

//공연패키지 (b_id : 기관아이디)
function wRsvPfmPack(b_id,p_idx)
{
    window.open("https://cccf.moonhwain.net:451/rsvc/rsv_pmPack.html?useAuthCode=0&b_id="+b_id+"&p_idx="+p_idx,"rsv","status=no, resizeable=no, scrollbars=yes, width=1100, height=1280");
}

//예매확인
function wMypage()
{
    window.open("https://cccf.moonhwain.net:451/rsvc/mypage.html?useAuthCode=0","mypage","status=no,resizeable=no, scrollbars=yes, width=1100, height=1280");
}

//유료회원 가입창 띄우기
function wPaid()
{
    window.open("https://cccf.moonhwain.net:451/rsvc/paid.html?useAuthCode=0","paid", "status=no, resizeable=no, scrollbars=yes, width=1100, height=1280");
}

// 회원가입 링크
function fnJoinMember() {
    const wo = window.open("https://cccf.moonhwain.net:451/rsvc/agree.html", "JOIN_MEMBER", "status=no, resizeable=no, scrollbars=yes, width=1100, height=1280");
    wo.focus();
}

// 로그인
function fnLogin() {
    const returnUrl = "https://internow.cafe24.com/111.html~a=b^c=d";
    const url = "https://cccf.moonhwain.net:451/rsvc/login.html?useAuthCode=0&b_id=cccf&target=opener&goUrl=" + returnUrl + "&close=1&rq_homepy=Y";
    const wo = window.open(url, "JOIN_MEMBER", "status=no, resizeable=no, scrollbars=yes, width=1100, height=1280");
    wo.focus();
}

/**
 * 문화인 공연 상세 팝업 열기
 * @param {string} b_id - 기관 아이디
 * @param {string} p_idx - 공연 PK (문화인 공연 PK)
 */
function wDetailPfm(b_id, p_idx) {
    const url = 'https://cccf.moonhwain.net:451/rsvc/detail.html?useAuthCode=0&b_id=' + b_id + '&p_idx=' + p_idx;
    const wo = window.open(url, 'detail_popup', 'width=1100,height=1280,scrollbars=yes,status=no,resizable=no');
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
        + '&goUrl=' + encodedGoUrl
        + '&close=1'
        + '&rq_homepy=Y';

    // 팝업 열기
    window.open(
        url,
        'moonhwain_login_share',
        'width=1100,height=1280,scrollbars=yes,status=no,resizable=no'
    );
}

/**
 * 문화인 시스템으로부터 로그인 정보 수신 (SSO 콜백)
 * @param {string} q_homepy - 암호화된 로그인 정보
 */
function receiveMoonhwainLoginInfo(q_homepy) {
    if (!q_homepy) {
        console.error('로그인 정보가 없습니다.');
        return;
    }

    // 서버로 전송하여 복호화 및 검증
    fetch('/moonhwain/sso/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'q_homepy=' + encodeURIComponent(q_homepy)
    })
    .then(response => response.json())
    .then(data => {
        if (data.result === 'SUCCESS') {
            alert('로그인 정보 연동이 완료되었습니다.');
            location.reload();
        } else {
            alert('로그인 정보 연동에 실패했습니다.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('오류가 발생했습니다.');
    });
}

