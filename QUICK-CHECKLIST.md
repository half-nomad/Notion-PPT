# 🔥 슬라이드 개발 체크리스트 (30초 체크)

## ✅ **새 슬라이드 만들기**
```bash
# 1. 템플릿 복사 (기존 파일 복사 금지!)
cp template-black.html 새번호.html
cp template-white.html 새번호.html
```

## ✅ **외부 링크 추가**
```html
<!-- ✅ 올바른 방법 -->
<a href="https://example.com" target="_blank" onclick="handleExternalLink()">링크</a>

<!-- ❌ 잘못된 방법 -->
<a href="https://example.com" target="_blank">링크</a>
```

## ✅ **이미지 모달 추가**
```javascript
// ✅ 올바른 방법
function closeModal() {
    closeModalWithFocus('imageModal');
}

// ❌ 잘못된 방법
function closeModal() {
    document.getElementById('imageModal').style.display = 'none';
}
```

## ✅ **완료 후 테스트**
1. 외부 링크 클릭 → ← → 키 작동 확인
2. 이미지 모달 열기/닫기 → ← → 키 작동 확인
3. ESC 키로 모달 닫기 → ← → 키 작동 확인

---
**🚨 이거만 지키면 문제 없음! 30초 체크로 끝!**
