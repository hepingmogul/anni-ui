import { Aside, Container, Footer, Header, Main } from '../index'

function BlockLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center h-full w-full text-xs font-medium text-neutral-500 dark:text-neutral-400">
      {children}
    </div>
  )
}

const headerStyle = 'h-12 bg-violet-100 dark:bg-violet-900/40 border border-violet-200 dark:border-violet-800'
const asideStyle = 'w-24 bg-sky-100 dark:bg-sky-900/40 border border-sky-200 dark:border-sky-800'
const mainStyle = 'bg-neutral-100 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 min-h-[80px]'
const footerStyle = 'h-10 bg-teal-100 dark:bg-teal-900/40 border border-teal-200 dark:border-teal-800'

export default function ContainerPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">Container 布局容器</h1>
      <p className="text-sm text-neutral-500 mb-8">
        基于 Flexbox 的语义化页面布局容器，自动根据子元素推导排列方向，支持任意深度嵌套。
      </p>

      {/* 4.1 Header + Main */}
      <section className="mb-10">
        <h2 className="text-base font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
          1. Header + Main（上下布局）
        </h2>
        <p className="text-xs text-neutral-400 mb-3">
          存在 Header 子元素时，Container 自动切换为 <code>flex-col</code>。
        </p>
        <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden h-40 flex">
          <Container>
            <Header className={headerStyle}>
              <BlockLabel>Header</BlockLabel>
            </Header>
            <Main className={mainStyle}>
              <BlockLabel>Main</BlockLabel>
            </Main>
          </Container>
        </div>
      </section>

      {/* 4.2 Header + Main + Footer */}
      <section className="mb-10">
        <h2 className="text-base font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
          2. Header + Main + Footer（上中下布局）
        </h2>
        <p className="text-xs text-neutral-400 mb-3">
          同时包含 Header 与 Footer，Container 自动垂直排列。
        </p>
        <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden h-48 flex">
          <Container>
            <Header className={headerStyle}>
              <BlockLabel>Header</BlockLabel>
            </Header>
            <Main className={mainStyle}>
              <BlockLabel>Main</BlockLabel>
            </Main>
            <Footer className={footerStyle}>
              <BlockLabel>Footer</BlockLabel>
            </Footer>
          </Container>
        </div>
      </section>

      {/* 4.3 Aside + Main */}
      <section className="mb-10">
        <h2 className="text-base font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
          3. Aside + Main（左右布局）
        </h2>
        <p className="text-xs text-neutral-400 mb-3">
          无 Header / Footer 时，Container 自动切换为 <code>flex-row</code>。
        </p>
        <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden h-36 flex">
          <Container>
            <Aside className={asideStyle}>
              <BlockLabel>Aside</BlockLabel>
            </Aside>
            <Main className={mainStyle}>
              <BlockLabel>Main</BlockLabel>
            </Main>
          </Container>
        </div>
      </section>

      {/* 4.4 Header + (Aside + Main) */}
      <section className="mb-10">
        <h2 className="text-base font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
          4. Header + (Aside + Main)（顶栏 + 侧边）
        </h2>
        <p className="text-xs text-neutral-400 mb-3">
          外层 Container 垂直排列，内层 Container 无 Header/Footer 自动水平排列。
        </p>
        <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden h-48 flex">
          <Container>
            <Header className={headerStyle}>
              <BlockLabel>Header</BlockLabel>
            </Header>
            <Container>
              <Aside className={asideStyle}>
                <BlockLabel>Aside</BlockLabel>
              </Aside>
              <Main className={mainStyle}>
                <BlockLabel>Main</BlockLabel>
              </Main>
            </Container>
          </Container>
        </div>
      </section>

      {/* 4.5 Header + (Aside + (Main + Footer)) */}
      <section className="mb-10">
        <h2 className="text-base font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
          5. Header + (Aside + (Main + Footer))
        </h2>
        <p className="text-xs text-neutral-400 mb-3">
          三层嵌套：外层垂直，中层水平，内层垂直。
        </p>
        <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden h-52 flex">
          <Container>
            <Header className={headerStyle}>
              <BlockLabel>Header</BlockLabel>
            </Header>
            <Container>
              <Aside className={asideStyle}>
                <BlockLabel>Aside</BlockLabel>
              </Aside>
              <Container>
                <Main className={mainStyle}>
                  <BlockLabel>Main</BlockLabel>
                </Main>
                <Footer className={footerStyle}>
                  <BlockLabel>Footer</BlockLabel>
                </Footer>
              </Container>
            </Container>
          </Container>
        </div>
      </section>

      {/* 4.6 Aside + (Header + Main) */}
      <section className="mb-10">
        <h2 className="text-base font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
          6. Aside + (Header + Main)（侧边栏固定 + 顶栏）
        </h2>
        <p className="text-xs text-neutral-400 mb-3">
          外层水平排列，右侧内层 Container 包含 Header 自动垂直排列。
        </p>
        <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden h-48 flex">
          <Container>
            <Aside className={asideStyle}>
              <BlockLabel>Aside</BlockLabel>
            </Aside>
            <Container>
              <Header className={headerStyle}>
                <BlockLabel>Header</BlockLabel>
              </Header>
              <Main className={mainStyle}>
                <BlockLabel>Main</BlockLabel>
              </Main>
            </Container>
          </Container>
        </div>
      </section>

      {/* 4.7 Aside + (Header + Main + Footer) */}
      <section className="mb-10">
        <h2 className="text-base font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
          7. Aside + (Header + Main + Footer)
        </h2>
        <p className="text-xs text-neutral-400 mb-3">
          侧边栏固定，右侧区域上中下三段布局。
        </p>
        <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden h-56 flex">
          <Container>
            <Aside className={asideStyle}>
              <BlockLabel>Aside</BlockLabel>
            </Aside>
            <Container>
              <Header className={headerStyle}>
                <BlockLabel>Header</BlockLabel>
              </Header>
              <Main className={mainStyle}>
                <BlockLabel>Main</BlockLabel>
              </Main>
              <Footer className={footerStyle}>
                <BlockLabel>Footer</BlockLabel>
              </Footer>
            </Container>
          </Container>
        </div>
      </section>

    </div>
  )
}
