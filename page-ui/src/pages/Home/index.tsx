import { NoticeListSection } from '../../features/board/NoticeListSection'
import { products } from '../../api/productApi'
import { Button } from '../../components/common/Button'
import { Link } from '../../components/common/Link'
import { Tabs } from '../../components/common/Tabs'

export function HomePage() {
  return (
    <div className="home-page">
      <section className="home-hero panel panel--accent">
        <div className="home-hero__copy">
          <div className="panel__eyebrow">Design system preview</div>
          <h2>One structure, many site types.</h2>
          <p>
            This example site groups DQ pages by project type so the archive stays quick to scan.
          </p>
          <div className="button-row">
            <Link className="button button--primary" href="/product">
              Explore products
            </Link>
            <Link className="button button--secondary" href="/customer/faq">
              Visit customer center
            </Link>
          </div>
        </div>
        <div className="home-hero__panel">
          <Tabs
            items={[
              { label: 'Overview', content: 'A clear landing area for archive browsing.' },
              { label: 'Sections', content: 'Project types are grouped by purpose, not by unused menus.' },
              { label: 'Inquiry', content: 'The inquiry flow opens a mail draft directly.' },
            ]}
          />
        </div>
      </section>

      <section className="home-grid">
        <article className="panel card">
          <div className="panel__eyebrow">Featured products</div>
          <h3>Fast paths into the archive</h3>
          <div className="stack">
            {products.map((product) => (
              <div key={product.id} className="mini-card">
                <div>
                  <strong>{product.name}</strong>
                  <p>{product.summary}</p>
                </div>
                <span className="chip">{product.category}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="panel card">
          <div className="panel__eyebrow">Customer center</div>
          <h3>Support content</h3>
          <NoticeListSection />
        </article>
      </section>

      <section className="panel card home-cta">
        <div>
          <div className="panel__eyebrow">Reusable patterns</div>
          <h3>Built for expansion</h3>
          <p>
            The folder structure is ready for more pages, real API calls, and richer content blocks when you
            are ready to grow the app.
          </p>
        </div>
        <Button variant="secondary">Launch modal example</Button>
      </section>
    </div>
  )
}
