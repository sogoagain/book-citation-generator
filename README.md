# Book Citation Generator

도서 검색과 학술 인용 형식 생성을 위한 웹 애플리케이션입니다.

## Features

- 도서 검색 (카카오 API)
- APA, MLA 인용 형식 자동 생성
- 반응형 웹 디자인

## Tech Stack

- **Frontend**: React + Vite, Tailwind CSS
- **Backend**: Node.js, Serverless Framework (AWS Lambda)
- **API**: Kakao Book Search API

## Quick Start

### Prerequisites

- Node.js 20+
- 카카오 API 키

### Environment Setup

1. **Backend 환경변수**
   ```bash
   # backend/.env
   KAKAO_API_KEY=KakaoAK your_api_key
   FRONT_DOMAIN=http://localhost:3000
   ```

2. **Frontend 환경변수**
   ```bash
   # frontend/.env
   VITE_BOOK_API_URL=http://localhost:4000
   ```

### Development

```bash
# Backend
cd backend
npm install
npm start

# Frontend  
cd frontend
npm install
npm run dev
```

### Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Deployment

자동 배포는 `master` 브랜치에 push 시 GitHub Actions에서 실행됩니다.

수동 배포:
```bash
# Backend to AWS
cd backend
npm run deploy

# Frontend to S3
cd frontend
npm run build
aws s3 sync dist/ s3://${AWS_S3_BUCKET} --delete
```

## Project Structure

```
├── backend/          # Serverless API
│   ├── src/
│   │   ├── handler.js
│   │   ├── interfaces/
│   │   └── repository/
│   └── serverless.yml
└── frontend/         # React SPA
    ├── src/
    │   ├── components/
    │   ├── containers/
    │   └── utils/
    └── vite.config.js
```
