# 숏츠 브레이크 · 숏폼 절제 도우미

숏폼(쇼츠/릴스/틱톡) 시청 습관을 줄이고 싶은 사용자가 자신의 상황을 입력하면,
Gemini API가 이를 분석해 상황에 맞는 "숏폼 제한 기능"을 추천해주는 웹앱입니다.

검은색 배경에 붉은색 포인트를 사용한 화면 위에, 중앙의 AI 채팅창을 통해
사용자와 대화하듯 기능을 추천받을 수 있습니다.

## 폴더 구조

```
shorts-break/
├── index.html          # 프론트엔드 (UI 전체, 순수 HTML/CSS/JS)
├── api/
│   └── generate.js     # Gemini API를 호출하는 Vercel 서버리스 함수
├── package.json
├── vercel.json          # Vercel 함수 설정
├── .gitignore
├── LICENSE
└── README.md
```

## 동작 방식

1. 사용자가 화면 중앙 채팅창에 자신의 숏폼 시청 습관/고민을 입력합니다.
2. 프론트엔드가 `/api/generate` 로 `POST` 요청을 보냅니다.
3. `api/generate.js` 서버리스 함수가 Gemini API(`generateContent`)를 호출해
   입력 내용을 분석하고, 필요한 제한 기능 목록을 생성합니다.
4. 결과가 채팅창에 AI 응답 형태로 표시됩니다.

API 키는 프론트엔드나 코드에 절대 노출되지 않고, 서버리스 함수 안에서만
환경변수로 읽어 사용합니다.

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

### 4. 환경변수 설정

Vercel 프로젝트의 **Settings → Environment Variables** 에서 아래 값을 추가합니다.

| Key | Value | 비고 |
|---|---|---|
| `GEMINI_API_KEY` | 발급받은 Gemini API 키 | 필수 |
| `GEMINI_MODEL` | 예: `gemini-2.0-flash` | 선택, 미설정 시 기본값 사용 |

환경변수 저장 후 **Deploy**(또는 Redeploy)를 실행하면 배포가 완료됩니다.

### 5. 로컬 개발 시 환경변수 (선택)

로컬에서 `vercel dev`로 테스트하려면 프로젝트 루트에 `.env` 파일을 만들고
아래처럼 작성하세요. 이 파일은 `.gitignore`에 포함되어 있어 커밋되지 않습니다.

```
GEMINI_API_KEY=여기에_본인의_API_키
```

## 기술 스택

- 프론트엔드: 순수 HTML / CSS / JavaScript (프레임워크 없음)
- 백엔드: Vercel Serverless Function (Node.js)
- AI: Google Gemini API (`generateContent`)

## 라이선스

MIT License. 자세한 내용은 [LICENSE](./LICENSE) 파일을 참고하세요.
