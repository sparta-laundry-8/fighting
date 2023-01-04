##seeders 파일은 안올라가네요 필요하면 직접 생성해서 써도 될 듯?

## npm 모듈 설치 항목
express jsonwebtoken mysql2 sequelize sequelize-cli

## sequelize 초기 설정
npx sequelize init

## config/config.json DB 경로 변경 아직 안함

## 모델 생성 명령어
예시 npx sequelize model:generate --name User --attributes {email:string,nickname:string,password:string}

모델은 CRUD에 대한 논의가 끝나면 생성할 예정

## 테이블 생성 명령어
npx sequelize db:migrate
migrations에 생성된 모델 정보를 가지고 DB에 테이블 생성

## 오류 값(조건 값) 넣기
회원가입, 프로필 변경 등 중복확인 및 형식 등 제한조건 넣기

## 사용자 인증 토큰 미들웨어 만들기 