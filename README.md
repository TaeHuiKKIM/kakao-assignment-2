# React Todo App (Assignment 2)

이 프로젝트는 기존 Vanilla JS로 작성된 Todo 앱을 React(Vite) 기반으로 마이그레이션한 결과물입니다.

## 🛠 기술 스택
- **프레임워크**: React v18+ (Vite)
- **스타일링**: Tailwind CSS v4
- **상태 관리**: React Hooks (`useState`, `useEffect`)
- **데이터 저장**: Web Storage API (`localStorage`)

## 🚀 주요 기능
1. **Todo CRUD**: 할 일의 추가, 읽기, 수정(인라인), 삭제 기능
2. **상태별 필터링**: 전체 / 진행 중 / 완료 상태 탭 기능
3. **주간 달력 및 일간 뷰**: 주간 달력을 통해 날짜를 이동하고, 선택한 날짜에 맞는 Todo 목록만 렌더링
4. **데이터 영속성**: `localStorage`와 `useEffect`를 결합하여 데이터의 자동 저장 및 복원

## 📁 프로젝트 구조 (src 내부)
```text
src/
├── components/
│   ├── TodoInput.jsx       # 할 일 입력 컴포넌트
│   ├── TodoFilter.jsx      # 상태 필터 탭 컴포넌트
│   ├── TodoList.jsx        # 투두 목록 렌더링 컴포넌트
│   ├── TodoItem.jsx        # 개별 투두 및 인라인 수정 컴포넌트
│   └── WeeklyCalendar.jsx  # 주간 뷰 달력 컴포넌트
├── utils/
│   └── date.js             # 날짜 관련 유틸 함수 모음
├── App.jsx                 # 메인 화면 및 통합 상태 관리
├── index.css               # Tailwind CSS 및 커스텀 스타일
└── main.jsx                # React 앱 진입점
```

## ⚙️ 실행 방법
1. 의존성 패키지를 설치합니다.
```bash
npm install
```
2. 개발 서버를 실행합니다.
```bash
npm run dev
```
3. 브라우저에서 `http://localhost:5173`으로 접속하여 확인합니다.
