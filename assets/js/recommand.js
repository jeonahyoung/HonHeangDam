// — 문항 데이터 정의 —
const questions = [
  {
    title: "1. 어떤 스타일의 여행을 선호하시나요?",
    options: [
      { value: "A", label: "A. 조용하고 평화로운 자연 속 여행" },
      { value: "B", label: "B. 활기차고 에너제틱한 도시여행" },
      { value: "C", label: "C. 감성 충만한 문화/예술 여행" },
      { value: "D", label: "D. 이국적인 느낌이 나는 여행" }
    ]
  },
  {
    title: "2. 여행 기간은 얼마나 되나요?",
    options: [
      { value: "A", label: "A. 당일치기 또는 1박2일" },
      { value: "B", label: "B. 2박 3일" },
      { value: "C", label: "C. 3박 4일" },
      { value: "D", label: "D. 5일 이상 긴 여행" }
    ]
  },
  {
    title: "3. 여행할 때 이동 방식은 어떤 걸 선호하나요?",
    options: [
      { value: "A", label: "A. 도보 중심으로 천천히" },
      { value: "B", label: "B. 대중교통(버스, 기차) 이용" },
      { value: "C", label: "C. 렌터카나 자차 이용" },
      { value: "D", label: "D. 가이드 투어 이용" }
    ]
  },
  {
    title: "4. 여행에서 가장 피하고 싶은 점은?",
    options: [
      { value: "A", label: "A. 사람 많은 곳(혼잡, 붐빔)" },
      { value: "B", label: "B. 교통이 복잡한 지역" },
      { value: "C", label: "C. 활동이 과한 일정(힘든 체력 소모)" },
      { value: "D", label: "D. 너무 정적인 일정(지루함)" }
    ]
  }
];

// — 결과 계산 함수 —
function computeResult(a1, a2, a3, a4) {
  if (a1 === "C") {
    return {
      title: "문화·예술 탐방 여행",
      text: "현대미술관에서 새로운 관점을 얻고, 삼청동 골목의 소소한 전통 문화를 체험하며 감성 충만한 시간을 보낼 수 있는 여행입니다. 골목마다 숨겨진 갤러리와 카페를 찾아다니며 색다른 영감을 얻어보세요.",
      course: [
        "국립현대미술관 서울관 →",
        "삼청동 골목 산책 →",
        "북촌한옥마을 구경 →",
        "삼청동 카페 거리에서 티타임"
      ]
    };
  }
  if ((a1 === "D" || a3 === "C") && (a2 === "C" || a2 === "D")) {
    return {
      title: "로드 트립 자유 여행",
      text: "차창밖 풍경을 지나며 자유롭게 멈춰 서서 사진도 찍고, 현지 맛집에서 여유롭게 식사하는 드라이브 일정입니다. 낯선 길 위에서만 느낄 수 있는 해방감과 소소한 모험을 함께 즐겨보세요.",
      course: [
        "임진각 평화누리공원 →",
        "프로방스 마을 구경 →",
        "헤이리 예술마을 산책 →",
        "파주 출판단지 북카페에서 휴식"
      ]
    };
  }
  if (a1 === "A" && (a4 === "A" || a4 === "C")) {
    return {
      title: "자연 속 힐링 여행",
      text: "울창한 숲길을 걸으며 피톤치드를 가득 마시고, 잔잔한 호숫가에서 고요함을 만끽하는 휴식형 일정입니다. 잔잔한 자연의 속삭임이 마음을 다독여 주는 시간이 될 거예요.",
      course: [
        "아침고요수목원 산책 →",
        "두물머리 강변 산책 →",
        "세미원 연꽃정원 구경 →",
        "양평 카페거리에서 커피 한잔"
      ]
    };
  }
  if (a1 === "B" && (a3 === "B" || a3 === "D")) {
    return {
      title: "도시 에너지 충전 여행",
      text: "컬러풀한 스트리트 아트에서 시작해 세련된 카페와 길거리 음식을 맛보며 도심의 활력을 가득 채우는 코스입니다. 계속해서 새로운 볼거리와 맛을 찾아다니며 에너지가 샘솟는 하루를 경험해 보세요.",
      course: [
        "홍대 스트리트 아트 구경 →",
        "연남동 카페 골목 투어 →",
        "망원시장 길거리 음식 체험 →",
        "상수동 플리마켓 방문"
      ]
    };
  }
  return {
    title: "편안한 휴식형 여행",
    text: "포근한 펜션에서의 휴식과 호반 산책으로 지친 일상을 내려놓는 일정입니다. 소박한 맛집에서 현지 음식을 맛보며 여유롭게 하루를 마무리해 보세요.",
    course: [
      "양평 펜션 체크인 →",
      "호명호수 산책 →",
      "두물머리 석양 감상 →",
      "양평 전통 맛집에서 저녁 식사"
    ]
  };
}

// — DOM 제어 & 이벤트 로직 —
const coverSec     = document.getElementById('cover');
const questionForm = document.querySelector('.question_form');
const qContainer   = document.querySelector('.q-container');
const stepInd      = document.querySelector('.step-indicator');
const qSec         = document.querySelector('.question-section');
const resultSec    = document.getElementById('result-section');
const btnStart     = document.getElementById('btn-start');
const btnPrev      = document.getElementById('btn-prev');
const btnNext      = document.getElementById('btn-next');
const stepEls      = document.querySelectorAll('.step-indicator .step');
const qTitleEl     = document.querySelector('.question-title');
const optionsEl    = document.querySelector('.options');
const resultTitle  = document.getElementById('result-title');
const resultText   = document.getElementById('result-text');
const resultCourse = document.getElementById('result-course');

let currentStep = 1;
const answers = {1:"",2:"",3:"",4:""};

function updateStep(n) {
  stepEls.forEach(el =>
    el.classList.toggle('active', Number(el.dataset.step) === n)
  );
}

function showQuestion(n) {
  updateStep(n);
  btnPrev.style.display = n > 1 ? 'inline-block' : 'none';

  const q = questions[n - 1];
  qTitleEl.textContent = q.title;
  optionsEl.innerHTML = q.options
    .map(o => `
      <li>
        <label>
          <input type="radio" name="q" value="${o.value}" ${answers[n] === o.value ? 'checked' : ''}/>
          ${o.label}
        </label>
      </li>`).join('');

  btnNext.disabled = !answers[n];
  optionsEl.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', () => {
      answers[n] = radio.value;
      btnNext.disabled = false;
    });
  });
}

function showResult() {
  questionForm.style.display = 'none';
  stepInd.style.display      = 'none';
  qContainer.style.display   = 'none';
  resultSec.style.display    = 'block';

  const res = computeResult(answers[1], answers[2], answers[3], answers[4]);
  resultTitle.textContent = res.title;
  resultText.textContent  = res.text;
  resultCourse.innerHTML  = res.course.map(s => `<li>${s}</li>`).join('');
  updateStep(4);
}

btnStart.addEventListener('click', () => {
  coverSec.style.display     = 'none';
  questionForm.style.display = 'flex';
  qContainer.style.display   = 'block';
  stepInd.style.display      = 'flex';
  qSec.style.display         = 'block';
  showQuestion(currentStep);
});

btnNext.addEventListener('click', () => {
  if (currentStep < questions.length) {
    currentStep++;
    showQuestion(currentStep);
  } else {
    qSec.style.display = 'none';
    showResult();
  }
});

btnPrev.addEventListener('click', () => {
  if (currentStep > 1) {
    currentStep--;
    showQuestion(currentStep);
  }
});
