import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test/utils'
import { Container } from './Container'
import { Header } from './Header'
import { Footer } from './Footer'
import { Aside } from './Aside'
import { Main } from './Main'

describe('Container', () => {
  describe('渲染', () => {
    it('默认渲染为 div 元素', () => {
      const { container } = render(
        <Container><Main>内容</Main></Container>,
      )
      expect(container.firstChild?.nodeName).toBe('DIV')
    })
  })

  describe('自动方向推导', () => {
    it('含 Header 子元素时自动垂直排列（flex-col）', () => {
      const { container } = render(
        <Container>
          <Header>顶栏</Header>
          <Main>内容</Main>
        </Container>,
      )
      expect(container.firstChild).toHaveClass('flex-col')
    })

    it('含 Footer 子元素时自动垂直排列（flex-col）', () => {
      const { container } = render(
        <Container>
          <Main>内容</Main>
          <Footer>底栏</Footer>
        </Container>,
      )
      expect(container.firstChild).toHaveClass('flex-col')
    })

    it('无 Header/Footer 时自动水平排列（flex-row）', () => {
      const { container } = render(
        <Container>
          <Aside>侧边栏</Aside>
          <Main>内容</Main>
        </Container>,
      )
      expect(container.firstChild).toHaveClass('flex-row')
    })
  })

  describe('direction 手动覆盖', () => {
    it('direction="vertical" 强制垂直排列', () => {
      const { container } = render(
        <Container direction="vertical">
          <Aside>侧边栏</Aside>
          <Main>内容</Main>
        </Container>,
      )
      expect(container.firstChild).toHaveClass('flex-col')
    })

    it('direction="horizontal" 即使有 Header 也水平排列', () => {
      const { container } = render(
        <Container direction="horizontal">
          <Header>顶栏</Header>
          <Main>内容</Main>
        </Container>,
      )
      expect(container.firstChild).toHaveClass('flex-row')
    })
  })

  describe('className 追加', () => {
    it('自定义类名正确合并', () => {
      const { container } = render(
        <Container className="my-class">
          <Main>内容</Main>
        </Container>,
      )
      expect(container.firstChild).toHaveClass('my-class')
    })
  })
})

describe('Header', () => {
  it('渲染为 <header> 标签', () => {
    render(<Header>顶栏</Header>)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('children 内容正确显示', () => {
    render(<Header>顶栏内容</Header>)
    expect(screen.getByText('顶栏内容')).toBeInTheDocument()
  })

  it('自定义 className 正确合并', () => {
    render(<Header className="my-header">顶栏</Header>)
    expect(screen.getByRole('banner')).toHaveClass('my-header')
  })
})

describe('Footer', () => {
  it('渲染为 <footer> 标签', () => {
    render(<Footer>底栏</Footer>)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('children 内容正确显示', () => {
    render(<Footer>底栏内容</Footer>)
    expect(screen.getByText('底栏内容')).toBeInTheDocument()
  })

  it('自定义 className 正确合并', () => {
    render(<Footer className="my-footer">底栏</Footer>)
    expect(screen.getByRole('contentinfo')).toHaveClass('my-footer')
  })
})

describe('Aside', () => {
  it('渲染为 <aside> 标签', () => {
    render(<Aside>侧边栏</Aside>)
    expect(screen.getByRole('complementary')).toBeInTheDocument()
  })

  it('children 内容正确显示', () => {
    render(<Aside>侧边栏内容</Aside>)
    expect(screen.getByText('侧边栏内容')).toBeInTheDocument()
  })

  it('自定义 className 正确合并', () => {
    render(<Aside className="my-aside">侧边栏</Aside>)
    expect(screen.getByRole('complementary')).toHaveClass('my-aside')
  })
})

describe('Main', () => {
  it('渲染为 <main> 标签', () => {
    render(<Main>主内容</Main>)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('children 内容正确显示', () => {
    render(<Main>主内容区域</Main>)
    expect(screen.getByText('主内容区域')).toBeInTheDocument()
  })

  it('自定义 className 正确合并', () => {
    render(<Main className="my-main">主内容</Main>)
    expect(screen.getByRole('main')).toHaveClass('my-main')
  })
})
