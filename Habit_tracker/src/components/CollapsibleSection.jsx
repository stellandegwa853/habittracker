import { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'

function CollapsibleSection({
  children,
  className = '',
  defaultOpen = false,
  id,
  summary,
  title,
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const panelId = id || `section-${title.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <section className={className}>
      <button
        type="button"
        aria-controls={panelId}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        className="flex w-full items-center justify-between gap-4 rounded-2xl border border-stone-200/70 bg-white/70 px-4 py-3 text-left transition duration-200 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#8a5637]/25"
      >
        <span>
          <span className="block text-sm font-semibold text-stone-900">
            {title}
          </span>
          {summary ? (
            <span className="mt-1 block text-sm leading-5 text-stone-500">
              {summary}
            </span>
          ) : null}
        </span>
        <FiChevronDown
          className={`shrink-0 text-stone-500 transition duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        id={panelId}
        className={`grid transition-all duration-300 ease-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="pt-4">{children}</div>
        </div>
      </div>
    </section>
  )
}

export default CollapsibleSection
