#!/usr/bin/env python3
"""
슬라이드 파일 자동 검증 시스템
포커스 복구 시스템이 제대로 적용되었는지 자동 체크

사용법: python check-slides.py
"""

import os
import re
import glob
from pathlib import Path

class SlideChecker:
    def __init__(self):
        self.errors = []
        self.warnings = []
        self.checked_files = []
        
    def check_file(self, filepath):
        """개별 파일 검증"""
        print(f"🔍 검사 중: {filepath}")
        
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
        except Exception as e:
            self.errors.append(f"❌ {filepath}: 파일 읽기 실패 - {e}")
            return
            
        # 1. focus-recovery.js 포함 여부 확인
        if 'focus-recovery.js' not in content:
            self.errors.append(f"❌ {filepath}: focus-recovery.js 포함되지 않음")
        
        # 2. 외부 링크에 handleExternalLink() 누락 확인
        external_links = re.findall(r'<a[^>]*target="_blank"[^>]*>', content)
        for link in external_links:
            if 'handleExternalLink()' not in link:
                self.warnings.append(f"⚠️ {filepath}: 외부 링크에 handleExternalLink() 누락")
        
        # 3. closeModal 함수에 closeModalWithFocus 사용 확인
        close_modal_functions = re.findall(r'function closeModal\s*\([^)]*\)\s*{[^}]*}', content, re.DOTALL)
        for func in close_modal_functions:
            if 'closeModalWithFocus' not in func:
                self.errors.append(f"❌ {filepath}: closeModal에서 closeModalWithFocus 사용하지 않음")
        
        # 4. 모달 HTML이 있는데 closeModal 함수가 없는 경우
        if 'class="modal"' in content and 'function closeModal' not in content:
            self.warnings.append(f"⚠️ {filepath}: 모달이 있지만 closeModal 함수가 없음")
            
        self.checked_files.append(filepath)
    
    def check_all_slides(self):
        """모든 슬라이드 파일 검증"""
        print("🔥 슬라이드 자동 검증 시작!\n")
        
        # HTML 파일들 찾기
        html_files = glob.glob("*.html")
        slide_files = [f for f in html_files if re.match(r'^\d+\.html$', f)]
        
        if not slide_files:
            print("❌ 검사할 슬라이드 파일이 없습니다.")
            return
            
        for filepath in sorted(slide_files):
            self.check_file(filepath)
        
        self.print_results()
    
    def print_results(self):
        """검증 결과 출력"""
        print(f"\n📊 검증 완료! ({len(self.checked_files)}개 파일 검사)")
        print("=" * 50)
        
        if not self.errors and not self.warnings:
            print("🎉 모든 검사 통과! 문제 없습니다!")
            return
        
        if self.errors:
            print("🚨 오류 (반드시 수정 필요):")
            for error in self.errors:
                print(f"  {error}")
            print()
        
        if self.warnings:
            print("⚠️ 경고 (확인 권장):")
            for warning in self.warnings:
                print(f"  {warning}")
            print()
        
        print("🔧 해결 방법:")
        print("  1. 템플릿을 다시 복사하세요: cp template-black.html 파일명.html")
        print("  2. 외부 링크에 onclick=\"handleExternalLink()\" 추가")
        print("  3. closeModal() 함수에서 closeModalWithFocus() 사용")
        print("  4. QUICK-CHECKLIST.md 참고")

def main():
    checker = SlideChecker()
    checker.check_all_slides()

if __name__ == "__main__":
    main()
