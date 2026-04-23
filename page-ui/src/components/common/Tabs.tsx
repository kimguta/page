import { useState } from 'react'

type TabItem = {
  label: string
  content: string
}

type TabsProps = {
  items: TabItem[]
}

export function Tabs({ items }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeItem = items[activeIndex] ?? items[0]

  return (
    <div className="tabs">
      <div className="tabs__list" role="tablist" aria-label="Example tabs">
        {items.map((item, index) => (
          <button
            key={item.label}
            className={`tabs__trigger${index === activeIndex ? ' is-active' : ''}`}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="tabs__panel" role="tabpanel">
        <p>{activeItem?.content}</p>
      </div>
    </div>
  )
}
