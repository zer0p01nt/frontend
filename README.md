# <div align="center">니은다섯팀 프론트엔드 레포지토리</div>


## 개발 시작하기
```
git clone https://github.com/2025-LIKELION-HACKATHON-NIEUNDASEOT/frontend.git
cd frontend
npm install
npm start
```


## 참고 사항
- 배포 이후에는 PR main으로 보내도 괜찮습니다.
- 간단한(혹은 시급한...) 버그 수정은 main으로 push 해도 됩니다. 기능적으로 수정한 부분이 있다면 신중하게 부탁드립니다.
- **GoToTop 버튼은 꼭 ButtonWrapper로 감싸서 사용해주세요! 참고 : https://github.com/2025-LIKELION-HACKATHON-NIEUNDASEOT/frontend/pull/6**
- 오류가 발생하거나 상의해야 할 상황이 생기면 언제든 카톡, 디스코드!! 😉😉


## 기술 스택 (추후 정리 예정)
|용도|사용한 스택|
|-----|-----|
|사용 언어|<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white">|
|라이브러리|<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">|
|라우팅|<img src="https://img.shields.io/badge/reactrouter-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white">|
|개발 도구|<img src="https://img.shields.io/badge/createreactapp-09D3AC?style=for-the-badge&logo=createreactapp&logoColor=white">|
|스타일링|<img src="https://img.shields.io/badge/StyledComponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white"/>|
|배포|<img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">|
|CI/CD|<img src="https://img.shields.io/badge/githubactions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white">|
|푸시 알림|<img src="https://img.shields.io/badge/firebase-DD2C00?style=for-the-badge&logo=firebase&logoColor=white">|


## 역할 분담
|<a href="https://github.com/gogogo386"><img src="https://avatars.githubusercontent.com/u/165040142?v=4" width="200" /></a>|<a href="https://github.com/zer0p01nt"><img src="https://avatars.githubusercontent.com/u/189887138?v=4" width="200" /></a>|
|:-------:|:--------:|
|고권혜|백민영|
|역할을 자유롭게 작성해 주세요|역할을 자유롭게 작성해 주세요|


## 커밋 메세지 컨벤션
- 커밋의 시작은 아래의 목록을 참고하여 gitmoji & 커밋이름 삽입
  - VS Code 확장프로그램 "Gitmoji"를 사용하면 편합니다.  
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


## 브랜치 전략
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


## 폴더 구조 (추후 수정 예정)
```
frontend/
├─ .github/ (이슈 템플릿, PR 템플릿)
│  ├─ ISSUE_TEMPLATE/
│  │  ├─ config.yml
│  │  └─ issue_template.md
│  │
│  ├─ workflows
│  │  └─ deploy.yml (CI/CD)
│  │
│  └─ pull_request_template.md
│                
├─ public/
│  ├─ data/ (Mockdata 폴더 : 추후 삭제 예정)
│  │  ├─ CardList.json
│  │  ├─ Detail.json
│  │  └─ EachDetail.json
│  │
│  ├─ favicons (favicon, 웹앱 아이콘 등 관리)
│  │      
│  ├─ fonts/ (정적 경로에서 폰트 관리)
│  │  ├─ fonts.css
│  │  └─ PretendardVariable.woff2
│  │                 
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
│  ├─ index.js
│  ├─ service-worker.js
│  └─ serviceWorkerRegistration.js          
│
├─ .gitignore
├─ build.sh (CI/CD 관련)
├─ package-lock.json                  
├─ package.json
└─ README.md
```
