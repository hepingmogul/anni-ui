import {
  createContext,
  useContext,
  useState,
  useEffect,
  forwardRef,
  type CSSProperties,
} from 'react'
import { cn } from '../utils/cn'
import type { RowProps, ColProps, ColResponsiveProps } from './Row.types'

// ─── RowContext ───────────────────────────────────────────────────────────────

interface RowContextValue {
  gutter: [number, number]
}

const RowContext = createContext<RowContextValue>({ gutter: [0, 0] })

// ─── useBreakpoint ────────────────────────────────────────────────────────────

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

const BREAKPOINT_VALUES: [Breakpoint, number][] = [
  ['xxl', 1600],
  ['xl', 1200],
  ['lg', 992],
  ['md', 768],
  ['sm', 576],
  ['xs', 0],
]

function getActiveBreakpoints(width: number): Record<Breakpoint, boolean> {
  return {
    xs: width >= 0,
    sm: width >= 576,
    md: width >= 768,
    lg: width >= 992,
    xl: width >= 1200,
    xxl: width >= 1600,
  }
}

function useBreakpoint(): Record<Breakpoint, boolean> {
  const [active, setActive] = useState<Record<Breakpoint, boolean>>(() =>
    getActiveBreakpoints(typeof window !== 'undefined' ? window.innerWidth : 0),
  )

  useEffect(() => {
    const queries = BREAKPOINT_VALUES.map(([bp, minWidth]) => {
      const mq = window.matchMedia(`(min-width: ${minWidth}px)`)
      return { bp, mq }
    })

    function update() {
      setActive(getActiveBreakpoints(window.innerWidth))
    }

    queries.forEach(({ mq }) => mq.addEventListener('change', update))
    return () => {
      queries.forEach(({ mq }) => mq.removeEventListener('change', update))
    }
  }, [])

  return active
}

// ─── normalizeGutter ──────────────────────────────────────────────────────────

function normalizeGutter(gutter: RowProps['gutter']): [number, number] {
  if (!gutter) return [0, 0]
  if (Array.isArray(gutter)) return [gutter[0] ?? 0, gutter[1] ?? 0]
  return [gutter, 0]
}

// ─── justify / align 映射 ─────────────────────────────────────────────────────

const JUSTIFY_MAP: Record<string, string> = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  'space-between': 'space-between',
  'space-around': 'space-around',
  'space-evenly': 'space-evenly',
}

const ALIGN_MAP: Record<string, string> = {
  top: 'flex-start',
  middle: 'center',
  bottom: 'flex-end',
  stretch: 'stretch',
}

// ─── Row ─────────────────────────────────────────────────────────────────────

export const Row = forwardRef<HTMLElement, RowProps>(function Row(
  {
    gutter,
    justify = 'start',
    align = 'top',
    wrap = true,
    tag: Tag = 'div',
    className,
    style,
    children,
    ...rest
  },
  ref,
) {
  const [hGutter, vGutter] = normalizeGutter(gutter)

  const rowStyle: CSSProperties = {
    display: 'flex',
    flexWrap: wrap ? 'wrap' : 'nowrap',
    justifyContent: JUSTIFY_MAP[justify],
    alignItems: ALIGN_MAP[align],
    ...(hGutter > 0 && {
      marginLeft: -(hGutter / 2),
      marginRight: -(hGutter / 2),
    }),
    ...(vGutter > 0 && {
      marginTop: -(vGutter / 2),
      marginBottom: -(vGutter / 2),
    }),
    ...style,
  }

  return (
    <RowContext.Provider value={{ gutter: [hGutter, vGutter] }}>
      <Tag ref={ref} className={cn(className)} style={rowStyle} {...rest}>
        {children}
      </Tag>
    </RowContext.Provider>
  )
})

// ─── resolveColProps ──────────────────────────────────────────────────────────

function resolveResponsive(
  val: number | ColResponsiveProps | undefined,
): ColResponsiveProps {
  if (val === undefined) return {}
  if (typeof val === 'number') return { span: val }
  return val
}

function resolveColProps(
  props: ColProps,
  active: Record<Breakpoint, boolean>,
): ColResponsiveProps {
  const base: ColResponsiveProps = {
    span: props.span,
    offset: props.offset,
    push: props.push,
    pull: props.pull,
  }

  // 从小到大收集，后面的断点优先级更高（大断点覆盖小断点）
  const breakpointOrder: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']
  let merged = { ...base }

  for (const bp of breakpointOrder) {
    if (active[bp] && props[bp] !== undefined) {
      merged = { ...merged, ...resolveResponsive(props[bp]) }
    }
  }

  return merged
}

// ─── Col ─────────────────────────────────────────────────────────────────────

export const Col = forwardRef<HTMLElement, ColProps>(function Col(
  {
    span,
    offset = 0,
    push = 0,
    pull = 0,
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
    tag: Tag = 'div',
    className,
    style,
    children,
    ...rest
  },
  ref,
) {
  const { gutter: [hGutter, vGutter] } = useContext(RowContext)
  const active = useBreakpoint()

  const resolved = resolveColProps(
    { span, offset, push, pull, xs, sm, md, lg, xl, xxl },
    active,
  )

  const effectiveSpan = resolved.span ?? 24
  const effectiveOffset = resolved.offset ?? 0
  const effectivePush = resolved.push ?? 0
  const effectivePull = resolved.pull ?? 0

  const colStyle: CSSProperties = {
    ...(effectiveSpan === 0
      ? { display: 'none' }
      : { width: `${(effectiveSpan / 24) * 100}%` }),
    ...(effectiveOffset > 0 && {
      marginLeft: `${(effectiveOffset / 24) * 100}%`,
    }),
    ...(effectivePush > 0 && {
      position: 'relative',
      left: `${(effectivePush / 24) * 100}%`,
    }),
    ...(effectivePull > 0 && {
      position: 'relative',
      right: `${(effectivePull / 24) * 100}%`,
    }),
    ...(hGutter > 0 && {
      paddingLeft: hGutter / 2,
      paddingRight: hGutter / 2,
    }),
    ...(vGutter > 0 && {
      paddingTop: vGutter / 2,
      paddingBottom: vGutter / 2,
    }),
    ...style,
  }

  return (
    <Tag ref={ref} className={cn(className)} style={colStyle} {...rest}>
      {children}
    </Tag>
  )
})
