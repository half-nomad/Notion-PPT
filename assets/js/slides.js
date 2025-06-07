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
