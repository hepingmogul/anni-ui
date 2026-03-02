import { useState, useRef, useCallback } from 'react'
import { cn } from '../utils/cn'
import type { SliderProps } from './Slider.types'

function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max)
}

function snapToStep(val: number, min: number, step: number): number {
  return Math.round((val - min) / step) * step + min
}

function toPercent(val: number, min: number, max: number): number {
  return ((val - min) / (max - min)) * 100
}

interface ThumbProps {
  value: number
  min: number
  max: number
  step: number
  disabled: boolean
  showTooltip: boolean
  isError: boolean
  onDrag: (newVal: number) => void
  label?: string
}

function Thumb({ value, min, max, step, disabled, showTooltip, isError, onDrag, label }: ThumbProps) {
  const thumbRef = useRef<HTMLSpanElement>(null)
  const isDragging = useRef(false)
  const [showTip, setShowTip] = useState(false)

  const getValueFromEvent = useCallback(
    (e: MouseEvent | TouchEvent) => {
      const track = thumbRef.current?.parentElement
      if (!track) return value
      const rect = track.getBoundingClientRect()
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      const ratio = clamp((clientX - rect.left) / rect.width, 0, 1)
      const rawVal = ratio * (max - min) + min
      return clamp(snapToStep(rawVal, min, step), min, max)
    },
    [min, max, step, value],
  )

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return
    e.preventDefault()
    isDragging.current = true
    setShowTip(true)

    const handleMouseMove = (ev: MouseEvent) => {
      if (!isDragging.current) return
      onDrag(getValueFromEvent(ev))
    }
    const handleMouseUp = () => {
      isDragging.current = false
      setShowTip(false)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled) return
    e.preventDefault()
    isDragging.current = true
    setShowTip(true)

    const handleTouchMove = (ev: TouchEvent) => {
      if (!isDragging.current) return
      onDrag(getValueFromEvent(ev))
    }
    const handleTouchEnd = () => {
      isDragging.current = false
      setShowTip(false)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return
    let next = value
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      next = clamp(snapToStep(value + step, min, step), min, max)
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      next = clamp(snapToStep(value - step, min, step), min, max)
    } else if (e.key === 'Home') {
      next = min
    } else if (e.key === 'End') {
      next = max
    } else {
      return
    }
    e.preventDefault()
    onDrag(next)
  }

  const percent = toPercent(value, min, max)

  return (
    <span
      ref={thumbRef}
      role="slider"
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-label={label}
      tabIndex={disabled ? -1 : 0}
      style={{ left: `${percent}%` }}
      className={cn(
        'absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-4 w-4 rounded-full border-2 bg-white shadow-sm transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-ring focus-visible:ring-offset-2',
        isError ? 'border-danger' : 'border-primary',
        disabled ? 'cursor-not-allowed opacity-60' : 'cursor-grab active:cursor-grabbing',
      )}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onKeyDown={handleKeyDown}
    >
      {showTooltip && showTip && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-neutral-800 px-1.5 py-0.5 text-xs text-white">
          {value}
        </span>
      )}
    </span>
  )
}

export function Slider({
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue,
  onChange,
  range = false,
  showTooltip = true,
  marks,
  disabled = false,
  className,
  id,
  'aria-invalid': ariaInvalid,
  'aria-describedby': ariaDescribedby,
}: SliderProps) {
  const isControlled = value !== undefined
  const getDefault = (): number | [number, number] => {
    if (defaultValue !== undefined) return defaultValue
    return range ? [min, max] : min
  }
  const [internalValue, setInternalValue] = useState<number | [number, number]>(getDefault)
  const currentValue = isControlled ? value! : internalValue
  const isError = ariaInvalid === true || ariaInvalid === 'true'

  const updateValue = (next: number | [number, number]) => {
    if (!isControlled) setInternalValue(next)
    onChange?.(next)
  }

  const handleSingleDrag = (newVal: number) => {
    updateValue(newVal)
  }

  const handleRangeDrag = (index: 0 | 1, newVal: number) => {
    const [lo, hi] = currentValue as [number, number]
    const next: [number, number] =
      index === 0
        ? [clamp(newVal, min, hi), hi]
        : [lo, clamp(newVal, lo, max)]
    updateValue(next)
  }

  const trackRef = useRef<HTMLDivElement>(null)

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return
    const rect = trackRef.current!.getBoundingClientRect()
    const ratio = clamp((e.clientX - rect.left) / rect.width, 0, 1)
    const rawVal = ratio * (max - min) + min
    const snapped = clamp(snapToStep(rawVal, min, step), min, max)

    if (!range) {
      updateValue(snapped)
    } else {
      const [lo, hi] = currentValue as [number, number]
      const distLo = Math.abs(snapped - lo)
      const distHi = Math.abs(snapped - hi)
      if (distLo <= distHi) {
        updateValue([clamp(snapped, min, hi), hi])
      } else {
        updateValue([lo, clamp(snapped, lo, max)])
      }
    }
  }

  const fillLeft = range
    ? toPercent((currentValue as [number, number])[0], min, max)
    : 0
  const fillRight = range
    ? 100 - toPercent((currentValue as [number, number])[1], min, max)
    : 100 - toPercent(currentValue as number, min, max)

  return (
    <div
      id={id}
      className={cn('relative w-full', marks ? 'pb-6' : '', className)}
      aria-invalid={ariaInvalid}
      aria-describedby={ariaDescribedby}
    >
      <div
        ref={trackRef}
        onClick={handleTrackClick}
        className={cn(
          'relative h-2 rounded-full w-full',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
          isError ? 'bg-danger/20' : 'bg-neutral-200',
        )}
      >
        {/* 填充轨道 */}
        <span
          className={cn(
            'absolute top-0 h-full rounded-full pointer-events-none',
            isError ? 'bg-danger' : 'bg-primary',
          )}
          style={{ left: `${fillLeft}%`, right: `${fillRight}%` }}
        />

        {/* 单滑块 */}
        {!range && (
          <Thumb
            value={currentValue as number}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            showTooltip={showTooltip}
            isError={isError}
            onDrag={handleSingleDrag}
            label="slider"
          />
        )}

        {/* 双滑块 */}
        {range && (
          <>
            <Thumb
              value={(currentValue as [number, number])[0]}
              min={min}
              max={max}
              step={step}
              disabled={disabled}
              showTooltip={showTooltip}
              isError={isError}
              onDrag={(v) => handleRangeDrag(0, v)}
              label="slider min"
            />
            <Thumb
              value={(currentValue as [number, number])[1]}
              min={min}
              max={max}
              step={step}
              disabled={disabled}
              showTooltip={showTooltip}
              isError={isError}
              onDrag={(v) => handleRangeDrag(1, v)}
              label="slider max"
            />
          </>
        )}
      </div>

      {/* 刻度标记 */}
      {marks && (
        <div className="absolute top-3 left-0 right-0">
          {Object.entries(marks).map(([markVal, markLabel]) => {
            const numVal = Number(markVal)
            const percent = toPercent(numVal, min, max)
            return (
              <span
                key={markVal}
                style={{ left: `${percent}%` }}
                className="absolute -translate-x-1/2 flex flex-col items-center"
              >
                <span className={cn('h-1 w-0.5 rounded', isError ? 'bg-danger/40' : 'bg-neutral-300')} />
                <span className="mt-1 text-xs text-neutral-500 whitespace-nowrap">{markLabel}</span>
              </span>
            )
          })}
        </div>
      )}
    </div>
  )
}
