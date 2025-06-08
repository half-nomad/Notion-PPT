#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
🚀 Batch Navigation System Injection Script
모든 슬라이드 파일에 네비게이션 시스템을 자동으로 추가합니다.
"""

import os
import re
from pathlib import Path

def add_navigation_to_slide(file_path):
    """개별 슬라이드 파일에 네비게이션 시스템을 추가합니다."""
    try:
        # 파일 읽기
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 이미 네비게이션이 추가되었는지 확인
        if 'assets/js/navigation.js' in content:
            print(f"Skip: {file_path.name} (navigation already exists)")
            return False
        
        # </body> 태그 앞에 네비게이션 스크립트 삽입
        navigation_script = """
    <!-- Navigation System -->
    <script src="assets/js/navigation.js"></script>
</body>"""
        
        # </body> 태그를 찾아서 대체
        if '</body>' in content:
            content = content.replace('</body>', navigation_script)
            
            # 파일 쓰기
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            
            print(f"Added navigation to: {file_path.name}")
            return True
        else:
            print(f"No </body> tag found in: {file_path.name}")
            return False
            
    except Exception as e:
        print(f"Error processing {file_path.name}: {str(e)}")
        return False

def main():
    """메인 실행 함수"""
    print("Starting Batch Navigation System Injection...")
    print("=" * 60)
    
    # 현재 디렉토리에서 HTML 파일들 찾기
    current_dir = Path(".")
    html_files = []
    
    # 1.html부터 32.html까지 확인
    for i in range(1, 33):
        file_path = current_dir / f"{i}.html"
        if file_path.exists():
            html_files.append(file_path)
    
    # index.html은 이미 처리했으므로 제외
    print(f"Found {len(html_files)} slide files to process")
    print()
    
    success_count = 0
    total_count = len(html_files)
    
    # 각 파일에 네비게이션 추가
    for file_path in html_files:
        if add_navigation_to_slide(file_path):
            success_count += 1
    
    print()
    print("=" * 60)
    print("Navigation Injection Complete!")
    print(f"Successfully processed: {success_count}/{total_count} files")
    print(f"Skipped (already exists): {total_count - success_count} files")
    print()
    print("Next Steps:")
    print("1. Open index.html in browser to test navigation")
    print("2. Use <- -> arrow keys or click navigation buttons")
    print("3. Test external links and focus recovery")
    print("4. Commit changes when satisfied")

if __name__ == "__main__":
    main()
