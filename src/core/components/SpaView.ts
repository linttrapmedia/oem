import { State } from '@core/framework/state'
import { Template } from '@core/framework/template'
import { Trait } from '@core/framework/trait'
import { Types } from '@core/framework/types'
import { debounce } from '@core/utils/debounce'

type SpaViewProps<T> = {
  onReady?: () => void
  state: Types.Atom<T>
  views: {
    view: () => HTMLElement
    state: T
    breakpoint?: number
    route?: string
    transitionView?: boolean
  }[]
}

export function SpaView<T extends string>({ onReady, state, views }: SpaViewProps<T>) {
  const viewState = State.Atom<HTMLElement>(null)
  const width = State.Atom(0)
  const transitionView = views.find(view => view.transitionView)

  const { div } = Template.Html({
    'html@state': Trait.Atom(state, Trait.InnerHtml),
    'html@viewState': Trait.Atom(viewState, Trait.InnerHtml),
    on_resize: Trait.OnWinResize,
    style: Trait.Style,
  })

  const getView = () => {
    const view = views
      .filter(view => view.state === state.get())
      .filter(view => (view.breakpoint ?? 0) <= width.get())
      .pop()
    if (view) return view.view()
  }

  const setView = debounce(
    (w: number = el.offsetWidth) => (width.set(w), viewState.set(getView())),
    {
      delay: 500,
      onStart: () => (transitionView ? viewState.set(transitionView.view()) : null),
    },
  )

  const el: HTMLElement = div(
    ['html@viewState', viewState.get],
    ['html@state', getView],
    ['on_resize', ({ width }: { width: number }) => setView(width)],
    ['style', 'display', 'flex'],
    ['style', 'minHeight', '100%'],
    ['style', 'width', '100%'],
  )(getView())

  window.addEventListener('DOMContentLoaded', async () => {
    // global styles
    const reset = [
      `*,::after,::before,body{box-sizing:border-box}`,
      `html,body{padding:0;margin:0;height:100%;min-height:100%;text-rendering:optimizeSpeed;}`,
      `a{color:inherit;cursor:pointer}`,
      `a,button,input,select,textarea{font:inherit}`,
      `img,picture{max-width:100%;display:block}`,
      `@media (prefers-reduced-motion:reduce){`,
      `html:focus-within{scroll-behavior:auto}`,
      `*,::after,::before{scroll-behavior:auto!important}`,
      `}`,
    ].join('')
    const style = document.createElement('style')
    style.innerHTML = reset
    document.head.appendChild(style)
    document.body.appendChild(el)

    // simple routing
    const currentRoute = window.location.pathname + window.location.search
    const routeFound = views.find(view => view.route === currentRoute)
    console.log(routeFound, currentRoute)
    if (routeFound) state.set(routeFound.state)

    // mount
    if (onReady) onReady()
  })
}
