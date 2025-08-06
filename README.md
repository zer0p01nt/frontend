# <div align="center">니은다섯팀 프론트엔드 레포지토리</div>


## 개발 시작하기
```
git clone https://github.com/2025-LIKELION-HACKATHON-NIEUNDASEOT/frontend.git
cd frontend
git checkout develop
npm install
npm start
```


## 참고 사항
- 프론트엔드 개발자 2명만 주로 쓰는 레포이므로, 이슈 기능은 쓰지 않아도 무방합니다.
  - 이슈를 쓰지 않는 경우, 브랜치명은 "feat/기능이름" 정도로만 해도 충분합니다.
  - 아래 브랜치 전략은 참고사항으로만 봐주세요.
- 마찬가지로 2명만 주로 쓰는 레포이므로, PR은 코드 리뷰 없이 스스로 Merge하면 됩니다!
- 배포 전까지 모든 PR은 main이 아닌 develop으로 보내주세요. 혹시나 하는 상황을 대비하기 위함입니다.
  - 마찬가지로 서로 다른 기능에 대해 새로 브랜치를 팔 때도 develop에서 파 주세요.
- 오류가 발생하거나 상의해야 할 상황이 생기면 언제든 카톡, 디스코드!! 😉😉


## 작업 전까지 해야 할 것!
- [x] CSS는 어떤 식으로 작업할지 정하기 : **styled-components**
- [x] develop 브랜치 생성
- [ ] 역할 분담 : 파트를 어떻게 나눌지, 어떤 부분을 맡아 작업할지
- [ ] 더미 데이터 생성 : API 명세서 바탕으로 MockData 생성 (추후 json server 열어서 작업할 수도...?)
- [ ] 작업 시작~


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


## 폴더 구조 (develop 기준. 추후 수정 예정)
```
frontend/
├─ .github/ (이슈 템플릿, PR 템플릿)
│  ├─ ISSUE_TEMPLATE/
│  │  ├─ config.yml
│  │  └─ issue_template.md
│  └─ pull_request_template.md
│                
├─ public/ (추후 PWA 관련 파일 추가 필요)
│  ├─ fonts/ (정적 경로에서 폰트 관리)
│  │  ├─ fonts.css
│  │  └─ PretendardVariable.woff2               
│  ├─ favicon.ico     
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
│  ├─ services/ (푸시 알림 등 서비스 관련 파일)         
│  │
│  ├─ styles/ (css 관련 파일)
│  │  └─ GlobalStyle.jsx (전역 스타일 관리)           
│  │
│  ├─ App.js            
│  └─ index.js          
│
├─ .gitignore
├─ package-lock.json                  
├─ package.json
└─ README.md
```
- 현재는 빈 폴더를 푸시하기 위해 .gitkeep 파일을 넣어뒀지만, 작업 시 모두 삭제하고 작업합니다.
