import { cx } from '../../utils/cx'

interface ProgressBarProps {
  value: number
  max?: number
  thin?: boolean
  label?: string
}

export function ProgressBar({ value, max = 100, thin = false, label }: ProgressBarProps) {
  const percent = max === 0 ? 0 : Math.min(100, Math.max(0, (value / max) * 100))
  return (
    <div
      className={cx('progress', thin && 'progress--thin')}
      role="progressbar"
      aria-valuenow={Math.round(percent)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div className="progress__fill" style={{ width: `${percent}%` }} />
    </div>
  )
}
