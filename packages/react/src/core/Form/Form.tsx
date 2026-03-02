import { createContext, useContext, useId, Children, cloneElement, isValidElement, forwardRef } from 'react'
import { FormProvider, useFormContext } from 'react-hook-form'
import type { FieldValues } from 'react-hook-form'
import { cn } from '../utils/cn'
import type {
  FormConfigContextValue,
  FormItemContextValue,
  FormProps,
  FormItemProps,
  FormLabelProps,
  FormControlProps,
  FormMessageProps,
  FormDescriptionProps,
  FormInputWordsProps,
} from './Form.types'

// ─── Contexts ───────────────────────────────────────────────────────────────

const FormConfigContext = createContext<FormConfigContextValue>({
  inline: false,
  labelPosition: 'top',
  labelWidth: 'auto',
  size: 'md',
  disabled: false,
})

const FormItemContext = createContext<FormItemContextValue>({
  id: '',
  name: '',
})

// ─── Hooks ──────────────────────────────────────────────────────────────────

function useFormField() {
  const { id, name } = useContext(FormItemContext)
  const { formState } = useFormContext()

  const fieldError = name
    ? (formState.errors[name] as { message?: string } | undefined)
    : undefined

  const descriptionId = `${id}-description`
  const messageId = `${id}-message`

  return { id, name, fieldError, descriptionId, messageId }
}

// ─── Form ────────────────────────────────────────────────────────────────────

export function Form<T extends FieldValues = FieldValues>({
  inline = false,
  labelPosition = 'top',
  labelWidth = 'auto',
  size = 'md',
  disabled = false,
  onSubmit,
  children,
  className,
  control,
  formState,
  getValues,
  getFieldState,
  handleSubmit,
  register,
  reset,
  resetField,
  setError,
  setFocus,
  setValue,
  trigger,
  unregister,
  watch,
  clearErrors,
  // FIXME: subscribe 方法（react-hook-form 的新版本新增的）, 暂时不需要使用
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  subscribe,
  ref,
  ...rest
}: FormProps<T>) {
  const methods = {
    control,
    formState,
    getValues,
    getFieldState,
    handleSubmit,
    register,
    reset,
    resetField,
    setError,
    setFocus,
    setValue,
    trigger,
    unregister,
    watch,
    clearErrors,
  }

  return (
    <FormProvider {...(methods as unknown as Parameters<typeof FormProvider>[0])}>
      <FormConfigContext.Provider value={{ inline, labelPosition, labelWidth, size, disabled }}>
        <form
          ref={ref}
          onSubmit={onSubmit}
          className={cn(
            inline ? 'flex flex-wrap items-end gap-4' : 'flex flex-col gap-4',
            className,
          )}
          {...rest}
        >
          {children}
        </form>
      </FormConfigContext.Provider>
    </FormProvider>
  )
}

// ─── FormItem ────────────────────────────────────────────────────────────────

export const FormItem = forwardRef<HTMLDivElement, FormItemProps>(function FormItem(
  { name, className, children },
  ref,
) {
  const uid = useId()
  const id = `field-${uid}`
  const { formState } = useFormContext()
  const error = formState.errors[name] as { message?: string } | undefined

  return (
    <FormItemContext.Provider value={{ id, name, error: error as import('react-hook-form').FieldError | undefined }}>
      <div ref={ref} className={cn('flex flex-col gap-1', className)}>
        {children}
      </div>
    </FormItemContext.Provider>
  )
})

// ─── FormLabel ───────────────────────────────────────────────────────────────

export const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(function FormLabel(
  { required = false, className, children },
  ref,
) {
  const { id, fieldError } = useFormField()
  const hasError = !!fieldError

  return (
    <label
      ref={ref}
      htmlFor={id}
      className={cn(
        'text-sm font-medium',
        hasError ? 'text-danger' : 'text-neutral-700',
        className,
      )}
    >
      {required && <span className="text-danger mr-0.5">*</span>}
      {children}
    </label>
  )
})

// ─── FormControl ─────────────────────────────────────────────────────────────

export function FormControl({ children }: FormControlProps) {
  const { id, fieldError, descriptionId, messageId } = useFormField()

  const child = Children.only(children)
  if (!isValidElement(child)) return <>{children}</>

  return cloneElement(child as React.ReactElement<Record<string, unknown>>, {
    id,
    'aria-describedby': fieldError ? messageId : descriptionId,
    'aria-invalid': fieldError ? 'true' : undefined,
  })
}

// ─── FormMessage ─────────────────────────────────────────────────────────────

export const FormMessage = forwardRef<HTMLParagraphElement, FormMessageProps>(function FormMessage(
  { className, children },
  ref,
) {
  const { fieldError, messageId } = useFormField()
  const message = fieldError?.message ?? children

  if (!message) return null

  return (
    <p
      ref={ref}
      id={messageId}
      className={cn('text-xs', fieldError ? 'text-danger' : 'text-neutral-500', className)}
    >
      {message}
    </p>
  )
})

// ─── FormDescription ─────────────────────────────────────────────────────────

export const FormDescription = forwardRef<HTMLParagraphElement, FormDescriptionProps>(function FormDescription(
  { className, children },
  ref,
) {
  const { descriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={descriptionId}
      className={cn('text-xs text-neutral-500', className)}
    >
      {children}
    </p>
  )
})

// ─── FormInputWords ──────────────────────────────────────────────────────────

export function FormInputWords({ max, layout = 'absolute', className }: FormInputWordsProps) {
  const { name } = useFormField()
  const { watch } = useFormContext()
  const value: string = watch(name) ?? ''
  const count = typeof value === 'string' ? value.length : 0
  const isOver = count > max

  if (layout === 'absolute') {
    return (
      <span
        className={cn(
          'absolute bottom-1 right-2 text-xs pointer-events-none select-none',
          isOver ? 'text-danger' : 'text-neutral-400',
          className,
        )}
      >
        {count}/{max}
      </span>
    )
  }

  return (
    <span
      className={cn(
        'text-xs select-none',
        isOver ? 'text-danger' : 'text-neutral-400',
        className,
      )}
    >
      {count}/{max}
    </span>
  )
}
