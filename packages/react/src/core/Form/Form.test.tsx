import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '../../test/utils'
import userEvent from '@testing-library/user-event'
import { useForm } from 'react-hook-form'
import { Form, FormItem, FormLabel, FormControl, FormMessage, FormInputWords } from './Form'
import { Input } from '../Input/Input'

interface TestFormValues {
  username: string
}

function TestForm({
  onSubmit = vi.fn(),
  disabled = false,
}: {
  onSubmit?: (data: TestFormValues) => void
  disabled?: boolean
}) {
  const methods = useForm<TestFormValues>({
    defaultValues: { username: '' },
  })

  return (
    <Form
      {...methods}
      onSubmit={methods.handleSubmit(onSubmit)}
      disabled={disabled}
    >
      <FormItem name="username">
        <FormLabel>用户名</FormLabel>
        <FormControl>
          <Input placeholder="请输入用户名" />
        </FormControl>
        <FormMessage />
      </FormItem>
      <button type="submit">提交</button>
    </Form>
  )
}

function RequiredForm({ onSubmit = vi.fn() }: { onSubmit?: (data: TestFormValues) => void }) {
  const methods = useForm<TestFormValues>({
    defaultValues: { username: '' },
  })

  return (
    <Form {...methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <FormItem name="username">
        <FormLabel required>用户名</FormLabel>
        <FormControl>
          <Input placeholder="请输入用户名" />
        </FormControl>
        <FormMessage />
      </FormItem>
      <button type="submit">提交</button>
    </Form>
  )
}

function RequiredValidationForm() {
  const methods = useForm<TestFormValues>({
    defaultValues: { username: '' },
  })

  return (
    <Form {...methods} onSubmit={methods.handleSubmit(() => {})}>
      <FormItem name="username">
        <FormLabel>用户名</FormLabel>
        <FormControl>
          <Input
            {...methods.register('username', { required: '用户名不能为空' })}
            placeholder="请输入用户名"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
      <button type="submit">提交</button>
    </Form>
  )
}

function WordsForm() {
  const methods = useForm<TestFormValues>({
    defaultValues: { username: '' },
  })

  return (
    <Form {...methods} onSubmit={methods.handleSubmit(() => {})}>
      <FormItem name="username">
        <FormLabel>用户名</FormLabel>
        <div className="relative">
          <FormControl>
            <Input
              {...methods.register('username')}
              placeholder="请输入用户名"
            />
          </FormControl>
          <FormInputWords max={10} layout="inline" />
        </div>
      </FormItem>
      <button type="submit">提交</button>
    </Form>
  )
}

describe('Form', () => {
  describe('提交', () => {
    it('点击 submit 按钮时 onSubmit 回调被调用', async () => {
      const onSubmit = vi.fn()
      render(<TestForm onSubmit={onSubmit} />)
      await userEvent.type(screen.getByPlaceholderText('请输入用户名'), '张三')
      await userEvent.click(screen.getByRole('button', { name: '提交' }))
      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalled()
      })
    })
  })

  describe('校验', () => {
    it('必填字段未填写提交后 FormMessage 显示错误文本', async () => {
      render(<RequiredValidationForm />)
      await userEvent.click(screen.getByRole('button', { name: '提交' }))
      await waitFor(() => {
        expect(screen.getByText('用户名不能为空')).toBeInTheDocument()
      })
    })

    it('有错误时 FormControl 注入 aria-invalid="true"', async () => {
      render(<RequiredValidationForm />)
      await userEvent.click(screen.getByRole('button', { name: '提交' }))
      await waitFor(() => {
        expect(screen.getByPlaceholderText('请输入用户名')).toHaveAttribute('aria-invalid', 'true')
      })
    })
  })

  describe('FormLabel', () => {
    it('required=true 时显示必填星号', () => {
      render(<RequiredForm />)
      expect(screen.getByText('*')).toBeInTheDocument()
    })
  })

  describe('FormInputWords 字数统计', () => {
    it('输入时计数更新', async () => {
      render(<WordsForm />)
      await userEvent.type(screen.getByPlaceholderText('请输入用户名'), 'hello')
      await waitFor(() => {
        expect(screen.getByText('5/10')).toBeInTheDocument()
      })
    })

    it('超过 max 时变红（text-danger）', async () => {
      render(<WordsForm />)
      await userEvent.type(screen.getByPlaceholderText('请输入用户名'), 'hello world!')
      await waitFor(() => {
        const counter = screen.getByText('12/10')
        expect(counter).toHaveClass('text-danger')
      })
    })
  })
})
