import type { InputHTMLAttributes, ReactNode } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: ReactNode
  hint?: ReactNode
}

export function Input({ label, hint, id, className = '', ...props }: InputProps) {
  const inputId = id ?? props.name ?? String(label).toLowerCase().replace(/\s+/g, '-')

  return (
    <label className={['field', className].filter(Boolean).join(' ')} htmlFor={inputId}>
      <span className="field__label">{label}</span>
      <input id={inputId} className="field__input" {...props} />
      {hint ? <span className="field__hint">{hint}</span> : null}
    </label>
  )
}
