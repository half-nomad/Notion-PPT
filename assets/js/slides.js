// 슬라이드 뷰어 네비게이션 로직
class SlideViewer {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 32;
        this.slides = [];
        this.init();
    }

    init() {
        // DOM 요소 참조
        this.slidesContainer = document.querySelector('.slides-container');
        this.prevBtn = document.querySelector('.nav-btn.prev');
        this.nextBtn = document.querySelector('.nav-btn.next');
        this.slideCounter = document.querySelector('.slide-counter');
        
        // 슬라이드 요소들 참조
        this.slides = document.querySelectorAll('.slide');
        
        // 이벤트 리스너 등록
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // 키보드 이벤트 (간단하게 추가)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
        
        // 초기 슬라이드 표시
        this.showSlide(0);
    }

    showSlide(index) {
        // 모든 슬라이드 숨기기
        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // 현재 슬라이드 표시
        if (this.slides[index]) {
            this.slides[index].classList.add('active');
        }
        
        this.currentSlide = index;
        this.updateCounter();
        this.updateNavButtons();
    }

    nextSlide() {
        if (this.currentSlide < this.totalSlides - 1) {
            this.showSlide(this.currentSlide + 1);
        }
    }

    prevSlide() {
        if (this.currentSlide > 0) {
            this.showSlide(this.currentSlide - 1);
        }
    }

    updateCounter() {
        if (this.slideCounter) {
            this.slideCounter.textContent = `${this.currentSlide + 1} / ${this.totalSlides}`;
        }
    }

    updateNavButtons() {
        // 첫 번째 슬라이드에서 이전 버튼 비활성화
        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentSlide === 0;
        }
        
        // 마지막 슬라이드에서 다음 버튼 비활성화
        if (this.nextBtn) {
            this.nextBtn.disabled = this.currentSlide === this.totalSlides - 1;
        }
    }

    // 특정 슬라이드로 이동 (인덱스 페이지에서 사용)
    goToSlide(index) {
        if (index >= 0 && index < this.totalSlides) {
            this.showSlide(index);
        }
    }
}

// DOM 로드 완료 후 초기화
document.addEventListener('DOMContentLoaded', () => {
    window.slideViewer = new SlideViewer();
});

// 🔥 강화된 메시지 리스너 - iframe에서 오는 포커스 복구 요청 처리
window.addEventListener('message', function(event) {
    console.log('🔥 메시지 수신:', event.data);
    
    // 메시지 타입에 따른 처리
    switch(event.data.type) {
        case 'modalClosed':
        case 'focusRecovery':
        case 'linkOpened':
            // 기본 포커스 복구
            performBasicFocusRecovery();
            break;
            
        case 'EMERGENCY_FOCUS_RECOVERY':
        case 'FINAL_EMERGENCY_FOCUS':
            // 🚨 긴급 포커스 복구
            performEmergencyFocusRecovery(event.data.slideNumber);
            break;
            
        case 'FOCUS_RECOVERY_STEP':
            // 단계별 포커스 복구
            performStepFocusRecovery(event.data.step, event.data.slideNumber);
            break;
    }
});

// 🚨 긴급 포커스 복구 함수
function performEmergencyFocusRecovery(slideNumber) {
    console.log(`🚨 긴급 포커스 복구 실행 - 슬라이드 ${slideNumber}`);
    
    // 1단계: 모든 가능한 포커스 타겟에 포커스 설정
    const focusTargets = [
        document.body,
        document.documentElement,
        document.querySelector('.slides-container'),
        document.querySelector('.slide.active'),
        document
    ];
    
    focusTargets.forEach(target => {
        if (target && target.focus) {
            try {
                target.focus();
                if (target.setAttribute && target !== document) {
                    target.setAttribute('tabindex', '-1');
                }
                if (target.click && target !== document) {
                    target.click();
                }
            } catch (e) {
                console.log('포커스 설정 실패:', e.message);
            }
        }
    });
    
    // 2단계: 강제 키보드 이벤트 시뮬레이션
    const simulateKeyEvents = () => {
        const keyEvents = [
            { key: 'Tab', keyCode: 9 },
            { key: 'Escape', keyCode: 27 },
            { key: 'ArrowRight', keyCode: 39 },
            { key: 'ArrowLeft', keyCode: 37 }
        ];
        
        keyEvents.forEach(({ key, keyCode }) => {
            ['keydown', 'keyup'].forEach(type => {
                const event = new KeyboardEvent(type, {
                    key: key,
                    keyCode: keyCode,
                    code: key,
                    bubbles: true,
                    cancelable: true
                });
                document.dispatchEvent(event);
            });
        });
    };
    
    // 3단계: 다층 시간차 복구
    const emergencyTimings = [10, 50, 100, 300, 500, 1000];
    emergencyTimings.forEach((delay, index) => {
        setTimeout(() => {
            document.body.focus();
            document.body.click();
            
            if (index % 2 === 0) {
                simulateKeyEvents();
            }
            
            console.log(`🚨 긴급 복구 ${index + 1}단계 (${delay}ms)`);
        }, delay);
    });
    
    // 4단계: 슬라이드 네비게이션 강제 활성화
    setTimeout(() => {
        if (window.slideViewer) {
            // 슬라이드 뷰어 포커스 복구
            const currentSlide = document.querySelector('.slide.active');
            if (currentSlide) {
                currentSlide.focus();
            }
        }
        
        console.log('🚨 슬라이드 네비게이션 강제 활성화 완료');
    }, 1500);
}

// 기본 포커스 복구 함수
function performBasicFocusRecovery() {
    document.body.focus();
    if (!document.body.hasAttribute('tabindex')) {
        document.body.setAttribute('tabindex', '-1');
    }
    
    // 키보드 네비게이션 활성화 보장
    setTimeout(() => {
        document.body.focus();
        // 가상의 Tab 키 이벤트로 포커스 활성화
        document.dispatchEvent(new KeyboardEvent('keydown', {
            key: 'Tab',
            code: 'Tab',
            bubbles: true
        }));
        
        // 다시 body로 포커스 복구
        setTimeout(() => {
            document.body.focus();
        }, 50);
    }, 50);
    
    console.log('🔥 메인 윈도우 기본 포커스 복구 완료');
}

// 단계별 포커스 복구 함수
function performStepFocusRecovery(step, slideNumber) {
    document.body.focus();
    document.body.click();
    console.log(`🔥 단계별 포커스 복구 ${step}단계 - 슬라이드 ${slideNumber}`);
}

// 🔥 추가 안전장치: 주기적 포커스 체크 및 복구
setInterval(() => {
    // 포커스가 올바른 위치에 있는지 확인
    const activeElement = document.activeElement;
    
    if (activeElement === document.body || 
        activeElement === document.documentElement) {
        // 포커스가 올바른 위치에 있음
        return;
    }
    
    // 현재 열린 모달이 있는지 확인 (iframe 내부 모달 제외)
    const openModals = document.querySelectorAll('.modal:not([style*="display: none"])');
    
    if (openModals.length === 0) {
        // 모달이 열려있지 않으면 포커스 복구
        document.body.focus();
        console.log('🔥 주기적 포커스 체크: 포커스 복구 실행');
    }
}, 2000); // 2초마다 체크

// 🔥 키보드 네비게이션 강화
document.addEventListener('keydown', function(event) {
    // ESC 키 처리 강화
    if (event.key === 'Escape') {
        // 현재 활성 슬라이드의 iframe에서 모달이 열려있는지 확인
        const activeSlide = document.querySelector('.slide.active');
        if (activeSlide) {
            const iframe = activeSlide.querySelector('iframe');
            if (iframe) {
                // iframe 내부로 ESC 키 이벤트 전달
                iframe.contentWindow.postMessage({
                    type: 'keyEvent',
                    key: 'Escape'
                }, '*');
            }
        }
        
        // 메인 윈도우에서도 ESC 처리
        setTimeout(() => {
            document.body.focus();
        }, 100);
    }
    
    // 화살표 키 처리 강화
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        // 포커스가 올바른 위치에 있는지 확인
        if (document.activeElement !== document.body) {
            document.body.focus();
        }
    }
});

console.log('🔥 슬라이드 포커스 복구 시스템 초기화 완료');
