const KEY = 'community_posts_v3'
const ANON_KEY = 'community_anon_id'

export const load = () => JSON.parse(localStorage.getItem(KEY) || '[]')
export const save = (data) => localStorage.setItem(KEY, JSON.stringify(data))

export function getAnonId(){
  let id = localStorage.getItem(ANON_KEY)
  if(!id){ id = Math.random().toString(36).slice(2) + Date.now().toString(36); localStorage.setItem(ANON_KEY, id) }
  return id
}

export function seed(){
  if(load().length) return

  const titles = [
    '서울 월세 지원 후기 공유합니다',
    '경기도 청년 면접수당 신청 팁',
    '부산 공유오피스 어디가 좋아요?',
    '대전 주말 행사 다녀온 후기',
    '자취 첫 달, 전기세가 너무 나왔어요',
    '인천 공공자전거 사용법 정리',
    '강원도 디지털 노마드 질문있어요',
    '전남 여행 코스 추천 부탁드려요',
    '울산에서 모임 하실 분?',
    '제주 장기 거주 계획 상담'
  ]
  const regions = ['서울특별시','경기도','부산광역시','대전광역시','인천광역시','강원특별자치도','전라남도','울산광역시','제주특별자치도']
  const bodies = [
    '신청 과정에서 헷갈렸던 부분이 많아서 과정을 정리했어요. 서류 항목마다 체크리스트 만들면 편합니다.',
    '은행 거래내역서 제출할 때 기간 설정을 넉넉히 하는 게 포인트입니다. 온라인 신청도 가능해요.',
    '2인 작업하기 좋은 좌석과 프린터 이용 팁 공유합니다.',
    '야시장 퀄리티가 좋아졌네요. 공연도 꽤 즐거웠어요.',
    '에어컨 + 인덕션이 전기 먹는 하마네요.. 절약 팁 공유 부탁드려요!',
    '공공자전거 앱이 최근 업데이트돼서 사용성이 좋아졌네요. 반납 팁 공유.',
    '노트북 작업 가능한 카페/도서관 아시면 댓글 부탁드려요.',
    '차박 포인트랑 맛집 코스 공유드립니다.',
    '주 1회 보드게임 같이 하실 분 구해요!',
    '한 달 살기 해보신 분 계시면 집 구하는 요령 궁금합니다.'
  ]

  const now = Date.now()
  const randImg = (i) => `https://picsum.photos/seed/kg${i}/400/300`  // placeholder

  const posts = Array.from({length:18}).map((_,i)=>({
    id: Math.random().toString(36).slice(2),
    title: titles[i % titles.length],
    content: bodies[i % bodies.length] + '\n\n정보 더 모이면 본문 이어가겠습니다 :)',
    region: regions[i % regions.length],
    createdAt: new Date(now - i * 86400000).toISOString(),
    likes: Math.floor(Math.random()*20),
    likedBy: {},
    images: i % 3 === 0 ? [randImg(i), randImg(i+1)] : [],
    comments: []
  }))

  save(posts)
}
