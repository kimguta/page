import { useMemo, useState } from 'react'
import './Board.css'

type BoardPost = {
  id: string
  category: '공지' | '업데이트' | '문의'
  title: string
  author: string
  date: string
  views: number
  body: string
  pinned?: boolean
}

const boardPosts: BoardPost[] = [
  {
    id: 'board-001',
    category: '공지',
    title: '아카이브 게시판을 오픈했습니다',
    author: 'DQ Archive',
    date: '2026-04-24',
    views: 128,
    pinned: true,
    body: '사이트 분류와 프로젝트 운영 메모를 남길 수 있는 읽기용 게시판입니다. 현재는 정적 데이터 기반이며, 배포 시 함께 갱신됩니다.',
  },
  {
    id: 'board-002',
    category: '업데이트',
    title: '모바일 메뉴 가림 현상을 조정했습니다',
    author: 'UI Team',
    date: '2026-04-24',
    views: 74,
    body: '모바일 화면에서 상단 메뉴가 콘텐츠를 많이 가리지 않도록 sticky 동작을 해제하고 버튼 간격을 조정했습니다.',
  },
  {
    id: 'board-003',
    category: '업데이트',
    title: '2000년대 초반 레트로 테마 적용',
    author: 'Design',
    date: '2026-04-23',
    views: 96,
    body: '밝은 하늘색 배경, 파란 테두리, 노란 포인트 버튼, 도트 패턴을 사용해 초기 웹 포털 느낌의 레트로 스타일을 적용했습니다.',
  },
  {
    id: 'board-004',
    category: '문의',
    title: '추가하고 싶은 사이트가 있으면 문의 메뉴를 이용하세요',
    author: 'DQ Archive',
    date: '2026-04-22',
    views: 52,
    body: '새 프로젝트나 누락된 사이트가 있다면 문의 메뉴를 통해 전달해 주세요. 확인 후 아카이브 목록에 반영할 수 있습니다.',
  },
]

const categories = ['전체', '공지', '업데이트', '문의'] as const

export function BoardPage() {
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[number]>('전체')
  const [query, setQuery] = useState('')
  const [selectedPostId, setSelectedPostId] = useState(boardPosts[0].id)

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return boardPosts.filter((post) => {
      const matchesCategory = selectedCategory === '전체' || post.category === selectedCategory
      const matchesQuery =
        !normalizedQuery ||
        post.title.toLowerCase().includes(normalizedQuery) ||
        post.body.toLowerCase().includes(normalizedQuery) ||
        post.author.toLowerCase().includes(normalizedQuery)

      return matchesCategory && matchesQuery
    })
  }, [query, selectedCategory])

  const selectedPost =
    boardPosts.find((post) => post.id === selectedPostId) ?? filteredPosts[0] ?? boardPosts[0]

  return (
    <section className="panel card section-layout board-page">
      <article className="panel card board-page__intro">
        <div className="panel__eyebrow">Board</div>
        <h2>게시판</h2>
        <p>아카이브 운영 공지와 업데이트 내역을 확인하는 정적 게시판입니다.</p>
      </article>

      <div className="board-toolbar">
        <div className="board-tabs" aria-label="게시글 분류">
          {categories.map((category) => (
            <button
              key={category}
              className={`pill${selectedCategory === category ? ' is-active' : ''}`}
              type="button"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <label className="field board-search">
          <span className="field__label">검색</span>
          <input
            className="field__input"
            type="search"
            value={query}
            placeholder="제목, 내용, 작성자"
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </div>

      <div className="board-layout">
        <section className="board-list" aria-label="게시글 목록">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <button
                key={post.id}
                className={`board-list__item${selectedPost.id === post.id ? ' is-selected' : ''}`}
                type="button"
                onClick={() => setSelectedPostId(post.id)}
              >
                <span className="board-list__category">{post.category}</span>
                <strong>{post.title}</strong>
                <span className="board-list__meta">
                  {post.date} · {post.author} · 조회 {post.views}
                </span>
                {post.pinned ? <span className="chip chip--soft">고정</span> : null}
              </button>
            ))
          ) : (
            <p className="board-empty">검색 결과가 없습니다.</p>
          )}
        </section>

        <article className="board-view panel card">
          <div className="board-view__meta">
            <span className="chip">{selectedPost.category}</span>
            <span>{selectedPost.date}</span>
            <span>조회 {selectedPost.views}</span>
          </div>
          <h3>{selectedPost.title}</h3>
          <p className="board-view__author">작성자: {selectedPost.author}</p>
          <p>{selectedPost.body}</p>
        </article>
      </div>
    </section>
  )
}
