# 🔥 포커스 복구 시스템 사용 가이드 v2.0

**작성일**: 2025-06-08  
**목적**: 새로운 슬라이드 제작 시 키보드 네비게이션 문제 방지

---

## 📋 **문제 해결**

### 발생했던 문제
- 외부 링크 클릭 후 키보드 네비게이션(← →) 작동 안 함  
- 이미지 모달 닫기 후 키보드 네비게이션 작동 안 함  
- 새로운 슬라이드 제작 시마다 같은 문제 반복 발생

### 해결책
**통합 포커스 복구 시스템** 구축 및 템플릿 자동 적용

---

## 🛠️ **시스템 구성**

### 1. 핵심 파일
- **`assets/js/focus-recovery.js`**: 통합 포커스 복구 시스템
- **`template-black.html`**: 블랙 테마 템플릿 (시스템 포함)
- **`template-white.html`**: 화이트 테마 템플릿 (시스템 포함)

### 2. 자동 적용 기능
- ESC 키로 모든 모달 자동 닫기 + 포커스 복구
- 외부 링크 클릭 후 자동 포커스 복구  
- 이미지 모달 닫기 후 자동 포커스 복구

---

## 📝 **새로운 슬라이드 제작 시**

### ✅ **올바른 방법**

#### 1. 템플릿 사용
```bash
# 새 슬라이드 제작 시 반드시 템플릿 복사
cp template-black.html 35.html
cp template-white.html 36.html
```

#### 2. 외부 링크 추가
```html
<!-- ✅ 올바른 방법 -->
<a href="https://example.com" target="_blank" onclick="handleExternalLink()">
    외부 링크
</a>

<!-- 또는 -->
<button onclick="openExternalLink('https://example.com')">
    새 창으로 열기
</button>
```

#### 3. 이미지 모달 추가
```html
<!-- HTML -->
<div id="imageModal" class="modal" onclick="closeModal()">
    <div class="modal-content" onclick="event.stopPropagation()">
        <span class="close" onclick="closeModal()">&times;</span>
        <img src="assets/images/example.png" alt="예제 이미지">
    </div>
</div>

<!-- JavaScript -->
<script>
function openModal() {
    document.getElementById('imageModal').style.display = 'block';
}

function closeModal() {
    closeModalWithFocus('imageModal'); // 🔥 포커스 복구 자동 처리
}
</script>
```

#### 4. 여러 모달 사용 시
```javascript
function closeModal(modalId) {
    closeModalWithFocus(modalId); // 🔥 각 모달별 포커스 복구
}
```

---

## ❌ **하지 말아야 할 것**

### 1. 템플릿 사용하지 않기
```html
<!-- ❌ 잘못된 방법 - 포커스 복구 시스템 없음 -->
<!DOCTYPE html>
<html>
<head>
    <script src="assets/js/focus-recovery.js"></script> <!-- 이것도 빠뜨리기 쉬움 -->
</head>
```

### 2. 포커스 복구 함수 사용하지 않기
```html
<!-- ❌ 잘못된 방법 -->
<a href="https://example.com" target="_blank">외부 링크</a>

<script>
function closeModal() {
    document.getElementById('imageModal').style.display = 'none';
    // 포커스 복구 코드 없음 - 키보드 네비게이션 안 됨!
}
</script>
```

### 3. 기존 파일을 템플릿으로 복사하기
```bash
# ❌ 잘못된 방법 - 기존 파일에는 포커스 복구 시스템이 없을 수 있음
cp 12.html 35.html  

# ✅ 올바른 방법 - 항상 최신 템플릿 사용
cp template-black.html 35.html
```

---

## 🧪 **테스트 방법**

### 필수 테스트 항목
새로운 슬라이드 제작 후 다음을 반드시 확인:

1. **외부 링크 테스트**
   - 링크 클릭 → 새 창 열림 → 원래 창으로 돌아오기 → ← → 키 작동 확인

2. **이미지 모달 테스트**
   - 이미지 클릭 → 모달 열림 → ESC나 X로 닫기 → ← → 키 작동 확인

3. **연속 테스트**
   - 링크 → 모달 → 링크 → 모달 순서로 여러 번 실행 → 키 작동 확인

### 테스트 스크립트
```javascript
// 브라우저 콘솔에서 실행
console.log('🧪 포커스 복구 시스템 테스트');
console.log('1. 외부 링크 클릭 후 ← → 키 테스트');
console.log('2. 이미지 모달 열기/닫기 후 ← → 키 테스트');
console.log('3. ESC 키로 모달 닫기 테스트');
```

---

## 🔧 **고급 사용법**

### 1. 커스텀 포커스 복구
```javascript
// 특별한 경우에만 사용
function customCloseModal() {
    document.getElementById('specialModal').style.display = 'none';
    
    // 추가 로직 실행 후
    sendFocusRecovery(); // 수동으로 포커스 복구 요청
}
```

### 2. 모든 모달 일괄 닫기
```javascript
// 여러 모달이 동시에 열려있을 때
function closeAllModals() {
    closeAllModalsWithFocus(); // 모든 모달 닫기 + 포커스 복구
}
```

### 3. 디버깅
```javascript
// 포커스 복구 작동 확인
console.log('포커스 복구 시스템 로드됨:', typeof sendFocusRecovery !== 'undefined');
```

---

## 📚 **참고 자료**

### 관련 파일
- `assets/js/focus-recovery.js` - 통합 시스템 코드
- `template-black.html` - 블랙 테마 템플릿  
- `template-white.html` - 화이트 테마 템플릿
- `slides.html` - 메인 뷰어 (포커스 복구 처리)

### 기존 수정된 파일 (참고용)
- `1.html`, `12.html`, `13.html`, `14.html`, `18.html`, `22.html`

---

## 🚨 **중요 알림**

### 꼭 기억하세요
1. **새 슬라이드 = 템플릿 복사** (기존 파일 복사 금지)
2. **외부 링크 = onclick="handleExternalLink()" 필수**  
3. **모달 닫기 = closeModalWithFocus() 사용**
4. **제작 후 = 키보드 네비게이션 테스트 필수**

### 문제 발생 시
1. 브라우저 콘솔에서 에러 메시지 확인
2. `focus-recovery.js` 로드 여부 확인  
3. 함수명 오타 확인
4. 이 가이드 재검토

---

**💡 이 시스템을 사용하면 앞으로 키보드 네비게이션 문제가 발생하지 않습니다!**
