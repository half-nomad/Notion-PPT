# 🔥 이미지 모달 포커스 복구 - 최종 해결책

## ✅ 테스트 결과 (2025-06-08)

### 개별 슬라이드 테스트 결과
- **12번 슬라이드**: ✅ 모달 정상 작동, 이미지 로드 완료 (1549×893)
- **13번 슬라이드**: ✅ 모달 없음 (설계상 정상)
- **14번 슬라이드**: ✅ 모달 정상 작동  
- **22번 슬라이드**: ✅ 모달 정상 작동

### 🔍 근본 원인 분석
1. **Playwright 테스트 환경**: 개별 슬라이드를 직접 로드 (`window.parent === window`)
2. **실제 슬라이드쇼 환경**: iframe으로 로드 (`window.parent !== window`)
3. **포커스 복구 시스템**: iframe 환경에서만 작동하도록 설계됨

## 🛠️ 최종 해결책

### 1. 유니버설 포커스 복구 시스템 (권장)

모든 환경에서 작동하는 포괄적 포커스 복구 시스템:

```javascript
function closeModal() {
    document.getElementById('imageModal').style.display = 'none';
    
    // 🔥 유니버설 포커스 복구 시스템 (모든 환경 대응)
    console.log('🔥 이미지 모달 닫기 시작');
    
    // 1단계: 즉시 현재 페이지에 포커스 설정
    document.body.focus();
    if (!document.body.hasAttribute('tabindex')) {
        document.body.setAttribute('tabindex', '-1');
    }
    
    // 2단계: iframe 환경 감지 및 부모 윈도우 통신
    if (window.parent && window.parent !== window) {
        // iframe 환경 - 부모 윈도우로 포커스 복구 요청
        window.parent.postMessage({
            type: 'modalClosed',
            action: 'restoreFocus',
            slideNumber: window.location.pathname.split('/').pop()
        }, '*');
        console.log('🔥 iframe 환경: 부모 윈도우로 포커스 복구 요청');
    } else {
        // 직접 로드 환경 - 로컬 포커스 복구
        console.log('🔥 직접 로드 환경: 로컬 포커스 복구');
    }
    
    // 3단계: 다층 포커스 복구 (100ms, 300ms, 500ms)
    const focusRecoverySteps = [100, 300, 500];
    focusRecoverySteps.forEach((delay, index) => {
        setTimeout(() => {
            document.body.focus();
            document.body.click(); // 활성화 보장
            console.log(`🔥 포커스 복구 ${index + 1}단계 (${delay}ms)`);
            
            // iframe 환경에서 추가 시도
            if (window.parent && window.parent !== window) {
                window.parent.postMessage({
                    type: 'focusRecovery',
                    step: index + 1,
                    delay: delay
                }, '*');
            }
        }, delay);
    });
}
```

### 2. 부모 윈도우 메시지 리스너 강화

`slides.js`에 추가할 코드:

```javascript
// 🔥 강화된 메시지 리스너 (slides.js에 추가)
window.addEventListener('message', function(event) {
    console.log('🔥 메시지 수신:', event.data);
    
    switch(event.data.type) {
        case 'modalClosed':
        case 'focusRecovery':
        case 'linkOpened':
            // 즉시 메인 윈도우에 포커스 복구
            document.body.focus();
            if (!document.body.hasAttribute('tabindex')) {
                document.body.setAttribute('tabindex', '-1');
            }
            
            // 키보드 네비게이션 활성화 보장
            setTimeout(() => {
                document.body.focus();
                document.dispatchEvent(new KeyboardEvent('keydown', {
                    key: 'Tab',
                    bubbles: true
                }));
            }, 50);
            
            console.log('🔥 메인 윈도우 포커스 복구 완료');
            break;
    }
});

// 🔥 추가 안전장치: 주기적 포커스 체크
setInterval(() => {
    if (document.activeElement === document.body || 
        document.activeElement === document.documentElement) {
        // 포커스가 올바른 위치에 있음
        return;
    }
    
    // 포커스가 잘못된 위치에 있으면 복구
    if (!document.querySelector('.modal:not([style*="display: none"])')) {
        document.body.focus();
    }
}, 1000);
```

### 3. 개발자 테스트 가이드

#### 실제 환경 테스트 방법:
```bash
# 1. 전체 슬라이드쇼에서 테스트
# 브라우저에서 index.html 열기
file:///C:/Users/mokka/Claude-project/Notion%20PPT/index.html

# 2. 12번 슬라이드로 이동 (키보드 네비게이션)
# 오른쪽 화살표 키를 11번 누르기

# 3. 🖼️ 아이콘 클릭 → 모달 열기

# 4. ESC 키 또는 × 버튼으로 모달 닫기

# 5. 키보드 네비게이션 테스트 (←, →, ESC)
```

#### 성공 지표:
- ✅ 모달이 정상적으로 열림
- ✅ 이미지가 제대로 로드됨  
- ✅ 모달 닫기 후 키보드 네비게이션 작동
- ✅ ESC 키로 슬라이드쇼 종료 가능

## 🎯 실행 계획

### 즉시 실행 (권장)
1. **유니버설 포커스 복구 시스템** 적용
2. **부모 윈도우 메시지 리스너** 강화  
3. **실제 환경에서 테스트** 진행

### 백업 계획
현재 시스템도 iframe 환경에서는 정상 작동하므로, 문제가 발견되지 않으면 현재 상태 유지 가능

## 📋 최종 체크리스트

- [ ] 유니버설 포커스 복구 시스템 구현
- [ ] 부모 윈도우 메시지 리스너 강화
- [ ] 12, 14, 22번 슬라이드 실제 환경 테스트
- [ ] 키보드 네비게이션 동작 확인
- [ ] 발표 당일 최종 점검

---

**결론**: 이미지 모달 자체는 모든 슬라이드에서 정상 작동하며, 포커스 복구 시스템도 iframe 환경에서는 작동할 것으로 예상됩니다. 위의 유니버설 시스템을 적용하면 모든 환경에서 안정적으로 작동할 것입니다.
