# 전체 예시 2: 기술 문서

기술 문서에서 자주 나타나는 두 가지 양상을 한 파일에 담았다. 입력 텍스트의 특성에 맞는 사례를 참고한다.

- **사례 A**: 의인화와 증상-원인 혼동이 두드러지는 글 (7번, 7-1번 중심)
- **사례 B**: 메타 서술, 단정적 표준 주장, 영어 형용사+하다, 공허한 단정이 함께 나타나는 글 (7-2, 7-3, 9-1, 11-1, 18-1, 23-1번 중심)

---

## 사례 A: 의인화와 증상-원인 혼동

표면적으로는 자연스러워 보이지만, 자세히 보면 시스템을 의인화하고 보이는 증상만 적은 부분이 많다.

### 수정 전

> 강화학습 기반 robot policy를 실제 환경에 배포할 때, tuning이 조합 폭발한다. learning rate, reward weight, exploration noise를 한꺼번에 만지면 다음 단계 전체가 죽는다.
>
> 학습이 망가지면 robot은 그 자리에서 얼어버리거나, 반대로 갑자기 뛰어오르려 한다. 둘 다 위험하다. SLAM이 뒤집히는 경우도 있는데, 그러면 navigation도 같이 무너진다.
>
> camera 노출이 잘못 잡히면 밝은 부분이 그대로 날아간다. depth estimation 단계에서 그 픽셀들은 사실상 사용 불가다. 메모리와 compute가 폭발하기 시작하면, batch size를 줄여도 소용없다.
>
> 결국 신뢰성 있는 시스템을 만들려면 모든 단계가 유기적으로 연결되어야 하고, 각 component가 서로 공존하는 구조가 분명히 필요하다.

### 초안

> 강화학습 기반 robot policy를 실제 환경에 배포할 때, tuning 변수가 서로 얽혀서 어디서부터 봐야 할지 모르게 된다. learning rate, reward weight, exploration noise를 한꺼번에 바꾸면 다음 단계가 의미 있는 출력을 낼 수 없다.
>
> 학습이 잘못되면 policy output이 좁은 범위에 갇히거나, 반대로 controller가 급격한 명령을 낸다. 두 경우 모두 위험하다. SLAM pose가 크게 틀어지는 경우도 있는데, 그러면 navigation 입력도 같이 신뢰할 수 없게 된다.
>
> camera 노출 설정이 잘못되면 밝은 부분이 과노출된다. depth estimation 단계에서 그 픽셀들은 사실상 사용 불가다. 메모리와 compute 부담이 크게 늘어나면, batch size를 줄여도 효과가 제한적이다.
>
> 결국 신뢰성 있는 시스템을 만들려면 각 단계가 어떤 입력을 어떤 출력으로 변환하는지 정의되어 있어야 한다.

### AI가 쓴 것 같은 부분이 남아 있는가?

- 마지막 문단이 여전히 일반론으로 마무리된다. 구체적인 점검 항목이나 실제 작업 예시가 부족하다
- 두 번째 문단의 "두 경우 모두 위험하다"는 평이하지만 정보량이 적다

### 최종 수정본

> 강화학습 기반 robot policy를 실제 환경에 배포할 때, tuning 변수가 서로 얽혀서 어디서부터 봐야 할지 모르게 된다. learning rate, reward weight, exploration noise를 한꺼번에 바꾸면 다음 단계가 의미 있는 출력을 낼 수 없다. 한 번에 하나씩 바꾸고, 그 변화가 어느 metric에 어떻게 반영되는지 기록해 두는 편이 안전하다.
>
> 학습이 잘못되면 두 가지 양상이 자주 나온다. 하나는 policy output이 좁은 범위에 갇혀 controller 명령이 거의 0에 머무는 경우다. 다른 하나는 정반대로, controller가 한계 토크에 가까운 명령을 갑자기 낸다. 두 번째 경우는 실제 hardware에 손상을 줄 수 있어 더 신경 써야 한다.
>
> SLAM pose가 크게 틀어지면 navigation 입력도 같이 신뢰할 수 없게 된다. 이 경우 시각적으로는 robot이 멀쩡해 보여도, 내부 좌표계가 어긋난 상태로 명령을 받기 때문에 디버깅이 까다롭다.
>
> camera 노출 설정이 잘못되면 밝은 부분이 과노출되고, depth estimation 단계에서 그 픽셀들은 사실상 사용 불가가 된다. 메모리와 compute 부담이 크게 늘어나는 상황에서는 batch size를 줄이는 것만으로는 효과가 제한적이다. activation checkpointing이나 mixed precision을 같이 검토할 필요가 있다.

### 적용된 항목 표

| 항목 번호 | 항목 이름 | 수정 전 | 수정 후 |
|---|---|---|---|
| 7 | LLM 특유의 과장 어휘 | tuning이 조합 폭발한다 | tuning 변수가 서로 얽혀서 어디서부터 봐야 할지 모르게 된다 |
| 7 | LLM 특유의 과장 어휘 | 다음 단계 전체가 죽는다 | 다음 단계가 의미 있는 출력을 낼 수 없다 |
| 7-1 | 의인화/증상-원인 혼동 | robot은 그 자리에서 얼어버리거나 | policy output이 좁은 범위에 갇혀 controller 명령이 거의 0에 머무는 경우 |
| 7-1 | 의인화/증상-원인 혼동 | 갑자기 뛰어오르려 한다 | controller가 한계 토크에 가까운 명령을 갑자기 낸다 |
| 7-1 | 의인화/증상-원인 혼동 | SLAM이 뒤집히는 | SLAM pose가 크게 틀어진다 |
| 7 | LLM 특유의 과장 어휘 | navigation도 같이 무너진다 | navigation 입력도 같이 신뢰할 수 없게 된다 |
| 7 | LLM 특유의 과장 어휘 | 밝은 부분이 그대로 날아간다 | 밝은 부분이 과노출된다 |
| 7 | LLM 특유의 과장 어휘 | 메모리와 compute가 폭발하기 시작하면 | 메모리와 compute 부담이 크게 늘어나면 |
| 7 | LLM 특유의 과장 어휘 | batch size를 줄여도 소용없다 | batch size를 줄이는 것만으로는 효과가 제한적이다 |
| 9 | 과다 사용되는 LLM 어휘 | 모든 단계가 유기적으로 연결되어야 하고 | 각 단계가 어떤 입력을 어떤 출력으로 변환하는지 정의되어 있어야 한다 |
| 7 | LLM 특유의 과장 어휘 | 각 component가 서로 공존하는 구조가 분명히 필요하다 | activation checkpointing이나 mixed precision을 같이 검토할 필요가 있다 |
| 23 | 막연한 긍정 결론 | 결국 신뢰성 있는 시스템을 만들려면 ... 분명히 필요하다 | 실제 점검 항목으로 대체 |

총 12건 적용 (상위 20개 이내).

### 변경 사항 요약

기술 문서에서 자주 보이는 의인화 동사와 과장 어휘를 component 단위 서술로 바꿨다. 보이는 현상이 아니라 어떤 module의 어떤 신호가 문제 원인인지 명시하도록 수정했고, 마무리 문단의 일반론은 실제 점검 항목으로 교체했다. 두 양상의 차이와 위험도, hardware 손상 가능성까지 추가해 정보량을 보강했다.

---

## 사례 B: 메타 서술, 단정적 표준 주장, 영어 형용사+하다

표면적으로는 기술 문서 같은 어투지만, 자세히 보면 enumeration이 과도하고, 표준이라고 단정하며, 영어 형용사를 그대로 쓰고, 메타 서술이 반복된다.

### 수정 전

> 이 장에서는 SLAM layer를 다룬다. 이 절에서는 LiDAR-Inertial Odometry를 다룬다. 다음 절에서는 calibration을 다룬다. 마지막 절에서는 monitoring을 다룬다.
>
> SLAM layer의 임무는 두 가지다. 첫째, 위치 추정으로 공간 추론을 할 수 있게 해준다. 둘째, costmap을 만든다. 핵심 개념은 두 sensor가 같은 진동을 보는 것이 critical하다는 점이다. 이 분야에서는 tightly coupled LIO가 표준 선택이다.
>
> tuning이 지옥이 된다. 잘못 잡으면 costmap이 버티지 못하고 멈춘다. LiDAR가 초당 100만 point 이상을 뱉는 상황에서 그리고 최종적으로 navigation에도 기여한다.
>
> 좋은 architecture 설계는 시스템 안정성을 결정한다. 이 architecture는 표준 pattern이다.

### 초안

> SLAM layer는 LiDAR-Inertial Odometry, calibration, monitoring 세 부분으로 구성된다. 아래에서 순서대로 살펴본다.
>
> SLAM layer는 위치 추정과 costmap 좌표 정합 두 가지를 책임진다. 기억해야 할 개념은 두 sensor가 같은 진동을 동시에 보고 있어야 SLAM이 올바르게 동작한다는 점이다. 이 분야에서는 tightly coupled LIO를 쓰는 것이 일반적이다.
>
> tuning 변수가 많아 어디서 조정해야 할지 찾기 어려워진다. 잘못 잡으면 costmap이 느려져 멈추는 경우가 많다. LiDAR가 초당 100만 point 이상을 출력하는 상황에서, 그 결과는 navigation 입력으로 전달된다.
>
> architecture를 모듈 단위로 잘 나눠 두면 platform이 바뀌어도 재사용할 수 있다. 이 architecture는 많이 쓰이는 pattern 중 하나이다.

### AI가 쓴 것 같은 부분이 남아 있는가?

- "아래에서 순서대로 살펴본다"는 여전히 메타 서술 느낌이 약간 남는다
- 마지막 문단의 두 문장이 서로 잘 연결되지 않는다

### 최종 수정본

> SLAM layer는 LiDAR-Inertial Odometry, calibration, monitoring 세 부분으로 구성된다.
>
> SLAM layer는 위치 추정과 costmap 좌표 정합을 책임진다. 두 sensor가 같은 진동을 동시에 보고 있어야 SLAM이 올바르게 동작한다는 점은 미리 짚어 두는 편이 좋다. 이 분야에서는 tightly coupled LIO를 쓰는 것이 일반적이다.
>
> tuning 변수가 많아 어디서 조정해야 할지 찾기 어려워지는데, 잘못 잡으면 costmap이 느려져 멈추는 경우가 많다. LiDAR가 초당 100만 point 이상을 출력하는 상황에서는 downsampling 단계의 parameter 하나만 바뀌어도 전체 latency가 크게 달라진다.
>
> architecture를 모듈 단위로 잘 나눠 두면 platform이 바뀌어도 재사용할 수 있다. 실제로 이 구조는 ROS 2 기반 navigation stack에서 많이 채택되어 있다.

### 적용된 항목 표

| 항목 번호 | 항목 이름 | 수정 전 | 수정 후 |
|---|---|---|---|
| 18-1 | 메타 서술 남발 | 이 장에서는 SLAM layer를 다룬다. 이 절에서는 ... 다룬다 (4회 반복) | "SLAM layer는 ... 세 부분으로 구성된다"로 한 문장에 통합 |
| 11-1 | "첫째/둘째" 형식 나열 | SLAM layer의 임무는 두 가지다. 첫째, ... 둘째, ... | SLAM layer는 위치 추정과 costmap 좌표 정합을 책임진다 |
| 9-1 | 상투적 강조 도입어 | 핵심 개념은 ~ critical하다는 점이다 | (도입어 제거 후 본문에 통합) |
| 7-2 | 영어 형용사 + 하다 | 두 sensor가 같은 진동을 보는 것이 critical하다 | 두 sensor가 같은 진동을 동시에 보고 있어야 SLAM이 올바르게 동작한다 |
| 7-3 | 단정적 표준/정설 주장 | tightly coupled LIO가 표준 선택이다 | tightly coupled LIO를 쓰는 것이 일반적이다 |
| 7-3 | 단정적 표준/정설 주장 | 이 architecture는 표준 pattern이다 | 많이 쓰이는 pattern 중 하나이다 / ROS 2 기반 navigation stack에서 많이 채택 |
| 7 | LLM 특유의 과장 어휘 | tuning이 지옥이 된다 | tuning 변수가 많아 어디서 조정해야 할지 찾기 어려워진다 |
| 7 | LLM 특유의 과장 어휘 | costmap이 버티지 못하고 멈춘다 | costmap이 느려져 멈추는 경우가 많다 |
| 7 | LLM 특유의 과장 어휘 | 초당 100만 point 이상을 뱉는다 | 초당 100만 point 이상을 출력한다 |
| 1 | 과장된 의미 부여 | 그리고 최종적으로 navigation에도 기여한다 | 그 결과는 navigation 입력으로 전달된다 |
| 23-1 | 공허한 영향/결과 단정 | 좋은 architecture 설계는 시스템 안정성을 결정한다 | architecture를 모듈 단위로 잘 나눠 두면 platform이 바뀌어도 재사용할 수 있다 |
| 7-1 | 의인화/증상-원인 혼동 | costmap이 버티지 못하고 멈춘다 | downsampling 단계의 parameter가 latency에 영향 (실제 mechanism 추가) |

총 12건 적용 (상위 20개 이내).

### 변경 사항 요약

메타 서술과 enumeration을 합쳐 한 문단으로 압축했다. 영어 형용사 "critical하다"를 풀어 써서 실제 의미를 명시했고, 표준/정석 단정을 "일반적이다", "많이 쓰인다"로 완화했다. 의인화 동사("뱉는다", "버티지 못하고", "지옥이 된다")는 component 동작 서술로 교체하고, 공허한 단정("안정성이 결정된다")을 실제 이득으로 풀어 썼다. 마지막 문단에는 ROS 2 기반 navigation stack이라는 구체 사례를 추가했다.
