import { notices } from './boardApi'

export function NoticeListSection() {
  return (
    <section className="notice-list">
      {notices.map((notice) => (
        <article key={notice.id} className={`notice-list__item${notice.pinned ? ' is-pinned' : ''}`}>
          <div>
            <div className="notice-list__meta">
              <span>{notice.date}</span>
              {notice.pinned ? <span className="chip">Pinned</span> : null}
            </div>
            <h3>{notice.title}</h3>
            <p>{notice.summary}</p>
          </div>
        </article>
      ))}
    </section>
  )
}
