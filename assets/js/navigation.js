// 🚀 Individual Slide Navigation System
// PPT 방식의 슬라이드 간 이동을 위한 네비게이션 시스템

class SlideNavigation {
    constructor() {
        this.currentSlide = this.getCurrentSlideNumber();
        this.totalSlides = 32;
        this.init();
    }

    // 현재 슬라이드 번호 파악
    getCurrentSlideNumber() {
        const url = window.location.pathname;
        const filename = url.split('/').pop();
        
        // 1.html, 2.html... 형식에서 숫자 추출
        if (filename === 'index.html') return 1;
        
        const match = filename.match(/(\d+)\.html/);
        return match ? parseInt(match[1]) : 1;
    }

    // 네비게이션 시스템 초기화
    init() {
        this.createNavigationButtons();
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        console.log(`🚀 Navigation initialized for slide ${this.currentSlide}/${this.totalSlides}`);
    }

    // 네비게이션 버튼 생성
    createNavigationButtons() {
        // 이전 버튼
        if (this.currentSlide > 1) {
            const prevButton = this.createNavButton('prev', '←', 'left');
            document.body.appendChild(prevButton);
        }

        // 다음 버튼
        if (this.currentSlide < this.totalSlides) {
            const nextButton = this.createNavButton('next', '→', 'right');
            document.body.appendChild(nextButton);
        }

        // 슬라이드 번호 표시
        const slideCounter = this.createSlideCounter();
        document.body.appendChild(slideCounter);
    }

    // 개별 네비게이션 버튼 생성
    createNavButton(type, symbol, position) {
        const button = document.createElement('button');
        button.className = `nav-button nav-${type}`;
        button.innerHTML = symbol;
        button.setAttribute('aria-label', `${type === 'prev' ? '이전' : '다음'} 슬라이드`);
        
        // 스타일 적용
        this.applyButtonStyle(button, position);
        
        // 클릭 이벤트
        button.addEventListener('click', () => {
            this.navigateSlide(type);
        });

        return button;
    }

    // 슬라이드 카운터 생성
    createSlideCounter() {
        const counter = document.createElement('div');
        counter.className = 'slide-counter';
        counter.innerHTML = `${this.currentSlide} / ${this.totalSlides}`;
        
        // 스타일 적용
        Object.assign(counter.style, {
            position: 'fixed',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '600',
            zIndex: '9999',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            fontFamily: 'Pretendard, sans-serif'
        });

        return counter;
    }

    // 버튼 스타일 적용
    applyButtonStyle(button, position) {
        const baseStyle = {
            position: 'fixed',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            border: 'none',
            background: 'rgba(103, 58, 183, 0.9)',
            color: 'white',
            fontSize: '24px',
            fontWeight: 'bold',
            cursor: 'pointer',
            zIndex: '9999',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 15px rgba(103, 58, 183, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Pretendard, sans-serif'
        };

        // 위치별 스타일
        if (position === 'left') {
            baseStyle.left = '30px';
        } else if (position === 'right') {
            baseStyle.right = '30px';
        }

        Object.assign(button.style, baseStyle);

        // 호버 효과
        button.addEventListener('mouseenter', () => {
            button.style.background = 'rgba(156, 39, 176, 0.9)';
            button.style.transform = 'translateY(-50%) scale(1.1)';
            button.style.boxShadow = '0 6px 20px rgba(156, 39, 176, 0.4)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.background = 'rgba(103, 58, 183, 0.9)';
            button.style.transform = 'translateY(-50%) scale(1)';
            button.style.boxShadow = '0 4px 15px rgba(103, 58, 183, 0.3)';
        });

        // 모바일 대응
        if (window.innerWidth <= 768) {
            button.style.width = '45px';
            button.style.height = '45px';
            button.style.fontSize = '18px';
            if (position === 'left') {
                button.style.left = '20px';
            } else if (position === 'right') {
                button.style.right = '20px';
            }
        }
    }

    // 슬라이드 이동
    navigateSlide(direction) {
        let targetSlide;
        
        if (direction === 'prev' && this.currentSlide > 1) {
            targetSlide = this.currentSlide - 1;
        } else if (direction === 'next' && this.currentSlide < this.totalSlides) {
            targetSlide = this.currentSlide + 1;
        }

        if (targetSlide) {
            const targetUrl = targetSlide === 1 ? 'index.html' : `${targetSlide}.html`;
            console.log(`🚀 Navigating to slide ${targetSlide}: ${targetUrl}`);
            window.location.href = targetUrl;
        }
    }

    // 키보드 네비게이션 설정
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // 포커스가 입력 요소에 있을 때는 네비게이션 비활성화
            if (this.isInputFocused()) return;
            
            switch (e.key) {
                case 'ArrowLeft':
                case 'ArrowUp':
                case 'PageUp':
                    e.preventDefault();
                    this.navigateSlide('prev');
                    break;
                    
                case 'ArrowRight':
                case 'ArrowDown':
                case 'PageDown':
                case ' ': // 스페이스바
                    e.preventDefault();
                    this.navigateSlide('next');
                    break;
                    
                case 'Home':
                    e.preventDefault();
                    if (this.currentSlide !== 1) {
                        window.location.href = 'index.html';
                    }
                    break;
                    
                case 'End':
                    e.preventDefault();
                    if (this.currentSlide !== this.totalSlides) {
                        window.location.href = `${this.totalSlides}.html`;
                    }
                    break;
            }
        });
    }

    // 입력 요소 포커스 확인
    isInputFocused() {
        const activeElement = document.activeElement;
        const inputTypes = ['input', 'textarea', 'select', 'button'];
        return inputTypes.includes(activeElement.tagName.toLowerCase()) ||
               activeElement.contentEditable === 'true';
    }

    // 포커스 관리 시스템
    setupFocusManagement() {
        // 외부 링크 클릭 후 포커스 복구
        document.addEventListener('click', (e) => {
            const target = e.target;
            
            // 외부 링크 클릭 감지
            if (target.tagName === 'A' && target.target === '_blank') {
                console.log('🔥 External link clicked - preparing focus recovery');
                
                // 포커스 복구를 위한 타이머 설정
                setTimeout(() => {
                    this.restoreFocus();
                }, 500);
            }
        });

        // 페이지 포커스 복구
        window.addEventListener('focus', () => {
            this.restoreFocus();
        });
    }

    // 포커스 복구
    restoreFocus() {
        // body에 포커스를 주어 키보드 네비게이션 활성화
        document.body.focus();
        console.log('🔥 Focus restored to body for keyboard navigation');
    }
}

// DOM 로드 완료 후 네비게이션 시스템 초기화
document.addEventListener('DOMContentLoaded', () => {
    // body에 tabindex 추가 (키보드 포커스 가능하게)
    document.body.setAttribute('tabindex', '-1');
    
    // 네비게이션 시스템 시작
    window.slideNavigation = new SlideNavigation();
});

// 전역 함수로 외부에서 접근 가능하게
window.navigateToSlide = function(slideNumber) {
    if (slideNumber >= 1 && slideNumber <= 32) {
        const targetUrl = slideNumber === 1 ? 'index.html' : `${slideNumber}.html`;
        window.location.href = targetUrl;
    }
};
