![image](https://github.com/mj-song00/potenday/assets/104669297/909552fa-819d-4a48-8c9b-09fd7f6e6c9f)

## 개발기간
2024.01.26 ~

## Architecture
- 백엔드 웹 어플리케이션 서버는 Node.js와 Nest.js로 설계
- Nginx에 SSL인증을 도입하여 보안강화 및 리버스 프록시 설정을 통해 백엔드 서버에 직접적인 접근을 차단
- github Action CI-CD를 통해 자동화 배포
- 데이터베이스는 데이터의 무결성을 보장하기 위해 RDS의 MySQL과 TypeORM 사용
- 이미지 데이터는 Multer 미들웨어를 통해 Multipart/form-data로 받아오고 NCP Cloud Stroge 버킷에 저장, 수정할 수 있도록 구현

## ERD
<img width="1075" alt="스크린샷 2024-02-17 오후 2 05 46" src="https://github.com/mj-song00/potenday/assets/104669297/b7cd9777-1475-4172-a4df-b6c73f6d1847">

## 주요기능
1. 로그인 / 회원가입
- 카카오 소셜 로그인
2. 그림일기
  - PapagoTranslation API를 통한 영어번역
  - 번역된 문장을 Kalro AI에 그림 그리기 요청
  - 마음에 든 그림을 선택하여 저장/수정/삭제
  - 피드에는 최근에 작성된 일기를 볼 수 있음
  - 마음에 드는 다이어리에 '좋아요'와 읽고난 후 감정을 표현할 수 있음

## 추후 개발 예정 
- 실시간 알림 (ex. 좋아요)
- 프로필 사진 변경
- 신고 기능
- 그림일기 사생대회

## 기술 스택
<img src="https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white"> <img src="https://img.shields.io/badge/nodejs-339933?style=for-the-badge&logo=nodejs&logoColor=white"> <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescripts&logoColor=white">
<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> <br>
TypeORM
