![image](https://github.com/mj-song00/potenday/assets/104669297/909552fa-819d-4a48-8c9b-09fd7f6e6c9f)

## 개발기간
2024.01.26 ~ 2024. 06

## 여름방학 <a href="https://drive.google.com/file/d/17UAvE-arVkpbm_UIOePQwC3Vvcc0n1ij/view?usp=sharing"> 기획 의도  </a>


## Architecture
![스크린샷 2024-02-18 오후 9 29 32](https://github.com/mj-song00/potenday/assets/104669297/54580b46-32be-496c-acb9-9c186d54af21)
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
  - 프로필 사진 변경
  - 일기 작성시 '나만 보기' 가능
  - 회원탈퇴

## 트러블 슈팅
**`문제점`**

1. 메인 페이지는 서비스를 이용하는 모든 유저들이 방문하기 때문에 API 사용량이 매우 많다.
2. DB에서 모든 게시글의 좋아요와 공감받은 감정의 갯수를 조회하고 정렬하는 로직을 매번 실행한다.
3. 느린 로딩 속도로 유저가 느끼는 불편함을 개선하고 운영 측면에서도 서버 비용을 감축할 필요가 있다.

**`해결방안`**
1. 해당 API service에서 중복된 코드를 찾아 수정하였다.

**`결과`**
<div>
  
  ![스크린샷 2024-04-20 오후 6 10 26](https://github.com/mj-song00/potenday/assets/104669297/b6a69331-adff-4c08-a4d7-b2764ca509d2)
  <img width="572" alt="스크린샷 2024-04-21 오후 5 45 52" src="https://github.com/mj-song00/potenday/assets/104669297/bbcec81f-56c1-44d5-a0e7-17d20fdd9988">

</div>
Artillery quick test로 100명이 50번을 동시에 get 요청했을때의 테스트 결과 http.response_time.max값이 242에서 185로 약 23.5% 감소된것을 확인할 수 있었다.

## 기술 스택
<img src="https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white"> <img src="https://img.shields.io/badge/nodejs-339933?style=for-the-badge&logo=nodejs&logoColor=white"> <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescripts&logoColor=white">
<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> <br>
TypeORM

## <a href="https: https://documenter.getpostman.com/view/23879843/2s9YyvAKrW#a65a5013-4361-4831-9086-1b51fa7ef6d1"> PostMan API문서 </a>



