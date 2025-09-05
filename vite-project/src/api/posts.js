import { load, save, seed, getAnonId } from './storage'
seed()

export async function listPosts({offset=0, limit=10}={}) {
  const all = load().sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt))
  return { items: all.slice(offset, offset+limit), total: all.length }
}
export async function getPost(id){ return load().find(p=>p.id===id) }

export async function createPost({ title, content, region, regionCode, city, cityCode, images=[] }){
  const posts = load()
  const p = {
    id: Math.random().toString(36).slice(2),
    title: title.trim(),
    content: content.trim(),
    region,                 // 예: 경상남도
    regionCode: regionCode || null, // 예: '48'
    city: city || null,             // 예: 김해시
    cityCode: cityCode || null,     // 예: '김해시' (현재 데이터 구조상 라벨=코드)
    createdAt: new Date().toISOString(),
    likes: 0,
    likedBy: {},
    images: images.slice(0,3),
    comments: []
  }
  posts.unshift(p)
  save(posts)
  return p
}


export async function toggleLike(id){
  const posts = load()
  const i = posts.findIndex(p=>p.id===id)
  if(i<0) throw new Error('not found')
  const me = getAnonId()
  const liked = !!posts[i].likedBy[me]
  if(liked){ posts[i].likes = Math.max(0, posts[i].likes-1); delete posts[i].likedBy[me] }
  else{ posts[i].likes += 1; posts[i].likedBy[me] = true }
  save(posts)
  return { liked: !liked, likes: posts[i].likes }
}

export async function addComment(id,{content}){
  const posts = load()
  const i = posts.findIndex(p=>p.id===id)
  if(i<0) throw new Error('not found')
  posts[i].comments.push({
    id: Math.random().toString(36).slice(2),
    content: content.trim(),
    createdAt: new Date().toISOString(),
    anonId: getAnonId()
  })
  save(posts)
  return posts[i]
}

export async function deleteComment(postId, commentId){
  const posts = load()
  const i = posts.findIndex(p=>p.id===postId)
  if(i<0) throw new Error('not found')
  const me = getAnonId()
  posts[i].comments = posts[i].comments.filter(c => !(c.id===commentId && c.anonId===me))
  save(posts)
  return posts[i]
}
