# 숏츠 브레이크 · 숏폼 절제 도우미

숏폼(쇼츠/릴스/틱톡) 시청 습관을 줄이고 싶은 사용자가 자신의 상황을 입력하면,
Gemini API가 이를 분석해 상황에 맞는 "숏폼 제한 기능"을 추천해주는 웹앱입니다.

검은색 배경에 붉은색 포인트를 사용한 화면 위에, 중앙의 AI 채팅창을 통해
사용자와 대화하듯 기능을 추천받을 수 있습니다.

## 폴더 구조

```
shorts-break/
├── index.html          # 프론트엔드 (AI 분석 + 게시판, 탭으로 전환되는 단일 페이지)
├── api/
│   ├── generate.js     # Gemini API를 호출하는 서버리스 함수
│   └── board.js        # 게시판 글을 Vercel KV에 저장/조회/삭제하는 서버리스 함수
├── package.json
├── vercel.json          # Vercel 함수 설정
├── .gitignore
├── LICENSE
└── README.md
```

## 동작 방식

### AI 분석
1. 사용자가 "AI 분석" 탭의 채팅창에 자신의 숏폼 시청 습관/고민을 입력합니다.
2. 프론트엔드가 `/api/generate` 로 `POST` 요청을 보냅니다.
3. `api/generate.js` 서버리스 함수가 Gemini API(`generateContent`)를 호출해
   입력 내용을 분석하고, 필요한 제한 기능 목록을 생성합니다.
4. 결과가 채팅창에 AI 응답 형태로 표시됩니다.

API 키는 프론트엔드나 코드에 절대 노출되지 않고, 서버리스 함수 안에서만
환경변수로 읽어 사용합니다.

### 게시판
"게시판" 탭에서 글을 작성/조회/삭제할 수 있습니다. 글은 브라우저가 아니라
**서버(Upstash Redis)에 저장**되어 모든 방문자에게 함께 보입니다.

- 글 작성: `POST /api/board`
- 글 목록 조회: `GET /api/board`
- 글 삭제: `DELETE /api/board?id=글아이디`

## 로컬에서 실행하기

Vercel CLI를 사용하면 서버리스 함수를 포함해 로컬에서 그대로 테스트할 수 있습니다.

```bash
npm install -g vercel
vercel dev
```

실행 후 안내되는 주소(기본 `http://localhost:3000`)로 접속하면 됩니다.
로컬 실행 전, 아래 "환경변수 설정" 단계를 먼저 진행해주세요.

## Vercel에 배포하기

### 1. Gemini API 키 발급

[Google AI Studio](https://aistudio.google.com/app/apikey) 에서 API 키를 발급받습니다.

### 2. GitHub 저장소에 업로드

압축을 해제한 프로젝트 폴더를 새 GitHub 저장소에 올립니다.

```bash
git init
git add .
git commit -m "Initial commit: 숏츠 브레이크"
git branch -M main
git remote add origin <내-저장소-주소>
git push -u origin main
```

### 3. Vercel에서 Import

1. [vercel.com](https://vercel.com) 에 로그인 후 **Add New → Project** 선택
2. 방금 올린 GitHub 저장소를 선택해 Import
3. Framework Preset은 **Other**로 두면 됩니다 (별도 빌드 과정 없음)

### 4. Gemini API 환경변수 설정

Vercel 프로젝트의 **Settings → Environment Variables** 에서 아래 값을 추가합니다.

| Key | Value | 비고 |
|---|---|---|
| `GEMINI_API_KEY` | 발급받은 Gemini API 키 | 필수 |
| `GEMINI_MODEL` | 예: `gemini-2.0-flash` | 선택, 미설정 시 기본값 사용 |

### 5. 게시판용 Upstash Redis(데이터베이스) 연결 — 필수

게시판이 작동하려면 서버에 데이터를 저장할 저장소가 하나 필요합니다.
Vercel Marketplace를 통해 Upstash의 Redis 데이터베이스를 프로젝트에 연결해주세요.
(예전에는 "Vercel KV"라는 자체 상품이 있었지만 지금은 없어졌고, Upstash로 대체됐습니다.
무료 한도 안에서 사용하면 별도 비용이 들지 않습니다.)

1. Vercel 대시보드 → 해당 프로젝트 → 상단 **Storage** 탭 클릭
2. **Browse Storage(또는 Create Database)** 화면에서 "Marketplace Database Providers" 목록 중
   **Upstash** (Serverless DB: Redis, Vector, Queue, Search) 선택
3. 안내에 따라 Upstash 계정을 연결(또는 Vercel이 대신 관리하도록 선택)하고, **Redis** 데이터베이스를 하나 생성
4. 생성한 Redis 데이터베이스 화면에서 **Connect to Project(또는 Settings → Connect)** 로
   이 프로젝트를 선택해 연결
5. 연결하면 `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` 환경변수가
   **자동으로** 프로젝트에 추가됩니다. (직접 값을 복사해 넣을 필요 없음)

### 6. 재배포

4~5번 환경변수 설정 후 **Deploy**(또는 Redeploy)를 실행하면 배포가 완료됩니다.
환경변수를 나중에 바꾼 경우에도 반드시 Redeploy를 눌러야 적용됩니다.

### 7. 로컬 개발 시 환경변수 (선택)

로컬에서 `vercel dev`로 테스트하려면, 프로젝트 폴더에서 아래 명령으로
Vercel에 이미 설정된 환경변수(GEMINI_API_KEY, KV 관련 값 등)를 그대로
받아올 수 있습니다.

```bash
vercel link
vercel env pull .env.local
```

이 `.env.local` 파일은 `.gitignore`에 포함되어 있어 커밋되지 않습니다.

## 기술 스택

- 프론트엔드: 순수 HTML / CSS / JavaScript (프레임워크 없음)
- 백엔드: Vercel Serverless Function (Node.js)
- AI: Google Gemini API (`generateContent`)
- 게시판 저장소: Upstash Redis (Vercel Marketplace)

## 라이선스

MIT License. 자세한 내용은 [LICENSE](./LICENSE) 파일을 참고하세요.
