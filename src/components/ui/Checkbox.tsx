import { cx } from '../../utils/cx'

interface CheckboxProps {
  checked: boolean
  onChange: () => void
  label?: string
  round?: boolean
  title?: string
}

export function Checkbox({ checked, onChange, label, round = false, title }: CheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      title={title ?? label}
      onClick={onChange}
      className={cx('check', checked && 'check--on', round && 'check--round')}
    >
      ✓
    </button>
  )
}
