import type { FormEventHandler, ReactNode, Ref } from 'react'
import type { UseFormReturn, FieldValues, FieldError } from 'react-hook-form'

export type FormSize = 'sm' | 'md' | 'lg'
export type FormLabelPosition = 'left' | 'right' | 'top'

export interface FormConfigContextValue {
  inline: boolean
  labelPosition: FormLabelPosition
  labelWidth: string | 'auto'
  size: FormSize
  disabled: boolean
}

export interface FormItemContextValue {
  id: string
  name: string
  error?: FieldError
}

export interface FormProps<T extends FieldValues = FieldValues>
  extends UseFormReturn<T> {
  inline?: boolean
  labelPosition?: FormLabelPosition
  labelWidth?: string | 'auto'
  size?: FormSize
  disabled?: boolean
  onSubmit?: FormEventHandler<HTMLFormElement>
  children?: ReactNode
  className?: string
  ref?: Ref<HTMLFormElement>
}

export interface FormItemProps {
  name: string
  className?: string
  children?: ReactNode
  ref?: Ref<HTMLDivElement>
}

export interface FormLabelProps {
  required?: boolean
  className?: string
  children?: ReactNode
  ref?: Ref<HTMLLabelElement>
}

export interface FormControlProps {
  children: ReactNode
}

export interface FormMessageProps {
  className?: string
  children?: ReactNode
  ref?: Ref<HTMLParagraphElement>
}

export interface FormDescriptionProps {
  className?: string
  children?: ReactNode
  ref?: Ref<HTMLParagraphElement>
}

export interface FormInputWordsProps {
  max: number
  layout?: 'absolute' | 'static'
  className?: string
}
