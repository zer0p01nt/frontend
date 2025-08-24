# <div align="center"> 나와 지역사회를 가깝게, Villit(빌리트) </div>
<div align="center">
  <img width="1280" height="720" alt="image" src="https://github.com/user-attachments/assets/8a614ecc-99c7-41e3-b68e-8b12150cc6be" />
</div>

> ### 니은다섯팀 프론트엔드 레포지토리
> 프로젝트 기간 : 2025.07.22. ~ 2025.08.26.

<br/>

 ## <div align="center">🙋‍♀️ 팀원 소개 🙋‍♀️</div>
<table align="center">
  <thead>
    <tr>
      <th>
        <a href="https://github.com/gogogo386">
          <img src="https://avatars.githubusercontent.com/u/165040142?v=4" width="200" />
        </a>
      </th>
      <th>
        <a href="https://github.com/zer0p01nt">
          <img src="https://avatars.githubusercontent.com/u/189887138?v=4" width="200" />
        </a>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center">고권혜</td>
      <td align="center">백민영</td>
    </tr>
    <tr>
      <td align="center">역할을 자유롭게 작성해 주세요.</td>
      <td align="center">
        <div>마이페이지, 정보수정</div>
        <div>공문 상세페이지, 챗봇</div>
        <div>공문 스크랩, 챗봇 스크랩</div>
        <div>FCM 푸시 알림</div>
        <div>배포 및 CI/CD</div>
      </td>
    </tr>
  </tbody>
</table>

<br/>

 ## <div align="center">🔧 기술 스택 🔧</div>

<table align="center">
  <thead>
    <tr>
      <th>
        용도
      </th>
      <th>
        사용한 스택
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center">사용 언어</td>
      <td align="center">
        <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white">
      </td>
    </tr>
    <tr>
      <td align="center">라이브러리</td>
      <td align="center">
        <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
      </td>
    </tr>
    <tr>
      <td align="center">라우팅</td>
      <td align="center">
        <img src="https://img.shields.io/badge/reactrouter-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white">
      </td>
    </tr>
    <tr>
      <td align="center">개발 도구</td>
      <td align="center">
        <img src="https://img.shields.io/badge/createreactapp-09D3AC?style=for-the-badge&logo=createreactapp&logoColor=white">
      </td>
    </tr>
    <tr>
      <td align="center">스타일링</td>
      <td align="center">
        <img src="https://img.shields.io/badge/StyledComponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white"/>
      </td>
    </tr>
    <tr>
      <td align="center">배포</td>
      <td align="center">
        <img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">
      </td>
    </tr>
    <tr>
      <td align="center">CI/CD</td>
      <td align="center">
        <img src="https://img.shields.io/badge/githubactions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white">
      </td>
    </tr>
    <tr>
      <td align="center">푸시 알림</td>
      <td align="center">
        <img src="https://img.shields.io/badge/firebase-DD2C00?style=for-the-badge&logo=firebase&logoColor=white">
      </td>
    </tr>
  </tbody>
</table>

<br/>

 ## <div align="center">💻 개발 시작하기 💻</div>
```
git clone https://github.com/2025-LIKELION-HACKATHON-NIEUNDASEOT/frontend.git
cd frontend
npm install
npm start
```

<br/>

 ## <div align="center">📁 폴더 구조 📁</div>
```
frontend/
├─ .github/ (이슈 템플릿, PR 템플릿)
│  ├─ ISSUE_TEMPLATE/
│  │  ├─ config.yml
│  │  └─ issue_template.md
│  │
│  ├─ workflows
│  │  └─ deploy.yml (CI/CD 배포 파일)
│  │
│  └─ pull_request_template.md
│                
├─ public/
│  ├─ data/ (Mockdata 폴더 - 사용하지 않음)
│  │
│  ├─ favicons (favicon, 웹앱 아이콘 등 관리)
│  │      
│  ├─ fonts/ (정적 경로에서 폰트 관리)
│  │  ├─ fonts.css
│  │  └─ PretendardVariable.woff2
│  │
│  ├─ favicon.svg
│  ├─ firebase-messaging-sw.js (FCM 푸시알림을 위한 서비스워커)                  
│  ├─ index.html  
│  ├─ logo192.png
│  ├─ logo512.png
│  ├─ manifest.json
│  └─ robots.txt             
│
├─ src/
│  ├─ assets/ (이미지 파일 등의 정적 파일)        
│  │
│  ├─ components/ (재사용되는 컴포넌트 파일)        
│  │
│  ├─ hooks/ (api fetch 등 재사용되는 hook 파일)               
│  │
│  ├─ pages/ (홈 화면 등 페이지 파일)             
│  │
│  ├─ services/ (fetch 후 데이터 정제 로직 등 서비스 관련 파일)         
│  │
│  ├─ styles/ (css 관련 파일)
│  │  └─ GlobalStyle.jsx (전역 스타일 관리)           
│  │
│  ├─ utils/ (필터링 등 컴포넌트 기능 관련 파일)
│  │
│  ├─ App.js            
│  ├─ fcm.js (FCM 토큰 등록 로직)
│  ├─ firebase.js (Firebase 프로젝트 초기화)
│  └─ index.js          
│
├─ .gitignore
├─ build.sh (CI/CD 배포 관련 파일)
├─ package-lock.json                  
├─ package.json
└─ README.md
```

<br />

 ## <div align="center">📃 커밋, 브랜치 컨벤션 📃</div>


> ### 커밋 메세지 컨벤션
- 커밋의 시작은 아래의 목록을 참고하여 gitmoji & 커밋이름 삽입
- 커밋의 끝맺음은 "~ 기능 추가", "~ 작업", "~ 개발" 과 같이 명사로 통일
```
🎉 Init: 프로젝트 세팅
✨ Feat: 새로운 기능 추가
🐛 Fix: 버그 수정
🎨 Design: UI 스타일/디자인 수정
♻️ Refactor: 코드 리팩토링
✏️ Typo: 오타 수정,타입 수정
🚚 Rename: 폴더 구조 이동, 파일명 변경
🍱 Assets: 이미지, 폰트 등 리소스 추가/삭제
🔥 Del: 파일 삭제
📚 Docs: 문서 수정, 목데이터 작업 등
🔧 Chore: 설정파일 보완, 환경 설정
➕ Deps: 새로운 라이브러리 설치
➖ Deps: 불필요한 라이브러리 삭제
🔙 : 커밋 내용 복구
```
예시
```
✨ Feat: 메인페이지 개발
♻️ Refactor: 등록 플로우 - 글 작성 페이지 로직 정리
```


> ### 브랜치 전략
|태그이름|설명|
|--------|-------|
|main|실제 배포용 브랜치|
|develop|개발용 브랜치(기능 통합용)|
|feat/이슈번호/기능이름|새로운 기능 개발 시|
|refactor/이슈번호/기능이름|코드 리팩토링|
|fix/이슈번호/버그이름|버그 수정|
|design/이슈번호/요소|디자인 및 스타일 변경|
|chore/이슈번호/내용|설정, 의존성 등 기타 작업|

예시
```
feat/12/login-page  // 로그인 기능 개발
refactor/34/reduce-duplicated-code  // 코드 리팩토링
chore/56/update-eslint  // eslint 설정 수정
```
