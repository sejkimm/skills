# 기술 용어 패턴 (24)

영어 기술 용어를 다룰 때 주의할 점을 다룬다.

## 24. 영어 기술 용어의 불필요한 한글 음역

**문제:** LLM은 영어 기술 용어를 한글로 음역하거나, 반대로 한국어로 충분히 쓸 수 있는 표현까지 영어로 남기는 경우가 있다. 두 경우 모두 독자를 기준으로 판단한다.

기술 문서와 개발자 노트에서는 업계에서 영어로 쓰는 용어를 보존한다. 일반 독자용 글에서는 `framework`, `leverage`, `seamless`, `robust`, `impact`처럼 한국어로 자연스럽게 풀 수 있는 단어를 줄인다. "서버", "데이터", "프로그램"처럼 이미 한국어로 정착한 외래어는 그대로 둔다.

**수정 전 → 수정 후:**
- "프런트엔드" → "frontend"
- "백엔드" → "backend"
- "라이다" → "LiDAR"
- "데브옵스" → "DevOps"
- "쿠버네티스" → "Kubernetes"
- "도커" → "Docker"
- "깃허브" → "GitHub"
- "타입스크립트" → "TypeScript"
- "리액트" → "React"
- "웹팩" → "webpack"
- "테라폼" → "Terraform"
- "그래프큐엘" → "GraphQL"
- "이 framework를 leverage한다" → "이 구조를 활용한다" 또는 "이 framework를 활용한다"
- "seamless한 경험" → "끊김 없는 경험" 또는 "매끄러운 경험"
- "robust한 시스템" → "입력 noise가 있어도 출력이 안정적인 시스템"
- "impact가 크다" → "영향이 크다" 또는 더 구체적인 결과

**판단 기준:**
- 한국어 기술 문서, 채용 공고, 개발자 커뮤니티에서 영어 그대로 쓰이는 용어인지 확인한다.
- 고유명사, 제품명, API, SDK, protocol, model 이름은 유지한다.
- 전문 독자에게 익숙한 `pipeline`, `framework`, `runtime`은 문서 맥락에 따라 유지할 수 있다.
- 일반 독자용 글에서 영어가 문장 리듬을 깨면 한국어로 풀어 쓴다.

**수정 전:**
> 프런트엔드는 리액트로 구현했고, 백엔드는 쿠버네티스 위에 배포했습니다. 라이다 센서 데이터를 그래프큐엘 API로 제공합니다.

**수정 후:**
> frontend는 React로 구현했고, backend는 Kubernetes 위에 배포했다. LiDAR 센서 데이터를 GraphQL API로 제공한다.

**수정 전:**
> 이 framework를 leverage하면 더 seamless하고 robust한 workflow를 만들 수 있다.

**수정 후:**
> 이 framework를 활용하면 끊김이 적고 장애에 더 잘 버티는 workflow를 만들 수 있다.
