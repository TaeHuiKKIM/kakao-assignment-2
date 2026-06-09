# 아키텍처 및 상태 흐름도 (Architecture)

## 1. 디렉토리 구조 설계
UI 컴포넌트, 비즈니스 로직(Hooks), 유틸리티 함수(Utils)를 엄격하게 분리하여 책임을 나누었습니다.

```text
src/
├── components/          # 시각적 렌더링을 담당하는 Presentational Components
│   ├── TodoInput.jsx
│   ├── TodoFilter.jsx
│   ├── TodoList.jsx
│   ├── TodoItem.jsx
│   └── WeeklyCalendar.jsx
├── hooks/               # 상태와 비즈니스 로직을 담당하는 Custom Hooks
│   └── useTodos.js
├── utils/               # 날짜 포맷팅 등 순수 함수 모음
│   └── date.js
└── App.jsx              # 각 컴포넌트를 조립하는 최상위 컨테이너
```

## 2. 상태 (State) 관리 흐름

본 프로젝트는 Context API 등 외부 상태관리 라이브러리 없이, 최상위 컴포넌트(`App.jsx`)에서 단방향 하향식(Top-Down) 데이터 흐름을 갖도록 설계했습니다.

### 주요 State
1. `todos` (Array): 모든 Todo 객체를 담고 있는 원본 배열.
2. `selectedDate` (Date): 사용자가 캘린더에서 클릭하여 선택한 기준 날짜.
3. `currentFilter` (String): 현재 활성화된 상태 필터 탭 ('all', 'active', 'completed').

### 상태 파생 (Derived State)
- `filteredTodos`: 위 세 가지 상태를 종합(`useMemo` 사용)하여 실제 `TodoList`에 전달할 정제된 렌더링 전용 배열입니다.
  - 조건 1: `todo.date` === `selectedDate`
  - 조건 2: `currentFilter`에 따른 완료 여부 필터 적용

## 3. 리팩토링 포인트: `useTodos` 커스텀 훅
`App.jsx`가 UI 레이아웃에만 집중할 수 있도록, 상태 정의, 로컬스토리지 `useEffect` 연동 로직, CRUD 핸들러(`addTodo`, `deleteTodo` 등)를 하나의 커스텀 훅(`src/hooks/useTodos.js`)으로 캡슐화(Encapsulation)했습니다. 이를 통해 유지보수성과 테스트 용이성을 극대화했습니다.
