# HanjaDeck.ai

HanjaDeck.ai는 AI를 활용하여 효율적인 한자 학습을 돕는 웹 애플리케이션입니다. 사용자가 원하는 한자를 검색하면, Google Gemini AI 모델이 해당 한자에 대한 학습 카드를 동적으로 생성하여 제공합니다. 이를 통해 사용자 맞춤형 학습 경험을 만들고, 게이미피케이션 요소를 더해 학습의 재미를 더합니다.

## ✨ 주요 기능

- **🤖 AI 기반 한자 카드 생성**: 사용자가 검색한 키워드를 바탕으로 AI가 실시간으로 한자 학습 카드를 생성합니다.
- **📈 학습 진행 상황 추적**: 학습한 카드 수 등 전반적인 학습 진행 상황을 시각적으로 확인할 수 있습니다.
- **🔥 일일 학습 스트릭**: 매일 꾸준히 학습하면 연속 학습일(스트릭)이 기록되어 학습 동기를 부여합니다.
- **🔖 북마크**: 어려운 한자나 다시 보고 싶은 한자 카드를 북마크하여 언제든지 다시 학습할 수 있습니다.
- **🔐 사용자 인증**: JWT 기반의 안전한 사용자 인증 시스템을 통해 개인화된 학습 환경을 제공합니다.

## 🛠️ 기술 스택

- **Frontend**: Next.js, React, TypeScript
- **Backend**: Next.js API Routes, Prisma
- **Database**: PostgreSQL
- **AI**: Google Gemini
- **Styling**: Tailwind CSS
- **Linting/Formatting**: ESLint

## 📦 데이터베이스 모델

Prisma로 관리되는 주요 데이터베이스 모델은 다음과 같습니다.

- `User`: 사용자 정보 (이메일, 비밀번호, 학습 스트릭 등)
- `Card`: 한자 카드 정보 (한자, 뜻, 음, 예문 등)
- `Bookmark`: 사용자가 북마크한 카드 정보
- `UserCardInteraction`: 사용자와 카드 간의 상호작용 (정답, 오답 등)

## 🔌 API 엔드포인트

주요 API 엔드포인트는 다음과 같습니다.

- `POST /api/auth/signup`: 회원가입
- `POST /api/auth/login`: 로그인
- `GET /api/auth/me`: 현재 로그인된 사용자 정보 조회
- `POST /api/auth/logout`: 로그아out
- `GET /api/cards`: 한자 카드 목록 조회
- `POST /api/cards/generate`: AI를 통해 새로운 한자 카드 생성
- `POST /api/cards/:id/bookmark`: 특정 카드 북마크 추가/삭제
- `GET /api/users/me/interactions`: 사용자의 카드 인터랙션 기록 조회