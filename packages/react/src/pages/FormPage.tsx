import { useForm } from 'react-hook-form'
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
  Input,
  InputNumber,
  Checkbox,
  RadioGroup,
  Switch,
  Button,
  Space,
} from '../index'

type LoginValues = {
  username: string
  password: string
}

type ProfileValues = {
  nickname: string
  age: number | null
  gender: string
  agree: boolean
  newsletter: boolean
}

function LoginForm() {
  const form = useForm<LoginValues>()

  return (
    <Form
      {...form}
      onSubmit={form.handleSubmit((data) => alert(JSON.stringify(data, null, 2)))}
      className="max-w-sm"
    >
      <FormItem name="username">
        <FormLabel required>用户名</FormLabel>
        <FormControl>
          <Input placeholder="请输入用户名" {...form.register('username', { required: '用户名不能为空' })} />
        </FormControl>
        <FormDescription>用于登录的唯一标识</FormDescription>
        <FormMessage />
      </FormItem>

      <FormItem name="password">
        <FormLabel required>密码</FormLabel>
        <FormControl>
          <Input
            type="password"
            placeholder="请输入密码"
            {...form.register('password', {
              required: '密码不能为空',
              minLength: { value: 6, message: '密码至少 6 位' },
            })}
          />
        </FormControl>
        <FormMessage />
      </FormItem>

      <Button type="submit" className="w-full">登录</Button>
    </Form>
  )
}

function ProfileForm() {
  const form = useForm<ProfileValues>({
    defaultValues: { gender: 'male', newsletter: false },
  })

  return (
    <Form
      {...form}
      onSubmit={form.handleSubmit((data) => alert(JSON.stringify(data, null, 2)))}
      className="max-w-sm"
    >
      <FormItem name="nickname">
        <FormLabel required>昵称</FormLabel>
        <FormControl>
          <Input
            placeholder="请输入昵称"
            {...form.register('nickname', {
              required: '昵称不能为空',
              maxLength: { value: 20, message: '最多 20 个字符' },
            })}
          />
        </FormControl>
        <FormMessage />
      </FormItem>

      <FormItem name="age">
        <FormLabel>年龄</FormLabel>
        <FormControl>
          <InputNumber
            min={1}
            max={120}
            placeholder="请输入年龄"
            onChange={(val) => form.setValue('age', val)}
          />
        </FormControl>
        <FormMessage />
      </FormItem>

      <FormItem name="gender">
        <FormLabel>性别</FormLabel>
        <FormControl>
          <RadioGroup
            value={form.watch('gender')}
            onChange={(val) => form.setValue('gender', String(val))}
            options={[
              { label: '男', value: 'male' },
              { label: '女', value: 'female' },
              { label: '保密', value: 'unknown' },
            ]}
          />
        </FormControl>
        <FormMessage />
      </FormItem>

      <FormItem name="newsletter">
        <FormLabel>订阅邮件</FormLabel>
        <FormControl>
          <Switch
            checked={form.watch('newsletter')}
            onChange={(val) => form.setValue('newsletter', val)}
            label="订阅产品更新通知"
          />
        </FormControl>
        <FormMessage />
      </FormItem>

      <FormItem name="agree">
        <FormControl>
          <label className="flex items-center gap-2">
            <Checkbox
              {...form.register('agree', { required: '请阅读并同意用户协议' })}
            />
            <span className="text-sm text-neutral-700">我已阅读并同意用户协议</span>
          </label>
        </FormControl>
        <FormMessage />
      </FormItem>

      <Space>
        <Button type="submit">提交</Button>
        <Button type="button" variant="secondary" onClick={() => form.reset()}>重置</Button>
      </Space>
    </Form>
  )
}

export default function FormPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 mb-2">Form 表单</h1>
      <p className="text-sm text-neutral-500 mb-8">
        基于 react-hook-form 的表单体系，Form 提供上下文，FormItem / FormLabel / FormControl / FormMessage 负责结构与错误展示。
      </p>

      <section className="mb-10">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">登录表单（验证示例）</h2>
        <LoginForm />
      </section>

      <section className="mb-10">
        <h2 className="text-base font-semibold text-neutral-700 mb-4">综合表单</h2>
        <ProfileForm />
      </section>
    </div>
  )
}
