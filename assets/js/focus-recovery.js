/**
 * 통합 포커스 복구 시스템 (Focus Recovery System)
 * 모든 슬라이드에서 공통으로 사용
 * 
 * 사용법:
 * 1. HTML head에 <script src="assets/js/focus-recovery.js"></script> 추가
 * 2. 외부 링크: onclick="handleExternalLink()" 추가
 * 3. 이미지 모달: closeModal 함수에 sendFocusRecovery() 호출 추가
 */

// 🔥 부모 윈도우로 포커스 복구 요청 전송
function sendFocusRecovery() {
    setTimeout(() => {
        if (window.parent && window.parent !== window) {
            window.parent.postMessage({
                type: 'linkOpened',
                action: 'restoreFocus'
            }, window.location.origin);
            console.log('🔥 포커스 복구 요청 전송 완료');
        }
    }, 100);
}

// 🔥 외부 링크 클릭 처리 (target="_blank" 링크용)
function handleExternalLink() {
    console.log('🔥 외부 링크 클릭 - 포커스 복구 시스템 활성화');
    sendFocusRecovery();
}

// 🔥 새 창 열기 + 포커스 복구 (window.open 사용 시)
function openExternalLink(url) {
    console.log('🔥 새 창으로 외부 링크 열기:', url);
    window.open(url, '_blank');
    sendFocusRecovery();
}

// 🔥 모달 닫기 + 포커스 복구 (공통 함수)
function closeModalWithFocus(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        console.log('🔥 모달 닫기:', modalId);
        sendFocusRecovery();
    }
}

// 🔥 모든 모달 닫기 + 포커스 복구
function closeAllModalsWithFocus() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
    console.log('🔥 모든 모달 닫기');
    sendFocusRecovery();
}

// 🔥 ESC 키로 모달 닫기 (자동 설정)
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeAllModalsWithFocus();
        }
    });
    
    console.log('✅ 통합 포커스 복구 시스템 로드 완료');
});

// 🔥 예제 사용법 (주석)
/*
외부 링크 예제:
<a href="https://example.com" target="_blank" onclick="handleExternalLink()">링크</a>

window.open 예제:
<button onclick="openExternalLink('https://example.com')">링크 열기</button>

이미지 모달 예제:
function closeModal() {
    closeModalWithFocus('imageModal');
}

여러 모달 예제:
function closeModal(modalId) {
    closeModalWithFocus(modalId);
}
*/
