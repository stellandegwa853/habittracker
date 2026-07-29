import { useEffect } from 'react'

function ConfirmModal({
  cancelLabel = 'Cancel',
  confirmLabel = 'Confirm',
  isOpen,
  message,
  onCancel,
  onConfirm,
  title,
  tone = 'default',
}) {
  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onCancel?.()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onCancel])

  if (!isOpen) {
    return null
  }

  const confirmClass =
    tone === 'danger'
      ? 'bg-red-700 text-white hover:bg-red-800 focus:ring-red-700/30'
      : 'bg-[#8a5637] text-white hover:bg-[#744326] focus:ring-[#8a5637]/30'

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-stone-950/35 px-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onCancel?.()
        }
      }}
    >
      <section
        aria-modal="true"
        role="dialog"
        className="w-full max-w-md rounded-[1.5rem] border border-white/80 bg-[#fffaf4] p-6 shadow-2xl shadow-stone-950/20"
      >
        <h2 className="text-xl font-semibold text-stone-950">{title}</h2>
        <p className="mt-3 text-sm leading-6 text-stone-600">{message}</p>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-stone-200 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700 transition hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-300"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 ${confirmClass}`}
          >
            {confirmLabel}
          </button>
        </div>
      </section>
    </div>
  )
}

export default ConfirmModal
