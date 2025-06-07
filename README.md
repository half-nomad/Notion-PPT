# 노션 강의 슬라이드 웹사이트

> "노션: 지식을 실행하는 캔버스" 강의 슬라이드를 웹에서 볼 수 있는 사이트입니다.

## 🎯 프로젝트 소개

하프노마드의 노션 활용 강의 슬라이드 32개를 웹브라우저에서 편리하게 볼 수 있도록 구현한 프로젝트입니다.

### 주요 기능
- **간단한 네비게이션**: `<` `>` 버튼으로 슬라이드 이동
- **반응형 디자인**: 16:9 비율 기반 모바일/데스크톱 대응
- **챕터별 구성**: INTRO → Chapter 1-3 → OUTRO
- **깔끔한 UI**: 블랙/화이트 배경 + 퍼플 포인트 컬러

## 📚 강의 구성

### INTRO (슬라이드 1-4)
- 자기소개 및 여정 소개
- 공통 고민과 전환점

### Chapter 1: 노션을 왜 쓰는가 (슬라이드 5-8)
- 일반적 사용법의 문제점
- 정체성 정의의 중요성

### Chapter 2: 저는 노션을 이렇게 씁니다 (슬라이드 9-23)
- 실무 활용 사례들
- 워크플로우 시연
- 라이브 데모

### Chapter 3: IDEA 프레임워크 (슬라이드 24-30)
- Initiative, Diary, Explore, Amplify
- 체계적 지식 관리 시스템

### OUTRO (슬라이드 31-32)
- 핵심 메시지
- 마무리

## 🚀 사용 방법

### 로컬에서 실행
```bash
# 저장소 클론
git clone https://github.com/your-username/notion-slides.git
cd notion-slides

# 로컬 서버 실행 (Python 사용 시)
python -m http.server 8000

# 또는 Live Server 확장 사용 (VS Code)
# index.html 우클릭 → Open with Live Server
```

### 온라인에서 보기
**GitHub Pages**: [https://your-username.github.io/notion-slides](https://your-username.github.io/notion-slides)

## 🎨 디자인 시스템
- **컬러 팔레트**: 
  - Primary Purple: #673AB7
  - Secondary Purple: #9C27B0
  - Accent Purple: #B388FF
- **폰트**: Pretendard (웹폰트)
- **레이아웃**: CSS Grid/Flexbox 기반 반응형

## 📁 프로젝트 구조
```
Notion PPT/
├── index.html              # 메인 랜딩 페이지
├── slides.html             # 슬라이드 뷰어
├── assets/
│   ├── css/
│   │   ├── main.css       # 메인 페이지 스타일
│   │   └── slides.css     # 슬라이드 스타일
│   ├── js/
│   │   └── slides.js      # 슬라이드 네비게이션
│   └── images/            # 이미지 파일들
└── README.md              # 이 파일
```

## 🔧 기술 스택
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **디자인**: CSS Grid, Flexbox, CSS Custom Properties
- **배포**: GitHub Pages
- **버전관리**: Git

## 📱 반응형 지원
- **데스크톱**: 1920px 이상 (최적 환경)
- **태블릿**: 768px - 1919px
- **모바일**: 320px - 767px

## 🎯 핵심 철학
> "노션은 지식을 실행하는 캔버스입니다. 여러분의 아이디어와 업무를 그려나가세요."

### 강의 핵심 메시지
1. **도구가 아닌 문제 해결이 중심**
2. **IDEA 프레임워크로 체계적 관리**
3. **자동화를 통한 본질적 가치 집중**

## 👨‍💻 만든 사람
**하프노마드 이석호(이모카)**
- AI 활용 비즈니스 운영 최적화 제품 기획자
- 📧 contact@halfnomad.com
- 🌐 halfnomad.kr

## 📄 라이센스
MIT License - 자유롭게 사용하세요!

## 🤝 기여하기
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---
**생성일**: 2025-06-07  
**업데이트**: 2025-06-07  
**버전**: 1.0.0