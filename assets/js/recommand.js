
    // (1) 각 질문에 사용자가 선택한 값을 저장할 변수
    let ans1 = "";
    let ans2 = "";
    let ans3 = "";
    let ans4 = "";

    // (2) 질문별 플래그: 답 선택 여부
    let answered1 = false;
    let answered2 = false;
    let answered3 = false;
    let answered4 = false;

    // (3) 섹션 DOM 가져오기
    const section1 = document.getElementById('q1');
    const section2 = document.getElementById('q2');
    const section3 = document.getElementById('q3');
    const section4 = document.getElementById('q4');
    const resultSection = document.getElementById('result-section');
    const resultTitle = document.getElementById('result-title');
    const resultText = document.getElementById('result-text');

    // (4) 버튼 DOM 가져오기
    const btnQ1Next = document.getElementById('btn-q1-next');
    const btnQ2Next = document.getElementById('btn-q2-next');
    const btnQ3Next = document.getElementById('btn-q3-next');
    const btnQ4Finish = document.getElementById('btn-q4-finish');

    // (5) 1번 질문 라디오 클릭 시 처리
    const q1Radios = document.querySelectorAll('input[name="q1"]');
    q1Radios.forEach(radio => {
      radio.addEventListener('change', () => {
        answered1 = true;
        ans1 = radio.value;            // 선택된 A/B/C/D 저장
        btnQ1Next.disabled = false;    // 다음 질문 버튼 활성화
      });
    });

    // (6) 2번 질문 라디오 클릭 시 처리
    const q2Radios = document.querySelectorAll('input[name="q2"]');
    q2Radios.forEach(radio => {
      radio.addEventListener('change', () => {
        answered2 = true;
        ans2 = radio.value;
        btnQ2Next.disabled = false;
      });
    });

    // (7) 3번 질문 라디오 클릭 시 처리
    const q3Radios = document.querySelectorAll('input[name="q3"]');
    q3Radios.forEach(radio => {
      radio.addEventListener('change', () => {
        answered3 = true;
        ans3 = radio.value;
        btnQ3Next.disabled = false;
      });
    });

    // (8) 4번 질문 라디오 클릭 시 처리
    const q4Radios = document.querySelectorAll('input[name="q4"]');
    q4Radios.forEach(radio => {
      radio.addEventListener('change', () => {
        answered4 = true;
        ans4 = radio.value;
        btnQ4Finish.disabled = false;
      });
    });

    // (9) “다음 질문 보기” 각 버튼 클릭 이벤트
    btnQ1Next.addEventListener('click', () => {
      section2.scrollIntoView({ behavior: 'smooth' });
    });
    btnQ2Next.addEventListener('click', () => {
      section3.scrollIntoView({ behavior: 'smooth' });
    });
    btnQ3Next.addEventListener('click', () => {
      section4.scrollIntoView({ behavior: 'smooth' });
    });

    // (10) “여행 코스 추천받기” 버튼 클릭 시
    btnQ4Finish.addEventListener('click', () => {
      // 4문항 모두 반드시 answeredX가 true여야 함 (버튼 활성화 조건에서 이미 검증)
      const result = computeResult(ans1, ans2, ans3, ans4);
      showResult(result);
      // 화면을 결과 영역으로 스크롤
      resultSection.scrollIntoView({ behavior: 'smooth' });
    });

    // (11) 스크롤 제어: 답변 전에는 다음 섹션으로 자연 스크롤 방지
    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset;
      const H = window.innerHeight;

      // 아직 1번 미선택 → 1번 섹션(0 ~ H)으로 고정
      if (!answered1 && scrollY > H * 0.1) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      // 1번은 선택했지만 2번 미선택 → 2번 섹션(H ~ 2H)으로 고정
      if (answered1 && !answered2 && scrollY > H * 1.1) {
        window.scrollTo({ top: H, behavior: 'smooth' });
      }
      // 2번 선택, 3번 미선택 → 3번 섹션(2H ~ 3H)으로 고정
      if (answered2 && !answered3 && scrollY > H * 2.1) {
        window.scrollTo({ top: H * 2, behavior: 'smooth' });
      }
      // 3번 선택, 4번 미선택 → 4번 섹션(3H ~ 4H)으로 고정
      if (answered3 && !answered4 && scrollY > H * 3.1) {
        window.scrollTo({ top: H * 3, behavior: 'smooth' });
      }
    });

    // (12) 결과 계산 함수: 4개의 답(ans1~ans4)을 받아서 5가지 유형 중 하나를 반환
    function computeResult(a1, a2, a3, a4) {
      // 각 질문의 답은 "A", "B", "C", "D"
      // 우선순위 로직을 간단히 예시로 작성했습니다.
      // 실제로는 회사/서비스 특성에 맞게 가중치나 배점 테이블을 만들 수도 있습니다.

      // 1) “감성 충만한 문화/예술” 유형 우선
      if (a1 === "C") {
        return {
          title: "문화·예술 탐방 여행",
          text: "미술관, 박물관, 공연과 전통 체험이 가득한 일정으로, 지역의 문화 자원을 여유롭게 즐기는 코스로 안내해 드립니다."
        };
      }
      // 2) 로드 트립 자유 여행
      if ((a1 === "D" || a3 === "C") && (a2 === "C" || a2 === "D")) {
        return {
          title: "로드 트립 자유 여행",
          text: "렌터카나 자차를 이용해 이국적인 풍경을 직접 운전하며 즐기는 자유 일정으로, 장거리 드라이브와 함께 현지의 숨은 명소를 탐방합니다."
        };
      }
      // 3) 자연 속 힐링 여행
      if (a1 === "A" && (a4 === "A" || a4 === "C")) {
        return {
          title: "자연 속 힐링 여행",
          text: "조용한 숲길 산책, 호수 옆 캠핑, 정갈한 숲속 펜션에서의 휴식 등 한적한 자연 속에서 심신을 치유하는 일정으로 구성해 드립니다."
        };
      }
      // 4) 도시 에너지 충전 여행
      if (a1 === "B" && (a3 === "B" || a3 === "D")) {
        return {
          title: "도시 에너지 충전 여행",
          text: "버스·지하철을 이용해 주요 핫플레이스와 트렌디 카페, 쇼핑몰을 돌며 활기찬 도시의 에너지를 만끽할 수 있는 일정입니다."
        };
      }
      // 5) 나머지는 편안한 휴식형 여행
      return {
        title: "편안한 휴식형 여행",
        text: "분주한 일정 보다는 리조트나 스파, 한적한 숙소에서 느긋하게 쉬면서 지역 향토 음식을 즐기는 여유로운 코스를 추천해 드립니다."
      };
    }

    // (13) 결과를 화면에 표시하는 함수
    function showResult(resultObj) {
      resultTitle.textContent = resultObj.title;
      resultText.textContent = resultObj.text;
      resultSection.style.display = "block";
    }
   