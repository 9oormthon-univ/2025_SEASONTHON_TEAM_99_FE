const mock = [
  {
    id: 1,
    title: '청년안심주택 공급(매입)',
    status: '완료',
    location: '서울특별시',
    likes: 22,
    date: '상시',
    tags: ['주거'], // 태그 추가
    description: '청년들의 주거 안정을 위해 시세보다 저렴한 임대료로 양질의 임대주택을 공급하는 정책입니다.',
    applicationUrl: 'https://housing.seoul.go.kr/',
    supportContent: '임대주택 공급, 보증금 지원',
    supportScale: '연 5,000호',
    applicationPeriod: '2025.01.01 ~ 2025.12.31 (상시)',
    eligibility: '만 19세 ~ 39세 무주택 청년 및 신혼부부',
    requiredDocuments: '신분증, 주민등록등본, 소득증빙서류'
  },
  {
    id: 2,
    title: '청년 전세자금 대출 성공! 절차와 팁 공유',
    status: '진행전',
    location: '경상남도',
    likes: 0,
    date: '2025.09.15 ~ 2025.10.15',
    tags: ['주거', '금융'], // 태그 추가
    description: '목돈 마련이 어려운 청년들을 위해 전세보증금 대출을 지원하고 이자를 감면해주는 사업입니다.',
    applicationUrl: 'https://www.hf.go.kr/',
    supportContent: '최대 1억원 대출, 이자 2% 지원',
    supportScale: '선착순 1,000명',
    applicationPeriod: '2025.09.15 ~ 2025.10.15',
    eligibility: '연소득 5천만원 이하 만 19~34세 무주택 청년',
    requiredDocuments: '확정일자부 임대차계약서, 재직증명서'
  },
  {
    id: 3,
    title: '대학생 학자금 대출 이자 지원',
    status: '진행중',
    location: '경기도',
    likes: 290,
    date: '2025.07.01 ~ 2025.08.31',
    tags: ['금융', '교육문화'], // 태그 추가
    description: '한국장학재단에서 학자금 대출을 받은 경기도 대학생들의 이자 부담을 완화하기 위해 대출이자를 지원합니다.',
    applicationUrl: 'https://apply.gg.go.kr/',
    supportContent: '학자금 대출 발생 이자 전액 지원',
    supportScale: '제한 없음',
    applicationPeriod: '2025.07.01 ~ 2025.08.31',
    eligibility: '본인 또는 직계존속이 1년 이상 경기도에 거주한 대학(원)생',
    requiredDocuments: '주민등록초본, 재학증명서'
  },
  {
    id: 4,
    title: '도심융합특구 조성',
    status: '완료',
    location: '경상북도',
    likes: 0,
    date: '사업 종료',
    tags: ['일자리', '주거'], // 태그 추가
    description: '지방 대도시 도심에 산업, 주거, 문화 등 복합 인프라를 갖춘 고밀도 혁신 공간을 조성하는 사업입니다.',
    applicationUrl: 'https://www.molit.go.kr/',
    supportContent: '기업 유치, 세제 혜택, 인프라 구축',
    supportScale: '5개 광역시',
    applicationPeriod: '사업 종료',
    eligibility: '해당 특구 내 창업 기업 및 이전 기업',
    requiredDocuments: '사업계획서, 법인등기부등본'
  },
  {
    id: 5,
    title: '청년동아리 육성 지원사업',
    status: '진행중',
    location: '전라남도',
    likes: 54,
    date: '2025.03.02 ~ 2025.03.31',
    tags: ['교육문화', '복지'], // 태그 추가
    description: '청년들의 자발적인 동아리 활동을 지원하여 청년 문화 활성화 및 네트워크 구축에 기여합니다.',
    applicationUrl: 'https://www.jeonnam.go.kr/youth/',
    supportContent: '동아리별 활동비 100만원 지원',
    supportScale: '50개 동아리',
    applicationPeriod: '2025.03.02 ~ 2025.03.31',
    eligibility: '전라남도에 거주하는 3인 이상으로 구성된 청년 동아리',
    requiredDocuments: '활동계획서, 회원명부'
  },
  {
    id: 6,
    title: '화합물반도체 전문인력 양성',
    status: '진행전',
    location: '충청남도',
    likes: 12,
    date: '2025.10.01 ~',
    tags: ['일자리', '교육문화'], // 태그 추가
    description: '미래 핵심 산업인 화합물반도체 분야의 설계 및 공정 전문 인력을 체계적으로 양성하는 교육 프로그램입니다.',
    applicationUrl: 'https://www.kpu.ac.kr/',
    supportContent: '교육비 전액 무료, 취업 연계 지원',
    supportScale: '기수당 30명',
    applicationPeriod: '2025.10.01 ~ 모집 마감 시',
    eligibility: '4년제 이공계 대학 졸업(예정)자',
    requiredDocuments: '졸업(예정)증명서, 성적증명서'
  }
];


export default mock;
